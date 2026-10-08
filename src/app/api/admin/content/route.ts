import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/auth';
import {
  getDb,
  saveDb,
  updateSiteSettings,
  updateHeroSlides,
  updateAboutContent,
  updateContributors,
  updateInvestmentAreas,
  saveBlogPost,
  deleteBlogPost,
  savePodcastEpisode,
  deletePodcastEpisode,
  updateInquiryStatus,
  deleteMediaFile,
} from '@/lib/db';

export async function GET(request: Request) {
  const session = await getSession(request);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const db = getDb();
  return NextResponse.json({ success: true, data: db });
}

export async function POST(request: Request) {
  const session = await getSession(request);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { action, payload } = await request.json();

    switch (action) {
      case 'update_settings':
        updateSiteSettings(payload);
        revalidatePath('/', 'layout');
        break;

      case 'update_slides':
        updateHeroSlides(payload);
        revalidatePath('/');
        break;

      case 'update_about':
        updateAboutContent(payload);
        revalidatePath('/');
        revalidatePath('/about');
        break;

      case 'update_contributors':
        updateContributors(payload);
        revalidatePath('/about');
        revalidatePath('/authors/[slug]', 'page');
        break;

      case 'update_investment':
        updateInvestmentAreas(payload);
        revalidatePath('/');
        revalidatePath('/investment');
        break;

      case 'save_blog_post':
        saveBlogPost(payload);
        revalidatePath('/');
        revalidatePath('/blog');
        revalidatePath(`/blog/${payload.slug}`);
        break;

      case 'delete_blog_post':
        deleteBlogPost(payload.id);
        revalidatePath('/');
        revalidatePath('/blog');
        break;

      case 'save_podcast_episode':
        savePodcastEpisode(payload);
        revalidatePath('/');
        revalidatePath('/podcast');
        revalidatePath(`/podcast/${payload.slug}`);
        break;

      case 'delete_podcast_episode':
        deletePodcastEpisode(payload.id);
        revalidatePath('/');
        revalidatePath('/podcast');
        break;

      case 'update_inquiry':
        updateInquiryStatus(payload.id, payload.status, payload.notes);
        break;

      case 'delete_media':
        deleteMediaFile(payload.id);
        break;

      default:
        return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: 'Changes saved and published successfully.' });
  } catch (err: any) {
    console.error('Admin content update error:', err);
    return NextResponse.json({ error: 'Failed to update content.' }, { status: 500 });
  }
}
