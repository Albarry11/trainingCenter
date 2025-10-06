// Admin Dashboard Types
export interface Article {
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  featuredImage: string;
  author: {
    name: string;
    avatar: string;
  };
  publishedAt: Date;
  status: 'draft' | 'published' | 'archived';
  readTime: number;
  views: number;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ArticleFormData {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  featuredImage: File | string;
  status: 'draft' | 'published' | 'archived';
}

export interface Category {
  _id?: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  articleCount: number;
}

export interface AdminStats {
  totalArticles: number;
  publishedArticles: number;
  draftArticles: number;
  totalViews: number;
  totalLikes: number;
  categoriesCount: number;
  recentArticles: Article[];
  popularArticles: Article[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
  search?: string;
  category?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// News Types for Berita Terbaru
export interface News {
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