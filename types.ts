export enum Platform {
  LINKEDIN = 'LinkedIn',
  INSTAGRAM = 'Instagram',
  TWITTER = 'X',
  FACEBOOK = 'Facebook',
  PINTEREST = 'Pinterest',
  SNAPCHAT = 'Snapchat',
  ESPN = 'ESPN'
}

export interface SocialPost {
  id: string;
  platform: Platform;
  authorName: string;
  authorHandle: string;
  avatarUrl: string;
  content: string;
  imageUrl?: string; // Optional main post image
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  hashtags?: string[];
  verified?: boolean;
}

export interface PersonaConfig {
  name: string;
  profession: string;
  interests: string;
  tone: 'professional' | 'casual' | 'humorous' | 'informative';
}