'use client';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSkillsMenuOpen, setIsSkillsMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const TG="TG";

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsSkillsMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSkillsMenuOpen(false);
  }, [pathname]);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSkillsMenu = () => {
    setIsSkillsMenuOpen(!isSkillsMenuOpen);
  };

  // Animation for the container
  const containerVariants: Variants = {
    initial: { x: 0 },
    animate: {
      x: [0, 5, -5, 3, -3, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut"
      }
    }
  };

  // Animation for individual letters
  const letterVariants: Variants = {
    initial: { y: 0 },
    animate: (i: number) => ({
      y: [0, -5, 5, -3, 3, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut",
        delay: i * 0.1
      }
    })
  };

  // Split the name into individual characters for animation
  const name = "ጥላሁን ጎይቶኦም";
  const characters = name.split("");

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-[100] bg-light/80 backdrop-blur-sm shadow-sm"
    >
      <div className="w-full px-2 sm:px-4 lg:px-8 py-4 flex justify-between items-center">
      <Link href="/" className="flex items-center gap-3">
  {/* Logo Image with Circle and Hover Effect */}
  <div className="relative">
    <motion.div
      className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20"
      whileHover={{
        scale: 1.1,
        borderWidth: "3px",
        borderColor: "rgba(0, 0, 0, 0.3)",
        transition: { duration: 0.2 }
      }}
    >
      <Image
        src="/tilahun (2).png"
        alt="Tilahun Logo"
        width={58}
        height={58}
        className="object-cover w-full h-full"
        priority
      />
    </motion.div>
  </div>
  <motion.span 
    className="text-2xl font-bold text-primary flex"
    variants={containerVariants}
    initial="initial"
    animate="animate"
  >
    {characters.map((char, index) => (
      <motion.span
        key={index}
        custom={index}
        variants={letterVariants}
        initial="initial"
        animate="animate"
        className="inline-block"
      >
        {char}
      </motion.span>
    ))}
    <motion.span
      custom={characters.length}
      variants={letterVariants}
      initial="initial"
      animate="animate"
      className="inline-block ml-1"
    >
      {TG}
    </motion.span>
  </motion.span>
</Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 relative z-[101]">
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={toggleSkillsMenu}
              className="flex items-center gap-1 px-3 py-2 text-gray-700 hover:text-primary transition-colors"
            >
            Skills
              <span className={`text-xs transition-transform duration-200 ${isSkillsMenuOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {isSkillsMenuOpen && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg py-2 z-[102]">
                <Link 
                  href="/#skills"
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                  onClick={() => setIsSkillsMenuOpen(false)}
                >
                  Technical Skills
                </Link>
                <Link 
                  href="/certifications"
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                  onClick={() => setIsSkillsMenuOpen(false)}
                >
                  Certifications
                </Link>
                <Link 
                  href="/blogs"
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                  onClick={() => setIsSkillsMenuOpen(false)}
                >
                  Blogs
          </Link>
              </div>
            )}
          </div>
          <Link 
            href="/#projects" 
            className="px-3 py-2 text-gray-700 hover:text-primary transition-colors"
          >
            Projects
          </Link>
          <Link 
            href="/#contact" 
            className="px-3 py-2 text-gray-700 hover:text-primary transition-colors"
          >
            Contact
          </Link>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden flex items-center relative z-[101]">
          <button onClick={toggleMenu} className="text-2xl text-primary">
            {isMobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-light/90 backdrop-blur-sm px-6 py-4 flex flex-col gap-4 absolute top-16 left-0 right-0 shadow-md z-[101]`}
      >
        <div className="flex flex-col">
          <button 
            onClick={toggleSkillsMenu}
            className="flex items-center justify-between py-2 text-gray-700 hover:text-primary transition-colors"
          >
          Skills
            <span className={`text-xs transition-transform duration-200 ${isSkillsMenuOpen ? 'rotate-180' : ''}`}>▼</span>
          </button>
          {isSkillsMenuOpen && (
            <div className="pl-4 flex flex-col gap-2">
              <Link 
                href="/#skills"
                className="py-2 text-gray-700 hover:text-primary transition-colors"
                onClick={() => {
                  setIsSkillsMenuOpen(false);
                  setIsMobileMenuOpen(false);
                }}
              >
                Technical Skills
              </Link>
              <Link 
                href="/certifications"
                className="py-2 text-gray-700 hover:text-primary transition-colors"
                onClick={() => {
                  setIsSkillsMenuOpen(false);
                  setIsMobileMenuOpen(false);
                }}
              >
                Certifications
              </Link>
              <Link 
                href="/blogs"
                className="py-2 text-gray-700 hover:text-primary transition-colors"
                onClick={() => {
                  setIsSkillsMenuOpen(false);
                  setIsMobileMenuOpen(false);
                }}
              >
                Blogs
        </Link>
            </div>
          )}
        </div>
        <Link 
          href="/#projects"
          className="py-2 text-gray-700 hover:text-primary transition-colors"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Projects
        </Link>
        <Link 
          href="/#contact"
          className="py-2 text-gray-700 hover:text-primary transition-colors"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Contact
        </Link>
      </div>
    </motion.nav>
  );
};

export default Navbar;