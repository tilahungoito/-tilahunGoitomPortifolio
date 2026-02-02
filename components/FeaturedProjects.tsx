'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from './ProjectCard';
import { projects } from '../data/projects';
import { FiChevronLeft, FiChevronRight, FiGrid, FiLayers } from 'react-icons/fi';

interface FeaturedProjectsProps {
    autoSlideInterval?: number; // in milliseconds
}

const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({
    autoSlideInterval = 5000 // Default 5 seconds
}) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward
    const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');

    const totalProjects = projects.length;

    // Navigate to next slide
    const nextSlide = useCallback(() => {
        setDirection(1);
        setActiveIndex((prev) => (prev + 1) % totalProjects);
    }, [totalProjects]);

    // Navigate to previous slide
    const prevSlide = useCallback(() => {
        setDirection(-1);
        setActiveIndex((prev) => (prev - 1 + totalProjects) % totalProjects);
    }, [totalProjects]);

    // Auto-slide effect
    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            nextSlide();
        }, autoSlideInterval);

        return () => clearInterval(interval);
    }, [isPaused, autoSlideInterval, nextSlide]);

    // Slide variants for smooth animation
    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0,
            scale: 0.9,
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: [0.25, 0.8, 0.25, 1],
            },
        },
        exit: (direction: number) => ({
            x: direction > 0 ? -300 : 300,
            opacity: 0,
            scale: 0.9,
            transition: {
                duration: 0.6,
                ease: [0.25, 0.8, 0.25, 1],
            },
        }),
    };

    return (
        <section id="projects" className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl sm:text-3xl font-bold mb-4 text-center"
                >
                    Featured Projects
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-gray-600 dark:text-gray-400 text-center mb-12 max-w-2xl mx-auto text-sm sm:text-base"
                >
                    A curated collection of my most impactful work, showcasing my journey in creating innovative solutions.
                    Each project represents my passion for building meaningful applications that solve real-world problems.
                </motion.p>

                {/* View Mode Toggle */}
                <div className="flex justify-center mb-8">
                    <div className="flex bg-[rgb(var(--color-card))] p-1 rounded-xl shadow-sm border border-[rgb(var(--color-border))]">
                        <button
                            onClick={() => setViewMode('carousel')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${viewMode === 'carousel'
                                ? 'bg-[rgb(var(--color-primary))] text-white shadow-md'
                                : 'text-[rgb(var(--color-muted))] hover:text-[rgb(var(--color-foreground))]'
                                }`}
                        >
                            <FiLayers size={18} />
                            <span className="text-sm font-medium">Carousel</span>
                        </button>
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${viewMode === 'grid'
                                ? 'bg-[rgb(var(--color-primary))] text-white shadow-md'
                                : 'text-[rgb(var(--color-muted))] hover:text-[rgb(var(--color-foreground))]'
                                }`}
                        >
                            <FiGrid size={18} />
                            <span className="text-sm font-medium">Grid</span>
                        </button>
                    </div>
                </div>

                <div
                    className="relative"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <AnimatePresence mode="wait">
                        {viewMode === 'carousel' ? (
                            <motion.div
                                key="carousel"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                className="relative max-w-4xl mx-auto"
                            >
                                {/* Auto-slide progress indicator */}
                                <div className="absolute -top-2 left-0 right-0 h-1 bg-[rgb(var(--color-border))] rounded-full overflow-hidden">
                                    <motion.div
                                        key={activeIndex}
                                        initial={{ width: '0%' }}
                                        animate={{ width: isPaused ? undefined : '100%' }}
                                        transition={{
                                            duration: autoSlideInterval / 1000,
                                            ease: 'linear',
                                        }}
                                        className="h-full bg-[rgb(var(--color-primary))]"
                                    />
                                </div>

                                {/* Navigation Buttons */}
                                <button
                                    onClick={() => {
                                        setIsPaused(true);
                                        prevSlide();
                                        setTimeout(() => setIsPaused(false), 3000);
                                    }}
                                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-[rgb(var(--color-card))]/90 backdrop-blur-sm p-2 sm:p-3 rounded-full shadow-lg hover:bg-[rgb(var(--color-card))] hover:scale-110 transition-all"
                                    aria-label="Previous project"
                                >
                                    <FiChevronLeft size={24} className="text-[rgb(var(--color-primary))]" />
                                </button>

                                <button
                                    onClick={() => {
                                        setIsPaused(true);
                                        nextSlide();
                                        setTimeout(() => setIsPaused(false), 3000);
                                    }}
                                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-[rgb(var(--color-card))]/90 backdrop-blur-sm p-2 sm:p-3 rounded-full shadow-lg hover:bg-[rgb(var(--color-card))] hover:scale-110 transition-all"
                                    aria-label="Next project"
                                >
                                    <FiChevronRight size={24} className="text-[rgb(var(--color-primary))]" />
                                </button>

                                {/* Cards Container */}
                                <div className="relative h-[600px] overflow-hidden mx-8 sm:mx-16">
                                    <AnimatePresence mode="wait" custom={direction}>
                                        <motion.div
                                            key={activeIndex}
                                            custom={direction}
                                            variants={slideVariants}
                                            initial="enter"
                                            animate="center"
                                            exit="exit"
                                            className="absolute inset-0"
                                        >
                                            <ProjectCard
                                                project={projects[activeIndex]}
                                                isActive={true}
                                            />
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                {/* Progress Dots */}
                                <div className="flex justify-center gap-2 mt-8">
                                    {projects.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => {
                                                setDirection(index > activeIndex ? 1 : -1);
                                                setActiveIndex(index);
                                                setIsPaused(true);
                                                setTimeout(() => setIsPaused(false), 3000);
                                            }}
                                            className={`group relative w-3 h-3 rounded-full transition-all duration-300 ${activeIndex === index
                                                ? 'bg-[rgb(var(--color-primary))] w-8'
                                                : 'bg-[rgb(var(--color-border))] hover:bg-[rgb(var(--color-primary))]/50'
                                                }`}
                                            aria-label={`Go to project ${index + 1}`}
                                        >
                                            {/* Tooltip with project title */}
                                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-[rgb(var(--color-card))] text-[rgb(var(--color-foreground))] rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                                {projects[index].title.substring(0, 20)}...
                                            </span>
                                        </button>
                                    ))}
                                </div>

                                {/* Pause indicator */}
                                {isPaused && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute top-4 right-20 text-sm text-[rgb(var(--color-muted))] flex items-center gap-2"
                                    >
                                        <span className="w-2 h-2 bg-[rgb(var(--color-primary))] rounded-full animate-pulse" />
                                        Paused
                                    </motion.div>
                                )}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="grid"
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 50 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                            >
                                {projects.map((project) => (
                                    <div key={project.id} className="min-h-[500px]">
                                        <ProjectCard
                                            project={project}
                                            isActive={true}
                                        />
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProjects;
