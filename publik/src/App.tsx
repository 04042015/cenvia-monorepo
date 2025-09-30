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
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Advertise from "./pages/Advertise";
import RSS from "./pages/RSS";
import ScrollToTop from "./components/ScrollToTop";
import Interstitial from "./pages/Interstitial";

// ✅ Import ads
import PopupAd from "./components/ads/PopupAd";
import ScriptPopup from "./components/ads/ScriptPopup";

// ✅ Import HelmetProvider
import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HelmetProvider>
        <BrowserRouter>
          <ScrollToTop />

          {/* ✅ Popup global biar muncul di semua halaman */}
          <PopupAd />
          <ScriptPopup />

          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/post/:slug" element={<PostDetail />} />
              <Route path="/category/:slug" element={<Category />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/advertise" element={<Advertise />} />
              <Route path="/rss" element={<RSS />} />
              <Route path="/interstitial/:slug" element={<Interstitial />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </HelmetProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
