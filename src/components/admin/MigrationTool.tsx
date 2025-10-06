import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import { Progress } from '../ui/progress';
import { CheckCircle, AlertCircle, Database, Upload, Download } from 'lucide-react';
import { adminApi } from '../../services/adminApi';
import { toast } from 'sonner';

interface MigrationStatus {
  step: 'idle' | 'checking' | 'migrating' | 'completed' | 'error';
  progress: number;
  message: string;
  results?: {
    articles: { migrated: number; errors: number };
    news: { migrated: number; errors: number };
    gallery: { migrated: number; errors: number };
  };
}

interface LocalStorageData {
  articles: number;
  news: number;
  gallery: number;
}

export function MigrationTool() {
  const [status, setStatus] = useState<MigrationStatus>({
    step: 'idle',
    progress: 0,
    message: 'Ready to migrate data from localStorage to MongoDB'
  });

  const [localData, setLocalData] = useState<LocalStorageData | null>(null);

  // Check localStorage data
  const checkLocalData = () => {
    setStatus({ step: 'checking', progress: 10, message: 'Checking localStorage data...' });

    try {
      const articles = JSON.parse(localStorage.getItem('stc-articles') || '[]');
      const news = JSON.parse(localStorage.getItem('stc-news') || '[]');
      const gallery = JSON.parse(localStorage.getItem('stc-gallery') || '[]');

      const counts = {
        articles: articles.length,
        news: news.length,
        gallery: gallery.length
      };

      setLocalData(counts);
      setStatus({
        step: 'idle',
        progress: 0,
        message: `Found: ${counts.articles} articles, ${counts.news} news, ${counts.gallery} gallery items`
      });

      if (counts.articles === 0 && counts.news === 0 && counts.gallery === 0) {
        toast.info('No data found in localStorage to migrate');
      } else {
        toast.success('LocalStorage data found and ready for migration');
      }
    } catch (error) {
      setStatus({
        step: 'error',
        progress: 0,
        message: 'Error reading localStorage data'
      });
      toast.error('Failed to read localStorage data');
    }
  };

  // Perform migration
  const performMigration = async () => {
    if (!localData || (localData.articles === 0 && localData.news === 0 && localData.gallery === 0)) {
      toast.error('No data to migrate');
      return;
    }

    setStatus({ step: 'migrating', progress: 20, message: 'Starting migration...' });

    try {
      // Call migration API
      const response = await adminApi.migrateFromLocalStorage();

      if (response.success && response.data) {
        const results = response.data;
        
        setStatus({
          step: 'completed',
          progress: 100,
          message: 'Migration completed successfully!',
          results
        });

        toast.success('Data migration completed successfully!');

        // Optionally backup and clear localStorage after successful migration
        // backupLocalStorage();
        // clearLocalStorage();
      } else {
        throw new Error(response.error || 'Migration failed');
      }
    } catch (error) {
      setStatus({
        step: 'error',
        progress: 0,
        message: error instanceof Error ? error.message : 'Migration failed'
      });
      toast.error('Migration failed');
    }
  };

  // Backup localStorage to downloadable file
  const backupLocalStorage = () => {
    try {
      const articles = localStorage.getItem('stc-articles') || '[]';
      const news = localStorage.getItem('stc-news') || '[]';
      const gallery = localStorage.getItem('stc-gallery') || '[]';

      const backup = {
        timestamp: new Date().toISOString(),
        data: {
          articles: JSON.parse(articles),
          news: JSON.parse(news),
          gallery: JSON.parse(gallery)
        }
      };

      const dataStr = JSON.stringify(backup, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `swaragama-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success('Backup file downloaded');
    } catch (error) {
      toast.error('Failed to create backup');
    }
  };

  // Clear localStorage after migration
  const clearLocalStorage = () => {
    if (confirm('Are you sure you want to clear localStorage data? This action cannot be undone.')) {
      localStorage.removeItem('stc-articles');
      localStorage.removeItem('stc-news');
      localStorage.removeItem('stc-gallery');
      setLocalData(null);
      setStatus({
        step: 'idle',
        progress: 0,
        message: 'LocalStorage cleared. Ready to check for new data.'
      });
      toast.success('LocalStorage data cleared');
    }
  };

  // Reset migration status
  const resetMigration = () => {
    setStatus({
      step: 'idle',
      progress: 0,
      message: 'Ready to migrate data from localStorage to MongoDB'
    });
    setLocalData(null);
  };

  const getStatusIcon = () => {
    switch (status.step) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'migrating':
      case 'checking':
        return <Database className="h-5 w-5 text-blue-500 animate-pulse" />;
      default:
        return <Database className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = () => {
    switch (status.step) {
      case 'completed':
        return 'text-green-600';
      case 'error':
        return 'text-red-600';
      case 'migrating':
      case 'checking':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Data Migration Tool
          </CardTitle>
          <CardDescription>
            Migrate data from localStorage to MongoDB database
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Status Display */}
          <div className="flex items-center gap-3">
            {getStatusIcon()}
            <div className="flex-1">
              <div className={`font-medium ${getStatusColor()}`}>
                {status.message}
              </div>
              {status.step === 'migrating' && (
                <Progress value={status.progress} className="mt-2" />
              )}
            </div>
          </div>

          {/* Local Data Summary */}
          {localData && (
            <Alert>
              <AlertDescription>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-semibold text-lg">{localData.articles}</div>
                    <div className="text-muted-foreground">Articles</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-lg">{localData.news}</div>
                    <div className="text-muted-foreground">News</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-lg">{localData.gallery}</div>
                    <div className="text-muted-foreground">Gallery</div>
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Migration Results */}
          {status.results && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-2">
                  <div className="font-medium">Migration Results:</div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="font-medium">Articles</div>
                      <div className="text-green-600">✓ {status.results.articles.migrated} migrated</div>
                      {status.results.articles.errors > 0 && (
                        <div className="text-red-600">✗ {status.results.articles.errors} errors</div>
                      )}
                    </div>
                    <div>
                      <div className="font-medium">News</div>
                      <div className="text-green-600">✓ {status.results.news.migrated} migrated</div>
                      {status.results.news.errors > 0 && (
                        <div className="text-red-600">✗ {status.results.news.errors} errors</div>
                      )}
                    </div>
                    <div>
                      <div className="font-medium">Gallery</div>
                      <div className="text-green-600">✓ {status.results.gallery.migrated} migrated</div>
                      {status.results.gallery.errors > 0 && (
                        <div className="text-red-600">✗ {status.results.gallery.errors} errors</div>
                      )}
                    </div>
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={checkLocalData}
              variant="outline"
              disabled={status.step === 'migrating' || status.step === 'checking'}
            >
              <Database className="h-4 w-4 mr-2" />
              Check LocalStorage
            </Button>

            <Button
              onClick={performMigration}
              disabled={
                !localData || 
                status.step === 'migrating' || 
                status.step === 'checking' ||
                (localData.articles === 0 && localData.news === 0 && localData.gallery === 0)
              }
            >
              <Upload className="h-4 w-4 mr-2" />
              Start Migration
            </Button>

            <Button
              onClick={backupLocalStorage}
              variant="outline"
              disabled={!localData}
            >
              <Download className="h-4 w-4 mr-2" />
              Backup Data
            </Button>

            {status.step === 'completed' && (
              <Button
                onClick={clearLocalStorage}
                variant="destructive"
                size="sm"
              >
                Clear LocalStorage
              </Button>
            )}

            <Button
              onClick={resetMigration}
              variant="ghost"
              size="sm"
            >
              Reset
            </Button>
          </div>

          {/* Instructions */}
          <Alert>
            <AlertDescription className="text-sm space-y-2">
              <div className="font-medium">Migration Instructions:</div>
              <ol className="list-decimal list-inside space-y-1 ml-2">
                <li>Click "Check LocalStorage" to scan for existing data</li>
                <li>Click "Backup Data" to download a backup file (recommended)</li>
                <li>Click "Start Migration" to transfer data to MongoDB</li>
                <li>Optionally clear localStorage after successful migration</li>
              </ol>
              <div className="text-amber-600 font-medium mt-3">
                ⚠️ Always backup your data before migration!
              </div>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}