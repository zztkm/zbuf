import fs from 'fs/promises';
import path from 'path';
import { xdgConfig } from 'xdg-basedir';
import { Message } from '../types/index.js';

const APP_NAME = 'zbuf';

export function getConfigDir(): string {
  const configHome = xdgConfig || path.join(process.env.HOME || '', '.config');
  return path.join(configHome, APP_NAME);
}

export function getSessionsDir(): string {
  return path.join(getConfigDir(), 'sessions');
}

export async function ensureDirectories(): Promise<void> {
  const sessionsDir = getSessionsDir();
  await fs.mkdir(sessionsDir, { recursive: true });
}

export function getSessionFilePath(sessionId: string): string {
  return path.join(getSessionsDir(), `${sessionId}.jsonl`);
}

export async function loadMessages(sessionId: string): Promise<Message[]> {
  const filePath = getSessionFilePath(sessionId);
  
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    const lines = content.trim().split('\n').filter(line => line.length > 0);
    return lines.map(line => JSON.parse(line) as Message);
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

export async function appendMessage(sessionId: string, message: Message): Promise<void> {
  await ensureDirectories();
  const filePath = getSessionFilePath(sessionId);
  const line = JSON.stringify(message) + '\n';
  await fs.appendFile(filePath, line);
}

export async function clearSession(sessionId: string): Promise<void> {
  const filePath = getSessionFilePath(sessionId);
  
  try {
    await fs.unlink(filePath);
  } catch (error: any) {
    if (error.code !== 'ENOENT') {
      throw error;
    }
  }
}