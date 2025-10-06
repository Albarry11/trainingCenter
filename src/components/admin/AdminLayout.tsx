import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  FileText, 
  FolderOpen, 
  Settings, 
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  User,
  Home,
  ArrowLeft,
  Newspaper
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { adminApi } from '../../services/adminApi';
import { SimpleAdmin } from './SimpleAdmin';
import { NewsAdmin } from './NewsAdmin';

interface AdminLayoutProps {
  children?: React.ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
  onLogout?: () => void;
  onBackToWebsite?: () => void;
}

const navigation = [
  { name: 'Tips & Tricks', icon: FileText, key: 'articles' },
  { name: 'Berita Terbaru', icon: Newspaper, key: 'news' },
];

export function AdminLayout({ children, currentPage, onPageChange, onLogout, onBackToWebsite }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleBackToWebsite = () => {
    if (onBackToWebsite) {
      onBackToWebsite();
    } else {
      // Fallback method
      localStorage.removeItem('adminToken');
      window.location.href = window.location.origin + window.location.pathname;
    }
  };

  const handleLogout = () => {
    // Clear admin token
    localStorage.removeItem('adminToken');
    // Call logout callback if provided
    if (onLogout) {
      onLogout();
    } else {
      // Fallback to reload
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{ x: sidebarOpen ? 0 : '-100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform lg:translate-x-0 lg:static lg:inset-0"
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-border">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="font-bold text-primary-foreground">S</span>
              </div>
              <span className="font-semibold">STC Admin</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => (
              <Button
                key={item.key}
                variant={currentPage === item.key ? 'secondary' : 'ghost'}
                className="w-full justify-start"
                onClick={() => {
                  onPageChange(item.key);
                  setSidebarOpen(false);
                }}
              >
                <item.icon className="w-4 h-4 mr-3" />
                {item.name}
              </Button>
            ))}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center space-x-3 mb-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src="" alt="Admin" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Admin STC</p>
                <p className="text-xs text-muted-foreground truncate">adminstcstcadmin</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={handleBackToWebsite}
              >
                <Home className="w-4 h-4 mr-2" />
                Back to Website
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="bg-card/50 backdrop-blur-sm border-b border-border sticky top-0 z-30">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-4 h-4" />
              </Button>
              

            </div>

            <div className="flex items-center space-x-4">
              {/* Back to Website Button */}
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleBackToWebsite}
                className="hidden sm:flex items-center space-x-2 hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Home className="w-4 h-4" />
                <span>Back to Website</span>
              </Button>
              
              {/* Mobile Back Button */}
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleBackToWebsite}
                className="sm:hidden"
                title="Back to Website"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              

              

            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-6xl mx-auto"
          >
            <div className="space-y-6">
              {/* Dynamic Header */}
              <div className="bg-card rounded-lg p-6 border border-border">
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  {currentPage === 'articles' ? 'Tips & Tricks Admin' : 'Berita Terbaru Admin'}
                </h1>
                <p className="text-muted-foreground">
                  {currentPage === 'articles' 
                    ? 'Kelola artikel tips & tricks untuk STC Corner' 
                    : 'Kelola berita terbaru Swaragama Training Center'
                  }
                </p>
              </div>
              
              {/* Content Area */}
              <div className="bg-card rounded-lg border border-border min-h-[600px]">
                {currentPage === 'articles' && <SimpleAdmin />}
                {currentPage === 'news' && <NewsAdmin />}
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}