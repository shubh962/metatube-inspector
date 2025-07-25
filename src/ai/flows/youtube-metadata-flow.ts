'use server';
/**
 * @fileOverview An AI flow to extract YouTube video metadata.
 * 
 * - extractYouTubeMetadata - A function that extracts metadata from a YouTube video URL.
 */

import { ai } from '@/ai/genkit';
import { getYouTubeVideoMetadata } from '@/app/actions';
import { extractYouTubeVideoId } from '@/lib/utils';
import { YouTubeMetadataInputSchema, YouTubeMetadataOutputSchema, type YouTubeMetadataInput, type YouTubeMetadataOutput } from '@/ai/schemas';
import { z } from 'zod';


const getMetadataTool = ai.defineTool(
    {
        name: 'getYouTubeVideoMetadataTool',
        description: 'Get metadata for a given YouTube video ID.',
        inputSchema: z.object({ videoId: z.string() }),
        outputSchema: z.any(),
    },
    async ({ videoId }) => {
        const result = await getYouTubeVideoMetadata(videoId);
        if (result.error) {
            throw new Error(result.error);
        }
        return result.data;
    }
);


const youtubeMetadataPrompt = ai.definePrompt({
    name: 'youtubeMetadataPrompt',
    input: { schema: YouTubeMetadataInputSchema },
    output: { schema: YouTubeMetadataOutputSchema },
    tools: [getMetadataTool],
    prompt: `
        You are a YouTube Metadata Extractor AI.

        Input: A valid YouTube video URL.

        Task: Extract the following details using the YouTube Data API v3:
        - Title of the video
        - Description of the video
        - Tags (if available)
        - Channel name
        - Published date
        - High-resolution thumbnail URL

        Instructions:
        - Use the 'videos' endpoint from YouTube Data API.
        - Use 'part=snippet' to get all metadata.
        - Return the output in clean JSON format as follows:

        {
          "title": "...",
          "description": "...",
          "tags": ["...", "..."],
          "channelTitle": "...",
          "publishedAt": "...",
          "thumbnail": "..."
        }

        If any field like 'tags' is missing, return an empty array for it.

        Only respond with valid JSON, no extra explanation.

        URL: {{{youtubeUrl}}}
    `,
});

const youtubeMetadataFlow = ai.defineFlow(
    {
        name: 'youtubeMetadataFlow',
        inputSchema: YouTubeMetadataInputSchema,
        outputSchema: YouTubeMetadataOutputSchema,
    },
    async (input) => {
        const videoId = extractYouTubeVideoId(input.youtubeUrl);
        if (!videoId) {
            throw new Error("Could not extract video ID from URL.");
        }
        
        const llmResponse = await youtubeMetadataPrompt(input);
        const output = llmResponse.output;
        
        if (!output) {
            throw new Error("The model did not return any structured output.");
        }

        return output;
    }
);

export async function extractYouTubeMetadata(input: YouTubeMetadataInput): Promise<YouTubeMetadataOutput> {
    return youtubeMetadataFlow(input);
}
