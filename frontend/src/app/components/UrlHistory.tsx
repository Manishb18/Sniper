'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface UrlData {
  _id: string;
  longUrl: string;
  shortUrl: string;
  urlCode: string;
  clicks: number;
  createdAt: string;
}

interface UrlHistoryProps {
  urls: UrlData[];
}

export default function UrlHistory({ urls }: UrlHistoryProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedUrl, setExpandedUrl] = useState<string | null>(null);

  if (!urls || urls.length === 0) {
    return null;
  }

  const handleCopy = (shortUrl: string, id: string) => {
    navigator.clipboard.writeText(shortUrl);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  const truncateUrl = (url: string, maxLength = 40) => {
    if (url.length <= maxLength) return url;
    return url.substring(0, maxLength) + '...';
  };

  const tableVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="w-full p-8 bg-[var(--card-bg)] rounded-xl shadow-lg border border-[var(--border)]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-semibold mb-6 text-[var(--foreground)]">Recent URLs</h2>
      
      <div className="overflow-x-auto rounded-lg hide-scrollbar">
        <motion.table 
          className="min-w-full divide-y divide-[var(--border)]"
          variants={tableVariants}
          initial="hidden"
          animate="show"
        >
          <thead className="bg-[var(--background)]">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[var(--muted)] uppercase tracking-wider">
                Original URL
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[var(--muted)] uppercase tracking-wider">
                Short URL
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[var(--muted)] uppercase tracking-wider">
                Clicks
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[var(--muted)] uppercase tracking-wider">
                Created On
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[var(--muted)] uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {urls.map((url) => (
              <motion.tr 
                key={url._id}
                variants={rowVariants}
                whileHover={{ backgroundColor: 'var(--background)' }}
                transition={{ duration: 0.2 }}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--muted)] max-w-xs">
                  <div className="flex items-center">
                    <button 
                      onClick={() => setExpandedUrl(expandedUrl === url._id ? null : url._id)}
                      className="text-[var(--primary)] hover:text-[var(--accent)] text-left"
                    >
                      {expandedUrl === url._id ? url.longUrl : truncateUrl(url.longUrl)}
                    </button>
                    {url.longUrl.length > 40 && (
                      <motion.span 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className="ml-2 text-[var(--muted)]"
                      >
                        {expandedUrl === url._id ? (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        )}
                      </motion.span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <a 
                    href={url.shortUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[var(--primary)] hover:text-[var(--accent)] font-medium"
                  >
                    {url.shortUrl}
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <motion.span 
                    className="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-[var(--primary-light)] bg-opacity-20 text-[var(--primary)]"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    {url.clicks}
                  </motion.span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--muted)]">
                  {formatDate(url.createdAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <motion.button
                    onClick={() => handleCopy(url.shortUrl, url._id)}
                    className={`px-3 py-1 rounded-md text-sm transition-colors duration-200 ${
                      copiedId === url._id 
                        ? 'bg-[var(--secondary)] bg-opacity-20 text-[var(--secondary)]'
                        : 'bg-[var(--background)] text-[var(--foreground)] hover:bg-[var(--border)]'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {copiedId === url._id ? (
                        <motion.span 
                          key="copied"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Copied
                        </motion.span>
                      ) : (
                        <motion.span 
                          key="copy"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                          Copy
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </motion.table>
      </div>
    </motion.div>
  );
}