import React from 'react';

interface ProgressBarProps {
  progress: number;
  total: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress, total }) => {
  const percentage = Math.round((progress / total) * 100);
  
  return (
    <div className="w-full">
      <div className="mb-1 flex justify-between text-xs text-gray-600">
        <span>Progress</span>
        <span>{percentage}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-blue-600 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};