/**
 * Pure Frontend Admin API Service
 * Uses localStorage for all data operations
 */

import { Article, ArticleFormData, Category, AdminStats, ApiResponse, PaginationParams, PaginatedResponse } from '../types/admin';
import { News, Gallery, DatabaseStats } from '../types/database';

class PureFrontendAdminApiService {
  // Generate unique ID
  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  // Helper to get data from localStorage
  private getLocalData<T>(key: string): T[] {
    try {
      return JSON.parse(localStorage.getItem(key) || '[]');
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error);
      return [];
    }
  }

  // Helper to save data to localStorage
  private saveLocalData<T>(key: string, data: T[]): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  }

  // Articles CRUD
  async getArticles(params: PaginationParams = {}): Promise<ApiResponse<PaginatedResponse<Article>>> {
    try {
      const articles = this.getLocalData<Article>('stc-articles');
      
      // Filter by status if requested
      const filtered = params.published !== undefined 
        ? articles.filter(a => a.status === (params.published ? 'published' : 'draft'))
        : articles;

      // Simple pagination
      const page = params.page || 1;
      const limit = params.limit || 10;
      const start = (page - 1) * limit;
      const paginatedData = filtered.slice(start, start + limit);

      return {
        success: true,
        data: {
          data: paginatedData,
          total: filtered.length,
          page,
          limit,
          totalPages: Math.ceil(filtered.length / limit)
        }
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to load articles'
      };
    }
  }

  async getArticle(id: string): Promise<ApiResponse<Article>> {
    try {
      const articles = this.getLocalData<Article>('stc-articles');
      const article = articles.find(a => a.id === id);
      
      if (!article) {
        return {
          success: false,
          error: 'Article not found'
        };
      }

      return {
        success: true,
        data: article
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to load article'
      };
    }
  }

  async createArticle(articleData: ArticleFormData): Promise<ApiResponse<Article>> {
    try {
      const articles = this.getLocalData<Article>('stc-articles');
      const newArticle: Article = {
        ...articleData,
        id: this.generateId(),
        publishedAt: new Date().toISOString()
      };
      
      articles.unshift(newArticle); // Add to beginning
      this.saveLocalData('stc-articles', articles);

      return {
        success: true,
        data: newArticle
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to create article'
      };
    }
  }

  async updateArticle(id: string, updates: Partial<Article>): Promise<ApiResponse<Article>> {
    try {
      const articles = this.getLocalData<Article>('stc-articles');
      const index = articles.findIndex(a => a.id === id);
      
      if (index === -1) {
        return {
          success: false,
          error: 'Article not found'
        };
      }

      articles[index] = { ...articles[index], ...updates };
      this.saveLocalData('stc-articles', articles);

      return {
        success: true,
        data: articles[index]
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to update article'
      };
    }
  }

  async deleteArticle(id: string): Promise<ApiResponse<{ id: string }>> {
    try {
      const articles = this.getLocalData<Article>('stc-articles');
      const filteredArticles = articles.filter(a => a.id !== id);
      
      this.saveLocalData('stc-articles', filteredArticles);

      return {
        success: true,
        data: { id }
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to delete article'
      };
    }
  }

  // News CRUD
  async getNews(params: PaginationParams = {}): Promise<ApiResponse<PaginatedResponse<News>>> {
    try {
      const news = this.getLocalData<News>('stc-news');
      
      // Filter by status if requested
      const filtered = params.published !== undefined 
        ? news.filter(n => n.status === (params.published ? 'published' : 'draft'))
        : news;

      // Simple pagination
      const page = params.page || 1;
      const limit = params.limit || 10;
      const start = (page - 1) * limit;
      const paginatedData = filtered.slice(start, start + limit);

      return {
        success: true,
        data: {
          data: paginatedData,
          total: filtered.length,
          page,
          limit,
          totalPages: Math.ceil(filtered.length / limit)
        }
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to load news'
      };
    }
  }

  async createNews(newsData: Omit<News, 'id'>): Promise<ApiResponse<News>> {
    try {
      const news = this.getLocalData<News>('stc-news');
      const newNews: News = {
        ...newsData,
        id: this.generateId(),
        publishedAt: new Date().toISOString()
      };
      
      news.unshift(newNews); // Add to beginning
      this.saveLocalData('stc-news', news);

      return {
        success: true,
        data: newNews
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to create news'
      };
    }
  }

  async updateNews(id: string, updates: Partial<News>): Promise<ApiResponse<News>> {
    try {
      const news = this.getLocalData<News>('stc-news');
      const index = news.findIndex(n => n.id === id);
      
      if (index === -1) {
        return {
          success: false,
          error: 'News not found'
        };
      }

      news[index] = { ...news[index], ...updates };
      this.saveLocalData('stc-news', news);

      return {
        success: true,
        data: news[index]
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to update news'
      };
    }
  }

  async deleteNews(id: string): Promise<ApiResponse<{ id: string }>> {
    try {
      const news = this.getLocalData<News>('stc-news');
      const filteredNews = news.filter(n => n.id !== id);
      
      this.saveLocalData('stc-news', filteredNews);

      return {
        success: true,
        data: { id }
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to delete news'
      };
    }
  }

  // Gallery CRUD
  async getGallery(params: PaginationParams = {}): Promise<ApiResponse<PaginatedResponse<Gallery>>> {
    try {
      const gallery = this.getLocalData<Gallery>('stc-gallery');
      
      // Simple pagination
      const page = params.page || 1;
      const limit = params.limit || 12;
      const start = (page - 1) * limit;
      const paginatedData = gallery.slice(start, start + limit);

      return {
        success: true,
        data: {
          data: paginatedData,
          total: gallery.length,
          page,
          limit,
          totalPages: Math.ceil(gallery.length / limit)
        }
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to load gallery'
      };
    }
  }

  async createGalleryItem(itemData: Omit<Gallery, 'id'>): Promise<ApiResponse<Gallery>> {
    try {
      const gallery = this.getLocalData<Gallery>('stc-gallery');
      const newItem: Gallery = {
        ...itemData,
        id: this.generateId(),
        createdAt: new Date().toISOString()
      };
      
      gallery.unshift(newItem); // Add to beginning
      this.saveLocalData('stc-gallery', gallery);

      return {
        success: true,
        data: newItem
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to create gallery item'
      };
    }
  }

  async updateGalleryItem(id: string, updates: Partial<Gallery>): Promise<ApiResponse<Gallery>> {
    try {
      const gallery = this.getLocalData<Gallery>('stc-gallery');
      const index = gallery.findIndex(g => g.id === id);
      
      if (index === -1) {
        return {
          success: false,
          error: 'Gallery item not found'
        };
      }

      gallery[index] = { ...gallery[index], ...updates };
      this.saveLocalData('stc-gallery', gallery);

      return {
        success: true,
        data: gallery[index]
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to update gallery item'
      };
    }
  }

  async deleteGalleryItem(id: string): Promise<ApiResponse<{ id: string }>> {
    try {
      const gallery = this.getLocalData<Gallery>('stc-gallery');
      const filteredGallery = gallery.filter(g => g.id !== id);
      
      this.saveLocalData('stc-gallery', filteredGallery);

      return {
        success: true,
        data: { id }
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to delete gallery item'
      };
    }
  }

  // Statistics
  async getStats(): Promise<ApiResponse<AdminStats>> {
    try {
      const articles = this.getLocalData<Article>('stc-articles');
      const news = this.getLocalData<News>('stc-news');
      const gallery = this.getLocalData<Gallery>('stc-gallery');

      const stats: AdminStats = {
        totalArticles: articles.length,
        totalNews: news.length,
        totalGallery: gallery.length,
        publishedArticles: articles.filter(a => a.status === 'published').length,
        publishedNews: news.filter(n => n.status === 'published').length,
        lastUpdated: new Date().toISOString()
      };

      return {
        success: true,
        data: stats
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to load statistics'
      };
    }
  }

  // Database operations (mock for compatibility)
  async getDatabaseStats(): Promise<ApiResponse<DatabaseStats>> {
    try {
      const articles = this.getLocalData<Article>('stc-articles');
      const news = this.getLocalData<News>('stc-news');
      const gallery = this.getLocalData<Gallery>('stc-gallery');

      const stats: DatabaseStats = {
        totalCollections: 3, // articles, news, gallery
        totalDocuments: articles.length + news.length + gallery.length,
        storageSize: '0 MB', // localStorage doesn't track size
        indexSize: '0 MB',
        lastBackup: 'Manual backup required',
        status: 'LocalStorage Active'
      };

      return {
        success: true,
        data: stats
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to load database statistics'
      };
    }
  }

  // Health check
  async healthCheck(): Promise<ApiResponse<{ status: string; timestamp: string }>> {
    return {
      success: true,
      data: {
        status: 'Pure Frontend Mode - LocalStorage',
        timestamp: new Date().toISOString()
      }
    };
  }

  // Import/Export
  async exportData(): Promise<ApiResponse<{ articles: Article[]; news: News[]; gallery: Gallery[] }>> {
    try {
      const articles = this.getLocalData<Article>('stc-articles');
      const news = this.getLocalData<News>('stc-news');
      const gallery = this.getLocalData<Gallery>('stc-gallery');

      return {
        success: true,
        data: { articles, news, gallery }
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to export data'
      };
    }
  }

  async importData(data: { articles?: Article[]; news?: News[]; gallery?: Gallery[] }): Promise<ApiResponse<{ message: string }>> {
    try {
      if (data.articles) {
        this.saveLocalData('stc-articles', data.articles);
      }
      if (data.news) {
        this.saveLocalData('stc-news', data.news);
      }
      if (data.gallery) {
        this.saveLocalData('stc-gallery', data.gallery);
      }

      return {
        success: true,
        data: { message: 'Data imported successfully to localStorage' }
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to import data'
      };
    }
  }

  // Categories (mock for compatibility)
  async getCategories(): Promise<ApiResponse<Category[]>> {
    const defaultCategories: Category[] = [
      { id: '1', name: 'Tutorial', slug: 'tutorial', count: 0 },
      { id: '2', name: 'Tips', slug: 'tips', count: 0 },
      { id: '3', name: 'Teknologi', slug: 'teknologi', count: 0 },
      { id: '4', name: 'Bisnis', slug: 'bisnis', count: 0 }
    ];

    return {
      success: true,
      data: defaultCategories
    };
  }
}

// Export single instance
export const adminApi = new PureFrontendAdminApiService();
export default adminApi;