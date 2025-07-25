"use client";

import { useState, useTransition } from "react";
import { getYouTubeVideoMetadata, type YouTubeVideo } from "@/app/actions";
import { extractYouTubeVideoId } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle, Loader2, Search, Youtube } from "lucide-react";

import { MetadataDisplay } from "@/components/metadata-display";
import { LoadingSkeleton } from "@/components/loading-skeleton";
import { WelcomeMessage } from "@/components/welcome-message";


export default function Home() {
  const [url, setUrl] = useState("");
  const [metadata, setMetadata] = useState<YouTubeVideo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setMetadata(null);

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

    startTransition(async () => {
      const result = await getYouTubeVideoMetadata(videoId);
      if (result.error) {
        setError(result.error);
        toast({
          variant: "destructive",
          title: "Error fetching data",
          description: result.error,
        });
      } else if (result.data) {
        setMetadata(result.data);
      }
    });
  };

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
                disabled={isPending}
                required
                className="text-base"
              />
              <Button type="submit" disabled={isPending} className="sm:w-48">
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

        <div className="mt-8 w-full">
          {isPending && <LoadingSkeleton />}
          {error && !isPending && (
             <Alert variant="destructive" className="animate-fade-in">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>An Error Occurred</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {metadata && !isPending && <MetadataDisplay data={metadata} />}
          {!isPending && !error && !metadata && <WelcomeMessage />}
        </div>
      </main>
      
      {/* <!-- Bottom AdSense Banner --> */}
      <footer className="w-full py-6 text-center text-muted-foreground text-sm">
        <p>Built with Next.js and Firebase Studio.</p>
        <p>
            For API key security, restrict it in Google Cloud Console to your domain.
        </p>
      </footer>
    </div>
  );
}
