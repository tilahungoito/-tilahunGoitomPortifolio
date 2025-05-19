'use client';
import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { FiChevronLeft, FiChevronRight, FiFileText } from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';

const certifications = [
  {
    title: "Software Engineering",
    pdf: "/certifications/TilahunGoitom(SoftwareEngineer) (1).pdf",
    description: "Bachelor's Degree in Software Engineering",
    preview: "/certifications/ccna1.png" // Using a placeholder image for PDF preview
  },
  {
    title: "Ethical Hacking",
    pdf: "/certifications/ethicalHacker.png",
    description: "Certified Ethical Hacker (CEH)",
    preview: "/certifications/ethicalHacker.png"
  },
  {
    title: "CCNA",
    pdf: "/certifications/ccna2.png",
    description: "Cisco Certified Network Associate",
    preview: "/certifications/ccna2.png"
  },
  {
    title: "EF SET",
    pdf: "/certifications/EF SET Certificate1 tilahun.pdf",
    description: "English Language Proficiency",
    preview: "/certifications/ccna1.png"
  },
  {
    title: "Data Analysis",
    pdf: "/certifications/dataAnalysis.pdf",
    description: "Data Analysis and Visualization",
    preview: "/certifications/ccna1.png"
  },
  {
    title: "Artificial Intelligence",
    pdf: "/certifications/Artificial intelligence.pdf",
    description: "AI and Machine Learning",
    preview: "/certifications/ccna1.png"
  },
  {
    title: "Android Development",
    pdf: "/certifications/android devloper.pdf",
    description: "Mobile App Development",
    preview: "/certifications/ccna1.png"
  }
];

export default function CertificationsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToNext = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = container.clientWidth;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setCurrentIndex(prev => Math.min(prev + 1, certifications.length - 1));
    }
  };

  const scrollToPrev = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = container.clientWidth;
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      setCurrentIndex(prev => Math.max(prev - 1, 0));
    }
  };

  return (
    <main className="min-h-screen bg-light pt-20">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <Link 
              href="/"
              className="text-primary hover:underline flex items-center gap-2"
            >
              ← Back to Home
            </Link>
          </div>
          
          <h1 className="text-4xl font-bold mb-12">My Certifications</h1>
          
          <div className="relative">
            {/* Navigation Buttons */}
            <button
              onClick={scrollToPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
              disabled={currentIndex === 0}
            >
              <FiChevronLeft size={24} className={currentIndex === 0 ? 'text-gray-400' : 'text-primary'} />
            </button>
            
            <button
              onClick={scrollToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
              disabled={currentIndex === certifications.length - 1}
            >
              <FiChevronRight size={24} className={currentIndex === certifications.length - 1 ? 'text-gray-400' : 'text-primary'} />
            </button>

            {/* Scrollable Container */}
            <div 
              ref={scrollContainerRef}
              className="overflow-x-auto scrollbar-hide snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <div className="flex gap-8 min-w-max px-4">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 200, delay: index * 0.1 }}
                    className="w-[400px] flex-shrink-0 snap-center"
                  >
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                      <div className="h-[500px] relative">
                        {cert.pdf.endsWith('.pdf') ? (
                          <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 p-8">
                            <FiFileText size={64} className="text-primary mb-4" />
                            <p className="text-center text-gray-600 mb-4">
                              Click below to view the full certificate
                            </p>
                            <a
                              href={cert.pdf}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                            >
                              View PDF Certificate
                            </a>
                          </div>
                        ) : (
                          <Image
                            src={cert.preview}
                            alt={cert.title}
                            width={400}
                            height={500}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2">{cert.title}</h3>
                        <p className="text-gray-600">{cert.description}</p>
                        <a
                          href={cert.pdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-block text-primary hover:underline"
                        >
                          View Full Certificate
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Progress Indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {certifications.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (scrollContainerRef.current) {
                      const container = scrollContainerRef.current;
                      const scrollAmount = container.clientWidth * index;
                      container.scrollTo({ left: scrollAmount, behavior: 'smooth' });
                      setCurrentIndex(index);
                    }
                  }}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    currentIndex === index ? 'bg-primary' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </main>
  );
} 