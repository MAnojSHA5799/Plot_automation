import React, { useState, useEffect } from 'react';
import { 
  CreditCard, 
  ArrowDownLeft, 
  ArrowUpRight, 
  Search, 
  Download,
  IndianRupee,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';
import api from '../services/api';

const Payments = () => {
  const [payments, setPayments] = useState<any[]>([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const { data } = await api.get('/payments');
        // setLeads(data); // Fixed typo in previous plan
        setPayments(data);
      } catch (err) {
        console.error('Failed to fetch payments');
      }
    };
    fetchPayments();
  }, []);

  const totalRevenue = payments.reduce((acc, p) => acc + Number(p.amount), 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Financial Overview</h1>
          <p className="text-gray-500 mt-1">Track payments and transaction history.</p>
        </div>
        <button className="bg-white border border-gray-200 text-gray-900 px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-gray-50 transition-all shadow-sm">
          <Download size={18} />
          Export Statement
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-primary-600 p-8 rounded-3xl text-white shadow-xl shadow-primary-100 flex items-center justify-between">
           <div>
             <p className="text-white/70 text-sm font-medium">Total Collected</p>
             <h2 className="text-4xl font-bold mt-1">₹{(totalRevenue / 100000).toFixed(1)}L</h2>
           </div>
           <div className="bg-white/20 p-4 rounded-2xl">
             <IndianRupee size={32} />
           </div>
        </div>
        <div className="bg-emerald-500 p-8 rounded-3xl text-white shadow-xl shadow-emerald-100 flex items-center justify-between">
           <div>
             <p className="text-white/70 text-sm font-medium">Online Payments</p>
             <h2 className="text-4xl font-bold mt-1">₹{(totalRevenue * 0.7 / 100000).toFixed(1)}L</h2>
           </div>
           <div className="bg-white/20 p-4 rounded-2xl">
              <CheckCircle2 size={32} />
           </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-6">
           <div className="bg-blue-50 p-4 rounded-2xl text-blue-600">
             <CreditCard size={32} />
           </div>
           <div>
             <p className="text-gray-400 text-sm font-medium">Pending Dues</p>
             <h2 className="text-3xl font-bold text-gray-900">₹4.2L</h2>
           </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
           <h3 className="font-bold text-lg text-gray-900">Recent Transactions</h3>
           <div className="relative">
             <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
             <input type="text" placeholder="Search customers..." className="pl-10 pr-4 py-2 bg-gray-50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500" />
           </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase">Customer</th>
                <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase">Amount</th>
                <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase">Method</th>
                <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase">Status</th>
                <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {payments.map(p => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-8 py-5">
                    <p className="text-sm font-bold text-gray-900">{p.customer_name}</p>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-1 text-emerald-600 font-bold">
                       <ArrowDownLeft size={16} />
                       ₹{Number(p.amount).toLocaleString()}
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-xs font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-lg">
                      {p.payment_mode}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                     <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                        <CheckCircle2 size={14} /> Completed
                     </span>
                  </td>
                  <td className="px-8 py-5 text-sm text-gray-400 font-medium">
                    {new Date(p.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Payments;
