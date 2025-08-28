import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage"; // ✅ tambahkan ini

export default function App() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>🚀 React Router Minimal</h1>
      <nav style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <Link to="/">Home</Link>
        <Link to="/post">Post</Link>
      </nav>

      <Routes>
       <Route path="/" element={<HomePage />} />
       <Route path="/post" element={<PostPage />} /> {/* ✅ rute uji */}
     </Routes>

    </div>
  );
}


