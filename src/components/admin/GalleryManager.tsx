import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  ArrowLeft, 
  Image, 
  Upload,
  Eye,
  Filter,
  Search,
  Grid,
  List
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
import { GalleryItem, GalleryView } from '../../types/gallery';
import { ImageUploader } from './ImageUploader';
import { toast } from 'sonner';

export function GalleryManager() {
  const [view, setView] = useState<GalleryView>('list');
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [formData, setFormData] = useState({
    src: '',
    alt: '',
    caption: '',
    category: 'workshop' as GalleryItem['category'],
    author: 'Tim STC'
  });

  // Load gallery from localStorage on mount
  useEffect(() => {
    const savedGallery = localStorage.getItem('swaragama-gallery');
    if (savedGallery) {
      setGallery(JSON.parse(savedGallery));
    } else {
      // Default gallery items with high quality images
      const defaultGallery: GalleryItem[] = [
        {
          id: '1',
          src: 'https://images.unsplash.com/photo-1728933102332-a4f1a281a621?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pY2F0aW9uJTIwdHJhaW5pbmclMjB3b3Jrc2hvcHxlbnwxfHx8fDE3NTg1NTU2MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
          alt: 'Workshop komunikasi Swaragama Training Center dengan peserta yang antusias berdiskusi',
          caption: 'Communication Skills Workshop 2024',
          category: 'workshop',
          date: '2024-01-15',
          author: 'Tim STC'
        },
        {
          id: '2',
          src: 'https://images.unsplash.com/photo-1646579886135-068c73800308?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdWJsaWMlMjBzcGVha2luZyUyMHRyYWluaW5nJTIwc2VtaW5hcnxlbnwxfHx8fDE3NTg1NTU2MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
          alt: 'Sesi public speaking training dengan trainer profesional di Swaragama Training Center',
          caption: 'Public Speaking Intensive Training',
          category: 'training',
          date: '2024-01-12',
          author: 'Tim STC'
        },
        {
          id: '3',
          src: 'https://images.unsplash.com/photo-1614304234753-7d1801e76968?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZXJ0aWZpY2F0ZSUyMGdyYWR1YXRpb24lMjBjZXJlbW9ueXxlbnwxfHx8fDE3NTg1NTU2NTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
          alt: 'Upacara wisuda dan pemberian sertifikat kepada peserta Swaragama Training Center',
          caption: 'Certificate Ceremony - Graduation Day',
          category: 'certificate',
          date: '2024-01-10',
          author: 'Tim STC'
        },
        {
          id: '4',
          src: 'https://images.unsplash.com/photo-1748346674126-8c0df10f2f61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjB0cmFpbmluZyUyMHRlYW0lMjBidWlsZGluZ3xlbnwxfHx8fDE3NTg1NTU2NTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
          alt: 'Corporate training dan team building session untuk perusahaan klien Swaragama',
          caption: 'Corporate Team Building Event',
          category: 'corporate',
          date: '2024-01-08',
          author: 'Tim STC'
        },
        {
          id: '5',
          src: 'https://images.unsplash.com/photo-1623208525215-a573aacb1560?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFpbmluZyUyMHRlYW0lMjBncm91cCUyMHBob3RvfGVufDF8fHx8MTc1ODU1NTY2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
          alt: 'Foto bersama tim trainer dan alumni Swaragama Training Center',
          caption: 'Trainer Team & Alumni Gathering',
          category: 'team',
          date: '2024-01-05',
          author: 'Tim STC'
        }
      ];
      setGallery(defaultGallery);
      localStorage.setItem('swaragama-gallery', JSON.stringify(defaultGallery));
    }
  }, []);

  // Save gallery to localStorage
  const saveGallery = (updatedGallery: GalleryItem[]) => {
    setGallery(updatedGallery);
    localStorage.setItem('swaragama-gallery', JSON.stringify(updatedGallery));
  };

  // Filter and search functionality
  const filteredGallery = gallery.filter(item => {
    const matchesSearch = item.caption.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.alt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCreate = () => {
    setFormData({
      src: '',
      alt: '',
      caption: '',
      category: 'workshop',
      author: 'Tim STC'
    });
    setEditingItem(null);
    setView('create');
  };

  const handleEdit = (item: GalleryItem) => {
    setFormData({
      src: item.src,
      alt: item.alt,
      caption: item.caption,
      category: item.category,
      author: item.author
    });
    setEditingItem(item);
    setView('edit');
  };

  const handleSave = () => {
    if (!formData.src || !formData.alt || !formData.caption) {
      toast.error('Mohon lengkapi semua field yang wajib diisi');
      return;
    }

    const galleryData: GalleryItem = {
      id: editingItem?.id || Date.now().toString(),
      src: formData.src,
      alt: formData.alt,
      caption: formData.caption,
      category: formData.category,
      date: editingItem?.date || new Date().toISOString().split('T')[0],
      author: formData.author
    };

    let updatedGallery;
    if (editingItem) {
      updatedGallery = gallery.map(item => 
        item.id === editingItem.id ? galleryData : item
      );
      toast.success('Item galeri berhasil diupdate!');
    } else {
      updatedGallery = [galleryData, ...gallery];
      toast.success('Item galeri berhasil ditambahkan!');
    }

    saveGallery(updatedGallery);
    setView('list');
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus item galeri ini?')) {
      const updatedGallery = gallery.filter(item => item.id !== id);
      saveGallery(updatedGallery);
      toast.success('Item galeri berhasil dihapus!');
    }
  };

  const categoryLabels = {
    workshop: 'Workshop',
    training: 'Training',
    seminar: 'Seminar',
    corporate: 'Corporate',
    event: 'Event',
    certificate: 'Certificate',
    team: 'Team'
  };

  // List View
  if (view === 'list') {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Gallery Management</h2>
            <p className="text-muted-foreground">
              Manage photos in About section gallery ({filteredGallery.length} of {gallery.length} items)
            </p>
          </div>
          <Button onClick={handleCreate} className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Add New Photo
          </Button>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search photos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="workshop">Workshop</SelectItem>
              <SelectItem value="training">Training</SelectItem>
              <SelectItem value="seminar">Seminar</SelectItem>
              <SelectItem value="corporate">Corporate</SelectItem>
              <SelectItem value="event">Event</SelectItem>
              <SelectItem value="certificate">Certificate</SelectItem>
              <SelectItem value="team">Team</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex border border-border rounded-lg">
            <Button
              variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-r-none"
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-l-none"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Gallery Items */}
        {filteredGallery.length === 0 ? (
          <div className="text-center py-12">
            <Image className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No gallery items found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || filterCategory !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'Start by adding your first gallery item'
              }
            </p>
            {!searchTerm && filterCategory === 'all' && (
              <Button onClick={handleCreate}>
                <Plus className="w-4 h-4 mr-2" />
                Add First Photo
              </Button>
            )}
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGallery.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <div className="relative aspect-video">
                    <img 
                      src={item.src} 
                      alt={item.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-1">
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        onClick={() => handleEdit(item)}
                        className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        onClick={() => handleDelete(item.id)}
                        className="h-8 w-8 p-0"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                    <div className="absolute top-2 left-2">
                      <Badge variant="secondary" className="bg-black/80 text-white">
                        {categoryLabels[item.category]}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium text-sm text-foreground mb-1 line-clamp-2">
                      {item.caption}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                      {item.alt}
                    </p>
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <span>{item.date}</span>
                      <span>{item.author}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredGallery.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="group hover:shadow-md transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-24 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={item.src} 
                          alt={item.alt}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop';
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-foreground truncate">{item.caption}</h3>
                          <Badge variant="outline" className="text-xs">
                            {categoryLabels[item.category]}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-1">{item.alt}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{item.date}</span>
                          <span>•</span>
                          <span>{item.author}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleEdit(item)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleDelete(item.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Create/Edit View
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => setView('list')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Gallery
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              {editingItem ? 'Edit Gallery Item' : 'Add New Gallery Item'}
            </h2>
            <p className="text-muted-foreground">
              {editingItem ? 'Update gallery item information' : 'Add a new photo to the About section gallery'}
            </p>
          </div>
        </div>
        <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
          <Save className="w-4 h-4 mr-2" />
          Save Photo
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ImageUploader 
            onImageSelect={(url) => setFormData(prev => ({ ...prev, src: url }))}
          />
          
          <Card>
            <CardHeader>
              <CardTitle>Photo Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="src">Selected Image URL *</Label>
                <Input
                  id="src"
                  value={formData.src}
                  onChange={(e) => setFormData(prev => ({ ...prev, src: e.target.value }))}
                  placeholder="https://images.unsplash.com/..."
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Image URL will be filled automatically when you select from gallery above, or enter manually
                </p>
              </div>

              <div>
                <Label htmlFor="caption">Caption *</Label>
                <Input
                  id="caption"
                  value={formData.caption}
                  onChange={(e) => setFormData(prev => ({ ...prev, caption: e.target.value }))}
                  placeholder="Energizer & Ice Breaking Session"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Short descriptive caption for the photo
                </p>
              </div>

              <div>
                <Label htmlFor="alt">Alt Text *</Label>
                <Textarea
                  id="alt"
                  value={formData.alt}
                  onChange={(e) => setFormData(prev => ({ ...prev, alt: e.target.value }))}
                  placeholder="Peserta training Swaragama mengangkat tangan dengan antusias"
                  rows={3}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Detailed description for accessibility and SEO
                </p>
              </div>
            </CardContent>
          </Card>

          {formData.src && (
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative aspect-video rounded-lg overflow-hidden border">
                  <img 
                    src={formData.src} 
                    alt={formData.alt || "Preview"} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop';
                    }}
                  />
                  {formData.caption && (
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent text-white">
                      <h4 className="font-medium">{formData.caption}</h4>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value as GalleryItem['category'] }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="workshop">Workshop</SelectItem>
                    <SelectItem value="training">Training</SelectItem>
                    <SelectItem value="seminar">Seminar</SelectItem>
                    <SelectItem value="corporate">Corporate Training</SelectItem>
                    <SelectItem value="event">Special Event</SelectItem>
                    <SelectItem value="certificate">Certificate</SelectItem>
                    <SelectItem value="team">Team Activities</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="author">Photographer/Author</Label>
                <Input
                  id="author"
                  value={formData.author}
                  onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                  placeholder="Tim STC"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• Use high-quality images (min 1200px width)</p>
                <p>• Write descriptive captions and alt text</p>
                <p>• Choose appropriate category</p>
                <p>• Photos will appear in About section gallery</p>
                <p>• Supported formats: JPG, PNG, WebP</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}