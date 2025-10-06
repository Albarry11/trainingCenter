import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Home, 
  Users, 
  Briefcase, 
  MessageCircle, 
  FileText,
  Newspaper,
  Star,
  Phone,
  Mail,
  MapPin,
  Edit3,
  Save,
  Eye,
  Trash2,
  Plus,
  RotateCcw
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { EditableSection } from './EditableContent';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ResponsivePreview, SampleWebsitePreview } from './ResponsivePreview';
import { toast } from 'sonner';

interface ContentSection {
  id: string;
  title: string;
  content: string;
  type: 'hero' | 'about' | 'service' | 'trainer' | 'testimonial' | 'contact';
  icon: React.ReactNode;
  description?: string;
}

export function ContentManager() {
  const [sections, setSections] = useState<ContentSection[]>([]);
  const [activeTab, setActiveTab] = useState('hero');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    setIsLoading(true);
    
    // Simulate loading website content
    const defaultSections: ContentSection[] = [
      {
        id: 'hero-title',
        title: 'Hero Title',
        content: 'Your Communication Skills Solution',
        type: 'hero',
        icon: <Home className="w-4 h-4" />,
        description: 'Judul utama yang ditampilkan di halaman beranda'
      },
      {
        id: 'hero-subtitle',
        title: 'Hero Subtitle',
        content: 'Swaragama Training Center hadir sebagai solusi tepat untuk meningkatkan kemampuan komunikasi dan soft skills guna mendukung kesuksesan pribadi maupun profesional.',
        type: 'hero',
        icon: <Home className="w-4 h-4" />,
        description: 'Deskripsi di bawah judul hero'
      },
      {
        id: 'about-description',
        title: 'Tentang Kami',
        content: 'Swaragama Training Center adalah lembaga pelatihan yang fokus pada pengembangan kemampuan komunikasi dan soft skills. Dengan pengalaman lebih dari 5 tahun, kami telah membantu ribuan peserta meningkatkan confidence dan kemampuan berbicara di depan umum.',
        type: 'about',
        icon: <Users className="w-4 h-4" />,
        description: 'Deskripsi lengkap tentang perusahaan'
      },
      {
        id: 'services-intro',
        title: 'Pengantar Layanan',
        content: 'Pilih program pelatihan yang sesuai dengan kebutuhan Anda! Kami menyediakan berbagai program mulai dari Public Speaking, MC, Radio Announcer, hingga program khusus untuk anak-anak.',
        type: 'service',
        icon: <Briefcase className="w-4 h-4" />,
        description: 'Penjelasan umum tentang layanan yang ditawarkan'
      },
      {
        id: 'trainers-intro',
        title: 'Pengantar Trainer',
        content: 'Tim trainer berpengalaman dan tersertifikasi yang siap membimbing Anda mencapai potensi maksimal dalam komunikasi dan pengembangan diri.',
        type: 'trainer',
        icon: <Star className="w-4 h-4" />,
        description: 'Penjelasan tentang tim trainer'
      },
      {
        id: 'contact-info',
        title: 'Informasi Kontak',
        content: 'Hubungi kami untuk konsultasi gratis dan informasi lebih lanjut tentang program pelatihan yang tersedia.',
        type: 'contact',
        icon: <Phone className="w-4 h-4" />,
        description: 'Informasi kontak dan ajakan untuk menghubungi'
      }
    ];

    // Load from localStorage or use defaults
    const savedContent = localStorage.getItem('stc-website-content');
    if (savedContent) {
      setSections(JSON.parse(savedContent));
    } else {
      setSections(defaultSections);
      localStorage.setItem('stc-website-content', JSON.stringify(defaultSections));
    }

    setIsLoading(false);
  };

  const handleSaveContent = async (sectionId: string, newContent: string) => {
    const updatedSections = sections.map(section =>
      section.id === sectionId ? { ...section, content: newContent } : section
    );
    
    setSections(updatedSections);
    localStorage.setItem('stc-website-content', JSON.stringify(updatedSections));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    toast.success('Konten berhasil disimpan!', {
      description: 'Perubahan akan terlihat di website setelah refresh halaman.',
    });
  };

  const handleResetContent = () => {
    if (window.confirm('Apakah Anda yakin ingin mengembalikan konten ke default? Semua perubahan akan hilang.')) {
      localStorage.removeItem('stc-website-content');
      loadContent();
      toast.success('Konten berhasil direset ke default');
    }
  };

  const getSectionsByType = (type: string) => {
    return sections.filter(section => section.type === type);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Memuat konten website...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Content Manager</h2>
          <p className="text-muted-foreground">Edit konten website secara langsung</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={handleResetContent}
            className="border-destructive/20 text-destructive hover:bg-destructive/5"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset ke Default
          </Button>
          <Button
            onClick={() => window.open(window.location.origin, '_blank')}
            className="bg-primary hover:bg-primary/90"
          >
            <Eye className="w-4 h-4 mr-2" />
            Preview Website
          </Button>
        </div>
      </div>

      {/* Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger 
            value="hero" 
            className="flex items-center space-x-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">Hero</span>
          </TabsTrigger>
          <TabsTrigger 
            value="about"
            className="flex items-center space-x-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Users className="w-4 h-4" />
            <span className="hidden sm:inline">About</span>
          </TabsTrigger>
          <TabsTrigger 
            value="service"
            className="flex items-center space-x-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Briefcase className="w-4 h-4" />
            <span className="hidden sm:inline">Services</span>
          </TabsTrigger>
          <TabsTrigger 
            value="trainer"
            className="flex items-center space-x-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Star className="w-4 h-4" />
            <span className="hidden sm:inline">Trainers</span>
          </TabsTrigger>
          <TabsTrigger 
            value="testimonial"
            className="flex items-center space-x-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Testimonials</span>
          </TabsTrigger>
          <TabsTrigger 
            value="contact"
            className="flex items-center space-x-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">Contact</span>
          </TabsTrigger>
        </TabsList>

        {/* Hero Content */}
        <TabsContent value="hero" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {getSectionsByType('hero').map(section => (
                <EditableSection
                  key={section.id}
                  title={section.title}
                  content={section.content}
                  onSave={(newContent) => handleSaveContent(section.id, newContent)}
                  icon={section.icon}
                  description={section.description}
                />
              ))}
            </div>
            
            <div className="lg:col-span-1">
              <ResponsivePreview 
                content={<SampleWebsitePreview />}
                url={window.location.origin}
              />
            </div>
          </div>
        </TabsContent>

        {/* About Content */}
        <TabsContent value="about" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {getSectionsByType('about').map(section => (
              <EditableSection
                key={section.id}
                title={section.title}
                content={section.content}
                onSave={(newContent) => handleSaveContent(section.id, newContent)}
                icon={section.icon}
                description={section.description}
              />
            ))}
          </div>
        </TabsContent>

        {/* Services Content */}
        <TabsContent value="service" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {getSectionsByType('service').map(section => (
              <EditableSection
                key={section.id}
                title={section.title}
                content={section.content}
                onSave={(newContent) => handleSaveContent(section.id, newContent)}
                icon={section.icon}
                description={section.description}
              />
            ))}
          </div>
          
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <p className="font-medium text-blue-900">Info</p>
                  <p className="text-sm text-blue-700">
                    Program layanan dikelola melalui sistem terpisah. Konten ini hanya mengubah deskripsi umum.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Trainers Content */}
        <TabsContent value="trainer" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {getSectionsByType('trainer').map(section => (
              <EditableSection
                key={section.id}
                title={section.title}
                content={section.content}
                onSave={(newContent) => handleSaveContent(section.id, newContent)}
                icon={section.icon}
                description={section.description}
              />
            ))}
          </div>
          
          <Card className="border-amber-200 bg-amber-50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-amber-500/10 rounded-lg flex items-center justify-center">
                  <Star className="w-4 h-4 text-amber-500" />
                </div>
                <div>
                  <p className="font-medium text-amber-900">Info</p>
                  <p className="text-sm text-amber-700">
                    Data trainer individual dikelola melalui sistem database. Konten ini mengubah pengantar section.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Testimonials Content */}
        <TabsContent value="testimonial" className="space-y-6">
          <div className="text-center py-12">
            <MessageCircle className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Testimonial Management</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Fitur manajemen testimonial akan segera hadir. Saat ini testimonial dikelola secara statis.
            </p>
            <Button variant="outline" disabled>
              <Plus className="w-4 h-4 mr-2" />
              Coming Soon
            </Button>
          </div>
        </TabsContent>

        {/* Contact Content */}
        <TabsContent value="contact" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {getSectionsByType('contact').map(section => (
              <EditableSection
                key={section.id}
                title={section.title}
                content={section.content}
                onSave={(newContent) => handleSaveContent(section.id, newContent)}
                icon={section.icon}
                description={section.description}
              />
            ))}
          </div>
          
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <Phone className="w-4 h-4 text-green-500" />
                </div>
                <div>
                  <p className="font-medium text-green-900">Info</p>
                  <p className="text-sm text-green-700">
                    Informasi kontak seperti alamat, telepon, dan email dikelola melalui konfigurasi website.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}