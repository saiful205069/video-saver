import { NextResponse } from 'next/server';
import { trackAction, getAllStats, getConfig, updateConfig } from '@/lib/stats';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');
  const url = searchParams.get('url') || undefined;
  
  if (action === 'get') {
    const stats = getAllStats();
    return NextResponse.json(stats);
  }
  
  if (action === 'get_config') {
    const config = getConfig();
    return NextResponse.json(config);
  }
  
  if (action === 'visit' || action === 'search' || action === 'download') {
    trackAction(action, url);
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');
  
  if (action === 'set_config') {
    const body = await request.json();
    const newConfig = updateConfig(body);
    return NextResponse.json(newConfig);
  }
  
  return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
}
