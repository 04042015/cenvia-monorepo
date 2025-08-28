import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
// import CategoryPage from "./pages/CategoryPage"; // ✅ tambahkan import
// import PostPage from "./pages/PostPage"; // ✅ import baru

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="font-sans"> {/* 🔑 apply font-sans di root */}
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/kategori/:slug" element={<CategoryPage />} /> {/* ✅ route kategori */}
            <Route path="/post/:slug" element={<PostPage />} /> {/* ✅ route baru */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
