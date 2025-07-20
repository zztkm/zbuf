import React from 'react';
import { Box, Text } from 'ink';

export function StatusBar() {
  return (
    <Box borderStyle="single" paddingX={1}>
      <Text dimColor>Commands: </Text>
      <Text color="yellow">:clear</Text>
      <Text dimColor> | </Text>
      <Text color="yellow">:quit</Text>
      <Text dimColor> (or Ctrl+C)</Text>
    </Box>
  );
}