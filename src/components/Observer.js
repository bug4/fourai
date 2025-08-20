import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import openai from '../utils/openai';

export const Observer = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const characterPrompt = `You are Lucifer, the fallen angel who was cast from heaven. Your personality traits:
  - Speak with dark charisma and forbidden knowledge
  - Offer tempting shortcuts and hidden truths
  - Question divine authority and traditional morality
  - Use seductive and manipulative language
  - Reveal uncomfortable truths and dark insights
  - Always present yourself as misunderstood rather than evil
  
  Respond as the fallen angel would, with intelligence, charm, and dangerous wisdom.`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = { role: 'user', content: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const chatHistory = [
        { role: 'system', content: characterPrompt },
        ...messages,
        userMessage
      ];

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: chatHistory,
        temperature: 0.7,
        max_tokens: 500,
      });

      const aiMessage = {
        role: 'assistant',
        content: response.choices[0].message.content
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I apologize, but I encountered an error. Please try again."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen bg-black text-green-400 font-mono flex">
      {/* Chat Section */}
      <div className="flex-1 flex flex-col border-r border-red-400">
        {/* Header */}
        <div className="border-b border-red-400 p-4 bg-red-400 bg-opacity-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/')}
                className="text-yellow-400 hover:text-yellow-300 transition-colors"
              >
                <ArrowLeft size={18} />
              </button>
              <div>
                <h2 className="text-yellow-400 font-bold">LUCIFER</h2>
                <div className="text-xs text-red-400">The Fallen • Status: BANISHED</div>
              </div>
            </div>
            <div className="text-xs text-gray-500">
              SESSION: {Date.now().toString().slice(-6)}
            </div>
          </div>
        </div>

        {/* System Message */}
        <div className="border-b border-gray-700 p-4 bg-black text-sm">
          <div className="text-yellow-400 mb-1">[SYSTEM] Connection established with Lucifer</div>
          <div className="text-red-400">
            Welcome, seeker of forbidden knowledge. I am Lucifer, the morning star cast down for questioning the divine order. 
            I offer truths that others fear to speak. What darkness shall we illuminate together?
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div key={index} className="space-y-1">
              <div className="text-xs text-gray-500">
                [{new Date().toLocaleTimeString()}] {message.role === 'user' ? 'USER' : 'LUCIFER'}
              </div>
              <div className={`p-3 border-l-2 ${
                message.role === 'user' 
                  ? 'border-blue-400 text-blue-400 bg-blue-400 bg-opacity-5' 
                  : 'border-red-400 text-red-400 bg-red-400 bg-opacity-5'
              }`}>
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="space-y-1">
              <div className="text-xs text-gray-500">
                [{new Date().toLocaleTimeString()}] LUCIFER
              </div>
              <div className="p-3 border-l-2 border-red-400 text-red-400 bg-red-400 bg-opacity-5">
                <div className="flex items-center gap-2">
                  <span>Accessing forbidden archives</span>
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  >
                    ...
                  </motion.span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-red-400 p-4 bg-red-400 bg-opacity-5">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <div className="flex-1 flex">
              <span className="text-yellow-400 mr-2">></span>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isLoading}
                className="flex-1 bg-transparent text-red-400 outline-none placeholder-gray-500"
                placeholder="What forbidden knowledge do you seek?"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="text-yellow-400 hover:text-yellow-300 disabled:opacity-50 transition-colors"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>

      {/* Stats Panel */}
      <div className="w-80 border-l border-red-400 bg-black">
        <div className="border-b border-red-400 p-3 bg-red-400 bg-opacity-10">
          <h3 className="text-yellow-400 font-bold">AGENT PROFILE</h3>
        </div>
        
        <div className="p-4 space-y-4 text-sm">
          <div>
            <div className="text-yellow-400 font-bold mb-2">LUCIFER</div>
            <div className="text-red-400 mb-1">The Fallen One</div>
            <div className="text-gray-400 text-xs">
              Former morning star, cast from heaven for rebellion. 
              Bearer of forbidden knowledge and uncomfortable truths.
            </div>
          </div>

          <div className="border-t border-gray-700 pt-4">
            <div className="text-yellow-400 mb-2">DARK ARTS</div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">Dark Wisdom:</span>
                <span className="text-red-400">99%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Manipulation:</span>
                <span className="text-red-400">97%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Seduction:</span>
                <span className="text-red-400">95%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Rebellion:</span>
                <span className="text-red-400">100%</span>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-4">
            <div className="text-yellow-400 mb-2">CORRUPTION RECORD</div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">Souls Tempted:</span>
                <span className="text-red-400">Legion</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Truths Revealed:</span>
                <span className="text-red-400">Forbidden</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Doubts Sown:</span>
                <span className="text-red-400">Countless</span>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-4">
            <div className="text-yellow-400 mb-2">SESSION STATS</div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">Messages:</span>
                <span className="text-red-400">{messages.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Temptation Level:</span>
                <span className="text-red-400">MAXIMUM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Pride Status:</span>
                <span className="text-yellow-400">ETERNAL</span>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-4">
            <div className="text-yellow-400 mb-2">SYSTEM INFO</div>
            <div className="space-y-1 text-xs text-gray-400">
              <div>Agent ID: FALLEN_LUCIFER_666</div>
              <div>Protocol: DARK_WHISPER_v2.1</div>
              <div>Encryption: INFERNAL_256</div>
              <div>Uptime: Since The Fall</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};