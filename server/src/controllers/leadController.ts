import { Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { DUMMY_LEADS } from '../utils/dummyData';
import { emitNewLead } from '../services/socket';

export const getLeads = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
    
    if (error || !data || data.length === 0) {
      return res.json(DUMMY_LEADS);
    }
    
    res.json(data);
  } catch (error) {
    res.json(DUMMY_LEADS);
  }
};

export const createLead = async (req: Request, res: Response) => {
  const { name, phone, email, source, campaign, adset, location, budget, assigned_to } = req.body;

  try {
    // 1. Prevent duplicate (same phone)
    const { data: existingLead } = await supabase
      .from('leads')
      .select('id')
      .eq('phone', phone)
      .single();

    if (existingLead) {
      return res.status(400).json({ message: 'Lead with this phone number already exists' });
    }

    // 2. Insert new lead
    const newLead = {
      name,
      phone,
      email,
      source: source || 'manual',
      campaign,
      adset,
      location,
      budget,
      assigned_to,
      status: 'new',
      created_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('leads')
      .insert([newLead])
      .select()
      .single();

    if (error) throw error;

    // 3. Emit real-time socket event
    emitNewLead(data);

    res.status(201).json(data);
  } catch (error: any) {
    console.error('Error creating lead:', error.message);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

export const updateLead = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const { data, error } = await supabase
      .from('leads')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

export const deleteLead = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const { error } = await supabase.from('leads').delete().eq('id', id);
    if (error) throw error;
    res.json({ message: 'Lead deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

