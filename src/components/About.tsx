import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import {
  Target,
  Eye,
  Heart,
  Award,
  Users,
  Clock,
  TrendingUp,
  CheckCircle,
  Lightbulb,
  Shield,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Settings,
} from "lucide-react";
import { Card, CardContent } from "./ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import { Badge } from "./ui/badge";
import energizerTrainingImage from "figma:asset/270261313db9279fc84f4bea480dfea93059d2e1.png";
import radioStationImage from "figma:asset/de59745e00c7095394e188577770c665d1d9f28f.png";
import alumniGroupImage from "figma:asset/0ed503f268b587c23d597c93e3869682d3f3e00a.png";
import workshopHandsOnImage from "figma:asset/cb9d1426ba2f6fdeac3b7970569158c1fcb46bb4.png";
import curriculumWorkshopImage from "figma:asset/022579699c750f475b2925bc6f96ff71255d9901.png";

interface GalleryImage {
  src: string;
  alt: string;
}

export function About() {
  const [activeTab, setActiveTab] = useState("about");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Load gallery from localStorage on mount
  useEffect(() => {
    const loadGalleryImages = () => {
      const savedGallery = localStorage.getItem('swaragama-gallery');
      let adminImages: GalleryImage[] = [];
      
      if (savedGallery) {
        const galleryData = JSON.parse(savedGallery);
        adminImages = galleryData.map((item: any) => ({
          src: item.src,
          alt: item.alt,
        }));
      }

      // Default/fallback images from original design
      const defaultImages: GalleryImage[] = [
        {
          src: energizerTrainingImage,
          alt: "Professional Training Session - Eye Contact Workshop",
        },
        {
          src: radioStationImage,
          alt: "Swaragama Radio Station - Team Building Session",
        },
        {
          src: alumniGroupImage,
          alt: "Training Alumni - Successful Program Completion",
        },
        {
          src: workshopHandsOnImage,
          alt: "Hands-On Workshop Session - Interactive Learning Experience",
        },
        {
          src: curriculumWorkshopImage,
          alt: "Curriculum Development Workshop - Professional Enhancement",
        },
      ];

      // Combine admin images with defaults, prioritizing admin images
      const combinedImages = adminImages.length > 0 
        ? [...adminImages, ...defaultImages.slice(0, Math.max(0, 8 - adminImages.length))]
        : defaultImages;

      setGalleryImages(combinedImages.slice(0, 8)); // Limit to 8 images
    };

    loadGalleryImages();

    // Listen for gallery updates from admin
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'swaragama-gallery') {
        loadGalleryImages();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Auto slide functionality
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide(
          (prev) => (prev + 1) % galleryImages.length,
        );
      }, 4000); // Change slide every 4 seconds
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, galleryImages.length]);

  const nextSlide = () => {
    setCurrentSlide(
      (prev) => (prev + 1) % galleryImages.length,
    );
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) =>
        (prev - 1 + galleryImages.length) %
        galleryImages.length,
    );
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const features = [
    {
      icon: Award,
      title: "Trainer Tersertifikasi",
      description:
        "Dipandu oleh trainer profesional, berpengalaman, dan memiliki sertifikasi resmi.",
      color: "bg-blue-500",
    },
    {
      icon: Users,
      title: "Pembelajaran Interaktif",
      description:
        "Belajar dua arah dengan metode yang seru, aplikatif, dan mudah dipahami.",
      color: "bg-green-500",
    },
    {
      icon: Clock,
      title: "Fleksibilitas Waktu",
      description:
        "Jadwal pelatihan bisa menyesuaikan kebutuhan Anda maupun tim.",
      color: "bg-purple-500",
    },
    {
      icon: Settings,
      title: "Materi Custom",
      description:
        "Konten pelatihan dirancang sesuai kebutuhan spesifik instansi/perusahaan maupun individu.",
      color: "bg-orange-500",
    },
  ];

  const values = [
    {
      icon: Lightbulb,
      title: "Inovasi",
      description:
        "Selalu menghadirkan metode pembelajaran terdepan",
    },
    {
      icon: Shield,
      title: "Integritas",
      description:
        "Komitmen penuh terhadap kualitas dan kepercayaan",
    },
    {
      icon: Heart,
      title: "Empati",
      description: "Memahami kebutuhan unik setiap peserta",
    },
    {
      icon: Target,
      title: "Excellence",
      description:
        "Standar tinggi dalam setiap aspek pelatihan",
    },
  ];

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 pt-16"
        >
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            Tentang Kami
          </Badge>
          <h2 className="text-4xl font-bold text-foreground mb-6">
            <span className="text-primary">Swaragama</span>{" "}
            <span className="text-foreground">
              Training Center (STC)
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            <strong className="text-primary">STC</strong> adalah
            lembaga pelatihan dan pengembangan SDM di Yogyakarta
            yang berfokus pada peningkatan{" "}
            <strong className="text-foreground">
              soft skills
            </strong>
            , terutama keterampilan komunikasi. Berada di bawah
            naungan{" "}
            <strong className="text-black dark:text-white">
              Swaragama Group
            </strong>
            , salah satu media terbesar di Yogyakarta, kami
            hadir sebagai mitra terpercaya dalam pengembangan
            potensi Anda.
          </p>
        </motion.div>

        {/* Main Content */}
        {(() => {
          // Check if we're in admin mode
          const isAdminMode = window.location.hash.startsWith('#admin');
          
          if (isAdminMode) {
            // Admin mode - only show gallery
            return (
              <div className="flex justify-center">
                {/* Galeri Swaragama - Centered for Admin */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="max-w-2xl w-full"
                >
                  {/* Galeri Swaragama - Auto Sliding Gallery */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="relative overflow-hidden rounded-xl border border-border shadow-lg group"
                    onMouseEnter={() => setIsPlaying(false)}
                    onMouseLeave={() => setIsPlaying(true)}
                  >
                    {/* Main Gallery Container */}
                    <div className="relative h-96 bg-muted">
                      {/* Image Slider */}
                      <div className="relative w-full h-full overflow-hidden">
                        {galleryImages.map((image, index) => (
                          <motion.div
                            key={index}
                            className="absolute inset-0"
                            initial={{ opacity: 0, x: 100 }}
                            animate={{
                              opacity:
                                currentSlide === index ? 1 : 0,
                              x:
                                currentSlide === index
                                  ? 0
                                  : currentSlide < index
                                    ? 100
                                    : -100,
                            }}
                            transition={{
                              duration: 0.7,
                              ease: "easeInOut",
                            }}
                          >
                            <img
                              src={image.src}
                              alt={image.alt}
                              className={`w-full h-full object-cover ${
                                index === 4 ? "object-[center_60%]" : ""
                              }`}
                            />
                            {/* Gradient Overlay for text readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          </motion.div>
                        ))}
                      </div>

                      {/* Navigation Arrows */}
                      <button
                        onClick={prevSlide}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>

                      <button
                        onClick={nextSlide}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>

                      {/* Caption */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <motion.h4
                          key={currentSlide}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                          className="font-semibold"
                        >
                          {galleryImages[currentSlide]?.alt}
                        </motion.h4>
                      </div>

                      {/* Gallery Badge */}
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-primary text-primary-foreground shadow-lg">
                          <Users className="w-4 h-4 mr-2" />
                          Galeri Swaragama
                        </Badge>
                      </div>
                    </div>

                    {/* Slide Indicators */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
                      {galleryImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => goToSlide(index)}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            currentSlide === index
                              ? "bg-white w-6"
                              : "bg-white/50 hover:bg-white/70"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Slide Counter */}
                    <div className="absolute bottom-3 right-3 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {currentSlide + 1} / {galleryImages.length}
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            );
          }
          
          // Main website mode - show full content
          return (
            <div className="space-y-16">
              {/* Top Section - Why Choose Swaragama and Gallery side by side */}
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                {/* Left Column - Profil Lembaga */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-card p-8 rounded-xl border border-transparent h-fit">
                    <div className="flex items-center mb-4">
                      <Award className="w-6 h-6 text-primary mr-3" />
                      <h3 className="text-2xl font-bold text-foreground">
                        Profil Lembaga
                      </h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      Sejak{" "}
                      <strong className="text-foreground">
                        2011
                      </strong>
                      ,{" "}
                      <strong className="text-primary">
                        Swaragama
                      </strong>{" "}
                      <strong className="text-foreground">
                        Training Center (STC)
                      </strong>{" "}
                      telah menjadi bagian dari salah satu unit
                      bisnis{" "}
                      <strong className="text-foreground">
                        Universitas Gadjah Mada
                      </strong>
                      . Hingga kini,{" "}
                      <strong className="text-primary">STC</strong>{" "}
                      telah dipercaya menangani lebih dari{" "}
                      <strong className="text-foreground">
                        3.000 alumni
                      </strong>{" "}
                      dengan berbagai latar belakang dan kebutuhan.
                    </p>

                    <div className="p-6 rounded-lg mb-6 bg-card">
                      <h4 className="font-semibold text-foreground mb-3">
                        Metode Pembelajaran:
                      </h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-muted-foreground">
                            <strong>Pendekatan Andragogy</strong> -
                            Pendekatan belajar yang menekankan
                            relevansi, pengalaman, dan kemandirian
                            dalam belajar.
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-muted-foreground">
                            <strong>Experiental Learning</strong> -
                            belajar melalui pengalaman nyata,
                            refleksi, dan praktik langsung untuk
                            hasil yang lebih aplikatif.
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-muted-foreground">
                            <strong>
                              Konsep 40% teori - 60% praktik
                            </strong>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6"></div>
                  </div>
                </motion.div>

                {/* Right Column - Galeri Swaragama */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  {/* Galeri Swaragama - Auto Sliding Gallery */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="relative overflow-hidden rounded-xl border border-border shadow-lg group"
                    onMouseEnter={() => setIsPlaying(false)}
                    onMouseLeave={() => setIsPlaying(true)}
                  >
                    {/* Main Gallery Container */}
                    <div className="relative h-56 md:h-80 bg-muted">
                      {/* Image Slider */}
                      <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
                        {galleryImages.map((image, index) => (
                          <motion.div
                            key={index}
                            className="absolute inset-0 flex items-center justify-center"
                            initial={{ opacity: 0, x: 100 }}
                            animate={{
                              opacity:
                                currentSlide === index ? 1 : 0,
                              x:
                                currentSlide === index
                                  ? 0
                                  : currentSlide < index
                                    ? 100
                                    : -100,
                            }}
                            transition={{
                              duration: 0.7,
                              ease: "easeInOut",
                            }}
                          >
                            <img
                              src={image.src}
                              alt={image.alt}
                              className={`max-w-full max-h-full md:w-full md:h-full md:object-cover object-contain ${
                                index === 4 ? "md:object-[center_60%]" : ""
                              }`}
                            />
                            {/* Gradient Overlay for text readability */}
                            
                          </motion.div>
                        ))}
                      </div>

                      {/* Navigation Arrows */}
                      <button
                        onClick={prevSlide}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>

                      <button
                        onClick={nextSlide}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>

                      {/* Caption */}
                      

                      {/* Gallery Badge */}
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-primary text-primary-foreground shadow-lg">
                          <Users className="w-4 h-4 mr-2" />
                          Galeri Swaragama
                        </Badge>
                      </div>
                    </div>

                    {/* Slide Indicators */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
                      {galleryImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => goToSlide(index)}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            currentSlide === index
                              ? "bg-white w-6"
                              : "bg-white/50 hover:bg-white/70"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Slide Counter */}
                    <div className="absolute bottom-3 right-3 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {currentSlide + 1} / {galleryImages.length}
                    </div>
                  </motion.div>
                </motion.div>
              </div>

              {/* Bottom Section - Mission, Vision, Values */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-4 mb-8">
                    <TabsTrigger value="about" className="text-sm">
                      Program
                    </TabsTrigger>
                    <TabsTrigger
                      value="mission"
                      className="text-sm"
                    >
                      Misi
                    </TabsTrigger>
                    <TabsTrigger value="vision" className="text-sm">
                      Visi
                    </TabsTrigger>
                    <TabsTrigger value="values" className="text-sm">
                      Nilai
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="about" className="space-y-6">
                    <div className="bg-card p-8 rounded-xl border border-border">
                      <h3 className="text-2xl font-bold text-foreground mb-6">
                        Mengapa Memilih Swaragama?
                      </h3>
                      <div className="space-y-6">
                        {features.map((feature, index) => {
                          const Icon = feature.icon;
                          return (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: 20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{
                                duration: 0.5,
                                delay: index * 0.1,
                              }}
                              viewport={{ once: true }}
                              className="flex items-start space-x-4 group"
                            >
                              <div
                                className={`p-3 rounded-lg ${feature.color} group-hover:scale-110 transition-transform duration-300`}
                              >
                                <Icon className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-foreground mb-2">
                                  {feature.title}
                                </h4>
                                <p className="text-muted-foreground">
                                  {feature.description}
                                </p>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>

                      {/* Program Kelas Reguler Section */}
                      

                      <div className="mt-8 bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-950/30 dark:to-yellow-900/30 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800">
                        <h4 className="font-semibold text-foreground mb-3 flex items-center">
                          <Users className="w-5 h-5 text-blue-600 mr-2" />
                          Layanan Inhouse Training
                        </h4>
                        <p className="text-muted-foreground mb-4">
                          Memfasilitasi pelaksanaan{" "}
                          <strong className="text-foreground">
                            inhouse training
                          </strong>{" "}
                          dengan rancangan materi yang dapat
                          disesuaikan dengan kebutuhan perusahaan.
                        </p>

                        <div className="mb-4">
                          <h5 className="font-medium text-foreground mb-3">
                            Pilihan Materi Inhouse Training:
                          </h5>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {[
                              "Public Speaking",
                              "Master of Ceremony",
                              "Radio Announcer",
                              "Service Excellent",
                              "Leadership",
                              "Motivation at Work",
                              "Team Building",
                              "Personal Branding",
                              "Negotiation Skills",
                              "Beauty Class & Grooming",
                              "Basic Selling Skills & Marketing",
                              "IT Training",
                              "Materi lainnya sesuai kebutuhan",
                            ].map((material, index) => (
                              <div
                                key={index}
                                className="flex items-center space-x-2"
                              >
                                <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                <span className="text-sm text-muted-foreground">
                                  {material}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent
                    value="mission"
                    className="space-y-6"
                  >
                    <div className="bg-card p-8 rounded-xl border border-border">
                      <div className="flex items-center mb-4">
                        <Target className="w-6 h-6 text-primary mr-3" />
                        <h3 className="text-2xl font-bold text-foreground">
                          Misi Kami
                        </h3>
                      </div>
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        Memberikan pelatihan komunikasi berkualitas
                        tinggi yang mengembangkan potensi individu
                        dan organisasi melalui metode pembelajaran
                        inovatif, praktis, dan berkelanjutan.
                      </p>
                      <div className="space-y-3">
                        {[
                          "Menghadirkan program pelatihan yang relevan dengan kebutuhan industri",
                          "Memfasilitasi pembelajaran yang interaktif dan aplikatif",
                          "Membangun kepercayaan diri peserta dalam berkomunikasi",
                          "Menciptakan network profesional yang kuat",
                        ].map((item, index) => (
                          <div
                            key={index}
                            className="flex items-start space-x-3"
                          >
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="vision" className="space-y-6">
                    <div className="bg-card p-8 rounded-xl border border-border">
                      <div className="flex items-center mb-4">
                        <Eye className="w-6 h-6 text-primary mr-3" />
                        <h3 className="text-2xl font-bold text-foreground">
                          Visi Kami
                        </h3>
                      </div>
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        Menjadi lembaga pelatihan komunikasi
                        terdepan di Indonesia yang menghasilkan
                        generasi komunikator handal dan berkarakter.
                      </p>
                      <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 rounded-lg">
                        <h4 className="font-semibold text-foreground mb-3">
                          Target 2030:
                        </h4>
                        <ul className="space-y-2 text-muted-foreground">
                          <li>
                            • 10,000+ Alumni Tersebar di Seluruh
                            Indonesia
                          </li>
                          <li>
                            • 50+ Program Pelatihan Spesialisasi
                          </li>
                          <li>
                            • Partnership dengan 100+ Perusahaan
                          </li>
                          <li>
                            • Ekspansi ke 5 Kota Besar Indonesia
                          </li>
                        </ul>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="values" className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {values.map((value, index) => {
                        const Icon = value.icon;
                        return (
                          <motion.div
                            key={index}
                            whileHover={{ scale: 1.02 }}
                            className="bg-card p-6 rounded-xl border border-border"
                          >
                            <Icon className="w-8 h-8 text-primary mb-3" />
                            <h4 className="font-semibold text-foreground mb-2">
                              {value.title}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {value.description}
                            </p>
                          </motion.div>
                        );
                      })}
                    </div>
                  </TabsContent>
                </Tabs>
              </motion.div>
            </div>
          );
        })()}
      </div>
    </section>
  );
}