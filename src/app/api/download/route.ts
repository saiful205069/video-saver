import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');
  const filename = searchParams.get('filename') || 'video.mp4';

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch from remote server: ${response.statusText}`);
    }

    // Create a new headers object to modify the Content-Disposition
    const headers = new Headers(response.headers);
    headers.set('Content-Disposition', `attachment; filename="${filename}"`);
    // Ensure we don't send restrictive security headers that might block the download
    headers.delete('cross-origin-resource-policy');
    
    // Return the response body (stream) with the modified headers
    return new NextResponse(response.body, {
      status: 200,
      headers
    });
  } catch (error: any) {
    console.error('Download Proxy Error:', error);
    return NextResponse.json(
      { error: 'Failed to proxy download stream', details: error.message }, 
      { status: 500 }
    );
  }
}
