'use client';
import { motion } from 'framer-motion';

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string[];
}

const experiences: Experience[] = [
  {
    title: "Full Stack Developer",
    company: "Tech Solutions Inc.",
    period: "2022 - Present",
    description: [
      "Developed and maintained web applications using React, Node.js, and TypeScript",
      "Implemented responsive designs and optimized application performance",
      "Collaborated with cross-functional teams to deliver high-quality solutions"
    ]
  },
  {
    title: "Frontend Developer",
    company: "Digital Innovations",
    period: "2021 - 2022",
    description: [
      "Built user interfaces using React and modern JavaScript frameworks",
      "Worked with REST APIs and implemented state management solutions",
      "Participated in code reviews and mentored junior developers"
    ]
  },
  {
    title: "Software Engineer Intern",
    company: "StartUp Labs",
    period: "2020 - 2021",
    description: [
      "Assisted in developing and testing web applications",
      "Learned and applied best practices in software development",
      "Contributed to team projects and documentation"
    ]
  }
];

const Experience = () => {
  return (
    <section id="experience" className="py-16">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-12 text-[rgb(var(--color-foreground))]"
        >
          Experience
        </motion.h2>
        <div className="space-y-8">
          {experiences.map((exp, index) => (
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
                    {exp.title}
                  </h3>
                  <p className="text-[rgb(var(--color-primary))]">{exp.company}</p>
                </div>
                <p className="text-[rgb(var(--color-muted))] mt-2 md:mt-0">{exp.period}</p>
              </div>
              <ul className="list-disc list-inside space-y-2">
                {exp.description.map((item, i) => (
                  <li key={i} className="text-[rgb(var(--color-muted))]">
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience; 