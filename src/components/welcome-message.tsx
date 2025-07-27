import { Link as LinkIcon, Youtube } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Separator } from './ui/separator';
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

interface WelcomeMessageProps {
    onUrlSubmit: (url: string) => void;
}

export function WelcomeMessage({ onUrlSubmit }: WelcomeMessageProps) {
  const [url, setUrl] = React.useState('');

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(url) {
        onUrlSubmit(url);
    }
  }

  return (
    <div className="w-full animate-fade-in">
        <Card className="w-full shadow-sm">
            <CardHeader>
                <CardTitle>Welcome to MetaTube</CardTitle>
                <CardDescription>
                    Paste a YouTube link below to instantly pull its title, description, thumbnails, tags, and more.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleUrlSubmit} className="w-full flex items-center space-x-2">
                    <div className="relative flex-grow">
                        <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                            type="url"
                            placeholder="e.g., https://www.youtube.com/watch?v=..."
                            className="h-12 text-base pl-10"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                    </div>
                    <Button type="submit" size="lg" className="h-12" disabled={!url}>
                        Extract
                    </Button>
                </form>
            </CardContent>
        </Card>
    </div>
  );
}
