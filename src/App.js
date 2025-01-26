import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Atlas } from './components/Atlas';
import { Nexus } from './components/Nexus';
import { Prism } from './components/Prism';
import { Cipher } from './components/Cipher';

const Notification = () => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="fixed top-4 left-4 glass-card px-4 py-2 rounded-lg z-50"
  >
    Public GitHub repository for Proto Agents will be available in the next update.
  </motion.div>
);

const LoadingScreen = ({ onLoadingComplete }) => {
  const items = [
    "Initializing system components",
    "Loading AI neural networks",
    "Connecting to data streams",
    "Rendering user interface",
    "System ready"
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      onLoadingComplete();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A]">
      <div className="space-y-4">
        {items.map((item, index) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.5 }}
            className="flex items-center space-x-2"
          >
            <span className="text-gray-400">{item}</span>
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.5 + 0.3 }}
              className="text-emerald-500"
            >
              ✓
            </motion.span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const MainScreen = () => {
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);

  const models = [
    {
      title: "Atlas",
      description: "Mapping and visualizing complex data landscapes, revealing patterns and relationships through advanced cartography.",
      path: "/atlas",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" />
        </svg>
      ),
      color: "emerald"
    },
    {
      title: "Nexus",
      description: "Orchestrating seamless system integrations and optimizing complex workflows through strategic coordination.",
      path: "/nexus",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
      color: "blue"
    },
    {
      title: "Prism",
      description: "Analyzing and enhancing content through creative intelligence, transforming ideas into impactful communications.",
      path: "/prism",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      ),
      color: "purple"
    },
    {
      title: "Cipher",
      description: "Protecting digital assets through advanced security measures and proactive threat detection.",
      path: "/cipher",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0110 0v4" />
        </svg>
      ),
      color: "red"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col relative overflow-hidden">
      <div className="gradient-bg absolute inset-0 pointer-events-none" />
      
      {/* System Status */}
      <div className="fixed top-4 right-4 flex items-center gap-2 glass-card px-4 py-2 rounded-full">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
        <span className="text-sm text-gray-300">System Online</span>
      </div>

      {/* Notification */}
      <AnimatePresence>
        {showNotification && <Notification />}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 relative z-10">
        <div className="max-w-6xl w-full">
          <div className="text-center mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-7xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-emerald-600 text-transparent bg-clip-text"
            >
              Proto Agents
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 text-lg max-w-2xl mx-auto"
            >
              Four specialized intelligences working in harmony: data cartography, system integration, content intelligence, and security. Each contributing its unique perspective to solve tomorrow's challenges.
            </motion.p>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {models.map((model) => (
              <motion.div
                key={model.title}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: `0 10px 30px rgba(${
                    model.color === 'emerald' ? '16, 185, 129' : 
                    model.color === 'blue' ? '59, 130, 246' : 
                    model.color === 'purple' ? '139, 92, 246' : 
                    '239, 68, 68'}, 0.1)`
                }}
                className="glass-card p-6 rounded-xl cursor-pointer"
                onClick={() => navigate(model.path)}
              >
                <motion.div 
                  className={`text-${model.color}-400 mb-4`}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {model.icon}
                </motion.div>
                <h2 className="text-xl font-semibold mb-3 text-white">{model.title}</h2>
                <p className="text-gray-400 text-sm leading-relaxed">{model.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12 flex justify-center"
          >
            <button 
              onClick={() => navigate('/atlas')} 
              className="glass-card text-emerald-400 px-8 py-3 rounded-lg hover:bg-emerald-500/10 transition-colors flex items-center gap-2"
            >
              Begin Interaction
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-center gap-4 py-6">
        <div 
          className="text-gray-500 hover:text-emerald-400 cursor-pointer transition-colors"
          onClick={() => window.open('https://x.com/ProtoAgents', '_blank')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
          </svg>
        </div>
        <div 
          className="text-gray-500 hover:text-emerald-400 cursor-pointer transition-colors"
          onClick={() => {
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 3000);
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
          </svg>
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
          <Route path="/atlas" element={<Atlas />} />
          <Route path="/nexus" element={<Nexus />} />
          <Route path="/prism" element={<Prism />} />
          <Route path="/cipher" element={<Cipher />} />
        </Routes>
      )}
    </div>
  );
};

export default App;