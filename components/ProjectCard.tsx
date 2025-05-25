'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  SiCss3,
  SiMysql,
  SiWordpress,
  SiNestjs,
  SiTypeorm,
  SiSwagger
} from 'react-icons/si';
import { DiJava } from 'react-icons/di';
import Image from 'next/image';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
}

interface ProjectCardProps {
  project: Project;
  isActive: boolean;
}

// Extended map of technology names to their corresponding icons
const techIcons: Record<string, React.ReactElement> = {
  'React': <FaReact className="text-blue-500" />,
  'Next.js': <SiNextdotjs className="text-black dark:text-white" />,
  'TypeScript': <SiTypescript className="text-blue-600" />,
  'Node.js': <FaNodeJs className="text-green-600" />,
  'Python': <FaPython className="text-blue-400" />,
  'Django': <SiDjango className="text-green-700" />,
  'MongoDB': <SiMongodb className="text-green-500" />,
  'PostgreSQL': <SiPostgresql className="text-blue-700" />,
  'MySQL': <SiMysql className="text-blue-600" />,
  'Tailwind CSS': <SiTailwindcss className="text-cyan-400" />,
  'Firebase': <SiFirebase className="text-orange-500" />,
  'React Native': <FaReact className="text-blue-500" />,
  'Android': <SiAndroid className="text-green-500" />,
  'iOS': <SiApple className="text-gray-800 dark:text-gray-200" />,
  'PHP': <FaPhp className="text-purple-500" />,
  'Xampp': <SiXampp className="text-red-500" />,
  'Bootstrap': <SiBootstrap className="text-purple-600" />,
  'JavaScript': <FaJs className="text-yellow-400" />,
  'HTML': <FaHtml5 className="text-orange-500" />,
  'Flask': <SiFlask className="text-black dark:text-white" />,
  'Pandas': <SiPandas className="text-blue-700" />,
  'XGBoost': <FaPython className="text-green-700" />,
  'CSS': <SiCss3 className="text-blue-500" />,
  'Vite': <SiVite className="text-purple-500" />,
  'Express': <SiExpress className="text-gray-800 dark:text-gray-200" />,
  'Java': <DiJava className="text-red-500" />,
  'WordPress': <SiWordpress className="text-blue-600" />,
  'NestJS': <SiNestjs className="text-red-500" />,
  'TypeORM': <SiTypeorm className="text-red-600" />,
  'Swagger': <SiSwagger className="text-green-500" />
};

export default function ProjectCard({ project, isActive }: ProjectCardProps) {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    if (descriptionRef.current) {
      setIsOverflowing(
        descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight
      );
    }
  }, [project.description]);

  return (
    <motion.div
      className={`card card-hover p-6 h-full flex flex-col ${
        isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
        />
      </div>

      <h3 className="text-xl font-bold mb-2 text-[rgb(var(--color-foreground))]">
        {project.title}
      </h3>
      
        <div className="relative">
          <p 
            ref={descriptionRef}
          className={`text-[rgb(var(--color-muted))] mb-4 flex-grow transition-all duration-300 ${
            !showFullDescription ? 'line-clamp-3' : ''
            }`}
          >
            {project.description}
          </p>
          {isOverflowing && (
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
            className="text-[rgb(var(--color-primary))] hover:underline text-sm"
            >
            {showFullDescription ? 'Show Less' : 'Show More'}
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((tag, i) => (
            <span
              key={i}
            className="flex items-center gap-1 px-3 py-1 text-sm rounded-full bg-[rgb(var(--color-primary))]/10 text-[rgb(var(--color-primary))]"
            >
            {techIcons[tag] || null}
              <span>{tag}</span>
            </span>
          ))}
        </div>

        <div className="flex gap-4">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
          className="flex items-center gap-2 text-[rgb(var(--color-primary))] hover:underline"
          >
            <FiExternalLink />
            View Project
          </a>
          {project.link.includes('github.com') && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
            className="flex items-center gap-2 text-[rgb(var(--color-muted))] hover:text-[rgb(var(--color-primary))]"
            >
              <FiGithub />
              Source Code
            </a>
          )}
      </div>
    </motion.div>
  );
}