import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, Eye, Upload, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { toast } from 'sonner';
import { NewsItem, NewsFormData } from '../../types/admin';

const NEWS_CATEGORIES = [
  'Prestasi',
  'Kerjasama',
  'Pelatihan',
  'Event',
  'Pengumuman',
  'Lainnya'
];

interface NewsFormProps {
  news?: NewsItem | null;
  onSave: (data: NewsFormData) => void;
  onCancel: () => void;
}

export function NewsForm({ news, onSave, onCancel }: NewsFormProps) {
  const [formData, setFormData] = useState<NewsFormData>({
    title: '',
    excerpt: '',
    content: '',
    image: '',
    author: '',
    date: new Date().toISOString().split('T')[0],
    category: '',
    status: 'draft'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isPreview, setIsPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form data when editing
  useEffect(() => {
    if (news) {
      setFormData({
        title: news.title,
        excerpt: news.excerpt,
        content: news.content,
        image: news.image,
        author: news.author,
        date: news.date,
        category: news.category,
        status: news.status
      });
    }
  }, [news]);

  const handleInputChange = (
    field: keyof NewsFormData,
    value: string
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }

    // Auto-generate excerpt from content if excerpt is empty
    if (field === 'content' && !formData.excerpt) {
      const excerpt = value.length > 150 
        ? value.substring(0, 150) + '...'
        : value;
      setFormData(prev => ({ ...prev, excerpt }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Judul berita wajib diisi';
    }

    if (!formData.excerpt.trim()) {
      newErrors.excerpt = 'Ringkasan berita wajib diisi';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Konten berita wajib diisi';
    }

    if (!formData.author.trim()) {
      newErrors.author = 'Nama penulis wajib diisi';
    }

    if (!formData.category) {
      newErrors.category = 'Kategori wajib dipilih';
    }

    if (!formData.date) {
      newErrors.date = 'Tanggal publikasi wajib diisi';
    }

    // Validate image URL if provided
    if (formData.image && !isValidUrl(formData.image)) {
      newErrors.image = 'URL gambar tidak valid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string: string): boolean => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Mohon periksa kembali form yang Anda isi');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // If no image provided, use a default Unsplash image
      const finalData = {
        ...formData,
        image: formData.image || `https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&auto=format&fit=crop&q=60`,
        title: formData.title.trim(),
        excerpt: formData.excerpt.trim(),
        content: formData.content.trim(),
        author: formData.author.trim()
      };

      onSave(finalData);
    } catch (error) {
      toast.error('Terjadi kesalahan saat menyimpan berita');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUrlChange = (url: string) => {
    setFormData(prev => ({ ...prev, image: url }));
    if (errors.image) {
      setErrors(prev => ({ ...prev, image: '' }));
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

  if (isPreview) {
    return (
      <div className="space-y-6">
        {/* Preview Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => setIsPreview(false)}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Editor
            </Button>
            <h2 className="text-2xl font-bold">Preview Berita</h2>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={`text-white ${getStatusColor(formData.status)}`}>
              {getStatusLabel(formData.status)}
            </Badge>
            <Badge variant="secondary">{formData.category}</Badge>
          </div>
        </div>

        {/* Preview Content */}
        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-8">
            {/* Image */}
            {formData.image && (
              <div className="w-full h-64 rounded-lg overflow-hidden mb-6 bg-muted">
                <img
                  src={formData.image}
                  alt={formData.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800';
                  }}
                />
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl font-bold mb-4">{formData.title}</h1>

            {/* Meta */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
              <span>Oleh: {formData.author}</span>
              <Separator orientation="vertical" className="h-4" />
              <span>{new Date(formData.date).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}</span>
              <Separator orientation="vertical" className="h-4" />
              <span>Kategori: {formData.category}</span>
            </div>

            {/* Excerpt */}
            <div className="bg-muted p-4 rounded-lg mb-6">
              <p className="text-lg italic">{formData.excerpt}</p>
            </div>

            {/* Content */}
            <div className="prose max-w-none">
              {formData.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </Button>
          <div>
            <h2 className="text-2xl font-bold">
              {news ? 'Edit Berita' : 'Tambah Berita Baru'}
            </h2>
            <p className="text-muted-foreground">
              {news ? 'Perbarui informasi berita' : 'Buat berita terbaru untuk dipublikasikan'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsPreview(true)}
            className="flex-1 sm:flex-none"
          >
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="flex-1 sm:flex-none"
          >
            <Save className="w-4 h-4 mr-2" />
            {isSubmitting ? 'Menyimpan...' : 'Simpan'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Informasi Dasar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Judul Berita *</Label>
                <Input
                  id="title"
                  placeholder="Masukkan judul berita yang menarik..."
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className={errors.title ? 'border-destructive' : ''}
                />
                {errors.title && (
                  <p className="text-sm text-destructive">{errors.title}</p>
                )}
              </div>

              {/* Excerpt */}
              <div className="space-y-2">
                <Label htmlFor="excerpt">Ringkasan Berita *</Label>
                <Textarea
                  id="excerpt"
                  placeholder="Ringkasan singkat tentang berita ini..."
                  value={formData.excerpt}
                  onChange={(e) => handleInputChange('excerpt', e.target.value)}
                  rows={3}
                  className={errors.excerpt ? 'border-destructive' : ''}
                />
                <p className="text-xs text-muted-foreground">
                  {formData.excerpt.length}/200 karakter
                </p>
                {errors.excerpt && (
                  <p className="text-sm text-destructive">{errors.excerpt}</p>
                )}
              </div>

              {/* Content */}
              <div className="space-y-2">
                <Label htmlFor="content">Konten Berita *</Label>
                <Textarea
                  id="content"
                  placeholder="Tulis konten berita lengkap di sini..."
                  value={formData.content}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                  rows={12}
                  className={errors.content ? 'border-destructive' : ''}
                />
                <p className="text-xs text-muted-foreground">
                  {formData.content.length} karakter
                </p>
                {errors.content && (
                  <p className="text-sm text-destructive">{errors.content}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Image */}
          <Card>
            <CardHeader>
              <CardTitle>Gambar Berita</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="image">URL Gambar</Label>
                <Input
                  id="image"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={formData.image}
                  onChange={(e) => handleImageUrlChange(e.target.value)}
                  className={errors.image ? 'border-destructive' : ''}
                />
                {errors.image && (
                  <p className="text-sm text-destructive">{errors.image}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  Kosongkan untuk menggunakan gambar default
                </p>
              </div>

              {/* Image Preview */}
              {formData.image && (
                <div className="w-full h-48 rounded-lg overflow-hidden bg-muted">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800';
                    }}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publication Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Publikasi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Status */}
              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: 'draft' | 'published' | 'archived') => 
                    setFormData(prev => ({ ...prev, status: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Terbit</SelectItem>
                    <SelectItem value="archived">Arsip</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Date */}
              <div className="space-y-2">
                <Label htmlFor="date">Tanggal Publikasi *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className={errors.date ? 'border-destructive' : ''}
                />
                {errors.date && (
                  <p className="text-sm text-destructive">{errors.date}</p>
                )}
              </div>

              {/* Author */}
              <div className="space-y-2">
                <Label htmlFor="author">Penulis *</Label>
                <Input
                  id="author"
                  placeholder="Nama penulis"
                  value={formData.author}
                  onChange={(e) => handleInputChange('author', e.target.value)}
                  className={errors.author ? 'border-destructive' : ''}
                />
                {errors.author && (
                  <p className="text-sm text-destructive">{errors.author}</p>
                )}
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label>Kategori *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger className={errors.category ? 'border-destructive' : ''}>
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    {NEWS_CATEGORIES.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-sm text-destructive">{errors.category}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Help Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tips Menulis Berita</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>• Gunakan judul yang jelas dan menarik</p>
              <p>• Ringkasan sebaiknya 1-2 kalimat</p>
              <p>• Tulis konten dengan bahasa yang mudah dipahami</p>
              <p>• Gunakan gambar yang relevan dan berkualitas</p>
              <p>• Pilih kategori yang sesuai untuk memudahkan pencarian</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}