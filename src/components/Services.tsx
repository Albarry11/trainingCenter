import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mic, 
  Users, 
  Radio, 
  Building, 
  Baby, 
  Star,
  Clock,
  Award,
  ChevronRight,
  ChevronLeft,
  Play,
  Calendar,
  MapPin,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import trainingImage from 'figma:asset/523bea4f0a2daf83eff55d97c121ac2cc857c3dd.png';
import publicSpeakingImage from 'figma:asset/aa7d30e361b3e86ec2500630c697a121e8a020ac.png';
import mcImage from 'figma:asset/920256779f2d003d5a46c5cf477bbf788b9690d2.png';
import radioImage from 'figma:asset/03dec687e0df8dadeffed57c7c8917a45d7a24ec.png';
import kidsImage from 'figma:asset/965e03396b7781dc542e68111c24d198c7314a24.png';
import teensImage from 'figma:asset/c539bfb358414df74d21fbead51b8daece21be44.png';
import privateClassImage from 'figma:asset/4f2d56348f28c1a81e8fa93a991cb1376bee5cfd.png';
import corporateTrainingImage from 'figma:asset/9c20f16e62b5d71dafdb8a04bb9ed68edfbc8c9e.png';

export function Services() {
  const [activeService, setActiveService] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const serviceCategories = [
    { id: 'all', name: 'Semua Program', count: 7 },
    { id: 'reguler', name: 'Program Reguler', count: 3 },
    { id: 'kids', name: 'Kids & Teens', count: 2 },
    { id: 'private', name: 'Private & Corporate', count: 2 },
  ];

  const services = [
    {
      id: 1,
      title: 'Public Speaking Intensive',
      category: 'reguler',
      icon: Mic,
      price: 'Rp 1.000.000',
      duration: '6x Pertemuan',
      level: 'Semua Level',
      rating: 4.9,
      participants: '2,500+',
      description: 'Belajar bagaimana tampil maksimal dan percaya diri ketika berbicara di depan umum.',
      features: [
        'Total 6x pertemuan',
        'Durasi setiap pertemuan 1,5 jam',
        'Batch 1: Senin & Rabu 16.30-18.00 WIB',
        'Batch 2: Selasa & Kamis 14.30-16.00 WIB'
      ],
      highlights: ['Sertifikat', 'Alat Tulis', 'Snack', 'Video Praktik'],
      image: publicSpeakingImage,
      testimonial: 'Program yang sangat membantu meningkatkan confidence saya dalam presentasi!'
    },
    {
      id: 2,
      title: 'Master of Ceremony Intensive',
      category: 'reguler',
      icon: Users,
      price: 'Rp 1.000.000',
      duration: '6x Pertemuan',
      level: 'Intermediate',
      rating: 4.8,
      participants: '1,800+',
      description: 'Belajar menjadi MC profesional dengan beragam kategori acara formal/semi formal/nonformal.',
      features: [
        'Total 6x pertemuan',
        'Durasi setiap pertemuan 1,5 jam',
        'Jadwal Selasa & Kamis 16.00-17.30 WIB',
        'Berbagai kategori acara'
      ],
      highlights: ['Sertifikat', 'Alat Tulis', 'Snack', 'Video Praktik'],
      image: mcImage,
      testimonial: 'Sekarang saya sudah berani MC acara besar berkat program ini!'
    },
    {
      id: 3,
      title: 'Radio Announcer Intensive',
      category: 'reguler',
      icon: Radio,
      price: 'Rp 1.100.000',
      duration: '6x Pertemuan',
      level: 'All Levels',
      rating: 4.9,
      participants: '1,200+',
      description: 'Belajar bagaimana menjadi penyiar radio, olah vokal dan teknis siaran.',
      features: [
        'Total 6x pertemuan',
        'Durasi setiap pertemuan 1,5 jam',
        'Jadwal Rabu & Jumat 16.00-17.30 WIB',
        'Olah vokal dan teknis siaran'
      ],
      highlights: ['Sertifikat', 'Alat Tulis', 'Snack', 'Rekaman Praktik'],
      image: radioImage,
      testimonial: 'Program yang sangat lengkap untuk memulai karir di dunia broadcasting!'
    },
    {
      id: 4,
      title: 'Kids Intensive Program',
      category: 'kids',
      icon: Baby,
      price: 'Rp 655.000',
      duration: '5x Pertemuan',
      level: 'Kids (7-12)',
      rating: 4.8,
      participants: '800+',
      description: 'Belajar lebih percaya diri dan berani ketika berbicara di depan umum.',
      features: [
        'Total 5x pertemuan',
        'Durasi setiap pertemuan 1 jam',
        'Jadwal setiap Jumat 15.00-16.00 WIB',
        'Metode fun learning'
      ],
      highlights: ['Sertifikat', 'Alat Tulis', 'Snack', 'Video Praktik'],
      image: kidsImage,
      testimonial: 'Anak saya jadi lebih berani bicara di depan kelas!'
    },
    {
      id: 5,
      title: 'Teens Intensive Program',
      category: 'kids',
      icon: Users,
      price: 'Rp 755.000',
      duration: '5x Pertemuan',
      level: 'Teens (13-17)',
      rating: 4.9,
      participants: '600+',
      description: 'Belajar lebih percaya diri dan berani ketika berbicara di depan umum.',
      features: [
        'Total 5x pertemuan',
        'Durasi setiap pertemuan 1 jam',
        'Jadwal setiap Jumat 16.00-17.00 WIB',
        'Pendekatan sesuai usia remaja'
      ],
      highlights: ['Sertifikat', 'Alat Tulis', 'Snack', 'Video Praktik'],
      image: teensImage,
      testimonial: 'Program yang tepat untuk meningkatkan kepercayaan diri remaja!'
    },
    {
      id: 6,
      title: 'Private Class',
      category: 'private',
      icon: Award,
      price: 'Mulai Rp 1.500.000',
      duration: '4x Pertemuan',
      level: 'Fleksibel',
      rating: 4.9,
      participants: '500+',
      description: 'Materi disesuaikan dengan kebutuhan peserta dengan berbagai pilihan spesialisasi.',
      features: [
        'Total 4x pertemuan',
        'Durasi setiap pertemuan 1 jam',
        'Jadwal fleksibel dapat disesuaikan',
        'Materi custom sesuai kebutuhan'
      ],
      highlights: ['Public Speaking', 'MC', 'Radio', 'Personal Branding', 'Voice Over', 'Content Creator'],
      image: privateClassImage,
      testimonial: 'Pembelajaran one-on-one yang sangat efektif dan personal!'
    },
    {
      id: 7,
      title: 'Corporate Training',
      category: 'private',
      icon: Building,
      price: 'Custom Quote',
      duration: 'Fleksibel',
      level: 'Corporate',
      rating: 4.9,
      participants: '300+ Companies',
      description: 'Materi disesuaikan dengan kebutuhan instansi/perusahaan.',
      features: [
        'Two Days Training (12 hours)',
        'Full Day Training (6 hours)',
        'Half Day Training (4 hours)',
        'Customizable content'
      ],
      highlights: ['On-site Training', 'Custom Material', 'Follow-up Support', 'Certificate'],
      image: corporateTrainingImage,
      testimonial: 'Tim kami menjadi lebih solid dan komunikatif setelah training ini!'
    }
  ];

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  const scrollToDirection = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const cardWidth = 320; // Approximate card width + gap
      const scrollAmount = cardWidth * 2; // Scroll 2 cards at a time
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const targetScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="services" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            Layanan Kami
          </Badge>
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Pilihan Program <span className="text-primary">Pelatihan</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Pilih program pelatihan yang sesuai dengan kebutuhan Anda!
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="flex flex-wrap gap-2 p-2 bg-muted/50 rounded-lg">
            {serviceCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
              >
                {category.name}
                <span className="ml-2 text-xs opacity-75">({category.count})</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Services Carousel */}
        <div className="relative mb-16">
          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-foreground">
              {serviceCategories.find(cat => cat.id === selectedCategory)?.name}
            </h3>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => scrollToDirection('left')}
                className="w-10 h-10 p-0 rounded-full"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => scrollToDirection('right')}
                className="w-10 h-10 p-0 rounded-full"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              ref={scrollContainerRef}
              className="overflow-x-auto scrollbar-hide pb-4"
              style={{ 
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              <div className="flex gap-6 w-max">
                {filteredServices.map((service, index) => {
                  const Icon = service.icon;
                  return (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                      className="group w-80 flex-shrink-0"
                    >
                  <Card className="h-full overflow-hidden border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl">
                    {/* Image Header */}
                    <div className="relative overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      
                      <div className="absolute top-4 left-4">
                        
                      </div>
                      <div className="absolute top-4 right-4">
                        <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">

                      </div>
                    </div>

                    <CardContent className="p-6 space-y-4">
                      {/* Title and Price */}
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {service.title}
                        </h3>
                        <div className="flex items-center justify-between">
                          <div className="text-2xl font-bold text-primary">{service.price}</div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="w-4 h-4 mr-1" />
                            {service.duration}
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {service.description}
                      </p>

                      {/* Features */}
                      <div className="space-y-2">
                        <h4 className="font-semibold text-foreground text-sm">Yang Akan Dipelajari:</h4>
                        <div className="space-y-1">
                          {service.features.slice(0, 3).map((feature, idx) => (
                            <div key={idx} className="flex items-center space-x-2">
                              <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                              <span className="text-xs text-muted-foreground">{feature}</span>
                            </div>
                          ))}
                          {service.features.length > 3 && (
                            <div className="text-xs text-primary font-medium">
                              +{service.features.length - 3} materi lainnya
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Highlights */}
                      <div className="flex flex-wrap gap-2">
                        {service.highlights.map((highlight, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {highlight}
                          </Badge>
                        ))}
                      </div>


                    </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>



        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >

        </motion.div>
      </div>
    </section>
  );
}