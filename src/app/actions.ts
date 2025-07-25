"use server";

import { z } from "zod";

const VideoSnippetSchema = z.object({
  publishedAt: z.string(),
  channelId: z.string(),
  title: z.string(),
  description: z.string(),
  thumbnails: z.object({
    default: z.object({ url: z.string(), width: z.number(), height: z.number() }),
    medium: z.object({ url: z.string(), width: z.number(), height: z.number() }),
    high: z.object({ url: z.string(), width: z.number(), height: z.number() }),
    standard: z.object({ url: z.string(), width: z.number(), height: z.number() }).optional(),
    maxres: z.object({ url: z.string(), width: z.number(), height: z.number() }).optional(),
  }),
  channelTitle: z.string(),
  tags: z.array(z.string()).optional(),
  categoryId: z.string(),
  liveBroadcastContent: z.string(),
  localized: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

const VideoItemSchema = z.object({
  kind: z.string(),
  etag: z.string(),
  id: z.string(),
  snippet: VideoSnippetSchema,
});

const YouTubeApiResponseSchema = z.object({
  kind: z.string(),
  etag: z.string(),
  items: z.array(VideoItemSchema),
  pageInfo: z.object({
    totalResults: z.number(),
    resultsPerPage: z.number(),
  }),
});

export type YouTubeVideo = z.infer<typeof VideoItemSchema>;

export async function getYouTubeVideoMetadata(videoId: string): Promise<{ data: YouTubeVideo | null; error: string | null; }> {
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    console.error("YouTube API key is not set.");
    return { data: null, error: "Server configuration error: API key is missing." };
  }

  if (!videoId) {
    return { data: null, error: "Video ID is required." };
  }

  const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json();
      console.error("YouTube API Error:", errorData);
      return { data: null, error: `API request failed: ${errorData.error.message || response.statusText}` };
    }

    const jsonData = await response.json();
    const parsedData = YouTubeApiResponseSchema.safeParse(jsonData);

    if (!parsedData.success) {
      console.error("Failed to parse YouTube API response:", parsedData.error);
      return { data: null, error: "Failed to parse API response." };
    }

    if (parsedData.data.items.length === 0) {
      return { data: null, error: "Video not found. Please check the URL or Video ID." };
    }
    
    return { data: parsedData.data.items[0], error: null };

  } catch (error) {
    console.error("Network or other error:", error);
    return { data: null, error: "An unexpected error occurred. Please try again." };
  }
}
