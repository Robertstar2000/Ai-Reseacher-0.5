import { ResearchTypeConfig } from '../../types';

const experimentalResearch: ResearchTypeConfig = {
  title: "Experimental Design",
  description: "Detailed experimental research planning",
  sections: [
    {
      title: "I. Abstract",
      prompt: "Summarize the experimental design and objectives",
      requirements: [
        "Provide a concise overview of the experiment",
        "State the main objectives and purpose",
        "Mention the key hypotheses or research questions",
        "Highlight the expected contribution to the field"
      ]
    },
    {
      title: "II. Introduction",
      prompt: "Present research questions and hypotheses",
      requirements: [
        "Introduce the experimental topic and significance",
        "Clearly state the research questions",
        "Formulate the hypotheses to be tested",
        "Explain the rationale behind the hypotheses"
      ]
    },
    {
      title: "III. Methods",
      prompt: "Detail experimental procedures and materials",
      requirements: [
        "Describe the experimental setup and materials",
        "Outline the step-by-step procedures",
        "Specify control variables and conditions",
        "Detail how data will be collected and recorded"
      ]
    },
    {
      title: "IV. Expected Results",
      prompt: "Describe anticipated outcomes and analysis methods",
      requirements: [
        "State the expected findings or trends",
        "Explain how results will be analyzed",
        "Highlight the significance of anticipated results",
        "Discuss potential challenges or uncertainties"
      ]
    },
    {
      title: "V. Discussion",
      prompt: "Consider implications and potential limitations",
      requirements: [
        "Interpret the anticipated results in the research context",
        "Discuss theoretical or practical implications",
        "Identify potential limitations or biases",
        "Propose strategies to address these limitations"
      ]
    },
    {
      title: "VI. Timeline",
      prompt: "Outline the experimental schedule and milestones",
      requirements: [
        "Provide a detailed timeline for each phase of the experiment",
        "Include milestones and deliverables",
        "Highlight dependencies between tasks",
        "Indicate resources and time allocation"
      ]
    }
  ]
};

export default experimentalResearch;