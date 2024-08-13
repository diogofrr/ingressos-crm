'use server'

import { createCipheriv, randomBytes } from 'crypto';

export async function encryptData(data: string) {
  const secretKey = process.env.AUTH_SECRET
  const iv = randomBytes(16);

  const cipher = createCipheriv('aes-256-cbc', Buffer.from(secretKey, 'hex'), iv);

  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return iv.toString('hex') + ':' + encrypted;
}

