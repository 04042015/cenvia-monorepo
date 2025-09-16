// publik/src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PostDetail from "./pages/PostDetail";
import Layout from "./components/Layout";
import Category from "./pages/Category";
import About from "./pages/About"; // ✅ import About
import ScrollToTop from "./components/ScrollToTop"; // ✅ import ScrollToTop

// import PopupAd from "./components/ads/PopupAd"; // ✅ kalau mau aktifkan lagi

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop /> {/* ✅ otomatis scroll ke atas tiap route berubah */}
        {/* ✅ Popup global biar muncul di semua halaman */}
        {/* <PopupAd /> */}
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/post/:slug" element={<PostDetail />} />
            <Route path="/category/:slug" element={<Category />} />
            <Route path="/about" element={<About />} /> {/* ✅ route baru */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
