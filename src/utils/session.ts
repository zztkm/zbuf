import { Buffer } from 'buffer';

export function getCurrentDirectory(): string {
  return process.cwd();
}

export function createSessionId(directoryPath: string): string {
  return Buffer.from(directoryPath).toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

export function decodeSessionId(sessionId: string): string {
  const base64 = sessionId
    .replace(/-/g, '+')
    .replace(/_/g, '/');
  
  return Buffer.from(base64, 'base64').toString('utf-8');
}

export function getCurrentSessionId(): string {
  return createSessionId(getCurrentDirectory());
}