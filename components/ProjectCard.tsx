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
  SiWordpress
} from 'react-icons/si';
import { DiJava } from 'react-icons/di';
import Image from 'next/image';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

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
  isActive: boolean;
};

// Extended map of technology names to their corresponding icons
const techIcons: Record<string, React.ReactElement> = {
  'React': <FaReact className="text-blue-500" />,
  'Next.js': <SiNextdotjs className="text-black" />,
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
  'iOS': <SiApple className="text-gray-800" />,
  'PHP': <FaPhp className="text-purple-500" />,
  'Xampp': <SiXampp className="text-red-500" />,
  'Bootstrap': <SiBootstrap className="text-purple-600" />,
  'JavaScript': <FaJs className="text-yellow-400" />,
  'HTML': <FaHtml5 className="text-orange-500" />,
  'Flask': <SiFlask className="text-black" />,
  'Pandas': <SiPandas className="text-blue-700" />,
  'XGBoost': <FaPython className="text-green-700" />,
  'CSS': <SiCss3 className="text-blue-500" />,
  'Vite': <SiVite className="text-purple-500" />,
  'Express': <SiExpress className="text-gray-800" />,
  'Java': <DiJava className="text-red-500" />,
  'WordPress': <SiWordpress className="text-blue-600" />
};

const ProjectCard = ({ project, index, isActive }: ProjectCardProps) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    if (descriptionRef.current) {
      setIsOverflowing(descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight);
    }
  }, [project.description]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className={`relative w-full h-[600px] rounded-xl overflow-hidden ${
        isActive ? 'ring-2 ring-primary' : ''
      }`}
    >
      {/* Project Image */}
      <div className="relative w-full h-[400px]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-contain object-center scale-90"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Project Info */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-white">
        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
        <div className="relative">
          <p 
            ref={descriptionRef}
            className={`text-gray-600 mb-4 transition-all duration-300 ${
              !showFullDescription ? 'line-clamp-2' : ''
            }`}
          >
            {project.description}
          </p>
          {isOverflowing && (
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="text-primary hover:underline text-sm font-medium transition-colors"
            >
              {showFullDescription ? 'Show Less' : 'See More'}
            </button>
          )}
        </div>

        {/* Tech Stack Icons */}
        <div className="flex flex-wrap gap-2 mb-4">
          {[...new Set(project.tags)].map((tag, i) => (
            <span
              key={i}
              className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-sm rounded-full"
            >
              {techIcons[tag] || tag}
              <span>{tag}</span>
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-primary hover:underline"
          >
            <FiExternalLink />
            View Project
          </a>
          {project.link.includes('github.com') && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 hover:text-primary"
            >
              <FiGithub />
              Source Code
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;