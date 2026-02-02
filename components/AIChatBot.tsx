'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaTimes, FaPaperPlane, FaCommentDots } from 'react-icons/fa';
import { projects } from '@/data/projects';

interface Message {
    id: string;
    text: string;
    sender: 'ai' | 'user';
    timestamp: Date;
}

export default function AIChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "Hello! I'm Tilahun's AI Assistant. Ask me about his projects, skills, or even how he can help a farmer!",
            sender: 'ai',
            timestamp: new Date(),
        },
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatRef = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState(false);

    // Animated Placeholder Logic
    const suggestions = [
        "Ask me about my AI Health Assistant...",
        "What are my Flutter skills?",
        "Tell me about my software engineering degree...",
        "How can I help a farmer?",
        "Show me your GitHub and LinkedIn..."
    ];
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
        const typingSpeed = isDeleting ? 40 : 80;

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
            try {
                controller.abort();
            } catch (e) {
                // Ignore abort errors
            }
        }, 10000); // 10s timeout for better tolerance

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

            // Handle AbortError specifically to avoid "signal is aborted without reason"
            if (error instanceof Error && error.name === 'AbortError') {
                console.warn('[AI Bot] Request timed out. Falling back to local brain.');
            } else {
                console.error('Chat API Error:', error);
            }

            // Fallback immediately to local knowledge
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
        }, 10); // Super fast typing speed for smooth feel
    };

    // Robust local fallback reasoning
    const generateResponse = (query: string): string => {
        const q = query.toLowerCase();

        // Specific Intent: Who are you / Identity
        if (q.includes('who is') || q.includes('who are you') || q.includes('about you') || q.includes('identity')) {
            return `### Tilahun's AI Representative\nI represent Tilahun Goitom, a **Full Stack Software Engineer** with over 5 years of experience. \n\n**Quick Facts:**\n- 🎓 BSc in Software Engineering\n- 🏛️ Mekelle University Alumnus\n- 💻 Cisco Networking Certified\n- 📱 Flutter/Web Expert`;
        }

        // Specific Intent: Collaborations & Teams
        const collabKeywords = ['collaborat', 'colabrat', 'partner', 'team', 'group', 'with who', 'with whom'];
        if (collabKeywords.some(kw => q.includes(kw)) || ((q.includes('who') || q.includes('whom')) && q.includes('work'))) {
            return `### Collaboration History\nI value team synergy! Significant highlights include:\n\n- **AI Health Assistant**: Developed with a group of 5th-year Software Engineering students.\n- **Enterprise Projects**: Collaborated with the Ethiopian Insurance Corporation (EIC).\n- **Academic Research**: Partnership with Mekelle University researchers.`;
        }

        // Specific Intent: Contact and Social Links
        if (q.includes('contact') || q.includes('hire') || q.includes('reach') || q.includes('email') || q.includes('linkedin') || q.includes('github') || q.includes('link')) {
            return `### Get In Touch\n- **LinkedIn**: [View Profile](https://www.linkedin.com/in/tilahun-goitom-559401302/)\n- **GitHub**: [Browse Code](https://github.com/tilahungoito)\n- **Email**: tilay1921@gmail.com`;
        }

        // Specific Intent: Farmer / Agriculture (Special request from user)
        if (q.includes('farmer') || q.includes('farm') || q.includes('agricultur')) {
            return `### Technology & Agriculture\nWhile I specialise in software, my skills can help a farmer through **Smart Solutions**:\n\n- **Disease Prediction**: My AI models for healthcare can be adapted to monitor crop health.\n- **Management Systems**: Building tools for yield tracking and supply chain management.`;
        }

        // Specific Intent: Mobile Development / Flutter
        if (q.includes('mobile') || q.includes('flutter') || q.includes('dart') || q.includes('ios') || q.includes('android')) {
            return `### Mobile Expertise\nI am an expert in **Cross-Platform Mobile Development** using Flutter and Dart.\n\n**Capabilities:**\n- 📱 Fluid iOS/Android Apps\n- 🔄 Multi-platform Sync\n- 🎨 Stunning Material/Cupertino UI`;
        }

        // Specific Intent: Projects
        if (q.includes('health') || q.includes('malaria') || q.includes('pneumonia') || q.includes('doctors')) {
            return `### AI Health Assistant\nA dual-platform system (Web & Mobile):\n\n- **AI Detection**: Malaria & Pneumonia from medical images.\n- **Support**: Clinical Decision Support for doctors.\n- **Tech**: Next.js, Flask, TensorFlow, Flutter.`;
        }

        if (q.includes('skill') || q.includes('technologies') || q.includes('stack')) {
            return `### Technical Stack\n- **Frontend**: Next.js, React, Tailwind CSS\n- **Backend**: Node.js, NestJS, Flask\n- **Mobile**: Flutter, Dart\n- **AI/ML**: Keras, TensorFlow, Python, XGBoost`;
        }

        if (q.includes('hi') || q.includes('hello') || q.includes('hey') || q.includes('sup')) {
            return `### Hello!\nI'm ready to help! Ask me about:\n- **Full Stack Development**\n- **Mobile (Flutter) Apps**\n- **AI/ML Projects**\n- **Collaborations**`;
        }

        return `### Local Knowledge Mode\nI'm processing that! In the meantime, I can tell you about:\n- Tilahun's **AI Projects**\n- His **Flutter Experience**\n- How to **Hire Him**`;
    };

    // Helper to format text with sections and bolding
    const formatResponse = (text: string) => {
        return text.split('\n').map((line, i) => {
            if (line.startsWith('### ')) {
                return <h4 key={i} className="text-lg font-bold text-white mt-2 mb-1 border-b border-white/10 pb-1">{line.replace('### ', '')}</h4>;
            }
            if (line.startsWith('- ')) {
                return <li key={i} className="ml-4 mb-1 list-disc text-white/90">{parseBold(line.substring(2))}</li>;
            }
            // Handle links
            const linkRegex = /\[(.*?)\]\((.*?)\)/g;
            if (linkRegex.test(line)) {
                const parts = line.split(linkRegex);
                return <p key={i} className="mb-2 text-white/90 leading-relaxed">{parts.map((part, idx) => {
                    if (idx % 3 === 1) { // Link text
                        return <a key={idx} href={parts[idx + 1]} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{part}</a>;
                    }
                    if (idx % 3 === 2) return null; // URL, already handled
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
                        className="w-[380px] h-[550px] bg-slate-900/95 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl flex flex-col overflow-hidden mb-4 pointer-events-auto"
                        style={{ boxShadow: '0 20px 50px -12px rgba(0,0,0,0.5)' }}
                    >
                        {/* Header */}
                        <div className="p-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-b border-white/10 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                                    <FaRobot className="text-blue-400 text-xl animate-pulse" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-sm tracking-wide">Tilahun&apos;s AI</h3>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                                        <span className="text-[10px] text-green-400 uppercase tracking-widest font-semibold">Online</span>
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
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth custom-scrollbar">
                            {messages.map((message) => (
                                <motion.div
                                    initial={{ opacity: 0, x: message.sender === 'user' ? 10 : -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    key={message.id}
                                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[85%] p-3.5 rounded-2xl shadow-sm text-sm ${message.sender === 'user'
                                            ? 'bg-blue-600 text-white rounded-tr-none'
                                            : 'bg-white/10 text-white border border-white/10 rounded-tl-none'
                                            }`}
                                    >
                                        {message.sender === 'ai' ? (
                                            <div className="response-content">
                                                {formatResponse(message.text)}
                                            </div>
                                        ) : (
                                            message.text
                                        )}
                                        <div className={`text-[9px] mt-1.5 opacity-50 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                                            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white/10 p-3 rounded-2xl rounded-tl-none border border-white/10">
                                        <div className="flex gap-1">
                                            {[0, 1, 2].map((i) => (
                                                <motion.div
                                                    key={i}
                                                    animate={{ y: [0, -4, 0] }}
                                                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                                                    className="w-1.5 h-1.5 bg-white/40 rounded-full"
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
                            <div className="flex gap-2 bg-slate-800/50 rounded-xl p-2 border border-white/10 focus-within:border-blue-500/50 transition-all shadow-inner">
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
                                <button
                                    onClick={handleSend}
                                    disabled={!inputValue.trim()}
                                    className="p-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 text-white rounded-lg transition-all shadow-lg shadow-blue-600/20 active:scale-95"
                                >
                                    <FaPaperPlane />
                                </button>
                            </div>
                            <p className="text-[9px] text-white/30 mt-2 text-center tracking-tight">
                                • Context-Aware AI
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Chat Toggle Button - Now Draggable */}
            {!isOpen && (
                <motion.button
                    drag
                    dragConstraints={{ left: -300, right: 300, top: -500, bottom: 20 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(true)}
                    className="p-4 bg-blue-600 text-white rounded-full shadow-2xl hover:bg-blue-500 transition-all pointer-events-auto border-2 border-white/20 relative group overflow-hidden touch-none"
                    style={{ position: 'relative' }}
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <FaCommentDots className="text-2xl relative z-10" />
                </motion.button>
            )}
        </div>
    );
}
