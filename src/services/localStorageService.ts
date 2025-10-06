/**
 * Pure Frontend LocalStorage Service
 * Replaces all database operations with localStorage
 */

interface Article {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  publishedAt: string;
  status: 'published' | 'draft';
  tags: string[];
  featured_image?: string;
  author: string;
  category: string;
  created_at: string;
}

interface News {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  publishedAt: string;
  status: 'published' | 'draft';
  featured_image?: string;
  author: string;
  category: string;
  created_at: string;
}

class LocalStorageService {
  // Always returns false since this is pure frontend
  async isServiceAvailable(): Promise<boolean> {
    return false;
  }

  // Get published articles from localStorage
  async getPublishedArticles(limit: number = 6): Promise<Article[]> {
    try {
      const articles = JSON.parse(localStorage.getItem('stc-articles') || '[]');
      return articles
        .filter((a: Article) => a.status === 'published')
        .slice(0, limit);
    } catch (error) {
      console.error('Failed to load published articles:', error);
      return [];
    }
  }

  // Get published news from localStorage
  async getPublishedNews(limit: number = 6): Promise<News[]> {
    try {
      const news = JSON.parse(localStorage.getItem('stc-news') || '[]');
      return news
        .filter((n: News) => n.status === 'published')
        .slice(0, limit);
    } catch (error) {
      console.error('Failed to load published news:', error);
      return [];
    }
  }

  // Get articles from localStorage (synchronous for Articles.tsx)
  getArticles(): Article[] {
    try {
      return JSON.parse(localStorage.getItem('stc-articles') || '[]');
    } catch (error) {
      console.error('Failed to load articles:', error);
      return [];
    }
  }

  // Get news from localStorage (synchronous for Articles.tsx)
  getNews(): News[] {
    try {
      return JSON.parse(localStorage.getItem('stc-news') || '[]');
    } catch (error) {
      console.error('Failed to load news:', error);
      return [];
    }
  }

  // Save articles to localStorage
  saveArticles(articles: Article[]): void {
    localStorage.setItem('stc-articles', JSON.stringify(articles));
  }

  // Save news to localStorage
  saveNews(news: News[]): void {
    localStorage.setItem('stc-news', JSON.stringify(news));
  }

  // Add new article
  addArticle(article: Omit<Article, 'id' | 'created_at'>): Article {
    const articles = this.getArticles();
    const newArticle: Article = {
      ...article,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
    };
    articles.push(newArticle);
    this.saveArticles(articles);
    return newArticle;
  }

  // Add new news
  addNews(news: Omit<News, 'id' | 'created_at'>): News {
    const newsList = this.getNews();
    const newNewsItem: News = {
      ...news,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
    };
    newsList.push(newNewsItem);
    this.saveNews(newsList);
    return newNewsItem;
  }

  // Update article
  updateArticle(id: string, updates: Partial<Article>): Article | null {
    const articles = this.getArticles();
    const index = articles.findIndex(a => a.id === id);
    if (index === -1) return null;
    
    articles[index] = { ...articles[index], ...updates };
    this.saveArticles(articles);
    return articles[index];
  }

  // Update news
  updateNews(id: string, updates: Partial<News>): News | null {
    const newsList = this.getNews();
    const index = newsList.findIndex(n => n.id === id);
    if (index === -1) return null;
    
    newsList[index] = { ...newsList[index], ...updates };
    this.saveNews(newsList);
    return newsList[index];
  }

  // Delete article
  deleteArticle(id: string): boolean {
    const articles = this.getArticles();
    const filteredArticles = articles.filter(a => a.id !== id);
    if (filteredArticles.length < articles.length) {
      this.saveArticles(filteredArticles);
      return true;
    }
    return false;
  }

  // Delete news
  deleteNews(id: string): boolean {
    const newsList = this.getNews();
    const filteredNews = newsList.filter(n => n.id !== id);
    if (filteredNews.length < newsList.length) {
      this.saveNews(filteredNews);
      return true;
    }
    return false;
  }
}

// Export single instance
export const localStorageService = new LocalStorageService();
export default localStorageService;