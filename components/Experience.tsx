import React, { useState } from 'react';
import { RESUME_DATA } from '../constants';
import Section from './Section';
import { MapPin, Calendar, ChevronDown, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ExperienceCard: React.FC<{ job: typeof RESUME_DATA.experience[0], index: number }> = ({ job, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isEven = index % 2 === 0;

  // Configuration for how many items to show initially
  const INITIAL_VISIBLE_COUNT = 4;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`flex flex-col md:flex-row gap-8 relative ${isEven ? 'md:text-right' : 'md:flex-row-reverse'}`}
    >
      {/* Spacer for timeline layout */}
      <div className="hidden md:block w-1/2" />

      {/* Timeline Node */}
      <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-black border-2 border-cyan-500 rounded-full transform md:-translate-x-1/2 mt-1.5 z-10 shadow-[0_0_10px_#00f3ff]" />

      {/* Content Card */}
      <div className={`w-full md:w-1/2 pl-8 md:pl-0 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
        <motion.div
          layout
          className="bg-gray-900/80 border border-gray-700 p-6 relative hover:border-purple-500 transition-colors duration-300 group overflow-hidden"
        >
          {/* Cyberpunk Decor */}
          <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-cyan-500" />
          <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-cyan-500" />

          <motion.h3 layout="position" className="text-xl font-orbitron text-white group-hover:text-cyan-400 transition-colors">
            {job.role}
          </motion.h3>
          <motion.h4 layout="position" className="text-lg text-purple-400 font-bold mb-2">{job.company}</motion.h4>

          <motion.div layout="position" className={`flex flex-wrap gap-4 text-sm text-gray-400 font-mono mb-4 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
            <div className="flex items-center gap-1">
              <Calendar size={14} /> {job.period}
            </div>
            <div className="flex items-center gap-1">
              <MapPin size={14} /> {job.location}
            </div>
          </motion.div>

          <ul className="space-y-2 text-gray-300 text-sm text-left">
            {/* Always show first N achievements */}
            {job.achievements.slice(0, INITIAL_VISIBLE_COUNT).map((achievement, i) => (
              <motion.li layout="position" key={`base-${i}`} className="flex items-start gap-2">
                <span className="text-cyan-500 mt-1">›</span>
                <span>{achievement}</span>
              </motion.li>
            ))}

            {/* Collapsible Section */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  {job.achievements.slice(INITIAL_VISIBLE_COUNT).map((achievement, i) => (
                    <motion.li
                      key={`extra-${i}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-start gap-2 mt-2"
                    >
                      <span className="text-cyan-500 mt-1">›</span>
                      <span>{achievement}</span>
                    </motion.li>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </ul>

          {/* Toggle Button */}
          {job.achievements.length > INITIAL_VISIBLE_COUNT && (
            <motion.button
              layout="position"
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-4 flex items-center gap-2 text-xs font-mono text-cyan-500 hover:text-white transition-colors uppercase tracking-widest group/btn"
            >
               <Terminal size={14} />
               {isExpanded ? 'COLLAPSE_DATA' : 'ACCESS_FULL_LOGS'}
               <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                 <ChevronDown size={14} />
               </div>
               
               {/* Visual Hint for Interaction */}
               {!isExpanded && (
                  <span className="flex h-2 w-2 relative ml-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                  </span>
               )}
            </motion.button>
          )}

        </motion.div>
      </div>
    </motion.div>
  );
};

const Experience: React.FC = () => {
  return (
    <Section id="experience" title="Execution History">
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gray-800 transform md:-translate-x-1/2 hidden md:block" />

        <div className="space-y-12">
          {RESUME_DATA.experience.map((job, index) => (
             <ExperienceCard key={job.id} job={job} index={index} />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Experience;