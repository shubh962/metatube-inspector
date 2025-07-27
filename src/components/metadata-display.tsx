"use client";

import type { YouTubeVideo } from "@/app/actions";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Calendar, FileText, Tags, User, Image as ImageIcon, Clipboard, Check, ChevronDown, RefreshCcw } from "lucide-react";
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface MetadataDisplayProps {
  data: YouTubeVideo;
  onNewUrl: () => void;
}

export function MetadataDisplay({ data, onNewUrl }: MetadataDisplayProps) {
  const { snippet } = data;
  const { toast } = useToast();
  const [copied, setCopied] = React.useState(false);

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
    setCopied(true);
    toast({
      title: "Copied to Clipboard",
      description: "Video metadata has been copied successfully.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="w-full animate-fade-in shadow-sm border text-left bg-card">
      <CardHeader className="flex flex-row items-start justify-between gap-4">
          <div className="flex-1">
              <h2 className="text-2xl font-bold tracking-tight">{snippet.title}</h2>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2 text-base text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{snippet.channelTitle}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{publishedDate}</span>
                </div>
              </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={handleCopy} aria-label="Copy metadata">
                {copied ? <Check className="h-5 w-5 text-green-500" /> : <Clipboard className="h-5 w-5" />}
            </Button>
            <Button variant="outline" size="icon" onClick={onNewUrl} aria-label="New URL">
                <RefreshCcw className="h-5 w-5" />
            </Button>
          </div>
      </CardHeader>

      <CardContent>
        <Accordion type="multiple" defaultValue={["item-1", "item-2", "item-3"]} className="w-full">
            <AccordionItem value="item-1">
            <AccordionTrigger>
                <h3 className="text-lg font-semibold flex items-center gap-2"><ImageIcon className="h-5 w-5" /> Thumbnails</h3>
            </AccordionTrigger>
            <AccordionContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 pt-4">
                    {snippet.thumbnails.maxres && <ThumbnailImage title="Max-Res" src={snippet.thumbnails.maxres.url} />}
                    {snippet.thumbnails.standard && <ThumbnailImage title="Standard" src={snippet.thumbnails.standard.url} />}
                    <ThumbnailImage title="High" src={snippet.thumbnails.high.url} />
                    <ThumbnailImage title="Medium" src={snippet.thumbnails.medium.url} />
                    <ThumbnailImage title="Default" src={snippet.thumbnails.default.url} />
                </div>
            </AccordionContent>
            </AccordionItem>
            
            {snippet.description && (
            <AccordionItem value="item-2">
            <AccordionTrigger>
                <h3 className="text-lg font-semibold flex items-center gap-2"><FileText className="h-5 w-5" /> Description</h3>
            </AccordionTrigger>
            <AccordionContent>
                <div className="max-h-72 overflow-y-auto whitespace-pre-wrap rounded-md bg-muted/50 p-4 text-base leading-relaxed text-card-foreground/90 font-mono text-sm mt-2">
                {snippet.description}
                </div>
            </AccordionContent>
            </AccordionItem>
            )}
            
            {snippet.tags && snippet.tags.length > 0 && (
            <AccordionItem value="item-3">
            <AccordionTrigger>
                <h3 className="text-lg font-semibold flex items-center gap-2"><Tags className="h-5 w-5" /> Tags</h3>
            </AccordionTrigger>
            <AccordionContent>
                <div className="flex flex-wrap gap-2 pt-4">
                {snippet.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="font-medium text-sm">{tag}</Badge>
                ))}
                </div>
            </AccordionContent>
            </AccordionItem>
            )}
        </Accordion>
      </CardContent>
    </Card>
  );
}

function ThumbnailImage({ src, title }: { src: string; title: string }) {
    return (
        <a href={src} target="_blank" rel="noopener noreferrer" className="group relative overflow-hidden rounded-lg block">
            <Image
                src={src}
                alt={`${title} thumbnail`}
                width={480}
                height={360}
                className="w-full h-auto object-cover border-2 border-border group-hover:border-primary group-hover:scale-105 transition-all duration-300"
                unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute bottom-0 left-0 right-0 p-2 text-white text-xs text-center font-semibold opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                {title}
            </div>
        </a>
    )
}
