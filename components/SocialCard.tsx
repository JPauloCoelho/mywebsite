import React from 'react';
import { Platform, SocialPost } from '../types';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  MoreHorizontal, 
  Repeat2, 
  Bookmark, 
  ThumbsUp, 
  Send, 
  CheckCircle2,
  MapPin,
  Ghost,
  Linkedin,
  Instagram,
  Facebook,
  Pin,
  Globe,
  BarChart2,
  Search,
  Menu
} from 'lucide-react';

interface SocialCardProps {
  post: SocialPost;
}

// ---------------------------------------------------------------------------
// Custom Icons
// ---------------------------------------------------------------------------

const XLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const ESPNLogo = ({ className }: { className?: string }) => (
  <div className={`relative inline-block ${className}`}>
      {/* Base Text */}
      <span className="font-[900] italic text-[#CC0000] text-2xl tracking-tighter leading-none select-none" style={{ fontFamily: 'Impact, sans-serif' }}>
          ESPN
      </span>
      {/* The Signature Slit */}
      <div className="absolute top-[7px] left-0 w-full h-[2.5px] bg-white pointer-events-none"></div>
  </div>
);

// ---------------------------------------------------------------------------
// Sub-components for specific platform styling
// ---------------------------------------------------------------------------

const LinkedInCard: React.FC<{ post: SocialPost }> = ({ post }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden font-sans h-full flex flex-col">
    <div className="p-3 pb-1 flex justify-between items-start">
      <div className="flex gap-3 relative">
        <img src={post.avatarUrl} alt={post.authorName} className="w-12 h-12 rounded-full object-cover border border-gray-100" />
        <div className="flex flex-col">
          <div className="flex items-center gap-1 group cursor-pointer">
            <span className="font-bold text-gray-900 text-sm hover:text-blue-600 hover:underline decoration-1">{post.authorName}</span>
            <span className="text-gray-500 text-xs">• 2nd</span>
          </div>
          <span className="text-xs text-gray-500 leading-tight line-clamp-1">{post.profession || 'Professional'}</span>
          <div className="flex items-center gap-1 mt-0.5">
             <span className="text-[10px] text-gray-400">{post.timestamp} • </span>
             <Globe size={10} className="text-gray-400" />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
           {/* Follow Button */}
           <button className="flex items-center gap-1 text-[#0a66c2] font-semibold text-xs hover:bg-blue-50 px-2 py-1 rounded transition-colors">
              + Follow
           </button>
      </div>
    </div>
    
    <div className="px-3 py-2 flex-1">
      <p className="text-sm text-gray-900 whitespace-pre-line mb-2 leading-relaxed">{post.content}</p>
      {post.imageUrl && (
        <div className="mt-2 rounded-none -mx-3 border-t border-b border-gray-100">
           <img src={post.imageUrl} alt="Post content" className="w-full h-48 object-cover" />
        </div>
      )}
    </div>

    <div className="px-3 pt-1">
        <div className="flex items-center gap-1 mb-2">
            <div className="flex -space-x-1">
                <div className="bg-[#1485BD] rounded-full p-0.5 z-10 border border-white"><ThumbsUp size={8} className="text-white" fill="white"/></div>
                <div className="bg-[#599B76] rounded-full p-0.5 z-0 border border-white"><Heart size={8} className="text-white" fill="white"/></div>
            </div>
            <span className="text-xs text-gray-500 hover:text-blue-600 hover:underline cursor-pointer ml-1">{post.likes} • {post.comments} comments</span>
        </div>
    </div>

    <div className="px-1 py-1 flex justify-between border-t border-gray-100 bg-white">
      <ActionButton icon={<ThumbsUp size={16} className="text-gray-500 group-hover:text-gray-600"/>} label="Like" />
      <ActionButton icon={<MessageCircle size={16} className="text-gray-500 group-hover:text-gray-600"/>} label="Comment" />
      <ActionButton icon={<Repeat2 size={16} className="text-gray-500 group-hover:text-gray-600"/>} label="Repost" />
      <ActionButton icon={<Send size={16} className="text-gray-500 group-hover:text-gray-600"/>} label="Send" />
    </div>
    
    {/* LinkedIn Logo Overlay */}
    <div className="absolute top-3 right-3 text-[#0a66c2]">
        <Linkedin size={20} fill="currentColor" />
    </div>
  </div>
);

const InstagramCard: React.FC<{ post: SocialPost }> = ({ post }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-full flex flex-col font-sans">
    <div className="p-2.5 flex justify-between items-center">
      <div className="flex items-center gap-2.5">
        <div className="p-[2px] bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] rounded-full">
          <img src={post.avatarUrl} alt={post.authorName} className="w-7 h-7 rounded-full border border-white object-cover" />
        </div>
        <div className="flex flex-col">
            <div className="flex items-center gap-1">
                <span className="text-xs font-semibold leading-none text-gray-900">{post.authorHandle.replace('@','')}</span>
                {post.verified && <div className="bg-blue-500 rounded-full w-3 h-3 flex items-center justify-center"><CheckCircle2 size={8} className="text-white" /></div>}
            </div>
            {post.imageUrl && <span className="text-[10px] text-gray-500 leading-none mt-0.5">Original Audio</span>}
        </div>
      </div>
      <MoreHorizontal size={20} className="text-gray-800" />
    </div>
    
    <div className="relative aspect-square bg-gray-50 shrink-0 border-t border-b border-gray-50">
      <img src={post.imageUrl || post.avatarUrl} alt="Post" className="w-full h-full object-cover" />
      {/* Tag indicator */}
      <div className="absolute bottom-3 left-3 bg-black/50 rounded-full p-1">
        <div className="w-3 h-3 bg-white rounded-full flex items-center justify-center text-[8px] font-bold">User</div>
      </div>
    </div>

    <div className="p-3 flex-1 flex flex-col">
      <div className="flex justify-between mb-2.5">
        <div className="flex gap-4">
          <Heart size={24} className="text-gray-800 hover:text-red-500 hover:fill-red-500 transition-colors cursor-pointer" strokeWidth={1.5} />
          <MessageCircle size={24} className="text-gray-800 -rotate-90" strokeWidth={1.5} />
          <Send size={24} className="text-gray-800" strokeWidth={1.5} />
        </div>
        <Bookmark size={24} className="text-gray-800" strokeWidth={1.5} />
      </div>
      <p className="text-xs font-semibold mb-1 text-gray-900">{post.likes.toLocaleString()} likes</p>
      <div className="text-xs text-gray-900 line-clamp-2 leading-relaxed">
        <span className="font-semibold mr-1.5">{post.authorHandle.replace('@','')}</span>
        {post.content}
      </div>
      <span className="text-[10px] text-gray-400 uppercase mt-2 tracking-wide">{post.timestamp}</span>
    </div>
  </div>
);

const XCard: React.FC<{ post: SocialPost }> = ({ post }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 cursor-pointer h-full flex flex-col relative font-sans">
    
    {/* X Logo */}
    <div className="absolute top-4 right-4 text-black">
        <XLogo className="w-5 h-5" />
    </div>

    <div className="flex gap-3 h-full">
      <img src={post.avatarUrl} alt={post.authorName} className="w-10 h-10 rounded-full object-cover shrink-0 hover:opacity-90" />
      <div className="flex-1 min-w-0 flex flex-col">
        <div className="flex items-center justify-between pr-8">
            <div className="flex items-center gap-1 text-[15px] truncate leading-tight">
                <span className="font-bold text-gray-900 hover:underline">{post.authorName}</span>
                {post.verified && <div className="bg-[#1d9bf0] rounded-full p-[1px]"><CheckCircle2 size={12} className="text-white" fill="white" strokeWidth={0} /></div>}
                <span className="text-gray-500 text-[14px] ml-0.5 truncate">{post.authorHandle}</span>
                <span className="text-gray-500 text-[14px]">· {post.timestamp.replace(' ago','')}</span>
            </div>
        </div>
        
        <p className="text-[#0f1419] text-[15px] mt-1 mb-2 whitespace-pre-wrap leading-normal flex-1">{post.content}</p>
        
        {post.imageUrl && (
          <div className="rounded-2xl overflow-hidden border border-gray-100 mb-3 shrink-0">
            <img src={post.imageUrl} alt="X media" className="w-full h-full object-cover max-h-52" />
          </div>
        )}

        <div className="flex justify-between text-gray-500 max-w-[90%] mt-auto pt-1">
          <ActionIcon icon={<MessageCircle size={18} strokeWidth={1.75} />} count={post.comments} color="hover:text-[#1d9bf0] hover:bg-blue-50" />
          <ActionIcon icon={<Repeat2 size={18} strokeWidth={1.75} />} count={post.shares} color="hover:text-[#00ba7c] hover:bg-green-50" />
          <ActionIcon icon={<Heart size={18} strokeWidth={1.75} />} count={post.likes} color="hover:text-[#f91880] hover:bg-pink-50" />
          <ActionIcon icon={<BarChart2 size={18} strokeWidth={1.75} />} count={Math.floor(post.likes * 12.5)} color="hover:text-[#1d9bf0] hover:bg-blue-50" />
          <div className="flex items-center group cursor-pointer hover:text-[#1d9bf0] hover:bg-blue-50 p-1.5 rounded-full transition-colors">
              <Share2 size={18} strokeWidth={1.75} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const FacebookCard: React.FC<{ post: SocialPost }> = ({ post }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden h-full flex flex-col font-sans">
    <div className="p-3 flex justify-between items-start">
      <div className="flex gap-2">
        <div className="relative">
             <img src={post.avatarUrl} alt={post.authorName} className="w-10 h-10 rounded-full border border-gray-200 object-cover" />
             <div className="absolute -bottom-1 -right-1 bg-[#1877F2] rounded-full p-0.5 border-2 border-white">
                <Facebook size={10} className="text-white" fill="currentColor"/>
             </div>
        </div>
        <div>
          <h4 className="font-semibold text-sm text-[#050505] leading-tight hover:underline cursor-pointer">{post.authorName}</h4>
          <div className="flex items-center gap-1 text-[12px] text-gray-500 mt-0.5">
            <span className="hover:underline cursor-pointer">{post.timestamp}</span> • <Globe size={10} />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 text-gray-500">
        <MoreHorizontal size={20} />
      </div>
    </div>

    <div className="px-3 pb-2 text-[15px] text-[#050505] line-clamp-4 mb-2 flex-1 font-normal">{post.content}</div>

    {post.imageUrl && (
      <div className="bg-gray-100 shrink-0 border-t border-b border-gray-100 relative">
          <img src={post.imageUrl} alt="Post" className="w-full h-56 object-cover" />
      </div>
    )}

    <div className="px-3 py-2 mt-auto">
      <div className="flex justify-between items-center text-[13px] text-gray-500 pb-2.5 border-b border-gray-200">
        <div className="flex items-center gap-1.5">
            <div className="bg-[#1877F2] rounded-full p-1"><ThumbsUp size={10} className="text-white" fill="white"/></div>
            <span>{post.likes}</span>
        </div>
        <div className="flex gap-3 hover:underline cursor-pointer">
            <span>{post.comments} comments</span>
            <span>{post.shares} shares</span>
        </div>
      </div>
      <div className="flex justify-between mt-1 pt-1 px-2">
        <ActionButton icon={<ThumbsUp size={18} />} label="Like" />
        <ActionButton icon={<MessageCircle size={18} />} label="Comment" />
        <ActionButton icon={<Share2 size={18} />} label="Share" />
      </div>
    </div>
  </div>
);

const PinterestCard: React.FC<{ post: SocialPost }> = ({ post }) => (
    <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden group cursor-pointer relative break-inside-avoid h-full flex flex-col font-sans">
        {/* Overlay Hover Elements */}
        <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
             <button className="bg-[#E60023] text-white px-5 py-3 rounded-full font-bold text-sm hover:bg-[#ad081b] shadow-md">Save</button>
        </div>
        <div className="absolute bottom-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
             <button className="bg-white p-2 rounded-full text-black hover:bg-gray-100 shadow-md"><Share2 size={16}/></button>
             <button className="bg-white p-2 rounded-full text-black hover:bg-gray-100 shadow-md"><MoreHorizontal size={16}/></button>
        </div>
        
        <div className="relative flex-1 overflow-hidden bg-gray-100">
             <img src={post.imageUrl || post.avatarUrl} alt="Pin" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
             <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>
        <div className="p-3 shrink-0">
            <p className="text-sm font-semibold text-gray-900 leading-tight mb-2 line-clamp-2">{post.content}</p>
            <div className="flex items-center gap-2">
                <img src={post.avatarUrl} className="w-6 h-6 rounded-full object-cover" alt="author"/>
                <span className="text-xs text-gray-700 font-medium">{post.authorName}</span>
            </div>
        </div>
        
        {/* Pinterest Logo */}
         <div className="absolute top-4 left-4 z-20 bg-white/90 p-1.5 rounded-full shadow-sm">
             <Pin className="text-[#E60023]" size={16} fill="currentColor" />
        </div>
    </div>
);

const SnapchatCard: React.FC<{ post: SocialPost }> = ({ post }) => (
    <div className="bg-[#111] rounded-2xl overflow-hidden relative text-white h-full flex flex-col justify-end shadow-xl border border-gray-800 font-sans">
        {post.imageUrl ? (
            <img src={post.imageUrl} className="absolute inset-0 w-full h-full object-cover opacity-90" alt="Snap"/>
        ) : (
             <div className="absolute inset-0 bg-gradient-to-b from-[#9b51e0] to-[#f2c94c]"></div>
        )}
        
        {/* UI Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none"></div>

        <div className="absolute top-4 left-4 flex gap-2 items-center z-10 w-full pr-14">
            <div className="w-9 h-9 rounded-full bg-gray-200/20 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/20">
                <div className="w-7 h-7 rounded-full bg-[#FFFC00] flex items-center justify-center">
                    <Ghost size={16} className="text-black" fill="white" />
                </div>
            </div>
            <div className="flex flex-col drop-shadow-md">
                 <span className="font-bold text-sm leading-none text-white tracking-wide">{post.authorName}</span>
                 <span className="text-[11px] text-gray-200 mt-0.5 font-medium">{post.timestamp}</span>
            </div>
        </div>
        
        <div className="relative z-10 p-4 pb-6">
             {/* Text Bar */}
             <div className="bg-black/60 backdrop-blur-md px-4 py-3 rounded-2xl mb-4 w-full">
                <p className="text-sm font-medium leading-snug text-center">{post.content}</p>
             </div>
             
             {/* Chat / Reply Input Simulation */}
             <div className="flex items-center gap-3">
                 <div className="h-10 flex-1 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm flex items-center px-4 hover:bg-white/20 transition-colors cursor-pointer">
                    <span className="text-xs font-bold tracking-wide text-white">Chat</span>
                 </div>
                 <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/40">
                    <Heart size={20} className="text-white" />
                 </div>
                 <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/40">
                    <Share2 size={20} className="text-white" />
                 </div>
             </div>
        </div>
    </div>
);

const ESPNCard: React.FC<{ post: SocialPost }> = ({ post }) => (
  <div className="bg-[#f2f2f2] rounded-lg shadow-sm border border-gray-300 overflow-hidden h-full flex flex-col font-sans relative group">
      {/* Authentic ESPN Top Header */}
      <div className="bg-white px-4 py-3 flex justify-between items-center border-b border-gray-200 h-14 shrink-0">
          <div className="flex items-center gap-3">
            <ESPNLogo className="scale-90 origin-left" />
          </div>
          <div className="flex items-center gap-4 text-gray-400">
             <Search size={18} strokeWidth={2.5} className="hover:text-[#CC0000] transition-colors cursor-pointer" />
             <Menu size={20} strokeWidth={2.5} className="hover:text-[#CC0000] transition-colors cursor-pointer" />
          </div>
      </div>

      {/* Main Image Area with Gradient Overlay */}
      <div className="relative w-full aspect-video bg-black shrink-0">
         <img src={post.imageUrl || post.avatarUrl} className="w-full h-full object-cover opacity-90" alt="Sport" />
         
         {/* Live Badge */}
         <div className="absolute top-0 left-0 w-full p-3 flex justify-between items-start">
             <div className="bg-[#CC0000] text-white text-[9px] font-black px-2 py-0.5 uppercase tracking-widest rounded-sm shadow-sm flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                LIVE
             </div>
         </div>

         {/* Bottom Gradient for Text Legibility if needed */}
         <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>

      {/* Content Body - News Style */}
      <div className="p-4 flex-1 flex flex-col bg-white relative">
          
          {/* Breaking Tag & Timestamp */}
          <div className="flex items-center gap-2 mb-2">
              <span className="text-[#CC0000] text-[10px] font-bold uppercase tracking-widest">
                Breaking News
              </span>
              <span className="text-gray-300 text-[10px]">•</span>
              <span className="text-gray-400 text-[10px] font-semibold">{post.timestamp}</span>
          </div>

          {/* Headline - Big and Bold */}
          <h3 className="text-[#2c2c2c] font-[800] text-xl leading-[1.2] mb-2 font-sans tracking-tight line-clamp-3 hover:text-[#CC0000] transition-colors cursor-pointer">
              {post.content}
          </h3>
          
          {/* Footer Info */}
          <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
              <div className="flex items-center gap-2">
                 <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wide">Analysis by {post.authorName}</span>
              </div>
              <div className="flex gap-4 text-gray-400">
                  <Bookmark size={16} className="hover:text-black transition-colors cursor-pointer" />
                  <Share2 size={16} className="hover:text-[#CC0000] transition-colors cursor-pointer" />
              </div>
          </div>
      </div>
  </div>
);


// ---------------------------------------------------------------------------
// Helper Components
// ---------------------------------------------------------------------------

const ActionButton: React.FC<{ icon: React.ReactNode, label: string }> = ({ icon, label }) => (
  <button className="flex-1 flex items-center justify-center gap-2 py-2 text-gray-500 hover:bg-gray-50 rounded-md transition-colors text-[13px] font-semibold group">
    {icon}
    <span className="hidden sm:inline group-hover:text-gray-600">{label}</span>
  </button>
);

const ActionIcon: React.FC<{ icon: React.ReactNode, count: number | null, color: string }> = ({ icon, count, color }) => (
  <div className={`flex items-center gap-1 group transition-colors ${color} cursor-pointer p-2 -ml-2 rounded-full`}>
    <div className="transition-colors">
      {icon}
    </div>
    {count !== null && <span className="text-[13px]">{count}</span>}
  </div>
);

// ---------------------------------------------------------------------------
// Main Card Switcher
// ---------------------------------------------------------------------------

export const SocialCard: React.FC<SocialCardProps> = ({ post }) => {
  switch (post.platform) {
    case Platform.LINKEDIN:
      return <LinkedInCard post={post} />;
    case Platform.INSTAGRAM:
      return <InstagramCard post={post} />;
    case Platform.TWITTER:
      return <XCard post={post} />;
    case Platform.FACEBOOK:
      return <FacebookCard post={post} />;
    case Platform.PINTEREST:
        return <PinterestCard post={post} />;
    case Platform.SNAPCHAT:
        return <SnapchatCard post={post} />;
    case Platform.ESPN:
        return <ESPNCard post={post} />;
    default:
      return <XCard post={post} />;
  }
};