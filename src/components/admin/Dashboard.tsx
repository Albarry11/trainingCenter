import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { 
  FileText, 
  Eye, 
  Heart, 
  FolderOpen,
  TrendingUp,
  Calendar,
  Clock,
  Users
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { AdminStats } from '../../types/admin';
import { DatabaseStats } from '../../types/database';
import { adminApi } from '../../services/adminApi';

export function Dashboard() {
  const [stats, setStats] = useState<DatabaseStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDashboardStats();
  }, []);

  const loadDashboardStats = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await adminApi.getDashboardStats();
      
      if (response.success && response.data) {
        setStats(response.data);
      } else {
        // Fallback to localStorage data if MongoDB not available
        const articles = JSON.parse(localStorage.getItem('stc-articles') || '[]');
        const news = JSON.parse(localStorage.getItem('stc-news') || '[]');
        const gallery = JSON.parse(localStorage.getItem('stc-gallery') || '[]');
        
        const fallbackStats: DatabaseStats = {
          totalArticles: articles.length,
          totalNews: news.length,
          totalGallery: gallery.length,
          totalUsers: 1,
          publishedArticles: articles.filter((a: any) => a.published !== false).length,
          publishedNews: news.filter((n: any) => n.published !== false).length,
          publishedGallery: gallery.filter((g: any) => g.published !== false).length,
          recentActivity: {
            articles: articles.filter((a: any) => {
              const createdAt = new Date(a.createdAt || a.publishDate || Date.now());
              const weekAgo = new Date();
              weekAgo.setDate(weekAgo.getDate() - 7);
              return createdAt >= weekAgo;
            }).length,
            news: news.filter((n: any) => {
              const createdAt = new Date(n.createdAt || n.publishDate || Date.now());
              const weekAgo = new Date();
              weekAgo.setDate(weekAgo.getDate() - 7);
              return createdAt >= weekAgo;
            }).length,
            gallery: gallery.filter((g: any) => {
              const createdAt = new Date(g.createdAt || g.uploadDate || Date.now());
              const weekAgo = new Date();
              weekAgo.setDate(weekAgo.getDate() - 7);
              return createdAt >= weekAgo;
            }).length
          },
          storage: {
            totalSize: 0,
            collections: {}
          }
        };
        
        setStats(fallbackStats);
        setError('Using localStorage data. Connect to MongoDB for real-time stats.');
      }
    } catch (err) {
      setError('Failed to load dashboard stats');
      console.error('Dashboard stats error:', err);
    }
    
    setLoading(false);
  };

  const statCards = [
    {
      title: 'Total Articles',
      value: stats?.totalArticles || 0,
      icon: FileText,
      change: `+${stats?.recentActivity.articles || 0} this week`,
      changeType: 'positive' as const
    },
    {
      title: 'Published Articles',
      value: stats?.publishedArticles || 0,
      icon: Eye,
      change: `${Math.round(((stats?.publishedArticles || 0) / (stats?.totalArticles || 1)) * 100)}% published`,
      changeType: 'positive' as const
    },
    {
      title: 'Total News',
      value: stats?.totalNews || 0,
      icon: TrendingUp,
      change: `+${stats?.recentActivity.news || 0} this week`,
      changeType: 'positive' as const
    },
    {
      title: 'Gallery Items',
      value: stats?.totalGallery || 0,
      icon: Heart,
      change: `+${stats?.recentActivity.gallery || 0} this week`,
      changeType: 'positive' as const
    }
  ];

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(new Date(date));
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-8 bg-muted rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">MongoDB Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your STC Corner content in database
          </p>
          {error && (
            <p className="text-amber-600 text-sm mt-1">{error}</p>
          )}
        </div>
        <Button>
          <FileText className="w-4 h-4 mr-2" />
          New Article
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold">
                      {formatNumber(stat.value)}
                    </p>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {stat.change}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Database Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Database Overview
            </CardTitle>
            <CardDescription>
              Content distribution across collections
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-primary" />
                  <div>
                    <h4 className="font-medium">Articles</h4>
                    <p className="text-sm text-muted-foreground">Tips & Tricks content</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">{stats?.totalArticles || 0}</p>
                  <p className="text-sm text-green-600">{stats?.publishedArticles || 0} published</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <div>
                    <h4 className="font-medium">News</h4>
                    <p className="text-sm text-muted-foreground">Latest news & updates</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">{stats?.totalNews || 0}</p>
                  <p className="text-sm text-green-600">{stats?.publishedNews || 0} published</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex items-center space-x-3">
                  <FolderOpen className="w-5 h-5 text-purple-600" />
                  <div>
                    <h4 className="font-medium">Gallery</h4>
                    <p className="text-sm text-muted-foreground">Photos & media</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">{stats?.totalGallery || 0}</p>
                  <p className="text-sm text-green-600">{stats?.publishedGallery || 0} published</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Database Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Database Actions
            </CardTitle>
            <CardDescription>
              MongoDB management tools
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <FileText className="w-4 h-4 mr-2" />
              View All Articles
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <TrendingUp className="w-4 h-4 mr-2" />
              Manage News
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <FolderOpen className="w-4 h-4 mr-2" />
              Gallery Manager
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Calendar className="w-4 h-4 mr-2" />
              Migration Tool
            </Button>

            {/* Recent Activity */}
            <div className="pt-4 border-t border-border">
              <h4 className="font-medium mb-3">Recent Activity (7 days)</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">New Articles</span>
                  <span className="font-medium">{stats?.recentActivity.articles || 0}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">New News</span>
                  <span className="font-medium">{stats?.recentActivity.news || 0}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">New Gallery</span>
                  <span className="font-medium">{stats?.recentActivity.gallery || 0}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Database Status</span>
                  <span className="font-medium text-green-600">
                    {error ? 'LocalStorage' : 'MongoDB'}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}