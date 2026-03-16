import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, AlertTriangle, Send, CheckCircle2, ShieldAlert } from 'lucide-react';

const EXCLUDED_SPAM_LIST = ['spam.com', 'tempmail.com', 'junk.net'];

export function MessageFilter() {
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);
  const [result, setResult] = useState<{ status: 'approved' | 'discarded' | 'prompt', messageText: string } | null>(null);

  // Gate 1: Mandatory Data
  useEffect(() => {
    if (!name.trim() || !phone.trim() || !email.trim()) {
      setIsSubmitDisabled(true);
    } else {
      setIsSubmitDisabled(false);
    }
  }, [name, phone, email]);

  const evaluate = (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitDisabled) return;

    // Gate 2: Domain Filter
    const domain = email.split('@')[1]?.toLowerCase();
    if (EXCLUDED_SPAM_LIST.includes(domain)) {
      setResult({ 
        status: 'discarded', 
        messageText: 'SILENT_DISCARD: Email domain matches EXCLUDED_SPAM_LIST. Message dropped.' 
      });
      // In a real system, we might just show a fake success message to the spammer
      return;
    }

    // Gate 3: Intent Classification
    if (message.trim().length < 20) {
      setResult({ 
        status: 'prompt', 
        messageText: 'TRIGGER_PROMPT: "Please provide more detail regarding your inquiry to reach a representative."' 
      });
      return;
    }

    setResult({ 
      status: 'approved', 
      messageText: 'MESSAGE ROUTED: High-quality lead sent to Project Manager inbox.' 
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
        <h2 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
          <Mail className="w-5 h-5 text-sky-400" />
          "Send a Message" Filter (Noise Reducer)
        </h2>
        <p className="text-slate-400 text-sm mb-6">
          Acts as a high-level gatekeeper to prevent the Project Manager's inbox from being flooded with "junk."
        </p>

        <form onSubmit={evaluate} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Full Name *</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Phone *</label>
              <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Email Address *</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Message</label>
              <textarea 
                value={message} 
                onChange={e => setMessage(e.target.value)} 
                rows={4}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none" 
              />
              <div className="flex justify-between items-center mt-1">
                <span className="text-xs text-slate-500">{message.length} characters</span>
                {message.length > 0 && message.length < 20 && (
                  <span className="text-xs text-amber-500 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> Minimum 20 characters required
                  </span>
                )}
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitDisabled}
            className={`w-full font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 ${
              isSubmitDisabled 
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-500 text-white'
            }`}
          >
            {isSubmitDisabled ? 'Complete Required Fields' : 'Submit Inquiry'}
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      {result && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-xl border flex items-start gap-3 ${
            result.status === 'approved' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
            result.status === 'discarded' ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' :
            'bg-amber-500/10 border-amber-500/20 text-amber-400'
          }`}
        >
          {result.status === 'approved' && <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" />}
          {result.status === 'discarded' && <ShieldAlert className="w-5 h-5 mt-0.5 shrink-0" />}
          {result.status === 'prompt' && <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0" />}
          
          <div>
            <h3 className="font-semibold uppercase tracking-wider text-xs mb-1 opacity-80">System Output</h3>
            <p className="font-mono text-sm">{result.messageText}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
