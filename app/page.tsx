// app/page.tsx
'use client';
import AnimatedText from '../components/AnimatedText';
import HireMeButton from '../components/HireMeButton';
import { motion } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import { FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Skills from '../components/Skills'; // Import the new Skills component
import DownloadCV from '@/components/DownloadCV';

const Home = () => {
  const [typingText, setTypingText] = useState('Software Engineer');

  useEffect(() => {
    const interval = setInterval(() => {
      setTypingText((prev) => (prev === 'Software Engineer' ? 'Tech Enthusiast' : 'Software Engineer'));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const projects = [
    {
      id: 1,
      title: 'E-commerce Platform',
      description: 'Full-stack e-commerce solution with React, Node.js, and MongoDB,express and nextjs tha enable any one to show interst and buy and sale books, lecture and titorials and get benefitfe from peers working togather',
      tags: ['React', 'Next.js', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS'],
      image: '/mycourses.png',
      link: 'https://peer-courses-tilahun-dtqk-git-main-tilahuns-projects-82416c09.vercel.app',
    },
    {
      id: 2,
      title: 'Shul shire hospital mangament system',
      description: 'This provised some automation to shire referal hospital for ducorrs to make and recorde appointments to patient',
      tags: ['php', 'Xampp', 'Bootstap', 'javascrpit', 'HTML'],
      image: '/shire referal.png',
      link: 'https://github.com/tilahungoito/Shire-Hospital-patient-appointment-system',
    },
    {
      id: 3,
      title: 'deseas prediction system',
      description: 'A disease prediction system uses machine learning to analyze patient data, such as symptoms and vital signs, to predict the likelihood of a disease.',
      tags: ['Python', 'flask', 'padas', 'xgboost'],
      image: '/predictorDisease.png',
      link: 'https://github.com/tilahungoito/CodeAlpha_diseases_predictor',
    },
    {
      id: 4,
      title: 'Product hub for every one',
      description: 'This for every one with any thing he/she want to sale present it to this plat form and find any one need and deal with',
      tags: ['React', 'Node.js', 'css', 'vite', 'HTML', 'express'],
      image: '/find product.png',
      link: 'https://findproducts-2.onrender.com/',
    },
  ];

  return (
    <>
      <HireMeButton />

      <section className="min-h-screen flex items-center justify-center py-16">
  <div className="grid md:grid-cols-2 gap-8 items-center container mx-auto px-4">
    <div className="order-2 md:order-1">
      <AnimatedText
        text="Hi,✋ I'm Tilahun.G"
        className="text-4xl md:text-6xl font-bold mb-4"
      />
      <AnimatedText
        text="Full Stack Developer"
        className="text-2xl md:text-4xl text-primary mb-4"
      />
      
      {/* Enhanced About Me Content with Handwriting Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-lg mb-8 space-y-4"
      >
        <motion.p
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            delay: 0.4
          }}
          style={{
            position: 'relative',
            paddingLeft: '2rem'
          }}
        >
          <span className="absolute left-0 top-0 text-primary">✍️</span>
          <span className="handwriting-animation">
            I&apos;m known for tech passionate, dedicated to creating digital excellence.
          </span>
        </motion.p>

        <motion.p
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            delay: 0.8
          }}
          style={{
            position: 'relative',
            paddingLeft: '2rem'
          }}
        >
          <span className="absolute left-0 top-0 text-primary">🎓</span>
          <span className="handwriting-animation">
            Bachelor of Software Engineering from Mekelle University.
          </span>
        </motion.p>

        <motion.p
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            delay: 1.2
          }}
          style={{
            position: 'relative',
            paddingLeft: '2rem'
          }}
        >
          <span className="absolute left-0 top-0 text-primary">🔌</span>
          <span className="handwriting-animation">
            Cisco Networking Enterprise Level Certified professional.
          </span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
        >
          I build exceptional digital experiences with modern technologies.
          Focused on creating intuitive, performant, and accessible web
          applications and mobile apps.
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex gap-4"
      >
        <a
          href="#projects"
          className="bg-dark text-light px-6 py-3 rounded-lg hover:bg-dark/90 transition-colors cursor-pointer"
        >
          View Projects
        </a>
        <a
          href="#contact"
          className="border-2 border-dark px-6 py-3 rounded-lg hover:bg-dark hover:text-light transition-colors cursor-pointer"
        >
          Contact Me
        </a>
      </motion.div>
    </div>

    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative order-1 md:order-2"
    >
      <div className="w-full h-80 md:h-96 bg-primary/10 rounded-2xl overflow-hidden">
        <Image
          src="/profile.jpg"
          alt="Profile"
          width={800}
          height={600}
          className="w-full h-full object-cover"
        />
      </div>
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute -bottom-4 -left-4 bg-primary text-light px-4 py-2 rounded-lg shadow-lg"
      >
        <span className="font-bold">5+</span> Years Experience
      </motion.div>
      <div className="absolute -bottom-4 right-4">
        <DownloadCV />
      </div>
      <div className="mt-6 text-center md:text-left">
        <AnimatedText
          text={typingText}
          className="text-2xl md:text-3xl text-primary"
        />
      </div>
    </motion.div>
  </div>

  <style jsx global>{`
    @keyframes handwriting {
      from {
        clip-path: polygon(0 0, 0 0, 0 100%, 0% 100%);
      }
      to {
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
      }
    }
    .handwriting-animation {
      display: inline-block;
      animation: handwriting 2s ease-in-out forwards;
      animation-delay: calc(var(--delay) * 0.4s);
    }
  `}</style>
</section>

      {/* Replace the old skills section with the new Skills component */}
      <Skills />

      <section id="projects" className="py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">Featured Projects</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </section>

      <section id="contact" className="py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">Get In Touch</h2>
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
          <p className="mb-6 text-center">
            Have a project in mind or want to discuss potential opportunities?
            Love to hear from you!
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="https://github.com/tilahungoito"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-dark text-light rounded-full hover:bg-dark/90 transition-colors"
            >
              <FiGithub size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/tilahun-goitom-559401302/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-dark text-light rounded-full hover:bg-dark/90 transition-colors"
            >
              <FiLinkedin size={24} />
            </a>
            <a
              href="https://x.com/TilahunGo1921"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-dark text-light rounded-full hover:bg-dark/90 transition-colors"
            >
              <FiTwitter size={24} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;