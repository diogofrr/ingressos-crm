'use server'

import { createDecipheriv } from 'crypto';

export async function decryptData(encryptedData: string) {
  const secretKey = process.env.AUTH_SECRET
  const [iv, encrypted] = encryptedData.split(':');

  const decipher = createDecipheriv('aes-256-cbc', Buffer.from(secretKey, 'hex'), Buffer.from(iv, 'hex'));

  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}
