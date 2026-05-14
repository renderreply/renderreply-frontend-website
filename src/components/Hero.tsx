"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useSession } from "next-auth/react";

export const Hero = () => {
  const { status } = useSession();

  return (
    <section className="relative pt-2 pb-8 overflow-hidden bg-white dot-pattern">
      <div className="container mx-auto px-10 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-slate-50 border border-slate-100 mx-auto">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Automation Platform for Creators</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-[1000] tracking-tighter text-black leading-[0.9]">
            Automate Your <br />
            <span className="bg-gradient-to-r from-primary via-purple-400 to-primary bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient">Instagram Presence</span>
          </h1>
          
          <p className="text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto">
            RenderReply automates your Instagram — replies, DMs, comments, and follow-ups — so you can focus on creating.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href={status === "authenticated" ? "/dashboard/rules" : "/login"}>
              <Button className="bg-black hover:bg-black/90 text-white h-16 px-12 rounded-[24px] font-black text-sm uppercase tracking-widest shadow-2xl shadow-black/20 transition-all hover:-translate-y-1">
                {status === "authenticated" ? "Go to Automation" : "Start Free"}
              </Button>
            </Link>
            <Link href="/pricing">
              <Button variant="ghost" className="h-16 px-12 rounded-[24px] font-black text-sm uppercase tracking-widest text-slate-400 hover:text-black hover:bg-slate-50 flex items-center gap-2 transition-all">
                View Pricing <ArrowRight size={18} />
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-12 pt-10 border-t border-slate-50">
            <TrustBadge text="Automate" />
            <TrustBadge text="Manage" />
            <TrustBadge text="Grow" />
          </div>
        </div>
      </div>
      
      {/* Background Decorative Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10" />
    </section>
  );
};

function TrustBadge({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
      <CheckCircle2 size={14} className="text-emerald-500" />
      {text}
    </div>
  );
}
