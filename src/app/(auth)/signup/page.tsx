"use client";

export const dynamic = "force-dynamic";

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
        confirmPassword: password, // The backend schema requires confirmPassword
      });
      router.push("/login");
    } catch (error: any) {
      const msg = error.response?.data?.error || "Error creating account. Please try again.";
      const details = error.response?.data?.details;
      if (details && Array.isArray(details)) {
        alert(`${msg}: ${details[0].message}`);
      } else {
        alert(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0a0a0a] relative overflow-hidden font-sans">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />

      <main className="w-full max-w-[480px] px-6 py-12 relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-2xl mb-4 -rotate-3 hover:rotate-0 transition-transform duration-500">
            <span className="text-black text-2xl font-black italic">R</span>
          </div>
          <h2 className="text-white text-lg font-black tracking-tight">RenderReply</h2>
        </div>

        {/* Glassmorphism Card */}
        <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[40px] p-8 md:p-12 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)]">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-black text-white mb-2 tracking-tight">Create account</h1>
            <p className="text-sm font-medium text-slate-400">Join the elite standard for Instagram automation</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Full Name</label>
              <Input 
                type="text" 
                placeholder="Jane Doe" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required 
                className="h-14 rounded-2xl bg-white/5 border-white/10 text-white px-5 focus-visible:ring-blue-500/50 focus-visible:bg-white/10 transition-all placeholder:text-slate-600"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Email Address</label>
              <Input 
                type="email" 
                placeholder="name@company.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
                className="h-14 rounded-2xl bg-white/5 border-white/10 text-white px-5 focus-visible:ring-blue-500/50 focus-visible:bg-white/10 transition-all placeholder:text-slate-600"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Create Password</label>
              <Input 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                className="h-14 rounded-2xl bg-white/5 border-white/10 text-white px-5 focus-visible:ring-blue-500/50 focus-visible:bg-white/10 transition-all placeholder:text-slate-600"
              />
            </div>
            
            <Button type="submit" disabled={loading} className="w-full h-14 rounded-2xl bg-white text-black hover:bg-slate-200 font-black text-sm transition-all active:scale-[0.98] mt-4 shadow-xl shadow-white/5">
              {loading ? "Creating account..." : "Sign Up"}
            </Button>
          </form>

          <p className="text-sm font-medium text-slate-500 mt-10 text-center">
            Already have an account?{" "}
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
