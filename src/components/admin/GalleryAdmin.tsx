import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import {
  Plus,
  Edit,
  Trash2,
  Upload,
  Save,
  X,
  Image as ImageIcon,
  Eye,
  Download,
  Copy,
  Check,
  AlertCircle,
  FileImage,
  Settings,
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Alert, AlertDescription } from '../ui/alert';
import { toast } from 'sonner@2.0.3';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  fileName: string;
  fileSize: number;
  uploadDate: string;
}

interface GalleryFormData {
  alt: string;
  file: File | null;
}

export function GalleryAdmin() {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [formData, setFormData] = useState<GalleryFormData>({
    alt: '',
    file: null,
  });
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load gallery images from localStorage
  useEffect(() => {
    const loadGallery = () => {
      const savedGallery = localStorage.getItem('swaragama-gallery');
      if (savedGallery) {
        try {
          const parsed = JSON.parse(savedGallery);
          setGalleryImages(parsed);
        } catch (error) {
          console.error('Error loading gallery:', error);
          setGalleryImages([]);
        }
      }
    };

    loadGallery();
  }, []);

  // Save gallery to localStorage
  const saveGallery = (images: GalleryImage[]) => {
    localStorage.setItem('swaragama-gallery', JSON.stringify(images));
    setGalleryImages(images);
    // Dispatch storage event to update About component
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'swaragama-gallery',
      newValue: JSON.stringify(images),
    }));
  };

  // Convert file to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  // Handle file upload
  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('File harus berupa gambar');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast.error('Ukuran file maksimal 5MB');
      return;
    }

    setUploading(true);
    try {
      const base64 = await fileToBase64(file);
      setPreviewUrl(base64);
      setFormData(prev => ({ ...prev, file }));
    } catch (error) {
      toast.error('Gagal memproses file');
    } finally {
      setUploading(false);
    }
  };

  // Handle drag and drop
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileUpload(files[0]);
    }
  };

  // Handle file input change
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFileUpload(files[0]);
    }
  };

  // Add new image
  const handleAddImage = async () => {
    if (!formData.file || !formData.alt.trim()) {
      toast.error('Semua field harus diisi');
      return;
    }

    try {
      const base64 = await fileToBase64(formData.file);
      const newImage: GalleryImage = {
        id: Date.now().toString(),
        src: base64,
        alt: formData.alt.trim(),
        fileName: formData.file.name,
        fileSize: formData.file.size,
        uploadDate: new Date().toISOString(),
      };

      const updatedGallery = [...galleryImages, newImage];
      saveGallery(updatedGallery);
      
      // Reset form
      setFormData({ alt: '', file: null });
      setPreviewUrl('');
      setIsAddModalOpen(false);
      
      toast.success('Gambar berhasil ditambahkan ke galeri');
    } catch (error) {
      toast.error('Gagal menambahkan gambar');
    }
  };

  // Edit image
  const handleEditImage = () => {
    if (!selectedImage || !formData.alt.trim()) {
      toast.error('Semua field harus diisi');
      return;
    }

    const updatedGallery = galleryImages.map(img =>
      img.id === selectedImage.id
        ? {
            ...img,
            alt: formData.alt.trim(),
            ...(formData.file && {
              src: previewUrl,
              fileName: formData.file.name,
              fileSize: formData.file.size,
              uploadDate: new Date().toISOString(),
            }),
          }
        : img
    );

    saveGallery(updatedGallery);
    
    // Reset form
    setFormData({ alt: '', file: null });
    setPreviewUrl('');
    setSelectedImage(null);
    setIsEditModalOpen(false);
    
    toast.success('Gambar berhasil diperbarui');
  };

  // Delete image
  const handleDeleteImage = (imageId: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus gambar ini?')) {
      const updatedGallery = galleryImages.filter(img => img.id !== imageId);
      saveGallery(updatedGallery);
      toast.success('Gambar berhasil dihapus');
    }
  };

  // Open edit modal
  const openEditModal = (image: GalleryImage) => {
    setSelectedImage(image);
    setFormData({
      alt: image.alt,
      file: null,
    });
    setPreviewUrl(image.src);
    setIsEditModalOpen(true);
  };

  // Open preview modal
  const openPreviewModal = (image: GalleryImage) => {
    setSelectedImage(image);
    setIsPreviewModalOpen(true);
  };

  // Copy image URL
  const copyImageUrl = (imageId: string, src: string) => {
    navigator.clipboard.writeText(src);
    setCopiedId(imageId);
    toast.success('URL gambar disalin ke clipboard');
    setTimeout(() => setCopiedId(''), 2000);
  };

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  // Reset form and close modals
  const resetForm = () => {
    setFormData({ alt: '', file: null });
    setPreviewUrl('');
    setSelectedImage(null);
  };

  const closeAddModal = () => {
    resetForm();
    setIsAddModalOpen(false);
  };

  const closeEditModal = () => {
    resetForm();
    setIsEditModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Kelola Galeri Swaragama</h1>
          <p className="text-muted-foreground mt-2">
            Kelola foto-foto kegiatan dan program pelatihan Swaragama Training Center
          </p>
        </div>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Tambah Foto
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Tambah Foto Baru</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              {/* File Upload Area */}
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {previewUrl ? (
                  <div className="space-y-4">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="max-h-48 mx-auto rounded-lg object-contain"
                    />
                    <Button
                      variant="outline"
                      onClick={() => {
                        setPreviewUrl('');
                        setFormData(prev => ({ ...prev, file: null }));
                      }}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Hapus Preview
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      {uploading ? (
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                      ) : (
                        <FileImage className="h-12 w-12 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <p className="text-lg font-medium">
                        Drag & drop foto di sini
                      </p>
                      <p className="text-sm text-muted-foreground">
                        atau klik tombol di bawah untuk memilih file
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Pilih File
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileInputChange}
                      className="hidden"
                    />
                  </div>
                )}
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Alt Text (Deskripsi Gambar)
                  </label>
                  <Input
                    value={formData.alt}
                    onChange={(e) => setFormData(prev => ({ ...prev, alt: e.target.value }))}
                    placeholder="Deskripsi singkat gambar untuk accessibility"
                    required
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button onClick={handleAddImage} disabled={uploading} className="flex-1">
                  <Save className="w-4 h-4 mr-2" />
                  Simpan Foto
                </Button>
                <Button variant="outline" onClick={closeAddModal} className="flex-1">
                  Batal
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Gallery Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <ImageIcon className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Foto</p>
                <p className="text-2xl font-bold">{galleryImages.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Upload className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Storage Used</p>
                <p className="text-2xl font-bold">
                  {formatFileSize(galleryImages.reduce((total, img) => total + img.fileSize, 0))}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Settings className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Status</p>
                <p className="text-2xl font-bold text-green-600">Aktif</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gallery Grid */}
      {galleryImages.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative aspect-video">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                  {/* Action overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => openPreviewModal(image)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => openEditModal(image)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => copyImageUrl(image.id, image.src)}
                    >
                      {copiedId === image.id ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteImage(image.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium text-sm mb-2 line-clamp-1">
                    {image.alt}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{formatFileSize(image.fileSize)}</span>
                    <span>{new Date(image.uploadDate).toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center">
          <ImageIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Belum Ada Foto</h3>
          <p className="text-muted-foreground mb-6">
            Mulai tambahkan foto kegiatan dan program pelatihan Swaragama
          </p>
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Tambah Foto Pertama
          </Button>
        </Card>
      )}

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Foto</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Current/Preview Image */}
            <div className="text-center">
              <img
                src={previewUrl || selectedImage?.src}
                alt={selectedImage?.alt}
                className="max-h-48 mx-auto rounded-lg object-contain"
              />
            </div>

            {/* File Upload for Replacement */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Ganti Foto (Opsional)
              </label>
              <div className="border border-dashed border-border rounded-lg p-4 text-center">
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Pilih Foto Baru
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileInputChange}
                  className="hidden"
                />
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Alt Text (Deskripsi Gambar)
                </label>
                <Input
                  value={formData.alt}
                  onChange={(e) => setFormData(prev => ({ ...prev, alt: e.target.value }))}
                  placeholder="Deskripsi singkat gambar untuk accessibility"
                  required
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button onClick={handleEditImage} disabled={uploading} className="flex-1">
                <Save className="w-4 h-4 mr-2" />
                Simpan Perubahan
              </Button>
              <Button variant="outline" onClick={closeEditModal} className="flex-1">
                Batal
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Preview Modal */}
      <Dialog open={isPreviewModalOpen} onOpenChange={setIsPreviewModalOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Preview Foto</DialogTitle>
          </DialogHeader>
          {selectedImage && (
            <div className="space-y-4">
              <div className="text-center">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="max-h-96 mx-auto rounded-lg object-contain"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <label className="block font-medium text-muted-foreground">Alt Text:</label>
                  <p>{selectedImage.alt}</p>
                </div>
                <div>
                  <label className="block font-medium text-muted-foreground">File Name:</label>
                  <p>{selectedImage.fileName}</p>
                </div>
                <div>
                  <label className="block font-medium text-muted-foreground">File Size:</label>
                  <p>{formatFileSize(selectedImage.fileSize)}</p>
                </div>
                <div>
                  <label className="block font-medium text-muted-foreground">Upload Date:</label>
                  <p>{new Date(selectedImage.uploadDate).toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Info Alert */}
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Foto yang diunggah akan disimpan dalam browser dan akan muncul di section "Galeri Swaragama" 
          pada halaman Tentang Kami. Pastikan foto memiliki kualitas yang baik dan ukuran tidak melebihi 5MB.
        </AlertDescription>
      </Alert>
    </div>
  );
}