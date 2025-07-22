# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

zbufnode is a Slack-like CLI messaging tool built with React and Ink. It provides a terminal-based interface for posting and managing messages with directory-based session management.

## Essential Commands

```bash
# Development (uses tsx for TypeScript execution)
pnpm dev

# Build TypeScript to JavaScript
pnpm build

# Run production build
pnpm start

# Note: Tests are not implemented - pnpm test will exit with error
# Note: No linting or formatting commands are configured
```

## Architecture

### Session-Based Storage System

The core architecture revolves around directory-specific sessions:

1. Each working directory gets a unique session ID (base64-encoded path) via `utils/session.ts`
2. Messages are stored in JSONL format at `~/.config/zbuf/sessions/<sessionId>.jsonl`
3. The `useSession` hook manages loading/saving messages and session state
4. Messages are append-only with UUID identifiers

### Component Structure

- **App.tsx**: Orchestrates the main UI, handles keyboard input and commands
- **MessageList.tsx**: Renders messages with terminal-aware scrolling
- **InputBox.tsx**: Wraps ink-text-input for message composition
- **SessionBar.tsx**: Displays current directory and session info
- **StatusBar.tsx**: Shows user info and available commands

### Key Patterns

1. **Command System**: Interactive commands start with `:` (e.g., `:quit`, `:clear`, `:export`)
2. **ES Modules**: Project uses `"type": "module"` - all imports must include `.js` extension
3. **Async Storage**: All file operations in `utils/storage.ts` are async with graceful error handling
4. **Export Formats**: Supports markdown (default), JSON, and plain text exports via CLI flags

### CLI Arguments

The entry point (`index.tsx`) handles:
- `--export [format]`: Export messages in markdown/json/plain format
- `--help`: Display help information
- No arguments: Launch interactive mode

## Development Notes

- TypeScript strict mode is enabled
- Targets ES2022 with NodeNext module resolution
- Requires Node.js 18+ for ES module support
- Uses pnpm as package manager (v10.12.2)
- No testing framework or linting tools configured