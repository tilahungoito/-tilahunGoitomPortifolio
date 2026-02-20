'use client';
// app/components/HireMeButton.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

// EmailJS configuration from environment variables
const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_USER_ID;
const REPLY_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_AUTO_REPLY_TEMPLATE_ID;

const HireMeButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [initError, setInitError] = useState<string | null>(null);

  useEffect(() => {
    if (!PUBLIC_KEY) {
      console.error('EmailJS public key is not defined in environment variables');
      setInitError('Email service configuration is missing');
      return;
    }

    try {
      // Initialize EmailJS with the public key from environment variables
      emailjs.init(PUBLIC_KEY);
      console.log('EmailJS initialized successfully with key:', PUBLIC_KEY);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to initialize EmailJS';
      console.error('EmailJS initialization error:', errorMessage);
      setInitError(errorMessage);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (initError) {
      console.error('Cannot submit: EmailJS not initialized properly');
      setSubmitStatus('error');
      return;
    }

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY || !REPLY_TEMPLATE_ID) {
      console.error('EmailJS configuration is incomplete');
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Debug: Log environment variables (first 5 chars only for security)
    console.log('EmailJS Config Check:', {
      serviceId: SERVICE_ID ? SERVICE_ID.substring(0, 10) + '...' : 'MISSING',
      templateId: TEMPLATE_ID ? TEMPLATE_ID.substring(0, 10) + '...' : 'MISSING',
      replyTemplateId: REPLY_TEMPLATE_ID ? REPLY_TEMPLATE_ID.substring(0, 10) + '...' : 'MISSING',
      publicKey: PUBLIC_KEY ? PUBLIC_KEY.substring(0, 5) + '...' : 'MISSING'
    });

    try {
      // Send message to admin
      const adminTemplateParams = {
        to_email: 'tilay1921@gmail.com',
        from_name: formData.name,
        from_email: formData.email,
        reply_to: formData.email,
        message: formData.message,
        title: formData.message.substring(0, 50) + '...',
        name: formData.name
      };

      console.log('Sending admin email...');
      const adminResponse = await emailjs.send(
        SERVICE_ID!,
        TEMPLATE_ID!,
        adminTemplateParams,
        PUBLIC_KEY!
      );
      console.log('Admin email sent:', adminResponse);

      // Send auto-reply to user
      // Extra aliases cover common EmailJS template variable names for the recipient
      const replyTemplateParams = {
        to_email: formData.email,       // {{to_email}}
        email: formData.email,          // {{email}}
        recipient_email: formData.email,// {{recipient_email}}
        user_email: formData.email,     // {{user_email}}
        to_name: formData.name,
        user_name: formData.name,
        name: formData.name,
        from_name: 'Tilahun Goitom',
        reply_to: 'tilay1921@gmail.com',
        message: `Thank you for reaching out! I have received your message and will get back to you as soon as possible.\n\nBest regards,\nTilahun Goitom`
      };

      console.log('Sending auto-reply email...');
      const replyResponse = await emailjs.send(
        SERVICE_ID!,
        REPLY_TEMPLATE_ID!,
        replyTemplateParams,
        PUBLIC_KEY!
      );
      console.log('Auto-reply sent:', replyResponse);

      if (adminResponse.status === 200 && replyResponse.status === 200) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setIsModalOpen(false), 2000);
      } else {
        throw new Error('Failed to send one or more emails');
      }
    } catch (error: unknown) {
      // Extract error message from various error formats
      let errorMessage = 'Unknown error';
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'object' && error !== null) {
        if ('text' in error) {
          errorMessage = (error as { text: string }).text;
        } else if ('message' in error) {
          errorMessage = (error as { message: string }).message;
        } else {
          errorMessage = JSON.stringify(error);
        }
      }

      console.error('EmailJS Error Details:', {
        error,
        errorType: typeof error,
        errorKeys: typeof error === 'object' && error !== null ? Object.keys(error) : 'N/A',
        message: errorMessage,
        serviceId: SERVICE_ID,
        templateId: TEMPLATE_ID,
        replyTemplateId: REPLY_TEMPLATE_ID,
        publicKey: PUBLIC_KEY ? PUBLIC_KEY.substring(0, 5) + '...' : 'MISSING'
      });

      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <motion.button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-8 right-8 z-50 p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative">
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <FaPaperPlane className="text-2xl text-[rgb(var(--color-primary))]" />
        </div>
      </motion.button>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[rgb(var(--color-card))] rounded-lg p-6 max-w-md w-full"
              onClick={e => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4 text-[rgb(var(--color-foreground))]">Get in Touch</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[rgb(var(--color-foreground))] mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-2 rounded-lg border border-[rgb(var(--color-border))] bg-[rgb(var(--color-input))] text-[rgb(var(--color-foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary))] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[rgb(var(--color-foreground))] mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-2 rounded-lg border border-[rgb(var(--color-border))] bg-[rgb(var(--color-input))] text-[rgb(var(--color-foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary))] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[rgb(var(--color-foreground))] mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full px-4 py-2 rounded-lg border border-[rgb(var(--color-border))] bg-[rgb(var(--color-input))] text-[rgb(var(--color-foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary))] focus:border-transparent"
                    rows={4}
                    required
                  />
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-lg text-[rgb(var(--color-foreground))] hover:bg-[rgb(var(--color-card-hover))] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 rounded-lg bg-[rgb(var(--color-primary))] text-[rgb(var(--color-light))] hover:bg-[rgb(var(--color-primary))]/90 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
                {submitStatus === 'success' && (
                  <p className="text-green-500 text-sm">Message sent successfully!</p>
                )}
                {submitStatus === 'error' && (
                  <p className="text-red-500 text-sm">
                    {initError ? 'Email service is not available. Please try again later.' : 'Failed to send message. Please try again.'}
                  </p>
                )}
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HireMeButton;
