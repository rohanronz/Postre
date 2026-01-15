"use client";

import { motion } from "framer-motion";
import { Link, Sparkles, Share2, Zap, Brain, Globe, MessageSquare } from "lucide-react";

const features = [
  {
    name: "Smart Scraping",
    description: "Simply paste a URL and our advanced scraper will extract the main content, ignoring ads and clutter.",
    icon: Link,
    color: "bg-blue-100 text-blue-600",
  },
  {
    name: "AI Generation",
    description: "Our fine-tuned AI models analyze the context and tone to generate high-quality, engaging posts.",
    icon: Brain,
    color: "bg-purple-100 text-purple-600",
  },
  {
    name: "Multi-Platform Support",
    description: "Generate tailored content for LinkedIn, Twitter, Facebook, and even Newsletter formats instantly.",
    icon: Share2,
    color: "bg-pink-100 text-pink-600",
  },
  {
    name: "Tone Customization",
    description: "Choose from various tones like Professional, Casual, Witty, or Controversial to match your brand.",
    icon: MessageSquare,
    color: "bg-orange-100 text-orange-600",
  },
  {
    name: "Global Reach",
    description: "Translate and repurpose content into multiple languages to reach a wider audience effortlessly.",
    icon: Globe,
    color: "bg-green-100 text-green-600",
  },
  {
    name: "Lightning Fast",
    description: "Get weeks worth of social media content in seconds, not hours. Save time for what matters.",
    icon: Zap,
    color: "bg-yellow-100 text-yellow-600",
  },
];

export default function Features() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section id="features" className="py-24 bg-gray-50 dark:bg-black/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-600 text-sm font-medium mb-6 dark:bg-purple-900/30 dark:border-purple-800 dark:text-purple-300"
          >
            <Sparkles className="w-4 h-4" />
            <span>Powerful Features</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 dark:text-white"
          >
            Everything you need to scale your content
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-300"
          >
            Stop wasting time manually writing social media posts. Let our AI handle the heavy lifting while you focus on strategy.
          </motion.p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.name}
              variants={item}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow dark:bg-gray-900 dark:border-gray-800"
            >
              <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-6 dark:bg-opacity-20`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 dark:text-white">
                {feature.name}
              </h3>
              <p className="text-gray-600 leading-relaxed dark:text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
