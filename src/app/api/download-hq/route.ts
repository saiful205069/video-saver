import { NextResponse } from 'next/server';
import { trackAction } from '@/lib/stats';
import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';
import os from 'os';
import ffmpegStatic from 'ffmpeg-static';

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

  const ytDlpPath = path.join(process.cwd(), 'node_modules', 'youtube-dl-exec', 'bin', 'yt-dlp.exe');
  const ffmpegPath = path.join(process.cwd(), 'node_modules', 'ffmpeg-static', 'ffmpeg.exe');
  
  const needsMerge = searchParams.get('merge') === 'true';

  // Create a unique temporary directory
  const tempId = Math.random().toString(36).substring(7);
  const tempDir = path.join(os.tmpdir(), `ytdl_${tempId}`);
  fs.mkdirSync(tempDir, { recursive: true });
  
  // We will force mp4 extension
  const tempOutputPath = path.join(tempDir, `video.%(ext)s`);

  try {
    let cmd = '';
    if (needsMerge) {
      // Force mp4 merging and ensure audio is aac for universal compatibility
      cmd = `"${ytDlpPath}" -f "${formatId}+bestaudio[ext=m4a]" --ffmpeg-location "${ffmpegPath}" --merge-output-format mp4 --concurrent-fragments 4 --no-playlist -o "${tempOutputPath}" "${url}"`;
    } else {
      // Direct download of the format
      cmd = `"${ytDlpPath}" -f "${formatId}" --ffmpeg-location "${ffmpegPath}" --concurrent-fragments 4 --no-playlist -o "${tempOutputPath}" "${url}"`;
    }
    
    await new Promise((resolve, reject) => {
      exec(cmd, (error, stdout, stderr) => {
        if (error) {
          console.error('yt-dlp exec error:', stderr);
          reject(error);
        } else {
          resolve(stdout);
        }
      });
    });

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
    console.error('HQ Download Error:', error);
    fs.rmSync(tempDir, { recursive: true, force: true });
    return NextResponse.json({ error: 'Failed to process HQ video. Please try another format.' }, { status: 500 });
  }
}
