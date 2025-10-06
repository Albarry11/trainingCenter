import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Plus, Edit, Trash2, Save, ArrowLeft, Upload, X } from 'lucide-react';
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

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  image: string;
  author: string;
  date: string;
  readTime: number;
}

type View = 'list' | 'edit' | 'create';

export function SimpleAdmin() {
  const [view, setView] = useState<View>('list');
  const [articles, setArticles] = useState<Article[]>([]);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    tags: '',
    image: '',
    author: 'Admin STC'
  });

  // Load articles from localStorage on mount
  useEffect(() => {
    const savedArticles = localStorage.getItem('stc-articles');
    if (savedArticles) {
      setArticles(JSON.parse(savedArticles));
    } else {
      // Default articles
      const defaultArticles: Article[] = [
        {
          id: '1',
          title: 'Tips Komunikasi Efektif di Era Digital',
          excerpt: 'Panduan lengkap untuk berkomunikasi dengan efektif di era digital yang penuh tantangan ini.',
          content: 'Komunikasi digital telah menjadi bagian integral dari kehidupan profesional kita. Dengan perkembangan teknologi yang pesat, cara kita berinteraksi dan menyampaikan pesan telah berubah drastis.\n\nBerikut adalah tips untuk komunikasi yang efektif:\n\n1. **Pilih Platform yang Tepat**: Setiap platform komunikasi memiliki karakteristik yang berbeda. Email untuk komunikasi formal, chat untuk diskusi cepat, dan video call untuk pembahasan kompleks.\n\n2. **Perhatikan Tone dan Context**: Tanpa ekspresi wajah dan bahasa tubuh, pesan kita bisa salah diartikan. Gunakan emoticon atau emoji seperlunya untuk menambah konteks.\n\n3. **Buat Pesan yang Jelas dan Ringkas**: Hindari bertele-tele. Sampaikan poin utama di awal, lalu berikan detail pendukung.\n\n4. **Respon dengan Tepat Waktu**: Berikan konfirmasi bahwa Anda telah menerima pesan, meskipun belum bisa memberikan jawaban lengkap.\n\n5. **Gunakan Visual dengan Bijak**: Grafik, diagram, atau screenshot bisa membantu menjelaskan konsep yang kompleks.\n\nDengan menerapkan tips ini, komunikasi digital Anda akan menjadi lebih efektif dan produktif.',
          category: 'Communication',
          tags: ['komunikasi', 'digital', 'efektif', 'tips'],
          image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400',
          author: 'Dr. Sarah Komunikasi',
          date: '2024-01-15',
          readTime: 5
        },
        {
          id: '2',
          title: 'Membangun Kepercayaan Diri dalam Public Speaking',
          excerpt: 'Strategi praktis untuk mengatasi rasa gugup dan tampil percaya diri di depan umum.',
          content: 'Public speaking adalah salah satu keterampilan yang paling dibutuhkan namun paling ditakuti oleh banyak orang. Rasa gugup dan tidak percaya diri seringkali menghalangi kita untuk menyampaikan pesan dengan efektif.\n\n**Mengapa Kita Gugup?**\n\nRasa gugup saat berbicara di depan umum adalah reaksi alami tubuh. Sistem saraf simpatik kita aktif, menghasilkan adrenalin yang membuat jantung berdebar, tangan berkeringat, dan suara bergetar.\n\n**Strategi Membangun Kepercayaan Diri:**\n\n1. **Persiapan yang Matang**: Kuasai materi Anda dengan baik. Semakin familiar Anda dengan topik, semakin percaya diri Anda akan terlihat.\n\n2. **Latihan Berulang**: Berlatih di depan cermin, rekam diri Anda, atau berlatih dengan teman. Repetisi akan membangun muscle memory.\n\n3. **Teknik Pernapasan**: Latih pernapasan diafragma untuk mengontrol kecemasan dan memperkuat suara.\n\n4. **Visualisasi Positif**: Bayangkan diri Anda berhasil menyampaikan presentasi dengan baik. Visualisasi ini akan memprogram pikiran bawah sadar.\n\n5. **Mulai dari yang Kecil**: Mulai berbicara di grup kecil sebelum naik ke panggung yang lebih besar.\n\n6. **Fokus pada Pesan, Bukan pada Diri**: Alihkan fokus dari "bagaimana saya terlihat" ke "bagaimana saya bisa membantu audiens".\n\n**Tips Saat Presentasi:**\n\n- Datang lebih awal untuk familiar dengan ruangan\n- Lakukan kontak mata dengan audiens\n- Gunakan gesture yang natural\n- Jangan takut untuk pause\n- Siapkan backup plan jika ada yang tidak sesuai rencana\n\nIngat, kepercayaan diri dalam public speaking adalah skill yang bisa dipelajari dan dikembangkan. Dengan latihan konsisten dan mindset yang tepat, siapa pun bisa menjadi speaker yang confident dan engaging.',
          category: 'Public Speaking',
          tags: ['public speaking', 'confidence', 'presentation', 'tips'],
          image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400',
          author: 'Ahmad Rizki',
          date: '2024-01-12',
          readTime: 7
        }
      ];
      setArticles(defaultArticles);
      localStorage.setItem('stc-articles', JSON.stringify(defaultArticles));
    }
  }, []);

  // Save articles to localStorage
  const saveArticles = (updatedArticles: Article[]) => {
    setArticles(updatedArticles);
    localStorage.setItem('stc-articles', JSON.stringify(updatedArticles));
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
    setEditingArticle(null);
    setView('create');
  };

  const handleEdit = (article: Article) => {
    setFormData({
      title: article.title,
      excerpt: article.excerpt,
      content: article.content,
      category: article.category,
      tags: article.tags.join(', '),
      image: article.image,
      author: article.author
    });
    setEditingArticle(article);
    setView('edit');
  };

  const handleSave = () => {
    if (!formData.title || !formData.excerpt || !formData.content) {
      alert('Please fill in all required fields');
      return;
    }

    const articleData: Article = {
      id: editingArticle?.id || Date.now().toString(),
      title: formData.title,
      excerpt: formData.excerpt,
      content: formData.content,
      category: formData.category || 'General',
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      image: formData.image || 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400',
      author: formData.author,
      date: editingArticle?.date || new Date().toISOString().split('T')[0],
      readTime: Math.ceil(formData.content.split(' ').length / 200)
    };

    let updatedArticles;
    if (editingArticle) {
      updatedArticles = articles.map(article => 
        article.id === editingArticle.id ? articleData : article
      );
    } else {
      updatedArticles = [articleData, ...articles];
    }

    saveArticles(updatedArticles);
    setView('list');
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      const updatedArticles = articles.filter(article => article.id !== id);
      saveArticles(updatedArticles);
    }
  };

  // List View
  if (view === 'list') {
    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Articles ({articles.length})</h2>
          <Button onClick={handleCreate}>
            <Plus className="w-4 h-4 mr-2" />
            New Article
          </Button>
        </div>

        <div className="space-y-4">
          {articles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg mb-1 line-clamp-1">{article.title}</h3>
                      <p className="text-muted-foreground text-sm mb-2 line-clamp-2">{article.excerpt}</p>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <Badge variant="secondary">{article.category}</Badge>
                        <span className="text-xs text-muted-foreground">{article.author}</span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">{article.date}</span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">{article.readTime} min read</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {article.tags.map((tag, i) => (
                          <Badge key={i} variant="outline" className="text-xs">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(article)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(article.id)}>
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
            Back
          </Button>
          <h2 className="text-xl font-semibold">
            {editingArticle ? 'Edit Article' : 'Create New Article'}
          </h2>
        </div>
        <Button onClick={handleSave}>
          <Save className="w-4 h-4 mr-2" />
          Save Article
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Article Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter article title..."
                />
              </div>

              <div>
                <Label htmlFor="excerpt">Excerpt *</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                  placeholder="Brief description of the article..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Write your article content here..."
                  rows={12}
                  className="min-h-[300px]"
                />
                <div className="text-sm text-muted-foreground mt-1">
                  Estimated read time: {Math.ceil(formData.content.split(' ').length / 200)} minutes
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Article Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Communication">Communication</SelectItem>
                    <SelectItem value="Public Speaking">Public Speaking</SelectItem>
                    <SelectItem value="Leadership">Leadership</SelectItem>
                    <SelectItem value="Training">Training</SelectItem>
                    <SelectItem value="Soft Skills">Soft Skills</SelectItem>
                    <SelectItem value="Tips & Tricks">Tips & Tricks</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                  placeholder="tag1, tag2, tag3"
                />
              </div>

              <div>
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  value={formData.author}
                  onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                  placeholder="Author name"
                />
              </div>

              <div>
                <Label htmlFor="image">Featured Image URL</Label>
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
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400';
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