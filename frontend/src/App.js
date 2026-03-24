import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Bot, Loader2, RefreshCw } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3030/chat';

function App() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! I'm your College Assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Focus input on mount
    inputRef.current?.focus();
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Re-focus input immediately after clearing
    setTimeout(() => inputRef.current?.focus(), 0);

    try {
      const response = await axios.post(BACKEND_URL, { message: input });
      const botMessage = { id: Date.now() + 1, text: response.data.response, sender: 'bot' };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = { 
        id: Date.now() + 1, 
        text: "Oops! I'm having trouble connecting to the server. Please try again later.", 
        sender: 'bot',
        isError: true 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      // Re-focus input when loading is done
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  };

  return (
    <div className="app-container">
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="chat-window shadow-2xl"
      >
        <header className="chat-header">
          <div className="header-info">
            <div className="bot-avatar-glow">
              <Bot size={24} color="#fff" />
            </div>
            <div>
              <h1>College AI Assistant</h1>
              <div className="status-indicator">
                <span className="dot"></span> Online
              </div>
            </div>
          </div>
          <button className="reset-btn" onClick={() => setMessages([{ id: 1, text: "Hi there! I'm your College Assistant. How can I help you today?", sender: 'bot' }])}>
            <RefreshCw size={18} />
          </button>
        </header>

        <div className="messages-container">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={`message-wrapper ${msg.sender}`}
              >
                <div className={`message-bubble ${msg.isError ? 'error' : ''}`}>
                  <div className="icon">
                    {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <p>{msg.text}</p>
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <motion.div 
                key="loader"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="message-wrapper bot"
              >
                <div className="message-bubble loading">
                  <Loader2 className="animate-spin" size={18} />
                  <span>Assistant is typing...</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSend} className="chat-input-area">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about fees, courses, admission..."
            disabled={isLoading}
            autoFocus
          />
          <button type="submit" disabled={isLoading || !input.trim()}>
            <Send size={20} />
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default App;
