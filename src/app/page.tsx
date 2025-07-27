"use client";

import { useState, useTransition, useCallback } from "react";
import { getYouTubeVideoMetadata, type YouTubeVideo } from "@/app/actions";
import { extractYouTubeVideoId } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, KeyRound } from "lucide-react";
import { MetadataDisplay } from "@/components/metadata-display";
import { LoadingSkeleton } from "@/components/loading-skeleton";
import { WelcomeMessage } from "@/components/welcome-message";
import { ThemeToggle } from "@/components/theme-toggle";
import { AdScript } from "@/components/ad-script";

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

  const handleSubmit = useCallback((passedUrl: string) => {
    resetState();
    const videoId = extractYouTubeVideoId(passedUrl);

    if (!videoId) {
      setError("Invalid YouTube URL. Please check the link and try again.");
      toast({
        variant: "destructive",
        title: "Invalid URL",
        description: "Could not extract a video ID from the provided URL.",
      });
      return;
    }
    
    setUrl(passedUrl);
    handleFetch(videoId);

  }, [toast]);
  
  const isApiKeyMissing = error && error.includes("API key is missing");
  const showWelcome = !metadata && !isPending && !error;

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-background p-4 sm:p-6 md:p-8">
      <header className="w-full max-w-6xl flex items-center justify-between pb-4">
        <h1 className="text-2xl font-bold text-foreground">
          MetaTube Inspector
        </h1>
        <ThemeToggle />
      </header>

      <div className="w-full py-4">
        <AdScript />
      </div>

      <main className="w-full max-w-6xl flex-1 flex flex-col items-center">
        {showWelcome && <WelcomeMessage onUrlSubmit={handleSubmit} />}
        {isPending && <LoadingSkeleton />}
        {error && !isPending && !isApiKeyMissing && (
          <Alert variant="destructive" className="animate-fade-in w-full max-w-4xl">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>An Error Occurred</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {isApiKeyMissing && (
          <Alert variant="destructive" className="animate-fade-in w-full max-w-4xl">
            <KeyRound className="h-4 w-4" />
            <AlertTitle>Configuration Needed: YouTube API Key</AlertTitle>
            <AlertDescription>
              <p>The YouTube API key is missing. To use this application, you need to provide your own API key.</p>
              <ol className="list-decimal pl-5 mt-2 space-y-1">
                <li>Create a file named <strong>.env.local</strong> in the root of your project.</li>
                <li>Add the following line to it: <pre className="my-2 p-2 bg-muted rounded-md text-sm"><code>YOUTUBE_API_KEY=YOUR_API_KEY_HERE</code></pre></li>
                <li>Replace <strong>YOUR_API_KEY_HERE</strong> with your actual YouTube Data API v3 key.</li>
                <li>Restart the application for the changes to take effect.</li>
              </ol>
            </AlertDescription>
          </Alert>
        )}
        {metadata && !isPending && <MetadataDisplay data={metadata} onNewUrl={() => { setMetadata(null); setUrl(""); }} />}
      </main>
    </div>
  );
}
