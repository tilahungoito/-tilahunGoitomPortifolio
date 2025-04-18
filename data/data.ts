// data.ts

import { FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';

// Define types first
export type SocialMediaLink = {
  platform: string;
  url: string;
  icon: JSX.Element; // Use JSX.Element for React icon components
};

export type Skill = string; // Simple type for skills

// Now define the data
export const skills: Skill[] = [
  "JavaScript", "TypeScript", "React", "Next.js",
  "Node.js", "Express", "MongoDB", "PostgreSQL",
  "GraphQL", "Docker", "AWS", "Tailwind CSS"
];

export const socialMediaLinks: SocialMediaLink[] = [
  {
    platform: 'GitHub',
    url: 'https://github.com/yourusername',
    icon: <FiGithub size={24} />,
  },
  {
    platform: 'LinkedIn',
    url: 'https://linkedin.com/in/yourusername',
    icon: <FiLinkedin size={24} />,
  },
  {
    platform: 'Twitter',
    url: 'https://twitter.com/yourusername',
    icon: <FiTwitter size={24} />,
  }
];
