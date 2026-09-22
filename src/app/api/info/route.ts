import { NextResponse } from 'next/server';
import youtubedl from 'youtube-dl-exec';
import { trackAction } from '@/lib/stats';
import os from 'os';
import { chmodSync } from 'fs';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
        return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    try {
        // Track the search
        trackAction('search', url);
        
        // Run yt-dlp to fetch video metadata
        const output = await youtubedl(url, {
            dumpSingleJson: true,
            noCheckCertificates: true,
            noWarnings: true,
            preferFreeFormats: true,
            noPlaylist: true
        });

        return NextResponse.json(output);
    } catch (error: any) {
        console.error('yt-dlp error:', error);
        
        // Extract the most useful error message
        const errorMessage = error.stderr || error.message || String(error) || 'Failed to process video.';
        
        // Clean up common yt-dlp error prefixes for the UI
        const cleanMessage = errorMessage.replace('ERROR:', '').trim();
        
        return NextResponse.json(
            { error: cleanMessage, details: errorMessage },
            { status: 500 }
        );
    }
}
