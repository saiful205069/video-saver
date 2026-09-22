import { NextResponse } from 'next/server';
import { trackAction } from '@/lib/stats';
import { create } from 'youtube-dl-exec';
import path from 'path';
import fs from 'fs';
import os from 'os';

const isWindows = os.platform() === 'win32';
const ytDlpPath = path.join(process.cwd(), 'node_modules', 'youtube-dl-exec', 'bin', isWindows ? 'yt-dlp.exe' : 'yt-dlp');
const ffmpegPath = path.join(process.cwd(), 'node_modules', 'ffmpeg-static', isWindows ? 'ffmpeg.exe' : 'ffmpeg');

try {
  if (!isWindows) {
    fs.chmodSync(ytDlpPath, '755');
    fs.chmodSync(ffmpegPath, '755');
  }
} catch (e) {
  console.log('Could not set binary permissions');
}

const youtubedl = create(ytDlpPath);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');
  const formatId = searchParams.get('formatId');
  const filename = searchParams.get('filename') || 'hq_video.mp4';

  if (!url || !formatId) {
    return NextResponse.json({ error: 'URL and formatId are required' }, { status: 400 });
  }

  // Track the download
  trackAction('download', url);
  
  const needsMerge = searchParams.get('merge') === 'true';

  // Create a unique temporary directory
  const tempId = Math.random().toString(36).substring(7);
  const tempDir = path.join(os.tmpdir(), `ytdl_${tempId}`);
  fs.mkdirSync(tempDir, { recursive: true });
  
  // We will force mp4 extension
  const tempOutputPath = path.join(tempDir, `video.%(ext)s`);

  try {
    const options: any = {
      f: needsMerge ? `${formatId}+bestaudio[ext=m4a]` : formatId,
      ffmpegLocation: ffmpegPath,
      concurrentFragments: 4,
      noPlaylist: true,
      o: tempOutputPath,
    };

    if (needsMerge) {
      options.mergeOutputFormat = 'mp4';
    }
    
    await youtubedl(url, options);

    // Find the downloaded file in the temp directory
    const files = fs.readdirSync(tempDir);
    if (files.length === 0) {
      throw new Error("Merged file was not created.");
    }
    const finalFilePath = path.join(tempDir, files[0]);

    // Create a read stream for the downloaded and merged file
    const stream = fs.createReadStream(finalFilePath);
    
    // Get the actual file extension that yt-dlp created (.mp4, .m4a, etc)
    const finalExt = path.extname(files[0]).substring(1);
    
    const readable = new ReadableStream({
      start(controller) {
        stream.on('data', chunk => controller.enqueue(chunk));
        stream.on('end', () => {
          controller.close();
          // Cleanup temp file after streaming
          fs.rmSync(tempDir, { recursive: true, force: true });
        });
        stream.on('error', err => {
          controller.error(err);
          fs.rmSync(tempDir, { recursive: true, force: true });
        });
      },
      cancel() {
        stream.destroy();
        fs.rmSync(tempDir, { recursive: true, force: true });
      }
    });

    // Remove the extension from the requested filename and add the actual merged extension
    const baseFilename = filename.replace(/\.[^/.]+$/, "");
    const finalFilename = `${baseFilename}.${finalExt}`;

    return new NextResponse(readable, {
      headers: {
        'Content-Disposition': `attachment; filename="${finalFilename}"`,
        'Content-Type': `video/${finalExt}`,
        'Content-Length': fs.statSync(finalFilePath).size.toString(),
      },
    });
  } catch (error: any) {
    console.error('Download error:', error);
    fs.rmSync(tempDir, { recursive: true, force: true });
    return NextResponse.json({ error: error.message || 'Download failed', details: error.message }, { status: 500 });
  }
}
