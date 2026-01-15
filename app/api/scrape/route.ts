import { NextRequest, NextResponse } from "next/server";
import Firecrawl from "@mendable/firecrawl-js";

const firecrawl = new Firecrawl({
  apiKey: process.env.FIRECRAWL_API_KEY!,
});

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: "URL is required" },
        { status: 400 }
      );
    }

    // Validate URL format
    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { error: "Invalid URL format" },
        { status: 400 }
      );
    }

    // Scrape the URL using Firecrawl
    // SDK returns the data object directly
    const result = await firecrawl.scrape(url, {
      formats: ["markdown"],
    });

    if (!result || !result.markdown) {
      return NextResponse.json(
        { error: "Failed to scrape the URL - no content returned" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        markdown: result.markdown,
        metadata: result.metadata,
      },
    });
  } catch (error) {
    console.error("Scrape error:", error);
    return NextResponse.json(
      { error: "Failed to scrape content" },
      { status: 500 }
    );
  }
}
