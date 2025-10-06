import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Upload, Link, Search, Download, Copy, Check, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { toast } from 'sonner@2.0.3';

interface ImageUploaderProps {
  onImageSelect: (url: string) => void;
  className?: string;
}

export function ImageUploader({ onImageSelect, className = '' }: ImageUploaderProps) {
  const [imageUrl, setImageUrl] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState('');

  // Sample high-quality stock images for training/gallery
  const suggestedImages = [
    {
      url: 'https://images.unsplash.com/photo-1728933102332-a4f1a281a621?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pY2F0aW9uJTIwdHJhaW5pbmclMjB3b3Jrc2hvcHxlbnwxfHx8fDE3NTg1NTU2MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Communication Workshop',
      category: 'Workshop'
    },
    {
      url: 'https://images.unsplash.com/photo-1646579886135-068c73800308?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdWJsaWMlMjBzcGVha2luZyUyMHRyYWluaW5nJTIwc2VtaW5hcnxlbnwxfHx8fDE3NTg1NTU2MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Public Speaking Training',
      category: 'Training'
    },
    {
      url: 'https://images.unsplash.com/photo-1748346674126-8c0df10f2f61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjB0cmFpbmluZyUyMHRlYW0lMjBidWlsZGluZ3xlbnwxfHx8fDE3NTg1NTU2NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Corporate Training',
      category: 'Corporate'
    },
    {
      url: 'https://images.unsplash.com/photo-1614304234753-7d1801e76968?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZXJ0aWZpY2F0ZSUyMGdyYWR1YXRpb24lMjBjZXJlbW9ueXxlbnwxfHx8fDE3NTg1NTU2NTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Certificate Ceremony',
      category: 'Certificate'
    },
    {
      url: 'https://images.unsplash.com/photo-1623208525215-a573aacb1560?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFpbmluZyUyMHRlYW0lMjBncm91cCUyMHBob3RvfGVufDF8fHx8MTc1ODU1NTY2OXww&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Team Group Photo',
      category: 'Team'
    },
    {
      url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1080&h=720&fit=crop',
      title: 'Professional Meeting',
      category: 'Event'
    }
  ];

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl) {
      toast.error('Please enter an image URL');
      return;
    }

    // Basic URL validation
    try {
      new URL(imageUrl);
      onImageSelect(imageUrl);
      setImageUrl('');
      toast.success('Image URL added successfully!');
    } catch {
      toast.error('Please enter a valid URL');
    }
  };

  const handleSuggestedImageSelect = (url: string) => {
    onImageSelect(url);
    toast.success('Image selected from gallery!');
  };

  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedUrl(url);
      toast.success('URL copied to clipboard!');
      setTimeout(() => setCopiedUrl(''), 2000);
    } catch {
      toast.error('Failed to copy URL');
    }
  };

  const filteredImages = suggestedImages.filter(image =>
    image.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    image.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Upload className="w-5 h-5 mr-2 text-primary" />
          Add Image
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="url" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="url" className="flex items-center space-x-2">
              <Link className="w-4 h-4" />
              <span>URL</span>
            </TabsTrigger>
            <TabsTrigger value="gallery" className="flex items-center space-x-2">
              <Search className="w-4 h-4" />
              <span>Gallery</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="url" className="space-y-4 mt-4">
            <div>
              <Label htmlFor="imageUrl">Image URL</Label>
              <form onSubmit={handleUrlSubmit} className="flex space-x-2 mt-2">
                <Input
                  id="imageUrl"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="flex-1"
                />
                <Button type="submit" disabled={!imageUrl || isLoading}>
                  <Download className="w-4 h-4 mr-1" />
                  Add
                </Button>
              </form>
              <p className="text-xs text-muted-foreground mt-2">
                Paste any image URL from Unsplash, Pixabay, or other sources
              </p>
            </div>

            <div className="bg-muted/30 p-4 rounded-lg">
              <h4 className="font-medium text-foreground mb-2 flex items-center">
                <Search className="w-4 h-4 mr-2 text-primary" />
                Recommended Sources:
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• <strong>Unsplash.com</strong> - Free high-quality stock photos</li>
                <li>• <strong>Pixabay.com</strong> - Free images and vectors</li>
                <li>• <strong>Pexels.com</strong> - Free stock photography</li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="gallery" className="space-y-4 mt-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search suggested images..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 max-h-80 overflow-y-auto">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="relative group cursor-pointer"
                  onClick={() => handleSuggestedImageSelect(image.url)}
                >
                  <div className="relative aspect-video rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-colors">
                    <img
                      src={image.url}
                      alt={image.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    
                    <div className="absolute top-2 left-2">
                      <Badge variant="secondary" className="bg-black/70 text-white text-xs">
                        {image.category}
                      </Badge>
                    </div>

                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="h-6 w-6 p-0 bg-white/90 hover:bg-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          copyToClipboard(image.url);
                        }}
                      >
                        {copiedUrl === image.url ? (
                          <Check className="w-3 h-3 text-green-600" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </Button>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
                      <p className="text-white text-xs font-medium truncate">
                        {image.title}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredImages.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Search className="w-8 h-8 mx-auto mb-2" />
                <p>No images found matching your search.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}