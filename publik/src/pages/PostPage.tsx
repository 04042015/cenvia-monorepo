import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";

export default function PostPage() {
  const { slug } = useParams();
  const [title, setTitle] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("title")
        .eq("slug", slug)
        .single();

      if (error) console.error(error);
      if (data) setTitle(data.title);
    };
    if (slug) fetchPost();
  }, [slug]);

  return <h1>{title || "Loading..."}</h1>;
}
