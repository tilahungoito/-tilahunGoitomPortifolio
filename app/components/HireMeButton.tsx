'use client';

import { motion } from 'framer-motion';
import { FiMail } from 'react-icons/fi';
import { useState } from 'react';
import emailjs from '@emailjs/browser';

interface HireMeButtonProps {
  darkMode: boolean;
}

const HireMeButton = ({ darkMode }: HireMeButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formData,
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID!
      );

      setSubmitMessage("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => {
        setSubmitMessage("");
        setIsOpen(false);
      }, 2000);
    } catch (error) {
      console.error(error);
      setSubmitMessage("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed right-4 top-4 z-50 flex items-center gap-2 px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all ${
          darkMode ? 'bg-gray-800 text-white' : 'bg-primary text-light'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FiMail />
        Hire Me
      </motion.button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`rounded-lg p-6 max-w-md w-full relative ${
              darkMode ? 'bg-gray-800 text-white' : 'bg-light'
            }`}
          >
            <button
              onClick={() => setIsOpen(false)}
              className={`absolute top-4 right-4 ${
                darkMode ? 'text-white hover:text-primary' : 'text-dark hover:text-primary'
              }`}
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-4">Let&apos;s Work Together</h2>

            {submitMessage ? (
              <div
                className={`p-4 rounded ${
                  submitMessage.includes("successfully")
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {submitMessage}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className={`block text-sm font-medium ${
                      darkMode ? 'text-white' : 'text-dark'
                    }`}
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={`mt-1 block w-full rounded-md shadow-sm focus:ring-primary ${
                      darkMode
                        ? 'bg-gray-700 text-white border-gray-600'
                        : 'border-dark border-opacity-30'
                    }`}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className={`block text-sm font-medium ${
                      darkMode ? 'text-white' : 'text-dark'
                    }`}
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`mt-1 block w-full rounded-md shadow-sm focus:ring-primary ${
                      darkMode
                        ? 'bg-gray-700 text-white border-gray-600'
                        : 'border-dark border-opacity-30'
                    }`}
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className={`block text-sm font-medium ${
                      darkMode ? 'text-white' : 'text-dark'
                    }`}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className={`mt-1 block w-full rounded-md shadow-sm focus:ring-primary ${
                      darkMode
                        ? 'bg-gray-700 text-white border-gray-600'
                        : 'border-dark border-opacity-30'
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-2 px-4 rounded-md transition-colors disabled:opacity-50 ${
                    darkMode
                      ? 'bg-gray-700 text-white hover:bg-gray-600'
                      : 'bg-primary text-light hover:bg-primary/90'
                  }`}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </>
  );
};

export default HireMeButton; 