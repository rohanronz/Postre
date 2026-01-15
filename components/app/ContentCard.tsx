"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy, Linkedin, Twitter, Facebook, Mail, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

type Platform = "linkedin" | "twitter" | "facebook" | "newsletter" | "blog";

type BlogContent = {
  summary?: string;
  keyTakeaways?: string[];
  metaDescription?: string;
};

interface ContentCardProps {
  platform: Platform;
  content: string | string[] | { subject?: string; body?: string } | BlogContent;
  delay?: number;
}

const platformConfig = {
  linkedin: {
    name: "LinkedIn",
    icon: Linkedin,
    color: "bg-blue-600",
    lightColor: "bg-blue-50 text-blue-600",
    borderColor: "border-blue-200",
  },
  twitter: {
    name: "Twitter / X",
    icon: Twitter,
    color: "bg-black",
    lightColor: "bg-gray-100 text-gray-900",
    borderColor: "border-gray-200",
  },
  facebook: {
    name: "Facebook",
    icon: Facebook,
    color: "bg-blue-500",
    lightColor: "bg-blue-50 text-blue-500",
    borderColor: "border-blue-200",
  },
  newsletter: {
    name: "Newsletter",
    icon: Mail,
    color: "bg-purple-600",
    lightColor: "bg-purple-50 text-purple-600",
    borderColor: "border-purple-200",
  },
  blog: {
    name: "Blog Summary",
    icon: FileText,
    color: "bg-green-600",
    lightColor: "bg-green-50 text-green-600",
    borderColor: "border-green-200",
  },
};

export default function ContentCard({ platform, content, delay = 0 }: ContentCardProps) {
  const [copied, setCopied] = useState(false);
  const config = platformConfig[platform];
  const Icon = config.icon;

  const getDisplayContent = () => {
    if (typeof content === "string") {
      return content;
    }
    if (Array.isArray(content)) {
      return content.map((tweet, i) => `${i + 1}. ${tweet}`).join("\n\n");
    }
    if (platform === "newsletter" && typeof content === "object") {
      const newsletter = content as { subject?: string; body?: string };
      return `Subject: ${newsletter.subject || ""}\n\n${newsletter.body || ""}`;
    }
    if (platform === "blog" && typeof content === "object") {
      const blog = content as BlogContent;
      const keyTakeaways = blog.keyTakeaways ?? [];
      let text = blog.summary || "";
      if (keyTakeaways.length) {
        text += "\n\nKey Takeaways:\n" + keyTakeaways.map((t) => `• ${t}`).join("\n");
      }
      if (blog.metaDescription) {
        text += `\n\nMeta Description: ${blog.metaDescription}`;
      }
      return text;
    }
    return "";
  };

  const handleCopy = async () => {
    const textToCopy = getDisplayContent();
    await navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "bg-white rounded-2xl border shadow-sm overflow-hidden dark:bg-gray-900",
        config.borderColor,
        "dark:border-gray-800"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className={cn("p-2 rounded-lg", config.lightColor, "dark:bg-opacity-20")}>
            <Icon className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white">{config.name}</h3>
        </div>
        <button
          onClick={handleCopy}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors dark:hover:bg-gray-800"
          title="Copy to clipboard"
        >
          {copied ? (
            <Check className="w-5 h-5 text-green-500" />
          ) : (
            <Copy className="w-5 h-5 text-gray-400" />
          )}
        </button>
      </div>
      <div className="p-4">
        {platform === "twitter" && Array.isArray(content) ? (
          <div className="space-y-3">
            {content.map((tweet, index) => (
              <div
                key={index}
                className="p-3 bg-gray-50 rounded-lg text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-300"
              >
                <span className="text-xs text-gray-400 mb-1 block">Tweet {index + 1}</span>
                {tweet}
              </div>
            ))}
          </div>
        ) : platform === "newsletter" && typeof content === "object" ? (
          <div className="space-y-3">
            <div className="p-3 bg-purple-50 rounded-lg dark:bg-purple-900/20">
              <span className="text-xs text-purple-500 mb-1 block">Subject Line</span>
              <p className="font-medium text-gray-900 dark:text-white">
                {(content as { subject?: string }).subject}
              </p>
            </div>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap dark:text-gray-300">
              {(content as { body?: string }).body}
            </p>
          </div>
        ) : platform === "blog" && typeof content === "object" ? (
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed dark:text-gray-300">
              {(content as BlogContent).summary}
            </p>
            {(() => {
              const keyTakeaways = (content as BlogContent).keyTakeaways ?? [];
              if (!keyTakeaways.length) {
                return null;
              }
              return (
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2 dark:text-white">Key Takeaways</h4>
                <ul className="space-y-1">
                  {keyTakeaways.map((takeaway, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <span className="text-green-500">•</span>
                      {takeaway}
                    </li>
                  ))}
                </ul>
              </div>
              );
            })()}
            {(content as BlogContent).metaDescription && (
              <div className="p-3 bg-green-50 rounded-lg dark:bg-green-900/20">
                <span className="text-xs text-green-600 mb-1 block">Meta Description</span>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {(content as BlogContent).metaDescription}
                </p>
              </div>
            )}
          </div>
        ) : (
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap dark:text-gray-300">
            {getDisplayContent()}
          </p>
        )}
      </div>
    </motion.div>
  );
}
