import { Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { DUMMY_PLOTS } from '../utils/dummyData';

export const getPlots = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from('plots').select('*');
    
    if (error || !data || data.length === 0) {
      return res.json(DUMMY_PLOTS);
    }
    
    res.json(data);
  } catch (error) {
    res.json(DUMMY_PLOTS);
  }
};

export const createPlot = async (req: Request, res: Response) => {
  const { plot_number, size, price, facing, status } = req.body;

  try {
    const { data, error } = await supabase
      .from('plots')
      .insert([{ plot_number, size, price, facing, status: status || 'available' }])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (error: any) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};
