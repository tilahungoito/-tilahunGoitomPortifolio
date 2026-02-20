'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHome, FaCode, FaProjectDiagram, FaComments, FaDownload, FaChevronDown, FaBookOpen } from 'react-icons/fa';

interface TopNavigationProps {
    isCertificateModalOpen: boolean;
    setIsCertificateModalOpen: (isOpen: boolean) => void;
}

const TopNavigation: React.FC<TopNavigationProps> = ({ setIsCertificateModalOpen }) => {
    const [activeSection, setActiveSection] = useState('home');
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSkillsSubmenuOpen, setIsSkillsSubmenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            const sections = ['home', 'skills', 'projects', 'testimonials', 'blog', 'contact'];
            const currentSection = sections.find(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top <= 100 && rect.bottom >= 100;
                }
                return false;
            });

            if (currentSection) {
                setActiveSection(currentSection);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const offset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    const handleNavigationClick = (sectionId: string) => {
        if (sectionId === 'certifications') {
            setIsCertificateModalOpen(true);
            setIsMobileMenuOpen(false);
            setIsSkillsSubmenuOpen(false);
            return;
        }
        scrollToSection(sectionId);
        setIsMobileMenuOpen(false);
        setIsSkillsSubmenuOpen(false);
    };

    const navItems = [
        { id: 'home', label: 'Home', icon: <FaHome /> },
        {
            id: 'skills',
            label: 'Skills',
            icon: <FaCode />,
            submenu: [
                { id: 'certifications', label: 'Certifications', icon: <FaDownload /> }
            ]
        },
        { id: 'projects', label: 'Projects', icon: <FaProjectDiagram /> },
        { id: 'testimonials', label: 'Testimonials', icon: <FaComments /> },
        { id: 'blog', label: 'Blog', icon: <FaBookOpen /> },
        { id: 'contact', label: 'Contact', icon: <FaDownload /> }
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[rgb(var(--color-card))] shadow-lg' : 'bg-transparent'
                    }`}
            >
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-4">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-xl font-bold text-[rgb(var(--color-primary))]"
                            >
                                TG
                            </motion.div>
                            <motion.div
                                initial={{ y: -100, opacity: 0 }}
                                animate={{
                                    y: [null, 0, -20, 0, -10, 0, -5, 0],
                                    opacity: [null, 1, 1, 1, 1, 1, 1, 1]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatDelay: 3,
                                    ease: [0.17, 0.67, 0.83, 0.67], // Custom easing for bouncy effect
                                    times: [0, 0.2, 0.4, 0.6, 0.7, 0.8, 0.9, 1]
                                }}
                                className="relative"
                            >
                                <span className="text-xl font-bold text-[rgb(var(--color-foreground))]">
                                    ጥላሁን ጎይቶኦም
                                </span>
                                <motion.div
                                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[rgb(var(--color-primary))]"
                                    initial={{ scaleX: 0 }}
                                    animate={{
                                        scaleX: [0, 1, 1, 0],
                                        opacity: [0, 1, 1, 0]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        repeatDelay: 3,
                                        times: [0, 0.2, 0.8, 1]
                                    }}
                                />
                            </motion.div>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-8">
                            {navItems.map((item) => (
                                <div key={item.id} className="relative">
                                    <motion.button
                                        onClick={() => {
                                            if (item.id === 'skills') {
                                                setIsSkillsSubmenuOpen(!isSkillsSubmenuOpen);
                                            } else {
                                                handleNavigationClick(item.id);
                                            }
                                        }}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${activeSection === item.id
                                            ? 'text-[rgb(var(--color-primary))] bg-[rgb(var(--color-primary))]/10'
                                            : 'text-[rgb(var(--color-foreground))] hover:bg-[rgb(var(--color-card-hover))]'
                                            }`}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {item.icon}
                                        <span>{item.label}</span>
                                        {item.submenu && (
                                            <FaChevronDown className={`transition-transform ${isSkillsSubmenuOpen ? 'rotate-180' : ''}`} />
                                        )}
                                    </motion.button>

                                    {item.submenu && isSkillsSubmenuOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="absolute top-full left-0 mt-2 w-48 bg-[rgb(var(--color-card))] rounded-lg shadow-lg overflow-hidden"
                                        >
                                            {item.submenu.map((subItem) => (
                                                <motion.button
                                                    key={subItem.id}
                                                    onClick={() => handleNavigationClick(subItem.id)}
                                                    className="w-full flex items-center gap-2 px-4 py-2 text-[rgb(var(--color-foreground))] hover:bg-[rgb(var(--color-card-hover))] transition-colors"
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    {subItem.icon}
                                                    <span>{subItem.label}</span>
                                                </motion.button>
                                            ))}
                                        </motion.div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Mobile Menu Button */}
                        <motion.button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 rounded-lg hover:bg-[rgb(var(--color-card-hover))]"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <div className="w-6 h-6 flex flex-col justify-around">
                                <span className={`block w-full h-0.5 bg-[rgb(var(--color-foreground))] transition-transform ${isMobileMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`} />
                                <span className={`block w-full h-0.5 bg-[rgb(var(--color-foreground))] transition-opacity ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                                <span className={`block w-full h-0.5 bg-[rgb(var(--color-foreground))] transition-transform ${isMobileMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
                            </div>
                        </motion.button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden bg-[rgb(var(--color-card))] shadow-lg"
                        >
                            <div className="container mx-auto px-4 py-4">
                                <div className="flex flex-col space-y-2">
                                    {navItems.map((item) => (
                                        <div key={item.id}>
                                            <motion.button
                                                onClick={() => {
                                                    if (item.submenu) {
                                                        setIsSkillsSubmenuOpen(!isSkillsSubmenuOpen);
                                                    } else {
                                                        handleNavigationClick(item.id);
                                                    }
                                                }}
                                                className={`w-full flex items-center justify-between px-4 py-2 rounded-lg transition-colors ${activeSection === item.id
                                                    ? 'text-[rgb(var(--color-primary))] bg-[rgb(var(--color-primary))]/10'
                                                    : 'text-[rgb(var(--color-foreground))] hover:bg-[rgb(var(--color-card-hover))]'
                                                    }`}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <div className="flex items-center gap-2">
                                                    {item.icon}
                                                    <span>{item.label}</span>
                                                </div>
                                                {item.submenu && (
                                                    <FaChevronDown className={`transition-transform ${isSkillsSubmenuOpen ? 'rotate-180' : ''}`} />
                                                )}
                                            </motion.button>

                                            {item.submenu && isSkillsSubmenuOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="pl-8 mt-2"
                                                >
                                                    {item.submenu.map((subItem) => (
                                                        <motion.button
                                                            key={subItem.id}
                                                            onClick={() => handleNavigationClick(subItem.id)}
                                                            className="w-full flex items-center gap-2 px-4 py-2 text-[rgb(var(--color-foreground))] hover:bg-[rgb(var(--color-card-hover))] rounded-lg transition-colors"
                                                            whileHover={{ scale: 1.02 }}
                                                            whileTap={{ scale: 0.98 }}
                                                        >
                                                            {subItem.icon}
                                                            <span>{subItem.label}</span>
                                                        </motion.button>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>
        </>
    );
};

export default TopNavigation; 