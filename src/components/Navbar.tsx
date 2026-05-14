"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { User, LogOut, ChevronDown, LayoutDashboard, Settings, Menu, X } from "lucide-react";

export function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (pathname === "/login" || pathname === "/signup") {
    return null;
  }
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-50">
      <div className="flex items-center justify-between pl-6 pr-6 lg:pr-10 py-5">
        <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
          <span className="text-xl font-black tracking-widest text-black uppercase">RenderReply</span>
        </Link>
        
        {/* Desktop Links */}
        <div className="absolute left-1/2 -translate-x-1/2 hidden lg:flex items-center gap-10 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
          <Link href="/" className={`transition-colors ${pathname === '/' ? 'text-black' : 'hover:text-black'}`}>Home</Link>
          <Link href="/dashboard/rules" className={`transition-colors ${pathname?.startsWith('/dashboard') ? 'text-black' : 'hover:text-black'}`}>Automation</Link>
          <Link href="/pricing" className={`transition-colors ${pathname?.startsWith('/pricing') ? 'text-black' : 'hover:text-black'}`}>Pricing</Link>
        </div>

        {/* Desktop Right Actions */}
        <div className="hidden lg:flex items-center gap-4">
          {status === "authenticated" ? (
            <div className="relative" ref={menuRef}>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center gap-2.5 p-1 pr-3 rounded-full hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100"
              >
                <div className="w-10 h-10 rounded-full bg-slate-950 text-white flex items-center justify-center font-black text-[10px] shadow-lg shadow-black/5">
                  {session?.user?.name?.[0]?.toUpperCase() || "U"}
                </div>
                <ChevronDown size={14} className="text-slate-300" />
              </button>
              
              {isMenuOpen && (
                <div className="absolute right-0 mt-4 w-72 bg-white rounded-[32px] border border-slate-100 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] p-2 animate-in fade-in zoom-in duration-200">
                  <div className="p-6 border-b border-slate-50">
                    <p className="font-black text-sm text-black truncate">{session?.user?.name}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 truncate">{session?.user?.email}</p>
                  </div>
                  <div className="p-2 space-y-1">
                    <Link href="/dashboard/settings" onClick={() => setIsMenuOpen(false)}>
                      <div className="flex items-center gap-3 px-5 py-3.5 text-[11px] font-black uppercase tracking-widest rounded-2xl hover:bg-slate-50 transition-colors text-slate-600">
                        <Settings size={16} />
                        Account Settings
                      </div>
                    </Link>
                    <div 
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="flex items-center gap-3 px-5 py-3.5 text-[11px] font-black uppercase tracking-widest rounded-2xl hover:bg-rose-50 text-rose-600 transition-colors cursor-pointer"
                    >
                      <LogOut size={16} />
                      Sign Out
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" className="rounded-full text-[11px] font-black uppercase tracking-widest px-6">Login</Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-black hover:bg-black/90 text-white px-8 h-12 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-black/10">Start Free</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          className="lg:hidden p-2 text-slate-900"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-50 p-6 flex flex-col gap-6 animate-in slide-in-from-top-2 duration-200 shadow-2xl">
          <div className="flex flex-col gap-6 text-sm font-black uppercase tracking-[0.2em] text-slate-400">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className={`transition-colors ${pathname === '/' ? 'text-black' : 'hover:text-black'}`}>Home</Link>
            <Link href="/dashboard/rules" onClick={() => setIsMobileMenuOpen(false)} className={`transition-colors ${pathname?.startsWith('/dashboard') ? 'text-black' : 'hover:text-black'}`}>Automation</Link>
            <Link href="/pricing" onClick={() => setIsMobileMenuOpen(false)} className={`transition-colors ${pathname?.startsWith('/pricing') ? 'text-black' : 'hover:text-black'}`}>Pricing</Link>
          </div>
          
          <div className="pt-6 border-t border-slate-50 flex flex-col gap-4">
            {status === "authenticated" ? (
              <>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-slate-950 text-white flex items-center justify-center font-black text-xs shadow-lg shadow-black/5">
                    {session?.user?.name?.[0]?.toUpperCase() || "U"}
                  </div>
                  <div>
                    <p className="font-black text-sm text-black truncate">{session?.user?.name}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 truncate">{session?.user?.email}</p>
                  </div>
                </div>
                <Link href="/dashboard/settings" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full justify-start rounded-xl h-12 text-xs font-black uppercase tracking-widest border-slate-200">
                    <Settings size={16} className="mr-3" /> Account Settings
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="w-full justify-start rounded-xl h-12 text-xs font-black uppercase tracking-widest text-rose-600 hover:text-rose-700 hover:bg-rose-50"
                >
                  <LogOut size={16} className="mr-3" /> Sign Out
                </Button>
              </>
            ) : (
              <div className="flex flex-col gap-3">
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full">
                  <Button variant="outline" className="w-full rounded-2xl h-14 text-[11px] font-black uppercase tracking-widest border-slate-200">Login</Button>
                </Link>
                <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)} className="w-full">
                  <Button className="w-full bg-black hover:bg-black/90 text-white rounded-2xl h-14 font-black text-[11px] uppercase tracking-widest shadow-xl shadow-black/10">Start Free</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
