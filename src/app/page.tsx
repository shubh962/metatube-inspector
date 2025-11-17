// src/app/page.tsx
"use client";

import { useState, useTransition, useCallback } from "react";
import { getYouTubeVideoMetadata, type YouTubeVideo } from "@/app/actions";
import { extractYouTubeVideoId } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, KeyRound } from "lucide-react";
// import { MetadataDisplay } } from "@/components/metadata-display"; // REMOVED: No longer needed for single display
import { BatchResultsDisplay } from "@/components/batch-results-display"; // ADDED
import { LoadingSkeleton } from "@/components/loading-skeleton";
import { WelcomeMessage } from "@/components/welcome-message";
import { ThemeToggle } from "@/components/theme-toggle";
import { AdScript } from "@/components/ad-script";

export default function Home() {
  const [url, setUrl] = useState("");
  // CHANGED: Use an array to store results for batch processing
  const [results, setResults] = useState<YouTubeVideo[] | null>(null); 
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const resetState = () => {
    setError(null);
    setResults(null);
    setUrl("");
  }

  // MODIFIED: handleFetch is now an async function that returns its result
  const handleFetch = async (videoId: string): Promise<{ data?: YouTubeVideo; error?: string }> => {
    const result = await getYouTubeVideoMetadata(videoId);
    
    // Show toast for non-API-key errors during processing
    if (result.error && !result.error.includes("API key")) {
        toast({
            variant: "destructive",
            title: `Error processing video ID: ${videoId}`,
            description: result.error,
        });
    }
    return result;
  }

  // MODIFIED: handleSubmit now accepts a raw string (potentially multiline)
  const handleSubmit = useCallback((rawInput: string) => {
    resetState();
    
    // Split input by new lines, filter empty lines, and trim whitespace
    const inputUrls = rawInput.split('\n')
                              .map(line => line.trim())
                              .filter(line => line.length > 0);

    if (inputUrls.length === 0) {
        setError("Please enter at least one valid YouTube URL.");
        return;
    }
    
    // Set the first URL for display/context if needed
    setUrl(inputUrls[0]); 

    startTransition(async () => {
        const fetchPromises = inputUrls.map(url => {
            const videoId = extractYouTubeVideoId(url);
            if (!videoId) {
                // Return a simple object indicating an invalid URL for consistent handling
                return Promise.resolve({ error: `Invalid URL provided: ${url}` });
            }
            // Fetch metadata for valid video ID
            return handleFetch(videoId);
        });

        // Wait for all fetches to complete
        const allResults = await Promise.all(fetchPromises);
        
        // Filter out successful data
        const successfulResults = allResults
            .filter((res): res is { data: YouTubeVideo } => !!res.data)
            .map(res => res.data);

        // Filter out errors (only for console or detailed display if needed)
        const errorResults = allResults
            .filter(res => res.error);

        if (successfulResults.length > 0) {
            setResults(successfulResults);
        } else if (errorResults.length > 0) {
            // Show a general error if NO videos were processed successfully
            const firstError = errorResults.find(e => !e.error?.includes("Invalid URL"))?.error;
            setError(firstError || "Failed to process any URL. Check your input format.");
        }
    });

  }, [toast]);
  
  // CHANGED: Check 'results' array instead of 'metadata'
  const isApiKeyMissing = error && error.includes("API key is missing");
  const showWelcome = !results && !isPending && !error;

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-background p-4 sm:p-6 md:p-8">
      
      {/* HEADER: Clean Branding */}
      <header className="w-full max-w-6xl flex items-center justify-between pb-4">
        <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-foreground">MetaTube Inspector</span>
        </div>
        <ThemeToggle />
      </header>
      
      {/* AdScript */}
      <div className="w-full py-4 max-w-6xl">
        <AdScript /> 
      </div>

      <main className="w-full max-w-6xl flex-1 flex flex-col items-center">
        
        {/* SEO Improvement: Visually Hidden H1 for Google */}
        <h1 className="sr-only">MetaTube Inspector: Free YouTube Video Metadata, Tags & SEO Checker (Batch Ready)</h1>

        {/* WelcomeMessage is updated to handle multiline input */}
        {showWelcome && <WelcomeMessage onUrlSubmit={handleSubmit} isBatchMode={true} />}
        
        {isPending && <LoadingSkeleton />}
        
        {error && !isPending && !isApiKeyMissing && (
          <Alert variant="destructive" className="animate-fade-in w-full max-w-4xl">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>An Error Occurred</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {/* API Key Missing Error */}
        {isApiKeyMissing && (
          <Alert variant="destructive" className="animate-fade-in w-full max-w-4xl">
            <KeyRound className="h-4 w-4" />
            <AlertTitle>Service Temporarily Unavailable</AlertTitle>
            <AlertDescription>
              <p>We're experiencing a configuration issue. Please try analyzing your video again later.</p>
            </AlertDescription>
          </Alert>
        )}
        
        {/* Renders the batch results */}
        {results && !isPending && <BatchResultsDisplay data={results} onNewUrl={() => { setResults(null); setUrl(""); }} />}
      </main>
      
      <footer className="w-full max-w-6xl mt-8 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} MetaTube Inspector. All rights reserved.
      </footer>
    </div>
  );
}
