"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, AlertCircle } from "lucide-react";
import Link from "next/link";
import URLForm from "@/components/app/URLForm";
import ContentCard from "@/components/app/ContentCard";
import LoadingSkeleton from "@/components/app/LoadingSkeleton";
import LogoutButton from "@/components/auth/LogoutButton";
import { createClient } from "@/lib/supabase/client";

interface GeneratedContent {
  linkedin: string;
  twitter: string[];
  facebook: string;
  newsletter: {
    subject: string;
    body: string;
  };
  blog: {
    summary: string;
    keyTakeaways: string[];
    metaDescription: string;
  };
}

interface ScrapedMetadata {
  title?: string;
  description?: string;
  sourceURL?: string;
}

type GenerateStep = "scraping" | "generating";

interface AppClientProps {
  isDemo?: boolean;
}

export default function AppClient({ isDemo = false }: AppClientProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<GenerateStep | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [metadata, setMetadata] = useState<ScrapedMetadata | null>(null);

  const handleSubmit = async (url: string) => {
    setIsLoading(true);
    setError(null);
    setGeneratedContent(null);
    setStep("scraping");

    try {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (session?.access_token) {
        headers.Authorization = `Bearer ${session.access_token}`;
      }
      if (isDemo) {
        headers["X-Postre-Demo"] = "1";
      }
      const res = await fetch("/api/generate-from-url", {
        method: "POST",
        credentials: "include",
        headers,
        body: JSON.stringify({ url }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Request failed");
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No response body");

      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          try {
            const payload = JSON.parse(line.slice(6)) as {
              stage?: string;
              error?: string;
              data?: GeneratedContent;
              metadata?: ScrapedMetadata;
            };
            if (payload.stage === "scraping") setStep("scraping");
            else if (payload.stage === "generating") setStep("generating");
            else if (payload.stage === "done") {
              if (payload.data) setGeneratedContent(payload.data);
              if (payload.metadata) setMetadata(payload.metadata);
              setStep(null);
            } else if (payload.stage === "error") {
              throw new Error(payload.error ?? "Unknown error");
            }
          } catch (e) {
            if (e instanceof SyntaxError) continue;
            throw e;
          }
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStep(null);
    } finally {
      setIsLoading(false);
      setStep(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 dark:bg-gray-900 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors dark:text-gray-400 dark:hover:text-gray-200"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm font-medium">Back</span>
              </Link>
              <div className="h-6 w-px bg-gray-200 dark:bg-gray-700" />
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">P</span>
                </div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                  Postre
                </span>
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/history"
                className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors dark:text-gray-300 dark:hover:text-blue-400"
              >
                History
              </Link>
              <LogoutButton className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors dark:text-gray-300 dark:hover:text-white" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium mb-4 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI Content Generator</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 dark:text-white"
          >
            Repurpose Your Content
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto dark:text-gray-300"
          >
            Enter a URL to any blog post or article, and we&apos;ll generate engaging content for all your social media platforms.
          </motion.p>
        </div>

        <div className="mb-12">
          <URLForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 dark:bg-red-900/20 dark:border-red-800"
          >
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-red-800 dark:text-red-300">Error</h3>
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          </motion.div>
        )}

        {metadata && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 bg-white border border-gray-200 rounded-xl dark:bg-gray-900 dark:border-gray-800"
          >
            <p className="text-sm text-gray-500 mb-1 dark:text-gray-400">Source</p>
            <h2 className="font-semibold text-gray-900 dark:text-white">{metadata.title}</h2>
            {metadata.description && (
              <p className="text-sm text-gray-600 mt-1 dark:text-gray-400">{metadata.description}</p>
            )}
          </motion.div>
        )}

        {isLoading && (
          <div className="mb-6">
            <p className="text-center text-sm font-medium text-gray-600 dark:text-gray-400 mb-4">
              {step === "scraping"
                ? "Scraping URL…"
                : step === "generating"
                  ? "Generating content…"
                  : "Loading…"}
            </p>
            <LoadingSkeleton />
          </div>
        )}

        {generatedContent && !isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ContentCard platform="linkedin" content={generatedContent.linkedin} delay={0} />
            <ContentCard platform="twitter" content={generatedContent.twitter} delay={0.1} />
            <ContentCard platform="facebook" content={generatedContent.facebook} delay={0.2} />
            <ContentCard platform="newsletter" content={generatedContent.newsletter} delay={0.3} />
            <ContentCard platform="blog" content={generatedContent.blog} delay={0.4} />
          </div>
        )}

        {!isLoading && !generatedContent && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center py-16"
          >
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 dark:bg-gray-800">
              <Sparkles className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2 dark:text-white">
              Ready to generate content
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Enter a URL above to get started
            </p>
          </motion.div>
        )}
      </main>
    </div>
  );
}
