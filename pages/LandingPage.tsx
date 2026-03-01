import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getSocialCards } from '../services/cardService';
import { SocialPost } from '../types';
import { SocialCard } from '../components/SocialCard';
import { Loader2, Code2, Mail, Globe, Lock, Cpu, Sparkles, Bot, Zap, GraduationCap } from 'lucide-react';

const TABS = [
  { id: 'latest', label: 'Latest Mix' },
  { id: 'stack', label: 'The Stack' },
  { id: 'origins', label: 'Origins' },
];

// Data for the "Stack" Carousel — updated to current model versions
const STACK_ITEMS = [
  {
    id: 'openai',
    name: 'OpenAI',
    model: 'GPT-4o',
    color: 'from-[#10a37f] to-[#0d8c6d]',
    glow: 'shadow-[#10a37f]/40',
    description: 'The heavy lifter for complex reasoning and code generation tasks.',
    icon: <Bot className="w-16 h-16 text-white" />
  },
  {
    id: 'gemini',
    name: 'Google Gemini',
    model: '2.0 Flash',
    color: 'from-[#4E88D4] to-[#9255E0]',
    glow: 'shadow-[#4E88D4]/40',
    description: 'My primary driver for multimodal understanding and massive context windows.',
    icon: <Sparkles className="w-16 h-16 text-white" />
  },
  {
    id: 'claude',
    name: 'Anthropic',
    model: 'Claude Sonnet 4.6',
    color: 'from-[#D97757] to-[#C25D3C]',
    glow: 'shadow-[#D97757]/40',
    description: 'Specialized in nuanced writing, safety, and human-like interaction.',
    icon: <Cpu className="w-16 h-16 text-white" />
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    model: 'V7',
    color: 'from-blue-600 to-indigo-900',
    glow: 'shadow-indigo-500/40',
    description: 'The creative engine behind the visual aesthetics and imagery.',
    icon: <Zap className="w-16 h-16 text-white" />
  }
];

// Data for the "Origins" Carousel (Universities)
const ORIGINS_ITEMS = [
  {
    id: 'miami',
    name: 'University of Miami',
    location: 'Coral Gables, FL',
    mascot: 'The Hurricanes',
    color: 'from-[#005030] to-[#F47321]',
    glow: 'shadow-[#F47321]/40',
    description: "It's all about the U. Where academic excellence meets the vibrant energy of the tropics.",
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Miami_Hurricanes_logo.svg/800px-Miami_Hurricanes_logo.svg.png',
    bgImage: 'https://images.unsplash.com/photo-1510009489794-352fba394c21?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'pitt',
    name: 'University of Pittsburgh',
    location: 'Pittsburgh, PA',
    mascot: 'The Panthers',
    color: 'from-[#003594] to-[#FFB81C]',
    glow: 'shadow-[#FFB81C]/40',
    description: "Hail to Pitt. A historic powerhouse of research and innovation in the Steel City.",
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Pittsburgh_Panthers_logo_%282019%29.svg/800px-Pittsburgh_Panthers_logo_%282019%29.svg.png',
    bgImage: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'jcu',
    name: 'John Carroll University',
    location: 'University Heights, OH',
    mascot: 'Blue Streaks',
    color: 'from-[#004B8D] to-[#F2C75C]',
    glow: 'shadow-[#004B8D]/40',
    description: "Inspiring intellect and character. Developing leaders who serve the world.",
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/78/John_Carroll_Blue_Streaks_logo.svg/800px-John_Carroll_Blue_Streaks_logo.svg.png',
    bgImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1000&auto=format&fit=crop'
  }
];

// Stack Card Component
const StackCard = ({ item }: { item: typeof STACK_ITEMS[0] }) => (
  <div className="w-full h-full bg-[#0a0a0a] rounded-2xl border border-white/10 overflow-hidden relative group">
      <div className={`absolute top-0 left-0 right-0 h-48 bg-gradient-to-b ${item.color} opacity-20 group-hover:opacity-30 transition-opacity duration-500`}></div>
      <div className="absolute top-12 left-1/2 -translate-x-1/2">
         <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg ${item.glow} group-hover:scale-110 transition-transform duration-500`}>
            {item.icon}
         </div>
      </div>
      <div className="absolute bottom-0 w-full p-6 text-center">
         <h3 className="text-2xl font-bold text-white mb-1">{item.name}</h3>
         <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] tracking-widest uppercase text-gray-400 mb-4">
            {item.model}
         </div>
         <p className="text-gray-400 text-sm leading-relaxed">
            {item.description}
         </p>
      </div>
  </div>
);

// Origins Card Component
const OriginsCard = ({ item }: { item: typeof ORIGINS_ITEMS[0] }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="w-full h-full bg-[#0a0a0a] rounded-2xl border border-white/10 overflow-hidden relative group">
        {item.bgImage && (
            <div className="absolute inset-0 z-0">
                <img
                    src={item.bgImage}
                    alt="campus"
                    className="w-full h-full object-cover opacity-20 group-hover:opacity-35 transition-opacity duration-700 grayscale mix-blend-luminosity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent"></div>
            </div>
        )}
        <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-40 group-hover:opacity-60 transition-opacity duration-500 z-0 mix-blend-overlay`}></div>
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] z-0"></div>
        <div className="absolute top-6 right-6 z-10">
            <div className="bg-black/40 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold text-white shadow-sm flex items-center gap-1">
              <GraduationCap size={10} />
              {item.location}
            </div>
        </div>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className={`w-40 h-40 rounded-full border-4 border-white/10 bg-white/10 backdrop-blur-md flex items-center justify-center shadow-2xl ${item.glow} group-hover:scale-105 transition-transform duration-500 p-6`}>
              {!imgError ? (
                <img
                    src={item.logo}
                    alt={item.name}
                    className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                    onError={() => setImgError(true)}
                />
              ) : (
                <span className="text-3xl font-black text-white tracking-widest">
                  {item.name.substring(0, 3).toUpperCase()}
                </span>
              )}
          </div>
        </div>
        <div className="absolute bottom-0 w-full p-8 text-center bg-gradient-to-t from-black via-black/90 to-transparent pt-20 z-10">
          <h3 className="text-3xl font-black text-white mb-2 uppercase tracking-tight italic leading-none drop-shadow-lg">{item.name}</h3>
          <div className="text-white/80 font-bold text-sm mb-4 uppercase tracking-[0.2em] opacity-90">{item.mascot}</div>
          <p className="text-gray-300 text-sm leading-relaxed font-serif italic opacity-90">
              "{item.description}"
          </p>
        </div>
    </div>
  );
};

export default function LandingPage() {
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('latest');

  const lastScrollTime = useRef(0);
  const touchStartX = useRef(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadCards = async () => {
      setLoading(true);
      try {
        const cards = await getSocialCards();
        setPosts(cards);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    loadCards();
  }, []);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setCurrentIndex(0);
  };

  const currentItems = activeTab === 'latest' ? posts : activeTab === 'stack' ? STACK_ITEMS : ORIGINS_ITEMS;

  // Wheel + touch swipe event handling
  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    const navigate = (direction: 1 | -1) => {
      const now = Date.now();
      if (now - lastScrollTime.current < 200) return;
      if (currentItems.length === 0) return;
      lastScrollTime.current = now;
      setCurrentIndex(prev =>
        direction > 0
          ? (prev + 1) % currentItems.length
          : (prev - 1 + currentItems.length) % currentItems.length
      );
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (Math.abs(e.deltaY) > 10) {
        navigate(e.deltaY > 0 ? 1 : -1);
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
    };

    const onTouchEnd = (e: TouchEvent) => {
      const deltaX = touchStartX.current - e.changedTouches[0].clientX;
      if (Math.abs(deltaX) > 40) {
        navigate(deltaX > 0 ? 1 : -1);
      }
    };

    container.addEventListener('wheel', onWheel, { passive: false });
    container.addEventListener('touchstart', onTouchStart, { passive: true });
    container.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      container.removeEventListener('wheel', onWheel);
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchend', onTouchEnd);
    };
  }, [currentItems.length]);

  const getCardStyle = (index: number) => {
    if (currentItems.length === 0) return {};
    const total = currentItems.length;
    let diff = (index - currentIndex + total) % total;
    if (diff > total / 2) diff -= total;
    const absDiff = Math.abs(diff);
    if (absDiff > 2) return { opacity: 0, display: 'none' };
    const scale = absDiff === 0 ? 1 : 0.95;
    const opacity = absDiff <= 1 ? 1 : 0.6;
    const zIndex = 10 - absDiff;
    const translateX = diff * 105;
    const rotateY = diff * -5;
    return {
      transform: `translateX(${translateX}%) scale(${scale}) perspective(1000px) rotateY(${rotateY}deg)`,
      opacity,
      zIndex,
      filter: absDiff === 0 ? 'none' : 'brightness(0.7) blur(1px)',
      transition: 'all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
      position: 'absolute' as const,
      left: '50%',
      width: '340px',
      marginLeft: '-170px',
    };
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden flex flex-col">

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 group cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-teal-500/20">JP</div>
            <span className="text-lg font-bold tracking-widest text-white group-hover:opacity-80 transition-opacity">JP.AI</span>
          </a>

          <div className="hidden md:flex items-center gap-12 text-gray-400">
            <div className="flex items-center gap-3 group select-none">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg"
                alt="USA"
                className="w-8 h-auto object-contain shadow-sm opacity-80 group-hover:opacity-100 transition-opacity"
              />
              <span className="font-handwriting text-3xl mt-1 text-white group-hover:text-teal-400 transition-colors">Welcome</span>
            </div>
            <div className="flex items-center gap-3 group select-none">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Portugal.svg"
                alt="Portugal"
                className="w-8 h-auto object-contain shadow-sm opacity-80 group-hover:opacity-100 transition-opacity"
              />
              <span className="font-handwriting text-3xl mt-1 text-white group-hover:text-teal-400 transition-colors">Bemvindo</span>
            </div>
          </div>

          <Link
            to="/login"
            className="bg-white/5 text-white border border-white/10 px-6 py-2 rounded-full font-medium text-xs hover:bg-teal-500 hover:border-teal-500 hover:text-black transition-all flex items-center gap-2 group"
          >
            <Lock size={12} className="group-hover:text-black transition-colors" />
            Log in
          </Link>
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-start pt-32 pb-20 px-4 relative">

        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-b from-teal-900/10 to-transparent rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-40 left-0 w-[600px] h-[600px] bg-gradient-to-b from-blue-900/10 to-transparent rounded-full blur-[100px] pointer-events-none" />

        {/* HERO SECTION */}
        <div className="w-full max-w-5xl mx-auto mb-20 mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10 px-4">

          {/* Left Column: Text */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">

            {/* JP.AI Wordmark — replace with your logo file if you have one */}
            <div className="relative mb-8 w-full max-w-[280px] md:max-w-[360px] aspect-video bg-gradient-to-br from-teal-950/40 to-blue-950/40 border border-white/10 rounded-lg flex items-center justify-center overflow-hidden group">
              <div className="text-center">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-teal-500/30">JP</div>
                  <span className="text-2xl font-bold tracking-[0.3em] text-white">JP.AI</span>
                </div>
                <p className="text-gray-500 text-[10px] uppercase tracking-[0.25em] font-mono">Creative Technologist</p>
              </div>
              {/* Subtle corner accents */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-teal-400/40 rounded-tl"></div>
              <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-teal-400/40 rounded-tr"></div>
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-teal-400/40 rounded-bl"></div>
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-teal-400/40 rounded-br"></div>
            </div>

            <div className="space-y-4">
              <h2 className="text-white text-3xl md:text-5xl font-bold tracking-tight leading-tight">
                I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">J. Paulo Coelho</span>
              </h2>

              <div className="flex items-center justify-center lg:justify-start gap-4">
                <span className="text-teal-400 text-xl md:text-2xl font-bold">Creative Technologist</span>
                <div className="h-[2px] bg-gray-700 w-16 hidden lg:block"></div>
              </div>

              <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-lg mx-auto lg:mx-0">
                {/* TODO: Replace with your real bio */}
                Frontend developer and creative technologist obsessed with the intersection of design and AI.
                I build things that look good, feel fast, and think smart — from React interfaces to generative pipelines.
              </p>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="relative flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-teal-500/10 blur-[80px] rounded-full pointer-events-none"></div>
            <div className="relative w-[240px] h-[240px] md:w-[360px] md:h-[360px] group">
              <div className="absolute inset-0 rounded-full border-2 border-teal-400 shadow-[0_0_30px_rgba(45,212,191,0.4)] transition-all duration-500 group-hover:shadow-[0_0_50px_rgba(45,212,191,0.6)]"></div>
              <div className="absolute inset-3 rounded-full overflow-hidden border-[6px] border-[#050505] shadow-2xl relative bg-[#0a0a0a] z-10">
                {/* TODO: Replace src with your own photo path e.g. src="/profile.jpg" */}
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop"
                  alt="J. Paulo Coelho"
                  className="w-full h-full object-cover object-top grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/40 via-transparent to-transparent opacity-60 mix-blend-overlay"></div>
              </div>
            </div>
          </div>

        </div>

        {/* Tab Switcher */}
        <div className="w-full max-w-2xl mx-auto mb-16 relative z-20">
          <div className="flex bg-white/5 p-1 rounded-full border border-white/10 backdrop-blur-sm">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex-1 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-teal-500 text-black shadow-lg shadow-teal-500/20'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Carousel */}
        <div
          ref={carouselRef}
          className="relative w-full max-w-[90%] mx-auto h-[600px] flex items-center justify-center perspective-[2000px] overflow-hidden"
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {activeTab === 'latest' && loading ? (
              <div className="flex flex-col items-center justify-center h-full space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-teal-400 blur-xl opacity-20 animate-pulse rounded-full"></div>
                  <Loader2 size={48} className="text-teal-400 animate-spin relative z-10" />
                </div>
                <span className="text-gray-500 font-mono text-xs tracking-[0.2em] uppercase animate-pulse">Loading...</span>
              </div>
            ) : currentItems.length === 0 ? (
              <div className="text-center opacity-30 select-none">
                <p>Content Offline.</p>
              </div>
            ) : (
              currentItems.map((item, index) => {
                const style = getCardStyle(index);
                if (style.display === 'none') return null;
                return (
                  <div
                    key={item.id}
                    style={style}
                    className="cursor-pointer"
                    onClick={() => setCurrentIndex(index)}
                  >
                    <div className="relative rounded-2xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.8)] border border-white/10 bg-[#111] h-[500px]">
                      {activeTab === 'latest' ? (
                        <>
                          <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-tr from-white/10 to-transparent opacity-30 mix-blend-overlay"></div>
                          <SocialCard post={item as SocialPost} />
                        </>
                      ) : activeTab === 'stack' ? (
                        <StackCard item={item as typeof STACK_ITEMS[0]} />
                      ) : (
                        <OriginsCard item={item as typeof ORIGINS_ITEMS[0]} />
                      )}
                    </div>
                    <div className="absolute top-full left-0 right-0 h-32 bg-gradient-to-b from-white/10 to-transparent transform scale-y-[-0.3] opacity-30 blur-md pointer-events-none mask-image-fade translate-y-2"></div>
                  </div>
                );
              })
            )}
          </div>

          {!loading && currentItems.length > 0 && (
            <div className="absolute bottom-12 right-10 flex flex-col items-center text-gray-600 text-[10px] uppercase tracking-widest gap-1 animate-pulse pointer-events-none">
              <div className="w-[1px] h-8 bg-gradient-to-b from-transparent via-gray-500 to-transparent"></div>
              <span>Scroll</span>
            </div>
          )}
        </div>

        {/* Footer features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto mt-12 w-full text-center md:text-left px-4 border-t border-white/5 pt-16">
          <div className="space-y-4">
            <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center mx-auto md:mx-0">
              <Code2 size={20} className="text-gray-300" />
            </div>
            <h3 className="text-lg font-bold text-white">The Stack</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Built with React 19, Vite, Tailwind CSS, and a curated set of AI tools for everything from code to creative work.
            </p>
          </div>
          <div className="space-y-4">
            <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center mx-auto md:mx-0">
              <Globe size={20} className="text-gray-300" />
            </div>
            <h3 className="text-lg font-bold text-white">About Me</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              I'm J. Paulo, a creative technologist bridging the gap between design and artificial intelligence.
            </p>
          </div>
          <div className="space-y-4">
            <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center mx-auto md:mx-0">
              <Mail size={20} className="text-gray-300" />
            </div>
            <h3 className="text-lg font-bold text-white">Contact</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Open for collaborations and coffee.
            </p>
          </div>
        </div>

        <footer className="mt-20 text-center text-xs text-gray-800 uppercase tracking-widest">
          © {new Date().getFullYear()} J. Paulo Coelho. All Systems Operational.
        </footer>

      </main>
    </div>
  );
}
