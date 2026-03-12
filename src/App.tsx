/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Search, 
  UserCircle, 
  Home, 
  ShieldCheck, 
  Users, 
  TrendingUp, 
  Phone, 
  Mail, 
  MapPin, 
  ChevronRight, 
  ChevronDown,
  Menu, 
  X, 
  ArrowRight,
  CreditCard,
  Wrench,
  FileText,
  AlertTriangle,
  Star,
  CheckCircle2,
  Play,
  Calendar,
  Filter,
  Clock,
  BookOpen,
  ArrowUpRight,
  MessageSquare,
  Bot,
  Send,
  Sparkles,
  CalendarCheck,
  Download,
  PieChart as PieIcon,
  Lock,
  Calculator,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  Cell,
  PieChart,
  Pie
} from 'recharts';

// --- Argo Concierge Component (Conditional Logic) ---

const ArgoConcierge = ({ setPage }: { setPage: (p: Page) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<'start' | 'tenant-start' | 'investor-start' | 'investor-accredited' | 'investor-allocation' | 'investor-data-room' | 'investor-jv' | 'owner-start' | 'owner-email' | 'msg-email' | 'msg-content' | 'q-neighborhood-options' | 'q-neighborhood-other' | 'q-email' | 'q-budget' | 'q-income' | 'q-guarantor' | 'q-credit' | 'result' | 'data-collection' | 'success'>('start');
  const [userData, setUserData] = useState({
    role: '',
    neighborhood: '',
    budget: 0,
    credit: 0,
    income: 0,
    hasGuarantor: false,
    moveIn: '',
    occupants: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: ''
  });
  const [qualificationResult, setQualificationResult] = useState<'qualified' | 'conditional' | 'unqualified' | 'geo-reject' | null>(null);
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([
    { role: 'model', text: "Welcome to Argo. How can we assist your goals today?" }
  ]);
  const [input, setInput] = useState('');

  const [showPopup1, setShowPopup1] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      if (!isOpen) setShowPopup1(true);
    }, 5000);
    
    const timer2 = setTimeout(() => {
      if (!isOpen) setShowPopup2(true);
    }, 15000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isOpen]);

  const handlePopup1Click = () => {
    setShowPopup1(false);
    setIsOpen(true);
    handleRoleSelect('Tenant');
  };

  const handlePopup2Click = () => {
    setShowPopup2(false);
    setIsOpen(true);
    setStep('start');
    setMessages([{ role: 'model', text: "Welcome to Argo. How can we assist your goals today?" }]);
  };

  const handleRoleSelect = (role: 'Tenant' | 'Investor' | 'Owner' | 'Message') => {
    setUserData(prev => ({ ...prev, role }));
    if (role === 'Tenant') {
      setStep('q-neighborhood-options');
      setMessages(prev => [...prev, 
        { role: 'user', text: "I am looking for a Home" },
        { role: 'model', text: "Excellent. Let's see if we have the perfect match for you. Which neighborhood are we focusing on?" }
      ]);
    } else if (role === 'Investor') {
      setStep('investor-start');
      setMessages(prev => [...prev, 
        { role: 'user', text: "I am an Institutional Partner" },
        { role: 'model', text: "Are you seeking a Joint Venture opportunity or searching for our latest Fund Performance data?" }
      ]);
    } else if (role === 'Owner') {
      setStep('owner-start');
      setMessages(prev => [...prev, 
        { role: 'user', text: "I am a Property Owner" },
        { role: 'model', text: "Are you looking for Property Management or Asset Management services?" }
      ]);
    } else if (role === 'Message') {
      setStep('msg-email');
      setMessages(prev => [...prev, 
        { role: 'user', text: "I'd like to send a message." },
        { role: 'model', text: "Certainly. Please provide your email address so our team can reach back out to you." }
      ]);
    }
  };

  const handleInvestorSelect = (option: 'Joint Venture' | 'Fund Performance') => {
    setMessages(prev => [...prev, { role: 'user', text: option }]);
    setTimeout(() => {
      if (option === 'Fund Performance') {
        setIsOpen(false);
        setPage('investor-portal');
        setStep('start');
        setMessages([{ role: 'model', text: "Welcome to Argo. How can we assist your goals today?" }]);
      } else {
        setStep('investor-accredited');
        setMessages(prev => [...prev, { role: 'model', text: "Are you an SEC Accredited Investor or Qualified Purchaser?" }]);
      }
    }, 600);
  };

  const handleInvestorAccredited = (isAccredited: boolean) => {
    setMessages(prev => [...prev, { role: 'user', text: isAccredited ? "Yes, I am an Accredited Investor." : "No, I am not." }]);
    setTimeout(() => {
      if (isAccredited) {
        setStep('investor-allocation');
        setMessages(prev => [...prev, { role: 'model', text: "Excellent. What is your target capital allocation for this cycle?" }]);
      } else {
        setStep('start');
        setMessages(prev => [...prev, { role: 'model', text: "Thank you. Currently, our private placements are restricted to Accredited Investors under SEC Rule 506(c). How else can we assist you?" }]);
      }
    }, 600);
  };

  const handleInvestorAllocation = (allocation: string) => {
    setMessages(prev => [...prev, { role: 'user', text: allocation }]);
    setTimeout(() => {
      setStep('investor-jv');
      setMessages(prev => [...prev, { role: 'model', text: "Understood. Please provide your email address to connect with our acquisitions team." }]);
    }, 600);
  };

  const handleOwnerSelect = (option: 'Property Management' | 'Asset Management') => {
    setMessages(prev => [...prev, { role: 'user', text: option }]);
    setTimeout(() => {
      if (option === 'Asset Management') {
        setIsOpen(false);
        setPage('dashboard');
        setStep('start');
        setMessages([{ role: 'model', text: "Welcome to Argo. How can we assist your goals today?" }]);
      } else {
        setStep('owner-email');
        setMessages(prev => [...prev, { role: 'model', text: "Please provide your email address so our management team can reach out to you." }]);
      }
    }, 600);
  };

  const handleNeighborhoodSelect = (option: string) => {
    setMessages(prev => [...prev, { role: 'user', text: option }]);
    setTimeout(() => {
      if (option === 'Other') {
        setStep('q-neighborhood-other');
        setMessages(prev => [...prev, { role: 'model', text: "Understood. Please specify the neighborhood or ZIP code. We specialize in the Five Boroughs." }]);
      } else {
        setUserData(prev => ({ ...prev, neighborhood: option }));
        setStep('q-email');
        setMessages(prev => [...prev, { role: 'model', text: "To send you your qualification results, please provide your email address." }]);
      }
    }, 600);
  };

  const handleInput = () => {
    if (!input.trim() && step !== 'msg-content') return;
    const userText = input.trim() || "(No message provided)";
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);

    setTimeout(() => {
      if (step === 'investor-data-room' || step === 'investor-jv' || step === 'owner-email') {
        setUserData(prev => ({ ...prev, email: userText }));
        setMessages(prev => [...prev, { role: 'model', text: "Thank you. Your information has been securely logged. Our team will contact you shortly." }]);
        setStep('start');
        
        // CRM Integration Webhook Placeholder
        console.log("--- CRM INTEGRATION SYNC ---");
        console.log(`Endpoint: https://api.argorealestate.com/v1/leads/intake`);
        if (step.includes('investor')) {
          console.log(`Payload: { type: 'Institutional Investor', email: '${userText}', status: 'Priority 1', accredited: true }`);
          console.log("Action: Pushing to Salesforce Financial Services Cloud...");
        } else {
          console.log(`Payload: { type: 'Property Owner', email: '${userText}' }`);
          console.log("Action: Pushing to Yardi Voyager...");
        }
      } else if (step === 'msg-email') {
        setUserData(prev => ({ ...prev, email: userText }));
        setStep('msg-content');
        setMessages(prev => [...prev, { role: 'model', text: "Thank you. Please explain your situation and what you are looking for." }]);
      } else if (step === 'msg-content') {
        setMessages(prev => [...prev, { role: 'model', text: "Thank you. Your message has been logged. We will contact you within one business day." }]);
        setStep('start');
      } else if (step === 'q-neighborhood-other') {
        const textLower = userText.toLowerCase();
        if (textLower.includes('jersey') || textLower.includes('nj') || textLower.includes('long island') || textLower.includes('upstate') || textLower.includes('westchester') || textLower.includes('ct') || textLower.includes('connecticut')) {
          setUserData(prev => ({ ...prev, neighborhood: userText }));
          setQualificationResult('geo-reject');
          setMessages(prev => [...prev, { role: 'model', text: `Argo specializes exclusively in high-end stewardship within the New York City boroughs. We focus our expertise where we can provide the highest level of service. While we don't currently have listings in ${userText}, would you like us to notify you if our portfolio expands?` }]);
          setStep('result');
        } else {
          setUserData(prev => ({ ...prev, neighborhood: userText }));
          setStep('q-email');
          setMessages(prev => [...prev, { role: 'model', text: "To send you your qualification results, please provide your email address." }]);
        }
      } else if (step === 'q-email') {
        setUserData(prev => ({ ...prev, email: userText }));
        setStep('q-budget');
        setMessages(prev => [...prev, { role: 'model', text: "Understood. And what is your monthly budget for this residence?" }]);
      } else if (step === 'q-budget') {
        const budget = parseInt(userText.replace(/\D/g, '')) || 0;
        setUserData(prev => ({ ...prev, budget }));
        setStep('q-income');
        setMessages(prev => [...prev, { role: 'model', text: "Perfect. NYC standards typically require an annual gross income of 40x the monthly rent. What is your approximate annual household income?" }]);
      } else if (step === 'q-income') {
        const income = parseInt(userText.replace(/\D/g, '')) || 0;
        setUserData(prev => {
          const updatedData = { ...prev, income };
          if (income < updatedData.budget * 40) {
            setStep('q-guarantor');
            setMessages(m => [...m, { role: 'model', text: "Do you have a US-based guarantor who earns at least 80x the monthly rent? (Yes/No)" }]);
          } else {
            setStep('q-credit');
            setMessages(m => [...m, { role: 'model', text: "Thank you. To ensure a smooth application, what is your approximate credit score?" }]);
          }
          return updatedData;
        });
      } else if (step === 'q-guarantor') {
        const hasGuarantor = userText.toLowerCase().includes('yes') || userText.toLowerCase().includes('yup') || userText.toLowerCase().includes('sure');
        setUserData(prev => ({ ...prev, hasGuarantor }));
        setStep('q-credit');
        setMessages(prev => [...prev, { role: 'model', text: "Thank you. To ensure a smooth application, what is your approximate credit score?" }]);
      } else if (step === 'q-credit') {
        const credit = parseInt(userText.replace(/\D/g, '')) || 0;
        setUserData(prev => {
          const updatedData = { ...prev, credit };
          
          const incomeRequirement = updatedData.budget * 40;
          const meetsIncome = updatedData.income >= incomeRequirement || updatedData.hasGuarantor;
          
          let result: 'qualified' | 'conditional' | 'unqualified' = 'qualified';
          
          if (updatedData.credit < 670 || !meetsIncome) {
            result = 'unqualified';
          } else if (updatedData.credit < 700) {
            result = 'conditional';
          }
          
          setQualificationResult(result);
          
          let resultText = "";
          if (result === 'qualified') {
            resultText = `Congratulations! You meet the preliminary requirements for residency. To provide you with VIP service, please provide your contact details. A leasing specialist will reach out shortly to schedule your private showing.`;
          } else if (result === 'conditional') {
            resultText = `You are likely qualified, though additional documentation or a slightly higher security deposit may be requested by the board. To provide you with VIP service, please provide your contact details.`;
          } else {
            if (updatedData.credit < 670) {
              resultText = `Based on the current requirements for our portfolio, we require a credit score of 670 or higher. We recommend third-party guarantor services like TheGuarantors or Insurent, which Argo proudly accepts. Would you like us to keep your info on file for future opportunities?`;
            } else {
              resultText = `Based on NYC requirements, applicants must meet the 40x income rule or have an 80x guarantor. We recommend third-party guarantor services like TheGuarantors or Insurent. Would you like us to keep your info on file for future opportunities?`;
            }
          }
          
          setMessages(m => [...m, { role: 'model', text: resultText }]);
          setStep('result');
          return updatedData;
        });
      }
    }, 600);
  };

  const handleDataSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
    
    if (qualificationResult === 'qualified' || qualificationResult === 'conditional') {
      setMessages(prev => [...prev, { role: 'model', text: "Excellent. Your information has been received. A leasing specialist will reach out to you shortly." }]);
    } else {
      setMessages(prev => [...prev, { role: 'model', text: "Thank you. Your information has been securely saved. We will notify you as soon as a suitable property becomes available." }]);
    }
    
    // Simulate backend magic
    const incomeMultiplier = userData.budget > 0 ? Math.round(userData.income / userData.budget) : 0;
    
    console.log("--- CRM INTEGRATION SYNC ---");
    console.log(`Endpoint: https://api.argorealestate.com/v1/leads/tenant`);
    
    if (qualificationResult === 'qualified' || qualificationResult === 'conditional') {
      console.log(`Payload: { type: 'Qualified Tenant', name: '${userData.firstName} ${userData.lastName}', credit: ${userData.credit}, incomeMultiplier: ${incomeMultiplier}x, target: '${userData.neighborhood}' }`);
      console.log("Action: Pushing to AppFolio / Yardi Voyager...");
      console.log("Action: Triggering Leasing Agent Notification...");
    } else {
      console.log(`Payload: { type: 'Waitlist Tenant', name: '${userData.firstName} ${userData.lastName}', target: '${userData.neighborhood}' }`);
      console.log("Action: Pushing to HubSpot Nurture Sequence...");
    }
  };

  return (
    <>
      {/* Intent-Based Engagement Pop-ups */}
      <AnimatePresence>
        {showPopup1 && !isOpen && (
          <motion.div 
            key="popup1"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed bottom-28 right-8 w-80 bg-white border border-argo-gold/30 shadow-2xl z-40 overflow-hidden"
          >
            <div className="h-1 bg-argo-gold w-full"></div>
            <div className="p-6 relative">
              <button 
                onClick={() => setShowPopup1(false)}
                className="absolute top-4 right-4 text-argo-slate/40 hover:text-argo-slate transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="w-10 h-10 bg-argo-blue text-white rounded-full flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-serif mb-2 leading-tight text-argo-blue">Unlock the 2026 Argo Residency Standards.</h4>
              <p className="text-xs text-argo-slate/80 leading-relaxed mb-6">
                Bypass manual paperwork and get instant priority for our Manhattan & Queens portfolios.
              </p>
              <button 
                onClick={handlePopup1Click}
                className="w-full py-3 bg-argo-gold text-white text-[10px] font-bold uppercase tracking-widest hover:bg-argo-blue transition-colors"
              >
                Check Eligibility
              </button>
            </div>
          </motion.div>
        )}

        {showPopup2 && !isOpen && (
          <motion.div 
            key="popup2"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
            className="fixed bottom-28 left-8 w-80 bg-white border border-argo-blue/30 shadow-2xl z-40 overflow-hidden"
          >
            <div className="h-1 bg-argo-blue w-full"></div>
            <div className="p-6 relative">
              <button 
                onClick={() => setShowPopup2(false)}
                className="absolute top-4 right-4 text-argo-slate/40 hover:text-argo-slate transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="w-10 h-10 bg-argo-gold text-white rounded-full flex items-center justify-center mb-4">
                <Building2 className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-serif mb-2 leading-tight text-argo-blue">Explore Argo Services</h4>
              <p className="text-xs text-argo-slate/80 leading-relaxed mb-6">
                Discover our Property Management, Asset Management, and Institutional Partnership opportunities.
              </p>
              <button 
                onClick={handlePopup2Click}
                className="w-full py-3 bg-argo-blue text-white text-[10px] font-bold uppercase tracking-widest hover:bg-argo-gold transition-colors"
              >
                Explore Services
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-argo-blue text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-argo-gold transition-all duration-500 group"
        aria-label="Open Concierge"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6 group-hover:scale-110 transition-transform" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            key="chat-window"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-28 right-8 z-50 w-[400px] h-[600px] bg-white shadow-[0_40px_100px_rgba(0,0,0,0.15)] border border-black/[0.05] flex flex-col overflow-hidden"
          >
            <div className="bg-argo-blue p-6 text-white flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-argo-gold rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold tracking-widest uppercase">Argo Concierge</h4>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                    <span className="text-[10px] text-white/60 uppercase tracking-widest">Active</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-grow overflow-y-auto p-6 space-y-6 bg-argo-paper">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 text-sm leading-relaxed ${
                    m.role === 'user' 
                      ? 'bg-argo-blue text-white rounded-2xl rounded-tr-none' 
                      : 'bg-white text-argo-slate border border-black/[0.03] rounded-2xl rounded-tl-none font-serif italic'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              
              {step === 'start' && (
                <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <button onClick={() => handleRoleSelect('Tenant')} className="w-full py-3 px-4 bg-argo-blue text-white text-xs font-bold uppercase tracking-widest hover:bg-argo-gold transition-all">
                    Qualification Test (Find a Home)
                  </button>
                  <button onClick={() => handleRoleSelect('Investor')} className="w-full py-3 px-4 bg-white border border-argo-gold/20 text-argo-blue text-xs font-bold uppercase tracking-widest hover:bg-argo-gold hover:text-white transition-all">
                    I am an Institutional Partner
                  </button>
                  <button onClick={() => handleRoleSelect('Owner')} className="w-full py-3 px-4 bg-white border border-argo-gold/20 text-argo-blue text-xs font-bold uppercase tracking-widest hover:bg-argo-gold hover:text-white transition-all">
                    I am a Property Owner
                  </button>
                  <button onClick={() => handleRoleSelect('Message')} className="w-full py-3 px-4 bg-white border border-argo-gold/20 text-argo-blue text-xs font-bold uppercase tracking-widest hover:bg-argo-gold hover:text-white transition-all">
                    Send a Message
                  </button>
                </div>
              )}

              {step === 'investor-start' && (
                <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <button onClick={() => handleInvestorSelect('Joint Venture')} className="w-full py-2 px-4 bg-white border border-argo-gold/20 text-argo-blue text-xs font-bold uppercase tracking-widest hover:bg-argo-gold hover:text-white transition-all">
                    Joint Venture
                  </button>
                  <button onClick={() => handleInvestorSelect('Fund Performance')} className="w-full py-2 px-4 bg-white border border-argo-gold/20 text-argo-blue text-xs font-bold uppercase tracking-widest hover:bg-argo-gold hover:text-white transition-all">
                    Fund Performance
                  </button>
                </div>
              )}

              {step === 'investor-accredited' && (
                <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <button onClick={() => handleInvestorAccredited(true)} className="w-full py-2 px-4 bg-white border border-argo-gold/20 text-argo-blue text-xs font-bold uppercase tracking-widest hover:bg-argo-gold hover:text-white transition-all">
                    Yes, Accredited
                  </button>
                  <button onClick={() => handleInvestorAccredited(false)} className="w-full py-2 px-4 bg-white border border-argo-gold/20 text-argo-blue text-xs font-bold uppercase tracking-widest hover:bg-argo-gold hover:text-white transition-all">
                    No
                  </button>
                </div>
              )}

              {step === 'investor-allocation' && (
                <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <button onClick={() => handleInvestorAllocation('$1M - $5M')} className="w-full py-2 px-4 bg-white border border-argo-gold/20 text-argo-blue text-xs font-bold uppercase tracking-widest hover:bg-argo-gold hover:text-white transition-all">
                    $1M - $5M
                  </button>
                  <button onClick={() => handleInvestorAllocation('$5M - $10M')} className="w-full py-2 px-4 bg-white border border-argo-gold/20 text-argo-blue text-xs font-bold uppercase tracking-widest hover:bg-argo-gold hover:text-white transition-all">
                    $5M - $10M
                  </button>
                  <button onClick={() => handleInvestorAllocation('$10M+')} className="w-full py-2 px-4 bg-white border border-argo-gold/20 text-argo-blue text-xs font-bold uppercase tracking-widest hover:bg-argo-gold hover:text-white transition-all">
                    $10M+
                  </button>
                </div>
              )}

              {step === 'owner-start' && (
                <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <button onClick={() => handleOwnerSelect('Property Management')} className="w-full py-2 px-4 bg-white border border-argo-gold/20 text-argo-blue text-xs font-bold uppercase tracking-widest hover:bg-argo-gold hover:text-white transition-all">
                    Property Management
                  </button>
                  <button onClick={() => handleOwnerSelect('Asset Management')} className="w-full py-2 px-4 bg-white border border-argo-gold/20 text-argo-blue text-xs font-bold uppercase tracking-widest hover:bg-argo-gold hover:text-white transition-all">
                    Asset Management
                  </button>
                </div>
              )}

              {step === 'q-neighborhood-options' && (
                <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  {['Upper West Side', 'Upper East Side', 'Chelsea / Hudson Yards', 'Tribeca', 'Long Island City', 'Other'].map(option => (
                    <button 
                      key={option}
                      onClick={() => handleNeighborhoodSelect(option)} 
                      className="w-full py-2 px-4 bg-white border border-argo-gold/20 text-argo-blue text-xs font-bold uppercase tracking-widest hover:bg-argo-gold hover:text-white transition-all"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}

              {step === 'result' && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <button 
                    onClick={() => setStep('data-collection')}
                    className="w-full py-4 bg-argo-gold text-white text-[10px] font-bold uppercase tracking-widest hover:bg-argo-blue transition-all"
                  >
                    {qualificationResult === 'qualified' || qualificationResult === 'conditional' ? 'Lock in my Result' : 'Yes, Notify Me'}
                  </button>
                </div>
              )}

              {step === 'data-collection' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white p-6 border border-black/[0.03] rounded-xl"
                >
                  <h5 className="text-argo-blue font-bold uppercase tracking-widest text-[10px] mb-2">Secure Registration</h5>
                  <p className="text-[10px] text-argo-slate mb-6">
                    {qualificationResult === 'qualified' || qualificationResult === 'conditional' 
                      ? 'Enter your details below to receive your Pre-Qualification Certificate and a direct link to book a VIP tour.' 
                      : 'Enter your details below to join our priority waitlist for flexible-requirement projects.'}
                  </p>
                  <form onSubmit={handleDataSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <input 
                        type="text" 
                        placeholder="First Name" 
                        required 
                        className="w-full bg-argo-warm border-none px-4 py-3 text-xs focus:ring-1 focus:ring-argo-gold"
                        value={userData.firstName}
                        onChange={(e) => setUserData(prev => ({ ...prev, firstName: e.target.value }))}
                      />
                      <input 
                        type="text" 
                        placeholder="Last Name" 
                        required 
                        className="w-full bg-argo-warm border-none px-4 py-3 text-xs focus:ring-1 focus:ring-argo-gold"
                        value={userData.lastName}
                        onChange={(e) => setUserData(prev => ({ ...prev, lastName: e.target.value }))}
                      />
                    </div>
                    <input 
                      type="tel" 
                      placeholder="Phone Number" 
                      required 
                      className="w-full bg-argo-warm border-none px-4 py-3 text-xs focus:ring-1 focus:ring-argo-gold"
                      value={userData.phone}
                      onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                    />
                    <input 
                      type="email" 
                      placeholder="Email Address" 
                      required 
                      className="w-full bg-argo-warm border-none px-4 py-3 text-xs focus:ring-1 focus:ring-argo-gold"
                      value={userData.email}
                      onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input 
                        type="date" 
                        placeholder="Move-in Date" 
                        className="w-full bg-argo-warm border-none px-4 py-3 text-xs focus:ring-1 focus:ring-argo-gold text-argo-slate"
                        value={userData.moveIn}
                        onChange={(e) => setUserData(prev => ({ ...prev, moveIn: e.target.value }))}
                      />
                      <input 
                        type="number" 
                        placeholder="Occupants" 
                        className="w-full bg-argo-warm border-none px-4 py-3 text-xs focus:ring-1 focus:ring-argo-gold"
                        value={userData.occupants}
                        onChange={(e) => setUserData(prev => ({ ...prev, occupants: e.target.value }))}
                      />
                    </div>
                    <p className="text-[8px] text-argo-slate/60 italic">* Move-in date and occupants are optional.</p>
                    <button type="submit" className="btn-gold w-full py-3 text-[8px]">
                      {qualificationResult === 'qualified' || qualificationResult === 'conditional' ? 'Get Pre-Qualification Certificate' : 'Join Priority Waitlist'}
                    </button>
                  </form>
                </motion.div>
              )}

              {step === 'success' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 bg-argo-gold/10 border border-argo-gold/20 rounded-xl text-center"
                >
                  <CalendarCheck className="w-8 h-8 text-argo-gold mx-auto mb-4" />
                  <h5 className="text-argo-blue font-bold uppercase tracking-widest text-xs mb-2">
                    {qualificationResult === 'qualified' || qualificationResult === 'conditional' ? 'VIP Tour Access' : 'Application Logged'}
                  </h5>
                  <p className="text-argo-slate text-xs mb-6">
                    {qualificationResult === 'qualified' || qualificationResult === 'conditional' 
                      ? 'Schedule your private tour with an Argo specialist.' 
                      : 'We will notify you of upcoming projects that match your profile.'}
                  </p>
                  <button className="btn-gold w-full py-3 text-[8px]">
                    {qualificationResult === 'qualified' || qualificationResult === 'conditional' ? 'Schedule Tour Now' : 'View Other Properties'}
                  </button>
                </motion.div>
              )}
            </div>

            {['msg-email', 'msg-content', 'q-neighborhood-other', 'q-email', 'q-budget', 'q-income', 'q-guarantor', 'q-credit', 'investor-data-room', 'investor-jv', 'owner-email'].includes(step) && (
              <div className="p-6 bg-white border-t border-black/[0.05]">
                <div className="relative">
                  <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleInput()}
                    placeholder={step === 'msg-content' ? "Type your message (Optional)..." : "Type your response..."}
                    className="w-full pl-4 pr-12 py-4 bg-argo-warm border-none focus:ring-1 focus:ring-argo-gold text-sm font-serif italic"
                  />
                  <button 
                    onClick={handleInput}
                    disabled={!input.trim() && step !== 'msg-content'}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-argo-blue text-white rounded-lg flex items-center justify-center hover:bg-argo-gold transition-colors disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// --- Institutional Reporting Dashboard ---

const DashboardPage = () => {
  const [selectedPortfolio, setSelectedPortfolio] = useState('All Properties');
  
  const occupancyData = [
    { month: 'Jan', rate: 94 },
    { month: 'Feb', rate: 95 },
    { month: 'Mar', rate: 94.5 },
    { month: 'Apr', rate: 96 },
    { month: 'May', rate: 97.2 },
    { month: 'Jun', rate: 98.5 },
  ];

  const rentCollection = [
    { name: 'Collected', value: 98.2 },
    { name: 'Pending', value: 1.8 },
  ];

  const noiData = [
    { category: 'Q1', value: 1250000 },
    { category: 'Q2', value: 1340000 },
    { category: 'Q3', value: 1420000 },
    { category: 'Q4', value: 1550000 },
  ];

  const portfolios = ['All Properties', 'Upper West Side Portfolio', 'Chelsea Luxury Lofts', 'Midtown Commercial'];

  const COLORS = ['#0A1F3D', '#C5A059', '#4A5568', '#F9F7F2'];

  return (
    <div className="pt-48 pb-32 bg-argo-paper min-h-screen animate-in fade-in duration-1000">
      <div className="section-container">
        {/* Dashboard Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="label-micro">Institutional Reporting</div>
              <div className="w-1 h-1 bg-argo-gold rounded-full"></div>
              <div className="text-[10px] text-argo-slate/40 font-bold uppercase tracking-widest">Live Data Feed via Supabase</div>
            </div>
            <h1 className="text-6xl md:text-7xl leading-[0.9] mb-8">Executive <br/><span className="italic">Insights.</span></h1>
            
            <div className="flex flex-wrap gap-4 mt-8">
              {portfolios.map(p => (
                <button 
                  key={p}
                  onClick={() => setSelectedPortfolio(p)}
                  className={`px-4 py-2 text-[9px] uppercase tracking-widest font-bold transition-all border ${selectedPortfolio === p ? 'bg-argo-blue text-white border-argo-blue' : 'bg-white text-argo-slate border-black/5 hover:border-argo-gold'}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-4 w-full lg:w-auto">
            <button className="flex-1 lg:flex-none px-6 py-4 border border-black/10 label-micro hover:bg-white transition-all flex items-center justify-center gap-2">
              <Download className="w-3 h-3" /> Export PDF
            </button>
            <button className="flex-1 lg:flex-none px-6 py-4 bg-argo-blue text-white label-micro hover:bg-argo-gold transition-all flex items-center justify-center gap-2">
              <TrendingUp className="w-3 h-3" /> Real-Time Feed
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-10 border border-black/[0.03] shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-argo-gold transform -translate-x-full group-hover:translate-x-0 transition-transform"></div>
            <div className="label-micro text-argo-slate/40 mb-4">Portfolio Occupancy</div>
            <div className="text-5xl font-serif mb-2">98.5%</div>
            <div className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" /> +1.3% vs Last Month
            </div>
          </div>
          <div className="bg-white p-10 border border-black/[0.03] shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-argo-blue transform -translate-x-full group-hover:translate-x-0 transition-transform"></div>
            <div className="label-micro text-argo-slate/40 mb-4">Rent Collection</div>
            <div className="text-5xl font-serif mb-2 text-emerald-600 font-bold">99.2%</div>
            <div className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" /> On Track
            </div>
          </div>
          <div className="bg-white p-10 border border-black/[0.03] shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-argo-slate transform -translate-x-full group-hover:translate-x-0 transition-transform"></div>
            <div className="label-micro text-argo-slate/40 mb-4">Active Work Orders</div>
            <div className="text-5xl font-serif mb-2">14</div>
            <div className="text-[10px] text-argo-gold font-bold uppercase tracking-widest flex items-center gap-1">
              <Clock className="w-3 h-3" /> 8 Avg. Hours to Close
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Occupancy Trend */}
          <div className="bg-white p-10 border border-black/[0.03] shadow-sm">
            <h3 className="text-2xl font-serif mb-12">Occupancy <span className="italic">Trajectory</span></h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={occupancyData}>
                  <defs>
                    <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#C5A059" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#C5A059" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#4A5568', fontWeight: 'bold'}} />
                  <YAxis domain={[90, 100]} axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#4A5568', fontWeight: 'bold'}} />
                  <Tooltip 
                    contentStyle={{backgroundColor: '#0A1F3D', border: 'none', borderRadius: '0', color: '#fff'}}
                    itemStyle={{color: '#C5A059'}}
                  />
                  <Area type="monotone" dataKey="rate" stroke="#C5A059" strokeWidth={2} fillOpacity={1} fill="url(#colorRate)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* NOI Chart */}
          <div className="bg-white p-10 border border-black/[0.03] shadow-sm">
            <h3 className="text-2xl font-serif mb-12">Net Operating Income <span className="italic">(NOI)</span></h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={noiData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
                  <XAxis type="number" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#4A5568', fontWeight: 'bold'}} tickFormatter={(value) => `$${value / 1000}k`} />
                  <YAxis dataKey="category" type="category" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#4A5568', fontWeight: 'bold'}} width={40} />
                  <Tooltip 
                    cursor={{fill: '#F9F7F2'}}
                    contentStyle={{backgroundColor: '#0A1F3D', border: 'none', borderRadius: '0', color: '#fff'}}
                    formatter={(value: number) => [`$${value.toLocaleString()}`, 'NOI']}
                  />
                  <Bar dataKey="value" fill="#0A1F3D" radius={[0, 4, 4, 0]} barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
           <div className="bg-white p-10 border border-black/[0.03] shadow-sm lg:col-span-1">
             <h3 className="text-2xl font-serif mb-8">Rent <span className="italic">Collection</span></h3>
             <div className="h-[250px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                   <Pie
                     data={rentCollection}
                     cx="50%"
                     cy="50%"
                     innerRadius={60}
                     outerRadius={80}
                     paddingAngle={5}
                     dataKey="value"
                   >
                     {rentCollection.map((entry, index) => (
                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                     ))}
                   </Pie>
                   <Tooltip />
                 </PieChart>
               </ResponsiveContainer>
             </div>
             <div className="flex justify-center gap-8 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-argo-blue"></div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-argo-slate">Collected</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-argo-gold"></div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-argo-slate">Pending</span>
                </div>
             </div>
           </div>

           <div className="bg-white p-10 border border-black/[0.03] shadow-sm lg:col-span-2">
             <div className="flex justify-between items-center mb-8">
               <h3 className="text-2xl font-serif">Compliance <span className="italic">Monitor</span></h3>
               <div className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                 <ShieldCheck className="w-3 h-3" /> Fully Protected
               </div>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="p-6 border border-black/[0.05] rounded-lg bg-argo-paper relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
                 <div className="flex justify-between items-start mb-4">
                   <div className="label-micro text-argo-slate">LL97 (Carbon)</div>
                   <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                 </div>
                 <div className="text-xl font-serif mb-1">Compliant</div>
                 <div className="text-[10px] text-argo-slate/60 uppercase tracking-widest">Next Filing: 2027</div>
               </div>

               <div className="p-6 border border-black/[0.05] rounded-lg bg-argo-paper relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
                 <div className="flex justify-between items-start mb-4">
                   <div className="label-micro text-argo-slate">LL31 (Lead)</div>
                   <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                 </div>
                 <div className="text-xl font-serif mb-1">Inspected 2026</div>
                 <div className="text-[10px] text-argo-slate/60 uppercase tracking-widest">Zero Violations</div>
               </div>

               <div className="p-6 border border-black/[0.05] rounded-lg bg-argo-paper relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
                 <div className="flex justify-between items-start mb-4">
                   <div className="label-micro text-argo-slate">Fire Safety</div>
                   <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                 </div>
                 <div className="text-xl font-serif mb-1">Certified</div>
                 <div className="text-[10px] text-argo-slate/60 uppercase tracking-widest">FASD Approved</div>
               </div>
             </div>
             
             <div className="mt-8 p-4 bg-argo-blue/5 border border-argo-blue/10 rounded flex items-start gap-4">
               <AlertTriangle className="w-5 h-5 text-argo-blue flex-shrink-0 mt-0.5" />
               <p className="text-sm text-argo-slate font-serif italic">
                 "Our automated compliance engine actively monitors NYC DOB and ECB databases. Your portfolio currently has zero active violations, saving an estimated $45,000 in potential municipal fines this quarter."
               </p>
             </div>
           </div>
        </div>

        {/* Footer Info */}
        <div className="mt-12 flex justify-between items-center text-[9px] uppercase tracking-widest text-argo-slate/30 font-bold">
          <div className="flex items-center gap-4">
            <span>Data Source: Supabase Real-Time Engine</span>
            <div className="w-1 h-1 bg-argo-slate/20 rounded-full"></div>
            <span>Last Sync: {new Date().toLocaleTimeString()}</span>
          </div>
          <div>System Status: Operational</div>
        </div>
      </div>
    </div>
  );
};

// --- Types ---
type Page = 'home' | 'property-management' | 'residential' | 'residents' | 'about' | 'new-development' | 'contact' | 'case-studies' | 'asset-management' | 'argo-u' | 'careers' | 'portal' | 'accessibility' | 'privacy' | 'terms' | 'fair-housing' | 'dashboard' | 'investor-portal';

interface Listing {
  id: string;
  title: string;
  neighborhood: string;
  price: string;
  beds: number;
  baths: number;
  type: 'Co-op' | 'Condo' | 'Rental' | 'Townhouse';
  image: string;
}

interface CaseStudy {
  id: string;
  title: string;
  type: string;
  units: number;
  location: string;
  challenge: string;
  outcome: string;
  image: string;
}

// --- Mock Data ---
const LISTINGS: Listing[] = [
  { id: '1', title: 'The Beresford Penthouse', neighborhood: 'Upper West Side', price: '$12,500,000', beds: 4, baths: 3.5, type: 'Co-op', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80' },
  { id: '2', title: 'Modern Chelsea Loft', neighborhood: 'Chelsea', price: '$4,200,000', beds: 2, baths: 2, type: 'Condo', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80' },
  { id: '3', title: 'Historic Brooklyn Townhouse', neighborhood: 'Brooklyn Heights', price: '$8,900,000', beds: 5, baths: 4, type: 'Townhouse', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80' },
  { id: '4', title: 'Luxury Midtown Studio', neighborhood: 'Midtown East', price: '$3,500/mo', beds: 0, baths: 1, type: 'Rental', image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80' },
];

interface Agent {
  id: string;
  name: string;
  title: string;
  image: string;
  specialties: string[];
}

const AGENTS: Agent[] = [
  { id: '1', name: 'Coco Dorneanu', title: 'Senior Associate Broker', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80', specialties: ['Luxury Sales', 'Co-ops'] },
  { id: '2', name: 'Michael Chen', title: 'New Development Specialist', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80', specialties: ['Condos', 'Investments'] },
  { id: '3', name: 'Sarah Jenkins', title: 'Leasing Director', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80', specialties: ['Rentals', 'Brooklyn'] },
];

const CASE_STUDIES: CaseStudy[] = [
  { 
    id: '1', 
    title: 'The Grandview Conversion', 
    type: 'Rental to Condo', 
    units: 120, 
    location: 'Upper East Side',
    challenge: 'Managing a complex conversion while maintaining 95% occupancy.',
    outcome: 'Successful sell-out within 18 months and 15% increase in asset value.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'
  },
  { 
    id: '2', 
    title: 'Historic West Village Co-op', 
    type: 'Management Turnaround', 
    units: 85, 
    location: 'West Village',
    challenge: 'Addressing long-standing deferred maintenance and financial arrears.',
    outcome: 'Reduced arrears by 40% and completed major facade restoration under budget.',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80'
  },
];

// --- Components ---

const Navbar = ({ currentPage, setPage }: { currentPage: Page, setPage: (p: Page) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const navLinks: { name: string, id: Page }[] = [
    { name: 'About', id: 'about' },
    { name: 'Services', id: 'property-management' },
    { name: 'Argo University', id: 'argo-u' },
    { name: 'Properties', id: 'residential' },
    { name: 'Careers', id: 'careers' },
    { name: 'Development', id: 'new-development' },
  ];

  const services = [
    { name: 'Property Management', id: 'property-management', icon: Building2, desc: 'Full-service co-op and condo management.' },
    { name: 'Asset Management', id: 'asset-management', icon: TrendingUp, desc: 'Maximizing value for building owners and investors.' },
    { name: 'Compliance', id: 'property-management', icon: ShieldCheck, desc: 'Navigating NYC Local Laws and regulations.' },
  ];

  const isLight = !isScrolled && currentPage === 'home';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center cursor-pointer" onClick={() => setPage('home')}>
          <div className={`text-3xl font-serif font-bold tracking-tighter transition-all duration-300 ${isLight ? 'text-white drop-shadow-md' : 'text-argo-blue'}`}>
            ARGO<span className="text-argo-gold">.</span>
          </div>
          <div className={`ml-3 hidden sm:block text-[10px] uppercase tracking-[0.2em] font-bold leading-none transition-colors duration-300 ${isLight ? 'text-white/90 drop-shadow-sm' : 'text-argo-slate'}`}>
            Real Estate<br/>Since 1952
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <div 
              key={link.name} 
              className="relative group"
              onMouseEnter={() => link.name === 'Services' && setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button
                onClick={() => setPage(link.id)}
                className={`label-micro transition-colors hover:text-argo-gold flex items-center gap-1 ${
                  currentPage === link.id 
                    ? 'text-argo-gold underline underline-offset-8' 
                    : isLight ? 'text-white' : 'text-argo-blue'
                }`}
              >
                {link.name}
                {link.name === 'Services' && <ChevronDown className="w-3 h-3" />}
              </button>

              {link.name === 'Services' && (
                <AnimatePresence>
                  {isServicesOpen && (
                    <motion.div
                      key="services-dropdown"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-6 w-[600px]"
                    >
                      <div className="bg-white shadow-2xl border border-black/[0.05] p-8 grid grid-cols-3 gap-6">
                        {services.map((service, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              setPage(service.id as Page);
                              setIsServicesOpen(false);
                            }}
                            className="text-left group/item"
                          >
                            <div className="w-10 h-10 bg-argo-warm rounded-full flex items-center justify-center mb-4 group-hover/item:bg-argo-gold group-hover/item:text-white transition-colors">
                              <service.icon className="w-5 h-5 text-argo-blue group-hover/item:text-white" />
                            </div>
                            <h4 className="label-micro text-argo-blue mb-2 group-hover/item:text-argo-gold">{service.name}</h4>
                            <p className="text-[10px] text-argo-slate/60 leading-relaxed">{service.desc}</p>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
          <button 
            onClick={() => setPage('portal')} 
            className={`btn-gold !py-2 !px-5 flex items-center gap-2 shadow-lg hover:scale-105 transition-transform`}
          >
            <UserCircle className="w-4 h-4" />
            Portal Login
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className={`lg:hidden transition-colors duration-300 ${isLight ? 'text-white' : 'text-argo-blue'}`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => { setPage(link.id); setIsMobileMenuOpen(false); }}
                  className="block w-full text-left px-3 py-4 text-sm font-bold uppercase tracking-widest text-argo-blue hover:bg-argo-warm"
                >
                  {link.name}
                </button>
              ))}
              <div className="pt-4">
                <button 
                  onClick={() => { setPage('contact'); setIsMobileMenuOpen(false); }}
                  className="w-full btn-primary uppercase tracking-widest text-xs"
                >
                  Get Proposal
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = ({ setPage }: { setPage: (p: Page) => void }) => {
  return (
    <footer className="bg-argo-blue text-white pt-32 pb-12">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div>
            <div className="text-3xl font-serif font-bold mb-8 tracking-tighter">
              ARGO<span className="text-argo-gold">.</span>
            </div>
            <p className="text-white/50 text-xs leading-relaxed mb-8 font-serif italic">
              NYC's trusted property management and residential brokerage firm for over 70 years. On your corner, on your side.
            </p>
          </div>

          <div>
            <div className="label-micro text-white/40 mb-8">Services</div>
            <ul className="space-y-4 text-[10px] uppercase tracking-[0.2em] font-bold">
              <li><button onClick={() => setPage('property-management')} className="hover:text-argo-gold transition-colors">Management</button></li>
              <li><button onClick={() => setPage('residential')} className="hover:text-argo-gold transition-colors">Brokerage</button></li>
              <li><button onClick={() => setPage('new-development')} className="hover:text-argo-gold transition-colors">Development</button></li>
              <li><button onClick={() => setPage('case-studies')} className="hover:text-argo-gold transition-colors">Track Record</button></li>
            </ul>
          </div>

          <div>
            <div className="label-micro text-white/40 mb-8">Residents</div>
            <ul className="space-y-4 text-[10px] uppercase tracking-[0.2em] font-bold">
              <li><button onClick={() => setPage('residents')} className="hover:text-argo-gold transition-colors">Portal Login</button></li>
              <li><button onClick={() => setPage('residents')} className="hover:text-argo-gold transition-colors">Online Payments</button></li>
              <li><button onClick={() => setPage('residents')} className="hover:text-argo-gold transition-colors">Maintenance</button></li>
            </ul>
          </div>

          <div>
            <div className="label-micro text-white/40 mb-8">Contact</div>
            <ul className="space-y-6 text-xs font-serif italic text-white/60">
              <li className="flex items-start">
                <MapPin className="w-4 h-4 mr-4 mt-1 text-argo-gold" />
                <span>50 West 17th Street<br/>New York, NY 10011</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-4 h-4 mr-4 text-argo-gold" />
                <span>(212) 896-8600</span>
              </li>
              <li className="pt-6 border-t border-white/10">
                <div className="label-micro text-red-400 mb-2">Emergency</div>
                <div className="text-white font-sans font-bold tracking-widest">(212) 896-8600</div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center text-[9px] uppercase tracking-[0.2em] text-white/30 font-bold">
          <div className="flex items-center gap-6 mb-6 md:mb-0">
            <div className="flex items-center gap-2">
              <img 
                src="https://www.hud.gov/sites/dfiles/Main/images/Equal-Housing-Opportunity-Logo.png" 
                alt="Equal Housing Opportunity" 
                className="w-6 h-6 invert opacity-50"
                referrerPolicy="no-referrer"
              />
              <span>Equal Housing Opportunity</span>
            </div>
            <p>© 2026 Argo Real Estate.</p>
          </div>
          <div className="flex space-x-8">
            <button onClick={() => setPage('privacy')} className="hover:text-white transition-colors">Privacy</button>
            <button onClick={() => setPage('terms')} className="hover:text-white transition-colors">Terms</button>
            <button onClick={() => setPage('fair-housing')} className="hover:text-white transition-colors">Fair Housing</button>
            <button onClick={() => setPage('accessibility')} className="hover:text-white transition-colors">Accessibility</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Page Content ---

const AccessibilityPage = () => (
  <div className="pt-48 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-1000">
    <div className="section-container">
      <div className="max-w-4xl">
        <div className="label-micro mb-6">Accessibility</div>
        <h1 className="text-6xl md:text-8xl mb-12 leading-[0.9]">Digital <br/><span className="italic">Inclusion.</span></h1>
        <div className="prose prose-invert prose-argo max-w-none text-argo-slate font-serif italic leading-relaxed space-y-8">
          <p className="text-2xl">Argo Real Estate is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.</p>
          <div className="space-y-4 text-lg not-italic font-sans">
            <h3 className="text-argo-blue font-bold uppercase tracking-widest text-sm">Conformance Status</h3>
            <p>The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers to improve accessibility for people with disabilities. It defines three levels of conformance: Level A, Level AA, and Level AAA. Argo Real Estate is partially conformant with WCAG 2.1 level AA.</p>
            <h3 className="text-argo-blue font-bold uppercase tracking-widest text-sm">Feedback</h3>
            <p>We welcome your feedback on the accessibility of Argo Real Estate. Please let us know if you encounter accessibility barriers on Argo Real Estate:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Phone: (212) 896-8600</li>
              <li>E-mail: accessibility@argo.com</li>
              <li>Visitor Address: 50 West 17th Street, New York, NY 10011</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const PrivacyPage = () => (
  <div className="pt-48 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-1000">
    <div className="section-container">
      <div className="max-w-4xl">
        <div className="label-micro mb-6">Privacy Policy</div>
        <h1 className="text-6xl md:text-8xl mb-12 leading-[0.9]">Data <br/><span className="italic">Sovereignty.</span></h1>
        <div className="prose prose-invert prose-argo max-w-none text-argo-slate font-serif italic leading-relaxed space-y-8">
          <p className="text-2xl">Your privacy is paramount. This policy outlines how we collect, use, and protect your personal information across our digital platforms.</p>
          <div className="space-y-4 text-lg not-italic font-sans">
            <p>We collect information you provide directly to us, such as when you create an account, request a proposal, or contact us. This may include your name, email address, phone number, and building address.</p>
            <p>We use this information to provide our services, communicate with you, and improve our platform. We do not sell your personal information to third parties.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const TermsPage = () => (
  <div className="pt-48 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-1000">
    <div className="section-container">
      <div className="max-w-4xl">
        <div className="label-micro mb-6">Terms of Service</div>
        <h1 className="text-6xl md:text-8xl mb-12 leading-[0.9]">Legal <br/><span className="italic">Framework.</span></h1>
        <div className="prose prose-invert prose-argo max-w-none text-argo-slate font-serif italic leading-relaxed space-y-8">
          <p className="text-2xl">By accessing our services, you agree to the following terms and conditions.</p>
          <div className="space-y-4 text-lg not-italic font-sans">
            <p>All content on this website is the property of Argo Real Estate and is protected by copyright laws. You may not reproduce or distribute any content without our prior written consent.</p>
            <p>We strive to provide accurate information, but we do not warrant the completeness or accuracy of the content on our platform.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const FairHousingPage = () => (
  <div className="pt-48 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-1000">
    <div className="section-container">
      <div className="max-w-4xl">
        <div className="label-micro mb-6">Fair Housing</div>
        <h1 className="text-6xl md:text-8xl mb-12 leading-[0.9]">Equal <br/><span className="italic">Opportunity.</span></h1>
        <div className="prose prose-invert prose-argo max-w-none text-argo-slate font-serif italic leading-relaxed space-y-8">
          <p className="text-2xl">Argo Real Estate is committed to compliance with all federal, state, and local fair housing laws.</p>
          <div className="space-y-4 text-lg not-italic font-sans">
            <p>We do not discriminate against any person because of race, color, religion, sex, handicap, familial status, or national origin.</p>
            <p>For more information, please visit the <a href="https://www.hud.gov/program_offices/fair_housing_equal_opp" target="_blank" rel="noopener noreferrer" className="text-argo-gold underline">HUD website</a>.</p>
            <div className="mt-12 p-8 border border-black/5 bg-argo-warm/20">
              <h3 className="text-argo-blue font-bold uppercase tracking-widest text-sm mb-4">NYS Disclosures</h3>
              <ul className="space-y-4">
                <li><a href="https://www.dos.ny.gov/licensing/docs/FairHousingNotice_new.pdf" target="_blank" rel="noopener noreferrer" className="text-argo-blue underline flex items-center gap-2">NYS Fair Housing Notice <ArrowUpRight className="w-3 h-3" /></a></li>
                <li><a href="https://www.dos.ny.gov/licensing/docs/StandardOperatingProcedures.pdf" target="_blank" rel="noopener noreferrer" className="text-argo-blue underline flex items-center gap-2">Standard Operating Procedures <ArrowUpRight className="w-3 h-3" /></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const HomePage = ({ setPage }: { setPage: (p: Page) => void }) => {
  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=1920" 
            alt="NYC Skyline" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          {/* Gradient Overlay for better contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-argo-blue/80 via-argo-blue/40 to-transparent"></div>
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl"
          >
            <div className="label-micro mb-8 text-white/80 drop-shadow-sm">Since 1952 • New York City</div>
            <h1 className="text-6xl md:text-8xl text-white mb-8 leading-[0.9] drop-shadow-2xl font-light">
              On Your Corner,<br/>
              <span className="italic font-serif text-argo-gold">On Your Side.</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed font-serif italic max-w-2xl drop-shadow-lg">
              NYC's longest-standing independent property management and residential brokerage firm.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <button onClick={() => setPage('contact')} className="btn-gold">
                Request Management Proposal
              </button>
              <button onClick={() => setPage('residential')} className="btn-primary bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white hover:text-argo-blue">
                Search NYC Listings
              </button>
            </div>
            <div className="mt-16 flex items-center text-white/60 text-[10px] uppercase tracking-[0.2em] font-bold">
              <div className="w-12 h-[1px] bg-argo-gold mr-4"></div>
              Managing 12,000+ units across New York City
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
          <ChevronRight className="rotate-90 w-8 h-8" />
        </div>
      </section>

      {/* Audience Tiles */}
      <section className="bg-argo-paper py-32">
        <div className="section-container">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <div className="label-micro mb-4">Our Ecosystem</div>
              <h2 className="text-4xl md:text-6xl leading-tight">An Integrated <br/><span className="italic">Real Estate Platform.</span></h2>
            </div>
            <p className="text-argo-slate max-w-md font-serif italic text-lg">From management to brokerage and development, we provide a full-service real estate ecosystem.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Property Management', desc: 'Attentive, personalized service for co-op and condo boards.', icon: Building2, link: 'property-management' },
              { title: 'Argo Residential', desc: 'Expert brokerage for sales, leasing, and rentals across NYC.', icon: Home, link: 'residential' },
              { title: 'Asset Management', desc: 'Strategic portfolio optimization for residential holdings.', icon: TrendingUp, link: 'asset-management' },
              { title: 'Development', desc: 'Specialists in rental-to-condo conversions and new projects.', icon: Users, link: 'new-development' },
            ].map((tile, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="p-10 bg-white border border-black/[0.03] group cursor-pointer transition-all duration-700 hover:border-argo-gold/30"
                onClick={() => setPage(tile.link as Page)}
              >
                <div className="w-12 h-12 bg-argo-warm rounded-full flex items-center justify-center mb-10 transition-all duration-700 group-hover:bg-argo-blue group-hover:text-white">
                  <tile.icon className="w-5 h-5" />
                </div>
                <h3 className="text-xl mb-4 font-serif">{tile.title}</h3>
                <p className="text-argo-slate text-xs mb-10 leading-relaxed font-light">{tile.desc}</p>
                <div className="label-micro flex items-center group-hover:text-argo-blue transition-colors">
                  Explore <ArrowRight className="ml-2 w-3 h-3" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Property Management Strength */}
      <section className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-argo-gold font-bold uppercase tracking-widest text-xs mb-4 block">Property Management</span>
            <h2 className="text-4xl md:text-5xl mb-8 leading-tight">Decades of Expertise in Every NYC Building Code.</h2>
            <p className="text-argo-slate text-lg mb-8 leading-relaxed">
              Managing a New York City building requires more than just maintenance—it requires a partner who understands the complex regulatory landscape, from Local Law 97 to co-op governance.
            </p>
            <ul className="space-y-4 mb-10">
              {[
                'Dedicated account executives with 15+ years average tenure',
                '24/7 emergency response and on-site staff management',
                'Transparent financial reporting and reserve fund planning',
                'Expertise in capital project oversight and NYC compliance'
              ].map((item, i) => (
                <li key={i} className="flex items-center text-argo-blue">
                  <CheckCircle2 className="w-5 h-5 text-argo-gold mr-3" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <button onClick={() => setPage('property-management')} className="btn-primary">
              Explore Management Services
            </button>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&q=80&w=800" 
                alt="NYC Building" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-2xl shadow-xl hidden md:block max-w-[280px]">
              <div className="text-4xl font-serif font-bold text-argo-blue mb-2">10,000+</div>
              <div className="text-sm text-argo-slate font-medium">Units under management across the tri-state area.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Residential Section */}
      <section className="bg-argo-blue py-32 text-white overflow-hidden">
        <div className="section-container">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div className="max-w-2xl">
              <div className="label-micro text-white/40 mb-6">Argo Residential</div>
              <h2 className="text-5xl md:text-7xl mb-8 leading-tight font-serif">Find Your <br/><span className="italic">Place.</span></h2>
              <p className="text-white/50 text-xl font-serif italic leading-relaxed">Our brokerage team specializes in the nuances of NYC co-ops, condos, and rentals. We don't just find apartments; we find homes.</p>
            </div>
            <button onClick={() => setPage('residential')} className="btn-gold whitespace-nowrap">
              View All Listings
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {LISTINGS.map((listing) => (
              <motion.div 
                key={listing.id}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
              >
                <div className="aspect-[3/4] relative overflow-hidden mb-8 border border-white/10">
                  <img 
                    src={listing.image} 
                    alt={listing.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-6 left-6">
                    <span className="label-micro bg-white text-argo-blue px-3 py-1">{listing.type}</span>
                  </div>
                </div>
                <div>
                  <div className="text-argo-gold font-serif text-2xl mb-2">{listing.price}</div>
                  <h3 className="text-xl font-serif mb-4 group-hover:text-argo-gold transition-colors">{listing.title}</h3>
                  <div className="flex items-center text-white/40 text-[10px] uppercase tracking-widest font-bold mb-6">
                    <MapPin className="w-3 h-3 mr-2 text-argo-gold" /> {listing.neighborhood}
                  </div>
                  <div className="flex justify-between items-center border-t border-white/10 pt-6">
                    <div className="flex space-x-6 text-[10px] uppercase tracking-widest text-white/60 font-bold">
                      <span>{listing.beds} Beds</span>
                      <span>{listing.baths} Baths</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-argo-gold group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Resident Quick Links */}
      <section className="py-32 bg-argo-warm/30">
        <div className="section-container">
          <div className="bg-white border border-black/[0.03] p-12 md:p-24 flex flex-col lg:flex-row items-center gap-24">
            <div className="lg:w-1/3">
              <div className="label-micro mb-6">Resident Hub</div>
              <h2 className="text-4xl md:text-5xl mb-8 leading-tight font-serif">Welcome <br/><span className="italic">Home.</span></h2>
              <p className="text-argo-slate mb-12 font-serif italic">Quick access to the tools you need to manage your home in an Argo building.</p>
              <button onClick={() => setPage('residents')} className="btn-primary w-full">
                Go to Resident Portal
              </button>
            </div>
            <div className="lg:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
              {[
                { label: 'Pay Online', icon: CreditCard },
                { label: 'Maintenance', icon: Wrench },
                { label: 'Documents', icon: FileText },
                { label: 'Emergency', icon: AlertTriangle },
              ].map((item, i) => (
                <button 
                  key={i}
                  onClick={() => setPage('residents')}
                  className="flex flex-col items-center justify-center p-10 bg-argo-warm/50 border border-black/[0.02] hover:bg-argo-blue hover:text-white transition-all duration-700 group"
                >
                  <item.icon className="w-6 h-6 mb-6 text-argo-gold group-hover:text-white transition-colors" />
                  <span className="label-micro">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Proof Section */}
      <section className="py-40 bg-white">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center mb-32">
            {[
              { val: '1952', label: 'Established' },
              { val: '12,000', label: 'Units Managed' },
              { val: '70+', label: 'Years Experience' },
              { val: '100%', label: 'NYC Independent' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-5xl md:text-7xl font-serif mb-4 text-argo-blue">{stat.val}</div>
                <div className="label-micro">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="relative py-24 border-y border-black/[0.05]">
            <div className="max-w-4xl mx-auto text-center">
              <Star className="w-8 h-8 text-argo-gold mx-auto mb-12 opacity-50" />
              <p className="text-3xl md:text-5xl font-serif italic mb-12 leading-relaxed text-argo-blue">
                "Argo has been our managing agent for over 15 years. Their transparency during major capital projects and their responsiveness to board concerns is unmatched in the NYC market."
              </p>
              <div className="label-micro">Robert Sullivan</div>
              <div className="text-argo-slate text-xs mt-2 font-serif italic">Board President, Upper West Side Co-op</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const AssetManagementPage = ({ setPage }: { setPage: (p: Page) => void }) => {
  const [dataRoomEmail, setDataRoomEmail] = useState('');
  const [dataRoomAccess, setDataRoomAccess] = useState(false);
  const [capRatePrice, setCapRatePrice] = useState<number | ''>('');
  const [capRateNOI, setCapRateNOI] = useState<number | ''>('');

  const handleDataRoomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (dataRoomEmail.includes('@')) {
      setDataRoomAccess(true);
    }
  };

  const calculateCapRate = () => {
    if (capRatePrice && capRateNOI && capRatePrice > 0) {
      return ((capRateNOI / capRatePrice) * 100).toFixed(2);
    }
    return '0.00';
  };

  return (
    <div className="pt-48 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-1000 bg-white">
      <div className="section-container">
        <div className="flex flex-col lg:flex-row gap-24 items-start mb-32">
          <div className="lg:w-1/2">
            <div className="label-micro mb-6">Asset Management</div>
            <h1 className="text-6xl md:text-8xl mb-8 leading-[0.9]">Strategic <br/><span className="italic">Oversight.</span></h1>
            <p className="text-xl text-argo-slate leading-relaxed max-w-xl font-serif italic">
              We provide institutional-grade asset management with a boutique, family-office touch. Our focus is on long-term asset value creation, income optimization, and risk mitigation for residential portfolios.
            </p>
          </div>
          <div className="lg:w-1/2 grid grid-cols-1 gap-16">
            {[
              { title: 'Portfolio Strategy', desc: 'We develop bespoke investment strategies for multifamily holdings, focusing on capital allocation, refinancing, and market positioning.', icon: TrendingUp },
              { title: 'Risk Management', desc: 'Our team ensures full compliance with NYC\'s complex regulatory environment, protecting your assets from liability and operational risk.', icon: ShieldCheck }
            ].map((item, i) => (
              <div key={i} className="flex gap-10 group">
                <div className="w-16 h-16 border border-argo-gold/20 rounded-full flex items-center justify-center text-argo-gold group-hover:bg-argo-gold group-hover:text-white transition-all duration-700 flex-shrink-0">
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl mb-4 font-serif">{item.title}</h3>
                  <p className="text-argo-slate text-sm leading-relaxed font-light">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Institutional Product Suite */}
        <div className="mb-32 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Secure Data Room (The Vault) */}
          <div className="bg-argo-paper p-12 border border-black/[0.03]">
            <div className="flex items-center gap-4 mb-8">
              <Lock className="w-6 h-6 text-argo-gold" />
              <h3 className="text-2xl font-serif">Secure Data Room</h3>
            </div>
            <p className="text-argo-slate text-sm mb-8 font-light leading-relaxed">
              Access confidential PDF reports, tax documents, and floor plans. Restricted to approved institutional partners.
            </p>
            {!dataRoomAccess ? (
              <form onSubmit={handleDataRoomSubmit} className="space-y-4">
                <input 
                  type="email" 
                  required
                  placeholder="Enter Institutional Email" 
                  className="w-full bg-white border border-black/[0.05] px-4 py-3 text-sm focus:outline-none focus:border-argo-gold transition-colors"
                  value={dataRoomEmail}
                  onChange={(e) => setDataRoomEmail(e.target.value)}
                />
                <button type="submit" className="btn-gold w-full py-3">Unlock Vault</button>
              </form>
            ) : (
              <div className="space-y-4 animate-in fade-in duration-500">
                <div className="p-4 bg-white border border-black/[0.05] flex justify-between items-center group cursor-pointer hover:border-argo-gold transition-colors">
                  <span className="text-sm font-serif">Q1 2026 Fund Performance.pdf</span>
                  <Download className="w-4 h-4 text-argo-gold group-hover:scale-110 transition-transform" />
                </div>
                <div className="p-4 bg-white border border-black/[0.05] flex justify-between items-center group cursor-pointer hover:border-argo-gold transition-colors">
                  <span className="text-sm font-serif">Chelsea Portfolio Tax Docs.zip</span>
                  <Download className="w-4 h-4 text-argo-gold group-hover:scale-110 transition-transform" />
                </div>
                <div className="p-4 bg-white border border-black/[0.05] flex justify-between items-center group cursor-pointer hover:border-argo-gold transition-colors">
                  <span className="text-sm font-serif">Tribeca Development Floorplans.pdf</span>
                  <Download className="w-4 h-4 text-argo-gold group-hover:scale-110 transition-transform" />
                </div>
                <button onClick={() => setPage('investor-portal')} className="w-full mt-4 py-3 bg-argo-blue text-white text-sm font-bold uppercase tracking-widest hover:bg-argo-gold transition-colors">
                  Enter Full Investor Portal
                </button>
              </div>
            )}
          </div>

          {/* Cap Rate Calculator (The Brain) */}
          <div className="bg-argo-blue p-12 text-white">
            <div className="flex items-center gap-4 mb-8">
              <Calculator className="w-6 h-6 text-argo-gold" />
              <h3 className="text-2xl font-serif">Cap Rate Calculator</h3>
            </div>
            <p className="text-white/60 text-sm mb-8 font-light leading-relaxed">
              Instantly calculate the capitalization rate (yield) for prospective multifamily acquisitions.
            </p>
            <div className="space-y-6">
              <div>
                <label className="label-micro text-white/40 mb-2 block">Purchase Price ($)</label>
                <input 
                  type="number" 
                  placeholder="e.g. 5000000" 
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-argo-gold transition-colors"
                  value={capRatePrice}
                  onChange={(e) => setCapRatePrice(Number(e.target.value) || '')}
                />
              </div>
              <div>
                <label className="label-micro text-white/40 mb-2 block">Net Operating Income (NOI) ($)</label>
                <input 
                  type="number" 
                  placeholder="e.g. 250000" 
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-argo-gold transition-colors"
                  value={capRateNOI}
                  onChange={(e) => setCapRateNOI(Number(e.target.value) || '')}
                />
              </div>
              <div className="pt-6 border-t border-white/10 flex justify-between items-end">
                <span className="label-micro text-white/60">Estimated Yield</span>
                <span className="text-4xl font-serif text-argo-gold">{calculateCapRate()}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-argo-blue p-24 text-white">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <div className="label-micro text-white/40 mb-6">Our Approach</div>
            <h2 className="text-4xl md:text-6xl mb-8 font-serif">Data-Driven <br/><span className="italic">Decisions.</span></h2>
            <p className="text-white/50 font-serif italic">We leverage proprietary market data and 70 years of operational experience to identify opportunities that others miss.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { stat: '15%', label: 'Avg. Value Increase', desc: 'Through strategic capital improvements and operational efficiencies.' },
              { stat: '98%', label: 'Occupancy Rate', desc: 'Maintained across our managed portfolio through aggressive leasing.' },
              { stat: '$2B+', label: 'Assets Managed', desc: 'Entrusted to us by private families and institutional investors.' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="text-5xl md:text-7xl font-serif text-argo-gold mb-6">{item.stat}</div>
                <div className="label-micro mb-6 text-white/60">{item.label}</div>
                <p className="text-[10px] uppercase tracking-widest text-white/30 leading-relaxed font-bold">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const NewDevelopmentPage = () => {
  return (
    <div className="pt-48 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="section-container">
        <div className="max-w-4xl mb-32">
          <div className="label-micro mb-6">Development & Conversions</div>
          <h1 className="text-6xl md:text-8xl mb-12 leading-[0.9]">Transforming the <br/><span className="italic">NYC Skyline.</span></h1>
          <p className="text-2xl text-argo-slate font-serif italic leading-relaxed">
            Argo is a leader in rental-to-co-op/condo conversions. We handle every phase of the process, from initial design and renovation to marketing, sales, and long-term management.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-40">
          <div className="space-y-12">
            {[
              { title: 'Design & Renovation', desc: 'We provide strategic input on unit layouts, finishes, and building amenities to maximize market appeal.' },
              { title: 'Marketing & Sales', desc: 'Our in-house brokerage, Argo Residential, executes high-impact sales and leasing campaigns.' },
              { title: 'Post-Conversion Management', desc: 'We ensure a smooth transition to board governance and provide ongoing management excellence.' },
            ].map((item, i) => (
              <div key={i} className="flex gap-8">
                <div className="w-12 h-12 bg-argo-warm rounded-full flex items-center justify-center text-argo-gold flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-2xl mb-3 font-serif">{item.title}</h4>
                  <p className="text-argo-slate text-sm leading-relaxed font-light">{item.desc}</p>
                </div>
              </div>
            ))}
            <button className="btn-gold">Talk to Our Development Team</button>
          </div>
          <div className="aspect-video grayscale hover:grayscale-0 transition-all duration-1000 overflow-hidden border border-black/[0.05]">
            <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000" alt="New Development" className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" referrerPolicy="no-referrer" />
          </div>
        </div>
      </div>
    </div>
  );
};

const CaseStudiesPage = () => {
  return (
    <div className="pt-32 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="section-container">
        <div className="max-w-3xl mb-24">
          <div className="label-micro mb-6">Track Record</div>
          <h1 className="text-6xl md:text-8xl mb-8 leading-[0.85]">Success <span className="italic">Stories.</span></h1>
          <p className="text-xl text-argo-slate leading-relaxed">
            A look at how we've helped NYC boards, owners, and developers achieve their goals through expert management and strategic insight.
          </p>
        </div>

        <div className="space-y-40">
          {CASE_STUDIES.map((study, i) => (
            <div key={study.id} className={`flex flex-col lg:flex-row gap-20 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              <div className="lg:w-1/2 relative">
                <div className="aspect-[4/3] rounded-none overflow-hidden shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000">
                  <img src={study.image} alt={study.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className={`absolute -bottom-10 ${i % 2 === 1 ? '-left-10' : '-right-10'} bg-argo-gold p-8 text-white hidden md:block`}>
                  <div className="text-4xl font-serif font-bold">{study.units}</div>
                  <div className="label-micro text-white/80">Units Optimized</div>
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="label-micro mb-6">{study.type} • {study.location}</div>
                <h2 className="text-4xl md:text-5xl mb-8 leading-tight">{study.title}</h2>
                <div className="space-y-10">
                  <div className="flex gap-6">
                    <div className="w-px bg-argo-gold h-12"></div>
                    <div>
                      <h4 className="label-micro mb-2 text-argo-blue">The Challenge</h4>
                      <p className="text-argo-slate text-sm leading-relaxed">{study.challenge}</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="w-px bg-argo-gold h-12"></div>
                    <div>
                      <h4 className="label-micro mb-2 text-argo-blue">The Outcome</h4>
                      <p className="text-argo-slate text-sm leading-relaxed">{study.outcome}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const PropertyManagementPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // In a real app, this would send to an API
  };

  return (
    <div className="pt-48 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="section-container">
        <div className="max-w-4xl mb-32">
          <div className="label-micro mb-6">Property Management</div>
          <h1 className="text-6xl md:text-8xl mb-12 leading-[0.9]">Ethical. Hands-on. <br/><span className="italic">Independent.</span></h1>
          <p className="text-2xl text-argo-slate font-serif italic leading-relaxed">
            For over 70 years, we've partnered with co-op and condo boards to protect and enhance their most valuable assets.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-40">
          {[
            { title: 'Board Partnership', desc: 'We act as a true partner to co-op and condo boards, providing expert governance and financial transparency.', icon: ShieldCheck },
            { title: 'Operations', desc: 'Hands-on building management with a focus on preventive maintenance and capital project oversight.', icon: Building2 },
            { title: 'Financials', desc: 'Institutional-grade accounting and reporting with a focus on long-term fiscal health.', icon: TrendingUp },
          ].map((service, i) => (
            <div key={i} className="p-12 bg-white border border-black/[0.03] transition-all duration-700 hover:border-argo-gold/20">
              <service.icon className="w-8 h-8 text-argo-gold mb-10 opacity-50" />
              <h3 className="text-2xl mb-6 font-serif">{service.title}</h3>
              <p className="text-argo-slate text-sm leading-relaxed font-light">{service.desc}</p>
            </div>
          ))}
        </div>

        {/* Four-Person Team Model */}
        <div className="mb-40">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="label-micro mb-6">The Argo Advantage</div>
            <h2 className="text-4xl md:text-6xl mb-8 font-serif">The Four-Person <br/><span className="italic">Team Model.</span></h2>
            <p className="text-argo-slate font-serif italic">Every building we manage is supported by a dedicated squad of specialists, ensuring 360-degree oversight and rapid response.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { role: 'Property Manager', desc: 'Your primary point of contact for daily operations, board relations, and project oversight.', icon: UserCircle },
              { role: 'Accountant', desc: 'Dedicated financial specialist managing accounts payable, receivable, and monthly reporting.', icon: TrendingUp },
              { role: 'Team Lead', desc: 'Senior executive providing strategic guidance, high-level compliance, and quality control.', icon: ShieldCheck },
              { role: 'Associate', desc: 'Support specialist handling administrative tasks, resident inquiries, and documentation.', icon: Users },
            ].map((member, i) => (
              <div key={i} className="p-10 bg-argo-warm/30 border border-black/[0.02] text-center group hover:bg-white hover:shadow-2xl transition-all duration-700">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm group-hover:bg-argo-gold group-hover:text-white transition-all">
                  <member.icon className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-serif mb-4">{member.role}</h4>
                <p className="text-xs text-argo-slate leading-relaxed font-light">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-argo-blue text-white p-12 md:p-24 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 relative z-10">
            <div>
              <div className="label-micro text-white/40 mb-8">Onboarding Process</div>
              <h2 className="text-4xl md:text-6xl mb-12 leading-tight">The Argo <br/><span className="italic">Transition Plan.</span></h2>
              <p className="text-white/50 mb-16 font-serif italic">Switching management companies can be daunting. We've perfected a 90-day onboarding process that ensures no detail is missed.</p>
              <div className="space-y-12">
                {[
                  { step: '01', title: 'Audit & Discovery', desc: 'We perform a deep dive into your building\'s financials, physical plant, and compliance status.' },
                  { step: '02', title: 'Staff Alignment', desc: 'We meet with on-site staff to establish clear expectations and communication protocols.' },
                  { step: '03', title: 'Resident Communication', desc: 'We introduce ourselves to the community and provide clear instructions for the new portal.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-8">
                    <div className="text-argo-gold font-serif text-4xl font-light opacity-30">{item.step}</div>
                    <div>
                      <h4 className="text-xl mb-3">{item.title}</h4>
                      <p className="text-sm text-white/40 font-light leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/5 p-12 border border-white/10 backdrop-blur-sm">
              <div className="label-micro text-white/60 mb-8">Get Started</div>
              <h3 className="text-3xl mb-10">Request a Proposal</h3>
              {isSubmitted ? (
                <div className="py-20 text-center animate-in fade-in zoom-in duration-700">
                  <div className="w-16 h-16 bg-argo-gold rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle2 className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-2xl font-serif mb-4">Proposal Requested.</h4>
                  <p className="text-white/40 text-sm font-serif italic">Our management team will review your building's profile and contact you within 24 hours.</p>
                </div>
              ) : (
                <form className="space-y-8" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-8">
                    <input type="text" placeholder="First Name" required className="bg-transparent border-b border-white/20 py-4 text-sm focus:outline-none focus:border-argo-gold transition-colors" />
                    <input type="text" placeholder="Last Name" required className="bg-transparent border-b border-white/20 py-4 text-sm focus:outline-none focus:border-argo-gold transition-colors" />
                  </div>
                  <input type="email" placeholder="Email Address" required className="w-full bg-transparent border-b border-white/20 py-4 text-sm focus:outline-none focus:border-argo-gold transition-colors" />
                  <input type="text" placeholder="Building Address" required className="w-full bg-transparent border-b border-white/20 py-4 text-sm focus:outline-none focus:border-argo-gold transition-colors" />
                  <button type="submit" className="btn-gold w-full">Submit Request</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ResidentialPage = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'Co-op' | 'Condo' | 'Rental' | 'Townhouse'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredListings = LISTINGS.filter(l => 
    (activeFilter === 'all' || l.type === activeFilter) &&
    (l.title.toLowerCase().includes(searchQuery.toLowerCase()) || l.neighborhood.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="pt-48 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="section-container">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-12">
          <div className="max-w-3xl">
            <div className="label-micro mb-6">Argo Residential</div>
            <h1 className="text-6xl md:text-8xl mb-8 leading-[0.9]">Curated <br/><span className="italic">NYC Listings.</span></h1>
            <p className="text-xl text-argo-slate font-serif italic">From historic townhouses to modern glass towers, explore the best of New York living.</p>
          </div>
          <div className="flex flex-col gap-6 w-full lg:w-auto">
            <div className="flex bg-white p-1 border border-black/[0.05] shadow-sm">
              <input 
                type="text" 
                placeholder="Search neighborhood..." 
                className="px-6 py-4 focus:outline-none text-xs uppercase tracking-widest font-bold w-full lg:w-64" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="bg-argo-blue text-white px-6 transition-colors hover:bg-argo-gold"><Search className="w-4 h-4" /></button>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
              {['all', 'Co-op', 'Condo', 'Rental', 'Townhouse'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter as any)}
                  className={`px-4 py-2 label-micro whitespace-nowrap transition-all ${activeFilter === filter ? 'bg-argo-gold text-white' : 'bg-argo-warm text-argo-slate hover:bg-argo-blue hover:text-white'}`}
                >
                  {filter === 'all' ? 'All Types' : filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-40">
          {filteredListings.map((listing) => (
            <motion.button 
              key={listing.id}
              whileHover={{ y: -10 }}
              className="group cursor-pointer text-left w-full"
              aria-label={`View details for ${listing.title} in ${listing.neighborhood}`}
            >
              <div className="aspect-[4/5] relative overflow-hidden mb-8 border border-black/[0.03]">
                <img 
                  src={listing.image} 
                  alt="" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 left-6">
                  <span className="label-micro bg-white text-argo-blue px-3 py-1 shadow-sm">{listing.type}</span>
                </div>
              </div>
              <div>
                <div className="text-argo-gold font-serif text-2xl mb-2">{listing.price}</div>
                <h3 className="text-xl font-serif mb-4 group-hover:text-argo-gold transition-colors">{listing.title}</h3>
                <div className="flex items-center text-argo-slate/40 text-[10px] uppercase tracking-widest font-bold mb-6">
                  <MapPin className="w-3 h-3 mr-2 text-argo-gold" /> {listing.neighborhood}
                </div>
                <div className="flex justify-between items-center border-t border-black/[0.05] pt-6">
                  <div className="flex space-x-6 text-[10px] uppercase tracking-widest text-argo-slate/60 font-bold">
                    <span>{listing.beds} Beds</span>
                    <span>{listing.baths} Baths</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-argo-gold group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        <div className="text-center mb-24">
          <div className="label-micro mb-4">The Team</div>
          <h2 className="text-4xl md:text-6xl mb-4 font-serif">Meet Our Agents</h2>
          <p className="text-argo-slate font-serif italic">Expert guidance for your NYC real estate journey.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {AGENTS.map((agent) => (
            <div key={agent.id} className="text-center group">
              <div className="aspect-square mx-auto overflow-hidden mb-10 grayscale group-hover:grayscale-0 transition-all duration-1000">
                <img src={agent.image} alt={agent.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" referrerPolicy="no-referrer" />
              </div>
              <h3 className="text-2xl mb-2 font-serif">{agent.name}</h3>
              <div className="label-micro mb-6">{agent.title}</div>
              <div className="flex flex-wrap justify-center gap-3">
                {agent.specialties.map((s, i) => (
                  <span key={i} className="text-[8px] uppercase tracking-widest font-bold border border-black/[0.05] px-3 py-1 text-argo-slate/60">{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ArgoUniversityPage = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'boards' | 'staff'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const videos = [
    { id: 1, title: 'Local Law 97 Compliance', category: 'Compliance', duration: '45 min', date: '2024-02-15', image: 'https://images.unsplash.com/photo-1554200876-56c2f25224fa?auto=format&fit=crop&w=800&q=80', type: 'boards' },
    { id: 2, title: 'Budget Season Essentials', category: 'Finance', duration: '30 min', date: '2024-01-10', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80', type: 'boards' },
    { id: 3, title: 'Effective Heat Management', category: 'Operations', duration: '25 min', date: '2023-11-05', image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=800&q=80', type: 'staff' },
    { id: 4, title: 'Insurance 360: Risk Mitigation', category: 'Risk', duration: '50 min', date: '2023-12-20', image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80', type: 'boards' },
    { id: 5, title: 'Elevator Modernization Guide', category: 'Infrastructure', duration: '35 min', date: '2024-03-01', image: 'https://images.unsplash.com/photo-1504307651254-35680f356f58?auto=format&fit=crop&w=800&q=80', type: 'staff' },
    { id: 6, title: 'Board Governance Best Practices', category: 'Governance', duration: '40 min', date: '2024-02-28', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80', type: 'boards' },
  ];

  const filteredVideos = videos.filter(v => 
    (activeTab === 'all' || v.type === activeTab) &&
    (v.title.toLowerCase().includes(searchQuery.toLowerCase()) || v.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="pt-48 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-1000 bg-white">
      <div className="section-container">
        <div className="max-w-4xl mb-24">
          <div className="label-micro mb-6">Argo University</div>
          <h1 className="text-6xl md:text-8xl mb-12 leading-[0.9]">Knowledge <br/><span className="italic">Library.</span></h1>
          <p className="text-2xl text-argo-slate font-serif italic leading-relaxed">
            Empowering Boards and Building Staff with institutional intelligence. Access our exclusive archive of training, compliance updates, and operational excellence.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16 border-b border-black/5 pb-12">
          <div className="flex gap-4">
            {[
              { id: 'all', label: 'All Content' },
              { id: 'boards', label: 'For Boards' },
              { id: 'staff', label: 'For Building Staff' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-2 label-micro transition-all ${activeTab === tab.id ? 'bg-argo-blue text-white' : 'hover:bg-argo-warm text-argo-slate'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-argo-slate/40" />
            <input 
              type="text" 
              placeholder="Search the archive (e.g. 'Heating')..."
              className="w-full pl-12 pr-4 py-3 bg-argo-warm border-none focus:ring-1 focus:ring-argo-gold label-micro"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-32">
          {filteredVideos.map((video) => (
            <motion.button 
              key={video.id}
              whileHover={{ y: -10 }}
              className="group cursor-pointer text-left w-full"
              aria-label={`Watch video: ${video.title}`}
            >
              <div className="aspect-video relative overflow-hidden mb-6 bg-argo-warm">
                <img 
                  src={video.image} 
                  alt="" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center scale-90 group-hover:scale-100 transition-transform shadow-xl">
                    <Play className="w-6 h-6 text-argo-blue ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 bg-black/60 text-white text-[10px] font-bold px-2 py-1 label-micro">
                  {video.duration}
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="label-micro text-argo-gold">{video.category}</span>
                  <span className="text-[10px] text-argo-slate/40 font-bold uppercase tracking-widest">{video.date}</span>
                </div>
                <h3 className="text-2xl font-serif mb-4 group-hover:text-argo-gold transition-colors">{video.title}</h3>
                <div className="flex items-center gap-2 text-argo-slate/60 hover:text-argo-blue transition-colors">
                  <span className="label-micro">Watch Intelligence</span>
                  <ArrowUpRight className="w-3 h-3" />
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Live Events Section */}
        <div className="bg-argo-blue p-24 text-white">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-16">
            <div className="lg:w-1/2">
              <div className="label-micro text-white/40 mb-6">Upcoming Events</div>
              <h2 className="text-4xl md:text-6xl mb-8 font-serif">Live <br/><span className="italic">Engagement.</span></h2>
              <p className="text-white/50 font-serif italic mb-12">Join our subject matter experts for live webinars and in-person training sessions designed for the modern NYC landscape.</p>
              <button className="btn-gold">View Full Calendar</button>
            </div>
            <div className="lg:w-1/2 w-full space-y-6">
              {[
                { title: 'Local Law 97: Final Rules Workshop', date: 'March 25, 2024', target: 'Boards' },
                { title: 'Boiler Maintenance & Efficiency', date: 'April 02, 2024', target: 'Staff' },
                { title: 'Spring Landscaping & Façade Safety', date: 'April 15, 2024', target: 'Boards' },
              ].map((event, i) => (
                <div key={i} className="p-8 border border-white/10 hover:bg-white/5 transition-colors flex justify-between items-center group">
                  <div>
                    <div className="label-micro text-argo-gold mb-2">{event.target}</div>
                    <h4 className="text-xl font-serif">{event.title}</h4>
                    <div className="flex items-center gap-2 text-white/40 text-[10px] uppercase font-bold tracking-widest mt-4">
                      <Calendar className="w-3 h-3" />
                      {event.date}
                    </div>
                  </div>
                  <button className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-argo-gold group-hover:border-argo-gold transition-all">
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AboutPage = () => {
  return (
    <div className="pt-48 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="section-container">
        <div className="max-w-4xl mb-32">
          <div className="label-micro mb-6">Our Legacy</div>
          <h1 className="text-6xl md:text-8xl mb-12 leading-[0.9]">Argo Real <br/><span className="italic">Estate.</span></h1>
          <p className="text-2xl text-argo-slate font-serif italic leading-relaxed">
            Since 1952, Argo has been a cornerstone of the New York City real estate landscape. We are an independent, family-owned institution dedicated to the preservation and growth of residential assets.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mb-32">
          <div className="aspect-[4/5] bg-argo-warm overflow-hidden">
            <img src="https://images.unsplash.com/photo-1449156001935-d2863fb22690?auto=format&fit=crop&q=80&w=1000" alt="Argo History" className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl font-serif mb-8">The Owner's Perspective.</h2>
            <p className="text-argo-slate leading-relaxed mb-8">
              What sets Argo apart is our dual role as both management agent and property owner. We manage every building as if it were our own, bringing a level of fiscal responsibility and operational rigor that third-party-only firms simply cannot match.
            </p>
            <div className="space-y-6">
              {[
                'Independent & Family Owned',
                '70+ Years of NYC Expertise',
                'Institutional Grade Infrastructure',
                'Boutique Service Level'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <CheckCircle2 className="w-5 h-5 text-argo-gold" />
                  <span className="label-micro">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CareersPage = () => {
  return (
    <div className="pt-48 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="section-container">
        <div className="max-w-4xl mb-32">
          <div className="label-micro mb-6">Careers</div>
          <h1 className="text-6xl md:text-8xl mb-12 leading-[0.9]">Join the <br/><span className="italic">Institution.</span></h1>
          <p className="text-2xl text-argo-slate font-serif italic leading-relaxed">
            We are looking for professionals who share our commitment to excellence, integrity, and the future of New York City real estate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
          {[
            { title: 'Property Manager', dept: 'Management', type: 'Full-Time' },
            { title: 'Senior Accountant', dept: 'Finance', type: 'Full-Time' },
            { title: 'Compliance Specialist', dept: 'Operations', type: 'Full-Time' },
            { title: 'Associate Broker', dept: 'Residential', type: 'Commission' },
            { title: 'Handyman', dept: 'Building Staff', type: 'Union' },
            { title: 'Asset Analyst', dept: 'Investments', type: 'Full-Time' },
          ].map((job, i) => (
            <div key={i} className="p-10 border border-black/[0.05] hover:border-argo-gold/40 transition-all group cursor-pointer">
              <div className="flex justify-between items-start mb-8">
                <span className="label-micro text-argo-gold">{job.dept}</span>
                <span className="text-[10px] text-argo-slate/40 font-bold uppercase tracking-widest">{job.type}</span>
              </div>
              <h3 className="text-2xl font-serif mb-8 group-hover:text-argo-gold transition-colors">{job.title}</h3>
              <div className="flex items-center gap-2 text-argo-blue">
                <span className="label-micro">Apply Now</span>
                <ArrowUpRight className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const InvestorPortalPage = () => {
  const [isAccredited, setIsAccredited] = useState(false);
  const [agreed, setAgreed] = useState(false);

  if (!isAccredited) {
    return (
      <div className="pt-48 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-1000 bg-argo-paper min-h-screen flex items-center justify-center">
        <div className="max-w-xl w-full bg-white p-12 border border-black/[0.03] shadow-2xl">
          <div className="flex items-center gap-4 mb-8">
            <ShieldCheck className="w-8 h-8 text-argo-gold" />
            <h2 className="text-3xl font-serif">SEC Compliance Gate</h2>
          </div>
          <p className="text-argo-slate text-sm leading-relaxed mb-8">
            To view sensitive financial disclosures, current offerings, and portfolio performance, please confirm your status as an Accredited Investor under Regulation D of the Securities Act of 1933.
          </p>
          <div className="space-y-6">
            <label className="flex items-start gap-4 cursor-pointer group">
              <div className="relative flex items-center justify-center mt-1">
                <input 
                  type="checkbox" 
                  className="w-5 h-5 border-2 border-argo-slate/20 rounded-sm appearance-none checked:bg-argo-gold checked:border-argo-gold transition-colors"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                />
                {agreed && <Check className="w-3 h-3 text-white absolute pointer-events-none" />}
              </div>
              <span className="text-sm text-argo-slate group-hover:text-argo-blue transition-colors">
                I certify that I am an Accredited Investor and agree to the confidentiality terms regarding the proprietary financial data within this portal.
              </span>
            </label>
            <button 
              onClick={() => agreed && setIsAccredited(true)}
              className={`w-full py-4 text-sm font-bold uppercase tracking-widest transition-all ${agreed ? 'bg-argo-blue text-white hover:bg-argo-gold' : 'bg-argo-slate/10 text-argo-slate/40 cursor-not-allowed'}`}
              disabled={!agreed}
            >
              Enter Deal Room
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-48 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-1000 bg-argo-paper min-h-screen">
      <div className="section-container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="label-micro text-argo-gold">Institutional Investor Portal</div>
              <div className="w-1 h-1 bg-argo-gold rounded-full"></div>
              <div className="text-[10px] text-argo-slate/40 font-bold uppercase tracking-widest">Confidential</div>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif mb-4">The <span className="italic">Deal Room.</span></h1>
            <p className="text-argo-slate font-serif italic text-xl">Active capital deployment opportunities and portfolio metrics.</p>
          </div>
          <div className="bg-white px-6 py-4 border border-black/[0.05] shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 bg-argo-blue text-white rounded-full flex items-center justify-center font-bold font-serif">JS</div>
            <div>
              <div className="text-sm font-bold">J. Smith</div>
              <div className="text-[10px] text-emerald-600 uppercase tracking-widest font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Accredited
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {/* Deal Card 1: Blue Chip */}
          <div className="bg-white border border-black/[0.03] shadow-sm hover:shadow-xl transition-all duration-500 group flex flex-col">
            <div className="h-48 bg-argo-slate relative overflow-hidden">
              <img src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800" alt="Building" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000 grayscale" referrerPolicy="no-referrer" />
              <div className="absolute top-4 right-4 bg-argo-slate text-white px-3 py-1 text-[10px] uppercase tracking-widest font-bold">Closed</div>
            </div>
            <div className="p-8 flex-grow flex flex-col">
              <div className="label-micro text-argo-slate/60 mb-2">Stabilized Residential</div>
              <h3 className="text-2xl font-serif mb-6">Upper West Side Portfolio</h3>
              
              <div className="mb-8">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-bold text-argo-slate">100% Subscribed</span>
                  <span className="text-argo-slate">$75M / $75M</span>
                </div>
                <div className="w-full h-2 bg-argo-paper rounded-full overflow-hidden">
                  <div className="h-full bg-argo-slate w-full"></div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8 border-y border-black/[0.05] py-6">
                <div>
                  <div className="text-[10px] text-argo-slate/60 uppercase tracking-widest font-bold mb-1">LTV</div>
                  <div className="text-xl font-serif text-argo-slate">65%</div>
                </div>
                <div>
                  <div className="text-[10px] text-argo-slate/60 uppercase tracking-widest font-bold mb-1">Cap Rate</div>
                  <div className="text-xl font-serif text-argo-slate">4.8%</div>
                </div>
                <div>
                  <div className="text-[10px] text-argo-slate/60 uppercase tracking-widest font-bold mb-1">Target Exit</div>
                  <div className="text-xl font-serif text-argo-slate">7-10 Yr</div>
                </div>
              </div>
              
              <div className="mt-auto">
                <div className="text-[10px] text-argo-slate/60 uppercase tracking-widest font-bold mb-4 text-center">Target IRR: 12% - 13%</div>
                <button className="w-full py-3 border border-argo-slate/20 text-argo-slate text-sm font-bold uppercase tracking-widest hover:bg-argo-slate hover:text-white transition-colors">
                  View Quarterly Report
                </button>
              </div>
            </div>
          </div>

          {/* Deal Card 2: Growth Play */}
          <div className="bg-white border border-black/[0.03] shadow-sm hover:shadow-xl transition-all duration-500 group flex flex-col">
            <div className="h-48 bg-argo-blue relative overflow-hidden">
              <img src="https://images.unsplash.com/photo-1577705998148-6da4f3963bc8?auto=format&fit=crop&q=80&w=800" alt="Building" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000" referrerPolicy="no-referrer" />
              <div className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 text-[10px] uppercase tracking-widest font-bold">Open</div>
            </div>
            <div className="p-8 flex-grow flex flex-col">
              <div className="label-micro text-argo-slate/60 mb-2">Value-Add</div>
              <h3 className="text-2xl font-serif mb-6">Chelsea Mixed-Use Redevelopment</h3>
              
              <div className="mb-8">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-bold text-argo-blue">40% Subscribed</span>
                  <span className="text-argo-slate">$12M / $30M</span>
                </div>
                <div className="w-full h-2 bg-argo-paper rounded-full overflow-hidden">
                  <div className="h-full bg-argo-gold w-[40%]"></div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8 border-y border-black/[0.05] py-6">
                <div>
                  <div className="text-[10px] text-argo-slate/60 uppercase tracking-widest font-bold mb-1">LTV</div>
                  <div className="text-xl font-serif text-argo-blue">65%</div>
                </div>
                <div>
                  <div className="text-[10px] text-argo-slate/60 uppercase tracking-widest font-bold mb-1">Cap Rate</div>
                  <div className="text-xl font-serif text-argo-blue">5.2%</div>
                </div>
                <div>
                  <div className="text-[10px] text-argo-slate/60 uppercase tracking-widest font-bold mb-1">Target Exit</div>
                  <div className="text-xl font-serif text-argo-blue">3-5 Yr</div>
                </div>
              </div>
              
              <div className="mt-auto">
                <div className="text-[10px] text-argo-slate/60 uppercase tracking-widest font-bold mb-4 text-center">Target IRR: 14% - 15%</div>
                <button className="w-full py-3 border border-argo-blue text-argo-blue text-sm font-bold uppercase tracking-widest hover:bg-argo-blue hover:text-white transition-colors">
                  View Offering Memo
                </button>
              </div>
            </div>
          </div>

          {/* Deal Card 3: Queens Stronghold */}
          <div className="bg-white border border-black/[0.03] shadow-sm hover:shadow-xl transition-all duration-500 group flex flex-col">
            <div className="h-48 bg-argo-blue relative overflow-hidden">
              <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800" alt="Building" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000" referrerPolicy="no-referrer" />
              <div className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 text-[10px] uppercase tracking-widest font-bold">Open</div>
            </div>
            <div className="p-8 flex-grow flex flex-col">
              <div className="label-micro text-argo-slate/60 mb-2">High Yield</div>
              <h3 className="text-2xl font-serif mb-6">Long Island City Multifamily Fund</h3>
              
              <div className="mb-8">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-bold text-argo-blue">85% Subscribed</span>
                  <span className="text-argo-slate">$42.5M / $50M</span>
                </div>
                <div className="w-full h-2 bg-argo-paper rounded-full overflow-hidden">
                  <div className="h-full bg-argo-gold w-[85%]"></div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8 border-y border-black/[0.05] py-6">
                <div>
                  <div className="text-[10px] text-argo-slate/60 uppercase tracking-widest font-bold mb-1">LTV</div>
                  <div className="text-xl font-serif text-argo-blue">65%</div>
                </div>
                <div>
                  <div className="text-[10px] text-argo-slate/60 uppercase tracking-widest font-bold mb-1">Cap Rate</div>
                  <div className="text-xl font-serif text-argo-blue">4.9%</div>
                </div>
                <div>
                  <div className="text-[10px] text-argo-slate/60 uppercase tracking-widest font-bold mb-1">Target Exit</div>
                  <div className="text-xl font-serif text-argo-blue">5-Year</div>
                </div>
              </div>
              
              <div className="mt-auto">
                <div className="text-[10px] text-argo-slate/60 uppercase tracking-widest font-bold mb-4 text-center">Target IRR: 12% - 14%</div>
                <button className="w-full py-3 border border-argo-blue text-argo-blue text-sm font-bold uppercase tracking-widest hover:bg-argo-blue hover:text-white transition-colors">
                  View Offering Memo
                </button>
              </div>
            </div>
          </div>

          {/* Deal Card 4: Opportunistic */}
          <div className="bg-white border border-black/[0.03] shadow-sm hover:shadow-xl transition-all duration-500 group flex flex-col">
            <div className="h-48 bg-argo-blue relative overflow-hidden">
              <img src="https://images.unsplash.com/photo-1496851473196-e26508c21494?auto=format&fit=crop&q=80&w=800" alt="Building" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000" referrerPolicy="no-referrer" />
              <div className="absolute top-4 right-4 bg-argo-gold text-white px-3 py-1 text-[10px] uppercase tracking-widest font-bold">New</div>
            </div>
            <div className="p-8 flex-grow flex flex-col">
              <div className="label-micro text-argo-slate/60 mb-2">New Development</div>
              <h3 className="text-2xl font-serif mb-6">FiDi Adaptive Reuse</h3>
              
              <div className="mb-8">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-bold text-argo-blue">15% Subscribed</span>
                  <span className="text-argo-slate">$15M / $100M</span>
                </div>
                <div className="w-full h-2 bg-argo-paper rounded-full overflow-hidden">
                  <div className="h-full bg-argo-gold w-[15%]"></div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8 border-y border-black/[0.05] py-6">
                <div>
                  <div className="text-[10px] text-argo-slate/60 uppercase tracking-widest font-bold mb-1">LTV</div>
                  <div className="text-xl font-serif text-argo-blue">65%</div>
                </div>
                <div>
                  <div className="text-[10px] text-argo-slate/60 uppercase tracking-widest font-bold mb-1">Cap Rate</div>
                  <div className="text-xl font-serif text-argo-blue">5.0%</div>
                </div>
                <div>
                  <div className="text-[10px] text-argo-slate/60 uppercase tracking-widest font-bold mb-1">Target Exit</div>
                  <div className="text-xl font-serif text-argo-blue">4-Year</div>
                </div>
              </div>
              
              <div className="mt-auto">
                <div className="text-[10px] text-argo-slate/60 uppercase tracking-widest font-bold mb-4 text-center">Target IRR: 13% - 15%</div>
                <button className="w-full py-3 border border-argo-blue text-argo-blue text-sm font-bold uppercase tracking-widest hover:bg-argo-blue hover:text-white transition-colors">
                  View Offering Memo
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-black/[0.05] text-[10px] text-argo-slate/60 leading-relaxed max-w-4xl mx-auto text-center">
          <p className="mb-2">
            <strong>SEC Rule 506(c) Disclaimer:</strong> The offerings presented on this portal are private placements available only to verified Accredited Investors and Qualified Purchasers. This information does not constitute an offer to sell or a solicitation of an offer to buy any securities.
          </p>
          <p>
            Past performance is not indicative of future results. Real estate investments carry significant risks, including the potential loss of principal. Projected IRR, Cash-on-Cash, and Target Exits are forward-looking statements based on current market assumptions and are subject to change.
          </p>
        </div>
      </div>
    </div>
  );
};

const PortalPage = ({ setPage }: { setPage: (p: Page) => void }) => {
  return (
    <div className="pt-48 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-1000 bg-argo-paper min-h-screen">
      <div className="section-container">
        <div className="max-w-xl mx-auto text-center mb-16">
          <div className="label-micro mb-6">Secure Gateway</div>
          <h1 className="text-5xl font-serif mb-8">Portal <span className="italic">Login.</span></h1>
          <p className="text-argo-slate font-serif italic">Select your access point to enter the Argo secure environment.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-12 border border-black/[0.03] shadow-2xl hover:border-argo-gold/40 transition-all group cursor-pointer">
            <div className="w-16 h-16 bg-argo-blue text-white rounded-full flex items-center justify-center mb-8">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-3xl font-serif mb-4">Board Member Portal</h3>
            <p className="text-argo-slate text-sm leading-relaxed mb-12">Access financial reports, building documents, and board-only communications.</p>
            <button 
              onClick={() => setPage('dashboard')}
              className="btn-gold w-full"
            >
              Enter Board Portal
            </button>
          </div>

          <div className="bg-white p-12 border border-black/[0.03] shadow-2xl hover:border-argo-gold/40 transition-all group cursor-pointer">
            <div className="w-16 h-16 bg-argo-warm text-argo-blue rounded-full flex items-center justify-center mb-8">
              <Home className="w-8 h-8" />
            </div>
            <h3 className="text-3xl font-serif mb-4">Resident Portal</h3>
            <p className="text-argo-slate text-sm leading-relaxed mb-12">Pay your maintenance/rent, submit service requests, and view building notices.</p>
            <button 
              onClick={() => setPage('residents')}
              className="btn-primary w-full"
            >
              Enter Resident Portal
            </button>
          </div>

          <div className="bg-white p-12 border border-black/[0.03] shadow-2xl hover:border-argo-gold/40 transition-all group cursor-pointer">
            <div className="w-16 h-16 bg-argo-slate text-white rounded-full flex items-center justify-center mb-8">
              <TrendingUp className="w-8 h-8" />
            </div>
            <h3 className="text-3xl font-serif mb-4">Investor Portal</h3>
            <p className="text-argo-slate text-sm leading-relaxed mb-12">Access the Deal Room, view current offerings, and track portfolio performance.</p>
            <button 
              onClick={() => setPage('investor-portal')}
              className="btn-primary w-full bg-argo-slate hover:bg-argo-blue"
            >
              Enter Deal Room
            </button>
          </div>
        </div>

        <div className="mt-24 text-center">
          <p className="text-argo-slate/40 text-[10px] uppercase font-bold tracking-[0.2em]">
            Bank-Grade Encryption • 24/7 Monitoring • Secure Data Sovereignty
          </p>
        </div>
      </div>
    </div>
  );
};

const ResidentsPage = () => {
  const [boardPackageStep, setBoardPackageStep] = useState(2); // 0: Submitted, 1: Review, 2: Interview, 3: Decision

  return (
    <div className="pt-48 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-1000 bg-argo-paper min-h-screen">
      <div className="section-container">
        <div className="max-w-4xl mb-32">
          <div className="label-micro mb-6">Applicant & Resident Dashboard</div>
          <h1 className="text-6xl md:text-8xl mb-12 leading-[0.85]">Welcome <span className="italic">Home.</span></h1>
          <p className="text-2xl text-argo-slate font-serif italic leading-relaxed">
            Access your building portal, track applications, and stay connected with your community.
          </p>
        </div>

        {/* Board Package Tracker (Institutional Product) */}
        <div className="mb-16 bg-white p-12 border border-black/[0.03] shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-6 h-6 text-argo-gold" />
                <h3 className="text-3xl font-serif">Board Package Tracker</h3>
              </div>
              <p className="text-argo-slate text-sm font-light">Application ID: #APP-2026-8942 • 145 Central Park West, Apt 12B</p>
            </div>
            <div className="bg-argo-warm px-6 py-3 rounded-full border border-black/[0.05]">
              <span className="label-micro text-argo-blue">Status: Pending Interview</span>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-argo-warm -translate-y-1/2 z-0 hidden md:block"></div>
            <div 
              className="absolute top-1/2 left-0 h-1 bg-argo-gold -translate-y-1/2 z-0 hidden md:block transition-all duration-1000"
              style={{ width: `${(boardPackageStep / 3) * 100}%` }}
            ></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
              {[
                { label: 'Package Submitted', date: 'Mar 01, 2026', status: 'completed' },
                { label: 'Management Review', date: 'Mar 05, 2026', status: 'completed' },
                { label: 'Board Interview', date: 'Action Required', status: 'current' },
                { label: 'Final Decision', date: 'Pending', status: 'upcoming' }
              ].map((step, i) => (
                <div key={i} className="flex flex-row md:flex-col items-center md:items-start gap-6 md:gap-4 bg-white md:bg-transparent p-4 md:p-0 border border-black/[0.05] md:border-none rounded-xl md:rounded-none">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 flex-shrink-0 transition-colors duration-500 ${
                    i < boardPackageStep ? 'bg-argo-gold border-argo-gold text-white' : 
                    i === boardPackageStep ? 'bg-white border-argo-gold text-argo-gold shadow-[0_0_15px_rgba(200,169,119,0.3)]' : 
                    'bg-white border-argo-warm text-argo-slate/30'
                  }`}>
                    {i < boardPackageStep ? <Check className="w-5 h-5" /> : <span className="font-serif font-bold">{i + 1}</span>}
                  </div>
                  <div>
                    <div className={`font-serif mb-1 ${i <= boardPackageStep ? 'text-argo-blue' : 'text-argo-slate/50'}`}>{step.label}</div>
                    <div className={`text-[10px] uppercase tracking-widest font-bold ${i === boardPackageStep ? 'text-argo-gold' : 'text-argo-slate/50'}`}>{step.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {boardPackageStep === 2 && (
            <div className="mt-12 p-6 bg-argo-gold/10 border border-argo-gold/20 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-6 animate-in fade-in duration-500">
              <div className="flex items-center gap-4">
                <AlertTriangle className="w-6 h-6 text-argo-gold" />
                <div>
                  <h4 className="font-serif text-argo-blue mb-1">Interview Scheduling Open</h4>
                  <p className="text-xs text-argo-slate">The board has reviewed your package and requested an interview.</p>
                </div>
              </div>
              <button className="btn-gold whitespace-nowrap">Schedule Interview</button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: 'Pay Online', icon: CreditCard, desc: 'Securely manage your monthly charges and view payment history.' },
                { label: 'Maintenance', icon: Wrench, desc: 'Submit and track service requests for your residence.' },
                { label: 'Documents', icon: FileText, desc: 'Access building bylaws, house rules, and financial statements.' },
                { label: 'Building Notices', icon: AlertTriangle, desc: 'Stay informed about upcoming work and community events.' },
              ].map((item, i) => (
                <button key={i} className="p-12 bg-white border border-black/[0.03] text-left group transition-all duration-700 hover:border-argo-gold/20">
                  <item.icon className="w-8 h-8 text-argo-gold mb-8 opacity-50" />
                  <h3 className="text-2xl mb-4 font-serif">{item.label}</h3>
                  <p className="text-argo-slate text-sm leading-relaxed font-light mb-8">{item.desc}</p>
                  <div className="label-micro group-hover:text-argo-blue transition-colors">Launch Portal</div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-argo-blue text-white p-12 shadow-2xl">
              <div className="label-micro text-white/40 mb-8">Quick Access</div>
              <div className="space-y-4">
                {[
                  'Building Portal Login',
                  'Alteration Application',
                  'Contact Management'
                ].map((label, i) => (
                  <button key={i} className="w-full border border-white/10 p-6 text-left flex justify-between items-center hover:bg-white/5 transition-colors group">
                    <span className="label-micro text-white/80 group-hover:text-white">{label}</span>
                    <ChevronRight className="w-4 h-4 text-argo-gold" />
                  </button>
                ))}
              </div>
              <div className="mt-24 pt-12 border-t border-white/10">
                <div className="label-micro text-white/40 mb-6">Emergency Contact</div>
                <div className="text-3xl font-serif font-light mb-2">212.896.8600</div>
                <div className="label-micro text-argo-gold">Available 24/7</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactPage = () => {
  return (
    <div className="pt-48 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
          <div>
            <div className="label-micro mb-6">Contact Us</div>
            <h1 className="text-6xl md:text-8xl mb-12 leading-[0.9]">Let's Start a <br/><span className="italic">Conversation.</span></h1>
            <p className="text-2xl text-argo-slate mb-16 font-serif italic leading-relaxed">
              Whether you're a board member looking for new management, a developer with a new project, or a resident with a question, we're here to help.
            </p>
            
            <div className="space-y-12">
              <div className="flex gap-8">
                <div className="w-12 h-12 bg-argo-warm rounded-full flex items-center justify-center text-argo-gold flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xl mb-2 font-serif">Main Office</h4>
                  <p className="text-argo-slate text-sm font-light">50 West 17th Street, New York, NY 10011</p>
                </div>
              </div>
              <div className="flex gap-8">
                <div className="w-12 h-12 bg-argo-warm rounded-full flex items-center justify-center text-argo-gold flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xl mb-2 font-serif">Phone</h4>
                  <p className="text-argo-slate text-sm font-light">(212) 896-8600</p>
                </div>
              </div>
              <div className="flex gap-8">
                <div className="w-12 h-12 bg-argo-warm rounded-full flex items-center justify-center text-argo-gold flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xl mb-2 font-serif">Email</h4>
                  <p className="text-argo-slate text-sm font-light">info@argo.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-12 md:p-16 border border-black/[0.03] shadow-2xl">
            <div className="label-micro mb-8">Inquiry Form</div>
            <h3 className="text-3xl mb-12 font-serif">Send Us a Message</h3>
            <form className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <label className="label-micro text-argo-slate/60">Full Name</label>
                  <input type="text" className="w-full border-b border-black/10 py-3 focus:outline-none focus:border-argo-gold transition-colors bg-transparent" />
                </div>
                <div className="space-y-4">
                  <label className="label-micro text-argo-slate/60">Email Address</label>
                  <input type="email" className="w-full border-b border-black/10 py-3 focus:outline-none focus:border-argo-gold transition-colors bg-transparent" />
                </div>
              </div>
              <div className="space-y-4">
                <label className="label-micro text-argo-slate/60">I am a...</label>
                <select className="w-full border-b border-black/10 py-3 focus:outline-none focus:border-argo-gold transition-colors bg-transparent text-argo-slate">
                  <option>Select Option</option>
                  <option>Board Member</option>
                  <option>Building Owner</option>
                  <option>Resident</option>
                  <option>Buyer / Renter</option>
                  <option>Developer</option>
                </select>
              </div>
              <div className="space-y-4">
                <label className="label-micro text-argo-slate/60">Message</label>
                <textarea rows={4} className="w-full border-b border-black/10 py-3 focus:outline-none focus:border-argo-gold transition-colors bg-transparent"></textarea>
              </div>
              <button className="btn-gold w-full">Submit Inquiry</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [page, setPage] = useState<Page>('home');

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const renderPage = () => {
    switch (page) {
      case 'home': return <HomePage setPage={setPage} />;
      case 'property-management': return <PropertyManagementPage />;
      case 'residential': return <ResidentialPage />;
      case 'residents': return <ResidentsPage />;
      case 'asset-management': return <AssetManagementPage setPage={setPage} />;
      case 'new-development': return <NewDevelopmentPage />;
      case 'case-studies': return <CaseStudiesPage />;
      case 'contact': return <ContactPage />;
      case 'argo-u': return <ArgoUniversityPage />;
      case 'about': return <AboutPage />;
      case 'careers': return <CareersPage />;
      case 'portal': return <PortalPage setPage={setPage} />;
      case 'investor-portal': return <InvestorPortalPage />;
      case 'accessibility': return <AccessibilityPage />;
      case 'privacy': return <PrivacyPage />;
      case 'terms': return <TermsPage />;
      case 'fair-housing': return <FairHousingPage />;
      case 'dashboard': return <DashboardPage />;
      default: return <HomePage setPage={setPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentPage={page} setPage={setPage} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer setPage={setPage} />
      <ArgoConcierge setPage={setPage} />
    </div>
  );
}
