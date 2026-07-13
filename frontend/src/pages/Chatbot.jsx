import React, { useEffect, useState, useRef } from 'react';
import api from '../services/api';
import { Send, Scale, Loader, HelpCircle } from 'lucide-react';

const Chatbot = () => {
  const [chats, setChats] = useState([]);
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const scrollRef = useRef(null);

  const sampleQueries = [
    { text: 'How to file an FIR?', label: 'File an FIR' },
    { text: 'What are consumer rights in India?', label: 'Consumer Rights' },
    { text: 'Can my employer terminate me without notice?', label: 'Notice Period' },
    { text: 'साइबर धोखाधड़ी की शिकायत कहां दर्ज करें?', label: 'Cyber Crime (Hindi)' }
  ];

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await api.get('/chats');
        setChats(res.data.data.reverse());
      } catch (err) {
        console.error('Failed to fetch chat logs:', err);
      } finally {
        setLoadingHistory(false);
      }
    };
    fetchChats();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chats, loading]);

  const handleSend = async (queryText) => {
    const textToSend = queryText || question;
    if (!textToSend.trim() || loading) return;

    setLoading(true);
    if (!queryText) setQuestion('');

    const tempUserChat = { _id: 'temp-u-' + Date.now(), question: textToSend, answer: '', isTemp: true };
    setChats(prev => [...prev, tempUserChat]);

    try {
      const res = await api.post('/chats', { question: textToSend });
      setChats(prev => prev.filter(c => c._id !== tempUserChat._id).concat(res.data.data));
    } catch (err) {
      console.error('AI query resolution failed:', err);
      setChats(prev => prev.filter(c => c._id !== tempUserChat._id).concat({
        _id: 'err-' + Date.now(),
        question: textToSend,
        answer: `❌ Failed to resolve query: ${err.response?.data?.message || err.message}. Please configure your GEMINI_API_KEY in the backend .env file.`
      }));
    } finally {
      setLoading(false);
    }
  };

  const parseAnswer = (text) => {
    if (text.startsWith('❌')) return <div className="text-red-400 font-medium">{text}</div>;

    const parts = text.split(/(?=###\s+)/);

    return parts.map((part, idx) => {
      const isHeader = part.startsWith('###');
      if (isHeader) {
        const lines = part.split('\n');
        const header = lines[0].replace('###', '').trim();
        const content = lines.slice(1).join('\n').trim();
        return (
          <div key={idx} className="mb-4">
            <h4 className="text-xs font-bold text-brand-accentLight uppercase tracking-wider mb-1">{header}</h4>
            <p className="text-sm text-brand-text leading-relaxed whitespace-pre-line">{content}</p>
          </div>
        );
      }
      return (
        <p key={idx} className="text-sm text-brand-textMuted leading-relaxed whitespace-pre-line mb-3">
          {part.trim()}
        </p>
      );
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] glass rounded-2xl border border-white/5 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/5">
        <div className="flex items-center gap-3">
          <Scale className="h-6 w-6 text-brand-accent" />
          <div>
            <h3 className="text-sm font-semibold text-white font-mono">NyayaAI Legal Assistant</h3>
            <p className="text-[10px] text-brand-textMuted">Bilingual legal chatbot (English / हिंदी)</p>
          </div>
        </div>
      </div>

      {/* Chat Thread */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {loadingHistory ? (
          <div className="h-full flex flex-col items-center justify-center gap-3">
            <Loader className="h-8 w-8 text-brand-accent animate-spin" />
            <span className="text-xs text-brand-textMuted">Restoring legal transcripts...</span>
          </div>
        ) : chats.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center max-w-lg mx-auto">
            <HelpCircle className="h-12 w-12 text-brand-accent/40 mb-4" />
            <h4 className="text-lg font-bold text-white mb-2">Ask a Legal Query</h4>
            <p className="text-xs text-brand-textMuted mb-8">
              Inquire about Indian penal codes, employee notice agreements, tenant contracts, cyber crimes or police procedures. Ask in English or हिंदी.
            </p>
            {/* Quick Templates */}
            <div className="grid grid-cols-2 gap-3 w-full">
              {sampleQueries.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q.text)}
                  className="p-3 text-left rounded-xl bg-white/5 border border-white/5 hover:border-brand-accent/30 text-xs text-brand-textMuted hover:text-white transition-all"
                >
                  <span className="font-semibold block text-brand-accentLight mb-1">{q.label}</span>
                  <span className="line-clamp-1">{q.text}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {chats.map((c) => (
              <div key={c._id} className="space-y-4">
                {/* User message */}
                <div className="flex justify-end">
                  <div className="max-w-[75%] px-4 py-3 rounded-2xl bg-brand-accent text-white text-sm shadow-md">
                    {c.question}
                  </div>
                </div>

                {/* AI response */}
                <div className="flex justify-start">
                  <div className="max-w-[85%] w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/5 shadow-inner">
                    {c.isTemp ? (
                      <div className="flex items-center gap-2 text-brand-textMuted text-sm">
                        <Loader className="h-4 w-4 animate-spin text-brand-accent" />
                        <span>AI Legal Assistant is reviewing sections...</span>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        {parseAnswer(c.answer)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* Input Tray */}
      <div className="p-4 border-t border-white/5 bg-white/5">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="flex items-center gap-3"
        >
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            disabled={loading}
            placeholder="Type your legal query (e.g., How to file an FIR?)..."
            className="flex-1 px-4 py-3 rounded-xl glass-input text-white text-sm"
          />
          <button
            type="submit"
            disabled={loading || !question.trim()}
            className="p-3 bg-brand-accent hover:bg-brand-accentDark disabled:bg-indigo-500/50 text-white rounded-xl shadow-md transition-all active:scale-[0.98]"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
