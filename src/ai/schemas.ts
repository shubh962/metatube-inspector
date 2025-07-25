/**
 * @fileOverview Defines the data schemas and types for AI-related flows.
 * This file centralizes Zod schemas to ensure consistency and type safety
 * across different parts of the application that interact with AI models.
 */

import { z } from 'zod';

// Schema for the input of the YouTube metadata extraction flow.
export const YouTubeMetadataInputSchema = z.object({
  youtubeUrl: z.string().url().describe("A valid YouTube video URL."),
});
export type YouTubeMetadataInput = z.infer<typeof YouTubeMetadataInputSchema>;

// Schema for the output of the YouTube metadata extraction flow.
export const YouTubeMetadataOutputSchema = z.object({
  title: z.string().describe("Title of the video"),
  description: z.string().describe("Description of the video"),
  tags: z.array(z.string()).describe("Tags for the video, if available. Return an empty array if missing."),
  channelTitle: z.string().describe("Name of the channel"),
  publishedAt: z.string().datetime().describe("Published date of the video in ISO 8601 format."),
  thumbnail: z.string().url().describe("High-resolution thumbnail URL"),
});
export type YouTubeMetadataOutput = z.infer<typeof YouTubeMetadataOutputSchema>;
