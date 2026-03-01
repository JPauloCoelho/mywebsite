import { supabase } from '../lib/supabase';
import { SocialPost, Platform } from '../types';

const AVATAR = 'https://picsum.photos/seed/jpaulocoelhoavatar/50/50';

// Static fallback — mirrors the supabase-setup.sql seed data.
// Used when Supabase credentials are not configured (e.g. local dev).
const FALLBACK_CARDS: SocialPost[] = [
  {
    id: 'fallback-1',
    platform: Platform.LINKEDIN,
    authorName: 'J. Paulo Coelho',
    authorHandle: '@jpaulo.coelho',
    avatarUrl: AVATAR,
    content: 'Just shipped a new React component library that cut our design-to-dev handoff time by 60%. The secret? Treating tokens as the single source of truth from Figma all the way to Tailwind. Thread below. 🧵',
    imageUrl: 'https://picsum.photos/seed/linkedinpost/600/400',
    likes: 312, comments: 28, shares: 14,
    timestamp: '2d ago',
    hashtags: ['#React', '#DesignSystems', '#Frontend'],
    verified: true,
    profession: 'Creative Technologist',
  },
  {
    id: 'fallback-2',
    platform: Platform.INSTAGRAM,
    authorName: 'J. Paulo Coelho',
    authorHandle: '@jpaulo.coelho',
    avatarUrl: AVATAR,
    content: 'Late-night coding sessions hit different when the setup is right. New desk setup unlocked. ✨ #BuildingInPublic',
    imageUrl: 'https://picsum.photos/seed/desksetup/600/600',
    likes: 2847, comments: 94, shares: 0,
    timestamp: '3d ago',
    hashtags: ['#SetupTour', '#DeveloperLife', '#BuildingInPublic'],
    verified: true,
  },
  {
    id: 'fallback-3',
    platform: Platform.TWITTER,
    authorName: 'J. Paulo Coelho',
    authorHandle: '@jpaulocoelho',
    avatarUrl: AVATAR,
    content: "Hot take: the best AI prompt engineers are the ones who've shipped the most broken code. You learn to speak to uncertainty when you've lived in it.",
    likes: 1203, comments: 87, shares: 342,
    timestamp: '1d ago',
    verified: true,
  },
  {
    id: 'fallback-4',
    platform: Platform.FACEBOOK,
    authorName: 'J. Paulo Coelho',
    authorHandle: '@jpaulo.coelho',
    avatarUrl: AVATAR,
    content: 'Proud to have spoken at the Miami Tech Summit this weekend! Talked about how generative AI is reshaping product development cycles. Great crowd, incredible energy. If you were there — thank you for the questions. 🙌',
    imageUrl: 'https://picsum.photos/seed/techsummit/600/400',
    likes: 487, comments: 62, shares: 23,
    timestamp: '5d ago',
    hashtags: ['#MiamiTech', '#AI', '#PublicSpeaking'],
    verified: true,
  },
  {
    id: 'fallback-5',
    platform: Platform.PINTEREST,
    authorName: 'J. Paulo Coelho',
    authorHandle: '@jpaulocoelho',
    avatarUrl: AVATAR,
    content: 'Cyberpunk UI inspiration board — neon gradients, dark glass morphism, and terminal aesthetics for the next project.',
    imageUrl: 'https://picsum.photos/seed/cyberpunkui/600/800',
    likes: 4102, comments: 0, shares: 891,
    timestamp: '1w ago',
    hashtags: ['#UIDesign', '#Cyberpunk', '#DarkUI'],
  },
  {
    id: 'fallback-6',
    platform: Platform.SNAPCHAT,
    authorName: 'J. Paulo Coelho',
    authorHandle: '@jpaulocoelho',
    avatarUrl: AVATAR,
    content: 'Debugging at 2am. Send coffee ☕ (and maybe a rubber duck)',
    imageUrl: 'https://picsum.photos/seed/latenightcode/600/800',
    likes: 0, comments: 0, shares: 0,
    timestamp: '6h ago',
  },
  {
    id: 'fallback-7',
    platform: Platform.ESPN,
    authorName: 'J. Paulo Coelho',
    authorHandle: '@jpaulocoelho',
    avatarUrl: AVATAR,
    content: 'BREAKING: Local developer pushes hotfix to production on a Friday afternoon — sources confirm he is "feeling great about it." Crowd reaction: mixed.',
    imageUrl: 'https://picsum.photos/seed/espnbreaking/600/338',
    likes: 8821, comments: 412, shares: 1203,
    timestamp: 'LIVE',
    verified: true,
  },
];

interface SocialCardRow {
  id: string;
  platform: string;
  author_name: string;
  author_handle: string;
  content: string;
  image_url: string | null;
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  hashtags: string[] | null;
  verified: boolean;
  profession: string | null;
  display_order: number;
}

export async function getSocialCards(): Promise<SocialPost[]> {
  if (!supabase) {
    console.warn('Supabase not configured — using fallback cards.');
    return FALLBACK_CARDS;
  }

  const { data, error } = await supabase
    .from('social_cards')
    .select('*')
    .order('display_order');

  if (error) {
    console.error('Failed to fetch social cards:', error.message);
    return FALLBACK_CARDS;
  }

  return (data as SocialCardRow[]).map((row) => ({
    id: row.id,
    platform: row.platform as Platform,
    authorName: row.author_name,
    authorHandle: row.author_handle,
    avatarUrl: AVATAR,
    content: row.content,
    imageUrl: row.image_url ?? undefined,
    likes: row.likes,
    comments: row.comments,
    shares: row.shares,
    timestamp: row.timestamp,
    hashtags: row.hashtags ?? undefined,
    verified: row.verified,
    profession: row.profession ?? undefined,
  }));
}
