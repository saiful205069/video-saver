import { NextResponse } from 'next/server';
import { create } from 'youtube-dl-exec';
import { trackAction } from '@/lib/stats';
import path from 'path';

const ytDlpPath = path.join(process.cwd(), 'node_modules', 'youtube-dl-exec', 'bin', 'yt-dlp.exe');
const youtubedl = create(ytDlpPath);

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
            noPlaylist: true,
            addHeader: [
                'referer:youtube.com',
                'user-agent:Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            ]
        });

        return NextResponse.json(output);
    } catch (error: any) {
        console.error('yt-dlp error:', error);
        return NextResponse.json(
            { error: 'Failed to process video. It might be private or unsupported.', details: error.message },
            { status: 500 }
        );
    }
}
