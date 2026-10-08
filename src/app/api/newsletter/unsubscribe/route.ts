import { NextResponse } from 'next/server';
import { unsubscribeUser } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { email, token } = await request.json();
    const query = token || email;

    if (!query) {
      return NextResponse.json({ error: 'Email or token is required.' }, { status: 400 });
    }

    const success = unsubscribeUser(query);
    if (!success) {
      return NextResponse.json({ error: 'Subscriber record not found.' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'You have been unsubscribed from Akufai Capital & Equities updates.',
    });
  } catch (err: any) {
    console.error('Unsubscribe API error:', err);
    return NextResponse.json({ error: 'Failed to process unsubscribe.' }, { status: 500 });
  }
}
