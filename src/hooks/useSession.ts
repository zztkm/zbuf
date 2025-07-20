import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Message } from '../types/index.js';
import { loadMessages, appendMessage, clearSession } from '../utils/storage.js';
import { getCurrentSessionId } from '../utils/session.js';

export function useSession() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const sessionId = getCurrentSessionId();

  useEffect(() => {
    const initSession = async () => {
      try {
        const loadedMessages = await loadMessages(sessionId);
        setMessages(loadedMessages);
      } catch (error) {
        console.error('Failed to load session:', error);
      } finally {
        setLoading(false);
      }
    };

    initSession();
  }, [sessionId]);

  const sendMessage = useCallback(async (content: string) => {
    const message: Message = {
      id: uuidv4(),
      timestamp: new Date().toISOString(),
      author: process.env.USER || 'user',
      content
    };

    try {
      await appendMessage(sessionId, message);
      setMessages(prev => [...prev, message]);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  }, [sessionId]);

  const clearMessages = useCallback(async () => {
    try {
      await clearSession(sessionId);
      setMessages([]);
    } catch (error) {
      console.error('Failed to clear session:', error);
    }
  }, [sessionId]);

  return {
    messages,
    loading,
    sessionId,
    sendMessage,
    clearMessages
  };
}