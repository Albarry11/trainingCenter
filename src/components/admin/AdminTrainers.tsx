import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { 
  Star, 
  Award, 
  Users, 
  BookOpen,
  Edit3,
  Save,
  X,
  Plus,
  Trash2,
  Linkedin,
  Mail,
  Phone
} from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { toast } from 'sonner';

interface Trainer {
  id: string;
  name: string;
  position: string;
  specialization: string;
  description: string;
  image: string;
  experience: string;
  certifications: string[];
  achievements: string[];
  expertise: string[];
  contact: {
    email?: string;
    phone?: string;
    linkedin?: string;
  };
  rating: number;
  studentsCount: number;
}

interface TrainersData {
  title: string;
  subtitle: string;
  description: string;
  trainers: Trainer[];
}

interface AdminTrainersProps {
  isPreviewMode: boolean;
  onContentChange: () => void;
}

const defaultTrainersData: TrainersData = {
  title: "Tim Trainer Profesional",
  subtitle: "Bertemu dengan Para Ahli di Bidangnya",
  description: "Tim trainer kami terdiri dari profesional berpengalaman dan bersertifikat internasional. Mereka memiliki track record yang terbukti dalam mengembangkan keterampilan peserta pelatihan dengan metode pembelajaran yang inovatif dan praktis.",
  trainers: [
    {
      id: '1',
      name: 'Dr. Sarah Wijaya',
      position: 'Senior Leadership Trainer',
      specialization: 'Leadership & Management',
      description: 'Pakar leadership dengan pengalaman 15+ tahun dalam mengembangkan pemimpin di berbagai industri. Memiliki track record melatih lebih dari 500 eksekutif perusahaan multinasional.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop',
      experience: '15+ Tahun',
      certifications: [
        'Certified Leadership Coach (ICF)',
        'Professional Executive Coach',
        'Strategic Management Certificate'
      ],
      achievements: [
        'Top 10 Leadership Trainer Indonesia 2023',
        'Certified Master Trainer',
        'Published Author - "Leading with Purpose"'
      ],
      expertise: [
        'Executive Leadership',
        'Team Management',
        'Strategic Planning',
        'Change Management'
      ],
      contact: {
        email: 'sarah@swaragama.com',
        linkedin: 'sarah-wijaya-leadership'
      },
      rating: 4.9,
      studentsCount: 2500
    },
    {
      id: '2',
      name: 'Budi Santoso, M.Com',
      position: 'Public Speaking Master',
      specialization: 'Communication & Presentation',
      description: 'Master trainer public speaking dengan pengalaman melatih ribuan peserta dari berbagai latar belakang. Ahli dalam mengembangkan rasa percaya diri dan kemampuan komunikasi yang efektif.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      experience: '12+ Tahun',
      certifications: [
        'Certified Professional Speaker (CSP)',
        'Master Trainer Toastmasters',
        'NLP Practitioner'
      ],
      achievements: [
        'Indonesia Public Speaking Champion 2022',
        'TEDx Speaker',
        'Author of "Speak with Confidence"'
      ],
      expertise: [
        'Public Speaking',
        'Presentation Skills',
        'Communication Strategy',
        'Storytelling'
      ],
      contact: {
        email: 'budi@swaragama.com',
        phone: '+62-812-3456-7890'
      },
      rating: 4.8,
      studentsCount: 3200
    },
    {
      id: '3',
      name: 'Maya Sari, MBA',
      position: 'Digital Marketing Strategist',
      specialization: 'Digital Marketing & Strategy',
      description: 'Praktisi digital marketing dengan pengalaman membangun brand dan strategi pemasaran digital untuk startup hingga perusahaan multinasional. Expert dalam social media dan content marketing.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
      experience: '10+ Tahun',
      certifications: [
        'Google Ads Certified',
        'Facebook Blueprint Certified',
        'HubSpot Content Marketing Certified'
      ],
      achievements: [
        'Digital Marketing Excellence Award 2023',
        'Top Digital Strategist Indonesia',
        'Speaker at DigiCon Asia 2023'
      ],
      expertise: [
        'Digital Strategy',
        'Social Media Marketing',
        'Content Marketing',
        'Analytics & ROI'
      ],
      contact: {
        email: 'maya@swaragama.com',
        linkedin: 'maya-sari-digital'
      },
      rating: 4.9,
      studentsCount: 1800
    },
    {
      id: '4',
      name: 'Rizki Andika, S.Pd',
      position: 'Train the Trainer Specialist',
      specialization: 'Adult Learning & Training Design',
      description: 'Spesialis dalam metodologi pelatihan dan pengembangan trainer. Memiliki keahlian dalam merancang program pelatihan yang efektif dan mengembangkan kemampuan mengajar para trainer.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      experience: '8+ Tahun',
      certifications: [
        'Certified Training Professional (CTP)',
        'Adult Learning Specialist',
        'Instructional Design Certificate'
      ],
      achievements: [
        'Master Trainer Certification',
        'Training Excellence Award 2022',
        'Developed 50+ Training Modules'
      ],
      expertise: [
        'Training Methodology',
        'Instructional Design',
        'Adult Learning',
        'Trainer Development'
      ],
      contact: {
        email: 'rizki@swaragama.com',
        phone: '+62-813-4567-8901'
      },
      rating: 4.7,
      studentsCount: 950
    }
  ]
};

export function AdminTrainers({ isPreviewMode, onContentChange }: AdminTrainersProps) {
  const [trainersData, setTrainersData] = useState<TrainersData>(defaultTrainersData);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [tempData, setTempData] = useState<any>(null);

  useEffect(() => {
    // Load data from localStorage
    const savedData = localStorage.getItem('stc-trainers-data');
    if (savedData) {
      try {
        setTrainersData(JSON.parse(savedData));
      } catch (error) {
        console.error('Error loading trainers data:', error);
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
    localStorage.setItem('stc-trainers-data', JSON.stringify(trainersData));
    toast.success('Data Trainers berhasil disimpan!');
  };

  const handleEdit = (section: string) => {
    setEditingSection(section);
    setTempData({ ...trainersData });
  };

  const handleSave = () => {
    setTrainersData(tempData);
    setEditingSection(null);
    setTempData(null);
    onContentChange();
    toast.success('Perubahan berhasil disimpan!');
  };

  const handleCancel = () => {
    setEditingSection(null);
    setTempData(null);
  };

  const handleAddTrainer = () => {
    const newTrainer: Trainer = {
      id: Date.now().toString(),
      name: 'Trainer Baru',
      position: 'Position',
      specialization: 'Specialization',
      description: 'Deskripsi trainer baru',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      experience: '0+ Tahun',
      certifications: ['Sertifikasi 1'],
      achievements: ['Pencapaian 1'],
      expertise: ['Keahlian 1'],
      contact: {
        email: 'trainer@swaragama.com'
      },
      rating: 4.5,
      studentsCount: 0
    };
    setTempData({
      ...tempData,
      trainers: [...tempData.trainers, newTrainer]
    });
  };

  const handleRemoveTrainer = (id: string) => {
    setTempData({
      ...tempData,
      trainers: tempData.trainers.filter((trainer: Trainer) => trainer.id !== id)
    });
  };

  const updateTrainer = (trainerId: string, field: string, value: any) => {
    const updatedTrainers = tempData.trainers.map((trainer: Trainer) =>
      trainer.id === trainerId ? { ...trainer, [field]: value } : trainer
    );
    setTempData({ ...tempData, trainers: updatedTrainers });
  };

  const updateTrainerContact = (trainerId: string, field: string, value: string) => {
    const updatedTrainers = tempData.trainers.map((trainer: Trainer) =>
      trainer.id === trainerId 
        ? { ...trainer, contact: { ...trainer.contact, [field]: value } }
        : trainer
    );
    setTempData({ ...tempData, trainers: updatedTrainers });
  };

  const updateTrainerArray = (trainerId: string, field: string, index: number, value: string) => {
    const updatedTrainers = tempData.trainers.map((trainer: Trainer) =>
      trainer.id === trainerId 
        ? { 
            ...trainer, 
            [field]: trainer[field as keyof Trainer].map((item: string, i: number) => 
              i === index ? value : item
            ) 
          }
        : trainer
    );
    setTempData({ ...tempData, trainers: updatedTrainers });
  };

  const addTrainerArrayItem = (trainerId: string, field: string) => {
    const updatedTrainers = tempData.trainers.map((trainer: Trainer) =>
      trainer.id === trainerId 
        ? { ...trainer, [field]: [...trainer[field as keyof Trainer], 'Item baru'] }
        : trainer
    );
    setTempData({ ...tempData, trainers: updatedTrainers });
  };

  const removeTrainerArrayItem = (trainerId: string, field: string, index: number) => {
    const updatedTrainers = tempData.trainers.map((trainer: Trainer) =>
      trainer.id === trainerId 
        ? { 
            ...trainer, 
            [field]: trainer[field as keyof Trainer].filter((_: any, i: number) => i !== index) 
          }
        : trainer
    );
    setTempData({ ...tempData, trainers: updatedTrainers });
  };

  if (isPreviewMode) {
    return <TrainersPreview data={trainersData} />;
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
              <span className="text-primary">TIM</span>{" "}
              <span className="text-foreground">TRAINER</span>
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
                {trainersData.description}
              </p>
            </>
          )}
        </div>

        {/* Trainers Section */}
        <div className="relative">
          <div className="flex items-center justify-center gap-4 mb-8">
            <h3 className="text-2xl font-bold text-center">Para Trainer Ahli</h3>
            {editingSection !== 'trainers' && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEdit('trainers')}
                className="bg-background/80 backdrop-blur-sm hover:bg-accent"
              >
                <Edit3 className="w-4 h-4" />
              </Button>
            )}
          </div>

          {editingSection === 'trainers' ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-border"
            >
              <div className="flex justify-between items-center mb-6">
                <h4 className="font-bold">Edit Trainer</h4>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAddTrainer}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Trainer
                </Button>
              </div>
              
              <div className="space-y-8">
                {tempData?.trainers?.map((trainer: Trainer, index: number) => (
                  <div key={trainer.id} className="border border-border rounded-lg p-6 bg-background/50">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-lg font-medium">Trainer {index + 1}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveTrainer(trainer.id)}
                        className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Basic Info */}
                      <div className="space-y-4">
                        <h5 className="font-medium text-primary">Informasi Basic</h5>
                        <Input
                          value={trainer.name}
                          onChange={(e) => updateTrainer(trainer.id, 'name', e.target.value)}
                          placeholder="Nama trainer"
                          className="bg-input-background"
                        />
                        <Input
                          value={trainer.position}
                          onChange={(e) => updateTrainer(trainer.id, 'position', e.target.value)}
                          placeholder="Posisi/Jabatan"
                          className="bg-input-background"
                        />
                        <Input
                          value={trainer.specialization}
                          onChange={(e) => updateTrainer(trainer.id, 'specialization', e.target.value)}
                          placeholder="Spesialisasi"
                          className="bg-input-background"
                        />
                        <Textarea
                          value={trainer.description}
                          onChange={(e) => updateTrainer(trainer.id, 'description', e.target.value)}
                          placeholder="Deskripsi trainer"
                          rows={3}
                          className="bg-input-background"
                        />
                        <Input
                          value={trainer.image}
                          onChange={(e) => updateTrainer(trainer.id, 'image', e.target.value)}
                          placeholder="URL foto"
                          className="bg-input-background"
                        />
                        <Input
                          value={trainer.experience}
                          onChange={(e) => updateTrainer(trainer.id, 'experience', e.target.value)}
                          placeholder="Pengalaman (contoh: 10+ Tahun)"
                          className="bg-input-background"
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <Input
                            type="number"
                            step="0.1"
                            min="1"
                            max="5"
                            value={trainer.rating}
                            onChange={(e) => updateTrainer(trainer.id, 'rating', parseFloat(e.target.value))}
                            placeholder="Rating (1-5)"
                            className="bg-input-background"
                          />
                          <Input
                            type="number"
                            value={trainer.studentsCount}
                            onChange={(e) => updateTrainer(trainer.id, 'studentsCount', parseInt(e.target.value))}
                            placeholder="Jumlah siswa"
                            className="bg-input-background"
                          />
                        </div>
                        
                        <div className="w-full h-32 rounded-lg overflow-hidden bg-muted">
                          <ImageWithFallback
                            src={trainer.image}
                            alt={trainer.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      
                      {/* Arrays and Contact */}
                      <div className="space-y-4">
                        {/* Contact Info */}
                        <div>
                          <h5 className="font-medium text-primary mb-3">Kontak</h5>
                          <div className="space-y-2">
                            <Input
                              value={trainer.contact.email || ''}
                              onChange={(e) => updateTrainerContact(trainer.id, 'email', e.target.value)}
                              placeholder="Email"
                              className="bg-input-background"
                            />
                            <Input
                              value={trainer.contact.phone || ''}
                              onChange={(e) => updateTrainerContact(trainer.id, 'phone', e.target.value)}
                              placeholder="Telepon"
                              className="bg-input-background"
                            />
                            <Input
                              value={trainer.contact.linkedin || ''}
                              onChange={(e) => updateTrainerContact(trainer.id, 'linkedin', e.target.value)}
                              placeholder="LinkedIn"
                              className="bg-input-background"
                            />
                          </div>
                        </div>
                        
                        {/* Certifications */}
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <h5 className="font-medium text-primary">Sertifikasi</h5>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => addTrainerArrayItem(trainer.id, 'certifications')}
                              className="h-8 px-3"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                          <div className="space-y-2">
                            {trainer.certifications.map((cert, certIndex) => (
                              <div key={certIndex} className="flex gap-2">
                                <Input
                                  value={cert}
                                  onChange={(e) => updateTrainerArray(trainer.id, 'certifications', certIndex, e.target.value)}
                                  placeholder={`Sertifikasi ${certIndex + 1}`}
                                  className="bg-input-background flex-1"
                                />
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => removeTrainerArrayItem(trainer.id, 'certifications', certIndex)}
                                  className="h-10 px-3 text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                                >
                                  <X className="w-3 h-3" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Achievements */}
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <h5 className="font-medium text-primary">Pencapaian</h5>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => addTrainerArrayItem(trainer.id, 'achievements')}
                              className="h-8 px-3"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                          <div className="space-y-2">
                            {trainer.achievements.map((achievement, achievementIndex) => (
                              <div key={achievementIndex} className="flex gap-2">
                                <Input
                                  value={achievement}
                                  onChange={(e) => updateTrainerArray(trainer.id, 'achievements', achievementIndex, e.target.value)}
                                  placeholder={`Pencapaian ${achievementIndex + 1}`}
                                  className="bg-input-background flex-1"
                                />
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => removeTrainerArrayItem(trainer.id, 'achievements', achievementIndex)}
                                  className="h-10 px-3 text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                                >
                                  <X className="w-3 h-3" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Expertise */}
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <h5 className="font-medium text-primary">Keahlian</h5>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => addTrainerArrayItem(trainer.id, 'expertise')}
                              className="h-8 px-3"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                          <div className="space-y-2">
                            {trainer.expertise.map((skill, skillIndex) => (
                              <div key={skillIndex} className="flex gap-2">
                                <Input
                                  value={skill}
                                  onChange={(e) => updateTrainerArray(trainer.id, 'expertise', skillIndex, e.target.value)}
                                  placeholder={`Keahlian ${skillIndex + 1}`}
                                  className="bg-input-background flex-1"
                                />
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => removeTrainerArrayItem(trainer.id, 'expertise', skillIndex)}
                                  className="h-10 px-3 text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                                >
                                  <X className="w-3 h-3" />
                                </Button>
                              </div>
                            ))}
                          </div>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {trainersData.trainers.map((trainer, index) => (
                <motion.div
                  key={trainer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary group bg-card/80 backdrop-blur-sm h-full">
                    <div className="relative">
                      <div className="aspect-square overflow-hidden">
                        <ImageWithFallback
                          src={trainer.image}
                          alt={trainer.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-primary text-primary-foreground hover:bg-primary/90">
                          {trainer.experience}
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="bg-background/90 backdrop-blur-sm rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span className="font-medium text-sm">{trainer.rating}</span>
                            </div>
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Users className="w-4 h-4" />
                              <span className="text-sm">{trainer.studentsCount.toLocaleString()} siswa</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <CardHeader>
                      <h3 className="font-bold text-xl text-card-foreground group-hover:text-primary transition-colors duration-300">
                        {trainer.name}
                      </h3>
                      <p className="text-primary font-medium">{trainer.position}</p>
                      <Badge variant="secondary" className="w-fit">
                        {trainer.specialization}
                      </Badge>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        {trainer.description}
                      </p>
                      
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-medium text-card-foreground text-sm mb-2">Keahlian:</h4>
                          <div className="flex flex-wrap gap-1">
                            {trainer.expertise.slice(0, 4).map((skill, skillIndex) => (
                              <Badge key={skillIndex} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-card-foreground text-sm mb-2">Pencapaian:</h4>
                          <ul className="space-y-1">
                            {trainer.achievements.slice(0, 2).map((achievement, achievementIndex) => (
                              <li key={achievementIndex} className="flex items-start text-xs text-muted-foreground">
                                <Award className="w-3 h-3 text-primary mr-2 flex-shrink-0 mt-0.5" />
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        {(trainer.contact.email || trainer.contact.phone || trainer.contact.linkedin) && (
                          <div className="pt-3 border-t border-border">
                            <div className="flex gap-2">
                              {trainer.contact.email && (
                                <Button variant="outline" size="sm" className="h-8 px-3">
                                  <Mail className="w-3 h-3" />
                                </Button>
                              )}
                              {trainer.contact.phone && (
                                <Button variant="outline" size="sm" className="h-8 px-3">
                                  <Phone className="w-3 h-3" />
                                </Button>
                              )}
                              {trainer.contact.linkedin && (
                                <Button variant="outline" size="sm" className="h-8 px-3">
                                  <Linkedin className="w-3 h-3" />
                                </Button>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// Preview component that shows exactly like the main website
function TrainersPreview({ data }: { data: TrainersData }) {
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
            <span className="text-primary">TIM</span>{" "}
            <span className="text-foreground">TRAINER</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {data.description}
          </p>
        </div>

        {/* Trainers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {data.trainers.map((trainer, index) => (
            <motion.div
              key={trainer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary group bg-card/80 backdrop-blur-sm h-full">
                <div className="relative">
                  <div className="aspect-square overflow-hidden">
                    <ImageWithFallback
                      src={trainer.image}
                      alt={trainer.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-primary text-primary-foreground hover:bg-primary/90">
                      {trainer.experience}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-background/90 backdrop-blur-sm rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="font-medium text-sm">{trainer.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Users className="w-4 h-4" />
                          <span className="text-sm">{trainer.studentsCount.toLocaleString()} siswa</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <CardHeader>
                  <h3 className="font-bold text-xl text-card-foreground group-hover:text-primary transition-colors duration-300">
                    {trainer.name}
                  </h3>
                  <p className="text-primary font-medium">{trainer.position}</p>
                  <Badge variant="secondary" className="w-fit">
                    {trainer.specialization}
                  </Badge>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {trainer.description}
                  </p>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-card-foreground text-sm mb-2">Keahlian:</h4>
                      <div className="flex flex-wrap gap-1">
                        {trainer.expertise.slice(0, 4).map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-card-foreground text-sm mb-2">Pencapaian:</h4>
                      <ul className="space-y-1">
                        {trainer.achievements.slice(0, 2).map((achievement, achievementIndex) => (
                          <li key={achievementIndex} className="flex items-start text-xs text-muted-foreground">
                            <Award className="w-3 h-3 text-primary mr-2 flex-shrink-0 mt-0.5" />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {(trainer.contact.email || trainer.contact.phone || trainer.contact.linkedin) && (
                      <div className="pt-3 border-t border-border">
                        <div className="flex gap-2">
                          {trainer.contact.email && (
                            <Button variant="outline" size="sm" className="h-8 px-3">
                              <Mail className="w-3 h-3" />
                            </Button>
                          )}
                          {trainer.contact.phone && (
                            <Button variant="outline" size="sm" className="h-8 px-3">
                              <Phone className="w-3 h-3" />
                            </Button>
                          )}
                          {trainer.contact.linkedin && (
                            <Button variant="outline" size="sm" className="h-8 px-3">
                              <Linkedin className="w-3 h-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}