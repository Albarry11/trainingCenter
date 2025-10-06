import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  MoreHorizontal,
  Calendar,
  Clock,
  Heart
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '../ui/dropdown-menu';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Article, PaginationParams } from '../../types/admin';
import { adminApi } from '../../services/adminApi';

interface ArticlesListProps {
  onEdit: (article: Article) => void;
  onNew: () => void;
}

export function ArticlesList({ onEdit, onNew }: ArticlesListProps) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    loadArticles();
  }, [currentPage, statusFilter, categoryFilter, searchTerm]);

  const loadArticles = async () => {
    setLoading(true);
    
    const params: PaginationParams = {
      page: currentPage,
      limit: 10,
      ...(searchTerm && { search: searchTerm }),
      ...(statusFilter !== 'all' && { status: statusFilter }),
      ...(categoryFilter !== 'all' && { category: categoryFilter }),
      sortBy: 'updatedAt',
      sortOrder: 'desc'
    };

    const response = await adminApi.getArticles(params);
    
    if (response.success && response.data) {
      setArticles(response.data.data);
      setTotalPages(response.data.pagination.totalPages);
    } else {
      // Mock data for development
      setArticles([
        {
          _id: '1',
          title: 'Tips Komunikasi Efektif di Era Digital',
          slug: 'tips-komunikasi-efektif-digital',
          excerpt: 'Panduan lengkap untuk berkomunikasi dengan efektif di era digital yang penuh tantangan ini.',
          content: '',
          category: 'Communication',
          tags: ['komunikasi', 'digital', 'efektif'],
          featuredImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400',
          author: { name: 'Dr. Sarah', avatar: '' },
          publishedAt: new Date('2024-01-15'),
          status: 'published',
          readTime: 5,
          views: 234,
          likes: 18,
          createdAt: new Date('2024-01-10'),
          updatedAt: new Date('2024-01-15')
        },
        {
          _id: '2',
          title: 'Membangun Kepercayaan Diri dalam Public Speaking',
          slug: 'membangun-kepercayaan-diri-public-speaking',
          excerpt: 'Strategi praktis untuk mengatasi rasa gugup dan tampil percaya diri di depan umum.',
          content: '',
          category: 'Public Speaking',
          tags: ['public speaking', 'confidence', 'presentation'],
          featuredImage: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400',
          author: { name: 'Ahmad Rizki', avatar: '' },
          publishedAt: new Date('2024-01-12'),
          status: 'published',
          readTime: 7,
          views: 189,
          likes: 24,
          createdAt: new Date('2024-01-08'),
          updatedAt: new Date('2024-01-12')
        },
        {
          _id: '3',
          title: 'Leadership dalam Tim Remote',
          slug: 'leadership-dalam-tim-remote',
          excerpt: 'Cara memimpin tim yang bekerja secara remote dengan efektif dan efisien.',
          content: '',
          category: 'Leadership',
          tags: ['leadership', 'remote work', 'team management'],
          featuredImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400',
          author: { name: 'Budi Santoso', avatar: '' },
          publishedAt: new Date('2024-01-10'),
          status: 'draft',
          readTime: 6,
          views: 0,
          likes: 0,
          createdAt: new Date('2024-01-05'),
          updatedAt: new Date('2024-01-10')
        }
      ]);
    }
    
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      const response = await adminApi.deleteArticle(id);
      if (response.success) {
        loadArticles();
      } else {
        alert('Failed to delete article');
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(new Date(date));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Articles</h1>
          <p className="text-muted-foreground">
            Manage your STC Corner articles
          </p>
        </div>
        <Button onClick={onNew}>
          <Plus className="w-4 h-4 mr-2" />
          New Article
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Communication">Communication</SelectItem>
                <SelectItem value="Public Speaking">Public Speaking</SelectItem>
                <SelectItem value="Leadership">Leadership</SelectItem>
                <SelectItem value="Training">Training</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Articles List */}
      <div className="space-y-4">
        {loading ? (
          // Loading skeleton
          [...Array(5)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="flex space-x-4">
                    <div className="w-24 h-16 bg-muted rounded"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                      <div className="h-3 bg-muted rounded w-1/2"></div>
                      <div className="h-3 bg-muted rounded w-1/4"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : articles.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No articles found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm ? 'Try adjusting your search criteria' : 'Get started by creating your first article'}
              </p>
              <Button onClick={onNew}>
                <Plus className="w-4 h-4 mr-2" />
                Create Article
              </Button>
            </CardContent>
          </Card>
        ) : (
          articles.map((article, index) => (
            <motion.div
              key={article._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <img
                      src={article.featuredImage}
                      alt={article.title}
                      className="w-24 h-16 object-cover rounded-lg flex-shrink-0"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1 line-clamp-1">
                            {article.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                            {article.excerpt}
                          </p>
                          
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            <Badge className={getStatusColor(article.status)}>
                              {article.status}
                            </Badge>
                            <Badge variant="outline">{article.category}</Badge>
                            {article.tags.slice(0, 2).map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {formatDate(article.updatedAt)}
                            </span>
                            <span className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {article.readTime} min
                            </span>
                            <span className="flex items-center">
                              <Eye className="w-3 h-3 mr-1" />
                              {article.views}
                            </span>
                            <span className="flex items-center">
                              <Heart className="w-3 h-3 mr-1" />
                              {article.likes}
                            </span>
                          </div>
                        </div>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => onEdit(article)}>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 mr-2" />
                              Preview
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={() => handleDelete(article._id!)}
                              className="text-destructive"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          
          <div className="flex items-center space-x-1">
            {[...Array(Math.min(5, totalPages))].map((_, i) => {
              const page = i + 1;
              return (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              );
            })}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}