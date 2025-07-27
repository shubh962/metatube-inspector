
"use client";

import { useState, useTransition, useCallback } from "react";
import { getYouTubeVideoMetadata, type YouTubeVideo } from "@/app/actions";
import { extractYouTubeVideoId } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle, KeyRound, Loader2, Search, Youtube, UploadCloud, History, Settings } from "lucide-react";
import Link from 'next/link';

import { MetadataDisplay } from "@/components/metadata-display";
import { LoadingSkeleton } from "@/components/loading-skeleton";
import { WelcomeMessage } from "@/components/welcome-message";
import { SidebarProvider, Sidebar, SidebarTrigger, SidebarInset, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";

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
    <SidebarProvider>
    <div className="flex min-h-screen w-full flex-col bg-background text-foreground">
      <Sidebar side="left" collapsible="icon" className="border-r">
        <SidebarHeader>
          <div className="flex h-10 items-center gap-2 p-2 justify-center group-data-[collapsible=icon]:hidden">
             <Youtube className="h-6 w-6 text-primary" />
             <span className="font-bold text-lg">MetaTube</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive tooltip="Home">
                <Link href="#"><UploadCloud /></Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="History">
                <Link href="#"><History /></Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Settings">
                <Link href="#"><Settings /></Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      
      <div className="flex flex-col flex-1 md:pl-[3rem]">
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 lg:h-[60px] lg:px-6">
            <SidebarTrigger className="md:hidden"/>
            <h1 className="text-lg font-semibold md:text-xl">
              YouTube Metadata Extractor
            </h1>
            <div className="ml-auto">
              <ThemeToggle />
            </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">Extract Metadata</h1>
          </div>
          <div
            className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
            x-chunk="dashboard-02-chunk-1"
          >
            <div className="flex flex-col items-center gap-1 text-center w-full max-w-2xl p-8">
              {!metadata && !isPending && !error &&
                <WelcomeMessage onUrlSubmit={(url) => {
                  setUrl(url);
                  const videoId = extractYouTubeVideoId(url);
                  if (videoId) {
                    resetState();
                    handleFetch(videoId);
                  } else {
                     setError("Invalid YouTube URL. Please check the link and try again.");
                  }
                }} />
              }

              {isPending && <LoadingSkeleton />}
              {error && !isPending && !isApiKeyMissing && (
                 <Alert variant="destructive" className="animate-fade-in w-full">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>An Error Occurred</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {isApiKeyMissing && (
                <Alert variant="destructive" className="animate-fade-in w-full">
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

            </div>
          </div>
        </main>
      </div>
      
    </div>
    </SidebarProvider>
  );
}

