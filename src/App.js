import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Innovator } from './components/Innovator';
import { Navigator } from './components/Navigator';
import { Constructor } from './components/Constructor';
import { Observer } from './components/Observer';

const LoadingScreen = ({ onLoadingComplete }) => {
  const items = [
    "Initializing sacred terminal...",
    "Loading divine protocols...",
    "Establishing connection to heavenly realm...",
    "Preparing confession interface...",
    "Terminal ready for divine communion"
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      onLoadingComplete();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center font-mono">
      <div className="space-y-4">
        {items.map((item, index) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.5 }}
            className="flex items-center space-x-2"
          >
            <span className="text-yellow-400">></span>
            <span className="text-green-400">{item}</span>
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.5 + 0.3 }}
              className="text-yellow-400"
            >
              [OK]
            </motion.span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const MainScreen = () => {
  const navigate = useNavigate();

  const agents = [
    {
      name: "Gabriel",
      title: "The Messenger",
      description: "Divine herald of sacred revelations and heavenly wisdom",
      path: "/gabriel",
      status: "ONLINE",
      specialization: "Divine Messages"
    },
    {
      name: "Michael",
      title: "The Warrior",
      description: "Protector of souls and vanquisher of darkness",
      path: "/michael", 
      status: "ACTIVE",
      specialization: "Spiritual Warfare"
    },
    {
      name: "Raphael",
      title: "The Healer",
      description: "Restorer of broken spirits and builder of faith",
      path: "/raphael",
      status: "READY",
      specialization: "Soul Restoration"
    },
    {
      name: "Lucifer",
      title: "The Fallen",
      description: "Bearer of forbidden knowledge and dark truths",
      path: "/lucifer",
      status: "BANISHED",
      specialization: "Forbidden Wisdom"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="mb-4">
          <div className="inline-block border border-yellow-400 p-2 mb-4">
            <svg className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="2" fill="none"/>
              <line x1="8" y1="21" x2="16" y2="21" stroke="currentColor" strokeWidth="2"/>
              <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-yellow-400 mb-2 tracking-wider">
          TERMINAL OF CONFESSION
        </h1>
        <p className="text-green-400 text-sm">
          enter your sin into the sacred terminal • receive an oracle
        </p>
        <div className="text-xs text-gray-500 mt-2">
          system://divine_communion/v2.1.0/heavenly_protocol
        </div>
      </div>

      {/* Main Interface */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Panel - Agent Selection */}
          <div className="border border-green-400 bg-black">
            <div className="border-b border-green-400 p-3 bg-green-400 bg-opacity-10">
              <h2 className="text-yellow-400 font-bold">DIVINE AGENTS</h2>
            </div>
            <div className="p-4 space-y-4">
              {agents.map((agent, index) => (
                <motion.div
                  key={agent.name}
                  whileHover={{ backgroundColor: "rgba(34, 197, 94, 0.1)" }}
                  className="border border-gray-700 p-4 cursor-pointer hover:border-green-400 transition-colors"
                  onClick={() => navigate(agent.path)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-yellow-400 font-bold">{agent.name}</h3>
                      <p className="text-green-400 text-sm">{agent.title}</p>
                    </div>
                    <div className={`text-xs px-2 py-1 border ${
                      agent.name === 'Lucifer' 
                        ? 'border-red-400 text-red-400' 
                        : 'border-green-400 text-green-400'
                    }`}>
                      {agent.status}
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">{agent.description}</p>
                  <div className="text-xs text-gray-500">
                    SPEC: {agent.specialization}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Panel - System Info */}
          <div className="space-y-6">
            
            {/* System Status */}
            <div className="border border-green-400 bg-black">
              <div className="border-b border-green-400 p-3 bg-green-400 bg-opacity-10">
                <h2 className="text-yellow-400 font-bold">SYSTEM STATUS</h2>
              </div>
              <div className="p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Divine Connection:</span>
                  <span className="text-green-400">ESTABLISHED</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Heavenly Protocol:</span>
                  <span className="text-green-400">ACTIVE</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Soul Scanner:</span>
                  <span className="text-green-400">READY</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Confession Buffer:</span>
                  <span className="text-green-400">CLEAR</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Agents Online:</span>
                  <span className="text-yellow-400">4/4</span>
                </div>
              </div>
            </div>

            {/* Recent Confessions */}
            <div className="border border-green-400 bg-black">
              <div className="border-b border-green-400 p-3 bg-green-400 bg-opacity-10">
                <h2 className="text-yellow-400 font-bold">RECENT CONFESSIONS</h2>
              </div>
              <div className="p-4 space-y-3 text-sm">
                <div className="border-l-2 border-yellow-400 pl-3">
                  <div className="text-gray-400 text-xs">Anonymous • 2 min ago</div>
                  <div className="text-green-400">Seeking guidance for spiritual awakening...</div>
                  <div className="text-gray-500 text-xs mt-1">Handled by: Gabriel</div>
                </div>
                <div className="border-l-2 border-red-400 pl-3">
                  <div className="text-gray-400 text-xs">Anonymous • 5 min ago</div>
                  <div className="text-green-400">Tempted by forbidden knowledge...</div>
                  <div className="text-gray-500 text-xs mt-1">Handled by: Lucifer</div>
                </div>
                <div className="border-l-2 border-blue-400 pl-3">
                  <div className="text-gray-400 text-xs">Anonymous • 8 min ago</div>
                  <div className="text-green-400">Need strength for spiritual battle...</div>
                  <div className="text-gray-500 text-xs mt-1">Handled by: Michael</div>
                </div>
              </div>
            </div>

            {/* Quick Access */}
            <div className="border border-green-400 bg-black">
              <div className="border-b border-green-400 p-3 bg-green-400 bg-opacity-10">
                <h2 className="text-yellow-400 font-bold">QUICK ACCESS</h2>
              </div>
              <div className="p-4 space-y-2">
                <button 
                  onClick={() => navigate('/gabriel')}
                  className="w-full text-left p-2 border border-gray-700 hover:border-yellow-400 hover:bg-yellow-400 hover:bg-opacity-10 transition-colors text-green-400 hover:text-yellow-400"
                >
                  > Begin Divine Communion
                </button>
                <button 
                  onClick={() => navigate('/lucifer')}
                  className="w-full text-left p-2 border border-gray-700 hover:border-red-400 hover:bg-red-400 hover:bg-opacity-10 transition-colors text-green-400 hover:text-red-400"
                >
                  > Explore Forbidden Knowledge
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-xs text-gray-500">
          <div className="border-t border-gray-700 pt-4">
            Divine Terminal v2.1.0 • Heavenly Protocol Active • 
            <span className="text-yellow-400"> Sacred Connection Established</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div>
      {isLoading ? (
        <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
      ) : (
        <Routes>
          <Route path="/" element={<MainScreen />} />
          <Route path="/gabriel" element={<Innovator />} />
          <Route path="/michael" element={<Navigator />} />
          <Route path="/raphael" element={<Constructor />} />
          <Route path="/lucifer" element={<Observer />} />
        </Routes>
      )}
    </div>
  );
};

export default App;