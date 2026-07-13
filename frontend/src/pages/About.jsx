import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, ChevronLeft } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-brand-bg relative overflow-hidden flex flex-col justify-between">
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-accent/10 blur-[130px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-500/10 blur-[130px] rounded-full pointer-events-none"></div>

      <nav className="h-20 max-w-7xl mx-auto w-full flex items-center justify-between px-6 z-10 relative">
        <Link to="/" className="flex items-center gap-2 text-brand-textMuted hover:text-white transition-colors">
          <ChevronLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>
        <div className="flex items-center gap-3">
          <Scale className="h-6 w-6 text-brand-accent" />
          <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">NyayaAI</span>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12 flex-1 flex flex-col justify-center relative z-10">
        <h1 className="text-4xl font-extrabold text-white mb-6">About NyayaAI</h1>
        <div className="glass p-8 rounded-2xl border border-white/5 space-y-6 text-brand-textMuted leading-relaxed">
          <p>
            <strong className="text-white">NyayaAI</strong> is a modern civic-tech platform designed to simplify Indian law. 
            Understanding legal rights, sections, and procedures is often complex and inaccessible to the average layperson. 
            Our mission is to bridge this gap using generative AI.
          </p>
          <p>
            By combining the power of the Google Gemini API with advanced OCR and PDF rendering libraries, NyayaAI provides citizens, 
            students, and professionals with instant, structured information on legal questions, contract verification, 
            and safety protocols.
          </p>
          <h2 className="text-xl font-semibold text-white mt-4">Core Pillars</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-white">Accessibility:</strong> Providing legal insights in multiple languages including Hindi and English.</li>
            <li><strong className="text-white">Empowerment:</strong> Educating users on consumer rights, employment policies, and cyber safety.</li>
            <li><strong className="text-white">Convenience:</strong> Providing printable templates for standard legal documents like NDAs and rent deeds instantly.</li>
          </ul>
        </div>
      </main>

      <footer className="border-t border-white/5 py-8 text-center text-xs text-brand-textMuted relative z-10">
        <p>© {new Date().getFullYear()} NyayaAI. Developed for Indian Law awareness. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default About;
