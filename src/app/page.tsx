// src/app/page.tsx
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
// import { Metadata } from 'next'; // <-- REMOVED: Metadata import is no longer needed here

// =================================================================
// NOTE: The 'export const metadata' block has been removed
// and placed into src/app/page.ts to fix the Vercel build error.
// =================================================================

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
      
      {/* HEADER: Clean Branding */}
      <header className="w-full max-w-6xl flex items-center justify-between pb-4">
        <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-foreground">MetaTube Inspector</span>
        </div>
        <ThemeToggle />
      </header>
      
      {/* 💡 AdSense Improvement: Place AdScript here. It's visible but doesn't block the main tool interaction */}
      <div className="w-full py-4 max-w-6xl">
        <AdScript /> 
      </div>

      <main className="w-full max-w-6xl flex-1 flex flex-col items-center">
        
        {/* 🚀 SEO Improvement: Visually Hidden H1 for Google */}
        <h1 className="sr-only">MetaTube Inspector: Free YouTube Video Metadata, Tags & SEO Checker</h1>

        {showWelcome && <WelcomeMessage onUrlSubmit={handleSubmit} />}
        
        {isPending && <LoadingSkeleton />}
        
        {error && !isPending && !isApiKeyMissing && (
          <Alert variant="destructive" className="animate-fade-in w-full max-w-4xl">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>An Error Occurred</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {/* 💡 UX/AdSense Improvement: General error message for missing API key in production */}
        {isApiKeyMissing && (
          <Alert variant="destructive" className="animate-fade-in w-full max-w-4xl">
            <KeyRound className="h-4 w-4" />
            <AlertTitle>Service Temporarily Unavailable</AlertTitle>
            <AlertDescription>
              <p>We're experiencing a configuration issue. Please try analyzing your video again later.</p>
            </AlertDescription>
          </Alert>
        )}
        
        {metadata && !isPending && <MetadataDisplay data={metadata} onNewUrl={() => { setMetadata(null); setUrl(""); }} />}
      </main>
      
      {/* <footer> is good practice for AdSense friendliness and basic site structure */}
      <footer className="w-full max-w-6xl mt-8 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} MetaTube Inspector. All rights reserved.
      </footer>
    </div>
  );
}
