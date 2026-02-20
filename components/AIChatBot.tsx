'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaPaperPlane, FaBrain } from 'react-icons/fa';
import { FiZap } from 'react-icons/fi';

interface Message {
    id: string;
    text: string;
    sender: 'ai' | 'user';
    timestamp: Date;
}

// Updated suggestions — now includes all projects
const suggestions = [
    "Tell me about the Mining Licensing System...",
    "What is the Education EMIS platform?",
    "Ask me about my AI Health Assistant...",
    "What are my Flutter & mobile skills?",
    "How can I help your government project?",
    "Show me your GitHub and LinkedIn...",
    "What is the GIS dashboard you built?",
];

// Orbiting particle positions
const PARTICLES = [0, 60, 120, 180, 240, 300];

export default function AIChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "Hello! I'm Tilahun's AI Assistant. I know about all his projects — from the National Mining Licensing System to the Education EMIS platform. Ask me anything!",
            sender: 'ai',
            timestamp: new Date(),
        },
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatRef = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // Animated Placeholder Logic
    const [placeholder, setPlaceholder] = useState('');
    const [suggestionIndex, setSuggestionIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    // Click outside handler
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (isOpen && chatRef.current && !chatRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    useEffect(() => {
        if (isFocused) {
            setPlaceholder('Type your message...');
            return;
        }

        const currentSuggestion = suggestions[suggestionIndex];
        const typingSpeed = isDeleting ? 35 : 70;

        const timeout = setTimeout(() => {
            if (!isDeleting && charIndex < currentSuggestion.length) {
                setPlaceholder(currentSuggestion.substring(0, charIndex + 1));
                setCharIndex(prev => prev + 1);
            } else if (isDeleting && charIndex > 0) {
                setPlaceholder(currentSuggestion.substring(0, charIndex - 1));
                setCharIndex(prev => prev - 1);
            } else if (!isDeleting && charIndex === currentSuggestion.length) {
                setTimeout(() => setIsDeleting(true), 2000);
            } else if (isDeleting && charIndex === 0) {
                setIsDeleting(false);
                setSuggestionIndex(prev => (prev + 1) % suggestions.length);
            }
        }, typingSpeed);

        return () => clearTimeout(timeout);
    }, [charIndex, isDeleting, suggestionIndex, isFocused]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = async () => {
        if (!inputValue.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: inputValue,
            sender: 'user',
            timestamp: new Date(),
        };

        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInputValue('');
        setIsTyping(true);

        const controller = new AbortController();
        const timeoutId = setTimeout(() => {
            try { controller.abort(); } catch { /* ignore */ }
        }, 10000);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: newMessages }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) throw new Error('API_UNAVAILABLE');

            const data = await response.json();
            if (data.error) throw new Error(data.error);

            addMessageWithTypewriter(data.text);
        } catch (error: unknown) {
            clearTimeout(timeoutId);
            if (error instanceof Error && error.name === 'AbortError') {
                console.warn('[AI Bot] Request timed out. Falling back to local brain.');
            } else {
                console.error('Chat API Error:', error);
            }
            setTimeout(() => {
                const responseText = generateResponse(inputValue);
                addMessageWithTypewriter(responseText);
            }, 500);
        }
    };

    // Typewriter effect for AI responses
    const addMessageWithTypewriter = (fullText: string) => {
        const id = (Date.now() + 1).toString();
        const aiMessage: Message = {
            id,
            text: '',
            sender: 'ai',
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, aiMessage]);
        setIsTyping(false);

        let currentText = '';
        let i = 0;
        const interval = setInterval(() => {
            if (i < fullText.length) {
                currentText += fullText[i];
                setMessages(prev => prev.map(m => m.id === id ? { ...m, text: currentText } : m));
                i++;
            } else {
                clearInterval(interval);
            }
        }, 10);
    };

    // Enhanced local fallback — now knows about all 9 projects
    const generateResponse = (query: string): string => {
        const q = query.toLowerCase();

        if (q.includes('who is') || q.includes('who are you') || q.includes('about you') || q.includes('identity')) {
            return `### Tilahun's AI Representative\nI represent Tilahun Goitom, a **Full Stack Software Engineer** with 5+ years of experience.\n\n**Quick Facts:**\n- 🎓 BSc Software Engineering, Mekelle University\n- 🏛️ Cisco Networking Certified\n- 📱 Flutter/Web Expert\n- 🏗️ Built platforms for the **Ministry of Mines** & **Tigray Education Bureau**`;
        }

        // Mining / GIS / License
        if (q.includes('mining') || q.includes('license') || q.includes('min') || q.includes('gis') || q.includes('mineral') || q.includes('ministry of mine')) {
            return `### National Mining Licensing & Governance System\nBuilt for the **Ethiopian Ministry of Mines** — a production-grade multi-tenant platform:\n\n- **🗺️ GIS Integration**: 6-step wizard with interactive map plot selection\n- **🔐 RBAC Workflow**: Applicant → Reviewer → Approver → Admin roles\n- **📋 Audit Trail**: Immutable compliance records\n- **📊 Analytics Dashboard**: Nationwide mineral deposit distribution maps\n- **Tech**: Next.js, NestJS, PostgreSQL, Prisma, Docker`;
        }

        // Education / EMIS / Tigray
        if (q.includes('education') || q.includes('emis') || q.includes('tigray') || q.includes('school') || q.includes('enrollment') || q.includes('student') || q.includes('teacher')) {
            return `### Centralized Education EMIS Platform\nBuilt for the **Tigray Regional Education Bureau** — a nationwide EMIS:\n\n- **🏛️ 5-Tier Hierarchy**: Region → Zone → Woreda → Institution → School\n- **👩‍🎓 Student Management**: Enrollment + transfer workflows\n- **👨‍🏫 HR Management**: Teacher records & academic scheduling\n- **📢 Announcements**: Broadcast system across all tiers\n- **📊 Analytics**: Cross-institution reporting dashboards\n- **Tech**: Next.js, NestJS, PostgreSQL, TypeScript, Docker`;
        }

        // Health AI
        if (q.includes('health') || q.includes('malaria') || q.includes('pneumonia') || q.includes('doctor') || q.includes('clinical')) {
            return `### AI Health Assistant\nA dual-platform system (Web & Mobile):\n\n- **🔬 AI Detection**: Malaria & Pneumonia from medical images\n- **👨‍⚕️ Doctor AI**: Clinical Decision Support consultations\n- **📱 Mobile**: Full Flutter app\n- **Tech**: Next.js, Flask, TensorFlow, Flutter`;
        }

        // Insurance
        if (q.includes('insurance') || q.includes('eic') || q.includes('policy') || q.includes('claim')) {
            return `### Role Based Insurance System\nBuilt for the **Ethiopian Insurance Corporation (EIC)**:\n\n- **📄 Policy Administration**: Automated underwriting\n- **💳 Claims Processing**: Digital workflow\n- **🔐 RBAC**: Multi-role access control\n- **Tech**: NestJS, TypeORM, PostgreSQL, Docker, Next.js`;
        }

        // Hospital
        if (q.includes('hospital') || q.includes('shire') || q.includes('appointment') || q.includes('patient')) {
            return `### Shire Referral Hospital System\nAutomated appointment scheduling for **Shire Referral Hospital**:\n\n- **📅 Appointments**: Doctor scheduling & patient records\n- **🏥 Workflows**: Administrative automation\n- **Tech**: PHP, XAMPP, Bootstrap, JavaScript`;
        }

        // Contact / Hire
        if (q.includes('contact') || q.includes('hire') || q.includes('reach') || q.includes('email') || q.includes('linkedin') || q.includes('github') || q.includes('link')) {
            return `### Get In Touch\n- **LinkedIn**: [View Profile](https://www.linkedin.com/in/tilahun-goitom-559401302/)\n- **GitHub**: [Browse Code](https://github.com/tilahungoito)\n- **Twitter/X**: [@TilahunGo1921](https://x.com/TilahunGo1921)\n- **Email**: tilay1921@gmail.com`;
        }

        // Collaboration
        const collabKeywords = ['collaborat', 'partner', 'team', 'group', 'with who', 'with whom'];
        if (collabKeywords.some(kw => q.includes(kw))) {
            return `### Collaboration History\nKey collaborations include:\n\n- **Ministry of Mines**: National Mining Licensing platform\n- **Tigray Education Bureau**: Nationwide EMIS platform\n- **EIC**: Insurance management system\n- **5th-Year SE Group**: AI Health Assistant\n- **Mekelle University**: Research network platform`;
        }

        // Skills / Stack
        if (q.includes('skill') || q.includes('technologies') || q.includes('stack') || q.includes('tech')) {
            return `### Technical Stack\n- **Frontend**: Next.js, React, Tailwind CSS, Flutter\n- **Backend**: Node.js, NestJS, Flask, PHP\n- **Databases**: PostgreSQL, MongoDB, MySQL\n- **AI/ML**: TensorFlow, Keras, XGBoost, Python\n- **DevOps**: Docker, Prisma, Nginx\n- **GIS**: Leaflet, map integration`;
        }

        // Mobile
        if (q.includes('mobile') || q.includes('flutter') || q.includes('dart') || q.includes('ios') || q.includes('android')) {
            return `### Mobile Expertise\nExpert in **Cross-Platform Mobile Development**:\n\n- 📱 Flutter & Dart (iOS + Android)\n- 🔄 Multi-platform sync with web backends\n- 🎨 Material & Cupertino UI\n- ✅ Used in: AI Health Assistant dual-platform app`;
        }

        // Farmer
        if (q.includes('farmer') || q.includes('farm') || q.includes('agricultur')) {
            return `### Technology & Agriculture\nMy expertise can directly help farmers:\n\n- **Disease Prediction**: AI models adaptable for crop health monitoring\n- **Management Systems**: Yield tracking & supply chain tools\n- **GIS Mapping**: Land plot analysis (already built for mining!)`;
        }

        // Greetings
        if (q.includes('hi') || q.includes('hello') || q.includes('hey') || q.includes('sup')) {
            return `### Hello! 👋\nI'm ready to help! Ask me about:\n- **Mining Licensing System** (Python, GIS)\n- **Education EMIS** (5-tier hierarchy)\n- **AI Health Assistant** (Malaria/Pneumonia)\n- **Mobile Apps** (Flutter)`;
        }

        // Projects list
        if (q.includes('project') || q.includes('portfolio') || q.includes('work') || q.includes('built')) {
            return `### My Projects (9 total)\n1. 🏗️ **National Mining Licensing System** — Ministry of Mines\n2. 🎓 **Education EMIS Platform** — Tigray Education Bureau\n3. 🤖 **AI Health Assistant** — Malaria & Pneumonia\n4. 🏥 **Insurance System** — EIC\n5. 🏨 **Hospital Management** — Shire Referral\n6. 🔬 **Disease Predictor** — ML/XGBoost\n7. 🛒 **E-commerce Platform** — Peer Courses\n8. 🛍️ **Product Hub Marketplace**\n9. 🎓 **MU Research Network**`;
        }

        return `### Let Me Help!\nI can tell you about:\n- **Mining & GIS** projects\n- **Education EMIS** platform\n- **AI & Health** applications\n- How to **hire Tilahun**\n\nJust ask!`;
    };

    // Format response with sections and bolding
    const formatResponse = (text: string) => {
        return text.split('\n').map((line, i) => {
            if (line.startsWith('### ')) {
                return <h4 key={i} className="text-lg font-bold text-white mt-2 mb-1 border-b border-white/10 pb-1">{line.replace('### ', '')}</h4>;
            }
            if (line.startsWith('- ')) {
                return <li key={i} className="ml-4 mb-1 list-disc text-white/90">{parseBold(line.substring(2))}</li>;
            }
            if (/\d+\.\s/.test(line)) {
                return <li key={i} className="ml-4 mb-1 list-decimal text-white/90">{parseBold(line.replace(/^\d+\.\s/, ''))}</li>;
            }
            const linkRegex = /\[(.*?)\]\((.*?)\)/g;
            if (linkRegex.test(line)) {
                const parts = line.split(/\[(.*?)\]\((.*?)\)/g);
                return <p key={i} className="mb-2 text-white/90 leading-relaxed">{parts.map((part, idx) => {
                    if (idx % 3 === 1) return <a key={idx} href={parts[idx + 1]} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{part}</a>;
                    if (idx % 3 === 2) return null;
                    return parseBold(part);
                })}</p>;
            }
            return <p key={i} className="mb-2 text-white/90 leading-relaxed">{parseBold(line)}</p>;
        });
    };

    const parseBold = (text: string) => {
        const parts = text.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={i} className="text-blue-300">{part.substring(2, part.length - 2)}</strong>;
            }
            return part;
        });
    };

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center pointer-events-none">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        ref={chatRef}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="w-[390px] max-h-[580px] bg-slate-900/95 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl flex flex-col overflow-hidden mb-4 pointer-events-auto"
                        style={{ boxShadow: '0 20px 60px -12px rgba(0,0,0,0.6), 0 0 40px rgba(59,130,246,0.15)' }}
                    >
                        {/* Header */}
                        <div className="p-4 bg-gradient-to-r from-blue-600/30 via-purple-600/20 to-blue-600/10 border-b border-white/10 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                {/* Animated AI Icon in header */}
                                <div className="relative w-10 h-10">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                                        className="absolute inset-0 rounded-full border border-blue-500/30 border-dashed"
                                    />
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600/40 to-purple-600/40 flex items-center justify-center border border-blue-500/40">
                                        <FaBrain className="text-blue-300 text-lg" />
                                    </div>
                                    <motion.div
                                        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border border-slate-900"
                                    />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-sm tracking-wide">Tilahun&apos;s AI</h3>
                                    <div className="flex items-center gap-1.5">
                                        <motion.div
                                            animate={{ opacity: [0.4, 1, 0.4] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                            className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_8px_rgba(34,197,94,0.8)]"
                                        />
                                        <span className="text-[10px] text-green-400 uppercase tracking-widest font-semibold">Online · All Projects</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors group"
                            >
                                <FaTimes className="text-white/50 group-hover:text-white" />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.1) transparent' }}>
                            {messages.map((message) => (
                                <motion.div
                                    initial={{ opacity: 0, x: message.sender === 'user' ? 10 : -10, y: 5 }}
                                    animate={{ opacity: 1, x: 0, y: 0 }}
                                    key={message.id}
                                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[85%] p-3.5 rounded-2xl shadow-sm text-sm ${message.sender === 'user'
                                            ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-tr-none'
                                            : 'bg-white/8 text-white border border-white/10 rounded-tl-none'
                                            }`}
                                    >
                                        {message.sender === 'ai' ? (
                                            <div className="response-content">{formatResponse(message.text)}</div>
                                        ) : (
                                            message.text
                                        )}
                                        <div className={`text-[9px] mt-1.5 opacity-40 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                                            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white/8 p-3 rounded-2xl rounded-tl-none border border-white/10">
                                        <div className="flex gap-1 items-center">
                                            <FaBrain className="text-blue-400/50 text-xs mr-1" />
                                            {[0, 1, 2].map((i) => (
                                                <motion.div
                                                    key={i}
                                                    animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
                                                    transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.18 }}
                                                    className="w-1.5 h-1.5 bg-blue-400 rounded-full"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white/5 border-t border-white/10">
                            <div className="flex gap-2 bg-slate-800/60 rounded-xl p-2 border border-white/10 focus-within:border-blue-500/50 transition-all shadow-inner">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => setIsFocused(false)}
                                    placeholder={placeholder}
                                    className="flex-1 bg-transparent border-none outline-none text-white text-sm px-2 placeholder:text-white/20 transition-all"
                                />
                                <motion.button
                                    onClick={handleSend}
                                    disabled={!inputValue.trim()}
                                    whileTap={{ scale: 0.9 }}
                                    className="p-2.5 bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:opacity-40 text-white rounded-lg transition-all shadow-lg shadow-blue-600/20 disabled:cursor-not-allowed"
                                >
                                    <FaPaperPlane />
                                </motion.button>
                            </div>
                            <p className="text-[9px] text-white/25 mt-2 text-center tracking-wide flex items-center justify-center gap-1">
                                <FiZap size={8} /> Context-Aware · Knows all 9 projects
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ─── Animated AI Orb Button ─── */}
            {!isOpen && (
                <motion.div
                    className="relative pointer-events-auto"
                    onHoverStart={() => setIsHovered(true)}
                    onHoverEnd={() => setIsHovered(false)}
                >
                    {/* Outer pulsing glow rings */}
                    <motion.div
                        animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute inset-0 rounded-full bg-blue-500/40 -z-10"
                        style={{ margin: '-8px' }}
                    />
                    <motion.div
                        animate={{ scale: [1, 1.6, 1], opacity: [0.15, 0, 0.15] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                        className="absolute inset-0 rounded-full bg-purple-500/30 -z-10"
                        style={{ margin: '-16px' }}
                    />

                    {/* Orbiting particles */}
                    <div className="absolute inset-0 pointer-events-none" style={{ margin: '-20px' }}>
                        {PARTICLES.map((deg, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-1.5 h-1.5 rounded-full"
                                style={{
                                    background: i % 2 === 0 ? '#60a5fa' : '#a78bfa',
                                    boxShadow: i % 2 === 0 ? '0 0 6px #60a5fa' : '0 0 6px #a78bfa',
                                    top: '50%',
                                    left: '50%',
                                    marginTop: '-3px',
                                    marginLeft: '-3px',
                                }}
                                animate={{
                                    x: Math.cos((deg * Math.PI) / 180) * 32,
                                    y: Math.sin((deg * Math.PI) / 180) * 32,
                                    rotate: [0, 360],
                                }}
                                transition={{
                                    x: { duration: 3, repeat: Infinity, ease: 'linear', delay: i * 0.5 },
                                    y: { duration: 3, repeat: Infinity, ease: 'linear', delay: i * 0.5 },
                                    rotate: { duration: 3, repeat: Infinity, ease: 'linear', delay: i * 0.5 },
                                }}
                            />
                        ))}
                    </div>

                    {/* "Ask AI" hover label */}
                    <AnimatePresence>
                        {isHovered && (
                            <motion.div
                                initial={{ opacity: 0, y: 8, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 8, scale: 0.9 }}
                                className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900/95 text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-blue-500/40 whitespace-nowrap shadow-xl"
                                style={{ boxShadow: '0 0 20px rgba(59,130,246,0.3)' }}
                            >
                                ✨ Ask AI
                                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900/95" />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Main button */}
                    <motion.button
                        drag
                        dragConstraints={{ left: -300, right: 300, top: -500, bottom: 20 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.92 }}
                        onClick={() => setIsOpen(true)}
                        className="relative w-14 h-14 rounded-full overflow-hidden touch-none"
                        style={{
                            background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
                            boxShadow: '0 0 20px rgba(59,130,246,0.5), 0 0 40px rgba(124,58,237,0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
                        }}
                    >
                        {/* Shimmer sweep */}
                        <motion.div
                            animate={{ x: ['-100%', '200%'] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none"
                        />
                        {/* Neural grid pattern */}
                        <div className="absolute inset-0 opacity-10"
                            style={{
                                backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                                backgroundSize: '8px 8px',
                            }}
                        />
                        {/* Icon */}
                        <div className="relative z-10 flex items-center justify-center w-full h-full">
                            <motion.div
                                animate={{ rotate: [0, 5, -5, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                            >
                                <FaBrain className="text-white text-2xl drop-shadow-lg" />
                            </motion.div>
                        </div>
                    </motion.button>
                </motion.div>
            )}
        </div>
    );
}
