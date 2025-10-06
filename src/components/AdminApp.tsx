import React, {
  useState,
  useEffect,
  lazy,
  Suspense,
  memo,
} from "react";
import { motion } from "motion/react";
import { Hero } from "./Hero";
import { About } from "./About";
import { Services } from "./Services";
import { Trainers } from "./Trainers";
import { Articles } from "./Articles";
import { Button } from "./ui/button";
import {
  ArrowLeft,
  Settings,
  Shield,
  Crown,
  LogOut,
  ImageIcon,
  FileText,
  Users,
  Briefcase,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { GalleryAdmin } from "./admin/GalleryAdmin";
import { ArticlesAdmin } from "./admin/ArticlesAdmin";


// Admin Navigation Component
const AdminNavigation = memo(({ currentSection, onSectionChange }: {
  currentSection: string;
  onSectionChange: (section: string) => void;
}) => {
  const navItems = [
    { id: 'gallery', label: 'Galeri', icon: ImageIcon },
    { id: 'articles', label: 'Artikel', icon: FileText },
    { id: 'services', label: 'Layanan', icon: Briefcase },
    { id: 'trainers', label: 'Trainer', icon: Users },
  ];

  return (
    <div className="bg-card border-b border-border px-4 py-3">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center space-x-1 overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={currentSection === item.id ? "default" : "ghost"}
                size="sm"
                onClick={() => onSectionChange(item.id)}
                className="whitespace-nowrap"
              >
                <Icon className="w-4 h-4 mr-2" />
                {item.label}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
});

AdminNavigation.displayName = "AdminNavigation";

interface AdminAppProps {
  onBackToWebsite: () => void;
}





// Loading component untuk lazy loading
const AdminLoadingFallback = memo(() => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
));

AdminLoadingFallback.displayName = "AdminLoadingFallback";

// Floating Admin Controls Component
const FloatingAdminControls = memo(
  ({
    onExitAdmin,
  }: {
    onExitAdmin: () => void;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-4 right-4 z-50 flex flex-col sm:flex-row items-end sm:items-center gap-2"
    >
      {/* Admin Badge */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="flex items-center gap-2 px-3 py-2 bg-card/90 backdrop-blur-sm border border-border rounded-lg shadow-lg transition-all duration-300"
      >
        <Crown className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium text-primary hidden sm:inline">ADMIN</span>
        <Badge variant="secondary" className="text-xs">
          Dashboard
        </Badge>
      </motion.div>

      {/* Exit Admin Control */}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="outline"
          size="sm"
          onClick={onExitAdmin}
          className="bg-card/90 backdrop-blur-sm border-destructive/20 text-destructive hover:bg-destructive hover:text-destructive-foreground shadow-lg transition-all duration-300"
        >
          <LogOut className="w-4 h-4 sm:mr-2" />
          <span className="hidden sm:inline">Exit Admin</span>
        </Button>
      </motion.div>
    </motion.div>
  ),
);

FloatingAdminControls.displayName = "FloatingAdminControls";

// Memoized main admin website components
const AdminWebsiteContent = memo(
  ({
    onExitAdmin,
  }: {
    onExitAdmin: () => void;
  }) => {
    const [currentSection, setCurrentSection] = useState('gallery');

    const renderContent = () => {
      switch (currentSection) {
        case 'gallery':
          return <GalleryAdmin />;
        case 'articles':
          return <ArticlesAdmin />;
        case 'services':
          return <Services />;
        case 'trainers':
          return <Trainers />;
        default:
          return (
            <div className="space-y-8">
              <About />
              <Services />
              <Trainers />
              <Articles />
            </div>
          );
      }
    };

    return (
      <div className="min-h-screen bg-background">
        {/* Floating Admin Controls */}
        <FloatingAdminControls onExitAdmin={onExitAdmin} />
        
        {/* Admin Navigation */}
        <div className="pt-20">
          <AdminNavigation 
            currentSection={currentSection} 
            onSectionChange={setCurrentSection} 
          />
        </div>
        
        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderContent()}
        </main>
      </div>
    );
  },
);

AdminWebsiteContent.displayName = "AdminWebsiteContent";

export default function AdminApp({
  onBackToWebsite,
}: AdminAppProps) {
  // Check if user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token === "authenticated") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      credentials.username === "adminstcstcadmin" &&
      credentials.password === "20111102"
    ) {
      localStorage.setItem("adminToken", "authenticated");
      setIsAuthenticated(true);
    } else {
      alert("Kredensial tidak valid");
    }
  };

  const handleExitAdmin = () => {
    localStorage.removeItem("adminToken");
    setIsAuthenticated(false);
    onBackToWebsite();
  };

  // Login screen - tetap seperti sebelumnya
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/25 via-accent/40 to-primary/15 flex items-center justify-center">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-primary/15 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-accent/50 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-primary/20 rounded-full blur-2xl"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-8 shadow-2xl max-w-md w-full mx-4 relative z-10"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Settings className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold mb-2">
              <span className="text-primary">STC</span>{" "}
              <span className="text-foreground">Admin</span>
            </h1>
            <p className="text-muted-foreground">
              Dashboard Administrator Swaragama Training Center
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block mb-2 font-medium">
                Username
              </label>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) =>
                  setCredentials({
                    ...credentials,
                    username: e.target.value,
                  })
                }
                className="w-full px-4 py-3 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                placeholder="Masukkan username"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">
                Password
              </label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({
                    ...credentials,
                    password: e.target.value,
                  })
                }
                className="w-full px-4 py-3 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                placeholder="Masukkan password"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 h-auto"
            >
              Masuk Dashboard
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-border">
            <Button
              variant="outline"
              onClick={onBackToWebsite}
              className="w-full"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Website
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Main admin dashboard - tampilan clone website dengan admin navbar
  return (
    <AdminWebsiteContent
      onExitAdmin={handleExitAdmin}
    />
  );
}