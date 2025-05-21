'use client';
// app/components/HireMeButton.tsx
import { motion } from 'framer-motion';
import { FiMail } from 'react-icons/fi';
import { useState, useEffect } from 'react';
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
  const [isEmailJSReady, setIsEmailJSReady] = useState(false);

  useEffect(() => {
    // Initialize EmailJS
    if (process.env.NEXT_PUBLIC_EMAILJS_USER_ID) {
      emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_USER_ID);
      setIsEmailJSReady(true);
    }
  }, []);

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

    if (!isEmailJSReady) {
      setSubmitMessage("Email service is not ready. Please try again later.");
      setIsSubmitting(false);
      return;
    }

    // Format the email data for message to you
    const messageToYouParams = {
      name: formData.name,
      from_email: formData.email,
      reply_to: formData.email,
      message: formData.message,
      to_email: 'tilay1921@gmail.com'
    };

    // Format the auto-reply to client
    const autoReplyParams = {
      to_name: formData.name,
      to_email: formData.email,
      message: "Thank you for reaching out! I have received your message and will get back to you as soon as possible.",
      from_name: "Tilahun"
    };

    try
    {
      if (!process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 
          !process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 
          !process.env.NEXT_PUBLIC_EMAILJS_AUTO_REPLY_TEMPLATE_ID ||
          !process.env.NEXT_PUBLIC_EMAILJS_USER_ID) {
        throw new Error('EmailJS configuration is missing');
      }

      // Initialize EmailJS if not already initialized
      if (!isEmailJSReady) {
        emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_USER_ID);
      }

      // First, send the message to you
      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        messageToYouParams,
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID
      );

      if (result.status === 200) {
        // Then send auto-reply to the client using a different template
        try {
          const autoReplyResult = await emailjs.send(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
            process.env.NEXT_PUBLIC_EMAILJS_AUTO_REPLY_TEMPLATE_ID,
            autoReplyParams,
            process.env.NEXT_PUBLIC_EMAILJS_USER_ID
          );
          
          if (autoReplyResult.status !== 200) {
            console.error('Auto-reply failed:', autoReplyResult);
          }
        } catch (autoReplyError) {
          console.error('Auto-reply Error:', autoReplyError);
          // Don't throw error here, as the main message was sent successfully
        }

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
      let errorMessage = "Failed to send message. ";
      
      if (error instanceof Error) {
        if (error.message.includes('Failed to fetch')) {
          errorMessage += "Network error. Please check your internet connection.";
        } else if (error.message.includes('configuration is missing')) {
          errorMessage += "Email service is not properly configured.";
        } else {
          errorMessage += error.message;
        }
      }
      
      errorMessage += " Please try again or contact me directly at tilay1921@gmail.com";
      setSubmitMessage(errorMessage);
    } finally
    {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed z-50 flex items-center justify-center bg-primary text-light rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer bottom-6 right-6 w-14 h-14 sm:w-auto sm:h-auto sm:px-6 sm:py-3 gap-0 sm:gap-2"
        style={{
          animation: 'moveUpDown 3s ease-in-out infinite',
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FiMail />
        <span className="hidden sm:inline">Hire Me</span>
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
