'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Certification {
  title: string;
  image: string;
  pdf?: string;
  description: string;
}

const certifications: Certification[] = [
  {
    title: "Ethical Hacking",
    image: "/certifications/ethicalHacker.png",
    description: "Certified Ethical Hacker (CEH) certification"
  },
  {
    title: "CCNA",
    image: "/certifications/ccna2.png",
    description: "Cisco Certified Network Associate"
  },
  {
    title: "EF SET",
    image: "/certifications/EF SET Certificate1 tilahun.pdf",
    description: "English Language Proficiency"
  },
  {
    title: "Data Analysis",
    image: "/certifications/dataAnalysis.pdf",
    description: "Data Analysis and Visualization"
  },
  {
    title: "Artificial Intelligence",
    image: "/certifications/Artificial intelligence.pdf",
    description: "AI and Machine Learning Fundamentals"
  },
  {
    title: "Android Development",
    image: "/certifications/android devloper.pdf",
    description: "Mobile App Development"
  }
];

const Certifications = () => {
  return (
    <section id="certifications" className="py-16 bg-light">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-12"
        >
          Certifications
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48">
                {cert.image.endsWith('.pdf') ? (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <span className="text-4xl">📄</span>
                  </div>
                ) : (
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{cert.title}</h3>
                <p className="text-gray-600">{cert.description}</p>
                {cert.pdf && (
                  <a
                    href={cert.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block text-primary hover:underline"
                  >
                    View Certificate
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications; 