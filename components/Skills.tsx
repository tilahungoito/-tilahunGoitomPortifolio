// components/Skills.tsx
'use client';

import { motion } from 'framer-motion';
import {
    FaReact,
    FaNodeJs,
    FaAws,
    FaDocker,
    FaGitAlt,
    FaMobile,
    FaServer,
} from 'react-icons/fa';
import {
    SiNextdotjs,
    SiTypescript,
    SiPython,
    SiDjango,
    SiPostgresql,
    SiMongodb,
    SiTailwindcss,
    SiFigma,
    SiCisco,
    SiApple,
    SiAndroid,
    SiReact,
    SiVuedotjs,
    SiFlutter,
    SiNestjs,
    SiExpress,
    SiAdobephotoshop,
    SiAdobeillustrator,
    SiHuawei,
    SiJira,
    SiPostman
} from 'react-icons/si';
import { DiHtml5, DiCss3, DiVisualstudio } from 'react-icons/di';

const skillCategories = [
    {
        title: 'Web Development',
        icon: <FaReact className="text-blue-500" size={20} />,
        skills: [
            { name: 'React', icon: <SiReact className="text-blue-500" size={24} />, level: 90 },
            { name: 'Next.js', icon: <SiNextdotjs className="text-black" size={24} />, level: 85 },
            { name: 'TypeScript', icon: <SiTypescript className="text-blue-600" size={24} />, level: 85 },
            { name: 'Node.js', icon: <FaNodeJs className="text-green-600" size={24} />, level: 80 },
            { name: 'Vue.js', icon: <SiVuedotjs className="text-green-500" size={24} />, level: 75 },
        ]
    },
    {
        title: 'Mobile Development',
        icon: <FaMobile className="text-purple-500" size={20} />,
        skills: [
            { name: 'React Native', icon: <FaReact className="text-blue-500" size={24} />, level: 80 },
            { name: 'Flutter', icon: <SiFlutter className="text-blue-400" size={24} />, level: 75 },
            { name: 'iOS', icon: <SiApple className="text-gray-800" size={24} />, level: 70 },
            { name: 'Android', icon: <SiAndroid className="text-green-500" size={24} />, level: 75 },
        ]
    },
    {
        title: 'Backend & Database',
        icon: <FaServer className="text-gray-500" size={20} />,
        skills: [
            { name: 'Python', icon: <SiPython className="text-blue-400" size={24} />, level: 75 },
            { name: 'Django', icon: <SiDjango className="text-green-700" size={24} />, level: 70 },
            { name: 'NestJS', icon: <SiNestjs className="text-red-500" size={24} />, level: 80 },
            { name: 'Express', icon: <SiExpress className="text-gray-800" size={24} />, level: 85 },
            { name: 'MongoDB', icon: <SiMongodb className="text-green-500" size={24} />, level: 80 },
            { name: 'PostgreSQL', icon: <SiPostgresql className="text-blue-700" size={24} />, level: 75 },
        ]
    },
    {
        title: 'UI/UX Design',
        icon: <SiFigma className="text-red-500" size={20} />,
        skills: [
            { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-cyan-400" size={24} />, level: 85 },
            { name: 'HTML5', icon: <DiHtml5 className="text-orange-500" size={24} />, level: 90 },
            { name: 'CSS3', icon: <DiCss3 className="text-blue-500" size={24} />, level: 85 },
            { name: 'Figma', icon: <SiFigma className="text-red-500" size={24} />, level: 80 },
            { name: 'Photoshop', icon: <SiAdobephotoshop className="text-blue-700" size={24} />, level: 70 },
            { name: 'Illustrator', icon: <SiAdobeillustrator className="text-orange-600" size={24} />, level: 65 },
        ]
    },
    {
        title: 'Networking & DevOps',
        icon: <SiCisco className="text-blue-600" size={20} />,
        skills: [
            { name: 'Cisco Certified', icon: <SiCisco className="text-blue-600" size={24} />, level: 70 },
            { name: 'Huawei', icon: <SiHuawei className="text-red-500" size={24} />, level: 65 },
            { name: 'Docker', icon: <FaDocker className="text-blue-400" size={24} />, level: 75 },
            { name: 'AWS', icon: <FaAws className="text-orange-500" size={24} />, level: 70 },
            { name: 'Git', icon: <FaGitAlt className="text-orange-600" size={24} />, level: 85 },
        ]
    },
    {
        title: 'Tools & Soft Skills',
        icon: <SiJira className="text-blue-500" size={20} />,
        skills: [
            { name: 'VS Code', icon: <DiVisualstudio className="text-blue-500" size={24} />, level: 90 },
            { name: 'Postman', icon: <SiPostman className="text-orange-500" size={24} />, level: 85 },
            { name: 'Jira', icon: <SiJira className="text-blue-600" size={24} />, level: 80 },
            { name: 'GitHub', icon: <FaGitAlt className="text-black" size={24} />, level: 85 },
            { name: 'Problem Solving', icon: <span className="text-xl">🧩</span>, level: 90 },
        ]
    }
];

const Skills = () => {
    // Animation variants
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { 
            opacity: 1, 
            y: 0,
            transition: {
                type: "spring",
                damping: 10,
                stiffness: 100
            }
        }
    };

    const progressBar = {
        hidden: { width: 0 },
        show: (level: number) => ({
            width: `${level}%`,
            transition: {
                duration: 1.5,
                ease: "easeInOut",
                delay: 0.5
            }
        })
    };

    return (
        <section id="skills" className="py-16 bg-gray-50">
            <motion.h2 
                className="text-3xl font-bold mb-12 text-center"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                My Skills
            </motion.h2>

            <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4"
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
            >
                {skillCategories.map((category, catIndex) => (
                    <motion.div
                        key={catIndex}
                        variants={item}
                        className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100"
                        whileHover={{ y: -5 }}
                    >
                        <div className="flex items-center gap-2 mb-4">
                            {category.icon}
                            <h3 className="text-xl font-semibold">{category.title}</h3>
                        </div>

                        <div className="space-y-4">
                            {category.skills.map((skill, skillIndex) => (
                                <div key={skillIndex} className="space-y-1">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            {skill.icon}
                                            <span>{skill.name}</span>
                                        </div>
                                        <span className="text-sm text-gray-500">{skill.level}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                        <motion.div
                                            className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full"
                                            variants={progressBar}
                                            custom={skill.level}
                                            initial="hidden"
                                            whileInView="show"
                                            viewport={{ once: true }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default Skills;