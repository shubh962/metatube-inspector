"use client";

import { useState, useTransition, useCallback } from "react";
import { getYouTubeVideoMetadata, type YouTubeVideo } from "@/app/actions";
import { extractYouTubeVideoId } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle, KeyRound, Loader2, Search, Youtube, Bot } from "lucide-react";

import { MetadataDisplay } from "@/components/metadata-display";
import { LoadingSkeleton } from "@/components/loading-skeleton";
import { WelcomeMessage } from "@/components/welcome-message";
import { extractYouTubeMetadata } from "@/ai/flows/youtube-metadata-flow";
import type { YouTubeMetadataOutput } from "@/ai/schemas";
import { JsonDisplay } from "@/components/json-display";

export default function Home() {
  const [url, setUrl] = useState("");
  const [metadata, setMetadata] = useState<YouTubeVideo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [aiMetadata, setAiMetadata] = useState<YouTubeMetadataOutput | null>(null);
  const [isAiPending, startAiTransition] = useTransition();

  const resetState = () => {
    setError(null);
    setMetadata(null);
    setAiMetadata(null);
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

  const handleAiFetch = (videoUrl: string) => {
    startAiTransition(async () => {
      try {
        const result = await extractYouTubeMetadata({ youtubeUrl: videoUrl });
        setAiMetadata(result);
      } catch (e: any) {
        setError(e.message || "An unexpected AI error occurred.");
        toast({
          variant: "destructive",
          title: "AI Error",
          description: e.message || "Could not process the request with AI.",
        });
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
    handleAiFetch(url);

  }, [url, toast]);
  
  const isApiKeyMissing = error && error.includes("API key is missing");
  const isAnyPending = isPending || isAiPending;

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-background text-foreground">
      {/* <!-- Top AdSense Banner --> */}
      <div className="w-full bg-card py-4 shadow-sm">
        <header className="container mx-auto flex items-center gap-3">
          <Youtube className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold text-primary tracking-tight">
            MetaTube Inspector
          </h1>
        </header>
      </div>
      
      <main className="container mx-auto flex w-full max-w-4xl flex-1 flex-col items-center px-4 py-8">
        <Card className="w-full shadow-md">
          <CardHeader>
            <CardTitle className="text-xl">YouTube Video Inspector</CardTitle>
            <CardDescription>
              Enter a YouTube video URL to extract its title, description, tags, thumbnails and more.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row">
              <Input
                type="url"
                placeholder="e.g., https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={isAnyPending}
                required
                className="text-base"
              />
              <Button type="submit" disabled={isAnyPending || !url} className="sm:w-48">
                {isAnyPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Search className="mr-2 h-4 w-4" />
                )}
                {isAnyPending ? "Extracting..." : "Extract"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-8 w-full grid gap-8">
          {isAnyPending && <LoadingSkeleton />}
          {error && !isAnyPending && !isApiKeyMissing && (
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
                  <li>Create a file named <strong>.env.local</strong> in the root of your project. The filename must be exactly <strong>.env.local</strong>, not `.env.local.example` or any other variation.</li>
                  <li>Add the following line to it: <pre className="my-2 p-2 bg-muted rounded-md text-sm"><code>YOUTUBE_API_KEY=YOUR_API_KEY_HERE</code></pre></li>
                  <li>Replace <strong>YOUR_API_KEY_HERE</strong> with your actual YouTube Data API v3 key.</li>
                  <li>Restart the application for the changes to take effect.</li>
                </ol>
                <p className="mt-2">For security, remember to restrict your API key in the Google Cloud Console to your domain.</p>
              </AlertDescription>
            </Alert>
          )}
          {metadata && !isAnyPending && <MetadataDisplay data={metadata} />}
          {aiMetadata && !isAnyPending && <JsonDisplay data={aiMetadata} />}
          {!isAnyPending && !error && !metadata && <WelcomeMessage />}
        </div>
      </main>
      
      {/* <!-- Bottom AdSense Banner --> */}
      <footer className="w-full py-6 text-center text-muted-foreground text-sm">
        <p>Built by Shubham Gautam.</p>
      </footer>
    </div>
  );
}
