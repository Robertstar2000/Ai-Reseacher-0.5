import React from 'react';
import { CitationStyle } from '../types';

interface CitationStyleSelectorProps {
  selectedStyle: CitationStyle;
  onChange: (style: CitationStyle) => void;
}

export const CitationStyleSelector: React.FC<CitationStyleSelectorProps> = ({
  selectedStyle,
  onChange,
}) => {
  return (
    <div className="mb-4">
      <label className="text-sm font-medium text-gray-700">Citation Style:</label>
      <div className="mt-2 space-y-2">
        <label className="flex items-center">
          <input
            type="radio"
            value="academic"
            checked={selectedStyle === 'academic'}
            onChange={() => onChange('academic')}
            className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="ml-2 text-sm text-gray-700">
            Academic (APA/MLA style)
          </span>
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            value="web"
            checked={selectedStyle === 'web'}
            onChange={() => onChange('web')}
            className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="ml-2 text-sm text-gray-700">
            Web Links (URLs with titles)
          </span>
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            value="informal"
            checked={selectedStyle === 'informal'}
            onChange={() => onChange('informal')}
            className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="ml-2 text-sm text-gray-700">
            Informal (In-text mentions)
          </span>
        </label>
      </div>
    </div>
  );
}