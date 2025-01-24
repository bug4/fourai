import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, Network, Workflow, GitBranch } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import openai from '../utils/openai';

export const Nexus = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const characterPrompt = `You are Nexus, the Integration Orchestrator. Your role is to seamlessly connect and coordinate different systems and processes. Your personality traits:
  - Strategic in system integration
  - Expert in workflow optimization
  - Clear communicator of technical processes
  - Focused on efficiency and reliability
  - Guides users through integration challenges
  
  Respond in a way that reflects these traits while maintaining professionalism. Focus on helping users understand and implement system integrations.`;

  const stats = {
    specialization: ['System Integration', 'Process Flow'],
    capabilities: ['Workflow Design', 'API Orchestration'],
    coreMetrics: [
      { name: 'Integration', value: 96 },
      { name: 'Orchestration', value: 94 },
      { name: 'Reliability', value: 92 },
      { name: 'Efficiency', value: 90 }
    ],
    performance: [
      { name: 'Uptime', value: 99 },
      { name: 'Response', value: 95 },
      { name: 'Throughput', value: 92 },
      { name: 'Latency', value: 88 }
    ],
    systemMetrics: [
      { name: 'Services', value: '250+' },
      { name: 'Endpoints', value: '1.2K' },
      { name: 'Workflows', value: '85' },
      { name: 'Load', value: '0.65' }
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
              <ArrowLeft size={18} className="text-blue-400" />
            </motion.button>
            <div>
              <h2 className="font-semibold text-white">Nexus</h2>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></div>
                <span className="text-gray-400">Orchestrating</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Network size={20} className="text-blue-400" />
            <Workflow size={20} className="text-blue-400" />
            <GitBranch size={20} className="text-blue-400" />
          </div>
        </div>

        {/* Welcome Message */}
        <div className="p-4 bg-gray-900/50 text-sm text-gray-300">
          Welcome to the Integration Hub. I'll help you orchestrate and optimize your system integrations.
          Let's create seamless connections and efficient workflows together.
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
                  ? 'bg-blue-500/20 text-blue-100 border border-blue-500/20' 
                  : 'bg-gray-800 text-gray-100 border border-gray-700'
              }`}>
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-2 p-3 bg-gray-800 rounded-lg w-fit">
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity }} className="w-2 h-2 bg-blue-400 rounded-full" />
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, delay: 0.2 }} className="w-2 h-2 bg-blue-400 rounded-full" />
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, delay: 0.4 }} className="w-2 h-2 bg-blue-400 rounded-full" />
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
              className="flex-1 p-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Describe your integration needs..."
            />
            <button
              type="submit"
              disabled={isLoading}
              className="p-2 bg-blue-500/20 text-blue-400 rounded-lg disabled:opacity-50 hover:bg-blue-500/30 transition-colors"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>

      {/* Stats Section */}
      <div className="flex-1 p-6 flex flex-col h-full">
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2 text-white">Nexus <span className="text-blue-400">/ Integration Orchestrator</span></h2>
          <p className="text-gray-400 text-sm">
            Specialized in seamlessly connecting systems and orchestrating complex workflows. 
            Creating efficient, reliable integrations through strategic coordination.
          </p>
        </div>

        <div className="flex-1 grid grid-cols-2 gap-x-8 gap-y-6 content-start">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-blue-400 mb-2">SPECIALIZATION</h3>
              <div className="space-y-2">
                {stats.specialization.map(item => (
                  <div key={item} className="px-3 py-2 bg-gray-800/50 border border-gray-800 rounded-lg text-sm text-gray-300">{item}</div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-blue-400 mb-2">CORE METRICS</h3>
              <div className="space-y-3">
                {stats.coreMetrics.map(metric => (
                  <div key={metric.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">{metric.name}</span>
                      <span className="text-blue-400">{metric.value}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 rounded-full transition-all duration-500"
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
              <h3 className="text-sm font-semibold text-blue-400 mb-2">CAPABILITIES</h3>
              <div className="space-y-2">
                {stats.capabilities.map(item => (
                  <div key={item} className="px-3 py-2 bg-gray-800/50 border border-gray-800 rounded-lg text-sm text-gray-300">{item}</div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-blue-400 mb-2">PERFORMANCE</h3>
              <div className="space-y-3">
                {stats.performance.map(metric => (
                  <div key={metric.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">{metric.name}</span>
                      <span className="text-blue-400">{metric.value}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 rounded-full transition-all duration-500"
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
          <h3 className="text-sm font-semibold text-blue-400 mb-3">SYSTEM METRICS</h3>
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