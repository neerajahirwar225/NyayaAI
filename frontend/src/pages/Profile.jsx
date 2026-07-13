import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { FileText, FileUp, Download, ShieldCheck } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const [docs, setDocs] = useState([]);
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [docsRes, uploadsRes] = await Promise.all([
          api.get('/docs'),
          api.get('/docs/uploads')
        ]);
        setDocs(docsRes.data.data);
        setUploads(uploadsRes.data.data);
      } catch (err) {
        console.error('Failed to load profile assets:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Profile Overview Card */}
      <div className="glass p-6 rounded-2xl border border-white/5 flex flex-col md:flex-row items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-brand-accent/25 border-2 border-brand-accent flex items-center justify-center text-white font-extrabold text-2xl shadow-xl">
          {user?.name ? user.name.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase() : 'U'}
        </div>
        <div className="text-center md:text-left space-y-1">
          <h2 className="text-xl font-bold text-white flex items-center justify-center md:justify-start gap-2">
            <span>{user?.name}</span>
            <ShieldCheck className="h-5 w-5 text-brand-accent" />
          </h2>
          <p className="text-sm text-brand-textMuted">{user?.email}</p>
          <div className="inline-block mt-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-brand-textMuted">
            Role: <span className="text-white capitalize">{user?.role || 'User'}</span>
          </div>
        </div>
      </div>

      {/* Lists Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Generated PDF Documents */}
        <div className="glass-card p-6 rounded-2xl flex flex-col h-[400px]">
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2 font-mono">
            <FileText className="h-4.5 w-4.5 text-brand-accent" />
            <span>Compiled Legal Documents</span>
          </h3>

          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {loading ? (
              <div className="space-y-2">
                <div className="shimmer h-12 rounded-xl"></div>
                <div className="shimmer h-12 rounded-xl"></div>
              </div>
            ) : docs.length === 0 ? (
              <div className="text-xs text-brand-textMuted py-12 text-center">No compiled PDF templates.</div>
            ) : (
              docs.map((doc) => (
                <div key={doc._id} className="p-3 bg-white/5 border border-white/5 rounded-xl flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-bold text-white">{doc.type}</h5>
                    <p className="text-[10px] text-brand-textMuted mt-1">
                      {new Date(doc.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <a
                    href={`http://localhost:5000${doc.pdfUrl}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg bg-brand-accent/20 border border-brand-accent/35 text-brand-accentLight hover:bg-brand-accent hover:text-white transition-colors"
                  >
                    <Download className="h-4 w-4" />
                  </a>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Uploaded scans */}
        <div className="glass-card p-6 rounded-2xl flex flex-col h-[400px]">
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2 font-mono">
            <FileUp className="h-4.5 w-4.5 text-brand-accent" />
            <span>Uploaded Scanned Reviews</span>
          </h3>

          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {loading ? (
              <div className="space-y-2">
                <div className="shimmer h-12 rounded-xl"></div>
                <div className="shimmer h-12 rounded-xl"></div>
              </div>
            ) : uploads.length === 0 ? (
              <div className="text-xs text-brand-textMuted py-12 text-center">No scanned document uploads.</div>
            ) : (
              uploads.map((up) => (
                <div key={up._id} className="p-3 bg-white/5 border border-white/5 rounded-xl space-y-1">
                  <div className="flex justify-between items-start">
                    <h5 className="text-xs font-bold text-white truncate max-w-[70%]">{up.filename}</h5>
                    <span className="text-[9px] text-brand-textMuted">
                      {new Date(up.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-[10px] text-brand-textMuted line-clamp-2">
                    {up.summary}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
