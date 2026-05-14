"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("reason") === "session_expired") {
        // In a real app, use a toast library. For now, simple alert.
        alert("Your session expired. Please log in again.");
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      alert("Invalid credentials");
    } else {
      router.push("/");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 relative overflow-hidden font-sans">
      <main className="w-full max-w-[440px] px-6 py-12 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center shadow-xl mb-4 rotate-3">
            <span className="text-white text-2xl font-black italic">R</span>
          </div>
          <h2 className="text-slate-900 text-lg font-black tracking-tight">RenderReply</h2>
        </div>

        {/* Clean Light Card */}
        <div className="bg-white border border-slate-200 rounded-[32px] p-8 md:p-12 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)]">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Welcome back</h1>
            <p className="text-sm font-medium text-slate-500">Sign in to your account to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Email Address</label>
              <Input 
                type="email" 
                placeholder="name@company.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
                className="h-14 rounded-2xl bg-slate-50 border-slate-200 text-slate-900 px-5 focus-visible:ring-black/5 focus-visible:bg-white transition-all placeholder:text-slate-400 shadow-none outline-none"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Password</label>
                <button type="button" className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-400 hover:text-black transition-colors">Forgot?</button>
              </div>
              <div className="relative">
                <Input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                  className="h-14 rounded-2xl bg-slate-50 border-slate-200 text-slate-900 px-5 pr-12 focus-visible:ring-black/5 focus-visible:bg-white transition-all placeholder:text-slate-400 shadow-none outline-none"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-black transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            
            <Button type="submit" disabled={loading} className="w-full h-14 rounded-2xl bg-black text-white hover:bg-slate-800 font-black text-sm transition-all active:scale-[0.98] mt-4 shadow-xl">
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <p className="text-sm font-medium text-slate-500 mt-10 text-center">
            Don't have an account?{" "}
            <Link href="/signup" className="text-black hover:text-slate-600 font-bold underline underline-offset-4 transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
