import React from 'react';

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ id, title, children, className = '' }) => {
  return (
    <section id={id} className={`py-16 md:py-24 relative ${className}`}>
      {/* Decorative lines */}
      <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-cyan-900 to-transparent opacity-20" />
      <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-purple-900 to-transparent opacity-20" />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex items-center mb-12">
          <div className="h-2 w-2 bg-cyan-500 rounded-full mr-4 shadow-[0_0_10px_#00f3ff]"></div>
          <h2 className="text-3xl md:text-4xl font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 uppercase tracking-wider">
            {title}
          </h2>
          <div className="flex-grow h-px bg-gradient-to-r from-cyan-900 to-transparent ml-6"></div>
          <div className="text-xs font-mono text-cyan-700 ml-4 hidden md:block">
            // SECTION_ID: {id.toUpperCase()}
          </div>
        </div>
        {children}
      </div>
    </section>
  );
};

export default Section;