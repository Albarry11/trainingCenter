import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Save, 
  Eye, 
  ArrowLeft, 
  Upload, 
  X,
  Plus,
  Image as ImageIcon
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Article, ArticleFormData } from '../../types/admin';
import { adminApi } from '../../services/adminApi';

interface ArticleEditorProps {
  article?: Article;
  onBack: () => void;
  onSave: () => void;
}

export function ArticleEditor({ article, onBack, onSave }: ArticleEditorProps) {
  const [formData, setFormData] = useState<ArticleFormData>({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    tags: [],
    featuredImage: '',
    status: 'draft'
  });
  const [newTag, setNewTag] = useState('');
  const [imagePreview, setImagePreview] = useState<string>('');
  const [loading, setSaving] = useState(false);

  useEffect(() => {
    if (article) {
      setFormData({
        title: article.title,
        excerpt: article.excerpt,
        content: article.content,
        category: article.category,
        tags: article.tags,
        featuredImage: article.featuredImage,
        status: article.status
      });
      setImagePreview(article.featuredImage);
    }
  }, [article]);

  const handleInputChange = (field: keyof ArticleFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, featuredImage: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSave = async (status: 'draft' | 'published' = formData.status) => {
    setSaving(true);
    
    const dataToSave = { ...formData, status };
    
    try {
      let response;
      if (article?._id) {
        response = await adminApi.updateArticle(article._id, dataToSave);
      } else {
        response = await adminApi.createArticle(dataToSave);
      }
      
      if (response.success) {
        onSave();
      } else {
        alert(response.error || 'Failed to save article');
      }
    } catch (error) {
      alert('Failed to save article');
    }
    
    setSaving(false);
  };

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold">
              {article ? 'Edit Article' : 'New Article'}
            </h1>
            <p className="text-muted-foreground">
              {article ? 'Update your article content' : 'Create a new article for STC Corner'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => handleSave('draft')} disabled={loading}>
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </Button>
          <Button onClick={() => handleSave('published')} disabled={loading}>
            <Eye className="w-4 h-4 mr-2" />
            Publish
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <Card>
            <CardHeader>
              <CardTitle>Article Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter article title..."
                  className="text-lg"
                />
              </div>
              
              <div>
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => handleInputChange('excerpt', e.target.value)}
                  placeholder="Brief description of the article..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Featured Image */}
          <Card>
            <CardHeader>
              <CardTitle>Featured Image</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {imagePreview && (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => {
                        setImagePreview('');
                        setFormData(prev => ({ ...prev, featuredImage: '' }));
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
                
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <ImageIcon className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Drag and drop an image here, or click to select
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="image-upload"
                    />
                    <Button
                      variant="outline"
                      onClick={() => document.getElementById('image-upload')?.click()}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Choose Image
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content */}
          <Card>
            <CardHeader>
              <CardTitle>Content</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={formData.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                placeholder="Write your article content here..."
                rows={15}
                className="min-h-[400px]"
              />
              <div className="mt-2 text-sm text-muted-foreground">
                Estimated read time: {calculateReadTime(formData.content)} minutes
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publish Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Publish Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="status">Status</Label>
                <Select 
                  value={formData.status} 
                  onValueChange={(value: 'draft' | 'published' | 'archived') => 
                    handleInputChange('status', value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => handleInputChange('category', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Communication">Communication</SelectItem>
                    <SelectItem value="Public Speaking">Public Speaking</SelectItem>
                    <SelectItem value="Leadership">Leadership</SelectItem>
                    <SelectItem value="Training">Training</SelectItem>
                    <SelectItem value="Soft Skills">Soft Skills</SelectItem>
                    <SelectItem value="Tips & Tricks">Tips & Tricks</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              
              <div className="flex space-x-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add tag..."
                  onKeyPress={(e) => e.key === 'Enter' && addTag()}
                />
                <Button onClick={addTag} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Article Stats (if editing) */}
          {article && (
            <Card>
              <CardHeader>
                <CardTitle>Article Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Views</span>
                  <span className="font-medium">{article.views}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Likes</span>
                  <span className="font-medium">{article.likes}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Read Time</span>
                  <span className="font-medium">{article.readTime} min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Created</span>
                  <span className="font-medium">
                    {new Date(article.createdAt).toLocaleDateString('id-ID')}
                  </span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}