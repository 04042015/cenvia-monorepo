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
import Posts from "./pages/admin/Posts";
import Payroll from "./pages/admin/Payroll";
import { AdminLayout } from "./components/layout/AdminLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          } />
          <Route path="/admin/posts" element={
            <AdminLayout>
              <Posts />
            </AdminLayout>
          } />
          <Route path="/admin/payroll" element={
            <AdminLayout>
              <Payroll />
            </AdminLayout>
          } />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
