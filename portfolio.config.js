/**
 * ARYAN PAL — PORTFOLIO CONFIGURATION SOURCE OF TRUTH
 * Centralized settings for personal information, social handles, projects, and contact channels.
 */

const PORTFOLIO_CONFIG = {
  profile: {
    name: "Aryan Pal",
    headline: "Building Intelligent Ideas Into Real-World Software.",
    tagline: "Aspiring Software Developer | Python Developer | AI/ML Student | Full-Stack Project Builder",
    bio: "I’m Aryan Pal, a B.Tech student specializing in Artificial Intelligence and Machine Learning. I enjoy turning ideas into working software, exploring new technologies, and solving practical problems through development. My projects span business management systems, immersive 3D experiences, and emergency response coordination. I’m continuously improving my technical skills through hands-on development, experimentation, and collaborative learning.",
    statusLabel: "Available for Internships & Projects",
    location: "Indore / Dewas, Madhya Pradesh, India",
    email: "palaryan7546@gmail.com",
    phone: "+91 9109163433",
    rawPhone: "919109163433",
    // Authentic professional portrait (preserves facial identity)
    portraitImage: "assets/aryan_profile.jpg",
    resumeUrl: "resume.pdf",
    resumeDownloadName: "Aryan_Pal_Resume.pdf"
  },

  socials: [
    {
      id: "linkedin",
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/aryan-pal-5a26a135b/",
      isConfigured: true,
      ariaLabel: "Connect with Aryan Pal on LinkedIn"
    },
    {
      id: "github",
      name: "GitHub",
      url: "https://github.com/aryanpal91091",
      isConfigured: true,
      ariaLabel: "View Aryan Pal's repositories on GitHub"
    },
    {
      id: "whatsapp",
      name: "WhatsApp",
      url: "https://wa.me/919109163433?text=Hi%20Aryan%2C%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20connect.",
      isConfigured: true,
      ariaLabel: "Chat with Aryan Pal on WhatsApp"
    },
    {
      id: "email",
      name: "Email",
      url: "mailto:palaryan7546@gmail.com",
      isConfigured: true,
      ariaLabel: "Send an email to Aryan Pal"
    },
    {
      id: "x",
      name: "X / Twitter",
      url: "https://x.com/ARYANPAL4r",
      isConfigured: true,
      ariaLabel: "Follow Aryan Pal on X"
    },
    {
      id: "instagram",
      name: "Instagram",
      url: "https://www.instagram.com/aryann____pal/",
      isConfigured: true,
      ariaLabel: "Follow Aryan Pal on Instagram"
    },
    {
      id: "facebook",
      name: "Facebook",
      url: "https://www.facebook.com/share/1DsRDnvnqB/",
      isConfigured: true,
      ariaLabel: "Connect with Aryan Pal on Facebook"
    }
  ],

  projects: [
    {
      id: "palmart",
      title: "PALMART ENTERPRISE PRO",
      subtitle: "POS & Inventory Management System",
      description: "A full-stack supermarket management system designed to streamline billing, inventory tracking, sales reporting, and business analytics.",
      features: [
        "POS billing and transaction processing with instant receipt calculation",
        "Inventory management & automated low-stock notifications",
        "Role-based access for Admin, Manager, and Cashier tiers",
        "JWT-based authentication & encrypted session tokens",
        "Sales reporting, automated analytics, and daily summary digests",
        "Demand forecasting and predictive stock reordering logic",
        "Market basket analysis & customer segmentation for cross-selling",
        "Automated database backup and point-in-time recovery functionality"
      ],
      technologies: [
        "React 19", "TypeScript", "Node.js", "Express.js",
        "PostgreSQL", "Prisma ORM", "Redux", "REST APIs",
        "JWT", "Docker", "Git", "GitHub"
      ],
      image: "assets/palmart-cover.jpg",
      repositoryUrl: "https://github.com/aryanpal91091/palmart-enterprises",
      liveDemoUrl: null,
      badge: "Enterprise Full-Stack",
      accent: "#38bdf8"
    },
    {
      id: "signal-drift",
      title: "SIGNAL DRIFT",
      subtitle: "3D Zero-Gravity Space Navigation Game",
      context: "Game Development Project | S.T.E.M Jam 2026",
      description: "An immersive 3D space navigation experience where players maneuver through a zero-gravity environment, avoid asteroids, and navigate toward a transmission beacon.",
      features: [
        "Three-dimensional space environments with dense asteroid obstacle fields",
        "Custom six-degrees-of-freedom (6DOF) flight physics with real inertia and damping",
        "Dynamic signal degradation based on beacon distance and line-of-sight obstruction",
        "Raycasting algorithm for procedural obstacle occlusion simulation",
        "Custom GLSL shader glitch effects, RGB chromatic aberration, and digital noise",
        "Real-time collision detection and interactive cockpit HUD flight controls"
      ],
      technologies: [
        "JavaScript", "Three.js", "WebGL", "GLSL Shaders",
        "3D Graphics", "Physics Simulation", "Raycasting"
      ],
      image: "assets/signal-drift-cover.jpg",
      repositoryUrl: null,
      liveDemoUrl: "https://space-aesteroid-signal-game.vercel.app/",
      badge: "3D WebGL / S.T.E.M Jam 2026",
      accent: "#00f2fe"
    },
    {
      id: "resqroute",
      title: "ResQRoute",
      subtitle: "AI-Powered Emergency Response System",
      description: "An emergency response coordination platform designed to connect citizens, ambulance services, traffic police, and hospitals through a unified system.",
      disclaimer: "Project demonstration only. Must not be relied on as a substitute for official municipal emergency response services.",
      features: [
        "Emergency SOS workflow with instant geolocation and incident reporting",
        "Multi-stakeholder coordination connecting citizens, hospitals, ambulances, and police",
        "Web-based emergency response management dashboard with live status indicators",
        "AI-powered capabilities aimed at supporting faster triage and informed transit decisions",
        "Maps API integration for optimal emergency corridor routing"
      ],
      technologies: [
        "React", "JavaScript", "Node.js", "AI/ML", "Maps API", "REST APIs"
      ],
      image: "assets/resqroute-cover.png",
      repositoryUrl: null,
      liveDemoUrl: "https://emergency-sos-system-six.vercel.app/",
      badge: "AI Emergency Platform",
      accent: "#f43f5e"
    }
  ],

  skills: {
    programming: {
      category: "Programming Languages",
      description: "Foundational and modern languages for systems, scripting, and applications.",
      items: ["Python", "C", "C++", "JavaScript", "TypeScript"]
    },
    frontend: {
      category: "Frontend Development",
      description: "Modern component-driven interfaces, state management, and styling.",
      items: ["HTML", "CSS", "React 19", "Redux"]
    },
    backend: {
      category: "Backend & APIs",
      description: "Server-side architectures, RESTful endpoints, and secure authentication.",
      items: ["Node.js", "Express.js", "REST APIs", "JWT Authentication"]
    },
    dataDatabases: {
      category: "Data & Databases",
      description: "Relational persistence, data wrangling, and structured business reporting.",
      items: ["PostgreSQL", "Prisma ORM", "Pandas & NumPy", "Advanced Excel", "Data Analysis"]
    },
    graphicsTools: {
      category: "Graphics & Development Tools",
      description: "3D rendering, containerization, and modern version control workflows.",
      items: ["Three.js", "WebGL", "GLSL Shaders", "Git & GitHub", "Docker"]
    },
    aiProblemSolving: {
      category: "AI/ML & Analytical Problem Solving",
      description: "Data-driven algorithms, exploratory analytics, and algorithmic foundations.",
      items: [
        "Artificial Intelligence & Machine Learning",
        "Data Structures",
        "Demand Forecasting",
        "Market Basket Analysis",
        "Customer Segmentation"
      ]
    }
  },

  education: [
    {
      degree: "Bachelor of Technology in Artificial Intelligence and Machine Learning",
      institution: "Acropolis Institute of Technology & Research (AITR), Indore",
      affiliation: "Affiliated with Rajiv Gandhi Proudyogiki Vishwavidyalaya (RGPV), Bhopal",
      duration: "2024 — 2028",
      highlights: "Core studies in machine learning algorithms, data structures, discrete mathematics, and software engineering principles."
    }
  ],

  experience: [
    {
      role: "Intern",
      company: "Payzoplus Global Private Ltd.",
      type: "Internship",
      details: "Exposure to cross-border FinTech payment workflows, compliance architectures, and software engineering practices."
    },
    {
      role: "Intern",
      company: "EliteVeda Edutech Private Ltd., Bengaluru",
      type: "Internship",
      details: "EdTech project development, technical collaboration, and practical problem-solving in production environments."
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = PORTFOLIO_CONFIG;
}
