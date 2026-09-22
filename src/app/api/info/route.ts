import { NextResponse } from 'next/server';
import { create } from 'youtube-dl-exec';
import { trackAction } from '@/lib/stats';
import path from 'path';
import os from 'os';
import fs from 'fs';

const isWindows = os.platform() === 'win32';
const ytDlpPath = path.join(process.cwd(), 'node_modules', 'youtube-dl-exec', 'bin', isWindows ? 'yt-dlp.exe' : 'yt-dlp');

try {
  if (!isWindows) {
    fs.chmodSync(ytDlpPath, '755');
  }
} catch (e) {
  console.log('Could not set permissions for yt-dlp binary');
}

const youtubedl = create(ytDlpPath);

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
        return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    const options: any = {
        dumpSingleJson: true,
        noCheckCertificates: true,
        noWarnings: true,
        preferFreeFormats: true,
        noPlaylist: true,
        extractorArgs: 'youtube:player_client=ios,web'
    };

    const cookiesPath = path.join(process.cwd(), 'cookies.txt');
    if (fs.existsSync(cookiesPath)) {
        options.cookies = cookiesPath;
    }

    try {
        // Track the search
        trackAction('search', url);
        
        // Run yt-dlp to fetch video metadata
        const output = await youtubedl(url, options);

        return NextResponse.json(output);
    } catch (error: any) {
        console.error('yt-dlp error:', error);
        
        let errorMessage = 'Failed to process video.';
        if (error.stderr) errorMessage = error.stderr;
        else if (error.message) errorMessage = error.message;
        else if (error.code) errorMessage = `System Error: ${error.syscall || 'spawn'} ${error.code} - The video downloader binary might be missing or blocked on this server.`;
        else errorMessage = String(error);
        
        // Clean up common yt-dlp error prefixes for the UI
        const cleanMessage = errorMessage.replace('ERROR:', '').trim();
        
        return NextResponse.json(
            { error: cleanMessage, details: errorMessage },
            { status: 500 }
        );
    }
}
