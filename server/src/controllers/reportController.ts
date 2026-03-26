import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

export const getReportsData = async (req: Request, res: Response) => {
  try {
    // In a real app, this would perform complex aggregations.
    // Here we'll return a consolidated object for the frontend dashboard/reports page.
    
    const [leadsResponse, plotsResponse, paymentsResponse] = await Promise.all([
      supabase.from('leads').select('source, status'),
      supabase.from('plots').select('status, price'),
      supabase.from('payments').select('amount, created_at')
    ]);

    // Format data for charts if DB has content, otherwise return structure for frontend fallback
    res.json({
      leadsBySource: leadsResponse.data || [],
      plotsByStatus: plotsResponse.data || [],
      revenueOverTime: paymentsResponse.data || []
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching report data' });
  }
};
