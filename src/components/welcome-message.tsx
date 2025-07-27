import { Youtube } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
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
    <div className="w-full animate-fade-in flex items-center justify-center py-12">
        <Card className="w-full max-w-2xl shadow-sm text-center border-0 bg-transparent">
            <CardHeader>
                <div className="mx-auto bg-primary/10 p-4 rounded-full mb-4 w-fit">
                  <Youtube className="h-12 w-12 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Welcome to MetaTube Inspector</CardTitle>
                <CardDescription className="text-lg text-muted-foreground pt-2">
                    Paste a YouTube link below to instantly pull its title, description, thumbnails, tags, and more.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleUrlSubmit} className="w-full flex items-center space-x-2">
                    <div className="relative flex-grow">
                        <Input
                            type="url"
                            placeholder="e.g., https://www.youtube.com/watch?v=..."
                            className="h-12 text-base pl-4"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                    </div>
                    <Button type="submit" size="lg" className="h-12" disabled={!url}>
                        Extract Metadata
                    </Button>
                </form>
            </CardContent>
        </Card>
    </div>
  );
}
