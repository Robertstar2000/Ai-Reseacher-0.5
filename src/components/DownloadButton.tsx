import React from 'react';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { ResearchSection } from '../types';
import { downloadDocument } from '../utils/downloadUtils';

interface DownloadButtonProps {
  sections: ResearchSection[];
  query: string;
  apiKey: string;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({ 
  sections, 
  query,
  apiKey 
}) => {
  const handleDownload = async (format: 'md' | 'docx') => {
    try {
      await downloadDocument(sections, query, apiKey, format);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => handleDownload('md')}
        className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
      >
        <ArrowDownTrayIcon className="h-5 w-5" />
        Download Markdown
      </button>
      <button
        onClick={() => handleDownload('docx')}
        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        <ArrowDownTrayIcon className="h-5 w-5" />
        Download DOCX
      </button>
    </div>
  );
};