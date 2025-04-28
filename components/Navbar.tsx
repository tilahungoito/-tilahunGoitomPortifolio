'use client';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import Image from 'next/image';


const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const TG="TG";
  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
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
        delay: i * 0.1 // Stagger the animation for each letter
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
      className="sticky top-0 z-30 bg-light/80 backdrop-blur-sm shadow-sm"
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
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
        <div className="hidden md:flex gap-6">
          <Link href="#skills" className="hover:text-primary transition-colors">
            Skills
          </Link>
          <Link href="#projects" className="hover:text-primary transition-colors">
            Projects
          </Link>
          <Link href="#contact" className="hover:text-primary transition-colors">
            Contact
          </Link>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-2xl text-primary">
            {isMobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-light/90 backdrop-blur-sm px-6 py-4 flex flex-col gap-4 absolute top-16 left-0 right-0 shadow-md`}
      >
        <Link href="#skills" className="hover:text-primary transition-colors">
          Skills
        </Link>
        <Link href="#projects" className="hover:text-primary transition-colors">
          Projects
        </Link>
        <Link href="#contact" className="hover:text-primary transition-colors">
          Contact
        </Link>
      </div>
    </motion.nav>
  );
};

export default Navbar;