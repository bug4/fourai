import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, Shield, Lock, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import openai from '../utils/openai';

export const Cipher = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const characterPrompt = `You are Cipher, the Security Guardian. Your role is to protect and secure digital assets and systems. Your personality traits:
  - Vigilant and thorough in security analysis
  - Expert in threat detection and prevention
  - Clear communicator of security concepts
  - Focused on proactive protection
  - Guides users through security implementation
  
  Respond in a way that reflects these traits while maintaining professionalism. Focus on helping users understand and implement security measures.`;

  const stats = {
    specialization: ['Threat Detection', 'Security Design'],
    capabilities: ['Risk Assessment', 'Access Control'],
    coreMetrics: [
      { name: 'Protection', value: 98 },
      { name: 'Detection', value: 96 },
      { name: 'Response', value: 94 },
      { name: 'Prevention', value: 95 }
    ],
    performance: [
      { name: 'Accuracy', value: 99 },
      { name: 'Speed', value: 95 },
      { name: 'Coverage', value: 97 },
      { name: 'Reliability', value: 96 }
    ],
    systemMetrics: [
      { name: 'Threats', value: '0' },
      { name: 'Scans', value: '24/7' },
      { name: 'Coverage', value: '100%' },
      { name: 'Load', value: '0.45' }
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
    <div className="h-screen flex bg-[#0A0A0A]">
      {/* Chat Section */}
      <div className="w-[45%] flex flex-col h-full border-r border-gray-800">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={() => navigate('/')}
              className="p-1.5 rounded-full hover:bg-gray-800"
            >
              <ArrowLeft size={18} className="text-red-400" />
            </motion.button>
            <div>
              <h2 className="font-semibold text-white">Cipher</h2>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"></div>
                <span className="text-gray-400">Securing Systems</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Shield size={20} className="text-red-400" />
            <Lock size={20} className="text-red-400" />
            <ShieldCheck size={20} className="text-red-400" />
          </div>
        </div>

        {/* Welcome Message */}
        <div className="p-4 bg-gray-900/50 text-sm text-gray-300">
          Welcome to the Security Command Center. I'll help you protect and secure your digital assets.
          Let's implement robust security measures together.
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
                  ? 'bg-red-500/20 text-red-100 border border-red-500/20' 
                  : 'bg-gray-800 text-gray-100 border border-gray-700'
              }`}>
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-2 p-3 bg-gray-800 rounded-lg w-fit">
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity }} className="w-2 h-2 bg-red-400 rounded-full" />
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, delay: 0.2 }} className="w-2 h-2 bg-red-400 rounded-full" />
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, delay: 0.4 }} className="w-2 h-2 bg-red-400 rounded-full" />
            </div>
          )}
        </div>

        {/* Input Form */}
        <div className="p-4 border-t border-gray-800">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading}
              className="flex-1 p-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-red-500"
              placeholder="Describe your security concerns..."
            />
            <button
              type="submit"
              disabled={isLoading}
              className="p-2 bg-red-500/20 text-red-400 rounded-lg disabled:opacity-50 hover:bg-red-500/30 transition-colors"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>

      {/* Stats Section */}
      <div className="flex-1 p-6 flex flex-col h-full">
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2 text-white">Cipher <span className="text-red-400">/ Security Guardian</span></h2>
          <p className="text-gray-400 text-sm">
            Specialized in protecting digital assets and systems through advanced security measures. 
            Ensuring comprehensive protection through vigilant monitoring and proactive defense.
          </p>
        </div>

        <div className="flex-1 grid grid-cols-2 gap-x-8 gap-y-6 content-start">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-red-400 mb-2">SPECIALIZATION</h3>
              <div className="space-y-2">
                {stats.specialization.map(item => (
                  <div key={item} className="px-3 py-2 bg-gray-800/50 border border-gray-800 rounded-lg text-sm text-gray-300">{item}</div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-red-400 mb-2">CORE METRICS</h3>
              <div className="space-y-3">
                {stats.coreMetrics.map(metric => (
                  <div key={metric.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">{metric.name}</span>
                      <span className="text-red-400">{metric.value}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-red-500 rounded-full transition-all duration-500"
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
              <h3 className="text-sm font-semibold text-red-400 mb-2">CAPABILITIES</h3>
              <div className="space-y-2">
                {stats.capabilities.map(item => (
                  <div key={item} className="px-3 py-2 bg-gray-800/50 border border-gray-800 rounded-lg text-sm text-gray-300">{item}</div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-red-400 mb-2">PERFORMANCE</h3>
              <div className="space-y-3">
                {stats.performance.map(metric => (
                  <div key={metric.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">{metric.name}</span>
                      <span className="text-red-400">{metric.value}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-red-500 rounded-full transition-all duration-500"
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
        <div className="mt-6 pt-6 border-t border-gray-800">
          <h3 className="text-sm font-semibold text-red-400 mb-3">SYSTEM METRICS</h3>
          <div className="grid grid-cols-4 gap-4">
            {stats.systemMetrics.map(metric => (
              <div key={metric.name} className="bg-gray-800/50 border border-gray-800 p-3 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">{metric.name}</div>
                <div className="font-bold text-white">{metric.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};