import React from 'react';
import { RESUME_DATA } from '../constants';
import Section from './Section';
import { motion } from 'framer-motion';

const Skills: React.FC = () => {
  return (
    <Section id="skills" title="System Capabilities">
      <div className="grid md:grid-cols-2 gap-8">
        {RESUME_DATA.skills.map((category, idx) => (
          <motion.div
            key={category.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="bg-gray-900/50 border border-gray-800 p-6 relative group hover:border-cyan-500/50 transition-colors duration-300 overflow-hidden"
          >
            {/* Hover Glitch Effect Background */}
            <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            
            <h3 className="text-xl font-orbitron text-purple-400 mb-6 flex items-center">
              <span className="mr-2 text-cyan-500">»</span>
              {category.category}
            </h3>
            
            <div className="flex flex-wrap gap-3">
              {category.items.map((skill) => (
                <span 
                  key={skill}
                  className="px-3 py-1 bg-black border border-gray-700 text-gray-300 text-sm font-mono hover:text-cyan-400 hover:border-cyan-500 hover:shadow-[0_0_8px_rgba(0,243,255,0.3)] transition-all duration-300 cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
            
            {/* Corner Accents */}
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-500 opacity-50" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-purple-500 opacity-50" />
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default Skills;