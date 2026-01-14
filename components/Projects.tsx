import React from 'react';
import Section from './Section';
import { motion } from 'framer-motion';
import { Code, ExternalLink, Zap } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';

// Extracting projects from the resume achievements manually to highlight the best ones
const HIGHLIGHT_PROJECTS = [
  {
    title: "AI Documentation Assistant",
    tech: ["Python", "Dash", "RAG", "LLM", "Dataiku"],
    desc: "Architecture-aware PDF ingestor cutting documentation time by 85%.",
    metric: "85% Time Reduction"
  },
  {
    title: "IT Ticket Classifier",
    tech: ["XGBoost", "PostgreSQL", "BMC Helix API"],
    desc: "Automated ticket routing with 92% accuracy, saving €200k in 6 months.",
    metric: "€200k Savings"
  },
  {
    title: "Drug Review Sentiment",
    tech: ["NLP", "LightGBM", "Python", "NLTK"],
    desc: "Built sentiment predictor with 88% accuracy using lemmatization and NLTK.",
    metric: "88% Accuracy"
  },
  {
    title: "Nutrition Label OCR",
    tech: ["PaddleOCR", "Python", "OpenCV"],
    desc: "Processed 60,000+ label images extracting 24 distinct nutrients.",
    metric: "60k+ Images"
  }
];

const Projects: React.FC = () => {
  const { showNotification } = useNotification();

  return (
    <Section id="projects" title="Project Modules">
      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
        {HIGHLIGHT_PROJECTS.map((project, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="bg-black border border-gray-800 p-1 relative overflow-hidden group"
          >
            {/* Cyberpunk card interior */}
            <div className="bg-gray-900/40 p-6 h-full border border-transparent group-hover:border-cyan-500/30 transition-all duration-300 flex flex-col">
              
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-cyan-900/20 rounded border border-cyan-500/30">
                  <Code className="text-cyan-400" size={24} />
                </div>
                <div className="text-xs font-mono text-purple-400 border border-purple-500/30 px-2 py-1 bg-purple-900/10 rounded">
                  MOD_0{idx + 1}
                </div>
              </div>
              
              <h3 className="text-xl font-orbitron text-white mb-2 group-hover:text-cyan-400 transition-colors">
                {project.title}
              </h3>
              
              <p className="text-gray-300 mb-6 text-base leading-relaxed">
                {project.desc}
              </p>
              
              <div className="mb-6 flex flex-wrap gap-2 mt-auto">
                {project.tech.map(t => (
                  <span key={t} className="text-sm font-mono text-gray-500 bg-gray-800 px-2 py-1 rounded">
                    {t}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                 <div className="flex items-center gap-2 text-yellow-400 text-base font-bold font-mono">
                   <Zap size={14} />
                   {project.metric}
                 </div>
                 
                 <button 
                    onClick={() => showNotification("PROTOCOL NOT YET PUBLIC. MODULE IS CONSISTENTLY BUILDING...")}
                    className="text-cyan-500 hover:text-white transition-colors p-2 hover:bg-cyan-500/10 rounded"
                    title="View Source"
                 >
                   <ExternalLink size={18} />
                 </button>
              </div>
            </div>
            
            {/* Animated scanning line */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-500 opacity-0 group-hover:opacity-100 group-hover:animate-scan" />
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default Projects;