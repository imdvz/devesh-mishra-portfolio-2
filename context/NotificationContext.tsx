import React, { createContext, useContext, useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X, Terminal } from 'lucide-react';

interface NotificationContextType {
  showNotification: (message: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (message: string) => {
    setNotification(message);
    // Auto-dismiss after 6 seconds (increased from 4)
    setTimeout(() => {
      setNotification((current) => (current === message ? null : current));
    }, 6000);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className="fixed bottom-8 right-4 md:right-8 z-[10000] max-w-sm w-full md:w-auto"
          >
            <div className="bg-[#050505] border border-yellow-500/50 shadow-[0_0_30px_rgba(234,179,8,0.15)] relative overflow-hidden group rounded-sm min-w-[300px]">
               
               {/* Cyberpunk Decor Lines */}
               <div className="absolute top-0 left-0 w-1 h-full bg-yellow-500" />
               <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-yellow-500" />
               <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-yellow-500" />
               
               {/* Scanline Overlay */}
               <div className="absolute inset-0 bg-[linear-gradient(rgba(234,179,8,0.03)_1px,transparent_1px)] bg-[size:100%_3px] pointer-events-none" />

               <div className="p-4 pl-6 flex items-start gap-4 relative z-10">
                  <div className="bg-yellow-500/10 p-2 rounded-sm border border-yellow-500/30 animate-pulse">
                    <Terminal size={20} className="text-yellow-500" />
                  </div>
                  
                  <div className="flex-1 pr-6">
                     <div className="flex items-center gap-2 mb-1">
                        <AlertTriangle size={12} className="text-yellow-500" />
                        <h4 className="text-yellow-500 font-orbitron text-xs font-bold tracking-[0.2em] uppercase">
                            SYSTEM_ALERT
                        </h4>
                     </div>
                     <p className="text-gray-300 font-mono text-xs leading-relaxed border-l border-gray-800 pl-2">
                        {notification}
                     </p>
                  </div>

                  <button 
                    onClick={() => setNotification(null)}
                    className="absolute top-2 right-2 text-gray-600 hover:text-white transition-colors"
                  >
                    <X size={14} />
                  </button>
               </div>
               
               {/* Loading Bar */}
               <motion.div 
                 initial={{ width: "100%" }}
                 animate={{ width: "0%" }}
                 transition={{ duration: 6, ease: "linear" }}
                 className="h-0.5 bg-yellow-500 w-full"
               />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};