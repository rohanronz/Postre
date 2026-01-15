import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 dark:bg-black dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                Postre
              </span>
            </Link>
            <p className="text-gray-500 max-w-xs mb-6 dark:text-gray-400">
              Transforming your content into engaging social media posts with the power of AI.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4 dark:text-white">Product</h3>
            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <li><Link href="#features" className="hover:text-blue-600 transition-colors">Features</Link></li>
              <li><Link href="#pricing" className="hover:text-blue-600 transition-colors">Pricing</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Integrations</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Changelog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4 dark:text-white">Company</h3>
            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <li><Link href="#" className="hover:text-blue-600 transition-colors">About</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Privacy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-100 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} Postre. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
