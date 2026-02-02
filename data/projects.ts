// data/projects.ts
// Centralized projects data - add new projects here

export interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    images?: string[];
    technologies: string[];
    link: string;
    github?: string;
}

export const projects: Project[] = [
    {
        id: 6,
        title: "Role Based Insurance System",
        description: "A comprehensive health insurance management system that streamlines policy administration, claims processing, and member services. Features include automated underwriting, digital claims processing, provider network management, and integrated payment systems. The platform enhances operational efficiency through automated workflows and real-time analytics.",
        image: "/insurance admin.png",
        technologies: ["NestJS", "TypeORM", "PostgreSQL", "Swagger", "Next.js", "Docker"],
        link: "https://github.com/EthiopianInsuranceCoorpration/EIC.git",
        github: "https://github.com/EthiopianInsuranceCoorpration/EIC.git"
    },
    {
        id: 5,
        title: 'Mekelle University Research Network',
        description: 'A sophisticated WordPress-based platform designed to enhance academic collaboration and research visibility at Mekelle University. This comprehensive system enables researchers to create detailed professional profiles, showcase their publications, and connect with potential collaborators. Features include advanced search capabilities, research interest matching, and a dynamic news feed highlighting university research achievements.',
        technologies: ['WordPress', 'PHP', 'MySQL', 'JavaScript', 'CSS'],
        image: '/wordpress.png',
        link: '#',
    },
    {
        id: 1,
        title: 'E-commerce Platform',
        description: 'A comprehensive full-stack e-commerce solution built with React, Node.js, and MongoDB. This platform enables users to buy and sell educational materials including books, lectures, and tutorials. It features a collaborative learning environment where peers can work together and benefit from shared knowledge and resources.',
        technologies: ['React', 'Node.js', 'MongoDB', 'Express', "Next.js", 'Tailwind CSS'],
        image: '/mycourses.png',
        link: 'https://peer-courses-tilahun-dtqk-git-main-tilahuns-projects-82416c09.vercel.app',
    },
    {
        id: 2,
        title: 'Shire Referral Hospital Management System',
        description: 'A comprehensive hospital management system developed for Shire Referral Hospital. This system automates the appointment scheduling process, allowing doctors to efficiently manage and record patient appointments. It streamlines administrative workflows and improves the overall patient care experience.',
        technologies: ['PHP', 'XAMPP', 'Bootstrap', 'JavaScript', 'HTML'],
        image: '/shire referal.png',
        link: 'https://github.com/tilahungoito/Shire-Hospital-patient-appointment-system',
        github: 'https://github.com/tilahungoito/Shire-Hospital-patient-appointment-system'
    },
    {
        id: 3,
        title: 'Disease Prediction System',
        description: 'An advanced machine learning-based disease prediction system that analyzes patient data including symptoms and vital signs to predict the likelihood of various diseases. This tool assists healthcare professionals in making more informed diagnostic decisions and improving patient outcomes through early intervention.',
        technologies: ['Python', 'Flask', 'Pandas', 'XGBoost', 'Scikit-learn'],
        image: '/predictorDisease.png',
        link: 'https://github.com/tilahungoito/CodeAlpha_diseases_predictor',
        github: 'https://github.com/tilahungoito/CodeAlpha_diseases_predictor'
    },
    {
        id: 4,
        title: 'Product Hub Marketplace',
        description: 'A versatile e-commerce platform that enables users to showcase and sell any product or service. The platform features an intuitive interface for listing items, searching for products, and facilitating transactions between buyers and sellers. It creates a comprehensive marketplace for diverse goods and services.',
        technologies: ['React', 'Node.js', 'Vite', 'Express', 'MongoDB'],
        image: '/find product.png',
        link: 'https://findproducts-2.onrender.com/',
    },
    {
        id: 7,
        title: 'AI-Based Health Assistant with Clinical Decision Support for Malaria and Pneumonia',
        description: 'A comprehensive, production-ready both web interface and fluttrn mobile application, AI-powered health assistant application built with Next.js 16, featuring intelligent health analysis, medical image detection (Malaria & Pneumonia), AI doctor consultations, multi-language support, and secure authentication.',
        technologies: ['next.js', 'Node.js', 'Flask', 'Express', 'postgres', 'python', 'tensorflow', 'keras', 'flutter', 'dart'],
        image: '/facilities-finder.png',
        images: ['/ai-doctor.png', '/pneumonia-detection.png', '/health-history.png', '/facilities-finder.png', '/m1.jpg', '/m2.jpg', '/m3.jpg', '/m4.jpg'],
        link: 'https://github.com/5TH-SOFTWARE-ENGINEERING/AI-Based-Health-Assistant-with-Clinical-Decision-Support-for-Malaria-and-Pneumonia.git',
    }
];

// Helper to add new projects easily
export const addProject = (project: Omit<Project, 'id'>): Project => {
    const newId = Math.max(...projects.map(p => p.id)) + 1;
    return { ...project, id: newId };
};
