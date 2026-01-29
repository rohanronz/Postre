import { NextRequest, NextResponse } from "next/server";
import { OpenRouter } from "@openrouter/sdk";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getCookieMapFromRequest } from "@/lib/cookie-from-request";
import { parseLLMJson } from "@/lib/parse-llm-json";

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

export async function POST(request: NextRequest) {
  try {
    const { content, metadata, prompt } = await request.json();

    if (!content) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      );
    }

    const truncatedContent = truncateContent(content);

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
      return NextResponse.json(
        { error: "No response from AI" },
        { status: 500 }
      );
    }

    const generatedContent = parseLLMJson(responseText);

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json(
        { error: "Supabase not configured" },
        { status: 500 }
      );
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
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { error: insertError } = await supabase
      .from("generated_content")
      .insert({
        user_id: user.id,
        prompt: prompt || metadata?.title || null,
        source_url: metadata?.sourceURL || null,
        result: generatedContent,
      });

    if (insertError) {
      console.error("Insert error:", insertError);
      return NextResponse.json(
        { error: "Failed to save generated content" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: generatedContent,
    });
  } catch (error) {
    console.error("Generate error:", error);
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 }
    );
  }
}
