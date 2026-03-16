import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, AlertTriangle, ArrowRight, CheckCircle2 } from 'lucide-react';

export function InstitutionalFilter() {
  const [liquidCapital, setLiquidCapital] = useState<number>(5000000);
  const [entityType, setEntityType] = useState<'INDIVIDUAL' | 'FUND/REIT'>('FUND/REIT');

  const [result, setResult] = useState<{ status: 'approved' | 'rejected' | 'redirect' | 'request_proof', message: string } | null>(null);

  const evaluate = (e: React.FormEvent) => {
    e.preventDefault();

    // Gate 1: Liquidity
    if (liquidCapital < 1000000) {
      setResult({ status: 'redirect', message: 'ROUTE_TO_STANDARD_BROKERAGE: Liquid Capital < $1M. Priority 1 CRM path locked.' });
      return;
    }

    // Gate 2: Entity
    if (entityType === 'INDIVIDUAL') {
      setResult({ status: 'request_proof', message: 'REQUEST_PROOF_OF_FUNDS: Individual entity detected. Awaiting verification.' });
      return;
    }

    // Binary Result: Tier 1 or Tier 2
    if (liquidCapital >= 10000000) {
      setResult({ status: 'approved', message: 'IMMEDIATE EXECUTIVE ALERT: Tier 1 ($10M+) Institutional Capital detected. BYPASS_TO_PARTNER_DIRECT.' });
    } else {
      setResult({ status: 'approved', message: 'IMMEDIATE EXECUTIVE ALERT: Tier 2 ($1M-$10M) Institutional Capital detected. BYPASS_TO_PARTNER_DIRECT.' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
        <h2 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-indigo-400" />
          Institutional Partner Filter (Path B)
        </h2>
        <p className="text-slate-400 text-sm mb-6">
          Filters out "window shoppers" and only allows High-Net-Worth (HNW) or Institutional Capital through.
        </p>

        <form onSubmit={evaluate} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Liquid Capital ($)</label>
              <input type="number" value={liquidCapital} onChange={e => setLiquidCapital(Number(e.target.value))} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Entity Type</label>
              <select value={entityType} onChange={e => setEntityType(e.target.value as any)} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all">
                <option value="INDIVIDUAL">Individual</option>
                <option value="FUND/REIT">Fund / REIT</option>
              </select>
            </div>
          </div>

          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
            Run Institutional Filter
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
          {result.status === 'approved' && <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" />}
          {result.status === 'rejected' && <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0" />}
          {(result.status === 'redirect' || result.status === 'request_proof') && <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0" />}
          
          <div>
            <h3 className="font-semibold uppercase tracking-wider text-xs mb-1 opacity-80">System Output</h3>
            <p className="font-mono text-sm">{result.message}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
