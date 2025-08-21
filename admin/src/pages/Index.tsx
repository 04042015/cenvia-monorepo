import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Shield, BarChart3, Users, FileText } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary-foreground rounded-xl flex items-center justify-center">
              <span className="text-primary font-bold text-xl">C</span>
            </div>
            <span className="text-primary-foreground font-bold text-xl">Cenvia.id</span>
          </div>
          
          <div className="flex items-center gap-4">
            <Link to="/auth">
              <Button variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10">
                Sign In
              </Button>
            </Link>
            <Link to="/auth/register">
              <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                Get Started
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-20">
        <div className="text-center text-primary-foreground mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Admin Dashboard
            <br />
            <span className="text-primary-glow">Cenvia.id</span>
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/80 mb-8 max-w-3xl mx-auto">
            Powerful content management system with role-based access, 
            payroll management, and comprehensive analytics for your team.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-primary">
                Access Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/auth/register">
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                Create Account
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <Card className="bg-card/10 backdrop-blur-sm border-primary-foreground/20 shadow-card hover:shadow-elevated transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-2">
                <Shield className="h-6 w-6 text-primary-foreground" />
              </div>
              <CardTitle className="text-primary-foreground">Role-Based Access</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-primary-foreground/70">
                Secure admin and staff roles with granular permissions for content management.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-card/10 backdrop-blur-sm border-primary-foreground/20 shadow-card hover:shadow-elevated transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-2">
                <FileText className="h-6 w-6 text-primary-foreground" />
              </div>
              <CardTitle className="text-primary-foreground">Content Management</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-primary-foreground/70">
                Manage posts, categories, banners, ads, and events with rich text editing.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-card/10 backdrop-blur-sm border-primary-foreground/20 shadow-card hover:shadow-elevated transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-2">
                <Users className="h-6 w-6 text-primary-foreground" />
              </div>
              <CardTitle className="text-primary-foreground">Payroll System</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-primary-foreground/70">
                Complete HR management with salary calculation and PDF slip generation.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-card/10 backdrop-blur-sm border-primary-foreground/20 shadow-card hover:shadow-elevated transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-2">
                <BarChart3 className="h-6 w-6 text-primary-foreground" />
              </div>
              <CardTitle className="text-primary-foreground">Real-time Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-primary-foreground/70">
                Live dashboard with charts, statistics, and performance insights.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-primary-foreground/60">
        <p>&copy; 2024 Cenvia.id Admin Dashboard. Built with modern web technologies.</p>
      </footer>
    </div>
  );
};

export default Index;
