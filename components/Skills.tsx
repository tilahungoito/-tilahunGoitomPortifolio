// components/Skills.tsx
'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaPython, FaJava, FaAws, FaDocker, FaGitAlt, FaAndroid, FaApple, FaVuejs, FaFigma, FaJira, FaCode, FaMobile, FaServer, FaDatabase, FaTools, FaVial } from 'react-icons/fa';
import { SiTypescript, SiJavascript, SiTailwindcss, SiNextdotjs, SiMongodb, SiPostgresql, SiMysql, SiRedis, SiNestjs, SiExpress, SiPrisma, SiJest, SiCypress, SiSelenium, SiFlutter, SiCplusplus, SiSpringboot, SiCanva, SiPostman, SiSwagger } from 'react-icons/si';
import { TbBrandReactNative } from 'react-icons/tb';

interface Skill {
    name: string;
    icon: React.ReactElement;
    level: number;
    category: 'frontend' | 'backend' | 'database' | 'devops' | 'testing' | 'mobile' | 'languages' | 'tools';
}

const skills: Skill[] = [
    // Programming Languages
    { name: 'JavaScript', icon: <SiJavascript className="text-[rgb(var(--color-primary))]" />, level: 90, category: 'languages' },
    { name: 'TypeScript', icon: <SiTypescript className="text-[rgb(var(--color-primary))]" />, level: 85, category: 'languages' },
    { name: 'Python', icon: <FaPython className="text-[rgb(var(--color-primary))]" />, level: 80, category: 'languages' },
    { name: 'Java', icon: <FaJava className="text-[rgb(var(--color-primary))]" />, level: 75, category: 'languages' },
    { name: 'C++', icon: <SiCplusplus className="text-[rgb(var(--color-primary))]" />, level: 70, category: 'languages' },

    // Frontend
    { name: 'React', icon: <FaReact className="text-[rgb(var(--color-primary))]" />, level: 90, category: 'frontend' },
    { name: 'Vue.js', icon: <FaVuejs className="text-[rgb(var(--color-primary))]" />, level: 80, category: 'frontend' },
    { name: 'Next.js', icon: <SiNextdotjs className="text-[rgb(var(--color-primary))]" />, level: 85, category: 'frontend' },
    { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-[rgb(var(--color-primary))]" />, level: 90, category: 'frontend' },

    // Mobile Development
    { name: 'React Native', icon: <TbBrandReactNative className="text-[rgb(var(--color-primary))]" />, level: 85, category: 'mobile' },
    { name: 'Flutter', icon: <SiFlutter className="text-[rgb(var(--color-primary))]" />, level: 80, category: 'mobile' },
    { name: 'Android', icon: <FaAndroid className="text-[rgb(var(--color-primary))]" />, level: 75, category: 'mobile' },
    { name: 'iOS', icon: <FaApple className="text-[rgb(var(--color-primary))]" />, level: 70, category: 'mobile' },

    // Backend
    { name: 'Node.js', icon: <FaNodeJs className="text-[rgb(var(--color-primary))]" />, level: 85, category: 'backend' },
    { name: 'Spring Boot', icon: <SiSpringboot className="text-[rgb(var(--color-primary))]" />, level: 75, category: 'backend' },
    { name: 'NestJS', icon: <SiNestjs className="text-[rgb(var(--color-primary))]" />, level: 80, category: 'backend' },
    { name: 'Express', icon: <SiExpress className="text-[rgb(var(--color-primary))]" />, level: 85, category: 'backend' },

    // Database
    { name: 'MongoDB', icon: <SiMongodb className="text-[rgb(var(--color-primary))]" />, level: 85, category: 'database' },
    { name: 'PostgreSQL', icon: <SiPostgresql className="text-[rgb(var(--color-primary))]" />, level: 80, category: 'database' },
    { name: 'MySQL', icon: <SiMysql className="text-[rgb(var(--color-primary))]" />, level: 85, category: 'database' },
    { name: 'Redis', icon: <SiRedis className="text-[rgb(var(--color-primary))]" />, level: 75, category: 'database' },
    { name: 'Prisma', icon: <SiPrisma className="text-[rgb(var(--color-primary))]" />, level: 80, category: 'database' },

    // DevOps
    { name: 'AWS', icon: <FaAws className="text-[rgb(var(--color-primary))]" />, level: 75, category: 'devops' },
    { name: 'Docker', icon: <FaDocker className="text-[rgb(var(--color-primary))]" />, level: 80, category: 'devops' },
    { name: 'Git', icon: <FaGitAlt className="text-[rgb(var(--color-primary))]" />, level: 90, category: 'devops' },

    // Testing
    { name: 'Jest', icon: <SiJest className="text-[rgb(var(--color-primary))]" />, level: 85, category: 'testing' },
    { name: 'Cypress', icon: <SiCypress className="text-[rgb(var(--color-primary))]" />, level: 80, category: 'testing' },
    { name: 'Selenium', icon: <SiSelenium className="text-[rgb(var(--color-primary))]" />, level: 75, category: 'testing' },

    // Tools
    { name: 'Figma', icon: <FaFigma className="text-[rgb(var(--color-primary))]" />, level: 85, category: 'tools' },
    { name: 'Canva', icon: <SiCanva className="text-[rgb(var(--color-primary))]" />, level: 90, category: 'tools' },
    { name: 'Jira', icon: <FaJira className="text-[rgb(var(--color-primary))]" />, level: 85, category: 'tools' },
    { name: 'Postman', icon: <SiPostman className="text-[rgb(var(--color-primary))]" />, level: 90, category: 'tools' },
    { name: 'Swagger', icon: <SiSwagger className="text-[rgb(var(--color-primary))]" />, level: 85, category: 'tools' },
];

const Skills = () => {
    const categories = ['languages', 'frontend', 'mobile', 'backend', 'database', 'devops', 'testing', 'tools'];
    const categoryTitles = {
        languages: { title: 'Programming Languages', icon: <FaCode className="text-[rgb(var(--color-primary))] text-2xl" /> },
        frontend: { title: 'Frontend Development', icon: <FaReact className="text-[rgb(var(--color-primary))] text-2xl" /> },
        mobile: { title: 'Mobile Development', icon: <FaMobile className="text-[rgb(var(--color-primary))] text-2xl" /> },
        backend: { title: 'Backend Development', icon: <FaServer className="text-[rgb(var(--color-primary))] text-2xl" /> },
        database: { title: 'Database & ORM', icon: <FaDatabase className="text-[rgb(var(--color-primary))] text-2xl" /> },
        devops: { title: 'DevOps & Tools', icon: <FaTools className="text-[rgb(var(--color-primary))] text-2xl" /> },
        testing: { title: 'Testing & Quality', icon: <FaVial className="text-[rgb(var(--color-primary))] text-2xl" /> },
        tools: { title: 'Design & Development Tools', icon: <FaFigma className="text-[rgb(var(--color-primary))] text-2xl" /> }
    };

    return (
        <section id="skills" className="py-16">
            <div className="container mx-auto px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl font-bold text-center mb-12 text-[rgb(var(--color-foreground))]"
                >
                    Technical Skills
                </motion.h2>
                {categories.map((category, categoryIndex) => (
                    <div key={category} className="mb-12">
                        <motion.h3
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                            className="text-2xl font-semibold mb-6 text-[rgb(var(--color-foreground))] flex items-center gap-3"
                        >
                            {categoryTitles[category as keyof typeof categoryTitles].icon}
                            {categoryTitles[category as keyof typeof categoryTitles].title}
                        </motion.h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {skills
                                .filter(skill => skill.category === category)
                                .map((skill, index) => (
                                    <motion.div
                                        key={skill.name}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className="card card-hover p-6"
                                    >
                                        <div className="flex items-center mb-4">
                                            <div className="text-3xl mr-4">{skill.icon}</div>
                                            <h4 className="text-xl font-semibold text-[rgb(var(--color-foreground))]">
                                                {skill.name}
                                            </h4>
                                        </div>
                                        <div className="w-full bg-[rgb(var(--color-input))] rounded-full h-2.5">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${skill.level}%` }}
                                                transition={{ duration: 1, delay: index * 0.1 }}
                                                className="h-2.5 rounded-full bg-[rgb(var(--color-primary))]"
                                            />
                                        </div>
                                        <div className="mt-2 text-right text-sm text-[rgb(var(--color-muted))]">
                                            {skill.level}%
                                        </div>
                                    </motion.div>
                                ))}
                        </div>
                    </div>
                ))}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="mt-16 text-center max-w-3xl mx-auto"
                >
                    <p className="text-lg text-[rgb(var(--color-muted))] leading-relaxed text-justify">
                        In the rapidly evolving landscape of technology, I maintain a steadfast commitment to continuous learning and skill enhancement. My dedication to mastering new technologies and methodologies enables me to deliver innovative solutions that drive business value. Through systematic learning and practical application, I ensure that each project benefits from the latest advancements in software development, resulting in robust, scalable, and user-centric applications.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;