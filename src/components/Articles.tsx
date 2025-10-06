import image_7aa43be9b8d671fdfcab74065b67e564f76ff20b from "figma:asset/7aa43be9b8d671fdfcab74065b67e564f76ff20b.png";
import image_4135c6bb1722e39f42edb3b5d10a20bdb9993bef from "figma:asset/4135c6bb1722e39f42edb3b5d10a20bdb9993bef.png";
import image_9e2c730d7c619041bfbd07abdd4f980098d337b3 from "figma:asset/9e2c730d7c619041bfbd07abdd4f980098d337b3.png";
import {
  Calendar,
  User,
  ArrowRight,
  Lightbulb,
  Newspaper,
  ChevronLeft,
  ChevronRight,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import { motion } from "motion/react";
import { useState, useEffect, useCallback, useMemo, memo } from "react";
import { localStorageService } from "../services/localStorageService";

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

export function Articles() {
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [currentTipsIndex, setCurrentTipsIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [adminArticles, setAdminArticles] = useState<Article[]>([]);
  const [adminNews, setAdminNews] = useState<Article[]>([]);

  // Load articles and news from localStorage
  useEffect(() => {
    const loadData = () => {
      // Load Tips & Tricks articles from localStorage
      const savedArticles = localStorageService.getArticles();
      if (savedArticles && savedArticles.length > 0) {
        setAdminArticles(savedArticles);
        console.log(`📦 Loaded ${savedArticles.length} articles from localStorage`);
      } else {
        console.log('📦 No articles found in localStorage, showing fallback data');
        setAdminArticles([]);
      }

      // Load Berita Terbaru news from localStorage  
      const savedNews = localStorageService.getNews();
      if (savedNews && savedNews.length > 0) {
        setAdminNews(savedNews);
        console.log(`📰 Loaded ${savedNews.length} news items from localStorage`);
      } else {
        console.log('📰 No news found in localStorage, showing fallback data');
        setAdminNews([]);
      }
    };

    loadData();
    
    // Listen for storage changes
    const handleStorageChange = () => {
      loadData();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Optimized mobile detection with throttling
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const checkMobile = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth < 768);
      }, 100); // Throttle resize events
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  // Memoized news articles with fallback data
  const newsArticles = useMemo(() => {
    return adminNews.length > 0 ? 
      adminNews.map(news => ({
        title: news.title,
        excerpt: news.excerpt,
        author: news.author,
        date: news.date,
        category: news.category,
        image: news.image,
      })) : 
      [
        {
          title:
            "Sukses Memberikan Pelatihan Public Speaking untuk 550 Mahasiswa UGM",
          excerpt:
            "Swaragama Training Center berhasil memberikan pelatihan public speaking untuk sekitar 550 mahasiswa/i program reguler dan internasional Fakultas Ekonomi dan Bisnis Universitas Gadjah Mada.",
          author: "Gideon Surya",
          date: "2024-12-15",
          category: "Prestasi",
          image: image_9e2c730d7c619041bfbd07abdd4f980098d337b3,
        },
        {
          title:
            "Tim Bimasakti UGM Raih Juara 1 Business Presentation di Belanda",
          excerpt:
            "Memberikan coaching untuk Team Presentation dari Bimasakti UGM yang berkompetisi di Formula Students Netherlands 2022 dan berhasil memperoleh 1st place Business Presentation.",
          author: "Riza Perdana",
          date: "2024-12-10",
          category: "Prestasi",
          image: image_4135c6bb1722e39f42edb3b5d10a20bdb9993bef,
        },
        {
          title:
            "Kerjasama Pelatihan Rutin dengan PT. Bank Rakyat Indonesia",
          excerpt:
            "Tahun 2022, secara berkala memfasilitasi pelatihan public speaking untuk para karyawan PT. Bank Rakyat Indonesia (Persero) Region Yogyakarta.",
          author: "Dina Alia",
          date: "2024-12-05",
          category: "Kerjasama",
          image: image_7aa43be9b8d671fdfcab74065b67e564f76ff20b,
        },
      ];
  }, [adminNews]);

  // Memoized tips articles for performance
  const tipsArticles = useMemo(() => {
    return adminArticles.length > 0 ? 
      adminArticles.map(article => ({
        title: article.title,
        excerpt: article.excerpt,
        author: article.author,
        date: article.date,
        category: article.category,
        readTime: `${article.readTime} menit baca`,
      })) : 
      [
        {
          title: "5 Tips Mengatasi Demam Panggung saat Public Speaking",
          excerpt: "Temukan strategi praktis untuk mengatasi kecemasan dan nervositas saat berbicara di depan umum dengan teknik yang terbukti efektif.",
          author: "Dina Alia",
          date: "2024-12-18",
          category: "Public Speaking",
          readTime: "5 menit baca",
        },
        {
          title: "Cara Menjadi Master of Ceremony yang Profesional",
          excerpt: "Pelajari keterampilan dasar dan teknik lanjutan untuk menjadi MC yang mampu menguasai panggung dan menghibur audiens.",
          author: "Cici Priskila",
          date: "2024-12-16",
          category: "Master of Ceremony",
          readTime: "7 menit baca",
        },
        {
          title: "Teknik Voice Over yang Efektif untuk Pemula",
          excerpt: "Eksplorasi teknik dasar voice over dan tips praktis untuk mengembangkan suara yang menarik dan profesional.",
          author: "Bara Zulfa",
          date: "2024-12-14",
          category: "Voice Over",
          readTime: "6 menit baca",
        },
        {
          title: "Membangun Kepercayaan Diri Anak dalam Berbicara",
          excerpt: "Panduan lengkap untuk orang tua dan pendidik dalam membantu anak mengembangkan keterampilan komunikasi sejak dini.",
          author: "Bertha Virginia",
          date: "2024-12-12",
          category: "Kids Program",
          readTime: "8 menit baca",
        },
        {
          title: "Strategi Komunikasi Efektif di Tempat Kerja",
          excerpt: "Tips dan strategi penting untuk berkomunikasi dengan efektif di lingkungan kerja yang dinamis dan kompetitif.",
          author: "Ayu Rizqia",
          date: "2024-12-10",
          category: "Komunikasi Bisnis",
          readTime: "6 menit baca",
        },
        {
          title: "Menjadi Broadcaster Radio yang Sukses",
          excerpt: "Memahami industri radio dan teknik-teknik broadcasting yang diperlukan untuk menjadi announcer radio profesional.",
          author: "Kani Raras",
          date: "2024-12-08",
          category: "Broadcasting",
          readTime: "9 menit baca",
        },
      ];
  }, [adminArticles]);

  // Navigation functions for News
  const nextNews = useCallback(() => {
    setCurrentNewsIndex((prev) => (prev + 1) % newsArticles.length);
  }, [newsArticles.length]);

  const prevNews = useCallback(() => {
    setCurrentNewsIndex(
      (prev) => (prev - 1 + newsArticles.length) % newsArticles.length,
    );
  }, [newsArticles.length]);

  // Navigation functions for Tips
  const nextTips = useCallback(() => {
    setCurrentTipsIndex((prev) => (prev + 1) % tipsArticles.length);
  }, [tipsArticles.length]);

  const prevTips = useCallback(() => {
    setCurrentTipsIndex(
      (prev) => (prev - 1 + tipsArticles.length) % tipsArticles.length,
    );
  }, [tipsArticles.length]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (isNewsTab: boolean) => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && isMobile) {
      isNewsTab ? nextNews() : nextTips();
    }
    if (isRightSwipe && isMobile) {
      isNewsTab ? prevNews() : prevTips();
    }
  };

  // Memoized visible articles for performance
  const visibleNews = useMemo(() => {
    if (isMobile) {
      return [newsArticles[currentNewsIndex]];
    }
    
    // Desktop: show 2 articles
    const visible = [];
    for (let i = 0; i < Math.min(2, newsArticles.length); i++) {
      const index = (currentNewsIndex + i) % newsArticles.length;
      visible.push(newsArticles[index]);
    }
    return visible;
  }, [currentNewsIndex, isMobile, newsArticles]);

  const visibleTips = useMemo(() => {
    if (isMobile) {
      return [tipsArticles[currentTipsIndex]];
    }
    
    // Desktop: show 2 articles
    const visible = [];
    for (let i = 0; i < Math.min(2, tipsArticles.length); i++) {
      const index = (currentTipsIndex + i) % tipsArticles.length;
      visible.push(tipsArticles[index]);
    }
    return visible;
  }, [currentTipsIndex, isMobile, tipsArticles]);

  return (
    <section
      id="articles"
      className="py-20 bg-gradient-to-br from-primary/25 via-accent/40 to-primary/15 relative overflow-hidden lazy-section"
    >
      {/* Enhanced decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large decorative circles */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-accent/50 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-primary/20 rounded-full blur-2xl"></div>

        {/* Additional floating elements */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-primary/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-40 h-40 bg-accent/35 rounded-full blur-2xl"></div>
        <div className="absolute top-3/4 right-1/3 w-28 h-28 bg-primary/12 rounded-full blur-xl"></div>

        {/* Geometric patterns */}
        <div className="absolute top-16 right-16 w-16 h-16 bg-primary/20 rotate-45 blur-sm"></div>
        <div className="absolute bottom-32 left-32 w-20 h-20 bg-accent/40 rotate-12 blur-sm"></div>
        <div className="absolute top-2/3 left-16 w-12 h-12 bg-primary/15 rotate-45 blur-sm"></div>

        {/* Background overlay pattern */}
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
            Update terbaru seputar artikel, tips, dan kegiatan
            pelatihan yang sudah kami lakukan.
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
            {adminNews.length === 0 ? (
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <Newspaper className="w-16 h-16 text-muted-foreground/40 mx-auto mb-6" />
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Belum Ada Berita
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Konten berita terbaru akan segera hadir. Pantau terus update dari Swaragama Training Center!
                  </p>
                  <div className="inline-flex items-center px-4 py-2 rounded-lg bg-muted/50 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 mr-2" />
                    Coming Soon
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative">
                {/* Navigation Buttons - Desktop Only */}
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

              {/* Mobile Navigation Buttons */}
              <div className="flex justify-between items-center mb-6 md:hidden">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-background/80 backdrop-blur-sm border-border/50 hover:bg-accent shadow-sm"
                  onClick={prevNews}
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Prev
                </Button>
                
                <div className="text-sm text-muted-foreground">
                  {currentNewsIndex + 1} / {newsArticles.length}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-background/80 backdrop-blur-sm border-border/50 hover:bg-accent shadow-sm"
                  onClick={nextNews}
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>

              {/* Articles Grid */}
              <motion.div
                className={`${
                  isMobile 
                    ? "grid grid-cols-1 gap-6" 
                    : "grid grid-cols-1 md:grid-cols-2 gap-8"
                }`}
                key={`news-${currentNewsIndex}-${isMobile}`}
                initial={{ opacity: 0, x: isMobile ? 20 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: isMobile ? 0.3 : 0.5 }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={() => handleTouchEnd(true)}
                style={{ touchAction: 'pan-y' }}
              >
                {visibleNews.map((article, index) => (
                  <motion.div
                    key={`${article.title}-${currentNewsIndex}-${isMobile}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: isMobile ? 0.3 : 0.5,
                      delay: isMobile ? 0 : index * 0.1,
                    }}
                    className={`${
                      isMobile ? "mx-auto max-w-sm w-full" : ""
                    }`}
                  >
                    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary group bg-card h-full">
                      <div className="relative overflow-hidden">
                        <img
                          src={article.image}
                          alt={article.title}
                          className={`w-full ${isMobile ? "h-40" : "h-48"} object-cover object-[center_35%] group-hover:scale-110 transition-transform duration-300`}
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className={`bg-primary text-primary-foreground hover:bg-primary/90 ${
                            isMobile ? "text-xs" : ""
                          }`}>
                            {article.category}
                          </Badge>
                        </div>
                      </div>
                      <CardHeader className={isMobile ? "p-4" : ""}>
                        <h3 className={`font-bold text-card-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2 ${
                          isMobile ? "text-lg" : "text-xl"
                        }`}>
                          {article.title}
                        </h3>
                      </CardHeader>
                      <CardContent className={`space-y-4 ${isMobile ? "p-4 pt-0" : ""}`}>
                        <p className={`text-muted-foreground leading-relaxed line-clamp-3 ${
                          isMobile ? "text-sm" : ""
                        }`}>
                          {article.excerpt}
                        </p>
                        <div className="flex items-center justify-between pt-4 border-t border-border">
                          <div className="flex items-center space-x-2">
                            <User className={`text-primary ${isMobile ? "w-3 h-3" : "w-4 h-4"}`} />
                            <span className={`text-muted-foreground ${isMobile ? "text-xs" : "text-sm"}`}>
                              {article.author}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className={`text-primary ${isMobile ? "w-3 h-3" : "w-4 h-4"}`} />
                            <span className={`text-muted-foreground ${isMobile ? "text-xs" : "text-sm"}`}>
                              {new Date(article.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <button className={`flex items-center space-x-2 text-primary hover:text-primary/80 font-medium group/btn ${
                          isMobile ? "text-sm" : ""
                        }`}>
                          <span>Baca Selengkapnya</span>
                          <ArrowRight className={`group-hover/btn:translate-x-1 transition-transform duration-300 ${
                            isMobile ? "w-3 h-3" : "w-4 h-4"
                          }`} />
                        </button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>

              {/* Mobile Navigation Dots */}
              <div className="flex justify-center mt-8 md:hidden">
                <div className="flex gap-2 overflow-x-auto px-4 max-w-full">
                  {newsArticles.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentNewsIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors flex-shrink-0 ${
                        index === currentNewsIndex
                          ? "bg-primary"
                          : "bg-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Mobile Swipe Indicator */}
              <div className="text-center mt-4 md:hidden">
                <p className="text-xs text-muted-foreground">
                  Swipe left/right or use buttons to navigate
                </p>
              </div>
            </div>
            )}
          </TabsContent>

          {/* Tips Tab */}
          <TabsContent value="tips">
            {adminArticles.length === 0 ? (
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <Lightbulb className="w-16 h-16 text-muted-foreground/40 mx-auto mb-6" />
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Belum Ada Tips & Tricks
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Konten tips & tricks akan segera hadir. Pantau terus update dari Swaragama Training Center!
                  </p>
                  <div className="inline-flex items-center px-4 py-2 rounded-lg bg-muted/50 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 mr-2" />
                    Coming Soon
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative">
              {/* Navigation Buttons - Desktop Only */}
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

              {/* Mobile Navigation Buttons */}
              <div className="flex justify-between items-center mb-6 md:hidden">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-background/80 backdrop-blur-sm border-border/50 hover:bg-accent shadow-sm"
                  onClick={prevTips}
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Prev
                </Button>
                
                <div className="text-sm text-muted-foreground">
                  {currentTipsIndex + 1} / {tipsArticles.length}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-background/80 backdrop-blur-sm border-border/50 hover:bg-accent shadow-sm"
                  onClick={nextTips}
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>

              {/* Articles Grid */}
              <motion.div
                className={`${
                  isMobile 
                    ? "grid grid-cols-1 gap-6" 
                    : "grid grid-cols-1 md:grid-cols-2 gap-8"
                }`}
                key={`tips-${currentTipsIndex}-${isMobile}`}
                initial={{ opacity: 0, x: isMobile ? 20 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: isMobile ? 0.3 : 0.5 }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={() => handleTouchEnd(false)}
                style={{ touchAction: 'pan-y' }}
              >
                {visibleTips.map((article, index) => (
                  <motion.div
                    key={`${article.title}-${currentTipsIndex}-${isMobile}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: isMobile ? 0.3 : 0.5,
                      delay: isMobile ? 0 : index * 0.1,
                    }}
                    className={`${
                      isMobile ? "mx-auto max-w-sm w-full" : ""
                    }`}
                  >
                    <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary group bg-card h-full">
                      <CardHeader className={isMobile ? "p-4" : ""}>
                        <div className="flex items-start justify-between">
                          <Badge className={`bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground mb-3 ${
                            isMobile ? "text-xs" : ""
                          }`}>
                            {article.category}
                          </Badge>
                          <span className={`text-muted-foreground ${isMobile ? "text-xs" : "text-sm"}`}>
                            {article.readTime}
                          </span>
                        </div>
                        <h3 className={`font-bold text-card-foreground group-hover:text-primary transition-colors duration-300 ${
                          isMobile ? "text-lg" : "text-xl"
                        }`}>
                          {article.title}
                        </h3>
                      </CardHeader>
                      <CardContent className={`space-y-4 ${isMobile ? "p-4 pt-0" : ""}`}>
                        <p className={`text-muted-foreground leading-relaxed ${
                          isMobile ? "text-sm" : ""
                        }`}>
                          {article.excerpt}
                        </p>
                        <div className="flex items-center justify-between pt-4 border-t border-border">
                          <div className="flex items-center space-x-2">
                            <User className={`text-primary ${isMobile ? "w-3 h-3" : "w-4 h-4"}`} />
                            <span className={`text-muted-foreground ${isMobile ? "text-xs" : "text-sm"}`}>
                              {article.author}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className={`text-primary ${isMobile ? "w-3 h-3" : "w-4 h-4"}`} />
                            <span className={`text-muted-foreground ${isMobile ? "text-xs" : "text-sm"}`}>
                              {new Date(article.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <button className={`flex items-center space-x-2 text-primary hover:text-primary/80 font-medium group/btn ${
                          isMobile ? "text-sm" : ""
                        }`}>
                          <span>Baca Artikel</span>
                          <ArrowRight className={`group-hover/btn:translate-x-1 transition-transform duration-300 ${
                            isMobile ? "w-3 h-3" : "w-4 h-4"
                          }`} />
                        </button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>

              {/* Mobile Navigation Dots */}
              <div className="flex justify-center mt-8 md:hidden">
                <div className="flex gap-2 overflow-x-auto px-4 max-w-full">
                  {tipsArticles.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTipsIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors flex-shrink-0 ${
                        index === currentTipsIndex
                          ? "bg-primary"
                          : "bg-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Mobile Swipe Indicator */}
              <div className="text-center mt-4 md:hidden">
                <p className="text-xs text-muted-foreground">
                  Swipe left/right or use buttons to navigate
                </p>
              </div>
            </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}