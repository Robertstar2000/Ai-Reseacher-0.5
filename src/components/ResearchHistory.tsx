import React from 'react';
import { ResearchHistory as ResearchHistoryType } from '../types';
import { ResearchResult } from './ResearchResult';

interface ResearchHistoryProps {
  history: ResearchHistoryType[];
  onClearHistory: () => void;
}

export const ResearchHistory: React.FC<ResearchHistoryProps> = ({
  history,
  onClearHistory,
}) => {
  if (!Array.isArray(history) || history.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Research History</h2>
        <button
          onClick={onClearHistory}
          className="text-sm text-red-600 hover:text-red-700"
        >
          Clear History
        </button>
      </div>
      <div className="space-y-8">
        {history.map((item) => {
          if (!item?.sections || !Array.isArray(item.sections)) return null;
          
          return (
            <div key={item.id} className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Query: {item.query}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {new Date(item.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                {item.sections.map((section) => (
                  <ResearchResult
                    key={section.id}
                    title={section.title}
                    content={section.response}
                    citations={section.citations}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}