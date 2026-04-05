"use client";

import { useState, useTransition, useCallback } from "react";
import { getYouTubeVideoMetadata, type YouTubeVideo } from "@/app/actions"; 
import { extractYouTubeVideoId } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

// UI Components
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  AlertTriangle, Zap, Search, Info, ShieldCheck, 
  BarChart3, PlayCircle, ArrowRight 
} from "lucide-react";
import { MetadataDisplay } from "@/components/metadata-display";
import { LoadingSkeleton } from "@/components/loading-skeleton";
import { WelcomeMessage } from "@/components/welcome-message";

type ResultState = "input" | "loading" | "error" | "single_result";

export default function Home() {
  const [url, setUrl] = useState("");
  const [metadata, setMetadata] = useState<YouTubeVideo[]>([]); 
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const resetState = () => {
    setError(null);
    setMetadata([]);
    setUrl("");
  };

  const handleFetch = (videoId: string) => {
    startTransition(async () => {
      const result = await getYouTubeVideoMetadata(videoId); 
      if (result.error) {
        setError(result.error);
        toast({ variant: "destructive", title: "Error", description: result.error });
      } else if (result.data) {
        setMetadata(Array.isArray(result.data) ? result.data : [result.data]);
      }
    });
  };

  const handleSubmit = useCallback((passedUrl: string) => {
    setError(null);
    const videoId = extractYouTubeVideoId(passedUrl);
    if (!videoId) {
      setError("Invalid YouTube URL.");
      return;
    }
    setUrl(passedUrl);
    handleFetch(videoId);
  }, [toast]);
  
  const resultState: ResultState = isPending 
    ? "loading" 
    : metadata.length === 1 
      ? "single_result" 
      : error ? "error" : "input";

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-background text-foreground">
      {/* IMPORTANT: Header aur Footer ab layout.tsx se handle ho rahe hain.
          Is file mein sirf Main Content rahega.
      */}
      
      <main className="w-full max-w-6xl flex-1 flex flex-col items-center px-6 py-12">
        
        {/* HERO SECTION */}
        <section className="text-center mb-16 space-y-4 pt-8">
          <h1 className="text-5xl font-extrabold tracking-tighter sm:text-7xl">
            Unlock the DNA of <span className="text-primary">YouTube SEO</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
            Extract high-fidelity metadata, hidden tags, and AI-optimized descriptions in seconds.
          </p>
        </section>

        {/* TOOL INTERFACE */}
        <div className="w-full max-w-4xl mb-24">
          {resultState === "input" && <WelcomeMessage onUrlSubmit={handleSubmit} />}
          {resultState === "loading" && <LoadingSkeleton />}
          {resultState === "error" && (
             <Alert variant="destructive">
               <AlertTriangle className="h-4 w-4" />
               <AlertTitle>Error</AlertTitle>
               <AlertDescription>{error}</AlertDescription>
             </Alert>
          )}
          {resultState === "single_result" && <MetadataDisplay data={metadata[0]} onNewUrl={resetState} />}
        </div>

        {/* SEO CONTENT SECTION (AdSense Booster) */}
        <article className="prose prose-slate dark:prose-invert max-w-none w-full border-t pt-16 space-y-16">
          
          <section className="space-y-6">
            <h2 className="text-4xl font-bold text-foreground">Why Metadata is the Secret Sauce of YouTube Growth in 2026</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              In the modern YouTube ecosystem, the algorithm relies on <strong>Metadata Integrity</strong>. Titles, descriptions, and tags create a semantic map that tells YouTube who your audience is. At <strong>TaskGuru</strong>, we built MetaTube Inspector to give you a professional edge.
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 py-8">
            <div className="bg-muted/50 p-10 rounded-3xl border border-primary/10">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2"><BarChart3 className="text-primary" /> Hidden Tag Analysis</h3>
              <p className="text-muted-foreground leading-relaxed">
                Tags are the contextual bridges to the "Suggested Video" sidebar. Aligning your tags with viral leaders in your niche increases your discovery chances mathematically.
              </p>
            </div>
            <div className="bg-muted/50 p-10 rounded-3xl border border-primary/10">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2"><PlayCircle className="text-primary" /> CTR Optimization</h3>
              <p className="text-muted-foreground leading-relaxed">
                Your thumbnail is your first impression. Inspect original high-res thumbnails to study color psychology and neuro-visual triggers that drive high click-through rates.
              </p>
            </div>
          </div>

          <section className="space-y-8">
            <h2 className="text-3xl font-bold text-foreground">Step-by-Step Video SEO Guide</h2>
            <div className="grid gap-6">
              {[
                { t: "Primary Keyword Placement", d: "Keep your target keyword within the first 60 characters of your title for maximum mobile impact." },
                { t: "Description Front-Loading", d: "The first 25 words of your description are the most heavily weighted by the search engine." },
                { t: "Semantic Diversity", d: "Use synonyms and related long-tail keywords to help the AI categorize your video accurately." }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 p-6 bg-card border rounded-2xl border-primary/5 hover:border-primary/20 transition-all">
                  <div className="h-8 w-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">{idx+1}</div>
                  <div>
                    <h4 className="font-bold text-xl">{item.t}</h4>
                    <p className="text-muted-foreground">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="text-center py-12">
            <h2 className="text-3xl font-bold mb-10">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto space-y-6 text-left">
              <div className="border-b pb-6">
                <h4 className="font-bold text-xl mb-2">Is it safe to copy tags?</h4>
                <p className="text-muted-foreground">Yes, researching competitor tags is standard practice. Ensure they remain relevant to your content to avoid metadata penalties.</p>
              </div>
              <div className="border-b pb-6">
                <h4 className="font-bold text-xl mb-2">How does the tool fetch data?</h4>
                <p className="text-muted-foreground">We use the official YouTube Data API v3 to ensure 100% accurate and real-time metadata extraction.</p>
              </div>
            </div>
          </section>

        </article>
      </main>
    </div>
  );
}
