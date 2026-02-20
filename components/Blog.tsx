'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { blogPosts } from '../data/blogs';
import { FiArrowUpRight, FiClock, FiCalendar } from 'react-icons/fi';

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.12 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.96 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.55, ease: [0.25, 0.8, 0.25, 1] },
    },
};

export default function Blog() {
    return (
        <section id="blog" className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.55 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                        Insights & Articles
                    </h2>
                    <p className="text-[rgb(var(--color-muted))] max-w-2xl mx-auto text-sm sm:text-base">
                        Sharing what I&apos;ve learned building government-scale platforms, AI systems, and enterprise software.
                        Practical lessons from real production deployments.
                    </p>
                </motion.div>

                {/* Cards Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    {blogPosts.map((post) => (
                        <motion.article
                            key={post.id}
                            variants={cardVariants}
                            whileHover={{ y: -6, scale: 1.015 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                            className="group relative rounded-2xl overflow-hidden border border-[rgb(var(--color-border))] bg-[rgb(var(--color-card))] shadow-sm hover:shadow-xl hover:shadow-[rgb(var(--color-primary))]/10 transition-shadow duration-300"
                        >
                            {/* Gradient Header Band */}
                            <div className={`h-2 w-full bg-gradient-to-r ${post.gradient.replace('/20', '').replace('/10', '').replace('/5', '')}`} />

                            {/* Glow overlay on hover */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${post.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                            <div className="relative p-6">
                                {/* Emoji + Title row */}
                                <div className="flex items-start gap-3 mb-3">
                                    <motion.span
                                        animate={{ rotate: [0, -8, 8, 0] }}
                                        transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }}
                                        className="text-3xl flex-shrink-0 mt-0.5"
                                        aria-hidden="true"
                                    >
                                        {post.emoji}
                                    </motion.span>
                                    <h3 className="text-base sm:text-lg font-bold text-[rgb(var(--color-foreground))] group-hover:text-[rgb(var(--color-primary))] transition-colors leading-snug">
                                        {post.title}
                                    </h3>
                                </div>

                                {/* Excerpt */}
                                <p className="text-sm text-[rgb(var(--color-muted))] mb-4 leading-relaxed line-clamp-3">
                                    {post.excerpt}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-1.5 mb-4">
                                    {post.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full bg-[rgb(var(--color-primary))]/10 text-[rgb(var(--color-primary))] border border-[rgb(var(--color-primary))]/20"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Footer: meta + read button */}
                                <div className="flex items-center justify-between mt-2">
                                    <div className="flex items-center gap-3 text-[rgb(var(--color-muted))] text-xs">
                                        <span className="flex items-center gap-1">
                                            <FiCalendar size={11} />
                                            {post.date}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <FiClock size={11} />
                                            {post.readTime}
                                        </span>
                                    </div>
                                    <motion.a
                                        href={post.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="flex items-center gap-1.5 text-xs font-semibold text-[rgb(var(--color-primary))] hover:underline"
                                    >
                                        Read More
                                        <motion.span
                                            animate={{ x: [0, 2, 0], y: [0, -2, 0] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                        >
                                            <FiArrowUpRight size={14} />
                                        </motion.span>
                                    </motion.a>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
