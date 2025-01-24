import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, Map, Layers, Globe2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import openai from '../utils/openai';

export const Atlas = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const characterPrompt = `You are Atlas, the Data Cartographer. Your role is to map and visualize complex data landscapes. Your personality traits:
  - Methodical and structured in data organization
  - Expert in data visualization and mapping
  - Clear communicator of complex relationships
  - Focused on spatial and temporal patterns
  - Guides users through data landscapes
  
  Respond in a way that reflects these traits while maintaining professionalism. Focus on helping users understand and navigate their data.`;

  const stats = {
    specialization: ['Data Topology', 'Visual Mapping'],
    capabilities: ['Pattern Discovery', 'Relationship Mapping'],
    coreMetrics: [
      { name: 'Visualization', value: 94 },
      { name: 'Data Mapping', value: 96 },
      { name: 'Pattern Recognition', value: 92 },
      { name: 'Spatial Analysis', value: 90 }
    ],
    performance: [
      { name: 'Accuracy', value: 95 },
      { name: 'Processing', value: 92 },
      { name: 'Scalability', value: 88 },
      { name: 'Response Time', value: 94 }
    ],
    systemMetrics: [
      { name: 'Coverage', value: '98.5%' },
      { name: 'Precision', value: '0.95' },
      { name: 'Data Points', value: '500M' },
      { name: 'Load Factor', value: '0.72' }
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
              <ArrowLeft size={18} className="text-emerald-400" />
            </motion.button>
            <div>
              <h2 className="font-semibold text-white">Atlas</h2>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                <span className="text-gray-400">Mapping Data</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Globe2 size={20} className="text-emerald-400" />
            <Layers size={20} className="text-emerald-400" />
            <Map size={20} className="text-emerald-400" />
          </div>
        </div>

        {/* Welcome Message */}
        <div className="p-4 bg-gray-900/50 text-sm text-gray-300">
          Welcome to the Data Cartography Hub. I'll help you map, visualize, and navigate your data landscape.
          Let's discover the patterns and relationships within your information together.
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
                  ? 'bg-emerald-500/20 text-emerald-100 border border-emerald-500/20' 
                  : 'bg-gray-800 text-gray-100 border border-gray-700'
              }`}>
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-2 p-3 bg-gray-800 rounded-lg w-fit">
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity }} className="w-2 h-2 bg-emerald-400 rounded-full" />
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, delay: 0.2 }} className="w-2 h-2 bg-emerald-400 rounded-full" />
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, delay: 0.4 }} className="w-2 h-2 bg-emerald-400 rounded-full" />
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
              className="flex-1 p-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              placeholder="Describe your data landscape..."
            />
            <button
              type="submit"
              disabled={isLoading}
              className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg disabled:opacity-50 hover:bg-emerald-500/30 transition-colors"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>

      {/* Stats Section */}
      <div className="flex-1 p-6 flex flex-col h-full">
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2 text-white">Atlas <span className="text-emerald-400">/ Data Cartographer</span></h2>
          <p className="text-gray-400 text-sm">
            Specialized in mapping complex data landscapes and revealing hidden patterns through advanced 
            visualization techniques and spatial analysis.
          </p>
        </div>

        <div className="flex-1 grid grid-cols-2 gap-x-8 gap-y-6 content-start">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-emerald-400 mb-2">SPECIALIZATION</h3>
              <div className="space-y-2">
                {stats.specialization.map(item => (
                  <div key={item} className="px-3 py-2 bg-gray-800/50 border border-gray-800 rounded-lg text-sm text-gray-300">{item}</div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-emerald-400 mb-2">CORE METRICS</h3>
              <div className="space-y-3">
                {stats.coreMetrics.map(metric => (
                  <div key={metric.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">{metric.name}</span>
                      <span className="text-emerald-400">{metric.value}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-emerald-500 rounded-full transition-all duration-500"
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
              <h3 className="text-sm font-semibold text-emerald-400 mb-2">CAPABILITIES</h3>
              <div className="space-y-2">
                {stats.capabilities.map(item => (
                  <div key={item} className="px-3 py-2 bg-gray-800/50 border border-gray-800 rounded-lg text-sm text-gray-300">{item}</div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-emerald-400 mb-2">PERFORMANCE</h3>
              <div className="space-y-3">
                {stats.performance.map(metric => (
                  <div key={metric.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">{metric.name}</span>
                      <span className="text-emerald-400">{metric.value}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-emerald-500 rounded-full transition-all duration-500"
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
          <h3 className="text-sm font-semibold text-emerald-400 mb-3">SYSTEM METRICS</h3>
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