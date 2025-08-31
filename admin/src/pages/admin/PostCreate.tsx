import { PostForm } from "@/components/admin/PostForm";
import { useNavigate } from "react-router-dom";

export default function PostCreate() {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Create New Post</h1>
      <PostForm onSuccess={() => navigate("/admin/posts")} />
    </div>
  );
}
