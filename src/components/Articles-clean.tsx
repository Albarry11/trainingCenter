import { ArrowRight, Calendar, Clock, User, Tag, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
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

// Import all static images
import image_7aa43be9b8d671fdfcab74065b67e564f76ff20b from "figma:asset/7aa43be9b8d671fdfcab74065b67e564f76ff20b.png";
import image_4135c6bb1722e39f42edb3b5d10a20bdb9993bef from "figma:asset/4135c6bb1722e39f42edb3b5d10a20bdb9993bef.png";
import image_13669d8a98e3e17b13b5c6ff3b0b2bf90aa2e9b0 from "figma:asset/13669d8a98e3e17b13b5c6ff3b0b2bf90aa2e9b0.png";
import image_9b5a20d36d3ab006e43a6b5055b12a7b1e19b9b9 from "figma:asset/9b5a20d36d3ab006e43a6b5055b12a7b1e19b9b9.png";
import image_39e5ebdb85b8a5f0c1be7a49b6e61d9b6bb9e9c5 from "figma:asset/39e5ebdb85b8a5f0c1be7a49b6e61d9b6bb9e9c5.png";
import image_1e77bbab95c7b47e3c3b35c9bbf3b8bfe13b7b47 from "figma:asset/1e77bbab95c7b47e3c3b35c9bbf3b8bfe13b7b47.png";

// Memoized article card component for performance
const ArticleCard = memo(({ article }: { article: Article }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6 }}
    className="group h-full"
  >
    <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:shadow-primary/10 cursor-pointer">
      <div className="aspect-video relative overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Calendar className="w-4 h-4" />
          <span>{article.date}</span>
          <Clock className="w-4 h-4 ml-2" />
          <span>{article.readTime} min baca</span>
        </div>
        <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
          {article.title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pb-2">
        <CardDescription className="line-clamp-3 mb-3">
          {article.excerpt}
        </CardDescription>
        
        <div className="flex items-center gap-2 mb-3">
          <User className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{article.author}</span>
        </div>
        
        <div className="flex flex-wrap gap-1">
          {article.tags.slice(0, 2).map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              <Tag className="w-3 h-3 mr-1" />
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="pt-2">
        <Button variant="ghost" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
          Baca Selengkapnya
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardFooter>
    </Card>
  </motion.div>
));

ArticleCard.displayName = 'ArticleCard';

export function Articles() {
  const [adminArticles, setAdminArticles] = useState<Article[]>([]);
  const [adminNews, setAdminNews] = useState<Article[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const loadDataWithFallback = async () => {
      console.log('📱 Pure Frontend Mode: Loading from localStorage...');

      // Load articles from localStorage
      const savedArticles = localStorage.getItem('stc-articles');
      if (savedArticles) {
        try {
          const parsedArticles = JSON.parse(savedArticles);
          setAdminArticles(parsedArticles);
          console.log(`📦 Loaded ${parsedArticles.length} articles from localStorage`);
        } catch (error) {
          console.error('Error parsing articles from localStorage:', error);
          setAdminArticles([]);
        }
      } else {
        console.log('📦 No articles found in localStorage, showing empty state');
        setAdminArticles([]);
      }

      // Load news from localStorage
      const savedNews = localStorage.getItem('stc-news');
      if (savedNews) {
        try {
          const parsedNews = JSON.parse(savedNews);
          setAdminNews(parsedNews);
          console.log(`📦 Loaded ${parsedNews.length} news items from localStorage`);
        } catch (error) {
          console.error('Error parsing news from localStorage:', error);
          setAdminNews([]);
        }
      } else {
        console.log('📦 No news found in localStorage, showing empty state');
        setAdminNews([]);
      }
    };

    loadDataWithFallback();
    
    // Listen for storage changes
    const handleStorageChange = () => {
      loadDataWithFallback();
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
        const newIsMobile = window.innerWidth < 768;
        if (newIsMobile !== isMobile) {
          setIsMobile(newIsMobile);
        }
      }, 100);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timeoutId);
    };
  }, [isMobile]);

  // Memoized fallback articles data
  const fallbackTipsData = useMemo(() => [
    {
      id: "1",
      title: "5 Teknik Powerful untuk Mengatasi Nervous Saat Public Speaking",
      excerpt: "Temukan strategi terbukti untuk mengubah kegugupan menjadi energi positif yang mendukung performa speaking Anda.",
      content: "Public speaking adalah salah satu keterampilan paling berharga...",
      category: "tips-tricks",
      tags: ["Public Speaking", "Confidence", "Tips"],
      image: image_7aa43be9b8d671fdfcab74065b67e564f76ff20b,
      author: "Tim STC",
      date: "15 Des 2024",
      readTime: 5
    },
    {
      id: "2",
      title: "Rahasia Body Language yang Membuat Presentasi Anda Lebih Meyakinkan",
      excerpt: "Pelajari bagaimana gerakan tubuh, postur, dan ekspresi wajah dapat memperkuat pesan Anda secara dramatis.",
      content: "Body language menyampaikan 55% dari komunikasi kita...",
      category: "tips-tricks",
      tags: ["Body Language", "Presentation", "Communication"],
      image: image_13669d8a98e3e17b13b5c6ff3b0b2bf90aa2e9b0,
      author: "Tim STC",
      date: "12 Des 2024",
      readTime: 7
    },
    {
      id: "3",
      title: "Cara Cerdas Struktur Opening yang Langsung Menarik Perhatian Audience",
      excerpt: "Opening yang kuat adalah kunci kesuksesan presentasi. Pelajari formula yang terbukti efektif.",
      content: "Opening presentasi menentukan kesan pertama audience...",
      category: "tips-tricks",
      tags: ["Opening", "Audience Engagement", "Structure"],
      image: image_9b5a20d36d3ab006e43a6b5055b12a7b1e19b9b9,
      author: "Tim STC",
      date: "10 Des 2024",
      readTime: 6
    }
  ], []);

  const fallbackNewsData = useMemo(() => [
    {
      id: "1",
      title: "STC Raih Penghargaan Best Training Center 2024 dari APRI",
      excerpt: "Swaragama Training Center meraih penghargaan bergengsi sebagai pusat pelatihan komunikasi terbaik tahun 2024.",
      content: "Dalam acara APRI Awards 2024...",
      category: "berita-terbaru",
      tags: ["Penghargaan", "APRI", "Training Center"],
      image: image_4135c6bb1722e39f42edb3b5d10a20bdb9993bef,
      author: "Tim STC",
      date: "20 Des 2024",
      readTime: 4
    },
    {
      id: "2",
      title: "Program Kerjasama dengan 15 Universitas di Yogyakarta Resmi Diluncurkan",
      excerpt: "STC menjalin kemitraan strategis dengan universitas terkemuka untuk menghadirkan program pelatihan komunikasi terintegrasi.",
      content: "Dalam upaya meningkatkan kualitas soft skill mahasiswa...",
      category: "berita-terbaru",
      tags: ["Kerjasama", "Universitas", "Program"],
      image: image_39e5ebdb85b8a5f0c1be7a49b6e61d9b6bb9e9c5,
      author: "Tim STC",
      date: "18 Des 2024",
      readTime: 6
    },
    {
      id: "3",
      title: "Workshop Public Speaking Gratis untuk 500 Mahasiswa Se-DIY",
      excerpt: "STC mengadakan workshop massal sebagai bentuk kontribusi terhadap pengembangan SDM muda Indonesia.",
      content: "Sebagai wujud komitmen terhadap pendidikan...",
      category: "berita-terbaru",
      tags: ["Workshop", "Mahasiswa", "Gratis"],
      image: image_1e77bbab95c7b47e3c3b35c9bbf3b8bfe13b7b47,
      author: "Tim STC",
      date: "15 Des 2024",
      readTime: 5
    }
  ], []);

  // Use admin data if available, otherwise fallback to static data
  const tipsArticles = adminArticles.length > 0 ? adminArticles.slice(0, 3) : fallbackTipsData;
  const newsArticles = adminNews.length > 0 ? adminNews.slice(0, 3) : fallbackNewsData;

  return (
    <section id="articles" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            STC Corner
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Jelajahi tips, trik, dan berita terbaru seputar dunia komunikasi dan pengembangan diri 
            dari para ahli Swaragama Training Center
          </p>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="tips" className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center mb-8"
          >
            <TabsList className="grid w-full max-w-md grid-cols-2 h-12">
              <TabsTrigger value="tips" className="text-sm md:text-base font-medium">
                Tips & Tricks
              </TabsTrigger>
              <TabsTrigger value="news" className="text-sm md:text-base font-medium">
                Berita Terbaru
              </TabsTrigger>
            </TabsList>
          </motion.div>

          {/* Tips & Tricks Content */}
          <TabsContent value="tips" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {tipsArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <ArticleCard article={article} />
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Berita Terbaru Content */}
          <TabsContent value="news" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {newsArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <ArticleCard article={article} />
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button size="lg" className="group">
            Lihat Semua Artikel
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}