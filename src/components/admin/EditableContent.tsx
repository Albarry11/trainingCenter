import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Edit3, Save, X, Check, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { toast } from 'sonner';

interface EditableContentProps {
  content: string;
  type?: 'text' | 'textarea' | 'title' | 'subtitle';
  onSave: (newContent: string) => void;
  className?: string;
  placeholder?: string;
  maxLength?: number;
  multiline?: boolean;
}

export function EditableContent({
  content,
  type = 'text',
  onSave,
  className = '',
  placeholder = 'Click to edit...',
  maxLength = 500,
  multiline = false
}: EditableContentProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(content);
  const [isSaving, setIsSaving] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    setEditValue(content);
  }, [content]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      if (inputRef.current instanceof HTMLInputElement) {
        inputRef.current.select();
      }
    }
  }, [isEditing]);

  const handleSave = async () => {
    if (editValue.trim() === content.trim()) {
      setIsEditing(false);
      return;
    }

    setIsSaving(true);
    
    try {
      await onSave(editValue.trim());
      setIsEditing(false);
      toast.success('Konten berhasil disimpan!', {
        description: 'Perubahan telah tersimpan dan akan terlihat di website.',
      });
    } catch (error) {
      toast.error('Gagal menyimpan konten', {
        description: 'Terjadi kesalahan saat menyimpan. Silakan coba lagi.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditValue(content);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    }
    if (e.key === 'Escape') {
      handleCancel();
    }
    if (e.key === 's' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSave();
    }
  };

  const getInputComponent = () => {
    const baseProps = {
      ref: inputRef as any,
      value: editValue,
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
        setEditValue(e.target.value),
      onKeyDown: handleKeyDown,
      placeholder,
      maxLength,
      className: `${className} transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary`,
      disabled: isSaving
    };

    switch (type) {
      case 'textarea':
        return (
          <Textarea
            {...baseProps}
            rows={4}
            className="min-h-[100px] resize-none"
          />
        );
      case 'title':
        return (
          <Input
            {...baseProps}
            className="text-lg font-semibold bg-transparent border-2"
          />
        );
      case 'subtitle':
        return (
          <Input
            {...baseProps}
            className="text-base font-medium bg-transparent border-2"
          />
        );
      default:
        return multiline ? (
          <Textarea
            {...baseProps}
            rows={3}
            className="min-h-[80px] resize-none"
          />
        ) : (
          <Input {...baseProps} />
        );
    }
  };

  if (isEditing) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.2 }}
        className="relative group"
      >
        <div className="space-y-3">
          {getInputComponent()}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Badge 
                variant="outline" 
                className="text-xs text-muted-foreground border-muted-foreground/30"
              >
                {editValue.length}/{maxLength}
              </Badge>
              <span className="text-xs text-muted-foreground">
                Press Ctrl+S to save, Esc to cancel
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={handleCancel}
                disabled={isSaving}
                className="h-8 px-3"
              >
                <X className="w-3 h-3 mr-1" />
                Batal
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                disabled={isSaving || editValue.trim() === content.trim()}
                className="h-8 px-3 bg-primary hover:bg-primary/90"
              >
                {isSaving ? (
                  <div className="w-3 h-3 border-2 border-primary-foreground/20 border-t-primary-foreground rounded-full animate-spin mr-1" />
                ) : (
                  <Save className="w-3 h-3 mr-1" />
                )}
                Simpan
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div
      className={`group relative cursor-pointer transition-all duration-300 hover:bg-muted/30 rounded-lg p-2 -m-2 ${className}`}
      onClick={() => setIsEditing(true)}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          {content || (
            <span className="text-muted-foreground italic">{placeholder}</span>
          )}
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <div className="flex items-center space-x-1">
            <Badge variant="secondary" className="text-xs">
              Click to edit
            </Badge>
            <div className="w-6 h-6 bg-primary/10 rounded-md flex items-center justify-center">
              <Edit3 className="w-3 h-3 text-primary" />
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Hover indicator */}
      <motion.div
        className="absolute inset-0 border-2 border-primary/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
        layoutId="edit-border"
      />
    </div>
  );
}

// Wrapper component for easier usage
interface EditableSectionProps {
  title: string;
  content: string;
  onSave: (newContent: string) => void;
  icon?: React.ReactNode;
  description?: string;
}

export function EditableSection({
  title,
  content,
  onSave,
  icon,
  description
}: EditableSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border/50 rounded-xl p-6 space-y-4"
    >
      <div className="flex items-center space-x-3">
        {icon && (
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            {icon}
          </div>
        )}
        <div>
          <h3 className="font-semibold text-foreground">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
      
      <EditableContent
        content={content}
        type="textarea"
        onSave={onSave}
        placeholder={`Edit ${title.toLowerCase()}...`}
        maxLength={1000}
        multiline
        className="w-full"
      />
    </motion.div>
  );
}