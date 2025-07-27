import { UploadCloud, Link as LinkIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Separator } from './ui/separator';
import React from 'react';
import { Card } from './ui/card';

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
    <Card className="flex flex-col items-center justify-center rounded-xl w-full text-center animate-fade-in p-8 shadow-none border-0 bg-transparent">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4 ring-8 ring-primary/5">
        <UploadCloud className="h-8 w-8 text-primary" />
      </div>
      <h3 className="text-2xl font-bold tracking-tight text-card-foreground">
        Extract YouTube Video Metadata
      </h3>
      <p className="mt-2 text-base text-muted-foreground max-w-md">
        Paste a YouTube link below to instantly pull its title, description, thumbnails, tags, and more.
      </p>

      <div className="my-8 flex items-center w-full max-w-sm">
        <Separator className="flex-1"/>
        <span className="px-4 text-sm font-semibold text-muted-foreground">PASTE URL</span>
        <Separator className="flex-1"/>
      </div>
      
      <form onSubmit={handleUrlSubmit} className="w-full max-w-sm flex items-center space-x-2">
        <Input
            type="url"
            placeholder="e.g., https://www.youtube.com/watch?v=..."
            className="h-12 text-base"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
        />
        <Button type="submit" size="icon" className="h-12 w-12" disabled={!url}>
            <LinkIcon className="h-5 w-5"/>
            <span className="sr-only">Submit URL</span>
        </Button>
      </form>
    </Card>
  );
}
