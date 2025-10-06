export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
  category: 'workshop' | 'training' | 'seminar' | 'corporate' | 'event' | 'certificate' | 'team';
  date: string;
  author: string;
}

export type GalleryView = 'list' | 'edit' | 'create';