import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { 
  BookOpen, 
  Users, 
  Award, 
  Clock,
  Edit3,
  Save,
  X,
  Plus,
  Trash2,
  GraduationCap,
  Target,
  Briefcase,
  TrendingUp
} from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { toast } from 'sonner';

interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
  price: string;
  duration: string;
  level: string;
  image: string;
}

interface ServicesData {
  title: string;
  subtitle: string;
  description: string;
  services: Service[];
}

interface AdminServicesProps {
  isPreviewMode: boolean;
  onContentChange: () => void;
}

const defaultServicesData: ServicesData = {
  title: "Layanan Pelatihan",
  subtitle: "Program Pelatihan Profesional Berkualitas Tinggi",
  description: "Kami menyediakan berbagai program pelatihan yang dirancang khusus untuk meningkatkan kompetensi dan keterampilan profesional Anda. Setiap program dibimbing oleh instruktur berpengalaman dengan metode pembelajaran yang interaktif dan praktis.",
  services: [
    {
      id: '1',
      icon: 'BookOpen',
      title: 'Pelatihan Public Speaking',
      description: 'Kembangkan kemampuan berbicara di depan umum dengan percaya diri. Program komprehensif yang meliputi teknik presentasi, penguasaan panggung, dan komunikasi efektif.',
      features: [
        'Teknik dasar public speaking',
        'Mengatasi nervous dan demam panggung',
        'Body language dan gesture',
        'Storytelling yang menarik',
        'Praktik presentasi langsung'
      ],
      price: 'Rp 1.500.000',
      duration: '3 Hari',
      level: 'Pemula - Menengah',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop'
    },
    {
      id: '2',
      icon: 'Users',
      title: 'Leadership & Management',
      description: 'Pelajari keterampilan kepemimpinan dan manajemen yang efektif untuk memimpin tim dan organisasi dengan sukses.',
      features: [
        'Fundamental kepemimpinan',
        'Team building dan motivasi',
        'Strategic planning',
        'Conflict resolution',
        'Performance management'
      ],
      price: 'Rp 2.000.000',
      duration: '5 Hari',
      level: 'Menengah - Lanjut',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop'
    },
    {
      id: '3',
      icon: 'Award',
      title: 'Digital Marketing',
      description: 'Kuasai strategi pemasaran digital terkini untuk mengembangkan bisnis di era digital dengan efektif.',
      features: [
        'Social media marketing',
        'Content marketing strategy',
        'SEO dan SEM',
        'Email marketing',
        'Analytics dan reporting'
      ],
      price: 'Rp 1.800.000',
      duration: '4 Hari',
      level: 'Pemula - Menengah',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop'
    },
    {
      id: '4',
      icon: 'GraduationCap',
      title: 'Train the Trainer',
      description: 'Program khusus untuk calon trainer yang ingin mengembangkan kemampuan mengajar dan melatih orang lain.',
      features: [
        'Metodologi pelatihan',
        'Desain materi pembelajaran',
        'Teknik fasilitasi',
        'Assessment dan evaluasi',
        'Adult learning principles'
      ],
      price: 'Rp 2.500.000',
      duration: '6 Hari',
      level: 'Menengah - Lanjut',
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=300&fit=crop'
    }
  ]
};

const iconMap = {
  BookOpen,
  Users,
  Award,
  Clock,
  GraduationCap,
  Target,
  Briefcase,
  TrendingUp
};

export function AdminServices({ isPreviewMode, onContentChange }: AdminServicesProps) {
  const [servicesData, setServicesData] = useState<ServicesData>(defaultServicesData);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [tempData, setTempData] = useState<any>(null);

  useEffect(() => {
    // Load data from localStorage
    const savedData = localStorage.getItem('stc-services-data');
    if (savedData) {
      try {
        setServicesData(JSON.parse(savedData));
      } catch (error) {
        console.error('Error loading services data:', error);
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
    localStorage.setItem('stc-services-data', JSON.stringify(servicesData));
    toast.success('Data Services berhasil disimpan!');
  };

  const handleEdit = (section: string) => {
    setEditingSection(section);
    setTempData({ ...servicesData });
  };

  const handleSave = () => {
    setServicesData(tempData);
    setEditingSection(null);
    setTempData(null);
    onContentChange();
    toast.success('Perubahan berhasil disimpan!');
  };

  const handleCancel = () => {
    setEditingSection(null);
    setTempData(null);
  };

  const handleAddService = () => {
    const newService: Service = {
      id: Date.now().toString(),
      icon: 'BookOpen',
      title: 'Layanan Baru',
      description: 'Deskripsi layanan baru',
      features: ['Fitur 1', 'Fitur 2', 'Fitur 3'],
      price: 'Rp 1.000.000',
      duration: '3 Hari',
      level: 'Pemula',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop'
    };
    setTempData({
      ...tempData,
      services: [...tempData.services, newService]
    });
  };

  const handleRemoveService = (id: string) => {
    setTempData({
      ...tempData,
      services: tempData.services.filter((service: Service) => service.id !== id)
    });
  };

  const updateService = (serviceId: string, field: string, value: any) => {
    const updatedServices = tempData.services.map((service: Service) =>
      service.id === serviceId ? { ...service, [field]: value } : service
    );
    setTempData({ ...tempData, services: updatedServices });
  };

  const updateServiceFeature = (serviceId: string, featureIndex: number, value: string) => {
    const updatedServices = tempData.services.map((service: Service) =>
      service.id === serviceId 
        ? { 
            ...service, 
            features: service.features.map((feature, index) => 
              index === featureIndex ? value : feature
            ) 
          } 
        : service
    );
    setTempData({ ...tempData, services: updatedServices });
  };

  const addServiceFeature = (serviceId: string) => {
    const updatedServices = tempData.services.map((service: Service) =>
      service.id === serviceId 
        ? { ...service, features: [...service.features, 'Fitur baru'] }
        : service
    );
    setTempData({ ...tempData, services: updatedServices });
  };

  const removeServiceFeature = (serviceId: string, featureIndex: number) => {
    const updatedServices = tempData.services.map((service: Service) =>
      service.id === serviceId 
        ? { 
            ...service, 
            features: service.features.filter((_, index) => index !== featureIndex) 
          }
        : service
    );
    setTempData({ ...tempData, services: updatedServices });
  };

  if (isPreviewMode) {
    return <ServicesPreview data={servicesData} />;
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
              <span className="text-primary">LAYANAN</span>{" "}
              <span className="text-foreground">KAMI</span>
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
                {servicesData.description}
              </p>
            </>
          )}
        </div>

        {/* Services Section */}
        <div className="relative">
          <div className="flex items-center justify-center gap-4 mb-8">
            <h3 className="text-2xl font-bold text-center">Program Pelatihan</h3>
            {editingSection !== 'services' && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEdit('services')}
                className="bg-background/80 backdrop-blur-sm hover:bg-accent"
              >
                <Edit3 className="w-4 h-4" />
              </Button>
            )}
          </div>

          {editingSection === 'services' ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-border"
            >
              <div className="flex justify-between items-center mb-6">
                <h4 className="font-bold">Edit Layanan</h4>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAddService}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Layanan
                </Button>
              </div>
              
              <div className="space-y-6">
                {tempData?.services?.map((service: Service, index: number) => (
                  <div key={service.id} className="border border-border rounded-lg p-6 bg-background/50">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-lg font-medium">Layanan {index + 1}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveService(service.id)}
                        className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Icon</label>
                          <select
                            value={service.icon}
                            onChange={(e) => updateService(service.id, 'icon', e.target.value)}
                            className="w-full px-3 py-2 border border-border rounded-md bg-input-background"
                          >
                            <option value="BookOpen">BookOpen</option>
                            <option value="Users">Users</option>
                            <option value="Award">Award</option>
                            <option value="Clock">Clock</option>
                            <option value="GraduationCap">GraduationCap</option>
                            <option value="Target">Target</option>
                            <option value="Briefcase">Briefcase</option>
                            <option value="TrendingUp">TrendingUp</option>
                          </select>
                        </div>
                        
                        <Input
                          value={service.title}
                          onChange={(e) => updateService(service.id, 'title', e.target.value)}
                          placeholder="Judul layanan"
                          className="bg-input-background"
                        />
                        
                        <Textarea
                          value={service.description}
                          onChange={(e) => updateService(service.id, 'description', e.target.value)}
                          placeholder="Deskripsi layanan"
                          rows={3}
                          className="bg-input-background"
                        />
                        
                        <div className="grid grid-cols-3 gap-2">
                          <Input
                            value={service.price}
                            onChange={(e) => updateService(service.id, 'price', e.target.value)}
                            placeholder="Harga"
                            className="bg-input-background"
                          />
                          <Input
                            value={service.duration}
                            onChange={(e) => updateService(service.id, 'duration', e.target.value)}
                            placeholder="Durasi"
                            className="bg-input-background"
                          />
                          <Input
                            value={service.level}
                            onChange={(e) => updateService(service.id, 'level', e.target.value)}
                            placeholder="Level"
                            className="bg-input-background"
                          />
                        </div>
                        
                        <Input
                          value={service.image}
                          onChange={(e) => updateService(service.id, 'image', e.target.value)}
                          placeholder="URL Gambar"
                          className="bg-input-background"
                        />
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="block text-sm font-medium">Fitur-fitur</label>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => addServiceFeature(service.id)}
                            className="h-8 px-3"
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                        <div className="space-y-2">
                          {service.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex gap-2">
                              <Input
                                value={feature}
                                onChange={(e) => updateServiceFeature(service.id, featureIndex, e.target.value)}
                                placeholder={`Fitur ${featureIndex + 1}`}
                                className="bg-input-background flex-1"
                              />
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => removeServiceFeature(service.id, featureIndex)}
                                className="h-10 px-3 text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                        
                        <div className="mt-4 w-full h-32 rounded-lg overflow-hidden bg-muted">
                          <ImageWithFallback
                            src={service.image}
                            alt={service.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {servicesData.services.map((service, index) => {
                const IconComponent = iconMap[service.icon as keyof typeof iconMap] || BookOpen;
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary group bg-card/80 backdrop-blur-sm h-full">
                      <div className="relative overflow-hidden">
                        <ImageWithFallback
                          src={service.image}
                          alt={service.title}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4">
                          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                            <IconComponent className="w-6 h-6 text-primary" />
                          </div>
                        </div>
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-primary text-primary-foreground hover:bg-primary/90">
                            {service.level}
                          </Badge>
                        </div>
                      </div>
                      
                      <CardHeader>
                        <h3 className="font-bold text-xl text-card-foreground group-hover:text-primary transition-colors duration-300">
                          {service.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {service.description}
                        </p>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <h4 className="font-medium text-card-foreground">Materi Pelatihan:</h4>
                          <ul className="space-y-1">
                            {service.features.map((feature, featureIndex) => (
                              <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="pt-4 border-t border-border space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Durasi:</span>
                            <span className="font-medium text-card-foreground">{service.duration}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Investasi:</span>
                            <span className="font-bold text-primary">{service.price}</span>
                          </div>
                        </div>
                        
                        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-4">
                          Daftar Sekarang
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// Preview component that shows exactly like the main website
function ServicesPreview({ data }: { data: ServicesData }) {
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
            <span className="text-primary">LAYANAN</span>{" "}
            <span className="text-foreground">KAMI</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {data.description}
          </p>
        </div>

        {/* Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.services.map((service, index) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap] || BookOpen;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary group bg-card/80 backdrop-blur-sm h-full">
                  <div className="relative overflow-hidden">
                    <ImageWithFallback
                      src={service.image}
                      alt={service.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-primary text-primary-foreground hover:bg-primary/90">
                        {service.level}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardHeader>
                    <h3 className="font-bold text-xl text-card-foreground group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-medium text-card-foreground">Materi Pelatihan:</h4>
                      <ul className="space-y-1">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="pt-4 border-t border-border space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Durasi:</span>
                        <span className="font-medium text-card-foreground">{service.duration}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Investasi:</span>
                        <span className="font-bold text-primary">{service.price}</span>
                      </div>
                    </div>
                    
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-4">
                      Daftar Sekarang
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}