import React from 'react';
import { Box, Text } from 'ink';
import { Message } from '../types/index.js';

interface MessageListProps {
  messages: Message[];
  height: number;
}

export function MessageList({ messages, height }: MessageListProps) {
  const displayMessages = messages.slice(-(height - 1));

  return (
    <Box flexDirection="column" height={height} overflowY="hidden">
      {displayMessages.map((message) => (
        <Box key={message.id} marginBottom={0}>
          <Text color="cyan">{formatTime(message.timestamp)}</Text>
          <Text> </Text>
          <Text color="green">{message.author}</Text>
          <Text>: </Text>
          <Text>{message.content}</Text>
        </Box>
      ))}
    </Box>
  );
}

function formatTime(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  });
}