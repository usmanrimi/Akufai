import { NextResponse } from 'next/server';
import { addSubscriber } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    const { subscriber, isNew } = addSubscriber(email);

    return NextResponse.json({
      success: true,
      isNew,
      message: isNew
        ? 'Thank you for subscribing to selected reflections and announcements from Akufai Capital & Equities.'
        : 'Your email is already registered to receive Akufai updates.',
    });
  } catch (err: any) {
    console.error('Newsletter API error:', err);
    return NextResponse.json({ error: 'Failed to process subscription.' }, { status: 500 });
  }
}
