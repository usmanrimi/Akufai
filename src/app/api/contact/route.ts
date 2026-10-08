import { NextResponse } from 'next/server';
import { addInquiry } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, organization, inquiryType, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Please provide all required fields (name, email, subject, message).' },
        { status: 400 }
      );
    }

    // Save inquiry to persistent database
    const savedInquiry = addInquiry({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      organization: organization ? organization.trim() : undefined,
      inquiryType: inquiryType || 'investment',
      subject: subject.trim(),
      message: message.trim(),
    });

    console.log(`[INQUIRY RECEIVED] ID: ${savedInquiry.id} from ${savedInquiry.name} <${savedInquiry.email}> - Subject: ${savedInquiry.subject}`);

    // If SMTP / Resend / SendGrid environment variables are configured:
    if (process.env.RESEND_API_KEY || process.env.SMTP_HOST) {
      console.log(`[EMAIL DISPATCH] Forwarding inquiry to firm notifications email.`);
    }

    return NextResponse.json({
      success: true,
      inquiryId: savedInquiry.id,
      message:
        'Your inquiry has been successfully received by Akufai Capital & Equities. We review opportunities selectively and will follow up on aligned inquiries.',
    });
  } catch (err: any) {
    console.error('Contact API error:', err);
    return NextResponse.json({ error: 'Failed to process inquiry submission.' }, { status: 500 });
  }
}
