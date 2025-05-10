'use client';
// app/components/HireMeButton.tsx
import { motion } from 'framer-motion';
import { FiMail } from 'react-icons/fi';
import { useState } from 'react';
import emailjs from '@emailjs/browser';

const HireMeButton = () =>
{
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) =>
  {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) =>
  {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(""); // Clear any previous messages

    // Format the email data
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      to_name: 'Tilahun', // Your name
      reply_to: formData.email, // This ensures replies go to the sender
    };

    try
    {
      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID!
      );

      if (result.status === 200) {
        setSubmitMessage("Message sent successfully! I'll get back to you soon.");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() =>
        {
          setSubmitMessage("");
          setIsOpen(false);
        }, 3000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error)
    {
      console.error('EmailJS Error:', error);
      setSubmitMessage("Failed to send message. Please try again or contact me directly at your-email@example.com");
    } finally
    {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed right-6 z-50 flex items-center gap-2 bg-primary text-light px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer"
        style={{
          bottom: '20vh', // Adjusting for distance from bottom
          animation: 'moveUpDown 3s ease-in-out infinite', // Adding animation
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FiMail />
        Hire Me
      </motion.button>

      {isOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="bg-white rounded-lg p-6 max-w-md w-full relative shadow-lg my-8"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-dark hover:text-primary"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-4">Let&apos;s Work Together</h2>

            {submitMessage ? (
              <div
                className={`p-4 rounded ${submitMessage.includes("successfully")
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
                    className="block text-sm font-medium text-dark"
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
                    className="mt-1 block w-full rounded-md border-dark border-opacity-30 shadow-sm focus:border-primary focus:ring-primary"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-dark"
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
                    className="mt-1 block w-full rounded-md border-dark border-opacity-30 shadow-sm focus:border-primary focus:ring-primary"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-dark"
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
                    className="mt-1 block w-full rounded-md border-dark border-opacity-30 shadow-sm focus:border-primary focus:ring-primary"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-light py-2 px-4 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
      <style jsx>{`
        @keyframes moveUpDown {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default HireMeButton;
