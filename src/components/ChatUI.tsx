import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Box, Button, TextField } from '@mui/material';

type Message = {
  text: string;
  sender: 'user' | 'bot';
};

const userBubbleStyle = {
  alignSelf: 'flex-end',
  backgroundColor: 'primary.main',
  color: 'primary.contrastText',
};

const botBubbleStyle = {
  alignSelf: 'flex-start',
  backgroundColor: '#666',
};

const handleUserMessage = (message: Message): Message => {
  const mess: Message = { text: 'smrdíš', sender: 'bot' };
  return mess;
};

const ChatUI = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    const newMessage: Message = { text: inputText, sender: 'user' };
    // setMessages([...messages, newMessage]);
    setInputText('');
    // Here you might also call the sendMessage function that integrates with the backend or API
    const botMessage: Message = handleUserMessage(newMessage);
    setMessages([...messages, newMessage, botMessage]);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
        gap: '25px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column-reverse',
          overflowY: 'auto',
          flexGrow: 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
          }}
        >
          {messages.map((msg, index) => (
            <Box
              key={index}
              sx={{
                ...(msg.sender === 'user' ? userBubbleStyle : botBubbleStyle),
                py: '8px',
                px: '14px',
                borderRadius: '16px',
                maxWidth: '70%',
              }}
            >
              {msg.text}
            </Box>
          ))}
        </Box>
      </Box>

      <form
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '15px',
        }}
        onSubmit={handleSendMessage}
      >
        <TextField
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Type a message..."
          sx={{ flexGrow: 1, '& .MuiInputBase-root': { height: '44px' } }}
        />
        <Button type="submit" variant="contained">
          Send
        </Button>
      </form>
    </Box>
  );
};

export default ChatUI;
