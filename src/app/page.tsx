
"use client";

import { useState, useTransition, useCallback } from "react";
import { getYouTubeVideoMetadata, type YouTubeVideo } from "@/app/actions";
import { extractYouTubeVideoId } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, KeyRound, Youtube, History, Settings, Home as HomeIcon } from "lucide-react";
import Link from 'next/link';

import { MetadataDisplay } from "@/components/metadata-display";
import { LoadingSkeleton } from "@/components/loading-skeleton";
import { WelcomeMessage } from "@/components/welcome-message";
import { SidebarProvider, Sidebar, SidebarTrigger, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarHeader } from "@/components/ui/sidebar";
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
    <SidebarProvider>
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar side="left" collapsible="icon" className="border-r bg-sidebar text-sidebar-foreground">
        <SidebarHeader className="p-2 justify-center items-center">
            <Link href="/" className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
             <Youtube className="h-7 w-7 text-primary" />
             <span className="font-bold text-xl group-data-[collapsible=icon]:hidden">MetaTube</span>
            </Link>
        </SidebarHeader>
        <SidebarContent className="p-2">
          <SidebarMenu>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <SidebarTrigger className="md:hidden"/>
            <div className="w-full flex items-center gap-4">
              <h1 className="text-lg font-semibold md:text-xl">
                YouTube Metadata Inspector
              </h1>
              <div className="ml-auto flex items-center gap-2">
                <ThemeToggle />
              </div>
            </div>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="mx-auto grid w-full max-w-6xl gap-2">
                {showWelcome &&
                    <WelcomeMessage onUrlSubmit={handleSubmit} />
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
                        <ol className="list-decimal pl-5 mt-2 space-y-1 text-left">
                        <li>Create a file named <strong>.env.local</strong> in the root of your project.</li>
                        <li>Add the following line to it: <pre className="my-2 p-2 bg-muted rounded-md text-sm"><code>YOUTUBE_API_KEY=YOUR_API_KEY_HERE</code></pre></li>
                        <li>Replace <strong>YOUR_API_KEY_HERE</strong> with your actual YouTube Data API v3 key.</li>
                        <li>Restart the application for the changes to take effect.</li>
                        </ol>
                        <p className="mt-2">For security, remember to restrict your API key in the Google Cloud Console to your domain.</p>
                    </AlertDescription>
                    </Alert>
                )}
                {metadata && !isPending && <MetadataDisplay data={metadata} onNewUrl={() => { setMetadata(null); setUrl(""); }} />}
            </div>
        </main>
      </div>
    </div>
    </SidebarProvider>
  );
}
