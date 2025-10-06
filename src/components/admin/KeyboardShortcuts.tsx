import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Keyboard, 
  X, 
  Command, 
  Save, 
  Eye, 
  Plus, 
  Edit3,
  Home,
  FileText,
  Newspaper
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

interface KeyboardShortcutsProps {
  onPageChange?: (page: string) => void;
}

export function KeyboardShortcuts({ onPageChange }: KeyboardShortcutsProps) {
  const [showShortcuts, setShowShortcuts] = useState(false);

  const shortcuts = [
    {
      category: 'Navigation',
      items: [
        { key: 'Ctrl + 1', action: 'Dashboard', description: 'Go to dashboard overview' },
        { key: 'Ctrl + 2', action: 'Tips & Tricks', description: 'Manage articles' },
        { key: 'Ctrl + 3', action: 'Berita Terbaru', description: 'Manage news' },
        { key: 'Ctrl + 4', action: 'Gallery', description: 'Manage gallery photos' },
        { key: 'Ctrl + 5', action: 'Content Manager', description: 'Edit website content' },
      ]
    },
    {
      category: 'Actions',
      items: [
        { key: 'Ctrl + N', action: 'New Content', description: 'Create new article/news' },
        { key: 'Ctrl + S', action: 'Save', description: 'Save current changes' },
        { key: 'Ctrl + P', action: 'Preview', description: 'Preview website' },
        { key: 'Esc', action: 'Cancel', description: 'Cancel current action' },
      ]
    },
    {
      category: 'Editing',
      items: [
        { key: 'Ctrl + Enter', action: 'Quick Save', description: 'Save and continue editing' },
        { key: 'Ctrl + Z', action: 'Undo', description: 'Undo last change' },
        { key: 'Ctrl + Y', action: 'Redo', description: 'Redo last change' },
        { key: '?', action: 'Help', description: 'Show keyboard shortcuts' },
      ]
    }
  ];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for modifier keys
      const isCtrl = event.ctrlKey || event.metaKey;
      
      if (isCtrl) {
        switch (event.key) {
          case '1':
            event.preventDefault();
            onPageChange?.('dashboard');
            break;
          case '2':
            event.preventDefault();
            onPageChange?.('articles');
            break;
          case '3':
            event.preventDefault();
            onPageChange?.('news');
            break;
          case '4':
            event.preventDefault();
            onPageChange?.('gallery');
            break;
          case '5':
            event.preventDefault();
            onPageChange?.('content');
            break;
          case 'p':
            event.preventDefault();
            window.open(window.location.origin, '_blank');
            break;
        }
      }
      
      // Show shortcuts on ? key
      if (event.key === '?' && !event.ctrlKey && !event.altKey) {
        event.preventDefault();
        setShowShortcuts(true);
      }
      
      // Hide shortcuts on Escape
      if (event.key === 'Escape') {
        setShowShortcuts(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onPageChange]);

  return (
    <>
      {/* Shortcut trigger button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowShortcuts(true)}
        className="fixed bottom-4 right-4 z-40 bg-card/90 backdrop-blur-sm border-border/50 hover:bg-primary/5 hover:border-primary/30"
      >
        <Keyboard className="w-4 h-4 mr-2" />
        Shortcuts
        <Badge variant="secondary" className="ml-2 text-xs">?</Badge>
      </Button>

      {/* Shortcuts modal */}
      <AnimatePresence>
        {showShortcuts && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowShortcuts(false)}
            />

            {/* Modal content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.3 }}
              className="relative bg-card border border-border rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Keyboard className="w-6 h-6 mr-3 text-primary" />
                    Keyboard Shortcuts
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowShortcuts(false)}
                    className="w-8 h-8 p-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Use these keyboard shortcuts to navigate and manage content more efficiently.
                </p>
              </CardHeader>

              <CardContent className="space-y-6 max-h-[60vh] overflow-y-auto">
                {shortcuts.map((category) => (
                  <div key={category.category}>
                    <h3 className="font-semibold text-foreground mb-3 flex items-center">
                      {category.category === 'Navigation' && <Home className="w-4 h-4 mr-2 text-primary" />}
                      {category.category === 'Actions' && <Command className="w-4 h-4 mr-2 text-primary" />}
                      {category.category === 'Editing' && <Edit3 className="w-4 h-4 mr-2 text-primary" />}
                      {category.category}
                    </h3>
                    <div className="space-y-2">
                      {category.items.map((shortcut, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/30 transition-colors"
                        >
                          <div className="flex-1">
                            <div className="flex items-center space-x-3">
                              <Badge 
                                variant="outline" 
                                className="font-mono text-xs px-2 py-1 bg-muted/50"
                              >
                                {shortcut.key}
                              </Badge>
                              <span className="font-medium">{shortcut.action}</span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1 ml-12">
                              {shortcut.description}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Tips section */}
                <div className="border-t border-border pt-6">
                  <h3 className="font-semibold text-foreground mb-3">Tips</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>• Press <Badge variant="outline" className="mx-1 text-xs">?</Badge> anytime to show shortcuts</p>
                    <p>• Most shortcuts work globally throughout the admin panel</p>
                    <p>• Use <Badge variant="outline" className="mx-1 text-xs">Esc</Badge> to cancel any editing action</p>
                    <p>• Combine <Badge variant="outline" className="mx-1 text-xs">Ctrl + S</Badge> while editing to quick save</p>
                  </div>
                </div>
              </CardContent>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}