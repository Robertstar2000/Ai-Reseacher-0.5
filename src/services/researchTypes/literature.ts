import { ResearchTypeConfig } from '../../types';

const literatureResearch: ResearchTypeConfig = {
  title: "Literature Search",
  description: "In-depth analysis of existing research",
  sections: [
    {
      title: "I. Abstract",
      prompt: "Summarize the literature review objectives and findings",
      requirements: [
        "Clearly state the objectives of the literature review",
        "Highlight the main insights gained",
        "Provide an overview of the scope of the review",
        "Conclude with the significance of the findings"
      ]
    },
    {
      title: "II. Introduction",
      prompt: "Present the scope and objectives of the literature review",
      requirements: [
        "Define the topic or area of focus",
        "Explain why the review is necessary",
        "Outline the objectives of the review",
        "State the criteria for selecting the literature"
      ]
    },
    {
      title: "III. Methodology",
      prompt: "Describe the literature search and selection process",
      requirements: [
        "Detail the databases or sources used",
        "Explain the inclusion and exclusion criteria",
        "Describe the search terms and strategies",
        "Outline how the literature was categorized and analyzed"
      ]
    },
    {
      title: "IV. Analysis",
      prompt: "Analyze and synthesize the selected literature",
      requirements: [
        "Summarize key themes or patterns in the literature",
        "Identify significant trends or advancements",
        "Highlight any conflicting findings or debates",
        "Discuss the implications for the research topic"
      ]
    },
    {
      title: "V. Discussion",
      prompt: "Discuss patterns, trends, and gaps in the literature",
      requirements: [
        "Examine recurring themes and their significance",
        "Identify gaps in current research",
        "Discuss how these gaps relate to the research goals",
        "Provide a rationale for further investigation"
      ]
    },
    {
      title: "VI. Conclusion",
      prompt: "Summarize key insights and future research directions",
      requirements: [
        "Recap the main findings of the review",
        "Explain how the findings contribute to understanding the field",
        "Discuss practical or theoretical implications",
        "Suggest areas for additional research"
      ]
    }
  ]
};

export default literatureResearch;