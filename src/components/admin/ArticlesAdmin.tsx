import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  FileText,
  Newspaper,
  Eye,
  Calendar,
  User,
  Tag,
  AlertCircle,
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Alert, AlertDescription } from '../ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { localStorageService } from '../../services/localStorageService';
import { toast } from 'sonner@2.0.3';

interface Article {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  publishedAt: string;
  status: 'published' | 'draft';
  tags: string[];
  featured_image?: string;
  author: string;
  category: string;
  created_at: string;
}

interface News {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  publishedAt: string;
  status: 'published' | 'draft';
  featured_image?: string;
  author: string;
  category: string;
  created_at: string;
}

interface ArticleFormData {
  title: string;
  content: string;
  excerpt: string;
  author: string;
  category: string;
  tags: string;
  status: 'published' | 'draft';
}

export function ArticlesAdmin() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [news, setNews] = useState<News[]>([]);
  const [activeTab, setActiveTab] = useState<'tips' | 'news'>('tips');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Article | News | null>(null);
  const [formData, setFormData] = useState<ArticleFormData>({
    title: '',
    content: '',
    excerpt: '',
    author: '',
    category: '',
    tags: '',
    status: 'published',
  });

  // Load data on mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setArticles(localStorageService.getArticles());
    setNews(localStorageService.getNews());
  };

  // Article categories
  const articleCategories = [
    'Public Speaking',
    'Master of Ceremony',
    'Voice Over',
    'Kids Program',
    'Komunikasi Bisnis',
    'Broadcasting',
    'Lainnya',
  ];

  // News categories
  const newsCategories = [
    'Prestasi',
    'Kerjasama',
    'Program Baru',
    'Event',
    'Pengumuman',
    'Lainnya',
  ];

  // Authors
  const authors = [
    'Dina Alia',
    'Cici Priskila',
    'Bara Zulfa',
    'Bertha Virginia',
    'Ayu Rizqia',
    'Kani Raras',
    'Gideon Surya',
    'Riza Perdana',
  ];

  // Reset form
  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      excerpt: '',
      author: '',
      category: '',
      tags: '',
      status: 'published',
    });
    setSelectedItem(null);
  };

  // Handle add
  const handleAdd = () => {
    if (!formData.title.trim() || !formData.content.trim() || !formData.excerpt.trim()) {
      toast.error('Judul, konten, dan excerpt harus diisi');
      return;
    }

    const tagsArray = formData.tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    const newData = {
      title: formData.title.trim(),
      content: formData.content.trim(),
      excerpt: formData.excerpt.trim(),
      publishedAt: new Date().toISOString(),
      status: formData.status,
      tags: tagsArray,
      author: formData.author || 'Admin',
      category: formData.category || (activeTab === 'tips' ? 'Lainnya' : 'Pengumuman'),
    };

    if (activeTab === 'tips') {
      localStorageService.addArticle(newData);
    } else {
      localStorageService.addNews(newData);
    }

    loadData();
    resetForm();
    setIsAddModalOpen(false);
    toast.success(`${activeTab === 'tips' ? 'Artikel' : 'Berita'} berhasil ditambahkan`);
  };

  // Handle edit
  const handleEdit = () => {
    if (!selectedItem || !formData.title.trim() || !formData.content.trim() || !formData.excerpt.trim()) {
      toast.error('Judul, konten, dan excerpt harus diisi');
      return;
    }

    const tagsArray = formData.tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    const updates = {
      title: formData.title.trim(),
      content: formData.content.trim(),
      excerpt: formData.excerpt.trim(),
      status: formData.status,
      tags: tagsArray,
      author: formData.author || 'Admin',
      category: formData.category || (activeTab === 'tips' ? 'Lainnya' : 'Pengumuman'),
    };

    if (activeTab === 'tips') {
      localStorageService.updateArticle(selectedItem.id, updates);
    } else {
      localStorageService.updateNews(selectedItem.id, updates);
    }

    loadData();
    resetForm();
    setIsEditModalOpen(false);
    toast.success(`${activeTab === 'tips' ? 'Artikel' : 'Berita'} berhasil diperbarui`);
  };

  // Handle delete
  const handleDelete = (id: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus ${activeTab === 'tips' ? 'artikel' : 'berita'} ini?`)) {
      if (activeTab === 'tips') {
        localStorageService.deleteArticle(id);
      } else {
        localStorageService.deleteNews(id);
      }
      loadData();
      toast.success(`${activeTab === 'tips' ? 'Artikel' : 'Berita'} berhasil dihapus`);
    }
  };

  // Open edit modal
  const openEditModal = (item: Article | News) => {
    setSelectedItem(item);
    setFormData({
      title: item.title,
      content: item.content,
      excerpt: item.excerpt,
      author: item.author,
      category: item.category,
      tags: item.tags.join(', '),
      status: item.status,
    });
    setIsEditModalOpen(true);
  };

  // Get current data
  const currentData = activeTab === 'tips' ? articles : news;
  const currentCategories = activeTab === 'tips' ? articleCategories : newsCategories;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Kelola Konten</h1>
          <p className="text-muted-foreground mt-2">
            Kelola artikel tips & tricks dan berita terbaru Swaragama Training Center
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'tips' | 'news')}>
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="tips" className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Tips & Tricks</span>
            </TabsTrigger>
            <TabsTrigger value="news" className="flex items-center space-x-2">
              <Newspaper className="w-4 h-4" />
              <span>Berita Terbaru</span>
            </TabsTrigger>
          </TabsList>

          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Tambah {activeTab === 'tips' ? 'Artikel' : 'Berita'}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Tambah {activeTab === 'tips' ? 'Artikel' : 'Berita'} Baru</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Judul</label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Masukkan judul"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Kategori</label>
                    <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        {currentCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Penulis</label>
                    <Select value={formData.author} onValueChange={(value) => setFormData(prev => ({ ...prev, author: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih penulis" />
                      </SelectTrigger>
                      <SelectContent>
                        {authors.map((author) => (
                          <SelectItem key={author} value={author}>
                            {author}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Status</label>
                    <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as 'published' | 'draft' }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Excerpt (Ringkasan)</label>
                  <Textarea
                    value={formData.excerpt}
                    onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                    placeholder="Ringkasan singkat yang akan ditampilkan di kartu artikel/berita"
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Tags (pisahkan dengan koma)</label>
                  <Input
                    value={formData.tags}
                    onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                    placeholder="public speaking, komunikasi, tips"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Konten</label>
                  <Textarea
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Tulis konten lengkap di sini..."
                    rows={10}
                    required
                  />
                </div>

                <div className="flex gap-3">
                  <Button onClick={handleAdd} className="flex-1">
                    <Save className="w-4 h-4 mr-2" />
                    Simpan {activeTab === 'tips' ? 'Artikel' : 'Berita'}
                  </Button>
                  <Button variant="outline" onClick={() => { resetForm(); setIsAddModalOpen(false); }} className="flex-1">
                    Batal
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <TabsContent value="tips" className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Artikel</p>
                    <p className="text-2xl font-bold">{articles.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Eye className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Published</p>
                    <p className="text-2xl font-bold">{articles.filter(a => a.status === 'published').length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Edit className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Draft</p>
                    <p className="text-2xl font-bold">{articles.filter(a => a.status === 'draft').length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Articles List */}
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <Badge variant={article.status === 'published' ? 'default' : 'secondary'}>
                          {article.status === 'published' ? 'Published' : 'Draft'}
                        </Badge>
                        <div className="flex space-x-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => openEditModal(article)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(article.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <CardTitle className="text-lg line-clamp-2">{article.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <User className="w-3 h-3" />
                          <span>{article.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(article.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Tag className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{article.category}</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Belum Ada Artikel</h3>
              <p className="text-muted-foreground mb-6">
                Mulai membuat artikel tips & tricks untuk dibagikan ke peserta
              </p>
              <Button onClick={() => setIsAddModalOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Tambah Artikel Pertama
              </Button>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="news" className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Newspaper className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Berita</p>
                    <p className="text-2xl font-bold">{news.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Eye className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Published</p>
                    <p className="text-2xl font-bold">{news.filter(n => n.status === 'published').length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Edit className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Draft</p>
                    <p className="text-2xl font-bold">{news.filter(n => n.status === 'draft').length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* News List */}
          {news.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map((newsItem, index) => (
                <motion.div
                  key={newsItem.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <Badge variant={newsItem.status === 'published' ? 'default' : 'secondary'}>
                          {newsItem.status === 'published' ? 'Published' : 'Draft'}
                        </Badge>
                        <div className="flex space-x-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => openEditModal(newsItem)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(newsItem.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <CardTitle className="text-lg line-clamp-2">{newsItem.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {newsItem.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <User className="w-3 h-3" />
                          <span>{newsItem.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(newsItem.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Tag className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{newsItem.category}</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <Newspaper className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Belum Ada Berita</h3>
              <p className="text-muted-foreground mb-6">
                Mulai membuat berita tentang kegiatan dan pencapaian Swaragama
              </p>
              <Button onClick={() => setIsAddModalOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Tambah Berita Pertama
              </Button>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit {activeTab === 'tips' ? 'Artikel' : 'Berita'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Judul</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Masukkan judul"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Kategori</label>
                <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    {currentCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Penulis</label>
                <Select value={formData.author} onValueChange={(value) => setFormData(prev => ({ ...prev, author: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih penulis" />
                  </SelectTrigger>
                  <SelectContent>
                    {authors.map((author) => (
                      <SelectItem key={author} value={author}>
                        {author}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Status</label>
                <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as 'published' | 'draft' }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Excerpt (Ringkasan)</label>
              <Textarea
                value={formData.excerpt}
                onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                placeholder="Ringkasan singkat yang akan ditampilkan di kartu artikel/berita"
                rows={3}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tags (pisahkan dengan koma)</label>
              <Input
                value={formData.tags}
                onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                placeholder="public speaking, komunikasi, tips"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Konten</label>
              <Textarea
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Tulis konten lengkap di sini..."
                rows={10}
                required
              />
            </div>

            <div className="flex gap-3">
              <Button onClick={handleEdit} className="flex-1">
                <Save className="w-4 h-4 mr-2" />
                Simpan Perubahan
              </Button>
              <Button variant="outline" onClick={() => { resetForm(); setIsEditModalOpen(false); }} className="flex-1">
                Batal
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Info Alert */}
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Artikel dan berita yang dipublish akan muncul di section "STC Corner" pada halaman utama website. 
          Pastikan konten berkualitas dan informatif untuk pengunjung.
        </AlertDescription>
      </Alert>
    </div>
  );
}