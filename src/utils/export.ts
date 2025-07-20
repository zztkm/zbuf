import { Message, ExportFormat } from '../types/index.js';
import { decodeSessionId } from './session.js';

export function exportMessages(
  messages: Message[],
  sessionId: string,
  format: ExportFormat
): string {
  const sessionPath = decodeSessionId(sessionId);
  
  switch (format) {
    case 'markdown':
      return exportToMarkdown(messages, sessionPath);
    case 'json':
      return exportToJson(messages, sessionPath);
    case 'plain':
      return exportToPlain(messages);
    default:
      throw new Error(`Unsupported format: ${format}`);
  }
}

function exportToMarkdown(messages: Message[], sessionPath: string): string {
  const lines = [
    `# Session: ${sessionPath}`,
    '',
    '## Messages',
    ''
  ];

  messages.forEach(msg => {
    const date = new Date(msg.timestamp);
    const formattedDate = date.toLocaleString();
    lines.push(`[${formattedDate}] ${msg.author}: ${msg.content}`);
    lines.push('');
  });

  return lines.join('\n');
}

function exportToJson(messages: Message[], sessionPath: string): string {
  return JSON.stringify({
    session: sessionPath,
    exportedAt: new Date().toISOString(),
    messages
  }, null, 2);
}

function exportToPlain(messages: Message[]): string {
  return messages.map(msg => {
    const date = new Date(msg.timestamp);
    const formattedDate = date.toLocaleString();
    return `[${formattedDate}] ${msg.author}: ${msg.content}`;
  }).join('\n');
}