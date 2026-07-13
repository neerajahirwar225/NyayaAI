import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { UploadCloud, FileText, AlertTriangle, AlertCircle, Sparkles, Loader, Eye } from 'lucide-react';

const DocumentAnalyzer = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [activeAnalysis, setActiveAnalysis] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const fetchHistory = async () => {
    try {
      const res = await api.get('/docs/uploads');
      setHistory(res.data.data);
      if (res.data.data.length > 0 && !activeAnalysis) {
        setActiveAnalysis(res.data.data[0]);
      }
    } catch (err) {
      console.error('Fetch uploads failed:', err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const res = await api.post('/docs/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setActiveAnalysis(res.data.data);
      setSelectedFile(null);
      fetchHistory();
    } catch (err) {
      console.error('Analysis failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Upload & History Left pane */}
      <div className="space-y-6">
        {/* Upload panel */}
        <div className="glass-card p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-white mb-4 font-mono">Analyze Legal Document</h3>
          
          <div 
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer ${
              dragActive 
                ? 'border-brand-accent bg-brand-accent/5' 
                : 'border-white/10 bg-white/5 hover:border-white/20'
            }`}
          >
            <input 
              id="file-upload" 
              type="file" 
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="hidden" 
            />
            <label htmlFor="file-upload" className="cursor-pointer space-y-3 block">
              <UploadCloud className="h-10 w-10 text-brand-accentMuted mx-auto" />
              <div className="text-xs font-semibold text-white">
                {selectedFile ? selectedFile.name : 'Drag & Drop or Click to Upload'}
              </div>
              <div className="text-[10px] text-brand-textMuted">
                Supports PDF, JPG, PNG (Max 10MB)
              </div>
            </label>
          </div>

          {selectedFile && (
            <button
              onClick={handleUpload}
              disabled={loading}
              className="w-full py-3 mt-4 bg-brand-accent hover:bg-brand-accentDark disabled:bg-indigo-500/50 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader className="h-4 w-4 animate-spin" />
                  <span>Extracting text & Auditing...</span>
                </>
              ) : (
                <span>Start Legal Audit</span>
              )}
            </button>
          )}
        </div>

        {/* History List */}
        <div className="glass-card p-6 rounded-2xl max-h-[350px] flex flex-col">
          <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2 font-mono">
            <FileText className="h-4 w-4 text-brand-accent" />
            <span>Upload Audits</span>
          </h3>
          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            {history.length === 0 ? (
              <div className="text-xs text-brand-textMuted py-8 text-center">No uploads audited yet.</div>
            ) : (
              history.map((item) => (
                <button
                  key={item._id}
                  onClick={() => setActiveAnalysis(item)}
                  className={`w-full text-left p-3 rounded-xl border flex items-center justify-between text-xs transition-all ${
                    activeAnalysis?._id === item._id
                      ? 'bg-brand-accent/20 border-brand-accent/40 text-white'
                      : 'bg-white/5 border-white/5 text-brand-textMuted hover:text-white hover:border-white/10'
                  }`}
                >
                  <div className="truncate max-w-[80%]">
                    <div className="font-semibold truncate">{item.filename}</div>
                    <div className="text-[9px] text-brand-textMuted mt-0.5">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <Eye className="h-3.5 w-3.5 shrink-0 opacity-60" />
                </button>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Analysis Output Pane */}
      <div className="lg:col-span-2 space-y-6">
        {loading ? (
          <div className="glass-card p-8 rounded-2xl h-[450px] flex flex-col items-center justify-center gap-4 text-center">
            <Loader className="h-10 w-10 text-brand-accent animate-spin" />
            <h3 className="text-lg font-bold text-white">Performing OCR & Legal Review</h3>
            <p className="text-xs text-brand-textMuted max-w-sm leading-relaxed">
              We are utilizing Tesseract.js to scan document text and Google Gemini to review clauses, verify penalty structures, and evaluate potential risks.
            </p>
          </div>
        ) : activeAnalysis ? (
          <div className="glass-card p-6 rounded-2xl space-y-6">
            {/* Header */}
            <div className="border-b border-white/5 pb-4">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-indigo-400" />
                <span>Audit Report: {activeAnalysis.filename}</span>
              </h2>
              <p className="text-xs text-brand-textMuted mt-0.5">
                Audited on {new Date(activeAnalysis.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* Summary */}
            <div>
              <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-2">Executive Summary</h4>
              <p className="text-sm text-brand-text leading-relaxed whitespace-pre-line">
                {activeAnalysis.summary}
              </p>
            </div>

            {/* Explanation */}
            <div>
              <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-2">Clause Explanations (Simple Language)</h4>
              <p className="text-sm text-brand-textMuted leading-relaxed whitespace-pre-line">
                {activeAnalysis.analysis?.explanation}
              </p>
            </div>

            {/* Warnings / Risks */}
            <div>
              <h4 className="text-xs font-bold text-brand-warning uppercase tracking-wider mb-2">Risks & unequal clauses</h4>
              <div className="space-y-2">
                {activeAnalysis.analysis?.risks?.length > 0 ? (
                  activeAnalysis.analysis.risks.map((risk, idx) => (
                    <div key={idx} className="bg-brand-warning/10 border border-brand-warning/20 p-3 rounded-xl flex items-start gap-2.5 text-xs text-brand-warning">
                      <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                      <p>{risk}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-xs text-brand-textMuted">No prominent risks identified.</div>
                )}
              </div>
            </div>

            {/* Penalties */}
            <div>
              <h4 className="text-xs font-bold text-brand-danger uppercase tracking-wider mb-2">Financial Penalties & Breach Costs</h4>
              <div className="space-y-2">
                {activeAnalysis.analysis?.penalties?.length > 0 ? (
                  activeAnalysis.analysis.penalties.map((penalty, idx) => (
                    <div key={idx} className="bg-brand-danger/10 border border-brand-danger/20 p-3 rounded-xl flex items-start gap-2.5 text-xs text-brand-danger">
                      <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                      <p>{penalty}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-xs text-brand-textMuted">No financial penal terms listed.</div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="glass-card p-12 rounded-2xl h-[450px] flex flex-col items-center justify-center text-center text-brand-textMuted">
            <UploadCloud className="h-16 w-16 text-brand-accent/20 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">No Document Selected</h3>
            <p className="text-xs max-w-sm">
              Upload a scanned legal agreement, rental contract, or NDA on the left to extract text and audit contents instantly.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentAnalyzer;
