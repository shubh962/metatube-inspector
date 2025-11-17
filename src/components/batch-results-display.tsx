// src/components/batch-results-display.tsx
"use client";

import { type YouTubeVideo } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { ListOrdered, XCircle, FileDown, Repeat2, Zap } from "lucide-react"; 
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MetadataDisplay } from "@/components/metadata-display"; 

// 🔥 ZAROORI FIX: Alert imports jise aapne pehle miss kiya tha
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"; 
// ----------------------------------------------------------------------

interface BatchResultsDisplayProps {
  data: YouTubeVideo[];
  onNewUrl: () => void;
}

export function BatchResultsDisplay({ data, onNewUrl }: BatchResultsDisplayProps) {

  const handleExport = () => {
    // CSV Export Logic (Functional, untouched)
    const headers = ["Title", "VideoId", "ChannelTitle", "ViewCount", "LikeCount", "TagsCount"];
    const csvContent = [
      headers.join(","),
      ...data.map(video => [
        `"${video.title.replace(/"/g, '""')}"`, 
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
    <div className="w-full max-w-6xl space-y-8 animate-fade-in">
      
      {/* Summary and Action Bar: Enhanced UI */}
      <Card className="border-2 border-primary/50 shadow-xl"> 
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
          <CardTitle className="text-3xl font-extrabold flex items-center gap-3 text-primary">
            <Zap className="h-7 w-7" />
            Batch Analysis Complete! 
          </CardTitle>
          <div className="flex gap-3">
            <Button onClick={handleExport} variant="secondary" className="font-semibold">
              <FileDown className="mr-2 h-4 w-4" /> Export All ({data.length}) to CSV
            </Button>
            <Button onClick={onNewUrl} variant="default" className="bg-green-600 hover:bg-green-700 font-semibold">
              <Repeat2 className="mr-2 h-4 w-4" /> New Batch Search
            </Button>
          </div>
        </CardHeader>
        <CardContent>
             <p className="text-base text-muted-foreground mt-2">
                Successfully processed **{data.length}** videos. Click on any title below to instantly view all metadata (Tags, Description, etc.).
             </p>
        </CardContent>
      </Card>

      {/* Accordion for individual results: Enhanced UI */}
      <Accordion type="single" collapsible className="w-full space-y-4">
        {data.map((video, index) => (
          <AccordionItem 
            key={video.videoId} 
            value={`item-${video.videoId}`} 
            className="border border-gray-300/50 rounded-lg shadow-md overflow-hidden bg-white dark:bg-gray-800 data-[state=open]:shadow-xl transition-shadow"
          >
            <AccordionTrigger className="p-4 hover:bg-primary/5 rounded-lg transition-colors flex items-center justify-between w-full">
                <div className="flex items-center space-x-4 text-left">
                    <span className="text-xl font-bold text-primary">#{index + 1}</span>
                    <span className="font-semibold text-lg truncate max-w-xs sm:max-w-md md:max-w-xl">{video.title}</span>
                </div>
                <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-blue-600 hidden sm:block">
                        Views: **{video.viewCount.toLocaleString()}**
                    </span>
                    <span className="text-sm text-muted-foreground hidden md:block">
                        Likes: {video.likeCount.toLocaleString()}
                    </span>
                </div>
            </AccordionTrigger>
            <AccordionContent className="p-4 border-t border-gray-200 bg-secondary/5 dark:bg-gray-900/50">
              {/* Reusing existing MetadataDisplay component */}
              <MetadataDisplay data={video} onNewUrl={() => { /* No action needed here */ }} />
            </AccordionContent>
          </AccordionItem>
        ))}
        {/* Error/No Results Alert: Enhanced UI and Content */}
        {data.length === 0 && (
            <Alert variant="destructive" className="mt-6 border-red-500 shadow-lg">
                <XCircle className="h-5 w-5" />
                <AlertTitle className="text-lg font-bold">Extraction Failed!</AlertTitle>
                <AlertDescription className="text-base">
                    No metadata could be retrieved. Please check the following:
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                        <li>Ensure all URLs are valid YouTube video links.</li>
                        <li>Verify the status of your YouTube Data API key.</li>
                        <li>Try a different set of URLs.</li>
                    </ul>
                </AlertDescription>
            </Alert>
        )}
      </Accordion>
    </div>
  );
}
