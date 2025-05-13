'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import UrlForm from './components/UrlForm';
import UrlResult from './components/UrlResult';
import UrlHistory from './components/UrlHistory';
import Header from './components/Header';
import { shortenUrl, getUserUrls, UrlData } from './services/api';
import { useAuth } from './contexts/AuthContext';

export default function Home() {
  const { isAuthenticated, token } = useAuth();
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [urlHistory, setUrlHistory] = useState<UrlData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch URL history on component mount and when authentication state changes
  useEffect(() => {
    if (isAuthenticated && token) {
      fetchUserUrlHistory();
    } else {
      // Clear history if user logs out
      setUrlHistory([]);
    }
  }, [isAuthenticated, token]);

  // Function to fetch URL history for authenticated users
  const fetchUserUrlHistory = async () => {
    if (!token) return;
    
    try {
      const response = await getUserUrls(token);
      if (response.success && response.urls) {
        setUrlHistory(response.urls);
      }
    } catch (err) {
      console.error('Failed to fetch URL history:', err);
    }
  };

  // Function to handle URL shortening
  const handleUrlShorten = async (longUrl: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Pass token if user is authenticated
      const response = await shortenUrl(longUrl, token);
      
      if (response.success && response.url) {
        setShortUrl(response.url.shortUrl);
        
        // Refresh URL history for authenticated users
        if (isAuthenticated && token) {
          fetchUserUrlHistory();
        }
      } else {
        setError(response.message || 'Failed to shorten URL');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[var(--background)] to-[var(--card-bg)]">
      <Header />
      
      <div className="py-8 px-4">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="text-center mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] mb-3">URL Shortener</h1>
            <p className="text-xl text-[var(--muted)]">
              Simplify your links with our easy-to-use URL shortener
            </p>
            
            {!isAuthenticated && (
              <motion.p
                className="mt-4 text-sm text-[var(--muted)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                Sign in to save and track your shortened URLs
              </motion.p>
            )}
          </motion.div>

          <div className="grid grid-cols-1 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <UrlForm 
                onUrlShorten={handleUrlShorten} 
                isLoading={isLoading} 
              />
            </motion.div>
            
            <AnimatePresence>
              {error && (
                <motion.div 
                  className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg shadow-sm"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    {error}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <AnimatePresence>
              {shortUrl && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <UrlResult shortUrl={shortUrl} />
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Only show URL history for authenticated users */}
            <AnimatePresence>
              {isAuthenticated && urlHistory.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <UrlHistory urls={urlHistory} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </main>
  );
}