export type CitationStyle = 'academic' | 'web' | 'informal';
export type ResearchType = 'general' | 'literature' | 'experimental';
export type ResearchMode = 'basic' | 'advanced';

export interface ResearchSection {
  id: string;
  title: string;
  query: string;
  response: string;
  citations: string[];
  timestamp: number;
}

export interface ResearchHistory {
  id: string;
  query: string;
  sections: ResearchSection[];
  citationStyle: CitationStyle;
  researchType: ResearchType;
  researchMode: ResearchMode;
  timestamp: number;
}

export interface ResearchState {
  history: ResearchHistory[];
  currentQuery: string;
  isLoading: boolean;
  error: string | null;
}