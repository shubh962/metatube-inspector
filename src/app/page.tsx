"use client";

import { useState, useTransition, useCallback, useEffect, useRef } from "react";
import { getYouTubeVideoMetadata, type YouTubeVideo } from "@/app/actions";
import { extractYouTubeVideoId } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle, KeyRound, Loader2, Search, Youtube } from "lucide-react";

import { MetadataDisplay } from "@/components/metadata-display";
import { LoadingSkeleton } from "@/components/loading-skeleton";
import { WelcomeMessage } from "@/components/welcome-message";

function AdBanner({ placement }: { placement: string }) {
  const adRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && adRef.current && !adRef.current.hasChildNodes()) {
      const script = document.createElement('script');
      script.type = 'text/javascript';

      if (placement === 'Top Banner') {
        script.innerHTML = `
          atOptions = {
            'key' : 'ef44c02832896a1dec92310fee06f799',
            'format' : 'iframe',
            'height' : 90,
            'width' : 728,
            'params' : {}
          };
        `;
        const script2 = document.createElement('script');
        script2.type = 'text/javascript';
        script2.src = '//www.highperformanceformat.com/ef44c02832896a1dec92310fee06f799/invoke.js';
        adRef.current.appendChild(script);
        adRef.current.appendChild(script2);
      } else if (placement === 'Bottom Banner') {
        script.innerHTML = `
          atOptions = {
            'key' : 'ef44c02832896a1dec92310fee06f799',
            'format' : 'iframe',
            'height' : 90,
            'width' : 728,
            'params' : {}
          };
        `;
        const script2 = document.createElement('script');
        script2.type = 'text/javascript';
        script2.src = '//www.highperformanceformat.com/ef44c02832896a1dec92310fee06f799/invoke.js';
        adRef.current.appendChild(script);
        adRef.current.appendChild(script2);
      }
    }
  }, [isClient, placement]);

  const adStyles = placement === 'Top Banner' || placement === 'Bottom Banner'
    ? { width: '728px', height: '90px' } 
    : {};

  return (
    <div className="flex items-center justify-center my-6">
      <div ref={adRef} style={adStyles} />
    </div>
  );
}

export default function Home() {
  const [url, setUrl] = useState("");
  const [metadata, setMetadata] = useState<YouTubeVideo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const resetState = () => {
    setError(null);
    setMetadata(null);
  }

  const handleFetch = (videoId: string) => {
    startTransition(async () => {
      const result = await getYouTubeVideoMetadata(videoId);
      if (result.error) {
        setError(result.error);
        if (!result.error.includes("API key")) {
          toast({
            variant: "destructive",
            title: "Error fetching data",
            description: result.error,
          });
        }
      } else if (result.data) {
        setMetadata(result.data);
      }
    });
  }

  const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    resetState();

    const videoId = extractYouTubeVideoId(url);

    if (!videoId) {
      setError("Invalid YouTube URL. Please check the link and try again.");
      toast({
        variant: "destructive",
        title: "Invalid URL",
        description: "Could not extract a video ID from the provided URL.",
      });
      return;
    }

    handleFetch(videoId);

  }, [url, toast]);
  
  const isApiKeyMissing = error && error.includes("API key is missing");

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-background text-foreground">
      <header className="w-full border-b bg-card text-card-foreground">
        <div className="container mx-auto flex h-16 items-center gap-4 px-4 sm:px-6 lg:px-8">
          <Youtube className="h-7 w-7" />
          <h1 className="text-xl font-bold tracking-tight">
            MetaTube Inspector
          </h1>
        </div>
      </header>
      
      <main className="container mx-auto flex w-full max-w-4xl flex-1 flex-col items-center px-4 py-8">
        <AdBanner placement="Top Banner" />
        <Card className="w-full shadow-lg border-primary/20 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl">YouTube Video Inspector</CardTitle>
            <CardDescription>
              Enter a YouTube video URL to extract its title, description, tags, and more.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row">
              <Input
                type="url"
                placeholder="e.g., https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={isPending}
                required
                className="h-11 text-base"
              />
              <Button type="submit" disabled={isPending || !url} className="sm:w-48 h-11">
                {isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Search className="mr-2 h-4 w-4" />
                )}
                {isPending ? "Extracting..." : "Extract"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-8 w-full grid gap-8">
          {isPending && <LoadingSkeleton />}
          {error && !isPending && !isApiKeyMissing && (
             <Alert variant="destructive" className="animate-fade-in">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>An Error Occurred</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {isApiKeyMissing && (
            <Alert variant="destructive" className="animate-fade-in">
              <KeyRound className="h-4 w-4" />
              <AlertTitle>Configuration Needed: YouTube API Key</AlertTitle>
              <AlertDescription>
                <p>The YouTube API key is missing. To use this application, you need to provide your own API key.</p>
                <ol className="list-decimal pl-5 mt-2 space-y-1">
                  <li>Create a file named <strong>.env.local</strong> in the root of your project. The filename must be exactly <strong>.env.local</strong>.</li>
                  <li>Add the following line to it: <pre className="my-2 p-2 bg-muted rounded-md text-sm"><code>YOUTUBE_API_KEY=YOUR_API_KEY_HERE</code></pre></li>
                  <li>Replace <strong>YOUR_API_KEY_HERE</strong> with your actual YouTube Data API v3 key.</li>
                  <li>Restart the application for the changes to take effect.</li>
                </ol>
                <p className="mt-2">For security, remember to restrict your API key in the Google Cloud Console to your domain.</p>
              </AlertDescription>
            </Alert>
          )}
          {metadata && !isPending && <MetadataDisplay data={metadata} />}
          {!isPending && !error && !metadata && <WelcomeMessage />}
        </div>
        <AdBanner placement="Bottom Banner" />
      </main>
      
      <footer className="w-full py-6 text-center text-muted-foreground text-sm">
        <p>Built by Shubham Gautam.</p>
      </footer>
    </div>
  );
}
