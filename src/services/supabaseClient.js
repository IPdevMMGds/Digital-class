import { createClient } from '@supabase/supabase-js'
const supabaseUrl = "https://vjgxroudmtmgkoiviqdt.supabase.co"
const supabaseAnonKey = "sb_publishable_vvrprfIBPuxpKrEJGSz7lg_6qsM_Sj8"
export const supabase = createClient(supabaseUrl, supabaseAnonKey)