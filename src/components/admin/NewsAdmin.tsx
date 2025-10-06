import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Plus, Edit, Trash2, Save, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import type { News } from '../../types/admin';

type View = 'list' | 'edit' | 'create';

export function NewsAdmin() {
  const [view, setView] = useState<View>('list');
  const [news, setNews] = useState<News[]>([]);
  const [editingNews, setEditingNews] = useState<News | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    tags: '',
    image: '',
    author: 'Admin STC'
  });

  // Load news from localStorage on mount
  useEffect(() => {
    const savedNews = localStorage.getItem('stc-news');
    if (savedNews) {
      setNews(JSON.parse(savedNews));
    } else {
      // Default news
      const defaultNews: News[] = [
        {
          id: '1',
          title: 'Sukses Memberikan Pelatihan Public Speaking untuk 550 Mahasiswa UGM',
          excerpt: 'Swaragama Training Center berhasil memberikan pelatihan public speaking untuk sekitar 550 mahasiswa/i program reguler dan internasional Fakultas Ekonomi dan Bisnis Universitas Gadjah Mada.',
          content: 'Dalam rangka pengembangan soft skill mahasiswa, Swaragama Training Center dengan bangga telah menyelenggarakan program pelatihan public speaking untuk 550 mahasiswa Fakultas Ekonomi dan Bisnis UGM.\\n\\nProgram ini dirancang khusus untuk meningkatkan kemampuan komunikasi dan presentasi mahasiswa, baik untuk keperluan akademik maupun profesional di masa depan.\\n\\n**Highlight Program:**\\n\\n1. **Materi Komprehensif**: Pelatihan mencakup teknik dasar public speaking, manajemen panggung, hingga strategi komunikasi persuasif.\\n\\n2. **Metode Interaktif**: Setiap peserta mendapat kesempatan praktik langsung dengan feedback personal dari trainer berpengalaman.\\n\\n3. **Sertifikat Resmi**: Seluruh peserta yang menyelesaikan program mendapat sertifikat yang dapat menunjang portfolio akademik dan profesional.\\n\\n**Dampak Positif:**\\n\\nAntusiasme mahasiswa sangat tinggi, dengan tingkat kepuasan mencapai 95%. Banyak peserta yang melaporkan peningkatan signifikan dalam kepercayaan diri saat presentasi dan komunikasi sehari-hari.\\n\\nProgram ini menjadi bukti komitmen Swaragama Training Center dalam mengembangkan SDM unggul Indonesia melalui pelatihan berkualitas tinggi.',
          category: 'Prestasi',
          tags: ['UGM', 'public speaking', 'pelatihan', 'mahasiswa'],
          image: 'https://images.unsplash.com/photo-1646579886135-068c73800308?w=400',
          author: 'Tim STC',
          date: '2024-01-20',
          readTime: 4
        },
        {
          id: '2',
          title: 'Kerjasama Strategis dengan PT Bank Rakyat Indonesia untuk Program Pengembangan SDM',
          excerpt: 'Swaragama Training Center menjalin kerjasama jangka panjang dengan PT Bank Rakyat Indonesia (Persero) Region Yogyakarta untuk program pengembangan soft skill karyawan.',
          content: 'PT Bank Rakyat Indonesia (Persero) Region Yogyakarta mempercayakan Swaragama Training Center sebagai mitra strategis dalam program pengembangan sumber daya manusia, khususnya dalam bidang komunikasi dan public speaking.\\n\\n**Detail Kerjasama:**\\n\\n1. **Program Reguler**: Pelatihan rutin setiap bulan untuk karyawan berbagai level, mulai dari fresh graduate hingga manajemen senior.\\n\\n2. **Customized Training**: Materi pelatihan disesuaikan dengan kebutuhan spesifik industri perbankan dan kultur perusahaan BRI.\\n\\n3. **Mentoring Berkelanjutan**: Tidak hanya training sekali jalan, tetapi juga program mentoring untuk memastikan implementasi yang efektif.\\n\\n**Manfaat Kerjasama:**\\n\\n- Peningkatan kemampuan komunikasi karyawan BRI\\n- Standardisasi service excellence dalam pelayanan nasabah\\n- Pengembangan leadership skills untuk calon pemimpin masa depan\\n\\n**Testimoni BRI:**\\n\\n"Kerjasama dengan Swaragama Training Center memberikan dampak nyata terhadap peningkatan kualitas SDM kami. Para trainer professional dan materi yang aplikatif sangat membantu karyawan dalam menghadapi tantangan di era digital banking." - HR Manager BRI Region Yogyakarta\\n\\nKerjasama ini menjadi model untuk ekspansi program serupa ke region lain di seluruh Indonesia.',
          category: 'Kerjasama',
          tags: ['BRI', 'kerjasama', 'pelatihan', 'SDM', 'perbankan'],
          image: 'https://images.unsplash.com/photo-1745847768380-2caeadbb3b71?w=400',
          author: 'Tim STC',
          date: '2024-01-18',
          readTime: 5
        }
      ];
      setNews(defaultNews);
      localStorage.setItem('stc-news', JSON.stringify(defaultNews));
    }
  }, []);

  // Save news to localStorage
  const saveNews = (updatedNews: News[]) => {
    setNews(updatedNews);
    localStorage.setItem('stc-news', JSON.stringify(updatedNews));
  };

  const handleCreate = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      category: '',
      tags: '',
      image: '',
      author: 'Admin STC'
    });
    setEditingNews(null);
    setView('create');
  };

  const handleEdit = (newsItem: News) => {
    setFormData({
      title: newsItem.title,
      excerpt: newsItem.excerpt,
      content: newsItem.content,
      category: newsItem.category,
      tags: newsItem.tags.join(', '),
      image: newsItem.image,
      author: newsItem.author
    });
    setEditingNews(newsItem);
    setView('edit');
  };

  const handleSave = () => {
    if (!formData.title || !formData.excerpt || !formData.content) {
      alert('Mohon isi semua field yang wajib diisi');
      return;
    }

    const newsData: News = {
      id: editingNews?.id || Date.now().toString(),
      title: formData.title,
      excerpt: formData.excerpt,
      content: formData.content,
      category: formData.category || 'Berita',
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      image: formData.image || 'https://images.unsplash.com/photo-1485115905815-74a5c9fda2f5?w=400',
      author: formData.author,
      date: editingNews?.date || new Date().toISOString().split('T')[0],
      readTime: Math.ceil(formData.content.split(' ').length / 200)
    };

    let updatedNews;
    if (editingNews) {
      updatedNews = news.map(item => 
        item.id === editingNews.id ? newsData : item
      );
    } else {
      updatedNews = [newsData, ...news];
    }

    saveNews(updatedNews);
    setView('list');
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus berita ini?')) {
      const updatedNews = news.filter(item => item.id !== id);
      saveNews(updatedNews);
    }
  };

  // List View
  if (view === 'list') {
    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Berita Terbaru ({news.length})</h2>
          <Button onClick={handleCreate}>
            <Plus className="w-4 h-4 mr-2" />
            Tambah Berita
          </Button>
        </div>

        <div className="space-y-4">
          {news.map((newsItem, index) => (
            <motion.div
              key={newsItem.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <img 
                      src={newsItem.image} 
                      alt={newsItem.title}
                      className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg mb-1 line-clamp-1">{newsItem.title}</h3>
                      <p className="text-muted-foreground text-sm mb-2 line-clamp-2">{newsItem.excerpt}</p>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <Badge variant="secondary">{newsItem.category}</Badge>
                        <span className="text-xs text-muted-foreground">{newsItem.author}</span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">{newsItem.date}</span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">{newsItem.readTime} min read</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {newsItem.tags.map((tag, i) => (
                          <Badge key={i} variant="outline" className="text-xs">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(newsItem)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(newsItem.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  // Create/Edit View
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => setView('list')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </Button>
          <h2 className="text-xl font-semibold">
            {editingNews ? 'Edit Berita' : 'Tambah Berita Baru'}
          </h2>
        </div>
        <Button onClick={handleSave}>
          <Save className="w-4 h-4 mr-2" />
          Simpan Berita
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Konten Berita</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Judul Berita *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Masukkan judul berita..."
                />
              </div>

              <div>
                <Label htmlFor="excerpt">Ringkasan *</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                  placeholder="Ringkasan singkat berita..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="content">Konten Berita *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Tulis konten berita lengkap di sini..."
                  rows={12}
                  className="min-h-[300px]"
                />
                <div className="text-sm text-muted-foreground mt-1">
                  Estimasi waktu baca: {Math.ceil(formData.content.split(' ').length / 200)} menit
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Berita</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="category">Kategori</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Prestasi">Prestasi</SelectItem>
                    <SelectItem value="Kerjasama">Kerjasama</SelectItem>
                    <SelectItem value="Event">Event</SelectItem>
                    <SelectItem value="Pengumuman">Pengumuman</SelectItem>
                    <SelectItem value="Pelatihan">Pelatihan</SelectItem>
                    <SelectItem value="Berita">Berita Umum</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="tags">Tags (pisahkan dengan koma)</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                  placeholder="tag1, tag2, tag3"
                />
              </div>

              <div>
                <Label htmlFor="author">Penulis</Label>
                <Input
                  id="author"
                  value={formData.author}
                  onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                  placeholder="Nama penulis"
                />
              </div>

              <div>
                <Label htmlFor="image">URL Gambar</Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                  placeholder="https://images.unsplash.com/..."
                />
                {formData.image && (
                  <div className="mt-2">
                    <img 
                      src={formData.image} 
                      alt="Preview" 
                      className="w-full h-32 object-cover rounded-lg"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1485115905815-74a5c9fda2f5?w=400';
                      }}
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}