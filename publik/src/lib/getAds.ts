import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function getActiveAds(position: string) {
  const today = new Date().toISOString().split("T")[0];

  const { data, error } = await supabase
    .from("ads")
    .select("*")
    .eq("status", "active")
    .eq("position", position)
    .lte("start_date", today) // sudah mulai
    .gte("end_date", today);  // belum lewat

  if (error) {
    console.error("Error fetching ads:", error.message);
    return [];
  }
  return data || [];
}
