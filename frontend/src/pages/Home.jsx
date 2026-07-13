import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Scale, 
  ShieldAlert, 
  FileSignature, 
  Eye, 
  ArrowRight, 
  ShieldCheck, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Users, 
  Award, 
  Lock 
} from 'lucide-react';

const LegalIllustration = () => (
  <svg viewBox="0 0 500 500" className="w-full max-w-[440px] h-auto drop-shadow-md mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Abstract background grid */}
    <circle cx="250" cy="250" r="200" fill="url(#bg-gradient)" opacity="0.08" />
    <circle cx="250" cy="250" r="150" stroke="#6366F1" strokeWidth="1" strokeDasharray="5 5" opacity="0.3" />
    
    {/* Circuit lines linking elements */}
    <path d="M120 220 L250 140 L380 220" stroke="#6366F1" strokeWidth="2" strokeDasharray="3 3" opacity="0.4" />
    <path d="M250 140 L250 400" stroke="#8B5CF6" strokeWidth="2" opacity="0.4" />
    <path d="M150 310 L250 380 L350 310" stroke="#6366F1" strokeWidth="2" strokeDasharray="3 3" opacity="0.4" />

    {/* Justice Scale Pillar */}
    <rect x="242" y="110" width="16" height="280" rx="8" fill="#475569" />
    <rect x="180" y="380" width="140" height="16" rx="8" fill="#334155" />
    
    {/* Beam */}
    <path d="M120 150 L380 150" stroke="#6366F1" strokeWidth="10" strokeLinecap="round" />
    <circle cx="250" cy="150" r="14" fill="#8B5CF6" />

    {/* Left Pan */}
    <path d="M140 150 L140 270" stroke="#475569" strokeWidth="3" />
    <path d="M140 270 L100 220 L180 220 Z" fill="#F1F5F9" stroke="#6366F1" strokeWidth="2" />
    <circle cx="140" cy="250" r="8" fill="#10B981" />

    {/* Right Pan */}
    <path d="M360 150 L360 270" stroke="#475569" strokeWidth="3" />
    <path d="M360 270 L320 220 L400 220 Z" fill="#F1F5F9" stroke="#6366F1" strokeWidth="2" />
    <circle cx="360" cy="235" r="8" fill="#8B5CF6" />

    {/* Tech Floating Nodes */}
    <g filter="url(#drop-shadow)">
      {/* Code Document Node */}
      <rect x="70" y="280" width="60" height="50" rx="8" fill="white" stroke="#E2E8F0" strokeWidth="2" />
      <line x1="85" y1="295" x2="115" y2="295" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" />
      <line x1="85" y1="305" x2="105" y2="305" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" />
      <line x1="85" y1="315" x2="115" y2="315" stroke="#E2E8F0" strokeWidth="2" strokeLinecap="round" />
    </g>

    <g filter="url(#drop-shadow)">
      {/* AI Shield Node */}
      <rect x="370" y="280" width="60" height="50" rx="8" fill="white" stroke="#E2E8F0" strokeWidth="2" />
      <path d="M400 295 L412 301 L412 313 C412 320 400 325 400 325 C400 325 388 320 388 313 L388 301 Z" fill="#E0E7FF" stroke="#6366F1" strokeWidth="1.5" />
    </g>

    {/* Gradient Defs */}
    <defs>
      <linearGradient id="bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366F1" />
        <stop offset="100%" stopColor="#8B5CF6" />
      </linearGradient>
      <filter id="drop-shadow" x="50" y="260" width="100" height="90" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#0F172A" floodOpacity="0.06" />
      </filter>
    </defs>
  </svg>
);

const Home = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const features = [
    {
      title: 'Bilingual AI Chatbot',
      description: 'Ask complex legal questions in English or Hindi. Instantly receive section references, simplified terms, and penalty ranges.',
      icon: Scale,
    },
    {
      title: 'Notice & Deed Generator',
      description: 'Fill tailored forms to instantly compile Rent Agreements, NDAs, Affidavits, and FIR drafts into standard downloadable PDFs.',
      icon: FileSignature,
    },
    {
      title: 'OCR Document Analyzer',
      description: 'Upload files (PDFs, JPEGs, PNGs) to scan contents, extract raw texts, and highlight potential warning clauses.',
      icon: Eye,
    },
    {
      title: 'Rights Awareness Library',
      description: 'Browse legal info cards detailing tenant rights, maternity leaves, equal pay rules, and cybercrime safety standards.',
      icon: ShieldAlert,
    }
  ];

  const stats = [
    { value: '50k+', label: 'Queries Answered' },
    { value: '12k+', label: 'Documents Compiled' },
    { value: '99.4%', label: 'Satisfaction Rate' },
    { value: '100%', label: 'Indian Code Aligned' }
  ];

  const testimonials = [
    {
      quote: "NyayaAI has made explaining rental covenants to tenants exceptionally straightforward. The bilingual support is incredibly helpful.",
      author: "Aditya Hegde",
      role: "Property Manager, Bengaluru",
      avatar: "AH"
    },
    {
      quote: "The Document Analyzer is a lifesaver. It quickly highlights liability limitations and penalty sections in standard drafts.",
      author: "Dr. Sunita Rao",
      role: "Corporate Counsel, Mumbai",
      avatar: "SR"
    },
    {
      quote: "Generating a district consumer complaint took me less than five minutes. Extremely clean user interface.",
      author: "Rajesh Joshi",
      role: "Homeowner, Pune",
      avatar: "RJ"
    }
  ];

  const faqs = [
    {
      question: "Is NyayaAI a replacement for an advocate?",
      answer: "No. NyayaAI is designed as an educational assistant to simplify legal sections and compile draft templates. It does not provide formal legal advice or substitute for registered legal counsel."
    },
    {
      question: "What languages are supported on the platform?",
      answer: "We support legal questions and analyses in both English and Hindi. The AI chatbot adjusts its generated output based on the user's input query language."
    },
    {
      question: "Are the generated PDFs legally binding?",
      answer: "The generator outputs standard template structures aligned with Indian statutory acts. To make them fully binding, you should sign them, pay applicable stamp duties, and register them as required by local state rules."
    },
    {
      question: "Is my uploaded document data private?",
      answer: "Yes, security is a priority. Extracted text from uploaded documents is only processed for review, and temp files are deleted immediately after the analysis report is saved."
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white text-[#0F172A] relative flex flex-col justify-between selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Sticky Header */}
      <nav className="h-16 sticky top-0 bg-white/80 backdrop-blur-md border-b border-[#E2E8F0] z-50">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <Scale className="h-6 w-6 text-[#6366F1]" />
            <span className="text-xl font-bold tracking-tight text-[#0F172A]">NyayaAI</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link to="/about" className="text-sm font-medium text-[#475569] hover:text-[#0F172A] transition-colors">About</Link>
            <Link to="/contact" className="text-sm font-medium text-[#475569] hover:text-[#0F172A] transition-colors">Contact</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm font-medium text-[#475569] hover:text-[#0F172A] px-3 py-2 transition-colors">Log In</Link>
            <Link 
              to="/register" 
              className="text-sm font-medium text-white bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] px-4 py-2 rounded-xl hover:shadow-md hover:shadow-indigo-500/10 hover:brightness-105 active:scale-[0.98] transition-all"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F8FAFC]/50 to-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 bg-[#6366F1]/10 border border-[#6366F1]/20 px-3 py-1 rounded-full text-xs font-semibold text-[#6366F1]">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Aligned with Indian Laws</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0F172A] leading-tight">
              Empowering Indian Citizens with <span className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">AI-Driven Legal Aid</span>
            </h1>
            
            <p className="text-base sm:text-lg text-[#475569] max-w-xl leading-relaxed">
              Verify compliance sections, compile standard tenancy and non-disclosure deeds, scan files via OCR, and understand your rights in simple Hindi and English.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link 
                to="/register" 
                className="px-6 py-3.5 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/15 hover:shadow-indigo-500/25 hover:brightness-105 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <span>Get Started Free</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link 
                to="/login" 
                className="px-6 py-3.5 bg-white border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#0F172A] font-semibold rounded-xl active:scale-[0.98] transition-all flex items-center justify-center"
              >
                Access Platform
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative flex justify-center">
            <LegalIllustration />
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-8 border-y border-[#E2E8F0] bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center items-center gap-8 md:gap-16 text-xs font-semibold text-[#475569]">
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-[#6366F1]" />
            <span>256-Bit SSL Encrypted Connection</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[#6366F1]" />
            <span>IT Act 2000 Compliant Routing</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-[#6366F1]" />
            <span>Verified Indian Penal Code Datasets</span>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-bold tracking-tight text-[#0F172A]">Intelligent Legal Core</h2>
            <p className="text-sm text-[#475569]">Everything you need to review compliance, understand processes, and compile drafts.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div key={idx} className="bg-white border border-[#E2E8F0] p-6 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#6366F1]/10 flex items-center justify-center text-[#6366F1] mb-5">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-semibold text-[#0F172A] mb-2">{feat.title}</h3>
                    <p className="text-xs text-[#475569] leading-relaxed">{feat.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-[#F8FAFC] border-y border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <h3 className="text-4xl font-extrabold text-[#6366F1]">{stat.value}</h3>
              <p className="text-xs font-semibold text-[#475569] uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-bold tracking-tight text-[#0F172A]">Trusted by Thousands</h2>
            <p className="text-sm text-[#475569]">See how tenants, property managers, and citizens resolve daily queries.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test, idx) => (
              <div key={idx} className="bg-[#F8FAFC] border border-[#E2E8F0] p-6 rounded-2xl flex flex-col justify-between shadow-sm">
                <p className="text-sm text-[#475569] italic leading-relaxed">"{test.quote}"</p>
                <div className="flex items-center gap-3 mt-6 pt-4 border-t border-[#E2E8F0]">
                  <div className="w-8 h-8 rounded-full bg-[#6366F1]/10 flex items-center justify-center font-bold text-xs text-[#6366F1]">
                    {test.avatar}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[#0F172A]">{test.author}</h5>
                    <p className="text-[10px] text-[#475569]">{test.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 bg-[#F8FAFC] border-t border-[#E2E8F0]">
        <div className="max-w-3xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold tracking-tight text-[#0F172A]">Frequently Asked Questions</h2>
            <p className="text-sm text-[#475569]">Find answers to common questions about platform procedures.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden shadow-sm">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-semibold text-sm text-[#0F172A] hover:bg-[#F8FAFC] transition-colors"
                >
                  <span>{faq.question}</span>
                  {openFaq === idx ? <ChevronUp className="h-4 w-4 text-[#6366F1]" /> : <ChevronDown className="h-4 w-4 text-[#475569]" />}
                </button>
                {openFaq === idx && (
                  <div className="p-5 border-t border-[#E2E8F0] text-xs text-[#475569] leading-relaxed bg-[#F8FAFC]">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Empower Your Legal Decisions Today
          </h2>
          <p className="text-sm text-[#475569] max-w-xl mx-auto leading-relaxed">
            Create an account, consult the bilingual legal chatbot, compile standard agreements, or analyze document clauses in minutes.
          </p>
          <div className="pt-2">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/15 hover:shadow-indigo-500/25 hover:brightness-105 active:scale-[0.98] transition-all"
            >
              <span>Get Started Free</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#E2E8F0] bg-white py-12 text-[#475569] text-xs">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[#0F172A] font-bold text-sm">
              <Scale className="h-5 w-5 text-[#6366F1]" />
              <span>NyayaAI</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Simplifying Indian laws for everyone. Instantly access act details, compile deeds, and run document reviews.
            </p>
          </div>
          <div className="space-y-2">
            <h5 className="font-bold text-[#0F172A]">Platform</h5>
            <ul className="space-y-1.5">
              <li><Link to="/login" className="hover:text-[#0F172A]">AI Chatbot</Link></li>
              <li><Link to="/login" className="hover:text-[#0F172A]">Notice Builder</Link></li>
              <li><Link to="/login" className="hover:text-[#0F172A]">Document OCR Scanner</Link></li>
            </ul>
          </div>
          <div className="space-y-2">
            <h5 className="font-bold text-[#0F172A]">Company</h5>
            <ul className="space-y-1.5">
              <li><Link to="/about" className="hover:text-[#0F172A]">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-[#0F172A]">Contact Support</Link></li>
            </ul>
          </div>
          <div className="space-y-2">
            <h5 className="font-bold text-[#0F172A]">Legal</h5>
            <ul className="space-y-1.5">
              <li><span className="text-[11px] leading-relaxed block">Information provided is educational and does not constitute formal legal counsel.</span></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-6 border-t border-[#E2E8F0] text-center text-[10px] text-[#94A3B8]">
          <p>© {new Date().getFullYear()} NyayaAI. Developed for Indian Law awareness. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
