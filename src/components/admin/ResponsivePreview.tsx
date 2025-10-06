import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Monitor, Tablet, Smartphone, Eye, ExternalLink } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

type DeviceType = 'desktop' | 'tablet' | 'mobile';

interface ResponsivePreviewProps {
  content?: React.ReactNode;
  url?: string;
}

export function ResponsivePreview({ content, url }: ResponsivePreviewProps) {
  const [activeDevice, setActiveDevice] = useState<DeviceType>('desktop');

  const devices = [
    { 
      type: 'desktop' as DeviceType, 
      icon: Monitor, 
      label: 'Desktop',
      width: '100%',
      height: '600px',
      viewport: '1920x1080'
    },
    { 
      type: 'tablet' as DeviceType, 
      icon: Tablet, 
      label: 'Tablet',
      width: '768px',
      height: '500px',
      viewport: '768x1024'
    },
    { 
      type: 'mobile' as DeviceType, 
      icon: Smartphone, 
      label: 'Mobile',
      width: '375px',
      height: '600px',
      viewport: '375x812'
    }
  ];

  const activeDeviceConfig = devices.find(d => d.type === activeDevice);

  return (
    <Card className="border-border/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Eye className="w-5 h-5 mr-2 text-primary" />
            Responsive Preview
          </CardTitle>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center bg-muted/50 rounded-lg p-1">
              {devices.map((device) => {
                const Icon = device.icon;
                return (
                  <Button
                    key={device.type}
                    variant={activeDevice === device.type ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setActiveDevice(device.type)}
                    className={`h-8 px-3 ${
                      activeDevice === device.type 
                        ? 'bg-primary text-primary-foreground shadow-sm' 
                        : 'hover:bg-muted'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-1" />
                    {device.label}
                  </Button>
                );
              })}
            </div>
            
            {url && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.open(url, '_blank')}
                className="border-primary/20 hover:bg-primary/5"
              >
                <ExternalLink className="w-4 h-4 mr-1" />
                Open
              </Button>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <Badge variant="outline" className="text-xs">
            {activeDeviceConfig?.viewport}
          </Badge>
          <span>•</span>
          <span>Real-time preview</span>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="relative">
          {/* Device Frame */}
          <motion.div
            key={activeDevice}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="mx-auto bg-muted/30 rounded-lg p-4 flex items-center justify-center min-h-[400px]"
            style={{
              maxWidth: activeDeviceConfig?.width,
              height: activeDeviceConfig?.height
            }}
          >
            {/* Preview Content */}
            <div 
              className="w-full h-full bg-background rounded border border-border/50 overflow-hidden shadow-sm"
              style={{
                fontSize: activeDevice === 'mobile' ? '12px' : 
                          activeDevice === 'tablet' ? '14px' : '16px'
              }}
            >
              {content ? (
                <div className="w-full h-full overflow-auto">
                  {content}
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10">
                  <div className="text-center space-y-4 p-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                      <Eye className="w-8 h-8 text-primary/60" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">
                        Website Preview
                      </h3>
                      <p className="text-sm text-muted-foreground max-w-sm">
                        Pratinjau konten akan muncul di sini saat Anda mengedit konten website.
                      </p>
                    </div>
                    {url && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.open(url, '_blank')}
                        className="mt-4"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Buka Website
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
          
          {/* Device Labels */}
          <div className="flex justify-center mt-4 space-x-6 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Live</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Preview Mode</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Responsive</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Sample content preview component for demonstration
export function SampleWebsitePreview() {
  return (
    <div className="min-h-full bg-background">
      {/* Sample Header */}
      <div className="bg-card border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg"></div>
            <span className="font-semibold text-sm">Swaragama TC</span>
          </div>
          <div className="hidden md:flex items-center space-x-4 text-xs text-muted-foreground">
            <span>Home</span>
            <span>About</span>
            <span>Services</span>
            <span>Contact</span>
          </div>
        </div>
      </div>
      
      {/* Sample Hero */}
      <div className="bg-gradient-to-r from-primary/20 to-primary/10 p-6 text-center">
        <h1 className="text-lg font-bold mb-2">Your Communication Skills Solution</h1>
        <p className="text-xs text-muted-foreground mb-4">
          Swaragama Training Center hadir sebagai solusi tepat untuk meningkatkan kemampuan komunikasi...
        </p>
        <div className="space-x-2">
          <Button size="sm" className="bg-primary text-xs">Get Started</Button>
          <Button variant="outline" size="sm" className="text-xs">Learn More</Button>
        </div>
      </div>
      
      {/* Sample Content */}
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <Card key={i} className="border-border/50">
              <CardContent className="p-3">
                <div className="w-full h-20 bg-muted rounded mb-2"></div>
                <h3 className="text-xs font-semibold mb-1">Service {i}</h3>
                <p className="text-xs text-muted-foreground">Sample description...</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}