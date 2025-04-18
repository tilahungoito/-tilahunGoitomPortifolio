'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaPhp,
  FaHtml5,
  FaJs,
 
} from 'react-icons/fa';
import {
  SiNextdotjs,
  SiTypescript,
  SiMongodb,
  SiPostgresql,
  SiTailwindcss,
  SiDjango,
  SiFirebase,
  SiAndroid,
  SiApple,
  SiXampp,
  SiBootstrap,
  SiFlask,
  SiPandas,
  SiVite,
  SiExpress,
  SiCss3
} from 'react-icons/si';
import { DiJava } from 'react-icons/di';

type Project = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
  stack?: string[];
};

type ProjectCardProps = {
  project: Project;
  index: number;
};

// Extended map of technology names to their corresponding icons
const techIcons: Record<string, JSX.Element> = {
  'React': <FaReact className="text-blue-500" />,
  'Next.js': <SiNextdotjs className="text-black" />,
  'TypeScript': <SiTypescript className="text-blue-600" />,
  'Node.js': <FaNodeJs className="text-green-600" />,
  'Python': <FaPython className="text-blue-400" />,
  'Django': <SiDjango className="text-green-700" />,
  'MongoDB': <SiMongodb className="text-green-500" />,
  'PostgreSQL': <SiPostgresql className="text-blue-700" />,
  'Tailwind CSS': <SiTailwindcss className="text-cyan-400" />,
  'Firebase': <SiFirebase className="text-orange-500" />,
  'React Native': <FaReact className="text-blue-500" />,
  'Android': <SiAndroid className="text-green-500" />,
  'iOS': <SiApple className="text-gray-800" />,
  'php': <FaPhp className="text-purple-500" />,
  'Xampp': <SiXampp className="text-red-500" />,
  'Bootstap': <SiBootstrap className="text-purple-600" />,
  'javascrpit': <FaJs className="text-yellow-400" />,
  'HTML': <FaHtml5 className="text-orange-500" />,
  'flask': <SiFlask className="text-black" />,
  'padas': <SiPandas className="text-blue-700" />,
  'xgboost': <FaPython className="text-green-700" />,
  'css': <SiCss3 className="text-blue-500" />,
  'vite': <SiVite className="text-purple-500" />,
  'express': <SiExpress className="text-gray-800" />,
  'Java': <DiJava className="text-red-500" />
};

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col"
    >
      <div className="h-48 overflow-hidden relative group">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="text-white font-bold text-lg bg-primary/90 px-4 py-2 rounded-md">
            View Details
          </span>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-dark/70 mb-4 flex-1">{project.description}</p>

        {project.tags.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-dark/50 mb-2">TECH STACK</h4>
            <div className="flex flex-wrap gap-3">
              {project.tags.map((tag) => (
                <div
                  key={tag}
                  className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                  title={tag}
                >
                  {techIcons[tag] }
                  <span>{tag}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <Link
          href={project.link}
          className="mt-auto inline-block bg-primary text-light px-4 py-2 rounded-md hover:bg-primary/90 transition-colors text-center"
        >
          View Project
        </Link>
      </div>
    </motion.div>
  );
};

export default ProjectCard;