'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface CertificateModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CertificateModal: React.FC<CertificateModalProps> = ({ isOpen, onClose }) => {
    const certificates = [
        {
            id: 1,
            title: 'Cisco Networking Enterprise Level',
            image: '/cisco.png',
            description: 'Professional certification in enterprise networking and infrastructure.'
        },
        {
            id: 2,
            title: 'Full Stack Development',
            image: '/fullstack.png',
            description: 'Comprehensive certification in modern full stack development technologies.'
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
                                    className="bg-[rgb(var(--color-card-hover))] rounded-lg overflow-hidden"
                                >
                                    <div className="relative h-48">
                                        <Image
                                            src={certificate.image}
                                            alt={certificate.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-xl font-semibold mb-2 text-[rgb(var(--color-foreground))]">
                                            {certificate.title}
                                        </h3>
                                        <p className="text-[rgb(var(--color-muted))]">
                                            {certificate.description}
                                        </p>
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