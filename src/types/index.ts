export interface Message {
  id: string;
  timestamp: string;
  author: string;
  content: string;
}

export interface Session {
  id: string;
  path: string;
  messages: Message[];
}

export type Command = ':clear' | ':export' | ':quit';

export type ExportFormat = 'markdown' | 'json' | 'plain';

export interface ExportOptions {
  format: ExportFormat;
  outputPath?: string;
}