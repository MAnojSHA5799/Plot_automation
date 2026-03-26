import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Map as MapIcon, 
  CreditCard, 
  Calendar, 
  BarChart3,
  Home
} from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { title: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/' },
    { title: 'Leads', icon: <Users size={20} />, path: '/leads' },
    { title: 'Plots', icon: <MapIcon size={20} />, path: '/plots' },
    { title: 'Payments', icon: <CreditCard size={20} />, path: '/payments' },
    { title: 'Site Visits', icon: <Calendar size={20} />, path: '/site-visits' },
    { title: 'Reports', icon: <BarChart3 size={20} />, path: '/reports' },
  ];

  return (
    <aside className="w-64 bg-[#0a1235] border-r border-[#1e293b] hidden md:flex flex-col">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-[#00d2ff] p-2 rounded-lg text-white shadow-[0_0_15px_rgba(0,210,255,0.3)]">
          <Home size={24} />
        </div>
        <span className="text-xl font-bold text-white">PlotManager</span>
      </div>
      
      <nav className="flex-1 px-4 py-4 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive 
                ? 'bg-[#1e293b] text-[#00d2ff] font-semibold border-l-4 border-[#00d2ff]' 
                : 'text-slate-400 hover:bg-[#1e293b] hover:text-white'
              }`
            }
          >
            {item.icon}
            <span>{item.title}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-[#1e293b]">
        <div className="bg-[#1e293b]/50 rounded-xl p-4">
          <p className="text-xs text-slate-400 font-medium">Need help?</p>
          <button className="text-sm text-[#00d2ff] font-semibold mt-1">Documentation</button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
