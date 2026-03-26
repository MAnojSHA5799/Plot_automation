import React, { useState, useEffect } from 'react';
import { 
  Map as MapIcon, 
  Search, 
  Plus, 
  Trash2, 
  LayoutGrid, 
  List,
  ChevronRight
} from 'lucide-react';
import api from '../services/api';

const Plots = () => {
  const [plots, setPlots] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');

  useEffect(() => {
    const fetchPlots = async () => {
      try {
        const { data } = await api.get('/plots');
        setPlots(data);
      } catch (err) {
        console.error('Failed to fetch plots');
      }
    };
    fetchPlots();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'available': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'booked': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'sold': return 'bg-red-50 text-red-600 border-red-100';
      default: return 'bg-gray-50 text-gray-600 border-gray-100';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Plot Management</h1>
          <p className="text-gray-500 mt-1">Inventory and availability of all units.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white border border-gray-100 rounded-xl p-1 flex shadow-sm">
            <button 
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'table' ? 'bg-primary-50 text-primary-600' : 'text-gray-400'}`}
            >
              <List size={20} />
            </button>
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-primary-50 text-primary-600' : 'text-gray-400'}`}
            >
              <LayoutGrid size={20} />
            </button>
          </div>
          <button className="bg-primary-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-primary-700 shadow-lg shadow-primary-50">
            <Plus size={18} />
            Add New Plot
          </button>
        </div>
      </div>

      {viewMode === 'table' ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Plot Number</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Size</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Price (₹)</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Facing</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Options</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {plots.map((plot) => (
                <tr key={plot.id} className="hover:bg-gray-50 transition-all cursor-pointer">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3 font-bold text-gray-900">
                      <div className="bg-gray-100 p-2 rounded-lg text-gray-500">
                        <MapIcon size={16} />
                      </div>
                      {plot.plot_number}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-600">{plot.size}</td>
                  <td className="px-6 py-5 text-sm font-bold text-gray-900">₹{(plot.price / 100000).toFixed(1)} Lakh</td>
                  <td className="px-6 py-5 text-sm text-gray-600">{plot.facing}</td>
                  <td className="px-6 py-5">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold border ${getStatusColor(plot.status)}`}>
                      {plot.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="text-gray-400 hover:text-red-500 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
           {plots.map((plot) => (
             <div key={plot.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all group">
                <div className="flex items-start justify-between">
                   <div className="bg-primary-50 p-3 rounded-2xl text-primary-600">
                      <Home size={24} />
                   </div>
                   <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${getStatusColor(plot.status)}`}>
                      {plot.status}
                   </span>
                </div>
                <div className="mt-5">
                  <h3 className="text-xl font-bold text-gray-900">Plot {plot.plot_number}</h3>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400 font-medium">Size</span>
                      <span className="text-gray-900 font-bold">{plot.size}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400 font-medium">Facing</span>
                      <span className="text-gray-900 font-bold">{plot.facing}</span>
                    </div>
                    <div className="flex justify-between text-sm pt-2 border-t border-gray-50">
                      <span className="text-gray-400 font-medium">Price</span>
                      <span className="text-primary-600 font-bold">₹{(plot.price / 100000).toFixed(1)}L</span>
                    </div>
                  </div>
                </div>
                <button className="w-full mt-6 flex items-center justify-center gap-2 text-sm font-bold text-gray-900 py-3 bg-gray-50 rounded-xl group-hover:bg-primary-600 group-hover:text-white transition-all">
                  View Details <ChevronRight size={16} />
                </button>
             </div>
           ))}
        </div>
      )}
    </div>
  );
};

export default Plots;
