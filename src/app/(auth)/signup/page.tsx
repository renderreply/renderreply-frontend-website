"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { api } from "@/lib/api";
import { ArrowLeft } from "lucide-react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await api.post(`/auth/signup`, {
        email,
        password,
        name,
      });
      router.push("/login");
    } catch (error) {
      alert("Error creating account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-white">
      {/* Left Form Section */}
      <div className="w-full lg:w-1/2 flex flex-col relative px-8 sm:px-16 md:px-24 justify-center">

        <div className="w-full max-w-[380px] mx-auto mt-12">
          <div className="mb-12">
            <h1 className="text-3xl font-[1000] tracking-tight text-black mb-3">Create an account</h1>
            <p className="text-sm font-medium text-slate-500">Sign up to start automating your Instagram engagement.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">Full Name</label>
              <Input 
                type="text" 
                placeholder="Jane Doe" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required 
                className="h-12 rounded-lg bg-transparent border-slate-200 text-sm px-4 focus-visible:ring-1 focus-visible:ring-black placeholder:text-slate-300 shadow-none"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">Email Address</label>
              <Input 
                type="email" 
                placeholder="name@company.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
                className="h-12 rounded-lg bg-transparent border-slate-200 text-sm px-4 focus-visible:ring-1 focus-visible:ring-black placeholder:text-slate-300 shadow-none"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">Create Password</label>
              <Input 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                className="h-12 rounded-lg bg-transparent border-slate-200 text-sm px-4 focus-visible:ring-1 focus-visible:ring-black placeholder:text-slate-300 shadow-none"
              />
            </div>
            
            <Button type="submit" disabled={loading} className="w-full h-12 rounded-lg bg-black hover:bg-slate-900 text-white font-bold text-sm shadow-none transition-all mt-4">
              {loading ? "Creating Account..." : "Sign Up"}
            </Button>
          </form>

          <p className="text-[11px] font-medium text-slate-500 mt-8 text-center mb-8">
            Already have an account?{" "}
            <Link href="/login" className="text-black hover:underline font-bold">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right Brand Section */}
      <div className="hidden lg:flex w-1/2 bg-slate-50 flex-col justify-center items-center p-12 relative overflow-hidden">
        {/* Subtle decorative grid/pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        
        <div className="relative z-10 w-full max-w-[440px] flex flex-col items-center text-center">
          
          {/* Main Card */}
          <div className="bg-white p-10 rounded-[32px] border border-slate-200 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] w-full mb-12">
            <div className="flex justify-center mb-8">
              <div className="bg-blue-50 text-blue-600 px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-2 border border-blue-100 shadow-sm">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-7.332 8.434c-.237.272-.647.291-.913.04l-3.549-3.34c-.266-.251-.284-.668-.04-.94l.872-1c.245-.28.665-.303.936-.046l1.968 1.854 5.75-6.618c.237-.272.647-.291.913-.04l.883.831c.265.25.283.667.038.939z"/>
                </svg>
                Meta Verified Partner
              </div>
            </div>
            
            <h2 className="text-4xl font-[1000] tracking-tighter text-slate-900 mb-3 uppercase">RenderReply</h2>
            <p className="text-slate-500 font-medium text-sm mb-10">The elite standard for Instagram Automation.</p>

            <div className="flex flex-col gap-4 text-left bg-slate-50 p-6 rounded-2xl border border-slate-100">
              {[
                "100% Compliant with Instagram API",
                "Bank-grade Security & Encryption",
                "Zero risk of account shadowbans",
                "Trusted by 10,000+ creators"
              ].map((text, i) => (
                <div className="flex items-center gap-4" key={i}>
                  <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-xs font-bold text-slate-700">{text}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Testimonial */}
          <div className="w-full text-left relative z-10 px-4">
            <p className="text-sm font-medium leading-relaxed text-slate-500 italic mb-5">
              "We scaled our DMs by 400% in the first month. The setup was effortless and the support is unmatched."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center font-black text-xs text-white shadow-lg">MC</div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">Marcus Chen</p>
                <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-slate-400">Founder, CreatorLabs</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
