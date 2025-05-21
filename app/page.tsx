// app/page.tsx
'use client';
import AnimatedText from '../components/AnimatedText';
import HireMeButton from '../components/HireMeButton';
import { motion } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import { FiGithub, FiLinkedin, FiTwitter, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Skills from '../components/Skills'; // Import the new Skills component
import DownloadCV from '@/components/DownloadCV';
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials';

const Home = () => {
  const [typingText, setTypingText] = useState('Software Engineer');
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && activeProjectIndex < projects.length - 1) {
      setActiveProjectIndex(activeProjectIndex + 1);
    }
    if (isRightSwipe && activeProjectIndex > 0) {
      setActiveProjectIndex(activeProjectIndex - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTypingText((prev) => (prev === 'Software Engineer' ? 'Tech Enthusiast' : 'Software Engineer'));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const projects = [
    {
      id: 6,
      title: "Insurance Admin",
      description: "A comprehensive health insurance management system that streamlines policy administration, claims processing, and member services. Features include automated underwriting, digital claims processing, provider network management, and integrated payment systems. The platform enhances operational efficiency through automated workflows and real-time analytics.",
      image: "/insurance admin.png",
      tags: ["NestJS", "TypeORM", "PostgreSQL", "Swagger","Next.js", "Docker"],
      link: "https://github.com/EthiopianInsuranceCoorpration/EIC.git"
    },
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
      tags: ['React', 'Node.js', 'MongoDB', 'Express', "Next.js", 'Tailwind CSS'],
      image: '/mycourses.png',
      link: 'https://peer-courses-tilahun-dtqk-git-main-tilahuns-projects-82416c09.vercel.app',
    },
    {
      id: 2,
      title: 'Shire Referral Hospital Management System',
      description: 'A comprehensive hospital management system developed for Shire Referral Hospital. This system automates the appointment scheduling process, allowing doctors to efficiently manage and record patient appointments. It streamlines administrative workflows and improves the overall patient care experience.',
      tags: ['PHP', 'XAMPP', 'Bootstrap', 'JavaScript', 'HTML'],
      image: '/shire referal.png',
      link: 'https://github.com/tilahungoito/Shire-Hospital-patient-appointment-system',
    },
    {
      id: 3,
      title: 'Disease Prediction System',
      description: 'An advanced machine learning-based disease prediction system that analyzes patient data including symptoms and vital signs to predict the likelihood of various diseases. This tool assists healthcare professionals in making more informed diagnostic decisions and improving patient outcomes through early intervention.',
      tags: ['Python', 'Flask', 'Pandas', 'XGBoost', 'Scikit-learn'],
      image: '/predictorDisease.png',
      link: 'https://github.com/tilahungoito/CodeAlpha_diseases_predictor',
    },
    {
      id: 4,
      title: 'Product Hub Marketplace',
      description: 'A versatile e-commerce platform that enables users to showcase and sell any product or service. The platform features an intuitive interface for listing items, searching for products, and facilitating transactions between buyers and sellers. It creates a comprehensive marketplace for diverse goods and services.',
      tags: ['React', 'Node.js', 'Vite', 'Express', 'MongoDB'],
      image: '/find product.png',
      link: 'https://findproducts-2.onrender.com/',
    }
  ];

  return (
    <div className="overflow-x-hidden w-full">
      <HireMeButton />

      <section className="min-h-screen flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 items-center w-full max-w-7xl mx-auto">
          <div className="order-2 md:order-1">
            <AnimatedText
              text="Hi,✋ I'm Tilahun.G"
              className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4"
            />
            <AnimatedText
              text="Full Stack Developer"
              className="text-xl sm:text-2xl md:text-4xl text-primary mb-4"
            />
            
            {/* Enhanced About Me Content with Handwriting Animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-base sm:text-lg mb-8 space-y-4"
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
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href="#projects"
                className="bg-dark text-light px-6 py-3 rounded-lg hover:bg-dark/90 transition-colors cursor-pointer text-center"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="bg-primary text-light px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors cursor-pointer text-center"
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
            <div className="w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden relative">
              {/* Fantastic background with gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 opacity-80 z-10"></div>
              
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-yellow-400 rounded-full opacity-20 blur-2xl z-0"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-blue-400 rounded-full opacity-20 blur-2xl z-0"></div>
              
              {/* Floating images with sun rays */}
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
                <div className="relative">
                  <div className="absolute inset-0 animate-sun-rays pointer-events-none">
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={i}
                        className="sun-ray"
                        style={{
                          transform: `rotate(${i * 30}deg)`,
                          '--i': i
                        } as React.CSSProperties}
                      />
                    ))}
                  </div>
                  <Image
                    src="/tilahun1.jpg"
                    alt="Tilahun 1"
                    width={64}
                    height={64}
                    className="rounded-full border-2 border-white shadow-lg relative z-10"
                  />
                </div>
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
                <div className="relative">
                  <div className="absolute inset-0 animate-sun-rays pointer-events-none">
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={i}
                        className="sun-ray"
                        style={{
                          transform: `rotate(${i * 30}deg)`,
                          '--i': i
                        } as React.CSSProperties}
                      />
                    ))}
                  </div>
                  <Image
                    src="/tilahun2.jpg"
                    alt="Tilahun 2"
                    width={64}
                    height={64}
                    className="rounded-full border-2 border-white shadow-lg relative z-10"
                  />
                </div>
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
                <div className="relative">
                  <div className="absolute inset-0 animate-sun-rays pointer-events-none">
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={i}
                        className="sun-ray"
                        style={{
                          transform: `rotate(${i * 30}deg)`,
                          '--i': i
                        } as React.CSSProperties}
                      />
                    ))}
                  </div>
                  <Image
                    src="/tilahun3.jpg"
                    alt="Tilahun 3"
                    width={64}
                    height={64}
                    className="rounded-full border-2 border-white shadow-lg relative z-10"
                  />
                </div>
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
                <div className="relative">
                  <div className="absolute inset-0 animate-sun-rays pointer-events-none">
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={i}
                        className="sun-ray"
                        style={{
                          transform: `rotate(${i * 30}deg)`,
                          '--i': i
                        } as React.CSSProperties}
                      />
                    ))}
                  </div>
                  <Image
                    src="/tilahun4.jpg"
                    alt="Tilahun 4"
                    width={64}
                    height={64}
                    className="rounded-full border-2 border-white shadow-lg relative z-10"
                  />
                </div>
              </motion.div>
              
              {/* Profile image with proper positioning */}
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="relative">
                  {/* Optimized Sun Rays Container */}
                  <div className="absolute inset-0 animate-sun-rays pointer-events-none">
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={i}
                        className="sun-ray"
                        style={{
                          transform: `rotate(${i * 30}deg)`,
                          '--i': i
                        } as React.CSSProperties}
                      />
                    ))}
                  </div>
                  <Image
                    src="/tilea.jpg"
                    alt="Profile"
                    width={800}
                    height={800}
                    className="w-full h-full object-contain object-center relative z-10 rounded-full"
                    priority
                  />
                </div>
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
          @keyframes sun-rays {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
          .animate-sun-rays {
            animation: sun-rays 30s linear infinite;
            position: absolute;
            inset: -100px;
            z-index: 1;
            will-change: transform;
            pointer-events: none;
          }
          .sun-ray {
            position: absolute;
            left: 50%;
            top: 50%;
            width: 2px;
            height: 100px;
            background: linear-gradient(to top,
              transparent 0%,
              rgba(255, 215, 0, 0.2) 20%,
              rgba(255, 215, 0, 0.4) 40%,
              rgba(255, 165, 0, 0.6) 60%,
              rgba(255, 165, 0, 0.8) 80%,
              rgba(255, 165, 0, 1) 100%
            );
            transform-origin: bottom center;
            filter: blur(1px);
            animation: ray-pulse 3s ease-in-out infinite;
            animation-delay: calc(var(--i) * 0.2s);
            will-change: transform, height, opacity;
            pointer-events: none;
          }
          @keyframes ray-pulse {
            0%, 100% {
              height: 100px;
              opacity: 0.7;
            }
            50% {
              height: 150px;
              opacity: 1;
            }
          }
          /* Optimized glow effect */
          .relative::before {
            content: '';
            position: absolute;
            inset: -20px;
            background: radial-gradient(
              circle at center,
              rgba(255, 215, 0, 0.3) 0%,
              rgba(255, 165, 0, 0.2) 30%,
              transparent 70%
            );
            border-radius: 50%;
            z-index: 0;
            animation: glow-pulse 4s ease-in-out infinite;
            will-change: transform, opacity;
            pointer-events: none;
          }
          @keyframes glow-pulse {
            0%, 100% {
              opacity: 0.5;
              transform: scale(1);
            }
            50% {
              opacity: 0.8;
              transform: scale(1.1);
            }
          }
        `}</style>
      </section>

      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center">My Skills</h2>
          <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto text-sm sm:text-base">
            A comprehensive showcase of my technical expertise and professional capabilities. 
            From front-end to back-end development, I&apos;ve mastered a diverse range of technologies 
            that enable me to build robust and scalable applications.
          </p>
          <Skills />
        </div>
      </section>

      <section id="projects" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center">Featured Projects</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto text-sm sm:text-base">
            A curated collection of my most impactful work, showcasing my journey in creating innovative solutions. 
            Each project represents my passion for building meaningful applications that solve real-world problems 
            and make a difference in people&apos;s lives.
          </p>
          <div className="relative max-w-4xl mx-auto">
            {/* Navigation Buttons */}
            <button
              onClick={() => {
                if (activeProjectIndex > 0) {
                  setActiveProjectIndex(activeProjectIndex - 1);
                }
              }}
              className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors ${
                activeProjectIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={activeProjectIndex === 0}
            >
              <FiChevronLeft size={24} className={activeProjectIndex === 0 ? 'text-gray-400' : 'text-primary'} />
            </button>
            
            <button
              onClick={() => {
                if (activeProjectIndex < projects.length - 1) {
                  setActiveProjectIndex(activeProjectIndex + 1);
                }
              }}
              className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors ${
                activeProjectIndex === projects.length - 1 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={activeProjectIndex === projects.length - 1}
            >
              <FiChevronRight size={24} className={activeProjectIndex === projects.length - 1 ? 'text-gray-400' : 'text-primary'} />
            </button>

            {/* Single Card Container */}
            <div 
              className="relative h-[600px]"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ 
                    opacity: activeProjectIndex === index ? 1 : 0,
                    x: activeProjectIndex === index ? 0 : (index < activeProjectIndex ? -100 : 100),
                    scale: activeProjectIndex === index ? 1 : 0.9,
                    transition: { duration: 0.5 }
                  }}
                  className={`absolute inset-0 ${
                    activeProjectIndex === index ? 'z-10' : 'z-0'
                  }`}
                >
                  <ProjectCard 
                    project={project} 
                    index={index} 
                    isActive={index === activeProjectIndex}
                  />
                </motion.div>
              ))}
            </div>

            {/* Progress Indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveProjectIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    activeProjectIndex === index ? 'bg-[rgb(var(--color-primary))]' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-16 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center">What People Say</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto text-sm sm:text-base">
            Words of encouragement and feedback from colleagues, mentors, and clients who have witnessed my 
            growth and dedication firsthand. Their trust and support continue to inspire me to push boundaries 
            and deliver excellence in everything I do.
          </p>
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

      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center">Get In Touch</h2>
          <div className="max-w-md mx-auto bg-white p-6 sm:p-8 rounded-lg shadow-lg">
            <p className="mb-6 text-center text-sm sm:text-base">
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
    </div>
  );
};

export default Home;