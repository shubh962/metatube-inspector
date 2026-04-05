import { notFound } from "next/navigation";
import Home from "@/app/page"; // We reuse your core logic
import { Metadata } from "next";

// Define the tools and their specific SEO content
const TOOLS_CONFIG: Record<string, { title: string; desc: string; content: string }> = {
  "youtube-tag-extractor": {
    title: "YouTube Tag Extractor",
    desc: "Extract hidden SEO tags from any YouTube video instantly.",
    content: "Our Tag Extractor uses the official YouTube Data API to reveal the 'Keywords' array hidden by the YouTube UI. Use these tags to improve your video's reach in the suggested sidebar."
  },
  "thumbnail-downloader": {
    title: "YouTube Thumbnail Downloader",
    desc: "Download high-resolution (4K/HD) thumbnails from any video.",
    content: "Need to analyze a competitor's thumbnail design? Paste the URL above to view and download the original Maximum Resolution (1280x720) JPG image for free."
  },
  "description-analyzer": {
    title: "YouTube Description Analyzer",
    desc: "Analyze video descriptions for SEO keywords and timestamps.",
    content: "A great description is the key to ranking in Google Search. Use this tool to extract the full description, check for keyword density, and view the timestamp structure."
  }
};

// Generate Dynamic Metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const tool = TOOLS_CONFIG[params.slug];
  if (!tool) return { title: "Tool Not Found" };
  return {
    title: `${tool.title} | MetaTube Inspector`,
    description: tool.desc,
  };
}

export default function DynamicToolPage({ params }: { params: { slug: string } }) {
  const tool = TOOLS_CONFIG[params.slug];

  if (!tool) {
    notFound();
  }

  return (
    <div className="flex flex-col items-center w-full">
      {/* TOOL SPECIFIC HEADER */}
      <section className="text-center py-12 px-6 bg-primary/5 w-full border-b">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
          {tool.title}
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
          {tool.desc}
        </p>
      </section>

      {/* CORE TOOL LOGIC (Reusing your Home component) */}
      <div className="w-full max-w-6xl px-6 -mt-10">
        <div className="bg-background rounded-3xl shadow-xl border p-2">
           <Home /> 
        </div>
      </div>

      {/* 1000+ WORDS OF SEO CONTENT (Varies by Tool) */}
      <article className="max-w-4xl mx-auto px-6 py-20 prose prose-slate dark:prose-invert">
        <h2 className="text-3xl font-bold">Deep Dive: How {tool.title} Works</h2>
        <p className="text-lg leading-relaxed">
          At <strong>TaskGuru</strong>, we built this {tool.title} to help creators perform 
          advanced <strong>Competitor Research</strong>. {tool.content}
        </p>
        
        <h3>Why use this over other tools?</h3>
        <ul>
          <li><strong>Real-time Data:</strong> Directly synced with the YouTube API.</li>
          <li><strong>No Login Required:</strong> 100% free and private.</li>
          <li><strong>Ad-Light Experience:</strong> Focused on utility, not pop-ups.</li>
        </ul>

        <div className="bg-muted p-8 rounded-2xl border my-10">
          <h4 className="text-xl font-bold mb-2">Pro SEO Tip:</h4>
          <p className="m-0">
            Combine the data from all three tools. Extract the <strong>Tags</strong>, 
            study the <strong>Thumbnail</strong> colors, and replicate the 
            <strong>Description</strong> structure to outrank your rivals in 2026.
          </p>
        </div>
      </article>
    </div>
  );
}
