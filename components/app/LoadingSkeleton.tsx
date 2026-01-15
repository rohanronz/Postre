"use client";

import { motion } from "framer-motion";

export default function LoadingSkeleton() {
  const platforms = [
    { name: "LinkedIn", color: "bg-blue-100" },
    { name: "Twitter / X", color: "bg-gray-100" },
    { name: "Facebook", color: "bg-blue-100" },
    { name: "Newsletter", color: "bg-purple-100" },
    { name: "Blog Summary", color: "bg-green-100" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {platforms.map((platform, index) => (
        <motion.div
          key={platform.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="bg-white rounded-2xl border border-gray-200 overflow-hidden dark:bg-gray-900 dark:border-gray-800"
        >
          <div className="flex items-center gap-3 p-4 border-b border-gray-100 dark:border-gray-800">
            <div className={`w-9 h-9 rounded-lg ${platform.color} animate-pulse dark:bg-gray-700`} />
            <div className="h-5 w-24 bg-gray-200 rounded animate-pulse dark:bg-gray-700" />
          </div>
          <div className="p-4 space-y-3">
            <div className="h-4 bg-gray-100 rounded w-full animate-pulse dark:bg-gray-800" />
            <div className="h-4 bg-gray-100 rounded w-5/6 animate-pulse dark:bg-gray-800" />
            <div className="h-4 bg-gray-100 rounded w-4/6 animate-pulse dark:bg-gray-800" />
            <div className="h-4 bg-gray-100 rounded w-full animate-pulse dark:bg-gray-800" />
            <div className="h-4 bg-gray-100 rounded w-3/4 animate-pulse dark:bg-gray-800" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
