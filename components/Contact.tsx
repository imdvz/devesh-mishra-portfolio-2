import React from 'react';
import { RESUME_DATA } from '../constants';
import { Mail, Linkedin, Github, Phone } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';

const Contact: React.FC = () => {
  return (
    <footer id="contact" className="py-20 bg-black relative border-t border-gray-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-black to-black" />
      
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h2 className="text-3xl font-orbitron text-white mb-8">
          <span className="text-cyan-500">Initiate</span> Connection
        </h2>
        
        <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
          Available for collaborations in GenAI, RAG Systems, and Machine Learning architecture.
          Looking forward to building the next generation of AI solutions.
        </p>
        
        <div className="flex justify-center gap-6 mb-12 flex-wrap">
           <SocialLink href={`mailto:${RESUME_DATA.personalInfo.email}`} icon={<Mail />} label="Email" />
           <SocialLink href={RESUME_DATA.personalInfo.linkedin} icon={<Linkedin />} label="LinkedIn" />
           <SocialLink href={RESUME_DATA.personalInfo.github} icon={<Github />} label="GitHub" />
           <SocialLink href={`tel:${RESUME_DATA.personalInfo.phone}`} icon={<Phone />} label="Phone" />
        </div>
        
        <div className="text-gray-600 font-mono text-xs">
          <p>© {new Date().getFullYear()} DEVESH MISHRA. ALL RIGHTS RESERVED.</p>
          <p className="mt-2">SYSTEM.VER.2.0.24 // CYBERPUNK_THEME</p>
        </div>
      </div>
    </footer>
  );
};

const SocialLink: React.FC<{ href: string; icon: React.ReactNode; label: string }> = ({ href, icon, label }) => {
  const { showNotification } = useNotification();

  const handleClick = (e: React.MouseEvent) => {
    // If href is empty, #, or just mailto:/tel: with no data, show popup
    if (!href || href === '#' || href === 'mailto:' || href === 'tel:') {
      e.preventDefault();
      showNotification("COMMUNICATION LINK UNDER MAINTENANCE. PLEASE TRY ANOTHER CHANNEL.");
    }
  };

  return (
    <a 
      href={href}
      target="_blank"
      rel="noreferrer"
      onClick={handleClick}
      className="p-4 bg-gray-900 border border-gray-800 text-gray-400 hover:text-cyan-400 hover:border-cyan-500 hover:shadow-[0_0_15px_#00f3ff] transition-all duration-300 rounded-sm group relative"
      aria-label={label}
    >
      <div className="relative z-10">{icon}</div>
      <div className="absolute inset-0 bg-cyan-500/10 scale-0 group-hover:scale-100 transition-transform duration-300" />
    </a>
  );
};

export default Contact;