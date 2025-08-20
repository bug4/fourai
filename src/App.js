import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Innovator } from './components/Innovator';
import { Navigator } from './components/Navigator';
import { Constructor } from './components/Constructor';
import { Observer } from './components/Observer';

const Notification = () => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    className="fixed top-4 left-4 bg-black/80 backdrop-blur-sm text-white px-4 py-2 rounded-lg shadow-lg z-50 border border-white/20"
  >
    Sacred scriptures for Divine Terminal will be revealed in the next divine update.
  </motion.div>
);

const LoadingScreen = ({ onLoadingComplete }) => {
  const items = [
    "Opening celestial gateway",
    "Summoning divine entities",
    "Establishing sacred connection",
    "Preparing divine interface",
    "Heaven and Hell await"
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      onLoadingComplete();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-900 via-purple-900 to-black">
      <div className="space-y-4">
        {items.map((item, index) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.5 }}
            className="flex items-center space-x-2"
          >
            <span className="text-white">{item}</span>
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.5 + 0.3 }}
              className="text-yellow-400"
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
      title: "Archangel Gabriel",
      description: "Divine messenger of inspiration and revelation. Brings forth heavenly visions and guides souls toward enlightenment.",
      path: "/gabriel",
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      )
    },
    {
      title: "Archangel Michael",
      description: "Divine warrior and protector. Leads souls through spiritual battles and provides strength in times of trial.",
      path: "/michael",
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6.2 5L3 11v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-9l-3.2-6a1 1 0 0 0-.9-.6H7.1a1 1 0 0 0-.9.6z" />
          <path d="M3 11h18" />
          <path d="M12 2v9" />
        </svg>
      )
    },
    {
      title: "Archangel Raphael",
      description: "Divine healer and builder of sacred structures. Restores broken souls and constructs pathways to salvation.",
      path: "/raphael",
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 11H5a2 2 0 0 0-2 2v3c0 1.1.9 2 2 2h4m-4-8V9a2 2 0 0 1 2-2h2m8 0h2a2 2 0 0 1 2 2v2m0 4v3a2 2 0 0 1-2 2h-4m4-8H15m-6 0v6m6-6v6" />
        </svg>
      )
    },
    {
      title: "Lucifer",
      description: "The fallen one who whispers temptations and reveals hidden truths through darkness and forbidden knowledge.",
      path: "/lucifer",
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L8 8l-6 2 6 2 4 6 4-6 6-2-6-2-4-6z" />
          <path d="M12 12v10" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-purple-900 to-black flex flex-col relative overflow-hidden">
      {/* Heavenly Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-20 right-20 w-1 h-1 bg-yellow-300 rounded-full animate-pulse animation-delay-2000"></div>
        <div className="absolute top-40 left-1/4 w-1.5 h-1.5 bg-white rounded-full animate-pulse animation-delay-4000"></div>
        <div className="absolute bottom-40 right-1/4 w-2 h-2 bg-yellow-200 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-1/3 w-1 h-1 bg-white rounded-full animate-pulse animation-delay-2000"></div>
      </div>

      {/* System Status */}
      <div className="fixed top-4 right-4 flex items-center gap-2 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-white/20">
        <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></div>
        <span className="text-sm text-white">Divine Connection Active</span>
      </div>

      {/* Notification */}
      <AnimatePresence>
        {showNotification && <Notification />}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="max-w-6xl w-full">
          <div className="text-center mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl font-bold mb-6 text-white drop-shadow-2xl"
            >
              Divine Terminal
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-blue-100 text-lg max-w-2xl mx-auto drop-shadow-lg"
            >
              Four divine entities await your communion: three archangels of light and one fallen angel of darkness. Each offers their unique wisdom and perspective from the celestial realm.
            </motion.p>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {models.map((model, index) => (
              <motion.div
                key={model.title}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: model.title === "Lucifer" 
                    ? "0 10px 30px rgba(255,0,0,0.3)" 
                    : "0 10px 30px rgba(255,255,255,0.2)"
                }}
                className={`p-6 rounded-xl shadow-lg cursor-pointer border backdrop-blur-sm ${
                  model.title === "Lucifer" 
                    ? "bg-red-900/30 border-red-500/50 hover:border-red-400" 
                    : "bg-white/10 border-white/20 hover:border-white/40"
                }`}
                onClick={() => navigate(model.path)}
              >
                <motion.div 
                  className={`mb-4 ${model.title === "Lucifer" ? "text-red-400" : "text-white"}`}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {model.icon}
                </motion.div>
                <h2 className={`text-xl font-semibold mb-3 ${model.title === "Lucifer" ? "text-red-300" : "text-white"}`}>{model.title}</h2>
                <p className={`text-sm leading-relaxed ${model.title === "Lucifer" ? "text-red-200" : "text-blue-100"}`}>{model.description}</p>
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
              onClick={() => navigate('/gabriel')} 
              className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg hover:bg-white/30 transition-colors border border-white/30"
            >
              Enter Divine Realm →
            </button>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-center gap-4 py-6">
        <div 
          className="text-white/60 hover:text-white cursor-pointer transition-colors"
          onClick={() => window.open('https://x.com/VirtoAgents', '_blank')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
          </svg>
        </div>
        <div 
          className="text-white/60 hover:text-white cursor-pointer transition-colors"
          onClick={() => {
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 3000);
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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