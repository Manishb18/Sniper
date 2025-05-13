'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface UrlFormProps {
  onUrlShorten: (longUrl: string) => Promise<void>;
  isLoading: boolean;
}

export default function UrlForm({ onUrlShorten, isLoading }: UrlFormProps) {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic URL validation
    if (!url) {
      setError('Please enter a URL');
      return;
    }

    try {
      // Check if URL is valid
      new URL(url);
      setError('');
      await onUrlShorten(url);
      // Clear form after successful submission
      setUrl('');
    } catch (err) {
      setError('Please enter a valid URL');
    }
  };

  return (
    <motion.div 
      className="w-full p-8 bg-[var(--card-bg)] rounded-xl shadow-lg border border-[var(--border)]"
      whileHover={{ boxShadow: '0 10px 25px -5px rgba(99, 102, 241, 0.1), 0 8px 10px -6px rgba(99, 102, 241, 0.1)' }}
      transition={{ duration: 0.2 }}
    >
      <h2 className="text-2xl font-bold mb-6 text-[var(--foreground)]">Shorten Your URL</h2>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-[var(--muted)] mb-2">
            Enter a long URL
          </label>
          <motion.div 
            className={`relative rounded-md transition duration-200 ${isFocused ? 'ring-2 ring-[var(--primary)] ring-opacity-50' : ''}`}
            animate={{ borderColor: error ? '#f87171' : isFocused ? 'var(--primary)' : 'var(--border)' }}
          >
            <input
              type="text"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="https://example.com/very/long/url/that/needs/shortening"
              className="w-full px-4 py-3 border border-[var(--border)] rounded-md focus:outline-none text-[var(--foreground)] bg-[var(--card-bg)] transition-all duration-200"
              disabled={isLoading}
            />
          </motion.div>
          
          {error && (
            <motion.p 
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-2 text-sm text-red-600"
            >
              {error}
            </motion.p>
          )}
        </div>

        <motion.button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-4 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white font-semibold rounded-md shadow transition duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-opacity-50 disabled:opacity-50"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.1 }}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <motion.div
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <span className="ml-2">Shortening...</span>
            </div>
          ) : (
            'Shorten URL'
          )}
        </motion.button>
      </form>
    </motion.div>
  );
}