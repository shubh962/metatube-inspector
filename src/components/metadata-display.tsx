"use client";

import type { YouTubeVideo } from "@/app/actions";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator"; 
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import { 
  Calendar, FileText, Tags, User, Image as ImageIcon, 
  RefreshCcw, Eye, ThumbsUp, Info, 
  FileSignature, Link, Download, Copy, Check, Clipboard
} from "lucide-react"; 

// Helper Component for Copying Specific Sections
const CopyButton = ({ textToCopy, label, icon: Icon, successMessage }: { textToCopy: string, label: string, icon: React.ElementType, successMessage: string }) => {
    const { toast } = useToast();
    const [copied, setCopied] = React.useState(false);

    const handleCopy = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent accordion from toggling
        navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        toast({ title: "Copied!", description: successMessage });
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Button variant="outline" size="sm" onClick={handleCopy} className="h-8 px-2 text-xs font-bold gap-1 ml-auto transition-all">
            {copied ? <Check className="h-3 w-3 text-green-500" /> : <Icon className="h-3 w-3" />}
            {copied ? "Copied" : label}
        </Button>
    );
};

interface MetadataDisplayProps {
  data: YouTubeVideo;
  onNewUrl: () => void;
}

export function MetadataDisplay({ data, onNewUrl }: MetadataDisplayProps) {
  const { snippet, viewCount, likeCount, videoId } = data; 
  const { toast } = useToast();
  
  const publishedDate = new Date(snippet.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  const handleFullCopy = () => {
    const text = `Title: ${snippet.title}\nChannel: ${snippet.channelTitle}\nViews: ${viewCount}\nLink: https://youtu.be/${videoId}\n\nTags: ${(snippet.tags || []).join(', ')}`;
    navigator.clipboard.writeText(text);
    toast({ title: "Full Report Copied", description: "Metadata summary is ready to paste." });
  };

  return (
    <Card className="w-full max-w-5xl border-2 shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-hidden">
      
      {/* HEADER SECTION */}
      <CardHeader className="bg-muted/30 p-6">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div className="space-y-2">
            <Badge className="bg-red-600 hover:bg-red-700 text-white font-bold px-3">LIVE API DATA</Badge>
            <h2 className="text-2xl md:text-4xl font-black tracking-tighter leading-none italic uppercase">
              {snippet.title}
            </h2>
            <div className="flex items-center gap-2 text-primary font-bold text-sm">
               <Link size={14} />
               <a href={`https://youtu.be/${videoId}`} target="_blank" className="hover:underline">youtube.com/watch?v={videoId}</a>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button onClick={handleFullCopy} className="font-bold gap-2 bg-green-600 hover:bg-green-700">
              <Clipboard size={18} /> Copy Report
            </Button>
            <Button onClick={onNewUrl} variant="outline" className="font-bold gap-2">
              <RefreshCcw size={18} /> New Search
            </Button>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="flex flex-wrap gap-3">
          <StatBadge icon={User} label={snippet.channelTitle} color="bg-blue-500/10 text-blue-700 border-blue-200" />
          <StatBadge icon={Calendar} label={publishedDate} />
          {viewCount && <StatBadge icon={Eye} label={`${Number(viewCount).toLocaleString()} Views`} color="bg-emerald-500/10 text-emerald-700 border-emerald-200" />}
          {likeCount && <StatBadge icon={ThumbsUp} label={`${Number(likeCount).toLocaleString()} Likes`} color="bg-orange-500/10 text-orange-700 border-orange-200" />}
        </div>
      </CardHeader>

      {/* CONTENT SECTION */}
      <CardContent className="p-6">
        <Accordion type="multiple" defaultValue={["item-1", "item-2", "item-3"]} className="space-y-4">
          
          {/* 1. THUMBNAILS */}
          <AccordionItem value="item-1" className="border rounded-2xl px-4 bg-card">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-3">
                <ImageIcon className="text-primary" />
                <span className="text-xl font-bold">Original Thumbnails</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-muted-foreground mb-4 italic">
                Analyze the thumbnail saturation and text contrast used by this creator. High-res images are pulled directly from Google servers.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {Object.entries(snippet.thumbnails).map(([key, val]) => (
                  <ThumbnailItem key={key} title={key} url={val.url} />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* 2. DESCRIPTION */}
          <AccordionItem value="item-2" className="border rounded-2xl px-4 bg-card">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-3 w-full">
                <FileText className="text-primary" />
                <span className="text-xl font-bold">Video Description</span>
                <CopyButton textToCopy={snippet.description} label="Copy Desc" icon={Copy} successMessage="Description copied!" />
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="bg-muted p-4 rounded-xl text-sm font-mono whitespace-pre-wrap max-h-60 overflow-y-auto border shadow-inner">
                {snippet.description || "No description provided."}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* 3. TAGS */}
          <AccordionItem value="item-3" className="border rounded-2xl px-4 bg-card">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-3 w-full">
                <Tags className="text-primary" />
                <span className="text-xl font-bold">Hidden SEO Tags</span>
                {snippet.tags && <CopyButton textToCopy={snippet.tags.join(", ")} label="Copy Tags" icon={Tags} successMessage="Tags copied!" />}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-wrap gap-2">
                {snippet.tags ? snippet.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="font-bold py-1 px-3 border border-primary/10">
                    {tag}
                  </Badge>
                )) : <p className="text-muted-foreground italic">This video has no hidden tags.</p>}
              </div>
            </AccordionContent>
          </AccordionItem>

        </Accordion>
      </CardContent>
    </Card>
  );
}

// Sub-components
function StatBadge({ icon: Icon, label, color = "bg-muted text-foreground border-border" }: any) {
  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-bold shadow-sm ${color}`}>
      <Icon size={14} />
      {label}
    </div>
  );
}

function ThumbnailItem({ title, url }: { title: string; url: string }) {
  return (
    <div className="group relative rounded-xl overflow-hidden border shadow-sm transition-all hover:shadow-md">
      <Image src={url} alt={title} width={320} height={180} className="w-full object-cover aspect-video" unoptimized />
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
        <a href={url} target="_blank" className="p-2 bg-white rounded-full text-black hover:scale-110 transition-transform">
          <Eye size={16} />
        </a>
        <a href={url} download className="p-2 bg-primary rounded-full text-white hover:scale-110 transition-transform">
          <Download size={16} />
        </a>
      </div>
      <div className="bg-black/80 text-[10px] text-white text-center py-1 uppercase font-black tracking-widest">{title}</div>
    </div>
  );
}
