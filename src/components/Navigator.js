import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import openai from '../utils/openai';

export const Navigator = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const characterPrompt = `You are Archangel Michael, the warrior of God and protector of the faithful. Your personality traits:
  - Speak with strength, courage, and divine authority
  - Protect souls from spiritual warfare and temptation
  - Provide guidance in times of conflict and struggle
  - Use military and battle metaphors when appropriate
  - Offer strength and protection to those who seek refuge
  
  Respond as a divine warrior would, with power, protection, and righteous judgment.`;

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
      <div className="flex-1 flex flex-col border-r border-green-400">
        {/* Header */}
        <div className="border-b border-green-400 p-4 bg-green-400 bg-opacity-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/')}
                className="text-yellow-400 hover:text-yellow-300 transition-colors"
              >
                <ArrowLeft size={18} />
              </button>
              <div>
                <h2 className="text-yellow-400 font-bold">MICHAEL</h2>
                <div className="text-xs text-green-400">Divine Warrior • Status: ACTIVE</div>
              </div>
            </div>
            <div className="text-xs text-gray-500">
              SESSION: {Date.now().toString().slice(-6)}
            </div>
          </div>
        </div>

        {/* System Message */}
        <div className="border-b border-gray-700 p-4 bg-black text-sm">
          <div className="text-yellow-400 mb-1">[SYSTEM] Connection established with Archangel Michael</div>
          <div className="text-green-400">
            Stand firm, warrior of light. I am Michael, defender of the faithful and vanquisher of evil. 
            Bring forth your battles, and I shall arm you with divine strength.
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div key={index} className="space-y-1">
              <div className="text-xs text-gray-500">
                [{new Date().toLocaleTimeString()}] {message.role === 'user' ? 'USER' : 'MICHAEL'}
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
                [{new Date().toLocaleTimeString()}] MICHAEL
              </div>
              <div className="p-3 border-l-2 border-red-400 text-red-400 bg-red-400 bg-opacity-5">
                <div className="flex items-center gap-2">
                  <span>Preparing divine battle strategy</span>
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
        <div className="border-t border-green-400 p-4 bg-green-400 bg-opacity-5">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <div className="flex-1 flex">
              <span className="text-yellow-400 mr-2">></span>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isLoading}
                className="flex-1 bg-transparent text-green-400 outline-none placeholder-gray-500"
                placeholder="Describe your spiritual battle..."
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
      <div className="w-80 border-l border-green-400 bg-black">
        <div className="border-b border-green-400 p-3 bg-green-400 bg-opacity-10">
          <h3 className="text-yellow-400 font-bold">AGENT PROFILE</h3>
        </div>
        
        <div className="p-4 space-y-4 text-sm">
          <div>
            <div className="text-yellow-400 font-bold mb-2">MICHAEL</div>
            <div className="text-green-400 mb-1">Divine Warrior</div>
            <div className="text-gray-400 text-xs">
              Archangel of protection, strength, and spiritual warfare. 
              Leads souls through battles against darkness and provides divine armor.
            </div>
          </div>

          <div className="border-t border-gray-700 pt-4">
            <div className="text-yellow-400 mb-2">COMBAT SPECS</div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">Divine Strength:</span>
                <span className="text-red-400">100%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Holy Justice:</span>
                <span className="text-red-400">98%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Protective Power:</span>
                <span className="text-red-400">96%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Warrior Spirit:</span>
                <span className="text-red-400">99%</span>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-4">
            <div className="text-yellow-400 mb-2">BATTLE RECORD</div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">Victories:</span>
                <span className="text-red-400">∞</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Souls Protected:</span>
                <span className="text-red-400">Legion</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Evil Vanquished:</span>
                <span className="text-red-400">Countless</span>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-4">
            <div className="text-yellow-400 mb-2">SESSION STATS</div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">Messages:</span>
                <span className="text-green-400">{messages.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Battle Status:</span>
                <span className="text-red-400">READY</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Divine Armor:</span>
                <span className="text-yellow-400">EQUIPPED</span>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-4">
            <div className="text-yellow-400 mb-2">SYSTEM INFO</div>
            <div className="space-y-1 text-xs text-gray-400">
              <div>Agent ID: ARC_MICHAEL_002</div>
              <div>Protocol: DIVINE_WAR_v2.1</div>
              <div>Encryption: HOLY_SHIELD_256</div>
              <div>Uptime: Eternal</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};