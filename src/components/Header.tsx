import React from 'react';
import { BeakerIcon } from '@heroicons/react/24/outline';

export const Header: React.FC = () => {
  return (
    <header className="mb-8 text-center">
      <div className="flex items-center justify-center gap-3">
        <BeakerIcon className="h-10 w-10 text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-900">AI Researcher</h1>
      </div>
      <p className="mt-2 text-gray-600">Your intelligent research assistant powered by AI</p>
    </header>
  );
}