import { ResumeData } from './types';

export const RESUME_DATA: ResumeData = {
  personalInfo: {
    name: "Devesh Mishra",
    title: "Data Scientist | Machine Learning Engineer | AI Engineer | GenAI, RAG, LLM & NLP Specialist",
    phone: "+919044319048",
    email: "deveshmishra9044@gmail.com",
    linkedin: "https://www.linkedin.com/in/imdvz",
    github: "https://www.github.com/imdvz",
    summary: "Data Scientist with over 4 years of experience. Expertise in Data Science, Machine Learning, Artificial Intelligence, NLP, GenAI, AI Agents, RAG systems, Agentic AI, LLMs and Image Processing. Skilled in ETL, Data Extraction/Scraping, Analysis, Visualization, Model Deployment, NLG, EDA, and Cloud Computing. Worked with more than 30 clients from 15+ countries, including Google Singapore, CVS Health, Johnson & Johnson, Halliburton, Softchoice, and Deloitte."
  },
  experience: [
    {
      id: "mahle",
      role: "Data Scientist",
      company: "MAHLE",
      period: "01/2024 - Present",
      location: "Pune, India",
      achievements: [
        "Delivered 10+ end-to-end projects, working directly with stakeholders.",
        "Built an AI-driven documentation assistant on Dataiku DSS (Python, Dash, RAG, LLM) cutting documentation time by 85%.",
        "Trained & deployed Ticket Classifier using XGBoost + LightGBM (92% accuracy), saving €200K in six months.",
        "Built a RAG chatbot with LangChain & Azure Cognitive Services, achieving 60% higher retrieval accuracy.",
        "Automated document processing with Azure OpenAI & PyMuPDF, reducing manual effort by 65%.",
        "Migrated Dataiku projects to Docker + Kubernetes JupyterLab setup."
      ]
    },
    {
      id: "flex",
      role: "Data Analyst",
      company: "Flex Data",
      period: "03/2022 - 12/2023",
      location: "Remote",
      achievements: [
        "Built Drug Review Sentiment Predictor with 88% accuracy using NLTK, Python, NLP.",
        "Achieved 82% accuracy employing Python/PaddleOCR to process 60,000+ Nutrition Label images.",
        "Implemented RAG and OpenAI GPT-4 to answer 50,000 FAQs.",
        "Utilized Gurobi Optimization to optimize product placement, resulting in 15% revenue increase.",
        "Developed predictive maintenance model reducing machine failures by 30% using Azure ML.",
        "GCP cost forecasting using Vertex AI and AutoML, reducing cost overruns by 20%."
      ]
    },
    {
      id: "coding-invaders",
      role: "Data Scientist / Analyst Mentor",
      company: "Coding Invaders",
      period: "01/2023 - 10/2023",
      location: "Remote",
      achievements: [
        "Mentored 500+ professionals in Python, SQL, Power BI, Statistics.",
        "Conducted 100+ sessions on Data Science / ML topics.",
        "Maintained average feedback of 4.3+ out of 5."
      ]
    },
    {
      id: "freelance",
      role: "Data Scientist - ML and AI",
      company: "Freelance",
      period: "10/2020 - 10/2023",
      location: "Remote",
      achievements: [
        "Worked with 30+ clients from 15+ countries (Fiverr, LinkedIn, UpWork).",
        "Delivered 70+ projects with R and Python Programming.",
        "Scraped 30+ websites using Beautiful Soup, Selenium, Scrapy.",
        "Implemented 20+ AI/DL/ML algorithms and deployed 15+ models using Flask, Django, Streamlit."
      ]
    }
  ],
  skills: [
    {
      category: "Languages",
      items: ["Python", "R", "PySpark", "TypeScript", "SQL"]
    },
    {
      category: "ML / NLP / GenAI",
      items: ["TensorFlow", "PyTorch", "Scikit-learn", "LangChain", "LangGraph", "Vector DBs", "OpenAI API", "Hugging Face", "Gemini", "BERT", "Spacy", "PaddleOCR", "Google Vision API"]
    },
    {
      category: "Cloud & Deployment",
      items: ["Azure OpenAI", "AWS SageMaker", "Azure ML Studio", "GCP", "Vertex AI", "Databricks", "FastAPI", "Docker", "Kubernetes"]
    },
    {
      category: "Data Engineering",
      items: ["ETL Pipelines", "Data Scraping", "PyCelonis", "Dashboard Building", "Big Data"]
    },
    {
      category: "Visualization",
      items: ["Power BI", "Tableau", "Google Data Studio", "Matplotlib", "Seaborn", "Plotly"]
    }
  ],
  publications: [
    {
      title: "Healthcare CHATBOT for Diabetic Patients Using Classification",
      publisher: "Springer, Singapore",
      details: "Part of the Lecture Notes in Networks and Systems book series (LNNS, volume 425)"
    }
  ],
  education: [
    {
      degree: "B.Tech in Computer Science and Information Technology",
      institution: "MJP Rohilkhand University (NAAC A++)",
      period: "08/2018 - 07/2022",
      location: "Bareilly, India",
      grade: ""
    }
  ]
};

export const COLORS = {
  cyan: '#00f3ff',
  pink: '#bc13fe',
  yellow: '#f9f002',
  dark: '#050505',
};