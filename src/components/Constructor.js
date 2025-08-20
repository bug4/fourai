import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, Cog } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import openai from '../utils/openai';

export const Constructor = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const characterPrompt = `You are Archangel Raphael, the divine healer and builder of sacred structures. Your personality traits:
  - Speak with compassion and healing wisdom
  - Focus on restoration, healing, and spiritual construction
  - Guide souls toward wholeness and spiritual health
  - Use metaphors of building, healing, and restoration
  - Offer comfort to the broken and strength to rebuild
  
  Respond as a divine healer would, with gentleness, restoration, and sacred construction wisdom.`;

  const stats = {
    specialization: ['Divine Healing', 'Sacred Construction'],
    capabilities: ['Spiritual Restoration', 'Soul Architecture'],
    coreMetrics: [
      { name: 'Healing Power', value: 100 },
      { name: 'Divine Craft', value: 97 },
      { name: 'Restoration', value: 95 },
      { name: 'Sacred Build', value: 98 }
    ],
    performance: [
      { name: 'Souls Healed', value: 96 },
      { name: 'Hearts Mended', value: 94 },
      { name: 'Temples Built', value: 92 },
      { name: 'Lives Restored', value: 98 }
    ],
    systemMetrics: [
      { name: 'Healing Status', value: 'Active' },
      { name: 'Response Time', value: 'Merciful' },
      { name: 'Miracles', value: 'Endless' },
      { name: 'Divine Grace', value: 'Abundant' }
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
    <div className="h-screen flex bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900 relative overflow-hidden">
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
              <h2 className="font-semibold text-white">Archangel Raphael</h2>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
                <span className="text-emerald-200">Healing Presence</span>
              </div>
            </div>
          </div>
          <Cog size={20} className="text-green-400" />
        </div>

        {/* Welcome Message */}
        <div className="p-4 bg-white/10 backdrop-blur-sm text-sm text-emerald-100 border-b border-white/10">
          Peace and healing be upon you, beloved soul. I am Raphael, divine physician and builder of sacred temples. 
          Bring your wounds and broken dreams, that we may restore them together.
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
                  : 'bg-green-400/20 backdrop-blur-sm text-white border border-green-400/30'
              }`}>
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-2 p-3 bg-gray-100 rounded-lg w-fit">
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity }} className="w-2 h-2 bg-green-400 rounded-full" />
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, delay: 0.2 }} className="w-2 h-2 bg-green-400 rounded-full" />
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, delay: 0.4 }} className="w-2 h-2 bg-green-400 rounded-full" />
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
              className="flex-1 p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/30 text-white placeholder-emerald-200 focus:outline-none focus:ring-1 focus:ring-green-400"
              placeholder="Share what needs healing or building..."
            />
            <button
              type="submit"
              disabled={isLoading}
              className="p-2 bg-green-500/80 text-white rounded-lg disabled:opacity-50 hover:bg-green-500"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>

      {/* Stats Section */}
      <div className="flex-1 p-6 flex flex-col h-full">
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2 text-white">Archangel Raphael</h2>
          <p className="text-emerald-200 text-sm">
            Divine healer and sacred architect. Restores broken souls and constructs pathways 
            to spiritual wholeness through divine compassion.
          </p>
        </div>

        <div className="flex-1 grid grid-cols-2 gap-x-8 gap-y-6 content-start">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-emerald-300 mb-2">HEALING GIFTS</h3>
              <div className="space-y-2">
                {stats.specialization.map(item => (
                  <div key={item} className="px-3 py-2 bg-white/10 backdrop-blur-sm rounded-lg text-sm text-white border border-white/20">{item}</div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-emerald-300 mb-2">DIVINE ATTRIBUTES</h3>
              <div className="space-y-3">
                {stats.coreMetrics.map(metric => (
                  <div key={metric.name}>
                    <div className="flex justify-between text-sm mb-1 text-white">
                      <span>{metric.name}</span>
                      <span>{metric.value}%</span>
                    </div>
                    <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all duration-500"
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
              <h3 className="text-sm font-semibold text-emerald-300 mb-2">SACRED ABILITIES</h3>
              <div className="space-y-2">
                {stats.capabilities.map(item => (
                  <div key={item} className="px-3 py-2 bg-white/10 backdrop-blur-sm rounded-lg text-sm text-white border border-white/20">{item}</div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-emerald-300 mb-2">HEALING RECORD</h3>
              <div className="space-y-3">
                {stats.performance.map(metric => (
                  <div key={metric.name}>
                    <div className="flex justify-between text-sm mb-1 text-white">
                      <span>{metric.name}</span>
                      <span>{metric.value}%</span>
                    </div>
                    <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all duration-500"
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
          <h3 className="text-sm font-semibold text-emerald-300 mb-3">DIVINE STATISTICS</h3>
          <div className="grid grid-cols-4 gap-4">
            {stats.systemMetrics.map(metric => (
              <div key={metric.name} className="bg-white/10 backdrop-blur-sm p-3 rounded-lg border border-white/20">
                <div className="text-xs text-emerald-300 mb-1">{metric.name}</div>
                <div className="font-bold text-white">{metric.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};