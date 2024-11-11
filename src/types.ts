export interface Citation {
  text: string;
  url?: string;
}

export interface ResearchSection {
  id: string;
  title: string;
  response: string;
  citations: string[];
}

export interface ResearchHistory {
  id: string;
  query: string;
  title: string;
  timestamp: string;
  sections: ResearchSection[];
}

export type CitationStyle = 'academic' | 'web' | 'informal';
export type ResearchType = 'general' | 'literature' | 'experimental';
export type ResearchMode = 'basic' | 'advanced';

export interface ResearchTypeConfig {
  title: string;
  description: string;
  sections: Array<{
    title: string;
    prompt: string;
    requirements: string[];
  }>;
}