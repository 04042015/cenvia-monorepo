import { BrowserRouter, Routes, Route } from "react-router-dom";

function Index() {
  return <h1>Home</h1>;
}

function PostPage() {
  return <h1>Test Page</h1>;
}

function NotFound() {
  return <h1>404 Not Found</h1>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/post/:slug" element={<PostPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
