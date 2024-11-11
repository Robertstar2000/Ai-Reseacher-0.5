import React from 'react';
import ReactMarkdown from 'react-markdown';

interface ResearchResultProps {
  title: string;
  content: string;
  citations: string[];
}

export const ResearchResult: React.FC<ResearchResultProps> = ({ 
  title, 
  content, 
  citations 
}) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <h3 className="mb-4 text-xl font-semibold text-gray-900">{title}</h3>
      <div className="prose max-w-none">
        <ReactMarkdown>{content}</ReactMarkdown>
        {citations.length > 0 && (
          <>
            <h4 className="mt-4 font-semibold text-gray-900">References</h4>
            <ol className="list-decimal space-y-2 pl-5 text-gray-700">
              {citations.map((citation, index) => (
                <li key={index} className="pl-2">
                  {citation}
                </li>
              ))}
            </ol>
          </>
        )}
      </div>
    </div>
  );
};