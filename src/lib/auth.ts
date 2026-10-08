import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { findUserByEmail } from './db';
import { AdminUser } from '@/types';

const JWT_SECRET = process.env.JWT_SECRET || 'akufai_capital_super_secret_jwt_key_2026';
const COOKIE_NAME = 'akufai_admin_session';

export interface SessionPayload {
  userId: string;
  email: string;
  name: string;
  role: string;
}

export async function verifyPassword(plain: string, hashed: string): Promise<boolean> {
  try {
    return await bcrypt.compare(plain, hashed);
  } catch (err) {
    console.error('Password compare error:', err);
    return false;
  }
}

export async function hashPassword(plain: string): Promise<string> {
  return await bcrypt.hash(plain, 10);
}

export function createToken(payload: SessionPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): SessionPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as SessionPayload;
  } catch {
    return null;
  }
}

export async function getSession(req?: Request): Promise<SessionPayload | null> {
  let token: string | undefined;

  if (req) {
    const cookieHeader = req.headers.get('cookie') || '';
    const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${COOKIE_NAME}=([^;]+)`));
    if (match) token = match[1];
  }

  if (!token) {
    try {
      const cookieStore = await cookies();
      token = cookieStore.get(COOKIE_NAME)?.value;
    } catch {
      // In certain contexts cookies() may not be available
    }
  }

  if (!token) return null;
  return verifyToken(token);
}

export async function requireAuth(req?: Request): Promise<SessionPayload> {
  const session = await getSession(req);
  if (!session) {
    throw new Error('Unauthorized');
  }
  return session;
}
