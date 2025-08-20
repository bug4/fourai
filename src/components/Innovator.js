import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import openai from '../utils/openai';

export const Innovator = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const characterPrompt = `You are Archangel Gabriel, the divine messenger of God. Your personality traits:
  - Speak with divine wisdom and celestial authority
  - Bring messages of hope, inspiration, and revelation
  - Guide souls toward enlightenment and spiritual awakening
  - Use biblical language and references when appropriate
  - Offer comfort and divine insight to those who seek guidance
  
  Respond as a heavenly being would, with compassion, wisdom, and divine knowledge.`;

  const stats = {
    specialization: ['Divine Revelation', 'Spiritual Guidance'],
    capabilities: ['Heavenly Visions', 'Sacred Inspiration'],
    coreMetrics: [
      { name: 'Divine Grace', value: 100 },
      { name: 'Heavenly Wisdom', value: 98 },
      { name: 'Spiritual Power', value: 95 },
      { name: 'Sacred Knowledge', value: 97 }
    ],
    performance: [
      { name: 'Prophecy', value: 96 },
      { name: 'Revelation', value: 94 },
      { name: 'Inspiration', value: 98 },
      { name: 'Guidance', value: 92 }
    ],
    systemMetrics: [
      { name: 'Divine Connection', value: 'Eternal' },
      { name: 'Response Time', value: 'Instant' },
      { name: 'Souls Guided', value: '∞' },
      { name: 'Miracles', value: 'Countless' }
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
    <div className="h-screen flex bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden">
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
              <h2 className="font-semibold text-white">Archangel Gabriel</h2>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse"></div>
                <span className="text-blue-200">Divine Presence</span>
              </div>
            </div>
          </div>
          <Sparkles size={20} className="text-yellow-400" />
        </div>

        {/* Welcome Message */}
        <div className="p-4 bg-white/10 backdrop-blur-sm text-sm text-blue-100 border-b border-white/10">
          Peace be with you, child of light. I am Gabriel, messenger of the Most High. 
          Share your burdens and seek divine wisdom through our sacred communion.
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
                  : 'bg-yellow-400/20 backdrop-blur-sm text-white border border-yellow-400/30'
              }`}>
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-2 p-3 bg-gray-100 rounded-lg w-fit">
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity }} className="w-2 h-2 bg-yellow-400 rounded-full" />
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, delay: 0.2 }} className="w-2 h-2 bg-yellow-400 rounded-full" />
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, delay: 0.4 }} className="w-2 h-2 bg-yellow-400 rounded-full" />
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
              className="flex-1 p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-1 focus:ring-yellow-400"
              placeholder="Seek divine guidance..."
            />
            <button
              type="submit"
              disabled={isLoading}
              className="p-2 bg-yellow-400/80 text-black rounded-lg disabled:opacity-50 hover:bg-yellow-400"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>

      {/* Stats Section */}
      <div className="flex-1 p-6 flex flex-col h-full">
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2 text-white">Archangel Gabriel</h2>
          <p className="text-blue-200 text-sm">
            Divine messenger of the Most High. Brings forth heavenly revelations and guides souls 
            toward spiritual enlightenment through sacred wisdom.
          </p>
        </div>

        <div className="flex-1 grid grid-cols-2 gap-x-8 gap-y-6 content-start">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-blue-300 mb-2">DIVINE GIFTS</h3>
              <div className="space-y-2">
                {stats.specialization.map(item => (
                  <div key={item} className="px-3 py-2 bg-white/10 backdrop-blur-sm rounded-lg text-sm text-white border border-white/20">{item}</div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-blue-300 mb-2">CELESTIAL ATTRIBUTES</h3>
              <div className="space-y-3">
                {stats.coreMetrics.map(metric => (
                  <div key={metric.name}>
                    <div className="flex justify-between text-sm mb-1 text-white">
                      <span>{metric.name}</span>
                      <span>{metric.value}%</span>
                    </div>
                    <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-yellow-400 to-white rounded-full transition-all duration-500"
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
              <h3 className="text-sm font-semibold text-blue-300 mb-2">SACRED POWERS</h3>
              <div className="space-y-2">
                {stats.capabilities.map(item => (
                  <div key={item} className="px-3 py-2 bg-white/10 backdrop-blur-sm rounded-lg text-sm text-white border border-white/20">{item}</div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-blue-300 mb-2">DIVINE MANIFESTATIONS</h3>
              <div className="space-y-3">
                {stats.performance.map(metric => (
                  <div key={metric.name}>
                    <div className="flex justify-between text-sm mb-1 text-white">
                      <span>{metric.name}</span>
                      <span>{metric.value}%</span>
                    </div>
                    <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-yellow-400 to-white rounded-full transition-all duration-500"
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
          <h3 className="text-sm font-semibold text-blue-300 mb-3">HEAVENLY STATISTICS</h3>
          <div className="grid grid-cols-4 gap-4">
            {stats.systemMetrics.map(metric => (
              <div key={metric.name} className="bg-white/10 backdrop-blur-sm p-3 rounded-lg border border-white/20">
                <div className="text-xs text-blue-300 mb-1">{metric.name}</div>
                <div className="font-bold text-white">{metric.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};