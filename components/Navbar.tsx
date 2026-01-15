"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "About", href: "#about" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 dark:bg-black/80 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Postre
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium dark:text-gray-300 dark:hover:text-blue-400"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/login"
              className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium dark:text-gray-300 dark:hover:text-blue-400"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-medium border border-gray-200 hover:border-gray-300 transition-colors dark:bg-black dark:text-white dark:border-gray-700"
            >
              Sign up
            </Link>
            <Link href="/app" className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2 dark:bg-white dark:text-black dark:hover:bg-gray-200">
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none dark:text-gray-300 dark:hover:text-white"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 dark:bg-black dark:border-gray-800"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-900"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4">
                <Link
                  href="/login"
                  className="w-full border border-gray-200 text-gray-900 px-4 py-3 rounded-xl text-base font-medium hover:border-gray-300 transition-colors flex items-center justify-center gap-2 dark:border-gray-700 dark:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="w-full mt-3 bg-white text-gray-900 px-4 py-3 rounded-xl text-base font-medium border border-gray-200 hover:border-gray-300 transition-colors flex items-center justify-center gap-2 dark:bg-black dark:text-white dark:border-gray-700"
                  onClick={() => setIsOpen(false)}
                >
                  Sign up
                </Link>
                <Link href="/app" className="w-full mt-3 bg-black text-white px-4 py-3 rounded-xl text-base font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 dark:bg-white dark:text-black dark:hover:bg-gray-200" onClick={() => setIsOpen(false)}>
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
