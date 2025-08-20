import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, Compass } from 'lucide-react';
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

  const stats = {
    specialization: ['Divine Protection', 'Spiritual Warfare'],
    capabilities: ['Righteous Judgment', 'Holy Defense'],
    coreMetrics: [
      { name: 'Divine Strength', value: 100 },
      { name: 'Holy Justice', value: 98 },
      { name: 'Protective Power', value: 96 },
      { name: 'Warrior Spirit', value: 99 }
    ],
    performance: [
      { name: 'Battles Won', value: 100 },
      { name: 'Souls Protected', value: 97 },
      { name: 'Evil Vanquished', value: 95 },
      { name: 'Divine Shield', value: 98 }
    ],
    systemMetrics: [
      { name: 'Guardian Status', value: 'Active' },
      { name: 'Response Time', value: 'Lightning' },
      { name: 'Demons Defeated', value: 'Legion' },
      { name: 'Divine Armor', value: 'Impenetrable' }
    ]
  };

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
    <div className="h-screen flex bg-gradient-to-br from-red-900 via-orange-900 to-yellow-900 relative overflow-hidden">
      {/* Chat Section */}
      <div className="w-[45%] flex flex-col h-full border-r">
        {/* Chat Header */}
        <div className="p-4 border-b border-white/20 flex items-center justify-between bg-black/20 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={() => navigate('/')}
              className="p-1.5 rounded-full hover:bg-white/20 text-white"
            >
              <ArrowLeft size={18} />
            </motion.button>
            <div>
              <h2 className="font-semibold text-white">Archangel Michael</h2>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"></div>
                <span className="text-orange-200">Battle Ready</span>
              </div>
            </div>
          </div>
          <Compass size={20} className="text-red-400" />
        </div>

        {/* Welcome Message */}
        <div className="p-4 bg-white/10 backdrop-blur-sm text-sm text-orange-100 border-b border-white/10">
          Stand firm, warrior of light. I am Michael, defender of the faithful and vanquisher of evil. 
          Bring forth your battles, and I shall arm you with divine strength.
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] rounded-lg p-3 ${
                message.role === 'user' 
                  ? 'bg-white/20 backdrop-blur-sm text-white border border-white/30' 
                  : 'bg-red-400/20 backdrop-blur-sm text-white border border-red-400/30'
              }`}>
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-2 p-3 bg-gray-100 rounded-lg w-fit">
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity }} className="w-2 h-2 bg-red-400 rounded-full" />
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, delay: 0.2 }} className="w-2 h-2 bg-red-400 rounded-full" />
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, delay: 0.4 }} className="w-2 h-2 bg-red-400 rounded-full" />
            </div>
          )}
        </div>

        {/* Input Form */}
        <div className="p-4 border-t border-white/20 bg-black/20 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading}
              className="flex-1 p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/30 text-white placeholder-orange-200 focus:outline-none focus:ring-1 focus:ring-red-400"
              placeholder="Describe your spiritual battle..."
            />
            <button
              type="submit"
              disabled={isLoading}
              className="p-2 bg-red-500/80 text-white rounded-lg disabled:opacity-50 hover:bg-red-500"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>

      {/* Stats Section */}
      <div className="flex-1 p-6 flex flex-col h-full">
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2 text-white">Archangel Michael</h2>
          <p className="text-orange-200 text-sm">
            Divine warrior and protector of the faithful. Leads souls through spiritual battles 
            and provides strength against the forces of darkness.
          </p>
        </div>

        <div className="flex-1 grid grid-cols-2 gap-x-8 gap-y-6 content-start">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-orange-300 mb-2">DIVINE ARSENAL</h3>
              <div className="space-y-2">
                {stats.specialization.map(item => (
                  <div key={item} className="px-3 py-2 bg-white/10 backdrop-blur-sm rounded-lg text-sm text-white border border-white/20">{item}</div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-orange-300 mb-2">WARRIOR ATTRIBUTES</h3>
              <div className="space-y-3">
                {stats.coreMetrics.map(metric => (
                  <div key={metric.name}>
                    <div className="flex justify-between text-sm mb-1 text-white">
                      <span>{metric.name}</span>
                      <span>{metric.value}%</span>
                    </div>
                    <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-red-500 to-orange-400 rounded-full transition-all duration-500"
                        style={{ width: `${metric.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-orange-300 mb-2">BATTLE SKILLS</h3>
              <div className="space-y-2">
                {stats.capabilities.map(item => (
                  <div key={item} className="px-3 py-2 bg-white/10 backdrop-blur-sm rounded-lg text-sm text-white border border-white/20">{item}</div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-orange-300 mb-2">VICTORY RECORD</h3>
              <div className="space-y-3">
                {stats.performance.map(metric => (
                  <div key={metric.name}>
                    <div className="flex justify-between text-sm mb-1 text-white">
                      <span>{metric.name}</span>
                      <span>{metric.value}%</span>
                    </div>
                    <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-red-500 to-orange-400 rounded-full transition-all duration-500"
                        style={{ width: `${metric.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* System Metrics */}
        <div className="mt-6 pt-6 border-t border-white/20">
          <h3 className="text-sm font-semibold text-orange-300 mb-3">DIVINE STATISTICS</h3>
          <div className="grid grid-cols-4 gap-4">
            {stats.systemMetrics.map(metric => (
              <div key={metric.name} className="bg-white/10 backdrop-blur-sm p-3 rounded-lg border border-white/20">
                <div className="text-xs text-orange-300 mb-1">{metric.name}</div>
                <div className="font-bold text-white">{metric.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};