import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import {
  getPublishingConfig,
  updatePublishingConfig,
  getPublicationHistory,
  getPublishedContent,
  publishChanges,
  rollbackPublication,
} from '@/lib/db';

export async function GET(request: Request) {
  try {
    await requireAuth(request);

    const config = getPublishingConfig();
    const history = getPublicationHistory();
    const published = getPublishedContent();

    return NextResponse.json({
      success: true,
      config,
      history,
      latestPublication: history[0] || null,
      publishedAt: published ? (history[0]?.publishedAt || null) : null,
      totalPublications: history.length,
    });
  } catch (err: any) {
    if (err.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized administrative access.' }, { status: 401 });
    }
    console.error('Publish API GET error:', err);
    return NextResponse.json({ error: 'Failed to retrieve publishing state.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await requireAuth(request);
    const body = await request.json();
    const { action } = body;

    if (action === 'publish') {
      const message = body.message || 'Published executive updates via Super Admin';
      const result = await publishChanges(
        message,
        session.email || 'admin@akufaicapitalandequities.com'
      );

      if (!result.success) {
        return NextResponse.json({ error: result.error || 'Failed to publish.' }, { status: 500 });
      }

      return NextResponse.json({
        success: true,
        message: 'Content published successfully to live environment.',
        record: result.publication,
      });
    }

    if (action === 'rollback') {
      const { versionId } = body;
      if (!versionId) {
        return NextResponse.json({ error: 'Version ID is required for rollback.' }, { status: 400 });
      }

      const result = await rollbackPublication(
        versionId,
        session.email || 'admin@akufaicapitalandequities.com'
      );

      if (!result.success) {
        return NextResponse.json({ error: result.error || 'Failed to rollback.' }, { status: 500 });
      }

      return NextResponse.json({
        success: true,
        message: `Successfully rolled back to version ${versionId}.`,
        record: result.publication,
      });
    }

    if (action === 'update_config') {
      const { config } = body;
      if (!config) {
        return NextResponse.json({ error: 'Config payload is required.' }, { status: 400 });
      }

      const updated = updatePublishingConfig(config);
      return NextResponse.json({
        success: true,
        message: 'Publishing and deployment configuration updated.',
        config: updated,
      });
    }

    return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 });
  } catch (err: any) {
    if (err.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized administrative access.' }, { status: 401 });
    }
    console.error('Publish API POST error:', err);
    return NextResponse.json({ error: err.message || 'Publishing operation failed.' }, { status: 500 });
  }
}
