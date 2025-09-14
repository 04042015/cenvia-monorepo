// admin/src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/admin/Dashboard";
import Posts from "./pages/admin/posts";
import Payroll from "./pages/admin/Payroll";
import { AdminLayout } from "./components/layout/AdminLayout";
import PostCreate from "./pages/admin/PostCreate";
import Ads from "./pages/admin/Ads";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />

          {/* Dashboard Routes (pakai AdminLayout) */}
          <Route path="/dashboard" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="posts" element={<Posts />} />
            <Route path="payroll" element={<Payroll />} />
            <Route path="posts/create" element={<PostCreate />} />
            <Route path="ads" element={<Ads />} />
          </Route>

          {/* (Opsional) legacy admin routes masih tetap bisa diakses */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="posts" element={<Posts />} />
            <Route path="payroll" element={<Payroll />} />
            <Route path="posts/create" element={<PostCreate />} />
            <Route path="ads" element={<Ads />} /> {/* ✅ tambahkan ini */}
          </Route>

          {/* Catch-all 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
