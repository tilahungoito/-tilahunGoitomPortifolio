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
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials';

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
      id: 5,
      title: 'Mekelle University Research Network',
      description: 'A sophisticated WordPress-based platform designed to enhance academic collaboration and research visibility at Mekelle University. This comprehensive system enables researchers to create detailed professional profiles, showcase their publications, and connect with potential collaborators. Features include advanced search capabilities, research interest matching, and a dynamic news feed highlighting university research achievements.',
      tags: ['WordPress', 'PHP', 'MySQL', 'JavaScript', 'CSS'],
      image: '/wordpress.png',
      link: '#',
    },
    {
      id: 1,
      title: 'E-commerce Platform',
      description: 'A comprehensive full-stack e-commerce solution built with React, Node.js, and MongoDB. This platform enables users to buy and sell educational materials including books, lectures, and tutorials. It features a collaborative learning environment where peers can work together and benefit from shared knowledge and resources.',
      tags: ['React', 'Next.js', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS'],
      image: '/mycourses.png',
      link: 'https://peer-courses-tilahun-dtqk-git-main-tilahuns-projects-82416c09.vercel.app',
    },
    {
      id: 2,
      title: 'Shire Referral Hospital Management System',
      description: 'A comprehensive hospital management system developed for Shire Referral Hospital. This system automates the appointment scheduling process, allowing doctors to efficiently manage and record patient appointments. It streamlines administrative workflows and improves the overall patient care experience.',
      tags: ['php', 'Xampp', 'Bootstrap', 'JavaScript', 'HTML'],
      image: '/shire referal.png',
      link: 'https://github.com/tilahungoito/Shire-Hospital-patient-appointment-system',
    },
    {
      id: 3,
      title: 'Disease Prediction System',
      description: 'An advanced machine learning-based disease prediction system that analyzes patient data including symptoms and vital signs to predict the likelihood of various diseases. This tool assists healthcare professionals in making more informed diagnostic decisions and improving patient outcomes through early intervention.',
      tags: ['Python', 'Flask', 'Pandas', 'XGBoost'],
      image: '/predictorDisease.png',
      link: 'https://github.com/tilahungoito/CodeAlpha_diseases_predictor',
    },
    {
      id: 4,
      title: 'Product Hub Marketplace',
      description: 'A versatile e-commerce platform that enables users to showcase and sell any product or service. The platform features an intuitive interface for listing items, searching for products, and facilitating transactions between buyers and sellers. It creates a comprehensive marketplace for diverse goods and services.',
      tags: ['React', 'Node.js', 'CSS', 'Vite', 'HTML', 'Express'],
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
      <div className="w-full h-80 md:h-96 rounded-2xl overflow-hidden relative">
        {/* Fantastic background with gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 opacity-80 z-10"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-yellow-400 rounded-full opacity-20 blur-2xl z-0"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-blue-400 rounded-full opacity-20 blur-2xl z-0"></div>
        
        {/* Floating images animation */}
        <motion.div 
          className="absolute top-0 left-0 w-16 h-16 z-20"
          animate={{
            x: [0, 100, 200, 300, 200, 100, 0],
            y: [0, 50, 0, 50, 0, 50, 0],
            rotate: [0, 10, 0, -10, 0, 10, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <Image
            src="/tilahun1.jpg"
            alt="Tilahun 1"
            width={64}
            height={64}
            className="rounded-full border-2 border-white shadow-lg"
          />
        </motion.div>
        
        <motion.div 
          className="absolute top-1/4 right-0 w-16 h-16 z-20"
          animate={{
            x: [0, -100, -200, -300, -200, -100, 0],
            y: [0, -50, 0, -50, 0, -50, 0],
            rotate: [0, -10, 0, 10, 0, -10, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
            delay: 2
          }}
        >
          <Image
            src="/tilahun2.jpg"
            alt="Tilahun 2"
            width={64}
            height={64}
            className="rounded-full border-2 border-white shadow-lg"
          />
        </motion.div>
        
        <motion.div 
          className="absolute bottom-1/4 left-0 w-16 h-16 z-20"
          animate={{
            x: [0, 150, 250, 350, 250, 150, 0],
            y: [0, -30, 0, -30, 0, -30, 0],
            rotate: [0, 15, 0, -15, 0, 15, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
            delay: 4
          }}
        >
          <Image
            src="/tilahun3.jpg"
            alt="Tilahun 3"
            width={64}
            height={64}
            className="rounded-full border-2 border-white shadow-lg"
          />
        </motion.div>
        
        <motion.div 
          className="absolute bottom-0 right-1/4 w-16 h-16 z-20"
          animate={{
            x: [0, -150, -250, -350, -250, -150, 0],
            y: [0, 30, 0, 30, 0, 30, 0],
            rotate: [0, -15, 0, 15, 0, -15, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "linear",
            delay: 6
          }}
        >
          <Image
            src="/tilahun4.jpg"
            alt="Tilahun 4"
            width={64}
            height={64}
            className="rounded-full border-2 border-white shadow-lg"
          />
        </motion.div>
        
        {/* Profile image with proper positioning */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
        <Image
            src="/tilea.jpg"
          alt="Profile"
          width={800}
            height={800}
            className="w-full h-full object-contain object-center"
            priority
        />
        </div>
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
        <div className="relative">
          <div className="overflow-x-auto pb-8">
            <div className="flex gap-8 min-w-max px-4">
              {projects.map((project, index) => (
                <div key={project.id} className="w-[400px] flex-shrink-0">
                  <ProjectCard project={project} index={index} />
                </div>
              ))}
            </div>
          </div>
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
        </div>
      </section>

      <section id="testimonials" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">What People Say</h2>
          <div className="max-w-4xl mx-auto">
            <AnimatedTestimonials
              testimonials={[
                {
                  quote: "Tilahun is an exceptional developer who consistently delivers high-quality work. His attention to detail and problem-solving skills are outstanding.",
                  name: "Gk Gebremedhin",
                  designation: "Chief Executive Officer at Vite Technologies Pvt Ltd",
                  src: "/testimonials/person1.png",
                },
                {
                  quote: "As Dean of Software Engineering, I've had the privilege of observing Tilahun's growth from student to professional. His dedication to excellence, innovative thinking, and ability to apply theoretical knowledge to practical solutions is remarkable. He represents the caliber of graduates we strive to produce at Mekelle University.",
                  name: "Selama Gebremeskel",
                  designation: "Dean of Software Engineering at Mekelle University",
                  src: "https://ui-avatars.com/api/?name=Selama+Gebremeskel&background=0D8ABC&color=fff&size=200",
                },
                {
                  quote: "Tilahun demonstrates exceptional technical aptitude and a deep understanding of networking principles. His ability to troubleshoot complex issues and implement innovative solutions sets him apart. As his instructor, I've been impressed by his dedication to continuous learning and his collaborative approach to problem-solving.",
                  name: "Girmay Teklehymanot",
                  designation: "Chief of Networking and IT",
                  src: "https://ui-avatars.com/api/?name=Girmay+Teklehymanot&background=0D8ABC&color=fff&size=200",
                },
              ]}
              autoplay={true}
            />
          </div>
        </div>
      </section>

      <section id="contact" className="py-16">
        <div className="container mx-auto px-4">
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
        </div>
      </section>
    </>
  );
};

export default Home;