import React, { useState } from 'react';

interface TitleConfirmationProps {
  generatedTitle: string;
  onConfirm: (title: string) => void;
}

export const TitleConfirmation: React.FC<TitleConfirmationProps> = ({
  generatedTitle,
  onConfirm,
}) => {
  const [title, setTitle] = useState(generatedTitle);

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <h3 className="mb-2 text-lg font-medium text-gray-900">
        Research Title: <span className="text-sm text-gray-500 font-normal">(Edit the title to better focus the research target)</span>
      </h3>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-4 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
      />
      <button
        onClick={() => onConfirm(title)}
        className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Accept Research Title
      </button>
    </div>
  );
};