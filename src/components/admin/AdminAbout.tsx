import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { 
  Award, 
  Users, 
  Target, 
  TrendingUp,
  Edit3,
  Save,
  X,
  Plus,
  Trash2,
  Upload,
  Camera
} from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { toast } from 'sonner';

interface AboutData {
  title: string;
  subtitle: string;
  description: string;
  stats: Array<{
    id: string;
    icon: string;
    value: string;
    label: string;
    description: string;
  }>;
  gallery: Array<{
    id: string;
    url: string;
    alt: string;
    title: string;
  }>;
  vision: string;
  mission: string;
}

interface AdminAboutProps {
  isPreviewMode: boolean;
  onContentChange: () => void;
}

const defaultAboutData: AboutData = {
  title: "Tentang Swaragama Training Center",
  subtitle: "Membangun Masa Depan Melalui Pelatihan Berkualitas",
  description: "Swaragama Training Center adalah lembaga pelatihan terdepan yang berdedikasi untuk mengembangkan keterampilan dan kompetensi profesional. Dengan pengalaman lebih dari 10 tahun, kami telah membantu ribuan peserta mencapai potensi terbaik mereka.",
  stats: [
    {
      id: '1',
      icon: 'Award',
      value: '500+',
      label: 'Sertifikat Diterbitkan',
      description: 'Sertifikat resmi yang diakui industri'
    },
    {
      id: '2',
      icon: 'Users',
      value: '2000+',
      label: 'Alumni Sukses',
      description: 'Lulusan yang berkarir di berbagai bidang'
    },
    {
      id: '3',
      icon: 'Target',
      value: '95%',
      label: 'Tingkat Keberhasilan',
      description: 'Peserta yang berhasil menyelesaikan program'
    },
    {
      id: '4',
      icon: 'TrendingUp',
      value: '10+',
      label: 'Tahun Pengalaman',
      description: 'Melayani kebutuhan pelatihan profesional'
    }
  ],
  gallery: [
    {
      id: '1',
      url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
      alt: 'Ruang Kelas Modern',
      title: 'Fasilitas Kelas Berstandar Internasional'
    },
    {
      id: '2',
      url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=300&fit=crop',
      alt: 'Sesi Pelatihan',
      title: 'Metode Pembelajaran Interaktif'
    },
    {
      id: '3',
      url: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=300&fit=crop',
      alt: 'Diskusi Kelompok',
      title: 'Pembelajaran Kolaboratif'
    },
    {
      id: '4',
      url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
      alt: 'Presentasi',
      title: 'Praktik Presentasi & Public Speaking'
    }
  ],
  vision: "Menjadi pusat pelatihan terkemuka yang menghasilkan sumber daya manusia berkualitas tinggi dan berdaya saing global.",
  mission: "Memberikan pelatihan berkualitas tinggi dengan metode pembelajaran terkini, membangun kemitraan strategis dengan industri, dan mengembangkan potensi setiap peserta untuk mencapai kesuksesan karir."
};

const iconMap = {
  Award,
  Users,
  Target,
  TrendingUp
};

export function AdminAbout({ isPreviewMode, onContentChange }: AdminAboutProps) {
  const [aboutData, setAboutData] = useState<AboutData>(defaultAboutData);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [tempData, setTempData] = useState<any>(null);

  useEffect(() => {
    // Load data from localStorage
    const savedData = localStorage.getItem('stc-about-data');
    if (savedData) {
      try {
        setAboutData(JSON.parse(savedData));
      } catch (error) {
        console.error('Error loading about data:', error);
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
    localStorage.setItem('stc-about-data', JSON.stringify(aboutData));
    // Also save to the gallery storage for the main website
    localStorage.setItem('stc-gallery', JSON.stringify(aboutData.gallery));
    toast.success('Data About berhasil disimpan!');
  };

  const handleEdit = (section: string) => {
    setEditingSection(section);
    setTempData({ ...aboutData });
  };

  const handleSave = () => {
    setAboutData(tempData);
    setEditingSection(null);
    setTempData(null);
    onContentChange();
    toast.success('Perubahan berhasil disimpan!');
  };

  const handleCancel = () => {
    setEditingSection(null);
    setTempData(null);
  };

  const handleAddGalleryItem = () => {
    const newItem = {
      id: Date.now().toString(),
      url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
      alt: 'Gambar Baru',
      title: 'Judul Gambar Baru'
    };
    setTempData({
      ...tempData,
      gallery: [...tempData.gallery, newItem]
    });
  };

  const handleRemoveGalleryItem = (id: string) => {
    setTempData({
      ...tempData,
      gallery: tempData.gallery.filter((item: any) => item.id !== id)
    });
  };

  const handleAddStat = () => {
    const newStat = {
      id: Date.now().toString(),
      icon: 'Award',
      value: '0',
      label: 'Label Baru',
      description: 'Deskripsi statistik baru'
    };
    setTempData({
      ...tempData,
      stats: [...tempData.stats, newStat]
    });
  };

  const handleRemoveStat = (id: string) => {
    setTempData({
      ...tempData,
      stats: tempData.stats.filter((stat: any) => stat.id !== id)
    });
  };

  if (isPreviewMode) {
    return <AboutPreview data={aboutData} />;
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
              <span className="text-primary">TENTANG</span>{" "}
              <span className="text-foreground">SWARAGAMA</span>
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
                  rows={4}
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
                {aboutData.description}
              </p>
            </>
          )}
        </div>

        {/* Statistics Section */}
        <div className="mb-16 relative">
          <div className="flex items-center justify-center gap-4 mb-8">
            <h3 className="text-2xl font-bold text-center">Pencapaian Kami</h3>
            {editingSection !== 'stats' && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEdit('stats')}
                className="bg-background/80 backdrop-blur-sm hover:bg-accent"
              >
                <Edit3 className="w-4 h-4" />
              </Button>
            )}
          </div>

          {editingSection === 'stats' ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-border"
            >
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-bold">Edit Statistik</h4>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAddStat}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah
                </Button>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                {tempData?.stats?.map((stat: any, index: number) => (
                  <div key={stat.id} className="border border-border rounded-lg p-4 bg-background/50">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-sm font-medium">Statistik {index + 1}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveStat(stat.id)}
                        className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                    <div className="space-y-3">
                      <select
                        value={stat.icon}
                        onChange={(e) => {
                          const updatedStats = tempData.stats.map((s: any) =>
                            s.id === stat.id ? { ...s, icon: e.target.value } : s
                          );
                          setTempData({ ...tempData, stats: updatedStats });
                        }}
                        className="w-full px-3 py-2 border border-border rounded-md bg-input-background"
                      >
                        <option value="Award">Award</option>
                        <option value="Users">Users</option>
                        <option value="Target">Target</option>
                        <option value="TrendingUp">TrendingUp</option>
                      </select>
                      <Input
                        value={stat.value}
                        onChange={(e) => {
                          const updatedStats = tempData.stats.map((s: any) =>
                            s.id === stat.id ? { ...s, value: e.target.value } : s
                          );
                          setTempData({ ...tempData, stats: updatedStats });
                        }}
                        placeholder="Nilai (contoh: 500+)"
                        className="bg-input-background"
                      />
                      <Input
                        value={stat.label}
                        onChange={(e) => {
                          const updatedStats = tempData.stats.map((s: any) =>
                            s.id === stat.id ? { ...s, label: e.target.value } : s
                          );
                          setTempData({ ...tempData, stats: updatedStats });
                        }}
                        placeholder="Label"
                        className="bg-input-background"
                      />
                      <Input
                        value={stat.description}
                        onChange={(e) => {
                          const updatedStats = tempData.stats.map((s: any) =>
                            s.id === stat.id ? { ...s, description: e.target.value } : s
                          );
                          setTempData({ ...tempData, stats: updatedStats });
                        }}
                        placeholder="Deskripsi"
                        className="bg-input-background"
                      />
                    </div>
                  </div>
                ))}
              </div>
              
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {aboutData.stats.map((stat, index) => {
                const IconComponent = iconMap[stat.icon as keyof typeof iconMap] || Award;
                return (
                  <motion.div
                    key={stat.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary group bg-card/80 backdrop-blur-sm">
                      <CardContent className="p-6">
                        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/30 transition-colors">
                          <IconComponent className="w-8 h-8 text-primary" />
                        </div>
                        <h4 className="text-3xl font-bold text-primary mb-2">{stat.value}</h4>
                        <h5 className="font-bold text-card-foreground mb-2">{stat.label}</h5>
                        <p className="text-muted-foreground text-sm">{stat.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        {/* Gallery Section */}
        <div className="mb-16 relative">
          <div className="flex items-center justify-center gap-4 mb-8">
            <h3 className="text-2xl font-bold text-center">Galeri Swaragama</h3>
            {editingSection !== 'gallery' && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEdit('gallery')}
                className="bg-background/80 backdrop-blur-sm hover:bg-accent"
              >
                <Edit3 className="w-4 h-4" />
              </Button>
            )}
          </div>

          {editingSection === 'gallery' ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-border"
            >
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-bold">Edit Galeri</h4>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAddGalleryItem}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Foto
                </Button>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                {tempData?.gallery?.map((item: any, index: number) => (
                  <div key={item.id} className="border border-border rounded-lg p-4 bg-background/50">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-sm font-medium">Foto {index + 1}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveGalleryItem(item.id)}
                        className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                    <div className="space-y-3">
                      <Input
                        value={item.url}
                        onChange={(e) => {
                          const updatedGallery = tempData.gallery.map((g: any) =>
                            g.id === item.id ? { ...g, url: e.target.value } : g
                          );
                          setTempData({ ...tempData, gallery: updatedGallery });
                        }}
                        placeholder="URL Gambar"
                        className="bg-input-background"
                      />
                      <Input
                        value={item.title}
                        onChange={(e) => {
                          const updatedGallery = tempData.gallery.map((g: any) =>
                            g.id === item.id ? { ...g, title: e.target.value } : g
                          );
                          setTempData({ ...tempData, gallery: updatedGallery });
                        }}
                        placeholder="Judul"
                        className="bg-input-background"
                      />
                      <Input
                        value={item.alt}
                        onChange={(e) => {
                          const updatedGallery = tempData.gallery.map((g: any) =>
                            g.id === item.id ? { ...g, alt: e.target.value } : g
                          );
                          setTempData({ ...tempData, gallery: updatedGallery });
                        }}
                        placeholder="Alt text"
                        className="bg-input-background"
                      />
                      <div className="w-full h-32 rounded-lg overflow-hidden bg-muted">
                        <ImageWithFallback
                          src={item.url}
                          alt={item.alt}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {aboutData.gallery.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <ImageWithFallback
                      src={item.url}
                      alt={item.alt}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <h4 className="text-white font-medium text-sm">{item.title}</h4>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Vision */}
          <div className="relative">
            <div className="flex items-center gap-4 mb-4">
              <h3 className="text-2xl font-bold">Visi</h3>
              {editingSection !== 'vision' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit('vision')}
                  className="bg-background/80 backdrop-blur-sm hover:bg-accent"
                >
                  <Edit3 className="w-4 h-4" />
                </Button>
              )}
            </div>
            
            {editingSection === 'vision' ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-border"
              >
                <Textarea
                  value={tempData?.vision || ''}
                  onChange={(e) => setTempData({ ...tempData, vision: e.target.value })}
                  placeholder="Visi organisasi"
                  rows={5}
                  className="bg-input-background mb-4"
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
              </motion.div>
            ) : (
              <Card className="bg-card/80 backdrop-blur-sm border-2 hover:border-primary transition-colors">
                <CardContent className="p-6">
                  <p className="text-muted-foreground leading-relaxed">{aboutData.vision}</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Mission */}
          <div className="relative">
            <div className="flex items-center gap-4 mb-4">
              <h3 className="text-2xl font-bold">Misi</h3>
              {editingSection !== 'mission' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit('mission')}
                  className="bg-background/80 backdrop-blur-sm hover:bg-accent"
                >
                  <Edit3 className="w-4 h-4" />
                </Button>
              )}
            </div>
            
            {editingSection === 'mission' ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-border"
              >
                <Textarea
                  value={tempData?.mission || ''}
                  onChange={(e) => setTempData({ ...tempData, mission: e.target.value })}
                  placeholder="Misi organisasi"
                  rows={5}
                  className="bg-input-background mb-4"
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
              </motion.div>
            ) : (
              <Card className="bg-card/80 backdrop-blur-sm border-2 hover:border-primary transition-colors">
                <CardContent className="p-6">
                  <p className="text-muted-foreground leading-relaxed">{aboutData.mission}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// Preview component that shows exactly like the main website
function AboutPreview({ data }: { data: AboutData }) {
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
            <span className="text-primary">TENTANG</span>{" "}
            <span className="text-foreground">SWARAGAMA</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {data.description}
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {data.stats.map((stat, index) => {
            const IconComponent = iconMap[stat.icon as keyof typeof iconMap] || Award;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary group bg-card/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/30 transition-colors">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                    <h4 className="text-3xl font-bold text-primary mb-2">{stat.value}</h4>
                    <h5 className="font-bold text-card-foreground mb-2">{stat.label}</h5>
                    <p className="text-muted-foreground text-sm">{stat.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Gallery */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Galeri Swaragama</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.gallery.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <ImageWithFallback
                    src={item.url}
                    alt={item.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <h4 className="text-white font-medium text-sm">{item.title}</h4>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Visi</h3>
            <Card className="bg-card/80 backdrop-blur-sm border-2 hover:border-primary transition-colors">
              <CardContent className="p-6">
                <p className="text-muted-foreground leading-relaxed">{data.vision}</p>
              </CardContent>
            </Card>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4">Misi</h3>
            <Card className="bg-card/80 backdrop-blur-sm border-2 hover:border-primary transition-colors">
              <CardContent className="p-6">
                <p className="text-muted-foreground leading-relaxed">{data.mission}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}