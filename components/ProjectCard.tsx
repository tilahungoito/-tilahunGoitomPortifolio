'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
import { FiGithub, FiExternalLink, FiMaximize2 } from 'react-icons/fi';
import { useMotionValue, useTransform, useSpring } from 'framer-motion';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  images?: string[];
  technologies: string[];
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
  const cardRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [imgPage, setImgPage] = useState(0);
  const imagesPerPage = 3;

  // Drag-to-resize logic (Significantly Enhanced Horizontal Expansion)
  const dragX = useMotionValue(0);
  const rawScaleX = useTransform(dragX, [0, 300], [1, 2.0]); // Increased to 2.0 for dramatic widening
  const rawScaleY = useTransform(dragX, [0, 300], [1, 1.2]); // Moderate height increase
  const scaleX = useSpring(rawScaleX, { stiffness: 200, damping: 25 });
  const scaleY = useSpring(rawScaleY, { stiffness: 200, damping: 25 });
  const zIndex = useTransform(dragX, [0, 20], [1, 100]); // Ensure it pops above everything

  // New: Deep dive mode based on drag depth
  const isDeepDive = useMotionValue(false);
  useEffect(() => {
    return dragX.onChange((v) => {
      isDeepDive.set(v > 100);
    });
  }, [dragX, isDeepDive]);

  const [deepDiveState, setDeepDiveState] = useState(false);
  useEffect(() => {
    return isDeepDive.onChange(v => setDeepDiveState(v));
  }, [isDeepDive]);

  useEffect(() => {
    if (project.images && project.images.length > imagesPerPage) {
      const interval = setInterval(() => {
        setImgPage((prev) => (prev + 1) % Math.ceil(project.images!.length / imagesPerPage));
      }, 4000); // 4 seconds per page
      return () => clearInterval(interval);
    }
  }, [project.images, imagesPerPage]);

  useEffect(() => {
    if (descriptionRef.current) {
      setIsOverflowing(
        descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight
      );
    }
  }, [project.description]);

  // Handle auto-reset when clicking outside or losing active focus
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        dragX.set(0);
      }
    };

    if (!isActive) {
      dragX.set(0);
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isActive, dragX]);

  return (
    <motion.div
      ref={cardRef}
      className={`card card-hover p-6 h-full flex flex-col relative ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      style={{ scaleX, scaleY, zIndex, transformOrigin: "center center" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
      transition={{ duration: 0.5 }}
    >
      {/* Drag Resize Handle */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 300 }}
        dragElastic={0.1}
        style={{ x: dragX }}
        onDragEnd={() => {
          if (dragX.get() > 100) {
            dragX.set(300); // Snap to full expansion
          } else {
            dragX.set(0); // Snap back
          }
        }}
        className="absolute bottom-2 right-2 p-2 cursor-ew-resize text-[rgb(var(--color-primary))] opacity-50 hover:opacity-100 z-50 rounded-lg hover:bg-[rgb(var(--color-primary))]/10 transition-all"
        title="Drag right to expand horizontally"
      >
        <FiMaximize2 size={18} />
      </motion.div>
      <div className={`relative w-full mb-4 rounded-lg overflow-hidden group bg-gray-100 dark:bg-gray-800 transition-all duration-500 ${deepDiveState ? 'h-72' : 'h-48'}`}>
        {project.images && project.images.length > 0 ? (
          <div className="relative w-full h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${imgPage}-${deepDiveState}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="flex gap-1 h-full w-full"
              >
                {deepDiveState ? (
                  // Deep Dive: Show one "whole" image horizontally
                  <motion.div
                    layoutId={`img-${project.id}`}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={project.images[imgPage % project.images.length]}
                      alt={`${project.title} - Full`}
                      fill
                      className="object-contain bg-black/5"
                    />
                  </motion.div>
                ) : (
                  // Preview Mode: Show 3 images in a grid
                  project.images
                    .slice(imgPage * imagesPerPage, (imgPage + 1) * imagesPerPage)
                    .map((img, idx) => (
                      <motion.div
                        key={`${img}-${idx}`}
                        layoutId={idx === 0 ? `img-${project.id}` : undefined}
                        className="relative w-1/3 h-full overflow-hidden rounded-sm"
                      >
                        <Image
                          src={img}
                          alt={`${project.title} - ${idx}`}
                          fill
                          className="object-cover hover:scale-110 transition-transform duration-500"
                        />
                      </motion.div>
                    ))
                )}
                {!deepDiveState && project.images.slice(imgPage * imagesPerPage, (imgPage + 1) * imagesPerPage).length < imagesPerPage &&
                  Array.from({ length: imagesPerPage - project.images.slice(imgPage * imagesPerPage, (imgPage + 1) * imagesPerPage).length }).map((_, idx) => (
                    <div key={`empty-${idx}`} className="relative w-1/3 h-full bg-[rgb(var(--color-card))]/50" />
                  ))
                }
              </motion.div>
            </AnimatePresence>

            {/* Page indicators for the mini-carousel */}
            {project.images.length > imagesPerPage && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                {Array.from({ length: Math.ceil(project.images.length / imagesPerPage) }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${imgPage === i ? 'bg-[rgb(var(--color-primary))] w-3' : 'bg-white/50'}`}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
          />
        )}
      </div>

      <h3 className="text-xl font-bold mb-2 text-[rgb(var(--color-foreground))]">
        {project.title}
      </h3>

      <div className="relative">
        <p
          ref={descriptionRef}
          className={`text-[rgb(var(--color-muted))] mb-4 flex-grow transition-all duration-300 ${!showFullDescription ? 'line-clamp-3' : ''
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
        {project.technologies.map((tag, i) => (
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
    </motion.div >
  );
}