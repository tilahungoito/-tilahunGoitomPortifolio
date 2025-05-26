'use client';
import { motion } from 'framer-motion';

interface Education {
  degree: string;
  institution: string;
  period: string;
  description: string;
}

const education: Education[] = [
  {
    degree: "Bachelor of Science in Software Engineering",
    institution: "University of Technology",
    period: "2019 - 2025",
    description: "Focused on software engineering, data structures, and algorithms. Participated in various hackathons and coding competitions."
  },
  
];

const Education = () => {
  return (
    <section id="education" className="py-16">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-12 text-[rgb(var(--color-foreground))]"
        >
          Education
        </motion.h2>
        <div className="space-y-8">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card card-hover p-6"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-[rgb(var(--color-foreground))]">
                    {edu.degree}
                  </h3>
                  <p className="text-[rgb(var(--color-primary))]">{edu.institution}</p>
                </div>
                <p className="text-[rgb(var(--color-muted))] mt-2 md:mt-0">{edu.period}</p>
              </div>
              <p className="text-[rgb(var(--color-muted))]">{edu.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education; 