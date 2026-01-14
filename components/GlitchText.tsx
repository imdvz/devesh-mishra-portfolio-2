import React from 'react';

interface GlitchTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
  className?: string;
}

const GlitchText: React.FC<GlitchTextProps> = ({ text, as: Tag = 'span', className = '' }) => {
  return (
    <Tag className={`relative inline-block group hover:text-white transition-colors duration-200 ${className}`}>
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-[#00f3ff] opacity-0 group-hover:opacity-70 animate-glitch-1 clip-path-1">
        {text}
      </span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-[#bc13fe] opacity-0 group-hover:opacity-70 animate-glitch-2 clip-path-2">
        {text}
      </span>
    </Tag>
  );
};

export default GlitchText;