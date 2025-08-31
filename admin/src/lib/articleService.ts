import { supabase } from "./supabaseClient";

export async function insertArticle(article: {
  title: string;
  content: string;
  category: string;
  author: string;
}) {
  const { data, error } = await supabase
    .from("articles")
    .insert([article])
    .select();

  if (error) throw error;
  return data;
}

export async function updateArticle(id: number, updates: any) {
  const { data, error } = await supabase
    .from("articles")
    .update(updates)
    .eq("id", id)
    .select();

  if (error) throw error;
  return data;
}

export async function deleteArticle(id: number) {
  const { error } = await supabase.from("articles").delete().eq("id", id);
  if (error) throw error;
}
