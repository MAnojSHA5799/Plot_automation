import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
// import "leaflet/dist/leaflet.css";
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#060b26] p-6 text-slate-200">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
