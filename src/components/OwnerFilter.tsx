import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { KeyRound, Lock, Unlock, ArrowRight, AlertOctagon } from 'lucide-react';

const INTERNAL_DATABASE = [
  '100 PARK AVE',
  '200 MADISON AVE',
  '350 5TH AVE',
  '1 WORLD TRADE CENTER'
];

export function OwnerFilter() {
  const [address, setAddress] = useState<string>('100 PARK AVE');
  const [role, setRole] = useState<'OWNER/PRINCIPAL' | 'PROPERTY_MANAGER' | 'BROKER'>('OWNER/PRINCIPAL');

  const [result, setResult] = useState<{ status: 'approved' | 'restricted' | 'denied', message: string, showFinancials: boolean } | null>(null);

  const evaluate = (e: React.FormEvent) => {
    e.preventDefault();

    // Gate 1: Asset Verification
    const isVerified = INTERNAL_DATABASE.includes(address.toUpperCase());
    if (!isVerified) {
      setResult({ 
        status: 'denied', 
        message: 'DENY_PORTAL_ACCESS: Asset not found in managed portfolio. Routing to Onboarding/Sales.',
        showFinancials: false
      });
      return;
    }

    // Gate 2: Role
    if (role !== 'OWNER/PRINCIPAL') {
      setResult({ 
        status: 'restricted', 
        message: 'RESTRICT_FINANCIAL_VIEW: User is not Owner/Principal. Sensitive NOI data hidden.',
        showFinancials: false
      });
      return;
    }

    setResult({ 
      status: 'approved', 
      message: 'COMMAND CENTER UNLOCKED: Verified Owner/Principal. Full financial access granted.',
      showFinancials: true
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
        <h2 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
          <KeyRound className="w-5 h-5 text-amber-400" />
          Property Owner & Investor Filter (Path C)
        </h2>
        <p className="text-slate-400 text-sm mb-6">
          Validates actual ownership of a managed asset before granting access to sensitive NOI data.
        </p>

        <form onSubmit={evaluate} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Property Address</label>
              <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="e.g., 100 PARK AVE" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all uppercase" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">User Role</label>
              <select value={role} onChange={e => setRole(e.target.value as any)} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all">
                <option value="OWNER/PRINCIPAL">Owner / Principal</option>
                <option value="PROPERTY_MANAGER">Property Manager</option>
                <option value="BROKER">Broker</option>
              </select>
            </div>
          </div>

          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
            Run Owner Filter
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
            result.status === 'denied' ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' :
            'bg-amber-500/10 border-amber-500/20 text-amber-400'
          }`}
        >
          {result.status === 'approved' && <Unlock className="w-5 h-5 mt-0.5 shrink-0" />}
          {result.status === 'denied' && <AlertOctagon className="w-5 h-5 mt-0.5 shrink-0" />}
          {result.status === 'restricted' && <Lock className="w-5 h-5 mt-0.5 shrink-0" />}
          
          <div className="w-full">
            <h3 className="font-semibold uppercase tracking-wider text-xs mb-1 opacity-80">System Output</h3>
            <p className="font-mono text-sm mb-4">{result.message}</p>

            {/* Simulated Dashboard View */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-slate-950 border border-slate-800 rounded-lg p-4">
                <h4 className="text-xs text-slate-500 uppercase tracking-wider mb-1">Total Units</h4>
                <p className="text-xl font-mono text-white">142</p>
              </div>
              <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 relative overflow-hidden">
                <h4 className="text-xs text-slate-500 uppercase tracking-wider mb-1">Net Operating Income (NOI)</h4>
                {result.showFinancials ? (
                  <p className="text-xl font-mono text-emerald-400">$2,450,000</p>
                ) : (
                  <div className="absolute inset-0 backdrop-blur-md bg-slate-950/80 flex items-center justify-center border border-slate-800 rounded-lg">
                    <span className="text-xs font-mono text-slate-400 flex items-center gap-2">
                      <Lock className="w-3 h-3" /> RESTRICTED
                    </span>
                  </div>
                )}
              </div>
              <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 relative overflow-hidden">
                <h4 className="text-xs text-slate-500 uppercase tracking-wider mb-1">Yield</h4>
                {result.showFinancials ? (
                  <p className="text-xl font-mono text-emerald-400">5.2%</p>
                ) : (
                  <div className="absolute inset-0 backdrop-blur-md bg-slate-950/80 flex items-center justify-center border border-slate-800 rounded-lg">
                    <span className="text-xs font-mono text-slate-400 flex items-center gap-2">
                      <Lock className="w-3 h-3" /> RESTRICTED
                    </span>
                  </div>
                )}
              </div>
              <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 relative overflow-hidden">
                <h4 className="text-xs text-slate-500 uppercase tracking-wider mb-1">Principal Remaining</h4>
                {result.showFinancials ? (
                  <p className="text-xl font-mono text-emerald-400">$18,200,000</p>
                ) : (
                  <div className="absolute inset-0 backdrop-blur-md bg-slate-950/80 flex items-center justify-center border border-slate-800 rounded-lg">
                    <span className="text-xs font-mono text-slate-400 flex items-center gap-2">
                      <Lock className="w-3 h-3" /> RESTRICTED
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
