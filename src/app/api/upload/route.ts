import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import { getSession } from '@/lib/auth';
import { addMediaFile } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized. Admin session required.' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided.' }, { status: 400 });
    }

    // Size limit (35 MB)
    if (file.size > 35 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size exceeds 35MB limit.' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const ext = path.extname(file.name) || '.png';
    const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const filePath = path.join(uploadDir, safeName);

    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/uploads/${safeName}`;

    const mediaEntry = addMediaFile({
      filename: safeName,
      url: publicUrl,
      mimeType: file.type || 'application/octet-stream',
      size: file.size,
    });

    return NextResponse.json({
      success: true,
      url: publicUrl,
      media: mediaEntry,
    });
  } catch (err: any) {
    console.error('File upload error:', err);
    return NextResponse.json({ error: 'Failed to upload file.' }, { status: 500 });
  }
}
