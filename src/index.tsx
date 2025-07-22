#!/usr/bin/env node
import React from 'react';
import { render } from 'ink';
import { App } from './App.js';
import { loadMessages } from './utils/storage.js';
import { exportMessages } from './utils/export.js';
import { getCurrentSessionId } from './utils/session.js';
import { ExportFormat } from './types/index.js';
import fs from 'fs';
import path from 'path';
import os from 'os';

const args = process.argv.slice(2);

// Helper function to expand tilde in paths
function expandTilde(filepath: string): string {
  if (filepath.startsWith('~/') || filepath.startsWith('~\\') || filepath === '~') {
    return filepath.replace(/^~/, os.homedir());
  }
  return filepath;
}

// Check if first argument is a directory path (not a flag)
if (args.length > 0 && !args[0].startsWith('-')) {
  const expandedPath = expandTilde(args[0]);
  const targetDir = path.resolve(expandedPath);
  
  try {
    const stats = fs.statSync(targetDir);
    if (!stats.isDirectory()) {
      console.error(`Error: ${targetDir} is not a directory`);
      process.exit(1);
    }
    // Change working directory to the specified path
    process.chdir(targetDir);
    // Remove the directory argument so it doesn't interfere with other argument parsing
    args.shift();
  } catch (error) {
    console.error(`Error: Cannot access directory ${targetDir}`);
    console.error((error as Error).message);
    process.exit(1);
  }
}

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
  console.log('  zbuf                        Start interactive mode for current directory');
  console.log('  zbuf [directory]            Start interactive mode for specified directory');
  console.log('  zbuf [directory] --export   Export session for specified directory');
  console.log('  zbuf --export [format]      Export current session (format: markdown, json, plain)');
  console.log('  zbuf --help                 Show this help message');
  console.log('');
  console.log('Examples:');
  console.log('  zbuf ~/projects/myapp       Open session for ~/projects/myapp');
  console.log('  zbuf /tmp --export          Export messages from /tmp session');
  console.log('');
  console.log('Interactive mode commands:');
  console.log('  :clear         Clear current session');
  console.log('  :quit          Exit application');
  process.exit(0);
} else {
  // Start interactive mode
  render(<App />);
}