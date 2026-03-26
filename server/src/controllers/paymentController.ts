import { Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { DUMMY_PAYMENTS } from '../utils/dummyData';

export const getPayments = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from('payments').select('*');
    
    if (error || !data || data.length === 0) {
      return res.json(DUMMY_PAYMENTS);
    }
    
    res.json(data);
  } catch (error) {
    res.json(DUMMY_PAYMENTS);
  }
};
