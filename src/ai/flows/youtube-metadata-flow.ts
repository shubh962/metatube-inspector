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

const youtubeMetadataPrompt = ai.definePrompt({
    name: 'youtubeMetadataPrompt',
    input: { schema: YouTubeMetadataOutputSchema },
    output: { schema: YouTubeMetadataOutputSchema },
    prompt: `
        You are a YouTube Metadata Formatter AI.

        Your task is to receive video metadata and format it into a clean JSON object.
        Ensure the output matches the requested schema precisely.

        - For the 'thumbnail' field, use the highest resolution available from the input thumbnails.
        - If 'tags' are missing or empty, provide an empty array.

        Here is the metadata:

        Title: {{{title}}}
        Description: {{{description}}}
        Tags: {{{tags}}}
        Channel: {{{channelTitle}}}
        Published At: {{{publishedAt}}}
        Thumbnail URL: {{{thumbnail}}}
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
        
        const videoDetails = await getYouTubeVideoMetadata(videoId);

        if (videoDetails.error || !videoDetails.data) {
            throw new Error(videoDetails.error || "Failed to fetch video details.");
        }

        const snippet = videoDetails.data.snippet;
        const thumbnail = snippet.thumbnails.maxres?.url || snippet.thumbnails.standard?.url || snippet.thumbnails.high.url;

        const llmResponse = await youtubeMetadataPrompt({
            title: snippet.title,
            description: snippet.description,
            tags: snippet.tags || [],
            channelTitle: snippet.channelTitle,
            publishedAt: snippet.publishedAt,
            thumbnail: thumbnail
        });

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
