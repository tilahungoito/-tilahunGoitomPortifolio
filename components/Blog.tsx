'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { blogPosts, BlogPost } from '../data/blogs';
import { FiArrowUpRight, FiClock, FiCalendar, FiPlus, FiMinus, FiX, FiLogOut, FiSettings, FiEdit3, FiChevronDown } from 'react-icons/fi';

const ADMIN_EMAIL = 'tilahun1goitomg@gmail.com';
const STORAGE_KEY_EMAIL = 'blog_admin_email';
const STORAGE_KEY_POSTS = 'blog_posts_extra';

const GRADIENTS = [
    { label: 'Amber/Orange', value: 'from-amber-500/20 via-orange-500/10 to-yellow-500/5' },
    { label: 'Blue/Cyan', value: 'from-blue-500/20 via-cyan-500/10 to-teal-500/5' },
    { label: 'Green/Emerald', value: 'from-green-500/20 via-emerald-500/10 to-cyan-500/5' },
    { label: 'Purple/Violet', value: 'from-purple-500/20 via-violet-500/10 to-fuchsia-500/5' },
    { label: 'Rose/Pink', value: 'from-rose-500/20 via-pink-500/10 to-fuchsia-500/5' },
    { label: 'Indigo/Blue', value: 'from-indigo-500/20 via-blue-500/10 to-sky-500/5' },
];

function formatContent(text: string) {
    return text.split('\n').map((line, i) => {
        if (line.startsWith('**') && line.endsWith('**')) {
            return (
                <p key={i} className="font-bold text-[rgb(var(--color-foreground))] mt-4 mb-1 text-sm">
                    {line.replace(/\*\*/g, '')}
                </p>
            );
        }
        if (line.startsWith('- ')) {
            return (
                <li key={i} className="ml-4 text-xs text-[rgb(var(--color-muted))] list-disc leading-relaxed">
                    {line.slice(2).replace(/\*\*(.*?)\*\*/g, '$1')}
                </li>
            );
        }
        if (line.trim() === '') return <br key={i} />;
        const parts = line.split(/(\*\*.*?\*\*)/g);
        return (
            <p key={i} className="text-xs text-[rgb(var(--color-muted))] leading-relaxed">
                {parts.map((part, j) =>
                    part.startsWith('**') && part.endsWith('**')
                        ? <strong key={j} className="text-[rgb(var(--color-foreground))]">{part.replace(/\*\*/g, '')}</strong>
                        : part
                )}
            </p>
        );
    });
}

export default function Blog() {
    const [allPosts, setAllPosts] = useState<BlogPost[]>(blogPosts);
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const [adminEmail, setAdminEmail] = useState<string | null>(null);

    const [showLogin, setShowLogin] = useState(false);
    const [loginInput, setLoginInput] = useState('');
    const [loginError, setLoginError] = useState('');

    const [showAdd, setShowAdd] = useState(false);
    const [form, setForm] = useState({
        title: '', excerpt: '', content: '', tags: '', emoji: '📝',
        date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        readTime: '5 min read', link: '#', gradient: GRADIENTS[0].value,
    });
    const [formError, setFormError] = useState('');
    const addModalRef = useRef<HTMLDivElement>(null);
    const loginModalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const storedEmail = localStorage.getItem(STORAGE_KEY_EMAIL);
        if (storedEmail === ADMIN_EMAIL) setAdminEmail(storedEmail);

        const storedPosts = localStorage.getItem(STORAGE_KEY_POSTS);
        if (storedPosts) {
            try {
                const parsed: BlogPost[] = JSON.parse(storedPosts);
                setAllPosts([...parsed, ...blogPosts]);
            } catch { /* ignore */ }
        }
    }, []);

    useEffect(() => {
        function handler(e: MouseEvent) {
            if (showAdd && addModalRef.current && !addModalRef.current.contains(e.target as Node)) setShowAdd(false);
            if (showLogin && loginModalRef.current && !loginModalRef.current.contains(e.target as Node)) {
                setShowLogin(false); setLoginError('');
            }
        }
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [showAdd, showLogin]);

    function toggleExpand(id: number) {
        setExpandedId(prev => (prev === id ? null : id));
    }

    function handleLogin() {
        if (loginInput.trim() === ADMIN_EMAIL) {
            localStorage.setItem(STORAGE_KEY_EMAIL, ADMIN_EMAIL);
            setAdminEmail(ADMIN_EMAIL);
            setShowLogin(false);
            setLoginInput('');
            setLoginError('');
        } else {
            setLoginError('Access denied.');
        }
    }

    function handleLogout() {
        localStorage.removeItem(STORAGE_KEY_EMAIL);
        setAdminEmail(null);
    }

    function handleAddBlog() {
        if (!form.title.trim() || !form.excerpt.trim() || !form.content.trim()) {
            setFormError('Title, excerpt, and content are required.');
            return;
        }
        const newPost: BlogPost = {
            id: Date.now(),
            title: form.title.trim(),
            excerpt: form.excerpt.trim(),
            content: form.content.trim(),
            tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
            date: form.date.trim() || new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
            readTime: form.readTime.trim(),
            link: form.link.trim() || '#',
            emoji: form.emoji || '📝',
            gradient: form.gradient,
        };

        const storedPosts = localStorage.getItem(STORAGE_KEY_POSTS);
        const existing: BlogPost[] = storedPosts ? JSON.parse(storedPosts) : [];
        const updated = [newPost, ...existing];
        localStorage.setItem(STORAGE_KEY_POSTS, JSON.stringify(updated));
        setAllPosts([newPost, ...allPosts]);
        setShowAdd(false);
        setForm({ title: '', excerpt: '', content: '', tags: '', emoji: '📝', date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }), readTime: '5 min read', link: '#', gradient: GRADIENTS[0].value });
        setFormError('');
    }

    return (
        <section id="blog" className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-4xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.55 }}
                    className="mb-12"
                >
                    <h2 className="text-2xl sm:text-3xl font-bold mb-2">Insights & Articles</h2>
                    <p className="text-[rgb(var(--color-muted))] text-sm sm:text-base">
                        Sharing what I&apos;ve learned building government-scale platforms and AI systems.
                    </p>
                </motion.div>

                {/* List of Blogs */}
                <div className="space-y-3">
                    {allPosts.map((post, index) => {
                        const isExpanded = expandedId === post.id;
                        return (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                className={`group overflow-hidden rounded-xl border border-[rgb(var(--color-border))] transition-all duration-300 ${isExpanded ? 'bg-[rgb(var(--color-card))] shadow-lg shadow-[rgb(var(--color-primary))]/5' : 'bg-[rgb(var(--color-card))] hover:border-[rgb(var(--color-primary))]/30'}`}
                            >
                                {/* Header Toggle Line */}
                                <button
                                    onClick={() => toggleExpand(post.id)}
                                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left transition-colors"
                                >
                                    <div className="flex items-center gap-4 flex-1 min-w-0">
                                        <span className="text-2xl flex-shrink-0">{post.emoji}</span>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-base font-bold text-[rgb(var(--color-foreground))] group-hover:text-[rgb(var(--color-primary))] transition-colors truncate">
                                                {post.title}
                                            </h3>
                                            <div className="flex items-center gap-3 text-[10px] sm:text-xs text-[rgb(var(--color-muted))] mt-1">
                                                <span className="flex items-center gap-1"><FiCalendar size={11} /> {post.date}</span>
                                                <span className="flex items-center gap-1"><FiClock size={11} /> {post.readTime}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ml-4 flex-shrink-0">
                                        <motion.div
                                            animate={{ rotate: isExpanded ? 180 : 0 }}
                                            className={`p-1.5 rounded-full border border-[rgb(var(--color-border))] text-[rgb(var(--color-muted))] transition-colors ${isExpanded ? 'bg-[rgb(var(--color-primary))] border-[rgb(var(--color-primary))] text-white' : 'group-hover:text-[rgb(var(--color-primary))] group-hover:border-[rgb(var(--color-primary))]'}`}
                                        >
                                            <FiChevronDown size={18} />
                                        </motion.div>
                                    </div>
                                </button>

                                <AnimatePresence initial={false}>
                                    {isExpanded && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.4, ease: [0.25, 0.8, 0.25, 1] }}
                                        >
                                            <div className="px-5 pb-5 pt-0">
                                                <div className="h-px w-full bg-[rgb(var(--color-border))] mb-5" />

                                                <div className="mb-6">
                                                    <p className="text-sm text-[rgb(var(--color-foreground))] font-medium leading-relaxed mb-4">
                                                        {post.excerpt}
                                                    </p>
                                                    <div className="flex flex-wrap gap-1.5 mb-6">
                                                        {post.tags.map((tag) => (
                                                            <span key={tag} className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full bg-[rgb(var(--color-primary))]/10 text-[rgb(var(--color-primary))] border border-[rgb(var(--color-primary))]/20">
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="pl-4 border-l-2 border-[rgb(var(--color-primary))]/30 space-y-1 mb-8">
                                                    {formatContent(post.content)}
                                                </div>

                                                <div className="flex justify-end pt-4">
                                                    <motion.a
                                                        href={post.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        whileHover={{ x: 3 }}
                                                        className="flex items-center gap-2 text-xs font-bold text-[rgb(var(--color-primary))] hover:underline"
                                                    >
                                                        Visit Full Project / Article
                                                        <FiArrowUpRight size={14} />
                                                    </motion.a>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Admin Controls */}
                <div className="fixed bottom-6 right-6 flex flex-col items-end gap-2 z-50">
                    {adminEmail === ADMIN_EMAIL ? (
                        <>
                            <motion.button
                                onClick={() => setShowAdd(true)}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                whileHover={{ scale: 1.06 }}
                                whileTap={{ scale: 0.94 }}
                                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[rgb(var(--color-primary))] text-white text-sm font-semibold shadow-xl shadow-[rgb(var(--color-primary))]/30"
                            >
                                <FiEdit3 size={14} /> Add Blog
                            </motion.button>
                            <button onClick={handleLogout} className="text-xs text-[rgb(var(--color-muted))] hover:text-red-400 bg-[rgb(var(--color-card))] border border-[rgb(var(--color-border))] px-3 py-1.5 rounded-full">
                                Logout
                            </button>
                        </>
                    ) : (
                        <motion.button
                            onClick={() => setShowLogin(true)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-10 h-10 rounded-full bg-[rgb(var(--color-card))] border border-[rgb(var(--color-border))] flex items-center justify-center text-[rgb(var(--color-muted))] hover:text-[rgb(var(--color-primary))] shadow-lg"
                        >
                            <FiSettings size={18} />
                        </motion.button>
                    )}
                </div>
            </div>

            {/* Login Modal */}
            <AnimatePresence>
                {showLogin && (
                    <motion.div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <motion.div ref={loginModalRef} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-[rgb(var(--color-card))] border border-[rgb(var(--color-border))] rounded-2xl p-6 w-full max-w-sm shadow-2xl">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold">Admin Portal</h3>
                                <button onClick={() => setShowLogin(false)}><FiX size={20} /></button>
                            </div>
                            <input
                                type="email" placeholder="Email" value={loginInput} onChange={e => setLoginInput(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-[rgb(var(--color-border))] bg-[rgb(var(--color-bg))] mb-3 text-sm focus:outline-none focus:border-[rgb(var(--color-primary))]"
                            />
                            {loginError && <p className="text-xs text-red-500 mb-3">{loginError}</p>}
                            <button onClick={handleLogin} className="w-full py-2 bg-[rgb(var(--color-primary))] text-white font-bold rounded-lg text-sm">Login</button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Add Blog Modal */}
            <AnimatePresence>
                {showAdd && (
                    <motion.div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 py-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <motion.div ref={addModalRef} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-[rgb(var(--color-card))] border border-[rgb(var(--color-border))] rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold">New Blog Entry</h3>
                                <button onClick={() => setShowAdd(false)}><FiX size={24} /></button>
                            </div>
                            <div className="space-y-4">
                                <input type="text" placeholder="Title" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="w-full px-4 py-2 rounded-lg border border-[rgb(var(--color-border))] bg-[rgb(var(--color-bg))] text-sm" />
                                <textarea placeholder="Short Excerpt" value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))} className="w-full px-4 py-2 rounded-lg border border-[rgb(var(--color-border))] bg-[rgb(var(--color-bg))] text-sm h-16" />
                                <textarea placeholder="Full Content (Daily/Weekly Diary)" value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} className="w-full px-4 py-2 rounded-lg border border-[rgb(var(--color-border))] bg-[rgb(var(--color-bg))] text-sm h-64 font-mono" />
                                <input type="text" placeholder="Tags (React, AI...)" value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} className="w-full px-4 py-2 rounded-lg border border-[rgb(var(--color-border))] bg-[rgb(var(--color-bg))] text-sm" />
                                <div className="grid grid-cols-2 gap-3">
                                    <input type="text" placeholder="🚀" value={form.emoji} onChange={e => setForm(f => ({ ...f, emoji: e.target.value }))} className="w-full px-4 py-2 rounded-lg border border-[rgb(var(--color-border))] bg-[rgb(var(--color-bg))] text-sm" />
                                    <input type="text" placeholder="Feb 2026" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} className="w-full px-4 py-2 rounded-lg border border-[rgb(var(--color-border))] bg-[rgb(var(--color-bg))] text-sm" />
                                </div>
                                <button onClick={handleAddBlog} className="w-full py-3 bg-[rgb(var(--color-primary))] text-white font-bold rounded-xl shadow-lg">Post to Blog</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
