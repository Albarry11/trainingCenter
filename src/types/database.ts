import { ObjectId } from 'mongodb';

// Base interface for all database documents
export interface BaseDocument {
  _id?: ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

// Article document interface
export interface Article extends BaseDocument {
  id?: string; // For backward compatibility with localStorage
  title: string;
  excerpt: string;
  content: string;
  image?: string;
  author: string;
  category: string;
  tags: string[];
  published: boolean;
  publishDate: Date;
  readTime: number;
  viewCount: number;
  likes: number;
  slug: string;
}

// News document interface  
export interface News extends BaseDocument {
  id?: string; // For backward compatibility with localStorage
  title: string;
  content: string;
  excerpt: string;
  image?: string;
  author: string;
  published: boolean;
  publishDate: Date;
  category: string;
  tags: string[];
  priority: 'high' | 'medium' | 'low';
  slug: string;
}

// Gallery document interface
export interface Gallery extends BaseDocument {
  id?: string; // For backward compatibility with localStorage
  title: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
  uploadDate: Date;
  photographer?: string;
  location?: string;
  event?: string;
  published: boolean;
  featured: boolean;
  likes: number;
  views: number;
}

// User document interface (for admin authentication)
export interface User extends BaseDocument {
  username: string;
  email: string;
  passwordHash: string;
  role: 'admin' | 'editor' | 'viewer';
  lastLogin?: Date;
  active: boolean;
  permissions: string[];
  profile: {
    firstName: string;
    lastName: string;
    avatar?: string;
    bio?: string;
  };
}

// Settings document interface
export interface Settings extends BaseDocument {
  key: string;
  value: any;
  category: string;
  description?: string;
  type: 'string' | 'number' | 'boolean' | 'object' | 'array';
  public: boolean;
}

// API Response interfaces
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Query parameters interface
export interface QueryParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
  search?: string;
  category?: string;
  tags?: string[];
  published?: boolean;
  author?: string;
  dateFrom?: string;
  dateTo?: string;
}

// Aggregation pipeline interfaces
export interface AggregationOptions {
  match?: Record<string, any>;
  sort?: Record<string, 1 | -1>;
  limit?: number;
  skip?: number;
  project?: Record<string, 1 | 0>;
  lookup?: {
    from: string;
    localField: string;
    foreignField: string;
    as: string;
  }[];
}

// Database statistics interface
export interface DatabaseStats {
  totalArticles: number;
  totalNews: number;
  totalGallery: number;
  totalUsers: number;
  publishedArticles: number;
  publishedNews: number;
  publishedGallery: number;
  recentActivity: {
    articles: number;
    news: number;
    gallery: number;
  };
  storage: {
    totalSize: number;
    collections: Record<string, number>;
  };
}

// Migration interface for localStorage to MongoDB
export interface MigrationData {
  articles: Article[];
  news: News[];
  gallery: Gallery[];
}

// Search result interface
export interface SearchResult<T> {
  documents: T[];
  total: number;
  page: number;
  totalPages: number;
  hasMore: boolean;
}

// Export utility type for creating documents without _id
export type CreateDocument<T> = Omit<T, '_id' | 'createdAt' | 'updatedAt'>;
export type UpdateDocument<T> = Partial<Omit<T, '_id' | 'createdAt'>>;

// Validation schemas (for runtime validation)
export interface ValidationRule {
  field: string;
  required?: boolean;
  type?: 'string' | 'number' | 'boolean' | 'array' | 'object' | 'date';
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: RegExp;
  custom?: (value: any) => boolean;
  message?: string;
}

export interface CollectionSchema {
  name: string;
  rules: ValidationRule[];
}

// Index definitions for MongoDB collections
export interface IndexDefinition {
  fields: Record<string, 1 | -1>;
  options?: {
    unique?: boolean;
    sparse?: boolean;
    name?: string;
    background?: boolean;
    expireAfterSeconds?: number;
  };
}

export interface CollectionIndexes {
  [collectionName: string]: IndexDefinition[];
}