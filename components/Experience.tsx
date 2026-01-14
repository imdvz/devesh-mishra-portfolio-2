import React from 'react';
import { RESUME_DATA } from '../constants';
import Section from './Section';
import { Briefcase, MapPin, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const Experience: React.FC = () => {
  return (
    <Section id="experience" title="Execution History">
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gray-800 transform md:-translate-x-1/2 hidden md:block" />
        
        <div className="space-y-12">
          {RESUME_DATA.experience.map((job, index) => (
            <motion.div 
              key={job.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`flex flex-col md:flex-row gap-8 relative ${index % 2 === 0 ? 'md:text-right' : 'md:flex-row-reverse'}`}
            >
              {/* Spacer for timeline centering */}
              <div className="hidden md:block w-1/2" />
              
              {/* Timeline Node */}
              <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-black border-2 border-cyan-500 rounded-full transform md:-translate-x-1/2 mt-1.5 z-10 shadow-[0_0_10px_#00f3ff]" />
              
              {/* Content Card */}
              <div className={`w-full md:w-1/2 pl-8 md:pl-0 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                <div className="bg-gray-900/80 border border-gray-700 p-6 relative hover:border-purple-500 transition-colors duration-300 group">
                  <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-cyan-500" />
                  <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-cyan-500" />
                  
                  <h3 className="text-xl font-orbitron text-white group-hover:text-cyan-400 transition-colors">
                    {job.role}
                  </h3>
                  <h4 className="text-lg text-purple-400 font-bold mb-2">{job.company}</h4>
                  
                  <div className={`flex flex-wrap gap-4 text-sm text-gray-400 font-mono mb-4 ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                    <div className="flex items-center gap-1">
                      <Calendar size={14} /> {job.period}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={14} /> {job.location}
                    </div>
                  </div>
                  
                  <ul className="space-y-2 text-gray-300 text-sm text-left">
                    {job.achievements.slice(0, 4).map((achievement, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-cyan-500 mt-1">›</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Experience;