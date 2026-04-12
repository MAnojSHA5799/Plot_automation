import React, { useState, useEffect } from 'react';
import { 
  Search, Plus, Trash2, Edit2, X, Upload, Calendar
} from 'lucide-react';
import api from '../services/api';
import socket from '../services/socket';
import * as XLSX from 'xlsx';

const Leads = () => {
  const [leads, setLeads] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [plots, setPlots] = useState<any[]>([]);
  const [scheduleData, setScheduleData] = useState({
    lead_id: '',
    plot_id: '',
    visit_date: '',
    notes: ''
  });
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    source: 'manual',
    status: 'new',
    assigned_to: '',
    campaign: '',
    adset: '',
    location: '',
    budget: ''
  });

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target?.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);
      
      const formattedData = data.map((row: any) => ({
        id: 'excel-' + Math.random().toString(36).substr(2, 9),
        name: row.Name || row.name || 'Unknown',
        email: row.Email || row.email || '-',
        phone: row.Phone || row.phone || row['Phone No'] || '-',
        location: row.Location || row.location || '-',
        budget: row.Budget || row.budget || '-',
        status: 'new',
        source: 'excel',
        created_at: new Date().toISOString()
      }));

      // Prepend imported data to show in table
      setLeads(prev => [...formattedData, ...prev]);
    };
    reader.readAsBinaryString(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const fetchLeads = async () => {
    try {
      const { data } = await api.get('/leads');
      console.log("30",data)
      setLeads(data);

    } catch (err) {
      console.error('Failed to fetch leads');
    }
  };

  const fetchPlots = async () => {
    try {
      const { data } = await api.get('/plots');
      setPlots(data);
    } catch (err) {
      console.error('Failed to fetch plots');
    }
  };

  useEffect(() => {
    fetchLeads();
    fetchPlots();
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
        adset: '',
        location: '',
        budget: ''
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

  const formatDate = (isoString?: string) => {
    if (!isoString) return '-';
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return '-';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleSelectLead = (id: string) => {
    setSelectedLeads(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedLeads.length === filteredLeads.length) {
      setSelectedLeads([]);
    } else {
      setSelectedLeads(filteredLeads.map(l => l.id));
    }
  };

  const handleOpenScheduleModal = (leadId?: string) => {
    setScheduleData({
      lead_id: leadId || selectedLeads[0] || '',
      plot_id: '',
      visit_date: '',
      notes: ''
    });
    setIsScheduleModalOpen(true);
  };

  const handleScheduleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/site-visits', scheduleData);
      setIsScheduleModalOpen(false);
      setSelectedLeads([]);
      alert('Site visit scheduled successfully');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Scheduling failed');
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) || lead.phone.includes(searchTerm);
    
    // Date Filtering
    let matchesDate = true;
    if (lead.created_at) {
      const leadDate = new Date(lead.created_at).getTime();
      if (startDate) {
        const start = new Date(startDate).setHours(0, 0, 0, 0);
        if (leadDate < start) matchesDate = false;
      }
      if (endDate) {
        const end = new Date(endDate).setHours(23, 59, 59, 999);
        if (leadDate > end) matchesDate = false;
      }
    }
    
    return matchesSearch && matchesDate;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Lead Management</h1>
          <p className="text-gray-400 mt-1">Full control over your property inquiries.</p>
        </div>
        <div className="flex gap-2">
          <input 
            type="file" 
            ref={fileInputRef} 
            accept=".xlsx, .xls, .csv" 
            onChange={handleFileUpload} 
            className="hidden" 
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="bg-green-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-green-700 shadow-lg shadow-green-50 transition-all"
          >
            <Upload size={18} /> Import Excel
          </button>
          <button 
            onClick={() => handleOpenModal()}
            className="bg-primary-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-primary-700 shadow-lg shadow-primary-50 transition-all"
          >
            <Plus size={18} /> Add Manual Lead
          </button>
          {selectedLeads.length > 0 && (
            <button 
              onClick={() => handleOpenScheduleModal()}
              className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-indigo-700 shadow-lg shadow-indigo-50 animate-in slide-in-from-right duration-300"
            >
              <Calendar size={18} /> Schedule Visit ({selectedLeads.length})
            </button>
          )}
        </div>
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
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm text-gray-900 focus:ring-2 focus:ring-primary-500 outline-none"
          />
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 uppercase ml-1 mb-1">Start Date</span>
            <input 
              type="date" 
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-gray-50 border-none rounded-xl text-xs text-gray-900 py-2 px-3 focus:ring-2 focus:ring-primary-500 outline-none"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 uppercase ml-1 mb-1">End Date</span>
            <input 
              type="date" 
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-gray-50 border-none rounded-xl text-xs text-gray-900 py-2 px-3 focus:ring-2 focus:ring-primary-500 outline-none"
            />
          </div>
        </div>

        {(startDate || endDate || searchTerm) && (
          <button 
            onClick={() => { setStartDate(''); setEndDate(''); setSearchTerm(''); }}
            className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors mt-4 md:mt-0"
            title="Clear Filters"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 w-10">
                  <input 
                    type="checkbox" 
                    checked={selectedLeads.length === filteredLeads.length && filteredLeads.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Lead Info</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Location & Budget</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className={`hover:bg-gray-50 transition-colors cursor-pointer group ${selectedLeads.includes(lead.id) ? 'bg-primary-50/30' : ''}`}>
                  <td className="px-6 py-4" onClick={(e) => { e.stopPropagation(); handleSelectLead(lead.id); }}>
                    <input 
                      type="checkbox" 
                      checked={selectedLeads.includes(lead.id)}
                      onChange={() => handleSelectLead(lead.id)}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                  </td>
                  <td className="px-6 py-4" onClick={() => setSelectedLead(lead)}>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{lead.name}</p>
                      <p className="text-xs text-gray-400 mt-1">{lead.phone}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                       <span className="text-sm font-bold text-gray-900">{lead.location || '-'}</span>
                       <span className="text-xs text-gray-400">{lead.budget ? `₹${lead.budget}` : '-'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600 font-medium">
                      {formatDate(lead.created_at)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 text-gray-400">
                      <button onClick={(e) => { e.stopPropagation(); handleOpenScheduleModal(lead.id); }} className="p-2 hover:text-indigo-600 transition-colors" title="Schedule Site Visit"><Calendar size={16} /></button>
                      <button onClick={(e) => { e.stopPropagation(); handleOpenModal(lead); }} className="p-2 hover:text-primary-600 transition-colors"><Edit2 size={16} /></button>
                      <button onClick={(e) => { e.stopPropagation(); handleDelete(lead.id); }} className="p-2 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
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
                  <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-gray-50 border-none rounded-xl py-2 px-3 text-sm text-gray-900 focus:ring-2 focus:ring-primary-500 outline-none" placeholder="John Doe" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase">Phone Number</label>
                  <input required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-gray-50 border-none rounded-xl py-2 px-3 text-sm text-gray-900 focus:ring-2 focus:ring-primary-500 outline-none" placeholder="9876543210" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase">Email Address</label>
                <input value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-gray-50 border-none rounded-xl py-2 px-3 text-sm text-gray-900 focus:ring-2 focus:ring-primary-500 outline-none" placeholder="john@example.com" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase">Location</label>
                  <input value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full bg-gray-50 border-none rounded-xl py-2 px-3 text-sm text-gray-900 focus:ring-2 focus:ring-primary-500 outline-none" placeholder="City or Area" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase">Budget</label>
                  <input value={formData.budget} onChange={e => setFormData({...formData, budget: e.target.value})} className="w-full bg-gray-50 border-none rounded-xl py-2 px-3 text-sm text-gray-900 focus:ring-2 focus:ring-primary-500 outline-none" placeholder="e.g. 15L" />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase">Assigned To</label>
                  <input value={formData.assigned_to} onChange={e => setFormData({...formData, assigned_to: e.target.value})} className="w-full bg-gray-50 border-none rounded-xl py-2 px-3 text-sm text-gray-900 focus:ring-2 focus:ring-primary-500 outline-none" placeholder="Executive Name" />
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
                 </div>

                 <div className="space-y-6">
                    <div className="p-6 bg-gray-50 rounded-3xl space-y-4">
                       <div>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Assigned Executive</p>
                          <p className="text-sm font-bold text-gray-900 mt-1">{selectedLead.assigned_to || 'Not assigned'}</p>
                       </div>
                    </div>

                    <div className="p-6 bg-gray-50 rounded-3xl space-y-4">
                       <div className="flex justify-between">
                          <div>
                             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Location</p>
                             <p className="text-sm font-bold text-gray-900 mt-1">{selectedLead.location || '-'}</p>
                          </div>
                          <div>
                             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Budget</p>
                             <p className="text-sm font-bold text-gray-900 mt-1">{selectedLead.budget ? `₹${selectedLead.budget}` : '-'}</p>
                          </div>
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

      {/* Schedule Visit Modal */}
      {isScheduleModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-300">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Schedule Site Visit</h2>
              <button onClick={() => setIsScheduleModalOpen(false)} className="text-gray-400 hover:text-gray-900"><X size={24} /></button>
            </div>
            <form onSubmit={handleScheduleSubmit} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase">Select Plot</label>
                <div className="relative">
                  <select 
                    required 
                    value={scheduleData.plot_id} 
                    onChange={e => setScheduleData({...scheduleData, plot_id: e.target.value})}
                    className="w-full bg-gray-50 border-none rounded-xl py-2 px-3 text-sm text-gray-900 focus:ring-2 focus:ring-primary-500 outline-none appearance-none cursor-pointer"
                  >
                    <option value="">Select a plot...</option>
                    {plots.map(plot => (
                      <option key={plot.id} value={plot.id}>{plot.plot_number} ({plot.size}) - ₹{plot.price}</option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <Search size={14} />
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase">Visit Date & Time</label>
                <input 
                  type="datetime-local" 
                  required 
                  value={scheduleData.visit_date} 
                  onChange={e => setScheduleData({...scheduleData, visit_date: e.target.value})}
                  className="w-full bg-gray-50 border-none rounded-xl py-2 px-3 text-sm text-gray-900 focus:ring-2 focus:ring-primary-500 outline-none" 
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase">Notes</label>
                <textarea 
                  value={scheduleData.notes} 
                  onChange={e => setScheduleData({...scheduleData, notes: e.target.value})}
                  className="w-full bg-gray-50 border-none rounded-xl py-2 px-3 text-sm text-gray-900 focus:ring-2 focus:ring-primary-500 outline-none h-32 resize-none" 
                  placeholder="Any special requirements or notes..."
                />
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsScheduleModalOpen(false)} className="px-6 py-2.5 rounded-xl text-sm font-bold text-gray-500 bg-gray-100 hover:bg-gray-200">Cancel</button>
                <button type="submit" className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700">
                  Schedule Visit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leads;
