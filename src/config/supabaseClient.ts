import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_ANON_KEY

// Check if environment variables are available
if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase environment variables are not configured. Database features will be disabled.');
}

const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null

export default supabase 