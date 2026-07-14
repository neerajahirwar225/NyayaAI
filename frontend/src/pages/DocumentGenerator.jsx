import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useForm } from 'react-hook-form';
import { FileSignature, Download, Loader, FileText, CheckCircle } from 'lucide-react';

const DocumentGenerator = () => {
  const [selectedType, setSelectedType] = useState('Rent Agreement');
  const [loading, setLoading] = useState(false);
  const [generatedDoc, setGeneratedDoc] = useState(null);
  const [history, setHistory] = useState([]);

  const templates = [
    { name: 'Rent Agreement', desc: 'Standard residential/commercial tenancy deed' },
    { name: 'Non-Disclosure Agreement (NDA)', desc: 'Mutual business confidentiality agreement' },
    { name: 'Affidavit', desc: 'Standard declaration on oath' },
    { name: 'Legal Notice', desc: 'Formal legal notification demand letter' },
    { name: 'Consumer Complaint', desc: 'District forum compensation filing' },
    { name: 'FIR Draft', desc: 'Criminal offence report request to police' }
  ];

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const fetchHistory = async () => {
    try {
      const res = await api.get('/docs');
      setHistory(res.data.data);
    } catch (err) {
      console.error('History fetch failed:', err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    setGeneratedDoc(null);
    try {
      const res = await api.post('/docs/generate', {
        type: selectedType,
        content: data
      });
      setGeneratedDoc(res.data.data);
      fetchHistory();
      reset();
    } catch (err) {
      console.error('Generation failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Templates List Selector */}
      <div className="space-y-6">
        <div className="glass-card p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-white mb-4 font-mono">Select Template</h3>
          <div className="space-y-3">
            {templates.map((tmpl) => (
              <button
                key={tmpl.name}
                onClick={() => { setSelectedType(tmpl.name); setGeneratedDoc(null); reset(); }}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  selectedType === tmpl.name
                    ? 'bg-brand-accent/20 border-brand-accent text-white shadow-lg shadow-brand-accent/5'
                    : 'bg-white/5 border-white/5 text-brand-textMuted hover:text-white hover:border-white/10'
                }`}
              >
                <div className="font-semibold text-sm">{tmpl.name}</div>
                <div className="text-[10px] opacity-75 mt-1">{tmpl.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* History of generated documents */}
        <div className="glass-card p-6 rounded-2xl max-h-[350px] flex flex-col">
          <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2 font-mono">
            <FileText className="h-4 w-4 text-brand-accent" />
            <span>Generated Records</span>
          </h3>
          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            {history.length === 0 ? (
              <div className="text-xs text-brand-textMuted py-8 text-center">No documents generated yet.</div>
            ) : (
              history.map((doc) => (
                <div key={doc._id} className="p-3 bg-white/5 border border-white/5 rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <div className="font-semibold text-white">{doc.type}</div>
                    <div className="text-[9px] text-brand-textMuted mt-0.5">
                      {new Date(doc.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <a
                    href={`https://nyayaai-backend-qejx.onrender.com${doc.pdfUrl}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg bg-brand-accent/20 border border-brand-accent/35 text-brand-accentLight hover:bg-brand-accent hover:text-white transition-colors"
                  >
                    <Download className="h-3.5 w-3.5" />
                  </a>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Form Wizard pane */}
      <div className="lg:col-span-2 space-y-6">
        <div className="glass-card p-6 rounded-2xl">
          <div className="flex items-center gap-3 border-b border-white/5 pb-4 mb-6">
            <FileSignature className="h-6 w-6 text-brand-accent" />
            <div>
              <h2 className="text-lg font-semibold text-white font-mono">{selectedType} Form</h2>
              <p className="text-xs text-brand-textMuted">Fill variables to compile legal draft</p>
            </div>
          </div>

          {generatedDoc && (
            <div className="mb-6 bg-brand-success/10 border border-brand-success/20 p-4 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-brand-success" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Document Compiled Successfully!</h4>
                  <p className="text-xs text-brand-textMuted">Click download to fetch your legal PDF.</p>
                </div>
              </div>
              <a
                href={`https://nyayaai-backend-qejx.onrender.com${generatedDoc.pdfUrl}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-brand-success hover:bg-emerald-600 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-md shadow-emerald-500/10 transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>Download PDF</span>
              </a>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {selectedType === 'Rent Agreement' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-brand-textMuted uppercase mb-2">Landlord Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl glass-input text-white text-sm" placeholder="Ramesh Kumar" {...register('landlordName', { required: true })} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-textMuted uppercase mb-2">Landlord Address</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl glass-input text-white text-sm" placeholder="Address" {...register('landlordAddress', { required: true })} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-textMuted uppercase mb-2">Tenant Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl glass-input text-white text-sm" placeholder="Suresh Sharma" {...register('tenantName', { required: true })} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-textMuted uppercase mb-2">Tenant Address</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl glass-input text-white text-sm" placeholder="Address" {...register('tenantAddress', { required: true })} />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-brand-textMuted uppercase mb-2">Property Address for Rent</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl glass-input text-white text-sm" placeholder="Detailed property address" {...register('propertyAddress', { required: true })} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-textMuted uppercase mb-2">Monthly Rent (Rs.)</label>
                  <input type="number" className="w-full px-4 py-3 rounded-xl glass-input text-white text-sm" placeholder="e.g., 15000" {...register('rentAmount', { required: true })} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-textMuted uppercase mb-2">Security Deposit (Rs.)</label>
                  <input type="number" className="w-full px-4 py-3 rounded-xl glass-input text-white text-sm" placeholder="e.g., 30000" {...register('securityDeposit', { required: true })} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-textMuted uppercase mb-2">Agreement Term (Months)</label>
                  <input type="number" className="w-full px-4 py-3 rounded-xl glass-input text-white text-sm" defaultValue="11" {...register('duration')} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-textMuted uppercase mb-2">Start Date</label>
                  <input type="date" className="w-full px-4 py-3 rounded-xl glass-input text-white text-sm" {...register('startDate')} />
                </div>
              </div>
            )}

            {selectedType === 'Non-Disclosure Agreement (NDA)' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-brand-textMuted uppercase mb-2">Disclosing Party</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl glass-input text-white text-sm" placeholder="Company/Individual" {...register('disclosingParty', { required: true })} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-textMuted uppercase mb-2">Disclosing Representative</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl glass-input text-white text-sm" placeholder="Director/N/A" {...register('disclosingRep')} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-textMuted uppercase mb-2">Receiving Party</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl glass-input text-white text-sm" placeholder="Company/Individual" {...register('receivingParty', { required: true })} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-textMuted uppercase mb-2">Receiving Representative</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl glass-input text-white text-sm" placeholder="Partner/N/A" {...register('receivingRep')} />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-brand-textMuted uppercase mb-2">Agreement Purpose</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl glass-input text-white text-sm" placeholder="e.g., Consulting and data sharing" {...register('purpose', { required: true })} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-textMuted uppercase mb-2">Survival Term (Years)</label>
                  <input type="number" className="w-full px-4 py-3 rounded-xl glass-input text-white text-sm" defaultValue="2" {...register('term')} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-textMuted uppercase mb-2">Execution Date</label>
                  <input type="date" className="w-full px-4 py-3 rounded-xl glass-input text-white text-sm" {...register('date')} />
                </div>
              </div>
            )}

            {selectedType === 'Affidavit' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-brand-textMuted uppercase mb-2">Deponent Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl glass-input text-white text-sm" placeholder="e.g., Amit Patel" {...register('deponentName', { required: true })} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-textMuted uppercase mb-2">Deponent Age</label>
                  <input type="number" className="w-full px-4 py-3 rounded-xl glass-input text-white text-sm" placeholder="Age" {...register('age')} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-textMuted uppercase mb-2">Relation</label>
                  <select className="w-full px-4 py-3 rounded-xl glass-input text-white text-sm bg-[#0b0f19]" {...register('relationType')}>
                    <option value="S/o">Son of (S/o)</option>
                    <option value="D/o">Daughter of (D/o)</option>
                    <option value="W/o">Wife of (W/o)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-textMuted uppercase mb-2">Relative Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl glass-input text-white text-sm" placeholder="Father/Spouse Name" {...register('relativeName', { required: true })} />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-brand-textMuted uppercase mb-2">Residency Address</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl glass-input text-white text-sm" placeholder="Residency Address" {...register('deponentAddress', { required: true })} />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-brand-textMuted uppercase mb-2">Oath Statements (One per line)</label>
                  <textarea rows="4" className="w-full px-4 py-3 rounded-xl glass-input text-white text-sm" placeholder="That the facts stated are true..." {...register('statements', { required: true })} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-textMuted uppercase mb-2">Execution Place</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl glass-input text-white text-sm" placeholder="Delhi" {...register('place')} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-textMuted uppercase mb-2">Execution Date</label>
                  <input type="date" className="w-full px-4 py-3 rounded-xl glass-input text-white text-sm" {...register('date')} />
                </div>
              </div>
            )}

            {selectedType === 'Legal Notice' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-brand-textMuted uppercase mb-2">Client Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl glass-input text-white text-sm" placeholder="Your Name" {...register('clientName', { required: true })} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-textMuted uppercase mb-2">Client Address</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl glass-input text-white text-sm" placeholder="Your Address" {...register('clientAddress', { required: true })} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-textMuted uppercase mb-2">Recipient Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl glass-input text-white text-sm" placeholder="Opposing party" {...register('recipientName', { required: true })} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-textMuted uppercase mb-2">Recipient Address</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl glass-input text-white text-sm" placeholder="Opposing Address" {...register('recipientAddress', { required: true })} />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-brand-textMuted uppercase mb-2">Subject Matter</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl glass-input text-white text-sm" placeholder="e.g., Non-payment of rent, Breach of contract" {...register('subject', { required: true })} />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-brand-textMuted uppercase mb-2">Grievance Details</label>
                  <textarea rows="3" className="w-full px-4 py-3 rounded-xl glass-input text-white text-sm" placeholder="Describe details..." {...register('grievanceDetails', { required: true })} />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-brand-textMuted uppercase mb-2">Notice Demands</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl glass-input text-white text-sm" placeholder="e.g., Clear pending dues of Rs 50,000" {...register('demands', { required: true })} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-textMuted uppercase mb-2">Compliance Limit (Days)</label>
                  <input type="number" className="w-full px-4 py-3 rounded-xl glass-input text-white text-sm" defaultValue="15" {...register('daysLimit')} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-textMuted uppercase mb-2">Advocate Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl glass-input text-white text-sm" placeholder="Advocate Name" {...register('advocateName')} />
                </div>
              </div>
            )}

            {selectedType === 'Consumer Complaint' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-brand-textMuted uppercase mb-2">Complainant Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl glass-input text-white text-sm" placeholder="Your Name" {...register('complainantName', { required: true })} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-textMuted uppercase mb-2">Complainant Address</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl glass-input text-white text-sm" placeholder="Your Address" {...register('complainantAddress', { required: true })} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-textMuted uppercase mb-2">Opposite Party Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl glass-input text-white text-sm" placeholder="e.g., Acme Tech Corp" {...register('oppositePartyName', { required: true })} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-textMuted uppercase mb-2">Opposite Party Address</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl glass-input text-white text-sm" placeholder="Company Address" {...register('oppositePartyAddress', { required: true })} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-textMuted uppercase mb-2">Product/Service Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl glass-input text-white text-sm" placeholder="e.g., Model X Smartphone" {...register('productName', { required: true })} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-textMuted uppercase mb-2">Purchase Date</label>
                  <input type="date" className="w-full px-4 py-3 rounded-xl glass-input text-white text-sm" {...register('purchaseDate')} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-textMuted uppercase mb-2">Amount Paid (Rs.)</label>
                  <input type="number" className="w-full px-4 py-3 rounded-xl glass-input text-white text-sm" placeholder="Price paid" {...register('amountPaid', { required: true })} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-textMuted uppercase mb-2">Compensation Claimed (Rs.)</label>
                  <input type="number" className="w-full px-4 py-3 rounded-xl glass-input text-white text-sm" placeholder="Compensation" {...register('compensationAmount')} />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-brand-textMuted uppercase mb-2">Defect/Deficiency Details</label>
                  <textarea rows="3" className="w-full px-4 py-3 rounded-xl glass-input text-white text-sm" placeholder="Detail defects..." {...register('defectDetails', { required: true })} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-textMuted uppercase mb-2">District Forum</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl glass-input text-white text-sm" placeholder="District Forum" {...register('district')} />
                </div>
              </div>
            )}

            {selectedType === 'FIR Draft' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-brand-textMuted uppercase mb-2">Complainant Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl glass-input text-white text-sm" placeholder="Your Name" {...register('complainantName', { required: true })} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-textMuted uppercase mb-2">Complainant Phone</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl glass-input text-white text-sm" placeholder="Phone" {...register('complainantPhone')} />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-brand-textMuted uppercase mb-2">Complainant Address</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl glass-input text-white text-sm" placeholder="Address" {...register('complainantAddress', { required: true })} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-textMuted uppercase mb-2">Police Station Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl glass-input text-white text-sm" placeholder="Local Police station" {...register('policeStation', { required: true })} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-textMuted uppercase mb-2">District/City</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl glass-input text-white text-sm" placeholder="e.g., Delhi" {...register('district')} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-textMuted uppercase mb-2">Incident Type</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl glass-input text-white text-sm" placeholder="e.g., Cyber Fraud" {...register('incidentType', { required: true })} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-textMuted uppercase mb-2">Incident Date & Time</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl glass-input text-white text-sm" placeholder="Date/Time" {...register('incidentDateTime')} />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-brand-textMuted uppercase mb-2">Incident Location</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl glass-input text-white text-sm" placeholder="Incident street" {...register('incidentLocation', { required: true })} />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-brand-textMuted uppercase mb-2">Accused Details (if known)</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl glass-input text-white text-sm" placeholder="Details" {...register('accusedDetails')} />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-brand-textMuted uppercase mb-2">Incident Description</label>
                  <textarea rows="4" className="w-full px-4 py-3 rounded-xl glass-input text-white text-sm" placeholder="Describe incident..." {...register('incidentDescription', { required: true })} />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-4 bg-brand-accent hover:bg-brand-accentDark disabled:bg-indigo-500/50 text-white font-medium rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-brand-accent/20 transition-all active:scale-[0.98]"
            >
              {loading ? (
                <>
                  <Loader className="h-5 w-5 animate-spin" />
                  <span>Drafting legal document...</span>
                </>
              ) : (
                <span>Compile Document PDF</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DocumentGenerator;
