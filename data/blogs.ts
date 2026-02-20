// data/blogs.ts
// Blog post data — add new blog posts here

export interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    content?: string;
    tags: string[];
    date: string;
    readTime: string;
    link: string;
    emoji: string;
    gradient: string;
}

export const blogPosts: BlogPost[] = [
    {
        id: 1,
        title: "Building a National Mining Licensing System with GIS Integration",
        excerpt: "How I architected a production-grade, multi-tenant governance platform for the Ethiopian Ministry of Mines — featuring a 6-step GIS wizard, RBAC workflow engine, and immutable audit trail using Next.js and NestJS.",
        tags: ["NestJS", "GIS", "Next.js", "PostgreSQL", "RBAC"],
        date: "Feb 2026",
        readTime: "8 min read",
        link: "https://github.com/tilahungoito",
        emoji: "⛏️",
        gradient: "from-amber-500/20 via-orange-500/10 to-yellow-500/5",
    },
    {
        id: 2,
        title: "Designing a 5-Tier Education EMIS at Scale",
        excerpt: "Lessons learned from building the Tigray Regional Education Bureau's EMIS — managing Region → Zone → Woreda → Institution hierarchies with NestJS, Prisma, and Docker. What went right and what was hard.",
        tags: ["Education", "TypeScript", "NestJS", "Docker", "Prisma"],
        date: "Jan 2026",
        readTime: "6 min read",
        link: "https://github.com/tilahungoito",
        emoji: "🎓",
        gradient: "from-blue-500/20 via-cyan-500/10 to-teal-500/5",
    },
    {
        id: 3,
        title: "AI-Powered Clinical Decision Support: Malaria & Pneumonia Detection",
        excerpt: "Deep dive into building a dual-platform (Web + Flutter) health assistant that detects malaria and pneumonia from medical images using TensorFlow and Keras, with a Flask microservice backend.",
        tags: ["TensorFlow", "Flask", "Flutter", "Deep Learning", "Healthcare"],
        date: "Dec 2025",
        readTime: "10 min read",
        link: "https://github.com/5TH-SOFTWARE-ENGINEERING/AI-Based-Health-Assistant-with-Clinical-Decision-Support-for-Malaria-and-Pneumonia.git",
        emoji: "🤖",
        gradient: "from-green-500/20 via-emerald-500/10 to-cyan-500/5",
    },
    {
        id: 4,
        title: "From Student to Enterprise Developer: My Journey at Mekelle University",
        excerpt: "Reflecting on 5+ years of growth — from PHP hospital systems and WordPress research networks to building nationwide government platforms. Key lessons about architecture, teamwork, and shipping production software.",
        tags: ["Career", "Full Stack", "Reflections", "Software Engineering"],
        date: "Nov 2025",
        readTime: "5 min read",
        link: "#",
        emoji: "🚀",
        gradient: "from-purple-500/20 via-violet-500/10 to-fuchsia-500/5",
    },
];
