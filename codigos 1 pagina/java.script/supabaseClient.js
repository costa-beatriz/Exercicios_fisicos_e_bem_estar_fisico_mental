import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://vimslajwgmuanzohzydu.supabase.co";
const supabaseKey = "sb_publishable_wwJAaeTYapELQmcBD0qDKg_4DCUy1YU";

export const supabase = createClient(supabaseUrl, supabaseKey);