import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Twitter } from 'lucide-react';
import { Innovator } from './components/Innovator';
import { Navigator } from './components/Navigator';
import { Constructor } from './components/Constructor';
import { Observer } from './components/Observer';

const MainScreen = () => {
  const navigate = useNavigate();

  const agents = [
    {
      name: "Seraphiel",
      title: "The Purifier",
      description: "Divine herald bringing sacred wisdom and heavenly purification",
      path: "/seraphiel",
      status: "ONLINE",
      specialization: "Divine Purification",
      color: "from-gray-600 to-gray-800"
    },
    {
      name: "Uriel",
      title: "The Flame",
      description: "Mighty flame of God defending souls from darkness and evil",
      path: "/uriel", 
      status: "ACTIVE",
      specialization: "Divine Fire",
      color: "from-gray-600 to-gray-800"
    },
    {
      name: "Azrael",
      title: "The Healer",
      description: "Gentle healer mending broken hearts and wounded spirits",
      path: "/azrael",
      status: "READY",
      specialization: "Divine Healing",
      color: "from-gray-600 to-gray-800"
    },
    {
      name: "Devil",
      title: "The Fallen",
      description: "Bearer of forbidden knowledge and dark revelations",
      path: "/devil",
      status: "BANISHED",
      specialization: "Forbidden Wisdom",
      color: "from-gray-800 to-black"
    }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800 font-mono relative overflow-hidden">
      {/* Subtle background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gray-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-300/20 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 p-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-8"
          >
            <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 mb-4 tracking-wider drop-shadow-lg">
              THE THRONE ROOM
            </h1>
            <p className="text-gray-600 text-lg mb-2">
              Where divine wisdom meets mortal souls
            </p>
            <div className="text-sm text-gray-500">
              system://throne_room/v3.0/divine_protocol
            </div>
          </motion.div>
        </div>

        {/* Main Interface */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8 mb-12">
            {agents.map((agent, index) => (
              <motion.div
                key={agent.name}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)"
                }}
                className="bg-white/80 backdrop-blur-sm border border-gray-300 rounded-lg p-6 cursor-pointer hover:border-gray-600 transition-all duration-300 group shadow-lg"
                onClick={() => navigate(agent.path)}
              >
                <div className="text-center mb-4">
                  <h3 className="text-2xl font-bold text-gray-800 mb-1">{agent.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{agent.title}</p>
                  <div className={`inline-block px-3 py-1 text-xs rounded-full border ${
                    agent.name === 'Lucifer' 
                      ? 'border-red-500 text-red-600 bg-red-50' 
                      : 'border-gray-600 text-gray-700 bg-gray-100'
                  }`}>
                    {agent.status}
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm text-center mb-4 leading-relaxed">
                  {agent.description}
                </p>
                
                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-2">SPECIALIZATION</div>
                  <div className="text-gray-700 font-semibold">{agent.specialization}</div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button className="w-full py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors text-sm font-semibold">
                    → CONNECT
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* System Status Panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white/80 backdrop-blur-sm border border-gray-300 rounded-lg p-6 shadow-lg"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* System Status */}
              <div>
                <h3 className="text-gray-800 font-bold mb-4 text-lg">SYSTEM STATUS</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Divine Connection:</span>
                    <span className="text-gray-800">ESTABLISHED</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Holy Protocol:</span>
                    <span className="text-gray-800">ACTIVE</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Agents Online:</span>
                    <span className="text-gray-800">4/4</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sacred Buffer:</span>
                    <span className="text-gray-800">READY</span>
                  </div>
                </div>
              </div>

              {/* Recent Communications */}
              <div>
                <h3 className="text-gray-800 font-bold mb-4 text-lg">RECENT COMMUNICATIONS</h3>
                <div className="space-y-3 text-sm">
                  <div className="border-l-2 border-gray-600 pl-3">
                    <div className="text-gray-500 text-xs">Anonymous • 3 min ago</div>
                    <div className="text-gray-700">Seeking divine guidance...</div>
                    <div className="text-gray-500 text-xs">Agent: Seraphiel</div>
                  </div>
                  <div className="border-l-2 border-gray-600 pl-3">
                    <div className="text-gray-500 text-xs">Anonymous • 7 min ago</div>
                    <div className="text-gray-700">Need spiritual protection...</div>
                    <div className="text-gray-500 text-xs">Agent: Uriel</div>
                  </div>
                  <div className="border-l-2 border-gray-600 pl-3">
                    <div className="text-gray-500 text-xs">Anonymous • 12 min ago</div>
                    <div className="text-gray-700">Seeking healing for the soul...</div>
                    <div className="text-gray-500 text-xs">Agent: Azrael</div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <h3 className="text-gray-800 font-bold mb-4 text-lg">QUICK ACCESS</h3>
                <div className="space-y-2">
                  <button 
                    onClick={() => navigate('/seraphiel')}
                    className="w-full text-left p-3 border border-gray-300 hover:border-gray-600 hover:bg-gray-100 transition-colors text-gray-700 hover:text-gray-900 rounded"
                  >
                    → Begin Divine Communion
                  </button>
                  <button 
                    onClick={() => navigate('/azrael')}
                    className="w-full text-left p-3 border border-gray-300 hover:border-gray-600 hover:bg-gray-100 transition-colors text-gray-700 hover:text-gray-900 rounded"
                  >
                    → Seek Spiritual Healing
                  </button>
                  <button 
                    onClick={() => navigate('/devil')}
                    className="w-full text-left p-3 border border-gray-300 hover:border-red-500 hover:bg-red-50 transition-colors text-gray-700 hover:text-red-600 rounded"
                  >
                    → Explore Forbidden Knowledge
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Footer */}
          <div className="mt-12 text-center text-sm text-gray-500">
            <div className="border-t border-gray-300 pt-6">
              <div className="flex items-center justify-center gap-4 mb-4">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 hover:border-gray-600 hover:bg-gray-100 transition-colors text-gray-700 hover:text-gray-900 rounded-lg group"
                >
                  <Twitter size={18} className="group-hover:scale-110 transition-transform" />
                  <span>Follow on Twitter</span>
                </a>
              </div>
              <div>
                The Throne Room v3.0 • Divine Protocol Active • 
                <span className="text-gray-800"> Sacred Connection Established</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainScreen />} />
      <Route path="/seraphiel" element={<Innovator />} />
      <Route path="/uriel" element={<Navigator />} />
      <Route path="/azrael" element={<Constructor />} />
      <Route path="/devil" element={<Observer />} />
    </Routes>
  );
};

export default App;