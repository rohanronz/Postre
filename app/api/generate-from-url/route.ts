import { NextRequest, NextResponse } from "next/server";
import Firecrawl from "@mendable/firecrawl-js";
import { OpenRouter } from "@openrouter/sdk";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getCookieMapFromRequest } from "@/lib/cookie-from-request";
import { parseLLMJson } from "@/lib/parse-llm-json";

const firecrawl = new Firecrawl({
  apiKey: process.env.FIRECRAWL_API_KEY!,
});

const openRouter = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY!,
});

const SYSTEM_PROMPT = `You are an expert content repurposing specialist. Your task is to take blog post or article content and transform it into engaging social media posts for different platforms.

For each platform, follow these guidelines:

**LinkedIn:**
- Professional tone
- 1-3 paragraphs
- Include a hook, value proposition, and call-to-action
- Use relevant hashtags (3-5)

**Twitter/X:**
- Concise and punchy
- Create a thread of 3-5 tweets
- Each tweet under 280 characters
- Include relevant hashtags

**Facebook:**
- Conversational and engaging
- 2-3 paragraphs
- Include a question or call-to-action to encourage engagement

**Newsletter:**
- Email-friendly format
- Compelling subject line
- Brief intro, key points, and CTA
- Personal and direct tone

**Blog Summary:**
- SEO-optimized summary (150-200 words)
- Include key takeaways as bullet points
- Meta description (under 160 characters)

Return your response as a valid JSON object with the following structure:
{
  "linkedin": "...",
  "twitter": ["tweet1", "tweet2", "tweet3"],
  "facebook": "...",
  "newsletter": {
    "subject": "...",
    "body": "..."
  },
  "blog": {
    "summary": "...",
    "keyTakeaways": ["...", "..."],
    "metaDescription": "..."
  }
}`;

const CONTENT_MAX_LENGTH = 12_000;
const OPENROUTER_MODEL = process.env.OPENROUTER_MODEL || "meta-llama/Llama-3.3-70B-Instruct";

function truncateContent(content: string): string {
  if (content.length <= CONTENT_MAX_LENGTH) return content;
  return content.slice(0, CONTENT_MAX_LENGTH) + "\n\n(Content truncated for length. Generate based on the above.)";
}

function sseMessage(obj: object): string {
  return `data: ${JSON.stringify(obj)}\n\n`;
}

export async function POST(request: NextRequest) {
  let body: { url?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { url } = body;
  if (!url || typeof url !== "string") {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  try {
    new URL(url);
  } catch {
    return NextResponse.json({ error: "Invalid URL format" }, { status: 400 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  }

  const cookieStore = await cookies();
  const cookieMap = getCookieMapFromRequest(request);
  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name) {
        return request.cookies.get(name)?.value ?? cookieStore.get(name)?.value ?? cookieMap.get(name) ?? undefined;
      },
      set(name, value, options) {
        cookieStore.set({ name, value, ...options });
      },
      remove(name, options) {
        cookieStore.set({ name, value: "", ...options });
      },
    },
  });

  let user = (await supabase.auth.getUser()).data.user;
  if (!user) {
    const authHeader = request.headers.get("Authorization");
    const token = authHeader?.replace(/^Bearer\s+/i, "").trim();
    if (token) {
      const { data } = await supabase.auth.getUser(token);
      user = data.user;
    }
  }
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      const send = (obj: object) => controller.enqueue(encoder.encode(sseMessage(obj)));

      try {
        send({ stage: "scraping" });

        const result = await firecrawl.scrape(url, {
          formats: ["markdown"],
          timeout: 25_000,
        });

        if (!result || !result.markdown) {
          send({ stage: "error", error: "Failed to scrape the URL - no content returned" });
          controller.close();
          return;
        }

        const content = result.markdown;
        const metadata = result.metadata as { title?: string; description?: string; sourceURL?: string } | undefined;
        const truncatedContent = truncateContent(content);

        send({ stage: "generating" });

        const userPrompt = `Here is the content to repurpose:

Title: ${metadata?.title || "Untitled"}
Description: ${metadata?.description || "No description"}

Content:
${truncatedContent}

Please generate engaging social media content for all platforms as specified. Return only valid JSON.`;

        const completion = await openRouter.chat.send({
          model: OPENROUTER_MODEL,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: userPrompt },
          ],
          responseFormat: { type: "json_object" },
          temperature: 0.7,
        });

        const rawContent = completion.choices[0]?.message?.content;
        const responseText =
          typeof rawContent === "string"
            ? rawContent
            : Array.isArray(rawContent)
              ? (rawContent.find((c) => c && typeof c === "object" && "text" in c) as { text?: string } | undefined)?.text ?? ""
              : "";
        if (!responseText) {
          send({ stage: "error", error: "No response from AI" });
          controller.close();
          return;
        }

        const generatedContent = parseLLMJson(responseText);

        const { error: insertError } = await supabase
          .from("generated_content")
          .insert({
            user_id: user.id,
            prompt: url,
            source_url: metadata?.sourceURL || null,
            result: generatedContent,
          });

        if (insertError) {
          console.error("Insert error:", insertError);
          send({ stage: "error", error: "Failed to save generated content" });
          controller.close();
          return;
        }

        send({
          stage: "done",
          data: generatedContent,
          metadata: {
            title: metadata?.title,
            description: metadata?.description,
            sourceURL: metadata?.sourceURL,
          },
        });
      } catch (err) {
        console.error("Generate-from-URL error:", err);
        const message = err instanceof Error ? err.message : "Something went wrong";
        send({ stage: "error", error: message });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-store",
      Connection: "keep-alive",
    },
  });
}
