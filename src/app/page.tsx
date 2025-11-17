// src/app/page.tsx
"use client";

import { useState, useTransition, useCallback } from "react";
// Assuming 'getYouTubeVideoMetadata' is the correct action function name
import { getYouTubeVideoMetadata, type YouTubeVideo } from "@/app/actions"; 
import { extractYouTubeVideoId } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

// Import necessary UI components
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, KeyRound, Zap, Loader2, FileSearch } from "lucide-react";
import { MetadataDisplay } from "@/components/metadata-display";
import { LoadingSkeleton } from "@/components/loading-skeleton";
import { WelcomeMessage } from "@/components/welcome-message";
import { ThemeToggle } from "@/components/theme-toggle";
import { AdScript } from "@/components/ad-script";
import { BatchResultsDisplay } from "@/components/batch-results-display"; // Kept for future batch logic

// Define the state for the main component for clarity
type ResultState = "input" | "loading" | "error" | "single_result" | "batch_results";

export default function Home() {
  const [url, setUrl] = useState("");
  // Changed metadata state to hold an array to safely handle results from actions
  const [metadata, setMetadata] = useState<YouTubeVideo[]>([]); 
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const resetState = () => {
    setError(null);
    setMetadata([]);
    setUrl("");
  }

  // Handles the API call transition
  const handleFetch = (videoId: string) => {
    startTransition(async () => {
      // NOTE: metadataAction function assumed to handle single video ID based on usage
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
        // Since we are fetching a single video, we expect result.data to be a single item or array of one item
        // Ensure data is treated as an array for the results state consistency
        setMetadata(Array.isArray(result.data) ? result.data : [result.data]);
      }
    });
  }

  // Handles form submission
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
  const showWelcome = metadata.length === 0 && !isPending && !error;

  // Determine current result state for rendering
  const resultState: ResultState = isPending 
    ? "loading" 
    : metadata.length === 1 
      ? "single_result" 
      : metadata.length > 1 
        ? "batch_results" 
        : error
          ? "error" 
          : "input";


  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-background p-4 sm:p-6 md:p-8">
      
      {/* HEADER: Clean Branding */}
      <header className="w-full max-w-6xl flex items-center justify-between pb-4">
        <div className="flex items-center space-x-2">
            {/* Enhanced Logo/Title for visual appeal */}
            <Zap className="h-6 w-6 text-primary" />
            <span className="text-2xl font-extrabold text-foreground tracking-tight">MetaTube Inspector</span>
        </div>
        <ThemeToggle />
      </header>
      
      {/* 💡 AdSense/Content Improvement */}
      <div className="w-full py-4 max-w-6xl">
        <AdScript /> 
      </div>

      <main className="w-full max-w-6xl flex-1 flex flex-col items-center pt-8">
        
        {/* 🚀 SEO Improvement: Visually Hidden H1 for Google */}
        <h1 className="sr-only">MetaTube Inspector: Free YouTube Video Metadata, Tags & SEO Checker</h1>

        {resultState === "input" && <WelcomeMessage onUrlSubmit={handleSubmit} />}
        
        {resultState === "loading" && <LoadingSkeleton />}
        
        {/* Error Display */}
        {resultState === "error" && !isApiKeyMissing && (
          <Alert variant="destructive" className="animate-fade-in w-full max-w-4xl border-l-4 border-red-600">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>An Error Occurred During Extraction</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {/* API Key Missing Error */}
        {resultState === "error" && isApiKeyMissing && (
          <Alert variant="destructive" className="animate-fade-in w-full max-w-4xl border-l-4 border-red-600">
            <KeyRound className="h-4 w-4" />
            <AlertTitle>Service Temporarily Unavailable</AlertTitle>
            <AlertDescription>
              <p>We're experiencing a configuration issue or service overload. Please try analyzing your video again later.</p>
            </AlertDescription>
          </Alert>
        )}
        
        {/* Single Result Display (Your working mode) */}
        {resultState === "single_result" && metadata.length === 1 && (
            <MetadataDisplay data={metadata[0]} onNewUrl={resetState} />
        )}

        {/* Batch Result Display (Kept for future scalability) */}
        {resultState === "batch_results" && metadata.length > 1 && (
            <BatchResultsDisplay data={metadata} onNewUrl={resetState} />
        )}

      </main>
      
      {/* Footer is good practice for AdSense friendliness and basic site structure */}
      <footer className="w-full max-w-6xl mt-12 text-center text-sm text-muted-foreground border-t pt-4">
        &copy; {new Date().getFullYear()} MetaTube Inspector. All rights reserved. 
        <span className="ml-2 hidden sm:inline">| Analyze YouTube SEO, Tags, and Thumbnails for free.</span>
      </footer>
    </div>
  );
}
