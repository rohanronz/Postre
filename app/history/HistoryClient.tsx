"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, ChevronDown, Sparkles } from "lucide-react";
import ContentCard from "@/components/app/ContentCard";
import LogoutButton from "@/components/auth/LogoutButton";

type GeneratedResult = {
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
};

type HistoryItem = {
  id: string;
  prompt: string | null;
  source_url: string | null;
  created_at: string;
  result: GeneratedResult;
};

export default function HistoryClient({ items }: { items: HistoryItem[] }) {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 dark:bg-gray-900 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link
                href="/app"
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors dark:text-gray-300 dark:hover:text-blue-400"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to app
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/app"
                className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors dark:text-gray-300 dark:hover:text-blue-400"
              >
                New generation
              </Link>
              <LogoutButton className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors dark:text-gray-300 dark:hover:text-white" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">History</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Revisit previously generated content and copy it anytime.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              You haven&apos;t generated any content yet.
            </p>
            <Link
              href="/app"
              className="inline-flex mt-4 text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Generate your first post
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item, index) => {
              const isOpen = openItems.includes(item.id);
              const contentId = `history-item-${item.id}`;
              const accent =
                index % 3 === 0
                  ? "from-blue-500/10 via-indigo-500/10 to-purple-500/10 border-blue-200 dark:border-blue-900"
                  : index % 3 === 1
                  ? "from-emerald-500/10 via-teal-500/10 to-sky-500/10 border-emerald-200 dark:border-emerald-900"
                  : "from-orange-500/10 via-rose-500/10 to-pink-500/10 border-rose-200 dark:border-rose-900";

              return (
                <section
                  key={item.id}
                  className={`rounded-2xl border bg-white dark:bg-gray-900 overflow-hidden ${accent}`}
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-gray-50 transition-colors dark:hover:bg-gray-800"
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(item.created_at).toLocaleString()}
                      </div>
                      <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                        {item.prompt || item.source_url || "Untitled"}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 rounded-full bg-white/80 px-2 py-0.5 text-xs font-medium text-blue-600 shadow-sm dark:bg-gray-800 dark:text-blue-300">
                          <Sparkles className="h-3 w-3" />
                          Generated
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 break-all line-clamp-2">
                          {item.source_url || "No source URL"}
                        </span>
                      </div>
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {isOpen && (
                    <div id={contentId} className="px-6 pb-6">
                      {item.source_url && (
                        <Link
                          href={item.source_url}
                          className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 break-all"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {item.source_url}
                        </Link>
                      )}
                      {!item.source_url && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {item.prompt || "Untitled source"}
                        </p>
                      )}
                      <div className="mt-6 grid grid-cols-1 xl:grid-cols-2 gap-6">
                        <ContentCard platform="linkedin" content={item.result.linkedin} />
                        <ContentCard platform="twitter" content={item.result.twitter} />
                        <ContentCard platform="facebook" content={item.result.facebook} />
                        <ContentCard platform="newsletter" content={item.result.newsletter} />
                        <ContentCard platform="blog" content={item.result.blog} />
                      </div>
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
