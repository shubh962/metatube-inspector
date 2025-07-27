import { UploadCloud, Link as LinkIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Separator } from './ui/separator';
import React from 'react';

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
    <div className="flex flex-col items-center justify-center rounded-lg w-full text-center animate-fade-in p-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
        <UploadCloud className="h-8 w-8 text-primary" />
      </div>
      <h3 className="text-2xl font-semibold tracking-tight text-card-foreground">
        Drop your file here or paste a URL
      </h3>
      <p className="mt-2 text-base text-muted-foreground max-w-md">
        Upload a file (PDF, image, video) or provide a link to extract its metadata instantly.
      </p>

      <div className="mt-6 w-full max-w-sm">
        <Button className="w-full h-12 text-base" onClick={() => document.getElementById('file-upload')?.click()}>
            <UploadCloud className="mr-2"/>
            Select File
        </Button>
        <input id="file-upload" type="file" className="hidden" />
      </div>

      <div className="my-6 flex items-center w-full max-w-sm">
        <Separator className="flex-1"/>
        <span className="px-4 text-sm text-muted-foreground">OR</span>
        <Separator className="flex-1"/>
      </div>
      
      <form onSubmit={handleUrlSubmit} className="w-full max-w-sm flex items-center space-x-2">
        <Input
            type="url"
            placeholder="e.g., https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            className="h-12 text-base"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
        />
        <Button type="submit" size="icon" className="h-12 w-12" disabled={!url}>
            <LinkIcon className="h-5 w-5"/>
            <span className="sr-only">Submit URL</span>
        </Button>
      </form>
    </div>
  );
}
