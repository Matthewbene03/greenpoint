import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://yyrnbsehaftutioojylw.supabase.co"
const supabaseKey = "sb_publishable_GiJH4ksdVqG7vnP4p58Tiw_KNxYcYSl"

export const supabase = createClient(supabaseUrl, supabaseKey)