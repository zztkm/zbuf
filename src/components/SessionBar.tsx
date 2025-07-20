import React from 'react';
import { Box, Text } from 'ink';
import { getCurrentDirectory } from '../utils/session.js';

export function SessionBar() {
  const currentDir = getCurrentDirectory();
  
  return (
    <Box borderStyle="single" paddingX={1}>
      <Text bold color="magenta">Session: </Text>
      <Text>{currentDir}</Text>
    </Box>
  );
}