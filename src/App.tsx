import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ResearchInput } from './components/ResearchInput';
import { ResearchResult } from './components/ResearchResult';
import { ApiKeyInput } from './components/ApiKeyInput';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ResearchHistory } from './components/ResearchHistory';
import { ErrorBoundary } from './components/ErrorBoundary';
import { CitationStyleSelector } from './components/CitationStyleSelector';
import { ResearchTypeSelector } from './components/ResearchTypeSelector';
import { ResearchModeSelector } from './components/ResearchModeSelector';
import { DownloadButton } from './components/DownloadButton';
import { ProgressBar } from './components/ProgressBar';
import { conductSectionResearch, RESEARCH_TYPES, generateTitle } from './services/api';
import { ResearchHistory as ResearchHistoryType, ResearchSection, CitationStyle, ResearchType, ResearchMode } from './types';

const App: React.FC = () => {
  const [apiKey, setApiKey] = useState<string>(() => {
    const savedKey = localStorage.getItem('openai_api_key');
    return savedKey || '';
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentQuery, setCurrentQuery] = useState('');
  const [currentTitle, setCurrentTitle] = useState('');
  const [currentSections, setCurrentSections] = useState<ResearchSection[]>([]);
  const [history, setHistory] = useState<ResearchHistoryType[]>([]);
  const [citationStyle, setCitationStyle] = useState<CitationStyle>('academic');
  const [researchType, setResearchType] = useState<ResearchType>('general');
  const [researchMode, setResearchMode] = useState<ResearchMode>('basic');
  const [totalSections, setTotalSections] = useState(0);
  const [showTitleEdit, setShowTitleEdit] = useState(false);

  useEffect(() => {
    const config = RESEARCH_TYPES[researchMode === 'advanced' ? `advanced_${researchType}` : researchType];
    if (config) {
      setTotalSections(config.sections.length);
    }
  }, [researchType, researchMode]);

  const handleApiKeySubmit = (key: string) => {
    setApiKey(key);
    localStorage.setItem('openai_api_key', key);
  };

  const handleQuerySubmit = async (query: string) => {
    if (!apiKey) {
      setError('Please enter your OpenAI API key first.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setCurrentQuery(query);
    setCurrentSections([]);
    setShowTitleEdit(false);

    try {
      const title = await generateTitle(query, apiKey);
      setCurrentTitle(title);
      setShowTitleEdit(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate title');
      setIsLoading(false);
    }
  };

  const handleTitleAccept = async () => {
    setShowTitleEdit(false);
    try {
      const config = RESEARCH_TYPES[researchMode === 'advanced' ? `advanced_${researchType}` : researchType];
      const results: ResearchSection[] = [];

      for (const section of config.sections) {
        const result = await conductSectionResearch(
          currentTitle,
          section,
          apiKey,
          citationStyle,
          researchMode,
          researchType
        );
        results.push({
          id: uuidv4(),
          title: section.title,
          response: result.content,
          citations: result.citations
        });
        setCurrentSections([...results]);
      }

      const newHistoryItem = {
        id: uuidv4(),
        query: currentQuery,
        title: currentTitle,
        timestamp: new Date().toISOString(),
        sections: results
      };

      setHistory(prev => [newHistoryItem, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during research');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-gray-50 p-4">
        <div className="mx-auto max-w-4xl">
          <Header />
          
          {!apiKey && (
            <div className="mb-8">
              <ApiKeyInput onApiKeySubmit={handleApiKeySubmit} />
            </div>
          )}

          <div className="mb-6 space-y-4">
            <ResearchInput onSubmit={handleQuerySubmit} isLoading={isLoading} />
            
            {showTitleEdit && (
              <div className="mt-2 text-sm text-gray-500">
                Research Title: {currentTitle} <span className="italic">(Edit the title to better focus the research target)</span>
                <input
                  type="text"
                  value={currentTitle}
                  onChange={(e) => setCurrentTitle(e.target.value)}
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <button
                  onClick={handleTitleAccept}
                  className="mt-2 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  Accept Research Target
                </button>
              </div>
            )}

            {!showTitleEdit && (
              <>
                <ResearchModeSelector
                  selectedMode={researchMode}
                  onChange={setResearchMode}
                />
                <ResearchTypeSelector
                  selectedType={researchType}
                  onChange={setResearchType}
                />
                <CitationStyleSelector
                  selectedStyle={citationStyle}
                  onChange={setCitationStyle}
                />
              </>
            )}

            {isLoading && (
              <ProgressBar 
                progress={currentSections.length} 
                total={totalSections} 
              />
            )}
          </div>

          {error && (
            <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-700">
              {error}
            </div>
          )}

          <ErrorBoundary>
            {currentSections.length > 0 && (
              <div className="mb-8 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">{currentTitle}</h2>
                  {currentSections.length === totalSections && (
                    <DownloadButton 
                      sections={currentSections} 
                      query={currentQuery}
                      apiKey={apiKey}
                    />
                  )}
                </div>
                {currentSections.map((section) => (
                  <ResearchResult
                    key={section.id}
                    title={section.title}
                    content={section.response}
                    citations={section.citations}
                  />
                ))}
              </div>
            )}

            <ResearchHistory 
              history={history}
              onClearHistory={handleClearHistory}
            />
          </ErrorBoundary>
        </div>
      </main>
    </div>
  );
};

export default App;