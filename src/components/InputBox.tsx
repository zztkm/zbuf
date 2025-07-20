import React, { useState } from 'react';
import { Box, Text } from 'ink';
import TextInput from 'ink-text-input';

interface InputBoxProps {
  onSubmit: (value: string) => void;
  placeholder?: string;
}

export function InputBox({ onSubmit, placeholder = 'Type a message...' }: InputBoxProps) {
  const [value, setValue] = useState('');

  const handleSubmit = (submittedValue: string) => {
    if (submittedValue.trim()) {
      onSubmit(submittedValue);
      setValue('');
    }
  };

  return (
    <Box borderStyle="single" paddingX={1}>
      <Text color="yellow">&gt; </Text>
      <TextInput
        value={value}
        onChange={setValue}
        onSubmit={handleSubmit}
        placeholder={placeholder}
      />
    </Box>
  );
}