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
  { title: "Events", url: "/admin/events", icon: Calendar, adminOnly: true },
  { title: "Payroll", url: "/admin/payroll", icon: DollarSign },
  { title: "Settings", url: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const location = useLocation();
  const { profile, signOut, isAdmin } = useAuth();
  
  const currentPath = location.pathname;
  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted/50";

  const filteredMenuItems = menuItems.filter(item => 
    !item.adminOnly || isAdmin()
  );

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/auth';
  };

  return (
    <Sidebar className="w-64">
      <SidebarContent className="bg-gradient-primary text-primary-foreground">
        {/* Header */}
        <div className="p-4 border-b border-primary-foreground/20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-foreground rounded-lg flex items-center justify-center">
              <span className="text-primary font-bold text-sm">C</span>
            </div>
            <div>
              <h1 className="font-bold text-lg">Cenvia.id</h1>
              <p className="text-primary-foreground/80 text-xs">Admin Dashboard</p>
            </div>
          </div>
        </div>

        {/* User Profile */}
        <div className="p-4 border-b border-primary-foreground/20">
          <div className="flex items-center gap-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src={profile?.avatar_url} />
              <AvatarFallback className="bg-primary-foreground text-primary">
                {profile?.full_name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{profile?.full_name}</p>
              <p className="text-primary-foreground/80 text-xs capitalize">{profile?.role}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <SidebarGroup className="flex-1">
          <SidebarGroupLabel className="text-primary-foreground/80">
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
        <div className="p-4 border-t border-primary-foreground/20">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSignOut}
            className="w-full justify-start text-primary-foreground hover:bg-primary-foreground/10"
          >
            <LogOut className="w-4 h-4" />
            <span className="ml-2">Sign Out</span>
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}