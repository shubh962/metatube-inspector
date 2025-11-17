// src/components/batch-results-display.tsx
"use client";

import { type YouTubeVideo } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { ListOrdered, XCircle, FileDown, Repeat2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MetadataDisplay } from "@/components/metadata-display"; // Import existing single video display component

interface BatchResultsDisplayProps {
  data: YouTubeVideo[];
  onNewUrl: () => void;
}

export function BatchResultsDisplay({ data, onNewUrl }: BatchResultsDisplayProps) {

  const handleExport = () => {
    // Basic CSV export logic (Can be expanded later)
    const headers = ["Title", "VideoId", "ChannelTitle", "ViewCount", "LikeCount", "TagsCount"];
    const csvContent = [
      headers.join(","),
      ...data.map(video => [
        `"${video.title.replace(/"/g, '""')}"`, // Handle quotes in title
        video.videoId,
        `"${video.channelTitle.replace(/"/g, '""')}"`,
        video.viewCount,
        video.likeCount,
        video.tags.length
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `MetaTube_Batch_Export_${Date.now()}.csv`);
    link.click();
  };

  return (
    <div className="w-full max-w-6xl space-y-6 animate-fade-in">
      
      {/* Summary and Action Bar */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <ListOrdered className="h-6 w-6 text-primary" />
            Batch Analysis Results ({data.length} Videos)
          </CardTitle>
          <div className="flex gap-2">
            <Button onClick={handleExport} variant="outline">
              <FileDown className="mr-2 h-4 w-4" /> Export to CSV
            </Button>
            <Button onClick={onNewUrl} variant="default">
              <Repeat2 className="mr-2 h-4 w-4" /> Start New Batch
            </Button>
          </div>
        </CardHeader>
        <CardContent>
             <p className="text-sm text-muted-foreground">Click on any video title below to expand and view the full metadata, including tags and description.</p>
        </CardContent>
      </Card>

      {/* Accordion for individual results */}
      <Accordion type="single" collapsible className="w-full space-y-4">
        {data.map((video, index) => (
          <AccordionItem 
            key={video.videoId} 
            value={`item-${video.videoId}`} 
            className="border-primary/20 rounded-lg shadow-lg overflow-hidden bg-card data-[state=open]:shadow-2xl transition-shadow"
          >
            <AccordionTrigger className="p-4 hover:bg-muted/50 rounded-lg transition-colors flex items-center justify-between w-full">
                <div className="flex items-center space-x-3 text-left">
                    <span className="text-lg font-semibold text-primary">#{index + 1}</span>
                    <span className="font-medium truncate max-w-xs sm:max-w-md md:max-w-lg">{video.title}</span>
                </div>
                <span className="text-sm text-muted-foreground hidden sm:block">
                    Views: {video.viewCount.toLocaleString()}
                </span>
            </AccordionTrigger>
            <AccordionContent className="p-4 border-t bg-secondary/10">
              {/* Reuse the existing single MetadataDisplay component here */}
              <MetadataDisplay data={video} onNewUrl={() => { /* Do nothing here, main component handles reset */ }} />
            </AccordionContent>
          </AccordionItem>
        ))}
        {data.length === 0 && (
            <Alert variant="destructive">
                <XCircle className="h-4 w-4" />
                <AlertTitle>No Results Found</AlertTitle>
                <AlertDescription>
                    We couldn't retrieve metadata for any of the URLs provided. Please check the links or the API key status.
                </AlertDescription>
            </Alert>
        )}
      </Accordion>
    </div>
  );
}
