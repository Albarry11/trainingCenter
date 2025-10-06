import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Users,
  FileText,
  Newspaper,
  ImageIcon,
  TrendingUp,
  Calendar,
  Award,
  Eye,
  Edit,
  BarChart3,
  Activity,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { localStorageService } from '../../services/localStorageService';

interface DashboardStats {
  totalArticles: number;
  publishedArticles: number;
  draftArticles: number;
  totalNews: number;
  publishedNews: number;
  draftNews: number;
  totalGalleryImages: number;
  recentActivity: Array<{
    id: string;
    type: 'article' | 'news' | 'gallery';
    title: string;
    action: 'created' | 'updated';
    date: string;
  }>;
}

export function DashboardOverview() {
  const [stats, setStats] = useState<DashboardStats>({
    totalArticles: 0,
    publishedArticles: 0,
    draftArticles: 0,
    totalNews: 0,
    publishedNews: 0,
    draftNews: 0,
    totalGalleryImages: 0,
    recentActivity: [],
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = () => {
    const articles = localStorageService.getArticles();
    const news = localStorageService.getNews();
    const gallery = JSON.parse(localStorage.getItem('swaragama-gallery') || '[]');

    // Calculate basic stats
    const publishedArticles = articles.filter(a => a.status === 'published').length;
    const draftArticles = articles.filter(a => a.status === 'draft').length;
    const publishedNews = news.filter(n => n.status === 'published').length;
    const draftNews = news.filter(n => n.status === 'draft').length;

    // Generate recent activity
    const allItems: Array<{
      id: string;
      type: 'article' | 'news' | 'gallery';
      title: string;
      action: 'created' | 'updated';
      date: string;
    }> = [];

    // Add articles
    articles.forEach(article => {
      allItems.push({
        id: article.id,
        type: 'article',
        title: article.title,
        action: 'created',
        date: article.created_at,
      });
    });

    // Add news
    news.forEach(newsItem => {
      allItems.push({
        id: newsItem.id,
        type: 'news',
        title: newsItem.title,
        action: 'created',
        date: newsItem.created_at,
      });
    });

    // Add gallery images
    gallery.forEach((image: any) => {
      allItems.push({
        id: image.id,
        type: 'gallery',
        title: image.alt,
        action: 'created',
        date: image.uploadDate,
      });
    });

    // Sort by date and take last 10
    const recentActivity = allItems
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 10);

    setStats({
      totalArticles: articles.length,
      publishedArticles,
      draftArticles,
      totalNews: news.length,
      publishedNews,
      draftNews,
      totalGalleryImages: gallery.length,
      recentActivity,
    });
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'article':
        return <FileText className="w-4 h-4 text-blue-500" />;
      case 'news':
        return <Newspaper className="w-4 h-4 text-green-500" />;
      case 'gallery':
        return <ImageIcon className="w-4 h-4 text-purple-500" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const getActivityTypeLabel = (type: string) => {
    switch (type) {
      case 'article':
        return 'Artikel';
      case 'news':
        return 'Berita';
      case 'gallery':
        return 'Galeri';
      default:
        return 'Aktivitas';
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-8"
      >
        <h1 className="text-4xl font-bold text-foreground mb-4">
          <span className="text-primary">STC</span> Admin Dashboard
        </h1>
        <p className="text-xl text-muted-foreground">
          Selamat datang di pusat kendali Swaragama Training Center
        </p>
        <div className="mt-4">
          <Badge variant="secondary" className="px-4 py-2">
            {new Date().toLocaleDateString('id-ID', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Badge>
        </div>
      </motion.div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Articles Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tips & Tricks</CardTitle>
              <FileText className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalArticles}</div>
              <div className="text-xs text-muted-foreground flex items-center gap-2 mt-2">
                <span className="flex items-center">
                  <Eye className="w-3 h-3 mr-1 text-green-500" />
                  {stats.publishedArticles} Published
                </span>
                <span className="flex items-center">
                  <Edit className="w-3 h-3 mr-1 text-orange-500" />
                  {stats.draftArticles} Draft
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* News Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Berita Terbaru</CardTitle>
              <Newspaper className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalNews}</div>
              <div className="text-xs text-muted-foreground flex items-center gap-2 mt-2">
                <span className="flex items-center">
                  <Eye className="w-3 h-3 mr-1 text-green-500" />
                  {stats.publishedNews} Published
                </span>
                <span className="flex items-center">
                  <Edit className="w-3 h-3 mr-1 text-orange-500" />
                  {stats.draftNews} Draft
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Gallery Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Galeri Foto</CardTitle>
              <ImageIcon className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalGalleryImages}</div>
              <p className="text-xs text-muted-foreground mt-2">
                Foto kegiatan & program
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Total Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Konten</CardTitle>
              <BarChart3 className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.totalArticles + stats.totalNews + stats.totalGalleryImages}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Artikel, berita & foto
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="w-5 h-5 mr-2 text-primary" />
              Aktivitas Terbaru
            </CardTitle>
          </CardHeader>
          <CardContent>
            {stats.recentActivity.length > 0 ? (
              <div className="space-y-4">
                {stats.recentActivity.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-accent transition-colors"
                  >
                    <div className="mt-1">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {getActivityTypeLabel(activity.type)}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {activity.action === 'created' ? 'Dibuat' : 'Diperbarui'}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-foreground truncate mt-1">
                        {activity.title}
                      </p>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(activity.date).toLocaleDateString('id-ID', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Activity className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium text-foreground mb-2">Belum Ada Aktivitas</h3>
                <p className="text-sm text-muted-foreground">
                  Mulai menambahkan konten untuk melihat aktivitas di sini
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* System Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2 text-primary" />
              Informasi Sistem
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-green-500 mb-1">Online</div>
                <p className="text-sm text-muted-foreground">Status Sistem</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary mb-1">LocalStorage</div>
                <p className="text-sm text-muted-foreground">Database Type</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground mb-1">v1.0.0</div>
                <p className="text-sm text-muted-foreground">Admin Version</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}