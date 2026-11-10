// ============================================================
// PORTFOLIO DATA — Surendra Guggilla
// Update this file to change personal info, projects, skills, and links.
// ============================================================

export const PORTFOLIO_DATA = {
  personal: {
    name: "Surendra Guggilla",
    nameFirst: "SURENDRA",
    nameLast: "GUGGILLA.",
    initials: "SG.",
    title: "COMPUTER SCIENCE & ENGINEERING STUDENT",
    taglines: [
      "BUILDING.",
      "LEARNING.",
      "EXPLORING.",
      "CREATING.",
    ],
    bio: "I'm a Computer Science and Engineering student exploring software development, data analysis, and machine learning. I build projects to understand how software works — and how it can solve real problems.",
    aboutBio: [
      "I'm a Computer Science and Engineering undergraduate at Lovely Professional University, driven by curiosity about how systems are built and how data reveals meaningful patterns.",
      "Through academic and personal projects, I've explored everything from building full-featured management systems to analyzing real-world datasets with machine learning. I enjoy breaking complex problems into structured, implementable solutions.",
      "Right now, I'm focused on strengthening my foundations across software development, data science, and practical engineering — learning by building.",
    ],
    education: {
      degree: "B.Tech — Computer Science and Engineering",
      institution: "Lovely Professional University",
      period: "2024 – 2028",
      cgpa: "[8.45]", // UPDATE: Replace with actual CGPA
      location: "Phagwara, Punjab, India",
    },
    metadata: {
      location: "INDIA",
      education: "B.TECH / CSE",
      institution: "LPU (2024–2028)",
      cgpa: "[8.45]", // UPDATE: Replace with actual CGPA
      status: "LEARNING / BUILDING",
      availability: "OPEN TO OPPORTUNITIES",
      code: "SG® / DEVELOPER",
    },
    social: {
      email: "surendragugilla143@gmail.com",
      github: "https://github.com/surendraguggilla",
      linkedin: "https://www.linkedin.com/in/surendra-guggilla",
      resumeUrl: "/resume/Surendra_Guggilla_Resume.pdf", // UPDATE: Set to "/resume/Surendra_Guggilla_Resume.pdf" when ready
    },
    interests: [
      "Software Development & System Design",
      "Machine Learning & Data Analysis",
      "Python & Data Engineering",
      "Databases & Query Optimization",
      "Open Source & Developer Tools",
    ],
  },

  projects: [
    {
      id: "project-01",
      num: "01",
      title: "Student Management Application",
      category: "SOFTWARE DEVELOPMENT",
      shortDesc: "A full-featured CLI application for managing student academic records, grades, and data with file-based persistence.",
      problem: "Managing student records manually is error-prone and inefficient. This project explores how structured OOP software can automate common administrative tasks reliably.",
      contribution: "Designed and implemented the full application architecture, data models, and user interaction flows from scratch — solo project.",
      techStack: ["Java", "Python", "File I/O", "OOP", "CLI", "Docker"],
      highlights: [
        "Full CRUD operations for student records — add, update, delete, search.",
        "Structured data persistence using file-based storage (no external database).",
        "Clean object-oriented design separating data models from application logic.",
        "Interactive command-line interface with clear user prompts and error handling.",
        "Docker containerisation — the entire application is packaged into a Docker image, making it portable and runnable on any machine without manual environment setup.",
      ],
      architecture: "CLI-first architecture with an OOP data model layer, separating student entities, record management, and I/O operations. Containerised with Docker so the runtime environment is fully self-contained and reproducible.",
      status: "COMPLETED",
      githubUrl: "https://github.com/surendraguggilla/Student_Management_Application",
      hasLiveDemo: false,
      featured: true,
    },
    {
      id: "project-02",
      num: "02",
      title: "Road Accident Analysis",
      category: "DATA SCIENCE & MACHINE LEARNING",
      shortDesc: "An exploratory data analysis and ML project uncovering patterns in real-world road accident datasets to understand contributing risk factors.",
      problem: "Road accidents cause preventable loss of life. Understanding the factors that contribute to accidents can help target safety interventions more effectively.",
      contribution: "Built the complete data pipeline — from raw data cleaning through feature engineering, exploratory analysis, statistical testing, and ML model training.",
      techStack: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Scikit-learn", "Jupyter"],
      highlights: [
        "Data cleaning, null-value handling, and normalization of a real-world accident dataset.",
        "Exploratory analysis of accident frequency by region, road type, time, and severity.",
        "Correlation analysis and feature engineering for ML model input.",
        "Predictive modeling using scikit-learn classifiers to identify high-risk scenarios.",
        "Visualization of findings with clear, annotated charts and heatmaps.",
      ],
      architecture: "Jupyter-notebook-based pipeline: data ingestion → EDA → feature engineering → model training → evaluation.",
      status: "COMPLETED",
      githubUrl: "https://github.com/surendraguggilla/Road_Accident_Analysis_ml",
      hasLiveDemo: false,
      featured: true,
    },
    {
      id: "project-03",
      num: "03",
      title: "Cyber-AI Chatbot",
      category: "AI & CYBERSECURITY",
      shortDesc: "An AI-powered chatbot focused on cybersecurity topics, designed to answer questions about security concepts, threats, and best practices.",
      problem: "Cybersecurity knowledge is fragmented and difficult to access quickly. A focused AI chatbot can make security concepts more approachable for learners and developers.",
      contribution: "Built and configured the chatbot's response pipeline, knowledge scope, and user interaction flows.",
      techStack: ["Python", "AI/NLP", "Chatbot Framework"],
      highlights: [
        "Domain-specific AI chatbot focused on cybersecurity topics.",
        "Conversational interface for exploring security concepts and best practices.",
        "Built as a learning project exploring AI integration in a practical context.",
      ],
      architecture: "AI-driven conversational pipeline with domain-scoped knowledge and a Python backend.",
      status: "COMPLETED",
      githubUrl: "https://github.com/surendraguggilla/Cyber-AI-Chatbot",
      hasLiveDemo: false,
      featured: true,
    },
  ],

  skills: {
    programming: ["Python", "Java", "C", "C++", "SQL"],
    dataAndML: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Scikit-learn", "Jupyter"],
    databases: ["MySQL", "DBMS", "SQL Server"],
    tools: ["Git", "GitHub", "VS Code", "Linux / Ubuntu"],
    softSkills: ["Problem-Solving", "Teamwork", "Adaptability", "Self-Learning"],
  },

  learning: [
    {
      area: "MACHINE LEARNING & DATA SCIENCE",
      status: "ACTIVE",
      focus: "Feature engineering, model evaluation, and applying ML concepts to real-world datasets.",
    },
    {
      area: "WEB DEVELOPMENT FUNDAMENTALS",
      status: "EXPLORING",
      focus: "HTML, CSS, JavaScript, and React basics to understand how the web is built.",
    },
    {
      area: "DATA STRUCTURES & ALGORITHMS",
      status: "ONGOING",
      focus: "Strengthening core problem-solving skills and competitive programming foundations.",
    },
    {
      area: "CYBERSECURITY & AI",
      status: "EXPLORING",
      focus: "Understanding AI-driven security tools, threat patterns, and responsible AI usage.",
    },
  ],

  certifications: [
    {
      title: "Certificate of Merit: DevOps Fundamentals",
      issuer: "LPUCPE",
      link: "https://drive.google.com/file/d/1kNW8OhZOiH8IJdMuuKj6HeR9LITH2z6_/view?usp=sharing",
    },
    {
      title: "Oracle Cloud Infrastructure certified AI Foundations Associate",
      issuer: "Oracle",
      link: "https://drive.google.com/file/d/1pe3o3lZDND_N_Ur96P4-u3GrGjJDc2Yn/view?usp=sharing",
    },
    {
      title: "Certificate of Programming Using C++",
      issuer: "Infosys Springboard",
      link: "https://drive.google.com/file/d/1ea_sE70aqBZ53gGrN1IYmZ4--OA7xEa6/view?usp=sharing",
    },
  ],
};

export type Project = typeof PORTFOLIO_DATA.projects[0];
