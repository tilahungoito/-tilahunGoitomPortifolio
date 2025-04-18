// type.ts
import * as JSX from 'react';
import type { Element } from 'react'; // Import the Element type directly

export type SocialMediaLink = {
    platform: string;
    url: string;
    icon: JSX.Element; // Or use JSX.Element here
  };
  
  export type Skill = string;  // Represents a single skill