import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function fetchAll() {
  const { data, error } = await supabase
    .from('portfolio_data')
    .select('content')
    .eq('id', 'main')
    .single();

  if (error) {
    console.error('Supabase error:', error);
    throw new Error('Impossible de charger les données depuis Supabase');
  }

  return data.content;
}

// Map individual fetch functions to use the cached/fetched data from fetchAll if needed,
// but for now, we follow the current App structure where fetchAll is the entry point.
export async function updateData(updatedContent) {
  const { data, error } = await supabase
    .from('portfolio_data')
    .update({ content: updatedContent })
    .eq('id', 'main');

  if (error) {
    console.error('Supabase update error:', error);
    throw new Error('Échec de la mise à jour sur Supabase');
  }

  return { status: 'success' };
}
