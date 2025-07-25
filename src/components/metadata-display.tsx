"use client";

import type { YouTubeVideo } from "@/app/actions";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Calendar, FileText, Tags, User, Image as ImageIcon, Clipboard } from "lucide-react";

interface MetadataDisplayProps {
  data: YouTubeVideo;
}

export function MetadataDisplay({ data }: MetadataDisplayProps) {
  const { snippet } = data;
  const { toast } = useToast();

  const publishedDate = new Date(snippet.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleCopy = () => {
    const textToCopy = `
Title: ${snippet.title}
Channel: ${snippet.channelTitle}
Published: ${publishedDate}

Description:
${snippet.description}

Tags:
${(snippet.tags || []).join(', ')}
    `.trim();

    navigator.clipboard.writeText(textToCopy);
    toast({
      title: "Copied to Clipboard",
      description: "Video metadata has been copied successfully.",
    });
  };

  return (
    <Card className="w-full animate-fade-in shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-start gap-4">
            <div className="flex-1">
                <CardTitle className="text-2xl font-bold tracking-tight">{snippet.title}</CardTitle>
                <CardDescription>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{snippet.channelTitle}</span>
                    </div>
                    <Separator orientation="vertical" className="h-4 hidden sm:block" />
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>Published on {publishedDate}</span>
                    </div>
                  </div>
                </CardDescription>
            </div>
            <Button variant="outline" size="icon" onClick={handleCopy} aria-label="Copy metadata">
                <Clipboard className="h-5 w-5" />
            </Button>
        </div>
      </CardHeader>
      <CardContent className="grid gap-8">
        <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2"><ImageIcon className="h-5 w-5" /> Thumbnails</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {snippet.thumbnails.maxres && <ThumbnailImage title="Max-Res" src={snippet.thumbnails.maxres.url} />}
                {snippet.thumbnails.standard && <ThumbnailImage title="Standard" src={snippet.thumbnails.standard.url} />}
                <ThumbnailImage title="High" src={snippet.thumbnails.high.url} />
                <ThumbnailImage title="Medium" src={snippet.thumbnails.medium.url} />
                <ThumbnailImage title="Default" src={snippet.thumbnails.default.url} />
            </div>
        </div>
        
        {snippet.description && (
          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <FileText className="h-5 w-5" /> Description
            </h3>
            <div className="max-h-60 overflow-y-auto whitespace-pre-wrap rounded-md bg-muted/50 p-4 text-sm leading-relaxed text-card-foreground/80">
              {snippet.description}
            </div>
          </div>
        )}
        
        {snippet.tags && snippet.tags.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <Tags className="h-5 w-5" /> Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {snippet.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="font-normal">{tag}</Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function ThumbnailImage({ src, title }: { src: string; title: string }) {
    return (
        <div className="group relative overflow-hidden rounded-lg">
            <Image
                src={src}
                alt={`${title} thumbnail`}
                width={480}
                height={360}
                className="w-full h-auto object-cover border-2 border-transparent group-hover:border-primary group-hover:scale-105 transition-all duration-300"
                unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-2 text-white text-xs text-center font-semibold">
                {title}
            </div>
        </div>
    )
}
