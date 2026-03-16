import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, ShieldCheck, AlertTriangle, ArrowRight } from 'lucide-react';

export function TenantFilter() {
  const [rent, setRent] = useState<number>(3000);
  const [income, setIncome] = useState<number>(120000);
  const [hasGuarantor, setHasGuarantor] = useState<boolean>(false);
  const [guarantorIncome, setGuarantorIncome] = useState<number>(0);
  const [credit, setCredit] = useState<number>(700);
  const [email, setEmail] = useState<string>('user@corporate.com');

  const [result, setResult] = useState<{ status: 'approved' | 'rejected' | 'flagged' | 'redirect', message: string } | null>(null);

  const evaluate = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Gate 4: Email
    if (!email) {
      setResult({ status: 'rejected', message: 'HALT: Email is required.' });
      return;
    }
    
    const isPublicEmail = email.includes('@gmail.com') || email.includes('@yahoo.com');

    // Gate 3: Credit
    if (credit < 650) {
      setResult({ status: 'redirect', message: 'AUTO-REJECT: Redirecting to Insurent/Institutional Guarantor partner.' });
      return;
    }

    // Gate 1 & 2: Income & Guarantor
    const rent40x = rent * 40;
    const rent80x = rent * 80;

    if (income < rent40x) {
      if (!hasGuarantor) {
        setResult({ status: 'rejected', message: 'REJECT: Ineligible. Income < 40x Rent and no Guarantor.' });
        return;
      } else if (guarantorIncome < rent80x) {
        setResult({ status: 'rejected', message: 'REJECT: Guarantor Income Insufficient (< 80x Rent).' });
        return;
      }
    }

    if (isPublicEmail) {
      setResult({ status: 'flagged', message: 'FLAG: Passed financial gates, but using public email (Gmail/Yahoo).' });
      return;
    }

    setResult({ status: 'approved', message: 'APPROVED: Tenant meets all NYC regulatory and firm requirements.' });
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
        <h2 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          Tenant Qualification Filter (Path A)
        </h2>
        <p className="text-slate-400 text-sm mb-6">
          Protects the firm from low-quality leads and ensures NYC regulatory compliance.
        </p>

        <form onSubmit={evaluate} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Monthly Rent ($)</label>
              <input type="number" value={rent} onChange={e => setRent(Number(e.target.value))} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Annual Income ($)</label>
              <input type="number" value={income} onChange={e => setIncome(Number(e.target.value))} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Credit Score</label>
              <input type="number" value={credit} onChange={e => setCredit(Number(e.target.value))} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Email Address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
            </div>
          </div>

          <div className="bg-slate-950/50 p-4 rounded-lg border border-slate-800/50 space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={hasGuarantor} onChange={e => setHasGuarantor(e.target.checked)} className="w-4 h-4 rounded border-slate-700 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-slate-900 bg-slate-900" />
              <span className="text-sm font-medium text-slate-300">Include Guarantor</span>
            </label>
            
            {hasGuarantor && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="pt-2">
                <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Guarantor Annual Income ($)</label>
                <input type="number" value={guarantorIncome} onChange={e => setGuarantorIncome(Number(e.target.value))} className="w-full md:w-1/2 bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
              </motion.div>
            )}
          </div>

          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
            Run Qualification Filter
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>

      {result && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-xl border flex items-start gap-3 ${
            result.status === 'approved' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
            result.status === 'rejected' ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' :
            result.status === 'redirect' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' :
            'bg-blue-500/10 border-blue-500/20 text-blue-400'
          }`}
        >
          {result.status === 'approved' && <ShieldCheck className="w-5 h-5 mt-0.5 shrink-0" />}
          {result.status === 'rejected' && <ShieldAlert className="w-5 h-5 mt-0.5 shrink-0" />}
          {(result.status === 'redirect' || result.status === 'flagged') && <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0" />}
          
          <div>
            <h3 className="font-semibold uppercase tracking-wider text-xs mb-1 opacity-80">System Output</h3>
            <p className="font-mono text-sm">{result.message}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
