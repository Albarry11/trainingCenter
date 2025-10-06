import React, { useState, useEffect, useMemo } from 'react';
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Eye,
  Calendar,
  User,
  Tag,
  MoreHorizontal,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Separator } from '../ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import { toast } from 'sonner';
import { NewsItem, NewsFilters } from '../../types/admin';
import { NewsForm } from './NewsForm';

const ITEMS_PER_PAGE = 10;

const NEWS_CATEGORIES = [
  'Prestasi',
  'Kerjasama',
  'Pelatihan',
  'Event',
  'Pengumuman',
  'Lainnya'
];

export function NewsManager() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Filters and sorting
  const [filters, setFilters] = useState<NewsFilters>({
    search: '',
    category: '',
    status: '',
    sortBy: 'date',
    sortOrder: 'desc'
  });

  // Load news from localStorage on component mount
  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = () => {
    setLoading(true);
    try {
      const savedNews = localStorage.getItem('stc-news');
      if (savedNews) {
        setNews(JSON.parse(savedNews));
      } else {
        // Initialize with empty news array
        const defaultNews: NewsItem[] = [];
        setNews(defaultNews);
        localStorage.setItem('stc-news', JSON.stringify(defaultNews));
      }
    } catch (error) {
      toast.error('Gagal memuat data berita');
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort news
  const filteredNews = useMemo(() => {
    let filtered = [...news];

    // Apply search filter
    if (filters.search) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.author.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(item => item.category === filters.category);
    }

    // Apply status filter
    if (filters.status) {
      filtered = filtered.filter(item => item.status === filters.status);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (filters.sortBy) {
        case 'title':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case 'author':
          aValue = a.author.toLowerCase();
          bValue = b.author.toLowerCase();
          break;
        case 'date':
          aValue = new Date(a.date);
          bValue = new Date(b.date);
          break;
        case 'createdAt':
          aValue = new Date(a.createdAt);
          bValue = new Date(b.createdAt);
          break;
        default:
          aValue = a.date;
          bValue = b.date;
      }

      if (aValue < bValue) return filters.sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return filters.sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [news, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredNews.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedNews = filteredNews.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const handleSave = (formData: any) => {
    try {
      const timestamp = new Date().toISOString();
      
      if (editingNews) {
        // Update existing news
        const updatedNews = news.map(item =>
          item.id === editingNews.id
            ? { ...formData, id: editingNews.id, updatedAt: timestamp }
            : item
        );
        setNews(updatedNews);
        localStorage.setItem('stc-news', JSON.stringify(updatedNews));
        toast.success('Berita berhasil diperbarui!');
      } else {
        // Create new news
        const newNews: NewsItem = {
          ...formData,
          id: Date.now().toString(),
          createdAt: timestamp,
          updatedAt: timestamp
        };
        const updatedNews = [...news, newNews];
        setNews(updatedNews);
        localStorage.setItem('stc-news', JSON.stringify(updatedNews));
        toast.success('Berita baru berhasil ditambahkan!');
      }
      
      setShowForm(false);
      setEditingNews(null);
    } catch (error) {
      toast.error('Gagal menyimpan berita');
    }
  };

  const handleDelete = (id: string) => {
    try {
      const updatedNews = news.filter(item => item.id !== id);
      setNews(updatedNews);
      localStorage.setItem('stc-news', JSON.stringify(updatedNews));
      toast.success('Berita berhasil dihapus!');
      setDeleteId(null);
    } catch (error) {
      toast.error('Gagal menghapus berita');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-500';
      case 'draft': return 'bg-yellow-500';
      case 'archived': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'published': return 'Terbit';
      case 'draft': return 'Draft';
      case 'archived': return 'Arsip';
      default: return status;
    }
  };

  if (showForm) {
    return (
      <NewsForm
        news={editingNews}
        onSave={handleSave}
        onCancel={() => {
          setShowForm(false);
          setEditingNews(null);
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Kelola Berita Terbaru</h2>
          <p className="text-muted-foreground">Kelola berita dan update terbaru Swaragama Training Center</p>
        </div>
        <Button onClick={() => setShowForm(true)} className="w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Tambah Berita
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filter & Pencarian
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Cari berita..."
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                className="pl-9"
              />
            </div>

            {/* Category Filter */}
            <Select
              value={filters.category}
              onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Semua Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Semua Kategori</SelectItem>
                {NEWS_CATEGORIES.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Status Filter */}
            <Select
              value={filters.status}
              onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Semua Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Semua Status</SelectItem>
                <SelectItem value="published">Terbit</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="archived">Arsip</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select
              value={`${filters.sortBy}-${filters.sortOrder}`}
              onValueChange={(value) => {
                const [sortBy, sortOrder] = value.split('-');
                setFilters(prev => ({ 
                  ...prev, 
                  sortBy: sortBy as any, 
                  sortOrder: sortOrder as 'asc' | 'desc' 
                }));
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date-desc">Tanggal Terbaru</SelectItem>
                <SelectItem value="date-asc">Tanggal Terlama</SelectItem>
                <SelectItem value="title-asc">Judul A-Z</SelectItem>
                <SelectItem value="title-desc">Judul Z-A</SelectItem>
                <SelectItem value="author-asc">Penulis A-Z</SelectItem>
                <SelectItem value="author-desc">Penulis Z-A</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Results info */}
          <div className="mt-4 text-sm text-muted-foreground">
            Menampilkan {filteredNews.length} dari {news.length} berita
          </div>
        </CardContent>
      </Card>

      {/* News List */}
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : paginatedNews.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-muted-foreground">
                {filteredNews.length === 0 && news.length === 0 
                  ? 'Belum ada berita. Tambahkan berita pertama!'
                  : 'Tidak ada berita yang sesuai dengan filter.'
                }
              </div>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {paginatedNews.map((item, index) => (
                <div key={item.id} className="p-6 hover:bg-muted/50 transition-colors">
                  <div className="flex flex-col lg:flex-row gap-4">
                    {/* Image */}
                    <div className="w-full lg:w-48 h-32 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary" className="text-xs">
                              {item.category}
                            </Badge>
                            <Badge 
                              className={`text-xs text-white ${getStatusColor(item.status)}`}
                            >
                              {getStatusLabel(item.status)}
                            </Badge>
                          </div>
                          
                          <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                            {item.title}
                          </h3>
                          
                          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                            {item.excerpt}
                          </p>
                          
                          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {item.author}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(item.date).toLocaleDateString('id-ID')}
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => {
                                setEditingNews(item);
                                setShowForm(true);
                              }}
                            >
                              <Edit2 className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => setDeleteId(item.id)}
                              className="text-destructive"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Hapus
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Halaman {currentPage} dari {totalPages}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" />
              Sebelumnya
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Selanjutnya
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Berita</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus berita ini? Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && handleDelete(deleteId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}