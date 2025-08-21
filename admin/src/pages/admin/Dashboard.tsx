import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, Tags, Calendar, TrendingUp, DollarSign } from "lucide-react";
import { Bar, BarChart, Line, LineChart, Pie, PieChart, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Skeleton } from "@/components/ui/skeleton";

interface DashboardStats {
  totalUsers: number;
  totalPosts: number;
  totalCategories: number;
  totalEvents: number;
  publishedPosts: number;
  draftPosts: number;
}

interface ChartData {
  monthlyUsers: Array<{ month: string; users: number }>;
  categoryDistribution: Array<{ name: string; value: number; color: string }>;
  weeklyPosts: Array<{ week: string; posts: number }>;
}

export default function Dashboard() {
  const { profile, isAdmin } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalPosts: 0,
    totalCategories: 0,
    totalEvents: 0,
    publishedPosts: 0,
    draftPosts: 0,
  });
  const [chartData, setChartData] = useState<ChartData>({
    monthlyUsers: [],
    categoryDistribution: [],
    weeklyPosts: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Load basic stats
      const [usersRes, postsRes, categoriesRes, eventsRes] = await Promise.all([
        supabase.from('profiles').select('id', { count: 'exact' }),
        supabase.from('posts').select('id, status', { count: 'exact' }),
        supabase.from('categories').select('id', { count: 'exact' }),
        supabase.from('events').select('id', { count: 'exact' }),
      ]);

      const totalUsers = usersRes.count || 0;
      const totalPosts = postsRes.count || 0;
      const totalCategories = categoriesRes.count || 0;
      const totalEvents = eventsRes.count || 0;
      
      const publishedPosts = postsRes.data?.filter(p => p.status === 'published').length || 0;
      const draftPosts = postsRes.data?.filter(p => p.status === 'draft').length || 0;

      setStats({
        totalUsers,
        totalPosts,
        totalCategories,
        totalEvents,
        publishedPosts,
        draftPosts,
      });

      // Load chart data
      await loadChartData();
      
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadChartData = async () => {
    try {
      // Mock data for demonstration
      const monthlyUsers = [
        { month: 'Jan', users: 12 },
        { month: 'Feb', users: 18 },
        { month: 'Mar', users: 25 },
        { month: 'Apr', users: 35 },
        { month: 'May', users: 42 },
        { month: 'Jun', users: 58 },
      ];

      // Load category distribution
      const { data: categoriesWithPosts } = await supabase
        .from('categories')
        .select(`
          name,
          color,
          posts(id)
        `);

      const categoryDistribution = categoriesWithPosts?.map((cat, index) => ({
        name: cat.name,
        value: cat.posts?.length || 0,
        color: cat.color || `hsl(${index * 137.5}, 70%, 50%)`,
      })) || [];

      const weeklyPosts = [
        { week: 'Week 1', posts: 5 },
        { week: 'Week 2', posts: 8 },
        { week: 'Week 3', posts: 12 },
        { week: 'Week 4', posts: 15 },
      ];

      setChartData({
        monthlyUsers,
        categoryDistribution,
        weeklyPosts,
      });
    } catch (error) {
      console.error('Error loading chart data:', error);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-80" />
          <Skeleton className="h-80" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {profile?.full_name}! Here's what's happening with your admin panel.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-card hover:shadow-elevated transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              Active team members
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-elevated transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.totalPosts}</div>
            <p className="text-xs text-muted-foreground">
              {stats.publishedPosts} published, {stats.draftPosts} drafts
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-elevated transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <Tags className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.totalCategories}</div>
            <p className="text-xs text-muted-foreground">
              Content categories
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-elevated transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.totalEvents}</div>
            <p className="text-xs text-muted-foreground">
              Upcoming events
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly User Growth */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Monthly User Growth
            </CardTitle>
            <CardDescription>
              New users registered each month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData.monthlyUsers}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="users" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tags className="h-5 w-5 text-primary" />
              Posts by Category
            </CardTitle>
            <CardDescription>
              Distribution of posts across categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  dataKey="value"
                  data={chartData.categoryDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {chartData.categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Posts Chart */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Weekly Post Activity
          </CardTitle>
          <CardDescription>
            Posts published this month by week
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData.weeklyPosts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Bar 
                dataKey="posts" 
                fill="hsl(var(--primary))" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}