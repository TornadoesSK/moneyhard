// components/ChatUI.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';
import styles from './ChatUI.module.css'; // Ensure you have the CSS module created



// Define a type for the message object
type Message = {
  text: string;
  sender: 'user' | 'bot';
};

// return a bot message based on the user message
const handleUserMessage = (message: Message): Message =>  {
    const mess: Message = { text: 'smrdíš', sender: 'bot' };
    return mess;
}

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
    setMessages([...messages,newMessage, botMessage]);
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.messagesContainer}>
        {messages.map((msg, index) => (
          <div key={index} className={`${styles.messageBubble} ${msg.sender === 'user' ? styles.userMsg : styles.botMsg}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <form className={styles.sendMessageForm} onSubmit={handleSendMessage}>
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          className={styles.messageInput}
          placeholder="Type a message..."
        />
        <button type="submit" className={styles.sendButton}>Send</button>
      </form>
    </div>
  );
};

export default ChatUI;
