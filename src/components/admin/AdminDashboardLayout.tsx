import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  FileText,
  Newspaper,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Home,
  Edit3,
  Save,
  Eye,
  Plus,
  TrendingUp,
  Calendar,
  Clock,
  Award,
  CheckCircle2,
  Image,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../ui/avatar";
import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { SimpleAdmin } from "./SimpleAdmin";
import { NewsAdmin } from "./NewsAdmin";
import { ContentManager } from "./ContentManager";
import { GalleryManager } from "./GalleryManager";
import {
  MetricCard,
  ActivityIndicator,
} from "./StatusIndicator";
import { KeyboardShortcuts } from "./KeyboardShortcuts";

interface AdminDashboardLayoutProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  onLogout?: () => void;
  onBackToWebsite?: () => void;
}

const navigation = [
  { name: "Dashboard", icon: BarChart3, key: "dashboard" },
  { name: "Tips & Tricks", icon: FileText, key: "articles" },
  { name: "Berita Terbaru", icon: Newspaper, key: "news" },
  { name: "Gallery", icon: Image, key: "gallery" },
  { name: "Content Manager", icon: Settings, key: "content" },
];

export function AdminDashboardLayout({
  currentPage,
  onPageChange,
  onLogout,
  onBackToWebsite,
}: AdminDashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({
    totalArticles: 0,
    totalNews: 0,
    totalGallery: 0,
    totalViews: 1250,
    publishedToday: 0,
  });

  // Load stats on mount
  useEffect(() => {
    const loadStats = () => {
      const articles = JSON.parse(
        localStorage.getItem("stc-articles") || "[]",
      );
      const news = JSON.parse(
        localStorage.getItem("stc-news") || "[]",
      );
      const gallery = JSON.parse(
        localStorage.getItem("swaragama-gallery") || "[]",
      );
      const today = new Date().toDateString();

      const publishedToday = [...articles, ...news].filter(
        (item) => new Date(item.date).toDateString() === today,
      ).length;

      setStats({
        totalArticles: articles.length,
        totalNews: news.length,
        totalGallery: gallery.length,
        totalViews:
          1250 +
          (articles.length + news.length + gallery.length) * 45,
        publishedToday,
      });
    };

    loadStats();

    const handleStorageChange = () => loadStats();
    window.addEventListener("storage", handleStorageChange);
    return () =>
      window.removeEventListener(
        "storage",
        handleStorageChange,
      );
  }, [currentPage]);

  const handleBackToWebsite = () => {
    if (onBackToWebsite) {
      onBackToWebsite();
    } else {
      localStorage.removeItem("adminToken");
      window.location.href =
        window.location.origin + window.location.pathname;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    if (onLogout) {
      onLogout();
    } else {
      window.location.reload();
    }
  };

  // Dashboard Overview Component
  const DashboardOverview = () => (
    <div className="space-y-8">
      {/* Hero Section - Admin Style */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden bg-gradient-to-br from-primary/20 via-primary/10 to-transparent rounded-3xl p-8 md:p-12"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-primary/15 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-primary/10 rounded-full blur-xl" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
                Admin Dashboard
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Kelola Konten{" "}
                <span className="text-primary">STC Corner</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl">
                Dashboard terpusat untuk mengelola artikel,
                berita, dan konten website Swaragama Training
                Center dengan mudah dan efisien.
              </p>
            </div>
            <div className="hidden md:block">
              <div className="relative">
                <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-primary/20">
                  <Award className="w-16 h-16 text-primary/70" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <Button
              onClick={() => onPageChange("articles")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Plus className="w-4 h-4 mr-2" />
              Buat Artikel Baru
            </Button>
            <Button
              variant="outline"
              onClick={() => onPageChange("news")}
              className="border-primary/20 hover:bg-primary/5"
            >
              <Newspaper className="w-4 h-4 mr-2" />
              Kelola Berita
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <MetricCard
          title="Total Tips & Tricks"
          value={stats.totalArticles}
          change={{ value: 12, trend: "up" }}
          icon={<FileText className="w-6 h-6" />}
          color="blue"
        />

        <MetricCard
          title="Total Berita"
          value={stats.totalNews}
          change={{ value: 8, trend: "up" }}
          icon={<Newspaper className="w-6 h-6" />}
          color="green"
        />

        <MetricCard
          title="Total Views"
          value={stats.totalViews.toLocaleString()}
          change={{ value: 23, trend: "up" }}
          icon={<TrendingUp className="w-6 h-6" />}
          color="primary"
        />

        <MetricCard
          title="Gallery Photos"
          value={stats.totalGallery}
          change={{ value: 15, trend: "up" }}
          icon={<Image className="w-6 h-6" />}
          color="purple"
        />
      </motion.div>

      {/* Quick Actions Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="w-5 h-5 mr-2 text-primary" />
              Tips & Tricks
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={() => onPageChange("articles")}
              className="w-full justify-start bg-primary/5 hover:bg-primary/10 text-foreground border border-primary/20"
              variant="outline"
            >
              <Plus className="w-4 h-4 mr-2" />
              Tambah Artikel Baru
            </Button>
            <Button
              onClick={() => onPageChange("articles")}
              className="w-full justify-start"
              variant="outline"
            >
              <Edit3 className="w-4 h-4 mr-2" />
              Kelola Artikel
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Newspaper className="w-5 h-5 mr-2 text-primary" />
              Berita Terbaru
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={() => onPageChange("news")}
              className="w-full justify-start bg-primary/5 hover:bg-primary/10 text-foreground border border-primary/20"
              variant="outline"
            >
              <Plus className="w-4 h-4 mr-2" />
              Tambah Berita Baru
            </Button>
            <Button
              onClick={() => onPageChange("news")}
              className="w-full justify-start"
              variant="outline"
            >
              <Edit3 className="w-4 h-4 mr-2" />
              Kelola Berita
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Image className="w-5 h-5 mr-2 text-primary" />
              Gallery Photos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={() => onPageChange("gallery")}
              className="w-full justify-start bg-primary/5 hover:bg-primary/10 text-foreground border border-primary/20"
              variant="outline"
            >
              <Plus className="w-4 h-4 mr-2" />
              Upload Foto Baru
            </Button>
            <Button
              onClick={() => onPageChange("gallery")}
              className="w-full justify-start"
              variant="outline"
            >
              <Edit3 className="w-4 h-4 mr-2" />
              Kelola Gallery
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      ></motion.div>
    </div>
  );

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
        animate={{ x: sidebarOpen ? 0 : "-100%" }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
        className="fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform lg:translate-x-0 lg:static lg:inset-0"
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-border bg-gradient-to-r from-primary/5 to-primary/0">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                <span className="font-bold text-primary-foreground text-lg">
                  S
                </span>
              </div>
              <div>
                <span className="font-bold text-foreground">
                  STC Admin
                </span>
                <p className="text-xs text-muted-foreground">
                  Dashboard
                </p>
              </div>
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
                variant={
                  currentPage === item.key
                    ? "secondary"
                    : "ghost"
                }
                className={`w-full justify-start transition-all duration-300 ${
                  currentPage === item.key
                    ? "bg-primary/10 text-primary border border-primary/20 shadow-sm"
                    : "hover:bg-muted/50"
                }`}
                onClick={() => {
                  onPageChange(item.key);
                  setSidebarOpen(false);
                }}
              >
                <item.icon className="w-4 h-4 mr-3" />
                {item.name}
                {currentPage === item.key && (
                  <div className="ml-auto w-2 h-2 bg-primary rounded-full" />
                )}
              </Button>
            ))}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-border bg-gradient-to-r from-muted/20 to-transparent">
            <div className="flex items-center space-x-3 mb-4">
              <Avatar className="w-10 h-10 border-2 border-primary/20">
                <AvatarImage src="" alt="Admin" />
                <AvatarFallback className="bg-primary/10 text-primary">
                  AD
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">
                  Admin STC
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  Super Administrator
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start border-border/50 hover:bg-primary/5 hover:border-primary/30"
                onClick={handleBackToWebsite}
              >
                <Home className="w-4 h-4 mr-2" />
                Kembali ke Website
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start border-destructive/20 text-destructive hover:bg-destructive/5"
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

              <div>
                <h1 className="font-semibold text-foreground">
                  {currentPage === "dashboard" &&
                    "Dashboard Overview"}
                  {currentPage === "articles" &&
                    "Tips & Tricks Management"}
                  {currentPage === "news" &&
                    "Berita Terbaru Management"}
                  {currentPage === "gallery" &&
                    "Gallery Management"}
                  {currentPage === "content" &&
                    "Content Manager"}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {currentPage === "dashboard" &&
                    "Kelola semua konten STC Corner"}
                  {currentPage === "articles" &&
                    "Kelola artikel tips & tricks"}
                  {currentPage === "news" &&
                    "Kelola berita dan pengumuman"}
                  {currentPage === "gallery" &&
                    "Kelola galeri foto di section About"}
                  {currentPage === "content" &&
                    "Edit konten website secara langsung"}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handleBackToWebsite}
                className="hidden sm:flex items-center space-x-2 hover:bg-primary/5 hover:border-primary/30 transition-colors"
              >
                <Home className="w-4 h-4" />
                <span>Preview Website</span>
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
            className="max-w-7xl mx-auto"
          >
            {currentPage === "dashboard" && (
              <DashboardOverview />
            )}
            {currentPage === "articles" && (
              <div className="bg-card rounded-xl border border-border/50 min-h-[600px]">
                <SimpleAdmin />
              </div>
            )}
            {currentPage === "news" && (
              <div className="bg-card rounded-xl border border-border/50 min-h-[600px]">
                <NewsAdmin />
              </div>
            )}
            {currentPage === "gallery" && (
              <div className="bg-card rounded-xl border border-border/50 min-h-[600px] p-6">
                <GalleryManager />
              </div>
            )}
            {currentPage === "content" && (
              <div className="bg-card rounded-xl border border-border/50 min-h-[600px] p-6">
                <ContentManager />
              </div>
            )}
          </motion.div>
        </main>
      </div>

      {/* Keyboard Shortcuts */}
      <KeyboardShortcuts onPageChange={onPageChange} />
    </div>
  );
}