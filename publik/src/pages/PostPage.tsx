import { useParams } from "react-router-dom";

const PostPage = () => {
  const { slug } = useParams<{ slug: string }>();

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold">PostPage</h1>
      <p>Slug: {slug || "tidak ada slug"}</p>
    </div>
  );
};

export default PostPage;
