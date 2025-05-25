'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiFileText, FiExternalLink } from 'react-icons/fi';

interface CertificateModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const certifications = [
    {
        title: "Software Engineering",
        pdf: "/certifications/TilahunGoitom(SoftwareEngineer) (1).pdf",
        description: "Bachelor's Degree in Software Engineering from Mekelle University",
        preview: "/certifications/ccna1.png"
    },
    {
        title: "Ethical Hacking",
        pdf: "/certifications/ethicalHacker.png",
        description: "Certified Ethical Hacker (CEH) - Professional certification in cybersecurity",
        preview: "/certifications/ethicalHacker.png"
    },
    {
        title: "CCNA",
        pdf: "/certifications/ccna2.png",
        description: "Cisco Certified Network Associate - Enterprise networking certification",
        preview: "/certifications/ccna2.png"
    },
    {
        title: "EF SET",
        pdf: "/certifications/EF SET Certificate1 tilahun.pdf",
        description: "English Language Proficiency - Advanced level certification",
        preview: "/certifications/ccna1.png"
    },
    {
        title: "Data Analysis",
        pdf: "/certifications/dataAnalysis.pdf",
        description: "Data Analysis and Visualization - Professional certification",
        preview: "/certifications/ccna1.png"
    },
    {
        title: "Artificial Intelligence",
        pdf: "/certifications/Artificial intelligence.pdf",
        description: "AI and Machine Learning - Advanced certification",
        preview: "/certifications/ccna1.png"
    },
    {
        title: "Android Development",
        pdf: "/certifications/android devloper.pdf",
        description: "Mobile App Development - Professional certification",
        preview: "/certifications/ccna1.png"
    }
];

const CertificateModal: React.FC<CertificateModalProps> = ({ isOpen, onClose }) => {
    console.log('CertificateModal render:', { isOpen });
    
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-50"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed bottom-0 left-0 right-0 bg-[rgb(var(--color-card))] rounded-t-2xl p-6 z-50 max-h-[90vh] overflow-y-auto"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-[rgb(var(--color-foreground))]">
                                Professional Certifications
                            </h2>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-[rgb(var(--color-card-hover))] rounded-lg transition-colors"
                            >
                                <FiX size={24} className="text-[rgb(var(--color-foreground))]" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {certifications.map((cert, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-[rgb(var(--color-card-hover))] rounded-lg p-6"
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        <FiFileText size={24} className="text-[rgb(var(--color-primary))]" />
                                        <h3 className="text-xl font-semibold text-[rgb(var(--color-foreground))]">
                                            {cert.title}
                                        </h3>
                                    </div>
                                    <p className="text-[rgb(var(--color-muted))] mb-4">
                                        {cert.description}
                                    </p>
                                    <a
                                        href={cert.pdf}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-[rgb(var(--color-primary))] hover:underline"
                                    >
                                        <FiExternalLink />
                                        View Certificate
                                    </a>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-8 text-center">
                            <p className="text-[rgb(var(--color-muted))]">
                                These certifications represent my commitment to continuous learning and professional development.
                                Each certificate has been earned through rigorous study and practical application of skills.
                            </p>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CertificateModal; 