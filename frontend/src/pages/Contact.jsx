import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Scale, ChevronLeft, Send, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
    }
  };

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

      <main className="max-w-md mx-auto px-6 py-12 flex-1 flex flex-col justify-center relative z-10 w-full">
        <h1 className="text-3xl font-extrabold text-white mb-6 text-center">Contact Us</h1>
        <div className="glass p-8 rounded-2xl border border-white/5 shadow-2xl">
          {submitted ? (
            <div className="text-center space-y-4 py-8">
              <CheckCircle className="h-16 w-16 text-brand-success mx-auto animate-bounce" />
              <h2 className="text-xl font-bold text-white">Message Sent!</h2>
              <p className="text-sm text-brand-textMuted">Thank you for reaching out. We will get back to you shortly.</p>
              <button 
                onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', message: '' }); }}
                className="mt-4 px-6 py-2 bg-white/5 border border-white/10 text-white text-sm rounded-xl hover:bg-white/10"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-brand-textMuted uppercase tracking-wider mb-2">Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl glass-input text-white text-sm"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-brand-textMuted uppercase tracking-wider mb-2">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl glass-input text-white text-sm"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-brand-textMuted uppercase tracking-wider mb-2">Message</label>
                <textarea 
                  required
                  rows="4"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl glass-input text-white text-sm"
                  placeholder="How can we help you?"
                />
              </div>
              <button 
                type="submit"
                className="w-full py-3 bg-brand-accent hover:bg-brand-accentDark text-white font-medium rounded-xl flex items-center justify-center gap-2"
              >
                <Send className="h-4 w-4" />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>
      </main>

      <footer className="border-t border-white/5 py-8 text-center text-xs text-brand-textMuted relative z-10">
        <p>© {new Date().getFullYear()} NyayaAI. Developed for Indian Law awareness. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Contact;
