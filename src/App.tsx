import React, { useState, useEffect } from 'react';
import { Box, Text, useApp, useStdout } from 'ink';
import { MessageList } from './components/MessageList.js';
import { InputBox } from './components/InputBox.js';
import { SessionBar } from './components/SessionBar.js';
import { StatusBar } from './components/StatusBar.js';
import { useSession } from './hooks/useSession.js';

export function App() {
  const { exit } = useApp();
  const { stdout } = useStdout();
  const { messages, loading, sessionId, sendMessage, clearMessages } = useSession();
  const [feedback, setFeedback] = useState<string>('');
  
  const terminalHeight = stdout?.rows || 24;
  const messageListHeight = terminalHeight - 8;

  const handleInput = async (input: string) => {
    if (input.startsWith(':')) {
      await handleCommand(input);
    } else {
      await sendMessage(input);
    }
  };

  const handleCommand = async (command: string) => {
    const [cmd, ...args] = command.split(' ');

    switch (cmd) {
      case ':quit':
        exit();
        break;
        
      case ':clear':
        await clearMessages();
        setFeedback('Session cleared');
        setTimeout(() => setFeedback(''), 3000);
        break;
        
      default:
        setFeedback('Unknown command');
        setTimeout(() => setFeedback(''), 3000);
    }
  };

  if (loading) {
    return <Text>Loading session...</Text>;
  }

  return (
    <Box flexDirection="column" height={terminalHeight}>
      <SessionBar />
      <Box flexGrow={1} marginY={1}>
        <MessageList messages={messages} height={messageListHeight} />
      </Box>
      {feedback && (
        <Box paddingX={1}>
          <Text color="yellow">{feedback}</Text>
        </Box>
      )}
      <InputBox onSubmit={handleInput} />
      <StatusBar />
    </Box>
  );
}