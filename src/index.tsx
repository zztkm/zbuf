#!/usr/bin/env node
import React from 'react';
import { render } from 'ink';
import { App } from './App.js';
import { loadMessages } from './utils/storage.js';
import { exportMessages } from './utils/export.js';
import { getCurrentSessionId } from './utils/session.js';
import { ExportFormat } from './types/index.js';

const args = process.argv.slice(2);

// Check for export command
if (args[0] === '--export' || args[0] === '-e') {
  const format = (args[1] as ExportFormat) || 'markdown';
  const validFormats: ExportFormat[] = ['markdown', 'json', 'plain'];
  
  if (!validFormats.includes(format)) {
    console.error(`Invalid format: ${format}`);
    console.error(`Valid formats: ${validFormats.join(', ')}`);
    process.exit(1);
  }
  
  const sessionId = getCurrentSessionId();
  
  loadMessages(sessionId)
    .then(messages => {
      const output = exportMessages(messages, sessionId, format);
      console.log(output);
    })
    .catch(error => {
      console.error('Failed to export messages:', error);
      process.exit(1);
    });
} else if (args[0] === '--help' || args[0] === '-h') {
  console.log('zbuf - Slack-like CLI messaging tool');
  console.log('');
  console.log('Usage:');
  console.log('  zbuf                     Start interactive mode');
  console.log('  zbuf --export [format]   Export current session (format: markdown, json, plain)');
  console.log('  zbuf --help              Show this help message');
  console.log('');
  console.log('Interactive mode commands:');
  console.log('  :clear         Clear current session');
  console.log('  :quit          Exit application');
  process.exit(0);
} else {
  // Start interactive mode
  render(<App />);
}