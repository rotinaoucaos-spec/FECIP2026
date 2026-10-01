// RoutineSync / FECIP2026 - conexão pública segura com Supabase
// A publishable key pode ficar no frontend; a segurança é feita pelo RLS.

const SUPABASE_URL = "https://wfbflfdcvdolcjrlbbvv.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_aEkEsiEgmGZzW56WZ2r87w_Yj9j7ww4";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);
