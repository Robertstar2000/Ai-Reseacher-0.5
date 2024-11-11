import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, HeadingLevel, AlignmentType, PageBreak } from 'docx';
import { ResearchSection } from '../types';
import { generateTitle } from '../services/api';

const disclaimerText = 'This research paper was generated using AI assistance. Please verify all information and citations independently.';
const affiliationText = 'Generated with AI Researcher';

const wrapText = (text: string, maxLength: number): string[] => {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  words.forEach(word => {
    if ((currentLine + word).length <= maxLength) {
      currentLine += (currentLine ? ' ' : '') + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  });

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
};

const createMarkdown = (sections: ResearchSection[]): string => {
  let markdown = '';

  sections.forEach(section => {
    markdown += `# ${section.title}\n\n`;
    markdown += `${section.response}\n\n`;
    
    if (section.citations.length > 0) {
      markdown += '## References\n\n';
      section.citations.forEach((citation, index) => {
        markdown += `${index + 1}. ${citation}\n`;
      });
      markdown += '\n';
    }
  });

  return markdown;
};

const createDocx = async (
  sections: ResearchSection[],
  query: string,
  apiKey: string
): Promise<Document> => {
  const title = await generateTitle(query, apiKey);
  const currentDate = new Date().toLocaleDateString();

  const titlePage = [
    new Paragraph({
      text: title,
      heading: HeadingLevel.TITLE,
      alignment: AlignmentType.CENTER,
      spacing: { before: 3000, after: 400 }
    }),
    new Paragraph({
      text: currentDate,
      alignment: AlignmentType.CENTER,
      spacing: { before: 400, after: 400 }
    }),
    new Paragraph({ text: '', spacing: { before: 240, after: 240 } }),
    new Paragraph({ text: '', spacing: { before: 240, after: 240 } }),
    ...wrapText(disclaimerText, 30).map(line => new Paragraph({
      text: line,
      alignment: AlignmentType.CENTER,
      spacing: { before: 120, after: 120 }
    })),
    new Paragraph({ text: '', spacing: { before: 120, after: 120 } }),
    new Paragraph({
      text: affiliationText,
      alignment: AlignmentType.CENTER,
      spacing: { before: 120, after: 120 }
    }),
    new Paragraph({ 
      children: [new PageBreak()]
    })
  ];

  const contentSections = sections.map(section => [
    new Paragraph({
      text: section.title,
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 400, after: 200 }
    }),
    new Paragraph({
      text: section.response,
      spacing: { before: 200, after: 200 }
    }),
    ...(section.citations.length > 0 ? [
      new Paragraph({
        text: 'References',
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 200 }
      }),
      ...section.citations.map((citation, index) => new Paragraph({
        text: `${index + 1}. ${citation}`,
        spacing: { before: 100, after: 100 }
      }))
    ] : []),
    new Paragraph({ text: '', spacing: { before: 200, after: 200 } })
  ]).flat();

  return new Document({
    sections: [{
      properties: {},
      children: [...titlePage, ...contentSections]
    }]
  });
};

export const downloadDocument = async (
  sections: ResearchSection[],
  query: string,
  apiKey: string,
  format: 'md' | 'docx' = 'md'
): Promise<void> => {
  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `research-${timestamp}`;

    if (format === 'md') {
      const markdown = createMarkdown(sections);
      const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
      saveAs(blob, `${filename}.md`);
    } else {
      const doc = await createDocx(sections, query, apiKey);
      const buffer = await Packer.toBlob(doc);
      saveAs(buffer, `${filename}.docx`);
    }
  } catch (error) {
    console.error('Error downloading document:', error);
    throw new Error('Failed to download document');
  }
};