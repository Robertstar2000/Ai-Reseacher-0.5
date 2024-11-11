import React, { useState } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

interface ResearchInputProps {
  onSubmit: (query: string) => Promise<void>;
  isLoading: boolean;
}

export const ResearchInput: React.FC<ResearchInputProps> = ({ onSubmit, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      await onSubmit(query.trim());
      setQuery('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter your research query..."
        className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading || !query.trim()}
        className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-blue-300"
      >
        <PaperAirplaneIcon className="h-5 w-5" />
      </button>
    </form>
  );
}