import { Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { DUMMY_SITE_VISITS } from '../utils/dummyData';

export const getSiteVisits = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('site_visits')
      .select('*, leads(name), plots(plot_number)')
      .order('visit_date', { ascending: false });
    
    if (error || !data || data.length === 0) {
      return res.json(DUMMY_SITE_VISITS);
    }
    
    // Flatten the data for frontend convenience
    const formattedData = data.map((v: any) => ({
      ...v,
      lead_name: v.leads?.name,
      plot_number: v.plots?.plot_number
    }));

    res.json(formattedData);
  } catch (error) {
    res.json(DUMMY_SITE_VISITS);
  }
};

export const createSiteVisit = async (req: Request, res: Response) => {
  const { lead_id, plot_id, visit_date, notes } = req.body;

  try {
    const { data, error } = await supabase
      .from('site_visits')
      .insert([{ lead_id, plot_id, visit_date, notes, status: 'scheduled' }])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (error: any) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};
