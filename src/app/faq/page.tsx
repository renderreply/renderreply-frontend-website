"use client";

import { Navbar } from "@/components/Navbar";
import { ChevronDown, HelpCircle, MessageSquare, Zap, ShieldCheck, Globe } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "What is RenderReply?",
    answer: "RenderReply is an elite Instagram automation platform that helps creators and businesses automate their engagement. It handles comment replies, story mentions, and DMs instantly using the official Meta API.",
    icon: Zap
  },
  {
    question: "Is it safe for my Instagram account?",
    answer: "Yes, 100%. We use the official Meta Graph API, which is the only approved way to automate Instagram. Your account is completely safe and follows all of Instagram's terms of service.",
    icon: ShieldCheck
  },
  {
    question: "Do I need an Instagram Professional account?",
    answer: "Yes. To use automation, your Instagram account must be set to 'Business' or 'Creator' mode and be linked to a Facebook Page.",
    icon: HelpCircle
  },
  {
    question: "How long does it take to set up?",
    answer: "Setup takes less than 2 minutes. Just connect your account, create your first rule, and you're ready to grow on autopilot.",
    icon: Globe
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Absolutely. You can cancel your plan at any time from your account settings. You will still have access to your features until the end of your billing cycle.",
    icon: MessageSquare
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-slate-50 font-sans">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-32 pb-20 max-w-3xl">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white text-[10px] font-black uppercase tracking-widest mb-2">
            Support Center
          </div>
          <h1 className="text-4xl md:text-6xl font-[1000] tracking-tighter text-slate-900">
            Frequently Asked <br /> Questions<span className="text-black">.</span>
          </h1>
          <p className="text-slate-500 font-bold text-lg">
            Everything you need to know about RenderReply.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const Icon = faq.icon;
            const isOpen = openIndex === index;
            
            return (
              <div 
                key={index} 
                className={`bg-white border border-slate-200 rounded-[24px] overflow-hidden transition-all duration-300 ${isOpen ? 'shadow-xl ring-1 ring-black/5' : 'hover:border-slate-300'}`}
              >
                <button 
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${isOpen ? 'bg-black text-white' : 'bg-slate-50 text-slate-400'}`}>
                      <Icon size={20} />
                    </div>
                    <span className="font-black text-slate-900 tracking-tight">{faq.question}</span>
                  </div>
                  <ChevronDown className={`text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-black' : ''}`} size={20} />
                </button>
                
                {isOpen && (
                  <div className="px-20 pb-8 text-slate-500 font-medium leading-relaxed animate-in fade-in slide-in-from-top-2 duration-300">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-16 p-8 bg-white border border-slate-200 rounded-[32px] text-center shadow-sm">
          <h3 className="text-xl font-black text-slate-900 mb-2">Still have questions?</h3>
          <p className="text-slate-500 font-medium mb-6">Our support team is always ready to help you grow.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://wa.me/917995463504" className="w-full sm:w-auto px-8 py-4 bg-emerald-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20">
              WhatsApp Us
            </a>
            <a href="mailto:renderreply@gmail.com" className="w-full sm:w-auto px-8 py-4 bg-black text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg shadow-black/20">
              Email Support
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
