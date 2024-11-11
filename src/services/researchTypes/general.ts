import { ResearchTypeConfig } from '../../types';

const generalResearch: ResearchTypeConfig = {
  title: "General Research",
  description: "Comprehensive research on any topic",
  sections: [
    {
      title: "I. Abstract",
      prompt: "Provide a brief overview of the research topic and main findings",
      requirements: [
        "Summarize the research topic in a concise manner",
        "Highlight the main research objectives",
        "Mention the key findings or results",
        "Provide a brief statement on the significance of the study"
      ]
    },
    {
      title: "II. Introduction",
      prompt: "Introduce the topic, provide background information, and state research objectives",
      requirements: [
        "Introduce the topic and explain its relevance",
        "Provide background information and context",
        "Clearly state the research problem or question",
        "Outline the research objectives and scope"
      ]
    },
    {
      title: "III. Literature Review",
      prompt: "Review and analyze relevant existing research and theories",
      requirements: [
        "Summarize key studies and their findings",
        "Highlight gaps or limitations in existing research",
        "Discuss theoretical frameworks or models",
        "Establish the connection to the current research"
      ]
    },
    {
      title: "IV. Methodology",
      prompt: "Describe the research methods and approach used",
      requirements: [
        "Detail the research design and rationale",
        "Describe data collection methods and tools",
        "Explain the sampling strategy and participants",
        "Outline the data analysis techniques"
      ]
    },
    {
      title: "V. Results",
      prompt: "Present the findings and data analysis",
      requirements: [
        "Report the main findings clearly",
        "Include relevant data and statistics",
        "Use tables, graphs, or visuals to support the text",
        "Highlight significant trends or patterns"
      ]
    },
    {
      title: "VI. Discussion",
      prompt: "Interpret results and discuss implications",
      requirements: [
        "Interpret the findings in the context of the research objectives",
        "Discuss implications for theory or practice",
        "Identify limitations of the study",
        "Suggest potential areas for future research"
      ]
    },
    {
      title: "VII. Conclusion",
      prompt: "Summarize key findings and suggest future research directions",
      requirements: [
        "Summarize the main research outcomes",
        "Reiterate the significance of the study",
        "Discuss how the research contributes to the field",
        "Propose recommendations for future studies"
      ]
    }
  ]
};

export default generalResearch;