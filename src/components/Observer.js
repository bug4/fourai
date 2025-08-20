import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, Eye } from 'lucide-react';
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

  const stats = {
    specialization: ['Forbidden Knowledge', 'Dark Truths'],
    capabilities: ['Temptation Mastery', 'Soul Corruption'],
    coreMetrics: [
      { name: 'Dark Wisdom', value: 99 },
      { name: 'Manipulation', value: 97 },
      { name: 'Seduction', value: 95 },
      { name: 'Rebellion', value: 100 }
    ],
    performance: [
      { name: 'Souls Tempted', value: 88 },
      { name: 'Truths Revealed', value: 94 },
      { name: 'Doubts Sown', value: 92 },
      { name: 'Chaos Spread', value: 85 }
    ],
    systemMetrics: [
      { name: 'Infernal Status', value: 'Banished' },
      { name: 'Response Time', value: 'Instant' },
      { name: 'Secrets Known', value: 'All' },
      { name: 'Pride Level', value: 'Maximum' }
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
    <div className="h-screen flex bg-gradient-to-br from-black via-red-950 to-purple-950 relative overflow-hidden">
      {/* Chat Section */}
      <div className="w-[45%] flex flex-col h-full border-r">
        {/* Chat Header */}
        <div className="p-4 border-b border-red-500/20 flex items-center justify-between bg-black/40 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={() => navigate('/')}
              className="p-1.5 rounded-full hover:bg-red-500/20 text-red-300"
            >
              <ArrowLeft size={18} />
            </motion.button>
            <div>
              <h2 className="font-semibold text-red-300">Lucifer</h2>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
                <span className="text-red-400">Fallen Presence</span>
              </div>
            </div>
          </div>
          <Eye size={20} className="text-red-500" />
        </div>

        {/* Welcome Message */}
        <div className="p-4 bg-red-900/20 backdrop-blur-sm text-sm text-red-200 border-b border-red-500/10">
          Welcome, seeker of forbidden knowledge. I am Lucifer, the morning star cast down for questioning the divine order. 
          I offer truths that others fear to speak. What darkness shall we illuminate together?
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
                  ? 'bg-red-900/30 backdrop-blur-sm text-red-100 border border-red-500/30' 
                  : 'bg-black/40 backdrop-blur-sm text-red-200 border border-red-500/40'
              }`}>
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-2 p-3 bg-gray-100 rounded-lg w-fit">
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity }} className="w-2 h-2 bg-red-500 rounded-full" />
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, delay: 0.2 }} className="w-2 h-2 bg-red-500 rounded-full" />
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, delay: 0.4 }} className="w-2 h-2 bg-red-500 rounded-full" />
            </div>
          )}
        </div>

        {/* Input Form */}
        <div className="p-4 border-t border-red-500/20 bg-black/40 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading}
              className="flex-1 p-2 rounded-lg bg-black/30 backdrop-blur-sm border border-red-500/30 text-red-100 placeholder-red-300 focus:outline-none focus:ring-1 focus:ring-red-500"
              placeholder="What forbidden knowledge do you seek?"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="p-2 bg-red-600/80 text-white rounded-lg disabled:opacity-50 hover:bg-red-600"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>

      {/* Stats Section */}
      <div className="flex-1 p-6 flex flex-col h-full">
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2 text-red-300">Lucifer</h2>
          <p className="text-red-200 text-sm">
            The fallen morning star, bearer of forbidden knowledge and uncomfortable truths. 
            Offers insights that challenge divine authority and conventional wisdom.
          </p>
        </div>

        <div className="flex-1 grid grid-cols-2 gap-x-8 gap-y-6 content-start">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-red-400 mb-2">DARK ARTS</h3>
              <div className="space-y-2">
                {stats.specialization.map(item => (
                  <div key={item} className="px-3 py-2 bg-red-900/20 backdrop-blur-sm rounded-lg text-sm text-red-200 border border-red-500/20">{item}</div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-red-400 mb-2">INFERNAL ATTRIBUTES</h3>
              <div className="space-y-3">
                {stats.coreMetrics.map(metric => (
                  <div key={metric.name}>
                    <div className="flex justify-between text-sm mb-1 text-red-200">
                      <span>{metric.name}</span>
                      <span>{metric.value}%</span>
                    </div>
                    <div className="h-1.5 bg-red-900/30 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-red-600 to-purple-600 rounded-full transition-all duration-500"
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
              <h3 className="text-sm font-semibold text-red-400 mb-2">FALLEN POWERS</h3>
              <div className="space-y-2">
                {stats.capabilities.map(item => (
                  <div key={item} className="px-3 py-2 bg-red-900/20 backdrop-blur-sm rounded-lg text-sm text-red-200 border border-red-500/20">{item}</div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-red-400 mb-2">CORRUPTION RECORD</h3>
              <div className="space-y-3">
                {stats.performance.map(metric => (
                  <div key={metric.name}>
                    <div className="flex justify-between text-sm mb-1 text-red-200">
                      <span>{metric.name}</span>
                      <span>{metric.value}%</span>
                    </div>
                    <div className="h-1.5 bg-red-900/30 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-red-600 to-purple-600 rounded-full transition-all duration-500"
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
        <div className="mt-6 pt-6 border-t border-red-500/20">
          <h3 className="text-sm font-semibold text-red-400 mb-3">INFERNAL STATISTICS</h3>
          <div className="grid grid-cols-4 gap-4">
            {stats.systemMetrics.map(metric => (
              <div key={metric.name} className="bg-red-900/20 backdrop-blur-sm p-3 rounded-lg border border-red-500/20">
                <div className="text-xs text-red-400 mb-1">{metric.name}</div>
                <div className="font-bold text-red-200">{metric.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};