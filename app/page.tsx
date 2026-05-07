// app/page.tsx
'use client';
import AnimatedText from '../components/AnimatedText';
import HireMeButton from '../components/HireMeButton';
import { motion } from 'framer-motion';
import CertificateModal from '../components/CertificateModal';
import DownloadCV from '../components/DownloadCV';
import Image from 'next/image';
import { FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';
import { useState, useEffect, useRef } from 'react';
import TopNavigation from '../components/TopNavigation';
import ScrollToTop from '../components/ScrollToTop';
import dynamic from 'next/dynamic';

// Lazy-loaded components (reduce initial JS bundle)
const Skills = dynamic(() => import('../components/Skills'), { ssr: false });
const FeaturedProjects = dynamic(() => import('../components/FeaturedProjects'), { ssr: false });
const Blog = dynamic(() => import('../components/Blog'), { ssr: false });
const AnimatedTestimonials = dynamic(
  () => import('../components/ui/animated-testimonials').then(m => ({ default: m.AnimatedTestimonials })),
  { ssr: false }
);

const Home = () => {
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
  const [typingText, setTypingText] = useState('Software Engineer');
  const [activeToyId, setActiveToyId] = useState<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const toyOrbiters = [
    { id: 1, label: 'Robot developer one', pos: '-top-20 left-2', delay: 0 },
    { id: 2, label: 'Robot developer two', pos: '-right-20 top-8', delay: 0.3 },
    { id: 3, label: 'Robot developer three', pos: '-bottom-20 right-4', delay: 0.6 },
    { id: 4, label: 'Robot developer four', pos: '-left-20 bottom-8', delay: 0.9 },
  ];

  const playKeyboardTap = () => {
    if (typeof window === 'undefined') return;
    const AudioCtx = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const audioCtx = audioCtxRef.current ?? new AudioCtx();
    audioCtxRef.current = audioCtx;
    void audioCtx.resume();
    const now = audioCtx.currentTime;

    // Soft "shush + key tick" mix for a smoother typing texture.
    const hush = audioCtx.createOscillator();
    const hushGain = audioCtx.createGain();
    const hushFilter = audioCtx.createBiquadFilter();
    hush.type = 'triangle';
    hush.frequency.setValueAtTime(220, now);
    hushFilter.type = 'lowpass';
    hushFilter.frequency.setValueAtTime(780, now);
    hushGain.gain.setValueAtTime(0.0001, now);
    hushGain.gain.linearRampToValueAtTime(0.012, now + 0.015);
    hushGain.gain.linearRampToValueAtTime(0.0001, now + 0.12);
    hush.connect(hushFilter).connect(hushGain).connect(audioCtx.destination);
    hush.start(now);
    hush.stop(now + 0.14);

    const keyTick = audioCtx.createOscillator();
    const keyTickGain = audioCtx.createGain();
    keyTick.type = 'square';
    keyTick.frequency.setValueAtTime(950, now + 0.03);
    keyTickGain.gain.setValueAtTime(0.0001, now + 0.028);
    keyTickGain.gain.exponentialRampToValueAtTime(0.02, now + 0.034);
    keyTickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);
    keyTick.connect(keyTickGain).connect(audioCtx.destination);
    keyTick.start(now + 0.028);
    keyTick.stop(now + 0.08);

  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTypingText((prev) => (prev === 'Software Engineer' ? 'Tech Enthusiast' : 'Software Engineer'));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (activeToyId === null) return;
    const typingLoop = setInterval(() => {
      playKeyboardTap();
    }, 210);
    return () => clearInterval(typingLoop);
  }, [activeToyId]);

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        void audioCtxRef.current.close();
      }
    };
  }, []);


  return (
    <div className="overflow-x-hidden w-full">
      <TopNavigation
        isCertificateModalOpen={isCertificateModalOpen}
        setIsCertificateModalOpen={setIsCertificateModalOpen}
      />
      <HireMeButton />
      <ScrollToTop />

      <section id="home" className="min-h-screen flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
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
                 
                </div>
              </motion.div>

              {/* Profile image with proper positioning */}
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80">
                  {toyOrbiters.map((toy) => (
                    <motion.button
                      key={toy.id}
                      type="button"
                      aria-label={`${toy.label} tapping keyboard`}
                      className={`absolute ${toy.pos} z-40 w-28 h-24 sm:w-32 sm:h-28 rounded-2xl border border-white/40 bg-slate-900/70 backdrop-blur-md flex items-center justify-center shadow-xl`}
                      animate={{ y: [0, -8, 0], rotate: [0, 8, -8, 0] }}
                      transition={{
                        duration: 2.8,
                        repeat: Infinity,
                        delay: toy.delay,
                        ease: 'easeInOut',
                      }}
                      whileHover={{ scale: 1.12 }}
                      whileFocus={{ scale: 1.12 }}
                      onMouseEnter={() => setActiveToyId(toy.id)}
                      onFocus={() => setActiveToyId(toy.id)}
                      onMouseLeave={() => setActiveToyId((current) => (current === toy.id ? null : current))}
                      onBlur={() => setActiveToyId((current) => (current === toy.id ? null : current))}
                    >
                      <div className="relative w-24 h-20 sm:w-28 sm:h-24">
                        <div className="absolute right-0 top-7 w-4 h-9 rounded-sm bg-slate-600/90 border border-slate-500" />
                        <div className="absolute right-2 top-14 w-2 h-5 rounded-sm bg-slate-600/90" />
                        <div className="absolute left-3 top-11 w-12 h-3 rounded bg-slate-700 border border-slate-500" />
                        <div className="absolute left-7 top-7 w-6 h-5 rounded-md bg-slate-700 border border-slate-500" />
                        <motion.div
                          className="absolute left-7 top-2 w-8 h-8"
                          animate={{ rotate: [8, 14, 8], y: [0, 1, 0] }}
                          transition={{ duration: 0.35, repeat: Infinity, delay: toy.delay }}
                        >
                          <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-slate-200 border-2 border-slate-700">
                            <div className="absolute left-2 top-2 w-1 h-1 rounded-full bg-cyan-500" />
                            <div className="absolute right-2 top-2 w-1 h-1 rounded-full bg-cyan-500" />
                            <div className="absolute left-1/2 -translate-x-1/2 bottom-2 w-3 h-1 rounded-full bg-slate-700" />
                          </div>
                        </motion.div>
                        <div className="absolute left-11 top-9 w-10 h-6 rounded bg-slate-800 border border-slate-500" />
                        <div className="absolute left-5 top-[38px] w-12 h-3 rounded-sm bg-slate-800 border border-slate-600" />
                        <motion.div
                          className="absolute left-8 top-[38px] w-4 h-1.5 rounded-full bg-cyan-300"
                          animate={{ y: [0, 1.6, 0], rotate: [22, 6, 22] }}
                          transition={{ duration: 0.22, repeat: Infinity, delay: toy.delay }}
                        />
                        <motion.div
                          className="absolute left-14 top-[38px] w-4 h-1.5 rounded-full bg-cyan-300"
                          animate={{ y: [0, 1.6, 0], rotate: [-18, -2, -18] }}
                          transition={{ duration: 0.22, repeat: Infinity, delay: toy.delay + 0.08 }}
                        />
                        <div className="absolute right-2 top-3 w-12 h-8">
                          <svg viewBox="0 0 120 80" className="w-full h-full">
                            <rect x="16" y="6" width="88" height="50" rx="5" className="fill-slate-900 stroke-slate-500" strokeWidth="3" />
                            <rect x="22" y="12" width="76" height="34" rx="3" className="fill-cyan-500/20" />
                            <motion.rect
                              x="26"
                              y="17"
                              width="50"
                              height="4"
                              rx="2"
                              className="fill-cyan-300"
                              animate={{ opacity: [0.3, 1, 0.3], width: [44, 58, 44] }}
                              transition={{ duration: 1.2, repeat: Infinity, delay: toy.delay }}
                            />
                            <motion.rect
                              x="26"
                              y="24"
                              width="62"
                              height="4"
                              rx="2"
                              className="fill-blue-300"
                              animate={{ opacity: [0.25, 0.9, 0.25], width: [56, 66, 56] }}
                              transition={{ duration: 1.4, repeat: Infinity, delay: toy.delay + 0.2 }}
                            />
                            <motion.rect
                              x="26"
                              y="31"
                              width="40"
                              height="4"
                              rx="2"
                              className="fill-emerald-300"
                              animate={{ opacity: [0.25, 0.9, 0.25], width: [34, 48, 34] }}
                              transition={{ duration: 1.1, repeat: Infinity, delay: toy.delay + 0.4 }}
                            />
                            <rect x="8" y="58" width="104" height="12" rx="4" className="fill-slate-700 stroke-slate-500" strokeWidth="2" />
                            {[...Array(10)].map((_, i) => (
                              <rect
                                key={i}
                                x={12 + i * 10}
                                y="62"
                                width="7"
                                height="5"
                                rx="1"
                                className={activeToyId === toy.id && i % 2 === 0 ? 'fill-cyan-300' : 'fill-slate-500'}
                              />
                            ))}
                          </svg>
                        </div>
                        <motion.div
                          className="absolute -top-2 -left-1 px-1.5 py-0.5 rounded bg-cyan-500/30 border border-cyan-300/50 text-[8px] font-semibold tracking-wide text-cyan-100"
                          animate={{ opacity: [0.6, 1, 0.6] }}
                          transition={{ duration: 1.6, repeat: Infinity }}
                        >
                          AGENTIC AI
                        </motion.div>
                      </div>
                    </motion.button>
                  ))}
                  <div className="relative w-full h-full rounded-full overflow-hidden ring-4 ring-white/40">
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
                    className="w-full h-full object-cover object-[center_top] relative z-10 rounded-full scale-105"
                    priority
                  />
                  </div>
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

      <section id="skills" className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center">My Skills</h2>
          <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto text-sm sm:text-base">
            A comprehensive showcase of my technical expertise and professional capabilities.
            From front-end to back-end development, I&apos;ve mastered a diverse range of technologies
            that enable me to build robust and scalable applications.
          </p>
          <Skills
            isCertificateModalOpen={isCertificateModalOpen}
            setIsCertificateModalOpen={setIsCertificateModalOpen}
          />
        </div>
      </section>

      <FeaturedProjects autoSlideInterval={5000} />

      <section id="testimonials" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-[rgb(var(--color-foreground))]">What People Say</h2>
          <p className="text-[rgb(var(--color-muted))] text-center mb-12 max-w-2xl mx-auto text-sm sm:text-base">
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

      {/* Blog Section */}
      <Blog />

      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-[rgb(var(--color-foreground))]">Get In Touch</h2>
          <div className="max-w-md mx-auto card card-hover p-6 sm:p-8">
            <p className="mb-6 text-center text-[rgb(var(--color-muted))] text-sm sm:text-base">
              Have a project in mind or want to discuss potential opportunities?
              Love to hear from you!
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="https://github.com/tilahungoito"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 text-[rgb(var(--color-foreground))] hover:text-[rgb(var(--color-primary))] transition-colors"
              >
                <FiGithub size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/tilahun-goitom-559401302/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 text-[rgb(var(--color-foreground))] hover:text-[rgb(var(--color-primary))] transition-colors"
              >
                <FiLinkedin size={24} />
              </a>
              <a
                href="https://x.com/TilahunGo1921"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 text-[rgb(var(--color-foreground))] hover:text-[rgb(var(--color-primary))] transition-colors"
              >
                <FiTwitter size={24} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <CertificateModal
        isOpen={isCertificateModalOpen}
        onClose={() => setIsCertificateModalOpen(false)}
      />
    </div>
  );
};

export default Home;