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
  Eye
} from 'lucide-react';

interface VideoItem {
  id: string;
  title: string;
  location: string;
  date: string;
  thumbnail: string;
  url: string;
  category: 'Drone' | 'Site Visit' | 'Walkthrough';
  views: string;
}

const RunningVideos = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const videos: VideoItem[] = [
    {
      id: '1',
      title: 'Bihta Satellite Township - Aerial Drone View',
      location: 'Bihta, Patna',
      date: '24 Mar 2024',
      thumbnail: 'https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg',
      url: 'https://image2url.com/r2/default/videos/1773905874478-dc4cf942-30e0-4ea1-ae7f-5822cb8334b6.mp4',
      category: 'Drone',
      views: '1.2K'
    },
    {
      id: '2',
      title: 'Patna Ring Road Phase-1 Site Visit',
      location: 'Patna City',
      date: '28 Mar 2024',
      thumbnail: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg',
     url: 'https://image2url.com/r2/default/videos/1773905874478-dc4cf942-30e0-4ea1-ae7f-5822cb8334b6.mp4',
      category: 'Site Visit',
      views: '850'
    },
    // {
    //   id: '3',
    //   title: 'Premium Plotting Project - Amli Tola',
    //   location: 'Muzaffarpur',
    //   date: '15 Mar 2024',
    //   thumbnail: 'https://images.pexels.com/photos/101808/pexels-photo-101808.jpeg',
    //   url: 'https://www.w3schools.com/html/mov_bbb.mp4',
    //   category: 'Walkthrough',
    //   views: '2.5K'
    // },
    // {
    //   id: '4',
    //   title: 'Gaya International Airport Extension Plots',
    //   location: 'Gaya, Bihar',
    //   date: '10 Mar 2024',
    //   thumbnail: 'https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg',
    //   url: 'https://www.w3schools.com/html/movie.mp4',
    //   category: 'Drone',
    //   views: '1.8K'
    // }
  ];

  const filteredVideos = videos.filter(v => 
    (activeCategory === 'All' || v.category === activeCategory) &&
    (v.title.toLowerCase().includes(searchQuery.toLowerCase()) || v.location.toLowerCase().includes(searchQuery.toLowerCase()))
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
          <h1 className="text-3xl font-black text-white uppercase tracking-tighter">Running Site Videos</h1>
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
        {filteredVideos.map((video) => (
          <div key={video.id} className="group flex flex-col h-full bg-[#0a1235] rounded-3xl border border-[#1e293b] overflow-hidden hover:border-[#00d2ff]/50 transition-all duration-300 shadow-2xl">
            {/* Video Player / Thumbnail */}
            <div className="relative aspect-video overflow-hidden">
               <video 
                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                 poster={video.thumbnail}
                 controls
               >
                 <source src={video.url} type="video/mp4" />
                 Your browser does not support the video tag.
               </video>
               <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-[#00d2ff] text-[#0a1235] text-[10px] font-black uppercase rounded-full shadow-lg">
                    {video.category}
                  </span>
               </div>
               <div className="absolute bottom-4 right-4 flex gap-2">
                  <button className="p-2 bg-black/50 backdrop-blur-md rounded-lg text-white hover:text-[#00d2ff] transition-colors">
                    <Maximize2 size={16} />
                  </button>
               </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4 flex flex-col flex-1">
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-[#00d2ff] transition-colors leading-tight mb-2">
                  {video.title}
                </h3>
                <div className="flex items-center gap-4 text-slate-500">
                  <div className="flex items-center gap-1">
                    <MapPin size={14} className="text-[#00d2ff]" />
                    <span className="text-xs font-medium">{video.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span className="text-xs font-medium">{video.date}</span>
                  </div>
                  <div className="flex items-center gap-1 ml-auto">
                    <Eye size={14} />
                    <span className="text-xs font-medium">{video.views}</span>
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
      {filteredVideos.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 bg-[#0a1235] rounded-3xl border border-[#1e293b] border-dashed">
          <div className="p-6 bg-[#1e293b] rounded-full text-slate-500 mb-4">
             <Video size={48} />
          </div>
          <h3 className="text-xl font-bold text-white">No videos found</h3>
          <p className="text-slate-400 mt-2">Try adjusting your search or filters.</p>
          <button 
            onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
            className="mt-6 px-6 py-2 bg-[#00d2ff] text-[#0a1235] rounded-xl font-bold hover:shadow-[0_0_20px_rgba(0,210,255,0.4)] transition-all"
          >
            Clear All Filters
          </button>
        </div>
      )}

    </div>
  );
};

export default RunningVideos;
