import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, User, CheckCircle, XCircle, Plus, Search } from 'lucide-react';
import api from '../services/api';

const SiteVisits = () => {
  const [visits, setVisits] = useState<any[]>([]);

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const { data } = await api.get('/site-visits');
        setVisits(data);
      } catch (err) {
        console.error('Failed to fetch site visits');
      }
    };
    fetchVisits();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'scheduled': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'completed': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'cancelled': return 'bg-red-50 text-red-600 border-red-100';
      default: return 'bg-gray-50 text-gray-600 border-gray-100';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Site Visits</h1>
          <p className="text-gray-500 mt-1">Schedule and track property visits with leads.</p>
        </div>
        <button className="bg-primary-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-primary-700 shadow-lg shadow-primary-50 transition-all">
          <Plus size={18} />
          Schedule Visit
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Visit Cards */}
        <div className="lg:col-span-2 space-y-4">
          {visits.map((visit) => (
            <div key={visit.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex items-start gap-6">
              <div className="bg-primary-50 p-4 rounded-2xl text-primary-600 hidden sm:flex">
                <Calendar size={28} />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{visit.lead_name}</h3>
                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                      <MapPin size={14} /> Visiting Plot: <span className="font-bold text-gray-700">{visit.plot_number}</span>
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(visit.status)}`}>
                    {visit.status}
                  </span>
                </div>
                
                <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-lg">
                    <Clock size={16} className="text-gray-400" />
                    {new Date(visit.visit_date).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                  </div>
                  {visit.notes && (
                    <div className="w-full mt-2 text-gray-500 italic p-3 bg-gray-50 rounded-xl border-l-4 border-primary-200">
                      "{visit.notes}"
                    </div>
                  )}
                </div>

                <div className="mt-6 flex gap-3">
                  <button className="text-xs font-bold text-emerald-600 bg-emerald-50 px-4 py-2 rounded-lg hover:bg-emerald-100 transition-colors flex items-center gap-1">
                    <CheckCircle size={14} /> Mark Completed
                  </button>
                  <button className="text-xs font-bold text-red-600 bg-red-50 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors flex items-center gap-1">
                    <XCircle size={14} /> Cancel Visit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar / Quick Actions */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4">Upcoming Schedule</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                  <Clock size={18} />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Today, 2:30 PM</p>
                  <p className="text-xs text-gray-500">Amit Shah (Plot B-201)</p>
                </div>
              </div>
              <div className="flex items-center gap-4 opacity-50">
                <div className="bg-gray-100 text-gray-600 p-2 rounded-lg">
                  <Clock size={18} />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Tomorrow, 11:00 AM</p>
                  <p className="text-xs text-gray-500">Rajesh K (Plot A-101)</p>
                </div>
              </div>
            </div>
            <button className="w-full mt-6 py-3 text-sm font-bold text-primary-600 bg-primary-50 rounded-xl hover:bg-primary-100 transition-all">
              View Calendar
            </button>
          </div>
          
          <div className="bg-gradient-to-br from-primary-600 to-indigo-700 p-6 rounded-2xl text-white shadow-xl shadow-primary-100">
            <h3 className="font-bold text-lg">Site Visit Analytics</h3>
            <div className="mt-4 space-y-4">
              <div className="flex justify-between items-end border-b border-white/10 pb-2">
                <span className="text-sm opacity-80">Completion Rate</span>
                <span className="text-xl font-bold">84%</span>
              </div>
              <div className="flex justify-between items-end border-b border-white/10 pb-2">
                <span className="text-sm opacity-80">Total Visits (MTD)</span>
                <span className="text-xl font-bold">128</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteVisits;
