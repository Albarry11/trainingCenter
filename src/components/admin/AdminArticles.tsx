import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Calendar,
  User,
  ArrowRight,
  Lightbulb,
  Newspaper,
  Edit3,
  Save,
  X,
  Plus,
  Trash2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { toast } from 'sonner';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  image: string;
  author: string;
  date: string;
  category: string;
  readTime?: string;
  tags?: string[];
}

interface ArticlesData {
  title: string;
  subtitle: string;
  description: string;
  newsArticles: Article[];
  tipsArticles: Article[];
}

interface AdminArticlesProps {
  isPreviewMode: boolean;
  onContentChange: () => void;
}

const defaultArticlesData: ArticlesData = {
  title: "STC Corner",
  subtitle: "Update Terbaru Seputar Pelatihan",
  description: "Update terbaru seputar artikel, tips, dan kegiatan pelatihan yang sudah kami lakukan.",
  newsArticles: [],
  tipsArticles: []
};

export function AdminArticles({ isPreviewMode, onContentChange }: AdminArticlesProps) {
  const [articlesData, setArticlesData] = useState<ArticlesData>(defaultArticlesData);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [tempData, setTempData] = useState<any>(null);
  const [currentTab, setCurrentTab] = useState<'news' | 'tips'>('news');
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [currentTipsIndex, setCurrentTipsIndex] = useState(0);

  useEffect(() => {
    // Load data from localStorage
    const savedNews = localStorage.getItem('stc-news');
    const savedTips = localStorage.getItem('stc-articles');
    
    if (savedNews || savedTips) {
      try {
        const updatedData = { ...articlesData };
        if (savedNews) {
          updatedData.newsArticles = JSON.parse(savedNews);
        }
        if (savedTips) {
          updatedData.tipsArticles = JSON.parse(savedTips);
        }
        setArticlesData(updatedData);
      } catch (error) {
        console.error('Error loading articles data:', error);
      }
    }

    // Load header data
    const savedHeaderData = localStorage.getItem('stc-articles-header');
    if (savedHeaderData) {
      try {
        const headerData = JSON.parse(savedHeaderData);
        setArticlesData(prev => ({ ...prev, ...headerData }));
      } catch (error) {
        console.error('Error loading articles header data:', error);
      }
    }

    // Listen for save all events
    const handleSaveAll = () => {
      saveData();
    };
    window.addEventListener('admin-save-all', handleSaveAll);
    
    return () => {
      window.removeEventListener('admin-save-all', handleSaveAll);
    };
  }, []);

  const saveData = () => {
    // Save articles data to respective localStorage keys
    localStorage.setItem('stc-news', JSON.stringify(articlesData.newsArticles));
    localStorage.setItem('stc-articles', JSON.stringify(articlesData.tipsArticles));
    localStorage.setItem('stc-articles-header', JSON.stringify({
      title: articlesData.title,
      subtitle: articlesData.subtitle,
      description: articlesData.description
    }));
    toast.success('Data Articles berhasil disimpan!');
  };

  const handleEdit = (section: string) => {
    setEditingSection(section);
    setTempData({ ...articlesData });
  };

  const handleSave = () => {
    setArticlesData(tempData);
    setEditingSection(null);
    setTempData(null);
    onContentChange();
    toast.success('Perubahan berhasil disimpan!');
  };

  const handleCancel = () => {
    setEditingSection(null);
    setTempData(null);
  };

  const handleAddArticle = (type: 'news' | 'tips') => {
    const newArticle: Article = {
      id: Date.now().toString(),
      title: 'Artikel Baru',
      excerpt: 'Deskripsi artikel baru',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      author: 'Admin STC',
      date: new Date().toISOString().split('T')[0],
      category: 'Kategori',
      ...(type === 'tips' && { readTime: '5 menit baca' })
    };
    
    const field = type === 'news' ? 'newsArticles' : 'tipsArticles';
    setTempData({
      ...tempData,
      [field]: [...tempData[field], newArticle]
    });
  };

  const handleRemoveArticle = (type: 'news' | 'tips', id: string) => {
    const field = type === 'news' ? 'newsArticles' : 'tipsArticles';
    setTempData({
      ...tempData,
      [field]: tempData[field].filter((article: Article) => article.id !== id)
    });
  };

  const updateArticle = (type: 'news' | 'tips', articleId: string, field: string, value: any) => {
    const arrayField = type === 'news' ? 'newsArticles' : 'tipsArticles';
    const updatedArticles = tempData[arrayField].map((article: Article) =>
      article.id === articleId ? { ...article, [field]: value } : article
    );
    setTempData({ ...tempData, [arrayField]: updatedArticles });
  };

  // Navigation functions
  const nextNews = () => {
    setCurrentNewsIndex((prev) => (prev + 1) % Math.max(1, Math.ceil(articlesData.newsArticles.length / 2)));
  };

  const prevNews = () => {
    setCurrentNewsIndex((prev) => (prev - 1 + Math.max(1, Math.ceil(articlesData.newsArticles.length / 2))) % Math.max(1, Math.ceil(articlesData.newsArticles.length / 2)));
  };

  const nextTips = () => {
    setCurrentTipsIndex((prev) => (prev + 1) % Math.max(1, Math.ceil(articlesData.tipsArticles.length / 2)));
  };

  const prevTips = () => {
    setCurrentTipsIndex((prev) => (prev - 1 + Math.max(1, Math.ceil(articlesData.tipsArticles.length / 2))) % Math.max(1, Math.ceil(articlesData.tipsArticles.length / 2)));
  };

  // Get visible articles for current page
  const getVisibleNews = () => {
    const startIndex = currentNewsIndex * 2;
    return articlesData.newsArticles.slice(startIndex, startIndex + 2);
  };

  const getVisibleTips = () => {
    const startIndex = currentTipsIndex * 2;
    return articlesData.tipsArticles.slice(startIndex, startIndex + 2);
  };

  if (isPreviewMode) {
    return <ArticlesPreview data={articlesData} />;
  }

  return (
    <section className="py-20 bg-gradient-to-br from-primary/25 via-accent/40 to-primary/15 relative overflow-hidden">
      {/* Background decorations - same as main site */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-accent/50 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-primary/20 rounded-full blur-2xl"></div>
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-primary/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-40 h-40 bg-accent/35 rounded-full blur-2xl"></div>
        <div className="absolute top-3/4 right-1/3 w-28 h-28 bg-primary/12 rounded-full blur-xl"></div>
        <div className="absolute top-16 right-16 w-16 h-16 bg-primary/20 rotate-45 blur-sm"></div>
        <div className="absolute bottom-32 left-32 w-20 h-20 bg-accent/40 rotate-12 blur-sm"></div>
        <div className="absolute top-2/3 left-16 w-12 h-12 bg-primary/15 rotate-45 blur-sm"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-30"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16 relative">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h2 className="text-4xl font-bold">
              <span className="text-primary">STC</span>{" "}
              <span className="text-foreground">CORNER</span>
            </h2>
            {editingSection !== 'header' && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEdit('header')}
                className="bg-background/80 backdrop-blur-sm hover:bg-accent"
              >
                <Edit3 className="w-4 h-4" />
              </Button>
            )}
          </div>
          
          {editingSection === 'header' ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-border max-w-2xl mx-auto"
            >
              <div className="space-y-4">
                <Input
                  value={tempData?.title || ''}
                  onChange={(e) => setTempData({ ...tempData, title: e.target.value })}
                  placeholder="Judul utama"
                  className="bg-input-background"
                />
                <Input
                  value={tempData?.subtitle || ''}
                  onChange={(e) => setTempData({ ...tempData, subtitle: e.target.value })}
                  placeholder="Subjudul"
                  className="bg-input-background"
                />
                <Textarea
                  value={tempData?.description || ''}
                  onChange={(e) => setTempData({ ...tempData, description: e.target.value })}
                  placeholder="Deskripsi"
                  rows={3}
                  className="bg-input-background"
                />
                <div className="flex gap-2">
                  <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
                    <Save className="w-4 h-4 mr-2" />
                    Simpan
                  </Button>
                  <Button variant="outline" onClick={handleCancel}>
                    <X className="w-4 h-4 mr-2" />
                    Batal
                  </Button>
                </div>
              </div>
            </motion.div>
          ) : (
            <>
              <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {articlesData.description}
              </p>
            </>
          )}
        </div>

        {/* Articles Section */}
        <div className="relative">
          <div className="flex items-center justify-center gap-4 mb-8">
            <h3 className="text-2xl font-bold text-center">Konten Artikel</h3>
            {editingSection !== 'articles' && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEdit('articles')}
                className="bg-background/80 backdrop-blur-sm hover:bg-accent"
              >
                <Edit3 className="w-4 h-4" />
              </Button>
            )}
          </div>

          {editingSection === 'articles' ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-border"
            >
              <Tabs value={currentTab} onValueChange={(value) => setCurrentTab(value as 'news' | 'tips')}>
                <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-6">
                  <TabsTrigger value="news" className="flex items-center space-x-2">
                    <Newspaper className="w-4 h-4" />
                    <span>Berita Terbaru</span>
                  </TabsTrigger>
                  <TabsTrigger value="tips" className="flex items-center space-x-2">
                    <Lightbulb className="w-4 h-4" />
                    <span>Tips & Trik</span>
                  </TabsTrigger>
                </TabsList>

                {/* News Tab */}
                <TabsContent value="news" className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold">Edit Berita Terbaru</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddArticle('news')}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Tambah Berita
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {tempData?.newsArticles?.map((article: Article, index: number) => (
                      <div key={article.id} className="border border-border rounded-lg p-4 bg-background/50">
                        <div className="flex justify-between items-start mb-3">
                          <span className="text-sm font-medium">Berita {index + 1}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRemoveArticle('news', article.id)}
                            className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <Input
                              value={article.title}
                              onChange={(e) => updateArticle('news', article.id, 'title', e.target.value)}
                              placeholder="Judul berita"
                              className="bg-input-background"
                            />
                            <Textarea
                              value={article.excerpt}
                              onChange={(e) => updateArticle('news', article.id, 'excerpt', e.target.value)}
                              placeholder="Ringkasan berita"
                              rows={3}
                              className="bg-input-background"
                            />
                            <Input
                              value={article.image}
                              onChange={(e) => updateArticle('news', article.id, 'image', e.target.value)}
                              placeholder="URL Gambar"
                              className="bg-input-background"
                            />
                          </div>
                          <div className="space-y-3">
                            <Input
                              value={article.author}
                              onChange={(e) => updateArticle('news', article.id, 'author', e.target.value)}
                              placeholder="Penulis"
                              className="bg-input-background"
                            />
                            <Input
                              type="date"
                              value={article.date}
                              onChange={(e) => updateArticle('news', article.id, 'date', e.target.value)}
                              className="bg-input-background"
                            />
                            <Input
                              value={article.category}
                              onChange={(e) => updateArticle('news', article.id, 'category', e.target.value)}
                              placeholder="Kategori"
                              className="bg-input-background"
                            />
                            <div className="w-full h-24 rounded-lg overflow-hidden bg-muted">
                              <ImageWithFallback
                                src={article.image}
                                alt={article.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                {/* Tips Tab */}
                <TabsContent value="tips" className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold">Edit Tips & Trik</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddArticle('tips')}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Tambah Tips
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {tempData?.tipsArticles?.map((article: Article, index: number) => (
                      <div key={article.id} className="border border-border rounded-lg p-4 bg-background/50">
                        <div className="flex justify-between items-start mb-3">
                          <span className="text-sm font-medium">Tips {index + 1}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRemoveArticle('tips', article.id)}
                            className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <Input
                              value={article.title}
                              onChange={(e) => updateArticle('tips', article.id, 'title', e.target.value)}
                              placeholder="Judul tips"
                              className="bg-input-background"
                            />
                            <Textarea
                              value={article.excerpt}
                              onChange={(e) => updateArticle('tips', article.id, 'excerpt', e.target.value)}
                              placeholder="Ringkasan tips"
                              rows={3}
                              className="bg-input-background"
                            />
                            <Input
                              value={article.image}
                              onChange={(e) => updateArticle('tips', article.id, 'image', e.target.value)}
                              placeholder="URL Gambar"
                              className="bg-input-background"
                            />
                          </div>
                          <div className="space-y-3">
                            <Input
                              value={article.author}
                              onChange={(e) => updateArticle('tips', article.id, 'author', e.target.value)}
                              placeholder="Penulis"
                              className="bg-input-background"
                            />
                            <Input
                              type="date"
                              value={article.date}
                              onChange={(e) => updateArticle('tips', article.id, 'date', e.target.value)}
                              className="bg-input-background"
                            />
                            <div className="grid grid-cols-2 gap-2">
                              <Input
                                value={article.category}
                                onChange={(e) => updateArticle('tips', article.id, 'category', e.target.value)}
                                placeholder="Kategori"
                                className="bg-input-background"
                              />
                              <Input
                                value={article.readTime || ''}
                                onChange={(e) => updateArticle('tips', article.id, 'readTime', e.target.value)}
                                placeholder="Waktu baca"
                                className="bg-input-background"
                              />
                            </div>
                            <div className="w-full h-24 rounded-lg overflow-hidden bg-muted">
                              <ImageWithFallback
                                src={article.image}
                                alt={article.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="flex gap-2 mt-6">
                <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
                  <Save className="w-4 h-4 mr-2" />
                  Simpan
                </Button>
                <Button variant="outline" onClick={handleCancel}>
                  <X className="w-4 h-4 mr-2" />
                  Batal
                </Button>
              </div>
            </motion.div>
          ) : (
            <Tabs defaultValue="news" className="w-full">
              <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-12 bg-muted/60 p-1">
                <TabsTrigger
                  value="news"
                  className="flex items-center space-x-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md data-[state=active]:font-bold transition-all duration-300"
                >
                  <Newspaper className="w-4 h-4" />
                  <span>Berita Terbaru</span>
                </TabsTrigger>
                <TabsTrigger
                  value="tips"
                  className="flex items-center space-x-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md data-[state=active]:font-bold transition-all duration-300"
                >
                  <Lightbulb className="w-4 h-4" />
                  <span>Tips & Trik</span>
                </TabsTrigger>
              </TabsList>

              {/* News Tab */}
              <TabsContent value="news">
                <div className="relative">
                  {/* Navigation Buttons */}
                  <div className="hidden md:block">
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-background/80 backdrop-blur-sm border-border/50 hover:bg-accent shadow-lg"
                      onClick={prevNews}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-background/80 backdrop-blur-sm border-border/50 hover:bg-accent shadow-lg"
                      onClick={nextNews}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Articles Grid */}
                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    key={`news-${currentNewsIndex}`}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {getVisibleNews().map((article, index) => (
                      <motion.div
                        key={article.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary group bg-card h-full">
                          <div className="relative overflow-hidden">
                            <ImageWithFallback
                              src={article.image}
                              alt={article.title}
                              className="w-full h-48 object-cover object-[center_35%] group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute top-4 left-4">
                              <Badge className="bg-primary text-primary-foreground hover:bg-primary/90">
                                {article.category}
                              </Badge>
                            </div>
                          </div>
                          <CardHeader>
                            <h3 className="font-bold text-xl text-card-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
                              {article.title}
                            </h3>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <p className="text-muted-foreground leading-relaxed line-clamp-3">
                              {article.excerpt}
                            </p>
                            <div className="flex items-center justify-between pt-4 border-t border-border">
                              <div className="flex items-center space-x-2">
                                <User className="w-4 h-4 text-primary" />
                                <span className="text-sm text-muted-foreground">{article.author}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Calendar className="w-4 h-4 text-primary" />
                                <span className="text-sm text-muted-foreground">
                                  {new Date(article.date).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                            <button className="flex items-center space-x-2 text-primary hover:text-primary/80 font-medium group/btn">
                              <span>Baca Selengkapnya</span>
                              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                            </button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </TabsContent>

              {/* Tips Tab */}
              <TabsContent value="tips">
                <div className="relative">
                  {/* Navigation Buttons */}
                  <div className="hidden md:block">
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-background/80 backdrop-blur-sm border-border/50 hover:bg-accent shadow-lg"
                      onClick={prevTips}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-background/80 backdrop-blur-sm border-border/50 hover:bg-accent shadow-lg"
                      onClick={nextTips}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Articles Grid */}
                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    key={`tips-${currentTipsIndex}`}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {getVisibleTips().map((article, index) => (
                      <motion.div
                        key={article.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary group bg-card h-full">
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <Badge className="bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground mb-3">
                                {article.category}
                              </Badge>
                              <span className="text-sm text-muted-foreground">{article.readTime}</span>
                            </div>
                            <h3 className="font-bold text-xl text-card-foreground group-hover:text-primary transition-colors duration-300">
                              {article.title}
                            </h3>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <p className="text-muted-foreground leading-relaxed">{article.excerpt}</p>
                            <div className="flex items-center justify-between pt-4 border-t border-border">
                              <div className="flex items-center space-x-2">
                                <User className="w-4 h-4 text-primary" />
                                <span className="text-sm text-muted-foreground">{article.author}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Calendar className="w-4 h-4 text-primary" />
                                <span className="text-sm text-muted-foreground">
                                  {new Date(article.date).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                            <button className="flex items-center space-x-2 text-primary hover:text-primary/80 font-medium group/btn">
                              <span>Baca Artikel</span>
                              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                            </button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </section>
  );
}

// Preview component that shows exactly like the main website
function ArticlesPreview({ data }: { data: ArticlesData }) {
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [currentTipsIndex, setCurrentTipsIndex] = useState(0);

  const nextNews = () => {
    setCurrentNewsIndex((prev) => (prev + 1) % Math.max(1, Math.ceil(data.newsArticles.length / 2)));
  };

  const prevNews = () => {
    setCurrentNewsIndex((prev) => (prev - 1 + Math.max(1, Math.ceil(data.newsArticles.length / 2))) % Math.max(1, Math.ceil(data.newsArticles.length / 2)));
  };

  const nextTips = () => {
    setCurrentTipsIndex((prev) => (prev + 1) % Math.max(1, Math.ceil(data.tipsArticles.length / 2)));
  };

  const prevTips = () => {
    setCurrentTipsIndex((prev) => (prev - 1 + Math.max(1, Math.ceil(data.tipsArticles.length / 2))) % Math.max(1, Math.ceil(data.tipsArticles.length / 2)));
  };

  const getVisibleNews = () => {
    const startIndex = currentNewsIndex * 2;
    return data.newsArticles.slice(startIndex, startIndex + 2);
  };

  const getVisibleTips = () => {
    const startIndex = currentTipsIndex * 2;
    return data.tipsArticles.slice(startIndex, startIndex + 2);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-primary/25 via-accent/40 to-primary/15 relative overflow-hidden">
      {/* Same background decorations as main site */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-accent/50 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-primary/20 rounded-full blur-2xl"></div>
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-primary/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-40 h-40 bg-accent/35 rounded-full blur-2xl"></div>
        <div className="absolute top-3/4 right-1/3 w-28 h-28 bg-primary/12 rounded-full blur-xl"></div>
        <div className="absolute top-16 right-16 w-16 h-16 bg-primary/20 rotate-45 blur-sm"></div>
        <div className="absolute bottom-32 left-32 w-20 h-20 bg-accent/40 rotate-12 blur-sm"></div>
        <div className="absolute top-2/3 left-16 w-12 h-12 bg-primary/15 rotate-45 blur-sm"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-30"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-primary">STC</span>{" "}
            <span className="text-foreground">CORNER</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {data.description}
          </p>
        </div>

        {/* Tabs for News and Tips */}
        <Tabs defaultValue="news" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-12 bg-muted/60 p-1">
            <TabsTrigger
              value="news"
              className="flex items-center space-x-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md data-[state=active]:font-bold transition-all duration-300"
            >
              <Newspaper className="w-4 h-4" />
              <span>Berita Terbaru</span>
            </TabsTrigger>
            <TabsTrigger
              value="tips"
              className="flex items-center space-x-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md data-[state=active]:font-bold transition-all duration-300"
            >
              <Lightbulb className="w-4 h-4" />
              <span>Tips & Trik</span>
            </TabsTrigger>
          </TabsList>

          {/* News Tab */}
          <TabsContent value="news">
            <div className="relative">
              {/* Navigation Buttons */}
              <div className="hidden md:block">
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-background/80 backdrop-blur-sm border-border/50 hover:bg-accent shadow-lg"
                  onClick={prevNews}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-background/80 backdrop-blur-sm border-border/50 hover:bg-accent shadow-lg"
                  onClick={nextNews}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>

              {/* Articles Grid */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
                key={`news-${currentNewsIndex}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                {getVisibleNews().map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary group bg-card h-full">
                      <div className="relative overflow-hidden">
                        <ImageWithFallback
                          src={article.image}
                          alt={article.title}
                          className="w-full h-48 object-cover object-[center_35%] group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-primary text-primary-foreground hover:bg-primary/90">
                            {article.category}
                          </Badge>
                        </div>
                      </div>
                      <CardHeader>
                        <h3 className="font-bold text-xl text-card-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
                          {article.title}
                        </h3>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-muted-foreground leading-relaxed line-clamp-3">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center justify-between pt-4 border-t border-border">
                          <div className="flex items-center space-x-2">
                            <User className="w-4 h-4 text-primary" />
                            <span className="text-sm text-muted-foreground">{article.author}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-primary" />
                            <span className="text-sm text-muted-foreground">
                              {new Date(article.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <button className="flex items-center space-x-2 text-primary hover:text-primary/80 font-medium group/btn">
                          <span>Baca Selengkapnya</span>
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                        </button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </TabsContent>

          {/* Tips Tab */}
          <TabsContent value="tips">
            <div className="relative">
              {/* Navigation Buttons */}
              <div className="hidden md:block">
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-background/80 backdrop-blur-sm border-border/50 hover:bg-accent shadow-lg"
                  onClick={prevTips}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-background/80 backdrop-blur-sm border-border/50 hover:bg-accent shadow-lg"
                  onClick={nextTips}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>

              {/* Articles Grid */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
                key={`tips-${currentTipsIndex}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                {getVisibleTips().map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary group bg-card h-full">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <Badge className="bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground mb-3">
                            {article.category}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{article.readTime}</span>
                        </div>
                        <h3 className="font-bold text-xl text-card-foreground group-hover:text-primary transition-colors duration-300">
                          {article.title}
                        </h3>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-muted-foreground leading-relaxed">{article.excerpt}</p>
                        <div className="flex items-center justify-between pt-4 border-t border-border">
                          <div className="flex items-center space-x-2">
                            <User className="w-4 h-4 text-primary" />
                            <span className="text-sm text-muted-foreground">{article.author}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-primary" />
                            <span className="text-sm text-muted-foreground">
                              {new Date(article.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <button className="flex items-center space-x-2 text-primary hover:text-primary/80 font-medium group/btn">
                          <span>Baca Artikel</span>
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                        </button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}