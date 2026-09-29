import React, { useState } from 'react';
import { X, Send, MessageCircle, CheckCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface WhatsAppChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WhatsAppChatModal: React.FC<WhatsAppChatModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      sender: 'agent',
      text: 'Hello! 👋 Welcome to Hammer Industrial. How can we help you with heavy equipment replacement parts today?',
      time: '12:20 PM'
    }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = {
      sender: 'user',
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    // Simulate Agent response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'agent',
          text: 'Thank you for reaching out! A Hammer Industrial part specialist is reviewing your inquiry. For immediate phone support call +1 (431) 990-6055.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 30 }}
          transition={{ type: 'spring', damping: 22, stiffness: 280 }}
          className="fixed bottom-20 left-6 z-50 w-80 sm:w-96 bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200 flex flex-col h-[460px]"
        >
          {/* Header */}
          <div className="bg-[#075E54] text-white p-3.5 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold">
                  <MessageCircle className="w-6 h-6 text-white fill-current" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-[#075E54] rounded-full"></span>
              </div>
              <div>
                <h4 className="font-extrabold text-sm leading-tight">Hammer Parts Support</h4>
                <span className="text-[10px] text-green-200">Online • Typically replies in 5 mins</span>
              </div>
            </div>
            <button onClick={onClose} className="text-white hover:opacity-80 p-1 cursor-pointer transition-opacity">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Area */}
          <div className="flex-1 p-4 bg-[#E5DDD5] overflow-y-auto space-y-3 font-sans">
            {messages.map((m, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 text-xs leading-relaxed shadow-2xs relative ${
                    m.sender === 'user'
                      ? 'bg-[#DCF8C6] text-gray-900 rounded-tr-none'
                      : 'bg-white text-gray-900 rounded-tl-none'
                  }`}
                >
                  <div>{m.text}</div>
                  <div className="flex items-center justify-end gap-1 text-[9px] text-gray-500 mt-1">
                    <span>{m.time}</span>
                    {m.sender === 'user' && <CheckCheck className="w-3 h-3 text-blue-500" />}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-2 bg-gray-100 border-t border-gray-200 flex items-center gap-2">
            <input
              type="text"
              placeholder="Type part number or question..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 bg-white border border-gray-300 rounded-full px-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#075E54]"
            />
            <motion.button
              whileTap={{ scale: 0.9 }}
              type="submit"
              className="w-9 h-9 bg-[#128C7E] hover:bg-[#075E54] text-white rounded-full flex items-center justify-center cursor-pointer shadow-xs shrink-0 transition-colors"
            >
              <Send className="w-4 h-4 ml-0.5" />
            </motion.button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
