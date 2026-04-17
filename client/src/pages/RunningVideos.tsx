import React, { useState } from 'react';
import { 
  Play, 
  Video, 
  MapPin, 
  Calendar, 
  Maximize2, 
  Search,
  Zap,
  Plane,
  Eye,
  X
} from 'lucide-react';

interface MediaItem {
  id: string;
  title: string;
  location: string;
  date: string;
  thumbnail: string;
  url: string;
  type: 'image' | 'video';
  category: 'Drone' | 'Site Visit' | 'Walkthrough';
  views: string;
}

const RunningVideos = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  const mediaItems: MediaItem[] = [
     {
      id: '3',
      title: 'Awadha Vihar Developer',
      location: 'Patna City',
      date: '17 Apr 2026',
      thumbnail: 'https://images.pexels.com/photos/101808/pexels-photo-101808.jpeg',
      url: 'https://res.cloudinary.com/dsgcusx1p/video/upload/v1776414257/WhatsApp_Video_2026-04-15_at_5.07.22_PM_online-video-cutter.com_s8eida.mp4',
      type: 'video',
      category: 'Walkthrough',
      views: '0K'
    },
    {
      id: '4',
      title: 'Awadha Vihar Developer',
      location: 'Patna, Bihar',
      date: '17 Apr 2026',
      thumbnail: 'https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg',
      url: 'https://res.cloudinary.com/dsgcusx1p/image/upload/v1776414518/Gemini_Generated_Image_ea8pyjea8pyjea8p_sfffyt.png',
      type: 'image',
      category: 'Drone',
      views: '1.8K'
    },
    {
      id: '1',
      title: 'Bihta Satellite Township - Aerial Drone View',
      location: 'Bihta, Patna',
      date: '15 Apr 2026',
      thumbnail: 'https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg',
      url: 'https://www.image2url.com/r2/default/videos/1776336359494-ded0dba9-8c0f-40ee-bd79-0ff5176c5f94.mp4',
      type: 'video',
      category: 'Drone',
      views: '1.2K'
    },
    {
      id: '2',
      title: 'Awadha Vihar Developer',
      location: 'Patna City',
      date: '15 Apr 2026',
      thumbnail: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg',
      url: 'https://www.image2url.com/r2/default/videos/1776336481058-10dacce6-81e4-4246-8365-13096cfd30a5.mp4',
      type: 'video',
      category: 'Site Visit',
      views: '850'
    },
  ];

  const filteredMedia = mediaItems.filter(m => 
    (activeCategory === 'All' || m.category === activeCategory) &&
    (m.title.toLowerCase().includes(searchQuery.toLowerCase()) || m.location.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-[#00d2ff]/10 rounded-lg text-[#00d2ff]">
              <Video size={20} />
            </div>
            <span className="text-[10px] font-black text-[#00d2ff] uppercase tracking-widest">Media Center</span>
          </div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tighter">Running Site Media</h1>
          <p className="text-slate-400 text-sm mt-1">Live updates and professional site tours of our active projects.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-hover:text-[#00d2ff] transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search projects..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#0a1235] border border-[#1e293b] rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:ring-2 focus:ring-[#00d2ff] outline-none w-64 transition-all"
            />
          </div>
          <button className="p-2.5 bg-[#0a1235] border border-[#1e293b] rounded-xl text-white hover:text-[#00d2ff] transition-colors">
            <Zap size={20} />
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {['All', 'Drone', 'Site Visit', 'Walkthrough'].map(cat => (
          <button 
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeCategory === cat 
              ? 'bg-[#00d2ff] text-[#0a1235] shadow-[0_0_20px_rgba(0,210,255,0.3)]' 
              : 'bg-[#0a1235] text-slate-400 hover:bg-[#1e293b] hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredMedia.map((item) => (
          <div key={item.id} className="group flex flex-col h-full bg-[#0a1235] rounded-3xl border border-[#1e293b] overflow-hidden hover:border-[#00d2ff]/50 transition-all duration-300 shadow-2xl">
            {/* Media Player / Thumbnail */}
            <div 
              className="relative aspect-video overflow-hidden cursor-pointer group"
              onClick={() => setSelectedMedia(item)}
            >
               {item.type === 'video' ? (
                 <video 
                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                   poster={item.thumbnail}
                 >
                   <source src={item.url} type="video/mp4" />
                   Your browser does not support the video tag.
                 </video>
               ) : (
                 <img 
                   src={item.url} 
                   alt={item.title}
                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                 />
               )}
               
               {/* Play/View Overlay */}
               <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-12 h-12 bg-[#00d2ff] rounded-full flex items-center justify-center text-[#0a1235] transform scale-0 group-hover:scale-100 transition-transform duration-300">
                    {item.type === 'video' ? <Play fill="currentColor" size={20} /> : <Eye size={20} />}
                  </div>
               </div>
               <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-[#00d2ff] text-[#0a1235] text-[10px] font-black uppercase rounded-full shadow-lg">
                    {item.category}
                  </span>
               </div>
               <div className="absolute bottom-4 right-4 flex gap-2">
                  <button 
                    className="p-2 bg-black/50 backdrop-blur-md rounded-lg text-white hover:text-[#00d2ff] transition-colors"
                    onClick={(e) => { e.stopPropagation(); setSelectedMedia(item); }}
                  >
                    <Maximize2 size={16} />
                  </button>
               </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4 flex flex-col flex-1">
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-[#00d2ff] transition-colors leading-tight mb-2">
                  {item.title}
                </h3>
                <div className="flex items-center gap-4 text-slate-500">
                  <div className="flex items-center gap-1">
                    <MapPin size={14} className="text-[#00d2ff]" />
                    <span className="text-xs font-medium">{item.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span className="text-xs font-medium">{item.date}</span>
                  </div>
                  <div className="flex items-center gap-1 ml-auto">
                    <Eye size={14} />
                    <span className="text-xs font-medium">{item.views}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#1e293b] mt-auto flex items-center justify-between">
                <div className="flex -space-x-2">
                   {[1,2,3].map(i => (
                     <div key={i} className="w-8 h-8 rounded-full bg-[#1e293b] border-2 border-[#0a1235] flex items-center justify-center text-[10px] font-bold text-white">
                        {String.fromCharCode(64 + i)}
                     </div>
                   ))}
                   <div className="w-8 h-8 rounded-full bg-[#00d2ff]/20 border-2 border-[#0a1235] flex items-center justify-center text-[10px] font-bold text-[#00d2ff]">
                      +4
                   </div>
                </div>
                <button className="flex items-center gap-2 text-xs font-bold text-[#00d2ff] hover:gap-3 transition-all">
                  VIEW DETAILS <Play size={12} fill="currentColor" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredMedia.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 bg-[#0a1235] rounded-3xl border border-[#1e293b] border-dashed">
          <div className="p-6 bg-[#1e293b] rounded-full text-slate-500 mb-4">
             <Video size={48} />
          </div>
          <h3 className="text-xl font-bold text-white">No media found</h3>
          <p className="text-slate-400 mt-2">Try adjusting your search or filters.</p>
          <button 
            onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
            className="mt-6 px-6 py-2 bg-[#00d2ff] text-[#0a1235] rounded-xl font-bold hover:shadow-[0_0_20px_rgba(0,210,255,0.4)] transition-all"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* Media Preview Modal */}
      {selectedMedia && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 animate-in fade-in zoom-in duration-300"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}
          onClick={() => setSelectedMedia(null)}
        >
          <div 
            className="relative w-full max-w-6xl aspect-video bg-[#0a1235] rounded-3xl overflow-hidden shadow-2xl border border-[#1e293b]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedMedia(null)}
              className="absolute top-6 right-6 z-10 p-3 bg-black/50 backdrop-blur-md rounded-full text-white hover:text-[#00d2ff] transition-all hover:rotate-90"
            >
              <X size={24} />
            </button>

            {/* Media Content */}
            <div className="w-full h-full flex items-center justify-center">
              {selectedMedia.type === 'video' ? (
                <video 
                  className="w-full h-full object-contain"
                  autoPlay
                  controls
                >
                  <source src={selectedMedia.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img 
                  src={selectedMedia.url} 
                  alt={selectedMedia.title}
                  className="w-full h-full object-contain"
                />
              )}
            </div>

            {/* Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black to-transparent">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <span className="px-3 py-1 bg-[#00d2ff] text-[#0a1235] text-[10px] font-black uppercase rounded-full mb-3 inline-block">
                    {selectedMedia.category}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
                    {selectedMedia.title}
                  </h2>
                  <div className="flex items-center gap-4 text-slate-300 mt-2">
                    <div className="flex items-center gap-1">
                      <MapPin size={16} className="text-[#00d2ff]" />
                      <span className="text-sm">{selectedMedia.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      <span className="text-sm">{selectedMedia.date}</span>
                    </div>
                  </div>
                </div>
                <button className="px-8 py-3 bg-[#00d2ff] text-[#0a1235] rounded-xl font-bold hover:shadow-[0_0_20px_rgba(0,210,255,0.4)] transition-all">
                  INQUIRE NOW
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default RunningVideos;