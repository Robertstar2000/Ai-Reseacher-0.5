import React from 'react';
import { ResearchMode } from '../types';
import { BeakerIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

interface ResearchModeSelectorProps {
  selectedMode: ResearchMode;
  onChange: (mode: ResearchMode) => void;
}

export const ResearchModeSelector: React.FC<ResearchModeSelectorProps> = ({
  selectedMode,
  onChange,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <button
          onClick={() => onChange('basic')}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg border p-4 transition-colors ${
            selectedMode === 'basic'
              ? 'border-blue-600 bg-blue-50 text-blue-700'
              : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          <BeakerIcon className="h-5 w-5" />
          <span className="font-medium">Basic Research</span>
        </button>
        <button
          onClick={() => onChange('advanced')}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg border p-4 transition-colors ${
            selectedMode === 'advanced'
              ? 'border-blue-600 bg-blue-50 text-blue-700'
              : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          <AcademicCapIcon className="h-5 w-5" />
          <span className="font-medium">Advanced Research</span>
        </button>
      </div>
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm">
        <h4 className="mb-2 font-semibold text-amber-800">Processing Time Notice</h4>
        <p className="mb-3 text-amber-700">
          Due to extensive computational requirements:
          <br />• Basic Research: May take several minutes to complete
          <br />• Advanced Research: Can take hours for comprehensive analysis
        </p>
        <h4 className="mb-2 font-semibold text-amber-800">Target Users</h4>
        <p className="mb-3 text-amber-700">
          This application is designed for anyone conducting research, including:
          <br />• Scientists and Researchers
          <br />• Engineers and Technical Professionals
          <br />• Laboratory Workers
          <br />• Research Enthusiasts and Hobbyists
        </p>
        <p className="text-xs text-amber-600">
          <strong>Acknowledgment:</strong> Special thanks to the creators of AI Scientist (GitHub) 
          whose innovative work inspired the development of this software.
        </p>
      </div>
    </div>
  );
};