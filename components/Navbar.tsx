'use client';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useScrollDirection } from './useScrollDirection';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSkillsMenuOpen, setIsSkillsMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const TG="{TGDEV}";
  const { direction, isAtTop } = useScrollDirection();

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

  const isVisible = isMobileMenuOpen ? true : (!isAtTop && direction === 'up');

  useEffect(() => {
    if (direction === 'down') setIsSkillsMenuOpen(false);
  }, [direction]);

  const toggleMenu = () => {
    setIsMobileMenuOpen((open) => {
      const next = !open;
      return next;
    });
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
  const name = "Tilahun";
  const characters = name.split("");

  return (
    <motion.nav
      initial={false}
      animate={{ y: isVisible ? 0 : -110 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-[100] bg-[rgb(var(--color-card))]/85 backdrop-blur-md shadow-sm border-b border-[rgb(var(--color-border))]"
    >
      <div className="relative w-full px-2 sm:px-4 lg:px-8 py-4 flex justify-between items-center">
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
            <div className="flex items-center">
              <Link
                href="/#skills"
                className="px-3 py-2 text-[rgb(var(--color-foreground))] hover:text-[rgb(var(--color-primary))] transition-colors"
                onClick={() => setIsSkillsMenuOpen(false)}
              >
                Skills
              </Link>
              <button
                type="button"
                aria-label="Toggle skills menu"
                onClick={toggleSkillsMenu}
                className="px-2 py-2 text-[rgb(var(--color-muted))] hover:text-[rgb(var(--color-primary))] transition-colors"
              >
                <span className={`text-xs transition-transform duration-200 inline-block ${isSkillsMenuOpen ? 'rotate-180' : ''}`}>▼</span>
              </button>
            </div>
            {isSkillsMenuOpen && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-[rgb(var(--color-card))] rounded-lg shadow-lg py-2 z-[102] border border-[rgb(var(--color-border))]">
                <Link 
                  href="/#skills"
                  className="block w-full text-left px-4 py-2 hover:bg-[rgb(var(--color-background))] transition-colors text-[rgb(var(--color-foreground))]"
                  onClick={() => setIsSkillsMenuOpen(false)}
                >
                  Technical Skills
                </Link>
                <Link 
                  href="/certifications"
                  className="block w-full text-left px-4 py-2 hover:bg-[rgb(var(--color-background))] transition-colors text-[rgb(var(--color-foreground))]"
                  onClick={() => setIsSkillsMenuOpen(false)}
                >
                  Certifications
                </Link>
                <Link 
                  href="/#blog"
                  className="block w-full text-left px-4 py-2 hover:bg-[rgb(var(--color-background))] transition-colors text-[rgb(var(--color-foreground))]"
                  onClick={() => setIsSkillsMenuOpen(false)}
                >
                  Blogs
          </Link>
              </div>
            )}
          </div>
          <Link 
            href="/#projects" 
            className="px-3 py-2 text-[rgb(var(--color-foreground))] hover:text-[rgb(var(--color-primary))] transition-colors"
          >
            Projects
          </Link>
          <Link 
            href="/#contact" 
            className="px-3 py-2 text-[rgb(var(--color-foreground))] hover:text-[rgb(var(--color-primary))] transition-colors"
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
        className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-[rgb(var(--color-card))]/95 backdrop-blur-md px-4 py-4 flex flex-col gap-3 absolute top-full left-0 right-0 shadow-lg z-[101] border-b border-[rgb(var(--color-border))] max-h-[calc(100vh-4.5rem)] overflow-y-auto`}
      >
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <Link
              href="/#skills"
              className="py-2 text-[rgb(var(--color-foreground))] hover:text-[rgb(var(--color-primary))] transition-colors"
              onClick={() => {
                setIsSkillsMenuOpen(false);
                setIsMobileMenuOpen(false);
              }}
            >
              Skills
            </Link>
            <button
              type="button"
              aria-label="Toggle skills menu"
              onClick={toggleSkillsMenu}
              className="px-2 py-2 text-[rgb(var(--color-muted))] hover:text-[rgb(var(--color-primary))] transition-colors"
            >
              <span className={`text-xs transition-transform duration-200 inline-block ${isSkillsMenuOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>
          </div>
          {isSkillsMenuOpen && (
            <div className="pl-4 flex flex-col gap-2">
              <Link 
                href="/#skills"
                className="py-2 text-[rgb(var(--color-muted))] hover:text-[rgb(var(--color-primary))] transition-colors"
                onClick={() => {
                  setIsSkillsMenuOpen(false);
                  setIsMobileMenuOpen(false);
                }}
              >
                Technical Skills
              </Link>
              <Link 
                href="/certifications"
                className="py-2 text-[rgb(var(--color-muted))] hover:text-[rgb(var(--color-primary))] transition-colors"
                onClick={() => {
                  setIsSkillsMenuOpen(false);
                  setIsMobileMenuOpen(false);
                }}
              >
                Certifications
              </Link>
              <Link 
                href="/#blog"
                className="py-2 text-[rgb(var(--color-muted))] hover:text-[rgb(var(--color-primary))] transition-colors"
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
          className="py-2 text-[rgb(var(--color-foreground))] hover:text-[rgb(var(--color-primary))] transition-colors"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Projects
        </Link>
        <Link 
          href="/#contact"
          className="py-2 text-[rgb(var(--color-foreground))] hover:text-[rgb(var(--color-primary))] transition-colors"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Contact
        </Link>
      </div>
    </motion.nav>
  );
};

export default Navbar;