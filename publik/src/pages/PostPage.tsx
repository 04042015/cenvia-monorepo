import { useParams } from "react-router-dom";

export default function PostPage() {
  const { slug } = useParams();
  return <h1>Slug: {slug}</h1>;
}
