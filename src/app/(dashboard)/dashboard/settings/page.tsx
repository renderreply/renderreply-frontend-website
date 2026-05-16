"use client";

import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { User, Mail, Shield, Bell, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";

export default function SettingsPage() {
  const { data: session, update } = useSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setEmail(session.user.email || "");
    }
  }, [session]);

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      const res = await api.patch('/auth/profile', { name, email }, {
        headers: { Authorization: `Bearer ${(session as any)?.accessToken}` }
      });
      await update({ ...session, user: { ...session?.user, name, email } });
      showToast('success', 'Profile updated successfully!');
    } catch (err: any) {
      showToast('error', err.response?.data?.error || 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdatePassword = () => {
    const currentPassword = prompt("Enter current password:");
    if (!currentPassword) return;
    const newPassword = prompt("Enter new password (min 8 chars):");
    if (!newPassword || newPassword.length < 8) {
      alert("Invalid new password");
      return;
    }

    api.patch('/auth/password', { currentPassword, newPassword }, {
      headers: { Authorization: `Bearer ${(session as any)?.accessToken}` }
    }).then(() => {
      showToast('success', 'Password updated successfully!');
    }).catch(err => {
      showToast('error', err.response?.data?.error || 'Failed to update password');
    });
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-6">
      {toast && (
        <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl shadow-xl text-sm font-semibold transition-all animate-in fade-in slide-in-from-top-2 ${
          toast.type === 'success' ? 'bg-emerald-50 border border-emerald-200 text-emerald-700' : 'bg-rose-50 border border-rose-200 text-rose-700'
        }`}>
          {toast.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
          {toast.message}
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-black text-black">Account Settings</h1>
          <p className="text-muted-foreground mt-2">Manage your personal information and preferences.</p>
        </header>

        <div className="space-y-8">
          <Card className="border-none shadow-2xl shadow-black/5 rounded-[40px] bg-white overflow-hidden">
            <CardHeader className="border-b border-slate-50 p-8">
              <CardTitle className="text-xl font-bold flex items-center gap-3 text-black">
                <div className="p-2 bg-slate-100 rounded-xl">
                  <User className="w-5 h-5" />
                </div>
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-10 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <label className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Full Name</label>
                  <div className="relative">
                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-4 pl-12 bg-slate-50 rounded-2xl font-bold border border-slate-100 text-black focus:outline-none focus:ring-2 focus:ring-black transition-all"
                      placeholder="Your Name"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Email Address</label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-4 pl-12 bg-slate-50 rounded-2xl font-bold border border-slate-100 text-black focus:outline-none focus:ring-2 focus:ring-black transition-all"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>
              </div>
              <div className="pt-4">
                <Button 
                  onClick={handleSaveProfile}
                  disabled={isSaving}
                  className="bg-black hover:bg-black/90 text-white px-10 h-14 rounded-2xl font-black text-sm shadow-xl shadow-black/10 transition-transform active:scale-95"
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-2xl shadow-black/5 rounded-[40px] bg-white overflow-hidden">
            <CardHeader className="border-b border-slate-50 p-8">
              <CardTitle className="text-xl font-bold flex items-center gap-3 text-black">
                <div className="p-2 bg-slate-100 rounded-xl">
                  <Shield className="w-5 h-5" />
                </div>
                Security & Legal
              </CardTitle>
            </CardHeader>
            <CardContent className="p-10 space-y-10">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-lg text-black">Password</p>
                  <p className="text-sm text-muted-foreground">Change your account password to stay secure.</p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={handleUpdatePassword}
                  className="rounded-2xl font-bold border-slate-200 h-12 px-6"
                >
                  Update Password
                </Button>
              </div>
              
              <div className="pt-6 border-t border-slate-50">
                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 mb-6">Platform Policies</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link href="/privacy">
                    <Button variant="ghost" className="w-full rounded-2xl font-bold py-7 bg-slate-50 hover:bg-slate-100">Privacy Policy</Button>
                  </Link>
                  <Link href="/terms">
                    <Button variant="ghost" className="w-full rounded-2xl font-bold py-7 bg-slate-50 hover:bg-slate-100">Terms of Service</Button>
                  </Link>
                  <Link href="/refund">
                    <Button variant="ghost" className="w-full rounded-2xl font-bold py-7 bg-slate-50 hover:bg-slate-100">Refund Policy</Button>
                  </Link>
                  <Link href="/deletion">
                    <Button variant="ghost" className="w-full rounded-2xl font-bold py-7 bg-slate-50 hover:bg-slate-100 text-rose-600 hover:text-rose-700">Data Deletion</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-2xl shadow-black/5 rounded-[40px] bg-white overflow-hidden">
            <CardHeader className="border-b border-slate-50 p-8">
              <CardTitle className="text-xl font-bold flex items-center gap-3 text-black">
                <div className="p-2 bg-slate-100 rounded-xl">
                  <Bell className="w-5 h-5" />
                </div>
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="p-10">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-lg text-black">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Get daily summaries of your automation activity.</p>
                </div>
                <div className="w-14 h-7 bg-black rounded-full relative cursor-pointer shadow-inner transition-colors">
                   <div className="absolute right-1 top-1 w-5 h-5 bg-white rounded-full shadow-md" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
