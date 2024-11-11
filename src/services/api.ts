import axios from 'axios';
import { ResearchTypeConfig, CitationStyle, ResearchType, ResearchMode } from '../types';
import generalResearch from './researchTypes/general';
import literatureResearch from './researchTypes/literature';
import experimentalResearch from './researchTypes/experimental';

interface ResearchSection {
  title: string;
  prompt: string;
  requirements: string[];
}

const formatRequirements = (requirements: string[]): string => {
  return requirements.map((req, index) => `${index + 1}. ${req}`).join('\n');
};

const constructPrompt = (title: string, section: ResearchSection, citationStyle: CitationStyle): string => {
  const citationInstructions = {
    academic: "Use APA format for citations (Author, Year). Include full references at the end.",
    web: "Include URLs and access dates for web sources. List full references with titles and URLs at the end.",
    informal: "Use in-text mentions of sources. Include a simplified reference list at the end."
  };

  return `
Research Title: "${title}"

Section: ${section.title}

Task: ${section.prompt}

Requirements:
${formatRequirements(section.requirements)}

Citation Instructions:
${citationInstructions[citationStyle]}

Research Guidelines:
1. Provide a comprehensive response addressing all requirements
2. Use academic language and proper structure
3. Support ALL claims with citations
4. Include at least 3-5 relevant citations
5. Add citations throughout the text, not just at the end
6. Conclude with a complete REFERENCES section

Format your response EXACTLY as follows:

[Content with in-text citations]

REFERENCES:
1. [First reference]
2. [Second reference]
(etc.)

Note: Do not include any other text or formatting instructions in your response.
`.trim();
};

export const generateTitle = async (query: string, apiKey: string): Promise<string> => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'Generate a professional, academic title for a research paper based on the given query. The title should be concise but descriptive.'
          },
          {
            role: 'user',
            content: `Generate a title for a research paper about: ${query}`
          }
        ],
        temperature: 0.7,
        max_tokens: 100
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error?.message || 'Failed to generate title');
    }
    throw error;
  }
};

export const RESEARCH_TYPES = {
  general: generalResearch,
  literature: literatureResearch,
  experimental: experimentalResearch,
  advanced_general: { ...generalResearch },
  advanced_literature: { ...literatureResearch },
  advanced_experimental: { ...experimentalResearch }
};

export const getResearchTypeConfig = (type: ResearchType, mode: ResearchMode): ResearchTypeConfig => {
  const key = mode === 'advanced' ? `advanced_${type}` : type;
  return RESEARCH_TYPES[key] || RESEARCH_TYPES[type];
};

export const conductSectionResearch = async (
  title: string,
  section: ResearchSection,
  apiKey: string,
  citationStyle: CitationStyle,
  researchMode: ResearchMode,
  researchType: ResearchType
): Promise<{ content: string; citations: string[] }> => {
  try {
    const config = getResearchTypeConfig(researchType, researchMode);
    const model = researchMode === 'advanced' ? 'gpt-4' : 'gpt-3.5-turbo';
    const prompt = constructPrompt(title, section, citationStyle);

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model,
        messages: [
          {
            role: 'system',
            content: `You are an expert research assistant specializing in ${config.title}. 
                     Provide detailed, well-structured content with appropriate citations in ${citationStyle} format. 
                     Every paragraph must include at least one citation.
                     Ensure all claims are supported by references.
                     Always include a numbered REFERENCES section at the end.
                     Keep the original formatting exactly as requested.`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const fullContent = response.data.choices[0].message.content;
    const [mainContent, referencesSection] = splitContentAndReferences(fullContent);
    const citations = extractCitations(referencesSection);
    
    return {
      content: mainContent.trim(),
      citations: citations
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error?.message || 'API request failed');
    }
    throw error;
  }
};

const splitContentAndReferences = (content: string): [string, string] => {
  const parts = content.split(/REFERENCES:?/i);
  if (parts.length > 1) {
    return [parts[0].trim(), parts[1].trim()];
  }
  return [content.trim(), ''];
};

const extractCitations = (referencesSection: string): string[] => {
  if (!referencesSection) return [];
  
  return referencesSection
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .map(line => line.replace(/^\d+\.\s*/, '').trim())
    .filter(citation => citation.length > 0 && !citation.includes('[') && !citation.includes(']'));
};