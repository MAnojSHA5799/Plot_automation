import React, { useState, useEffect } from 'react';
import { 
  Users, Search, Filter, Plus, MoreVertical, Globe, Facebook, HandMetal,
  Mail, Phone, Calendar, User as UserIcon, Trash2, Edit2, X, Check
} from 'lucide-react';
import api from '../services/api';
import socket from '../services/socket';

const Leads = () => {
  const [leads, setLeads] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    source: 'manual',
    status: 'new',
    assigned_to: '',
    campaign: '',
    adset: ''
  });

  const fetchLeads = async () => {
    try {
      const { data } = await api.get('/leads');
      setLeads(data);
    } catch (err) {
      console.error('Failed to fetch leads');
    }
  };

  useEffect(() => {
    fetchLeads();
    socket.on('newLead', (newLead) => {
      setLeads(prev => [newLead, ...prev]);
    });
    return () => {
      socket.off('newLead');
    };
  }, []);

  const handleOpenModal = (lead: any = null) => {
    if (lead) {
      setFormData({ ...lead });
      setIsEditing(true);
    } else {
      setFormData({
        name: '',
        phone: '',
        email: '',
        source: 'manual',
        status: 'new',
        assigned_to: '',
        campaign: '',
        adset: ''
      });
      setIsEditing(false);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await api.put(`/leads/${(formData as any).id}`, formData);
      } else {
        await api.post('/leads', formData);
      }
      fetchLeads();
      handleCloseModal();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      try {
        await api.delete(`/leads/${id}`);
        fetchLeads();
        if (selectedLead?.id === id) setSelectedLead(null);
      } catch (err) {
        alert('Delete failed');
      }
    }
  };

  const updateLeadStatus = async (id: string, status: string) => {
    try {
      await api.put(`/leads/${id}`, { status });
      fetchLeads();
      if (selectedLead?.id === id) setSelectedLead({ ...selectedLead, status });
    } catch (err) {
      alert('Status update failed');
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source?.toLowerCase()) {
      case 'facebook': return <Facebook className="text-blue-600" size={16} />;
      case 'website': return <Globe className="text-primary-600" size={16} />;
      default: return <HandMetal className="text-orange-500" size={16} />;
    }
  };

  const getStatusBadge = (status: string) => {
    const colors: any = {
      new: 'bg-blue-100 text-blue-700',
      contacted: 'bg-indigo-100 text-indigo-700',
      interested: 'bg-emerald-100 text-emerald-700',
      site_visit: 'bg-amber-100 text-amber-700',
      booked: 'bg-green-100 text-green-700',
      lost: 'bg-red-100 text-red-700',
    };
    return (
      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${colors[status?.toLowerCase()] || 'bg-gray-100'}`}>
        {status}
      </span>
    );
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) || lead.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || lead.status?.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Lead Management</h1>
          <p className="text-gray-500 mt-1">Full control over your property inquiries.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-primary-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-primary-700 shadow-lg shadow-primary-50 transition-all"
        >
          <Plus size={18} /> Add Manual Lead
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search leads..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none"
          />
        </div>
        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-gray-50 border-none rounded-xl text-sm py-2 px-4 focus:ring-2 focus:ring-primary-500 outline-none w-full md:w-auto"
        >
          <option value="all">All Status</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="interested">Interested</option>
          <option value="booked">Booked</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Lead Info</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Source</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50 transition-colors cursor-pointer group">
                  <td className="px-6 py-4" onClick={() => setSelectedLead(lead)}>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{lead.name}</p>
                      <p className="text-xs text-gray-400 mt-1">{lead.phone}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(lead.status)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      {getSourceIcon(lead.source)} {lead.source}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={(e) => { e.stopPropagation(); handleOpenModal(lead); }} className="p-2 text-gray-400 hover:text-primary-600"><Edit2 size={16} /></button>
                      <button onClick={(e) => { e.stopPropagation(); handleDelete(lead.id); }} className="p-2 text-gray-400 hover:text-red-500"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-300">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">{isEditing ? 'Edit Lead' : 'Add Manual Lead'}</h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-900"><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase">Full Name</label>
                  <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-gray-50 border-none rounded-xl py-2 px-3 text-sm focus:ring-2 focus:ring-primary-500 outline-none" placeholder="John Doe" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase">Phone Number</label>
                  <input required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-gray-50 border-none rounded-xl py-2 px-3 text-sm focus:ring-2 focus:ring-primary-500 outline-none" placeholder="9876543210" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase">Email Address</label>
                <input value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-gray-50 border-none rounded-xl py-2 px-3 text-sm focus:ring-2 focus:ring-primary-500 outline-none" placeholder="john@example.com" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase">Status</label>
                  <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full bg-gray-50 border-none rounded-xl py-2 px-3 text-sm focus:ring-2 focus:ring-primary-500 outline-none">
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="interested">Interested</option>
                    <option value="booked">Booked</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase">Assigned To</label>
                  <input value={formData.assigned_to} onChange={e => setFormData({...formData, assigned_to: e.target.value})} className="w-full bg-gray-50 border-none rounded-xl py-2 px-3 text-sm focus:ring-2 focus:ring-primary-500 outline-none" placeholder="Executive Name" />
                </div>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={handleCloseModal} className="px-6 py-2.5 rounded-xl text-sm font-bold text-gray-500 bg-gray-100 hover:bg-gray-200">Cancel</button>
                <button type="submit" className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-primary-600 hover:bg-primary-700">
                  {isEditing ? 'Save Changes' : 'Create Lead'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lead Detail View (Drawer Style) */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-end">
           <div className="w-full max-w-md bg-white shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                 <h2 className="text-xl font-bold text-gray-900">Lead Details</h2>
                 <button onClick={() => setSelectedLead(null)} className="text-gray-400 hover:text-gray-900"><X size={24} /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-8 space-y-8">
                 <div className="flex flex-col items-center">
                    <div className="w-24 h-24 bg-primary-50 rounded-3xl flex items-center justify-center text-primary-600 text-3xl font-bold mb-4">
                       {selectedLead.name.charAt(0)}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{selectedLead.name}</h3>
                    <p className="text-gray-500 mt-1">{selectedLead.phone}</p>
                    <div className="mt-4">{getStatusBadge(selectedLead.status)}</div>
                 </div>

                 <div className="space-y-6">
                    <div>
                       <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Update Status</label>
                       <div className="grid grid-cols-2 gap-2 mt-2">
                          {['new', 'contacted', 'interested', 'booked', 'lost'].map(s => (
                             <button 
                               key={s} 
                               onClick={() => updateLeadStatus(selectedLead.id, s)}
                               className={`px-3 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                                 selectedLead.status === s ? 'bg-primary-600 text-white shadow-lg shadow-primary-100' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                               }`}
                             >
                                {s}
                             </button>
                          ))}
                       </div>
                    </div>

                    <div className="p-6 bg-gray-50 rounded-3xl space-y-4">
                       <div>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Assigned Executive</p>
                          <p className="text-sm font-bold text-gray-900 mt-1">{selectedLead.assigned_to || 'Not assigned'}</p>
                       </div>
                       <div>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Source</p>
                          <p className="text-sm font-bold text-gray-900 mt-1 flex items-center gap-2">
                            {getSourceIcon(selectedLead.source)} {selectedLead.source}
                          </p>
                       </div>
                    </div>
                 </div>
              </div>
              <div className="p-8 border-t border-gray-50">
                 <button onClick={() => { handleOpenModal(selectedLead); setSelectedLead(null); }} className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold mb-4">Edit Lead Info</button>
                 <button onClick={() => handleDelete(selectedLead.id)} className="w-full text-red-600 font-bold py-2">Delete Lead</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Leads;
