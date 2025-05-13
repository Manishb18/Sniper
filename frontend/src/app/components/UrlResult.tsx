'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface UrlResultProps {
  shortUrl: string | null;
}

export default function UrlResult({ shortUrl }: UrlResultProps) {
  const [copied, setCopied] = useState(false);

  if (!shortUrl) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <motion.div 
      className="w-full p-8 bg-[var(--card-bg)] rounded-xl shadow-lg border border-[var(--border)]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-xl font-semibold mb-5 text-[var(--foreground)]">Your Shortened URL</h2>
      
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <motion.div 
          className="flex-1 p-4 bg-[var(--background)] rounded-lg border border-[var(--border)] break-all relative overflow-hidden"
          whileHover={{ backgroundColor: 'var(--card-bg)' }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="absolute inset-0 bg-[var(--primary-light)] origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{ zIndex: 0, opacity: 0.1 }}
          />
          <a 
            href={shortUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[var(--primary)] hover:underline relative z-10"
          >
            {shortUrl}
          </a>
        </motion.div>
        
        <motion.button
          onClick={handleCopy}
          className={`py-3 px-6 rounded-lg font-medium shadow-sm transition-colors duration-200 flex items-center justify-center ${copied ? 'bg-[var(--secondary)] text-white' : 'bg-[var(--primary)] hover:bg-[var(--accent)] text-white'}`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <motion.div
                key="copied"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="flex items-center"
              >
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Copied!</span>
              </motion.div>
            ) : (
              <motion.div
                key="copy"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.2 }}
                className="flex items-center"
              >
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span>Copy</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
      
      <motion.p 
        className="mt-4 text-sm text-[var(--muted)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Click the link to open, or copy to share with others
      </motion.p>
    </motion.div>
  );
}