import React, { useState, useEffect } from 'react';
import { Bell, Search, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import socket from '../services/socket';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    socket.on('newLead', (lead) => {
      setNotifications(prev => [{ id: Date.now(), message: `New lead: ${lead.name}`, type: 'lead' }, ...prev]);
    });

    return () => {
      socket.off('newLead');
    };
  }, []);

  return (
    <header className="h-16 bg-[#060b26] border-b border-[#1e293b] flex items-center justify-between px-8 z-10">
      <div className="relative w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input 
          type="text" 
          placeholder="Search plots, leads, payments..." 
          className="w-full pl-10 pr-4 py-2 bg-[#0a1235] border border-[#1e293b] rounded-lg text-sm text-white focus:ring-2 focus:ring-[#00d2ff] outline-none"
        />
      </div>

      <div className="flex items-center gap-6">
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-slate-400 hover:bg-[#1e293b] rounded-lg relative"
          >
            <Bell size={20} />
            {notifications.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#060b26]"></span>
            )}
          </button>
          
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-[#0a1235] border border-[#1e293b] rounded-xl shadow-2xl p-2 z-50">
              <h3 className="text-sm font-bold px-4 py-2 border-b border-[#1e293b] text-white">Notifications</h3>
              <div className="max-h-64 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-4">No new notifications</p>
                ) : (
                  notifications.map(n => (
                    <div key={n.id} className="p-3 hover:bg-[#1e293b] rounded-lg cursor-pointer transition-colors">
                      <p className="text-sm text-slate-200">{n.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 border-l border-[#1e293b] pl-6 cursor-pointer group">
          <div className="text-right">
            <p className="text-sm font-bold text-white leading-none">{user?.username}</p>
            <p className="text-xs text-slate-400 mt-1">{user?.role}</p>
          </div>
          <div className="w-10 h-10 bg-[#1e293b] rounded-lg flex items-center justify-center text-[#00d2ff] group-hover:bg-[#00d2ff] group-hover:text-white transition-all shadow-inner">
            <User size={20} />
          </div>
          <button onClick={logout} className="p-2 text-slate-500 hover:text-red-400 transition-colors">
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
