'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FaAward, FaCalendarAlt, FaUniversity, FaGraduationCap } from 'react-icons/fa';

interface CertificateModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CertificateModal: React.FC<CertificateModalProps> = ({ isOpen, onClose }) => {
    const certificates = [
        {
            id: 0,
            title: 'Software Engineering',
            image: '/certifications/TilahunGoitom(SoftwareEngineer) (1).pdf',
            description: 'Bachelor\'s degree in Software Engineering with comprehensive training in modern development practices, software architecture, and project management.',
            issuer: 'Mekelle University',
            date: '2021',
            skills: [
                'Software Design',
                'System Architecture',
                'Project Management',
                'Agile Methodologies',
                'Software Testing',
                'Database Design',
                'Web Development',
                'Mobile Development'
            ],
            level: 'Bachelor\'s Degree',
            verification: '/certifications/TilahunGoitom(SoftwareEngineer) (1).pdf',
            isHighlighted: true
        },
        {
            id: 1,
            title: 'Ethical Hacking',
            image: '/certifications/ethicalHacker.png',
            description: 'Certified Ethical Hacker (CEH) certification demonstrating expertise in identifying vulnerabilities and securing systems.',
            issuer: 'EC-Council',
            date: '2023',
            skills: ['Network Security', 'Penetration Testing', 'Vulnerability Assessment', 'Security Analysis'],
            level: 'Professional',
            verification: '/certifications/ethicalHacker.png'
        },
        {
            id: 2,
            title: 'CCNA',
            image: '/certifications/ccna2.png',
            description: 'Cisco Certified Network Associate certification validating skills in network fundamentals, security, and automation.',
            issuer: 'Cisco Systems',
            date: '2023',
            skills: ['Network Infrastructure', 'Routing & Switching', 'Security Fundamentals', 'Network Automation'],
            level: 'Associate',
            verification: '/certifications/ccna2.png'
        },
        {
            id: 3,
            title: 'EF SET',
            image: '/certifications/EF SET Certificate1 tilahun.pdf',
            description: 'English Language Proficiency certification demonstrating advanced English communication skills.',
            issuer: 'EF Standard English Test',
            date: '2025',
            skills: ['English Communication', 'Business English', 'Technical Writing', 'Professional Communication'],
            level: 'Advanced',
            verification: '/certifications/EF SET Certificate1 tilahun.pdf'
        },
        {
            id: 4,
            title: 'Data Analysis',
            image: '/certifications/dataAnalysis.pdf',
            description: 'Comprehensive certification in data analysis and visualization techniques.',
            issuer: 'Data Science Academy',
            date: '2024',
            skills: ['Data Analysis', 'Data Visualization', 'Statistical Analysis', 'Business Intelligence'],
            level: 'Professional',
            verification: '/certifications/dataAnalysis.pdf'
        },
        {
            id: 5,
            title: 'Artificial Intelligence',
            image: '/certifications/Artificial intelligence.pdf',
            description: 'Advanced certification in AI and Machine Learning fundamentals.',
            issuer: 'AI Institute',
            date: '2023',
            skills: ['Machine Learning', 'Deep Learning', 'Neural Networks', 'AI Applications'],
            level: 'Advanced',
            verification: '/certifications/Artificial intelligence.pdf'
        },
        {
            id: 6,
            title: 'Android Development',
            image: '/certifications/android devloper.pdf',
            description: 'Professional certification in mobile app development for Android platform.',
            issuer: 'Google Developer Academy',
            date: '2023',
            skills: ['Android Development', 'Kotlin', 'Mobile UI/UX', 'App Architecture'],
            level: 'Professional',
            verification: '/certifications/android devloper.pdf'
        }
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-[rgb(var(--color-card))] rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-[rgb(var(--color-foreground))]">Professional Certifications</h2>
                            <button
                                onClick={onClose}
                                className="text-[rgb(var(--color-foreground))] hover:text-[rgb(var(--color-primary))] transition-colors"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {certificates.map((certificate) => (
                                <motion.div
                                    key={certificate.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`bg-[rgb(var(--color-card-hover))] rounded-lg overflow-hidden ${
                                        certificate.isHighlighted ? 'md:col-span-2 border-2 border-[rgb(var(--color-primary))]' : ''
                                    }`}
                                >
                                    <div className="relative h-48">
                                        {certificate.image.endsWith('.pdf') ? (
                                            <div className="w-full h-full flex items-center justify-center bg-[rgb(var(--color-input))]">
                                                <div className="text-center">
                                                    {certificate.title === 'Software Engineering' ? (
                                                        <>
                                                            <span className="text-6xl mb-2 block">🎓</span>
                                                            <span className="text-[rgb(var(--color-primary))] font-semibold">Bachelor&apos;s Degree</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span className="text-6xl mb-2 block">📄</span>
                                                            <span className="text-[rgb(var(--color-primary))] font-semibold">Certificate</span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        ) : (
                                            <Image
                                                src={certificate.image}
                                                alt={certificate.title}
                                                fill
                                                className="object-cover"
                                            />
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-xl font-semibold mb-2 text-[rgb(var(--color-foreground))]">
                                            {certificate.title}
                                        </h3>
                                        <div className="space-y-2 mb-3">
                                            <div className="flex items-center gap-2 text-[rgb(var(--color-muted))]">
                                                <FaUniversity className="text-[rgb(var(--color-primary))]" />
                                                <span>{certificate.issuer}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-[rgb(var(--color-muted))]">
                                                <FaCalendarAlt className="text-[rgb(var(--color-primary))]" />
                                                <span>{certificate.date}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-[rgb(var(--color-muted))]">
                                                {certificate.level.includes('Advanced') ? (
                                                    <FaGraduationCap className="text-[rgb(var(--color-primary))]" />
                                                ) : (
                                                    <FaAward className="text-[rgb(var(--color-primary))]" />
                                                )}
                                                <span>{certificate.level}</span>
                                            </div>
                                        </div>
                                        <p className="text-[rgb(var(--color-muted))] mb-3">
                                            {certificate.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {certificate.skills.map((skill, index) => (
                                                <span
                                                    key={index}
                                                    className="px-2 py-1 text-sm rounded-full bg-[rgb(var(--color-primary))]/10 text-[rgb(var(--color-primary))]"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                        <a
                                            href={certificate.verification}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[rgb(var(--color-primary))] hover:underline text-sm"
                                        >
                                            View Certificate →
                                        </a>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CertificateModal; 