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
    },
    {
        id: 8,
        title: 'Centralized Education Governance & EMIS Platform',
        description: 'A nationwide Education Management Information System (EMIS) built for the Tigray Regional Education Bureau. This full-stack platform manages the entire education hierarchy — from regional bureaus down to individual schools — enabling centralized governance, student enrollment tracking, teacher HR management, academic scheduling, and cross-institution analytics. Features include a 5-tier hierarchical access control (Region → Zone → Woreda → Institution), school resource monitoring, announcement broadcasting, student & staff transfer workflows, and comprehensive reporting dashboards. Designed to modernize and digitize public education administration at scale.',
        technologies: ['Next.js', 'NestJS', 'PostgreSQL', 'TypeScript', 'Tailwind CSS', 'Docker'],
        image: '/edu1.png',
        images: ['/edu1.png', '/edu2.png'],
        link: 'https://github.com/tilahungoito',
        github: 'https://github.com/tilahungoito'
    },
    {
        id: 9,
        title: 'National Mining Licensing & Governance System',
        description: 'A production-grade, multi-tenant mining governance platform built for the Ethiopian Ministry of Mines. This system streamlines the end-to-end mineral license application process through a 6-step wizard with GIS map integration for plot selection. Features a robust multi-layer workflow engine with Role-Based Access Control (RBAC), covering applicant submission, technical review, payment integration, and final approval. Includes an immutable audit trail, an interactive GIS analytics dashboard showing nationwide mineral deposit distributions across regions and zones, real-time production statistics, and a permit lifecycle management system. Ensures regulatory compliance and full transparency across all licensing stages.',
        technologies: ['Next.js', 'NestJS', 'PostgreSQL', 'TypeScript', 'Prisma', 'Docker'],
        image: '/shimering.png',
        images: ['/shimering.png', '/addcontent.png', '/loginnote.png'],
        link: 'https://github.com/tilahungoito',
        github: 'https://github.com/tilahungoito'
    }
];

// Helper to add new projects easily
export const addProject = (project: Omit<Project, 'id'>): Project => {
    const newId = Math.max(...projects.map(p => p.id)) + 1;
    return { ...project, id: newId };
};
