// admin/src/components/layout/AdminSidebar.tsx
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileText,
  Tags,
  Image,
  Megaphone,
  Calendar,
  DollarSign,
  Settings,
  LogOut,
  Code2,
  MonitorPlay,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const menuItems = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Users", url: "/admin/users", icon: Users, adminOnly: true },
  { title: "Posts", url: "/admin/posts", icon: FileText },
  { title: "Categories", url: "/admin/categories", icon: Tags, adminOnly: true },
  { title: "Banners", url: "/admin/banners", icon: Image, adminOnly: true },
  { title: "Ads", url: "/admin/ads", icon: Megaphone, adminOnly: true },
  { title: "Script Ads", url: "/admin/script-ads", icon: Code2, adminOnly: true },
  { title: "Popup Ads", url: "/admin/popup-ads", icon: MonitorPlay, adminOnly: true },
  { title: "Events", url: "/admin/events", icon: Calendar, adminOnly: true },
  { title: "Payroll", url: "/admin/payroll", icon: DollarSign },
  { title: "Settings", url: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const location = useLocation();
  const { profile, signOut, isAdmin } = useAuth();
  
  const currentPath = location.pathname;
  const isActive = (path: string) => currentPath === path;

  // ✅ warna putih untuk teks & ikon
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
      isActive ? "text-white font-semibold" : "text-white/80 hover:text-white"
    }`;

  // ✅ tampilkan menu adminOnly untuk role "admin" & "superadmin"
  const filteredMenuItems = menuItems.filter(item => {
    if (!item.adminOnly) return true;
    return isAdmin() || profile?.role === "superadmin";
  });

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/auth';
  };

  return (
    <Sidebar className="w-64">
      <SidebarContent className="bg-gradient-primary text-white">
        {/* Header */}
        <div className="p-4 border-b border-white/20">
          <div className="flex items-center gap-2">
            {/* Logo */}
            <img
              src="https://kuoawzlabmwhvfcahcfm.supabase.co/storage/v1/object/public/assets/logo-cenvia.jpg"
              alt="Cenvia Logo"
              className="w-8 h-8 rounded-lg"
            />
            <div>
              <h1 className="font-bold text-lg">Cenvia.id</h1>
              <p className="text-white/70 text-xs">Admin Dashboard</p>
            </div>
          </div>
        </div>

        {/* User Profile */}
        <div className="p-4 border-b border-white/20">
          <div className="flex items-center gap-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src={profile?.avatar_url} />
              <AvatarFallback className="bg-white text-red-600">
                {profile?.full_name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{profile?.full_name}</p>
              <p className="text-white/70 text-xs capitalize">{profile?.role}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <SidebarGroup className="flex-1">
          <SidebarGroupLabel className="text-white/70">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end={item.url === '/admin'}
                      className={getNavCls}
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Sign Out Button */}
        <div className="p-4 border-t border-white/20">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSignOut}
            className="w-full justify-start text-white hover:bg-white/10"
          >
            <LogOut className="w-4 h-4" />
            <span className="ml-2">Sign Out</span>
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
   }
