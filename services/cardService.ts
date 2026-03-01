import { supabase } from '../lib/supabase';
import { SocialPost, Platform } from '../types';

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
  const { data, error } = await supabase
    .from('social_cards')
    .select('*')
    .order('display_order');

  if (error) {
    console.error('Failed to fetch social cards:', error.message);
    return [];
  }

  return (data as SocialCardRow[]).map((row) => ({
    id: row.id,
    platform: row.platform as Platform,
    authorName: row.author_name,
    authorHandle: row.author_handle,
    avatarUrl: `https://picsum.photos/seed/jpaulocoelhoavatar/50/50`,
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
