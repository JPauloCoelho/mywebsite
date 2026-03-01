-- ============================================================
-- J. Paulo Coelho — social_cards table
-- Run this in Supabase SQL Editor (Database > SQL Editor)
-- ============================================================

CREATE TABLE IF NOT EXISTS social_cards (
  id              uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  platform        text        NOT NULL,
  author_name     text        NOT NULL DEFAULT 'J. Paulo Coelho',
  author_handle   text        NOT NULL,
  content         text        NOT NULL,
  image_url       text,
  likes           integer     DEFAULT 0,
  comments        integer     DEFAULT 0,
  shares          integer     DEFAULT 0,
  timestamp       text        DEFAULT 'Just now',
  hashtags        text[],
  verified        boolean     DEFAULT false,
  profession      text,
  display_order   integer     DEFAULT 0,
  updated_at      timestamptz DEFAULT now()
);

-- Row Level Security
ALTER TABLE social_cards ENABLE ROW LEVEL SECURITY;

-- Public can read (landing page works for all visitors)
CREATE POLICY "Public read"
  ON social_cards FOR SELECT
  USING (true);

-- Only authenticated users can write (the card editor in Phase 2)
CREATE POLICY "Auth write"
  ON social_cards FOR ALL
  USING (auth.role() = 'authenticated');


-- ============================================================
-- Seed Data — 7 cards, one per platform
-- ============================================================

INSERT INTO social_cards
  (platform, author_handle, content, image_url, likes, comments, shares, timestamp, hashtags, verified, profession, display_order)
VALUES
  (
    'LinkedIn',
    '@jpaulo.coelho',
    'Just shipped a new React component library that cut our design-to-dev handoff time by 60%. The secret? Treating tokens as the single source of truth from Figma all the way to Tailwind. Thread below. 🧵',
    'https://picsum.photos/seed/linkedinpost/600/400',
    312, 28, 14,
    '2d ago',
    ARRAY['#React', '#DesignSystems', '#Frontend'],
    true,
    'Creative Technologist',
    1
  ),
  (
    'Instagram',
    '@jpaulo.coelho',
    'Late-night coding sessions hit different when the setup is right. New desk setup unlocked. ✨ #BuildingInPublic',
    'https://picsum.photos/seed/desksetup/600/600',
    2847, 94, 0,
    '3d ago',
    ARRAY['#SetupTour', '#DeveloperLife', '#BuildingInPublic'],
    true,
    'Creative Technologist',
    2
  ),
  (
    'X',
    '@jpaulocoelho',
    'Hot take: the best AI prompt engineers are the ones who''ve shipped the most broken code. You learn to speak to uncertainty when you''ve lived in it.',
    NULL,
    1203, 87, 342,
    '1d ago',
    ARRAY['#AI', '#Engineering'],
    true,
    'Creative Technologist',
    3
  ),
  (
    'Facebook',
    '@jpaulo.coelho',
    'Proud to have spoken at the Miami Tech Summit this weekend! Talked about how generative AI is reshaping product development cycles. Great crowd, incredible energy. If you were there — thank you for the questions. 🙌',
    'https://picsum.photos/seed/techsummit/600/400',
    487, 62, 23,
    '5d ago',
    ARRAY['#MiamiTech', '#AI', '#PublicSpeaking'],
    true,
    'Creative Technologist',
    4
  ),
  (
    'Pinterest',
    '@jpaulocoelho',
    'Cyberpunk UI inspiration board — neon gradients, dark glass morphism, and terminal aesthetics for the next project.',
    'https://picsum.photos/seed/cyberpunkui/600/800',
    4102, 0, 891,
    '1w ago',
    ARRAY['#UIDesign', '#Cyberpunk', '#DarkUI'],
    false,
    'Creative Technologist',
    5
  ),
  (
    'Snapchat',
    '@jpaulocoelho',
    'Debugging at 2am. Send coffee ☕ (and maybe a rubber duck)',
    'https://picsum.photos/seed/latenightcode/600/800',
    0, 0, 0,
    '6h ago',
    NULL,
    false,
    'Creative Technologist',
    6
  ),
  (
    'ESPN',
    '@jpaulocoelho',
    'BREAKING: Local developer pushes hotfix to production on a Friday afternoon — sources confirm he is "feeling great about it." Crowd reaction: mixed.',
    'https://picsum.photos/seed/espnbreaking/600/338',
    8821, 412, 1203,
    'LIVE',
    NULL,
    true,
    'Creative Technologist',
    7
  );
