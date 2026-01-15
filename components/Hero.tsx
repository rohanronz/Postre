"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Wand2 } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Hero() {
  const [inputValue, setInputValue] = useState("");
  
  // Animation for the typing effect
  useEffect(() => {
    const text = "https://my-awesome-blog.com/article";
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setInputValue(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white dark:bg-black">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/20 rounded-full blur-[100px] mix-blend-multiply dark:bg-blue-900/20" />
        <div className="absolute top-20 right-20 w-72 h-72 bg-indigo-400/20 rounded-full blur-[100px] mix-blend-multiply dark:bg-indigo-900/20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium mb-6 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Content Repurposing</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-6 dark:text-white"
          >
            Turn One URL into <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Weeks of Content
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 mb-8 dark:text-gray-300"
          >
            Instantly transform your blog posts and articles into engaging social media content for LinkedIn, Twitter, and newsletters using advanced AI.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/app" className="px-8 py-4 bg-blue-600 text-white rounded-full font-semibold text-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-lg shadow-blue-600/25">
              Start Repurposing Free
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-full font-semibold text-lg hover:bg-gray-50 transition-colors dark:bg-gray-900 dark:text-gray-300 dark:border-gray-800 dark:hover:bg-gray-800">
              View Demo
            </button>
          </motion.div>
        </div>

        {/* Animated visual representation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-20 relative max-w-4xl mx-auto"
        >
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 p-4 dark:bg-gray-900/80 dark:border-gray-800">
            <div className="flex items-center gap-2 mb-4 px-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 items-center p-4 bg-gray-50 rounded-xl border border-gray-100 dark:bg-black dark:border-gray-800">
              <div className="flex-1 w-full bg-white p-3 rounded-lg border border-gray-200 flex items-center gap-3 shadow-sm dark:bg-gray-900 dark:border-gray-700">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center dark:bg-gray-800">
                  <span className="text-gray-400 font-serif">A</span>
                </div>
                <div className="flex-1 h-6 relative overflow-hidden">
                   <span className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-500 font-mono text-sm truncate w-full">
                     {inputValue}<span className="animate-pulse">|</span>
                   </span>
                </div>
              </div>
              
              <div className="p-2 bg-blue-600 rounded-full text-white shadow-lg shrink-0">
                <Wand2 className="w-6 h-6 animate-pulse" />
              </div>

              <div className="flex-1 w-full grid grid-cols-3 gap-2">
                 <div className="h-24 bg-white rounded-lg border border-gray-200 p-2 shadow-sm flex flex-col gap-2 dark:bg-gray-900 dark:border-gray-700">
                    <div className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center dark:bg-blue-900/30">
                       <span className="text-xs text-blue-600 font-bold">in</span>
                    </div>
                    <div className="space-y-1">
                      <div className="h-2 w-full bg-gray-100 rounded dark:bg-gray-800" />
                      <div className="h-2 w-2/3 bg-gray-100 rounded dark:bg-gray-800" />
                    </div>
                 </div>
                 <div className="h-24 bg-white rounded-lg border border-gray-200 p-2 shadow-sm flex flex-col gap-2 dark:bg-gray-900 dark:border-gray-700">
                    <div className="w-6 h-6 rounded bg-sky-100 flex items-center justify-center dark:bg-sky-900/30">
                       <span className="text-xs text-sky-600 font-bold">X</span>
                    </div>
                    <div className="space-y-1">
                      <div className="h-2 w-full bg-gray-100 rounded dark:bg-gray-800" />
                      <div className="h-2 w-3/4 bg-gray-100 rounded dark:bg-gray-800" />
                    </div>
                 </div>
                 <div className="h-24 bg-white rounded-lg border border-gray-200 p-2 shadow-sm flex flex-col gap-2 dark:bg-gray-900 dark:border-gray-700">
                    <div className="w-6 h-6 rounded bg-orange-100 flex items-center justify-center dark:bg-orange-900/30">
                       <span className="text-xs text-orange-600 font-bold">M</span>
                    </div>
                    <div className="space-y-1">
                      <div className="h-2 w-full bg-gray-100 rounded dark:bg-gray-800" />
                      <div className="h-2 w-1/2 bg-gray-100 rounded dark:bg-gray-800" />
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
