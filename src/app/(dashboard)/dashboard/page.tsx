"use client";

export const dynamic = "force-dynamic";

import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState, useCallback, Suspense } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, MessageSquare, Zap, CheckCircle, XCircle, RefreshCw } from "lucide-react";
import { api } from "@/lib/api";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const ERROR_MESSAGES: Record<string, string> = {
  no_pages: "No Facebook Pages found. Please create a Facebook Page and link your Instagram to it.",
  no_instagram_account: "No Instagram Professional account linked to your Facebook Page. Please switch to a Business or Creator account in the Instagram app.",
  no_user: "Session expired. Please log in again.",
  session_expired: "Session expired. Please log in again.",
  oauth_denied: "Instagram connection was cancelled.",
  callback_failed: "Instagram connection failed. Please try again.",
  no_code: "OAuth failed. Please try again.",
  invalid_state: "Security check failed. Please try connecting again.",
};

type ChartPoint = { name: string; replies: number; dms: number };

function DashboardContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [stats, setStats] = useState({ totalReplies: 0, activeRules: 0, igAccounts: 0 });
  const [activity, setActivity] = useState<any[]>([]);
  const [chartData, setChartData] = useState<ChartPoint[]>([]);
  const [accounts, setAccounts] = useState<any[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const showToast = (type: 'success' | 'error', message: string, duration = 5000) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), duration);
  };

  const getAuthHeader = useCallback(() => ({
    Authorization: `Bearer ${(session as any)?.accessToken}`,
  }), [session]);

  const fetchAll = useCallback(async () => {
    if (!(session as any)?.accessToken) return;
    setIsLoadingData(true);
    try {
      const [statsRes, activityRes, chartRes, accountsRes] = await Promise.allSettled([
        api.get('/analytics/overview', { headers: getAuthHeader() }),
        api.get('/analytics/activity', { headers: getAuthHeader() }),
        api.get('/analytics/chart?days=7', { headers: getAuthHeader() }),
        api.get('/instagram/accounts', { headers: getAuthHeader() }),
      ]);

      if (statsRes.status === 'fulfilled') setStats(statsRes.value.data);
      if (activityRes.status === 'fulfilled') setActivity(activityRes.value.data);
      if (chartRes.status === 'fulfilled') setChartData(chartRes.value.data);
      if (accountsRes.status === 'fulfilled') setAccounts(accountsRes.value.data);
    } catch (err) {
      console.error('[Dashboard] fetchAll error:', err);
    } finally {
      setIsLoadingData(false);
    }
  }, [session, getAuthHeader]);

  useEffect(() => {
    setIsMounted(true);

    const connection = searchParams?.get('connection');
    const error = searchParams?.get('error');
    const username = searchParams?.get('username');

    if (connection === 'success' && username) {
      showToast('success', `✅ Instagram @${username} connected successfully!`, 6000);
    } else if (error) {
      showToast('error', ERROR_MESSAGES[error] || 'Instagram connection failed.', 8000);
    }

    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated') {
      fetchAll();
    }
  }, [status, router, searchParams, fetchAll]);

  const handleConnect = () => {
    const email = (session?.user as any)?.email || '';
    const loginUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/instagram/login?state=${encodeURIComponent(email)}`;
    window.location.href = loginUrl;
  };

  const handleDisconnect = async (id: string) => {
    if (!confirm('⚠️ Are you sure? This will delete all rules and logs for this account.')) return;
    try {
      await api.delete(`/instagram/accounts/${id}`, { headers: getAuthHeader() });
      showToast('success', '✅ Account disconnected successfully.');
      fetchAll();
    } catch (error: any) {
      const errMsg = error.response?.data?.details || error.response?.data?.error || 'Failed to disconnect account.';
      showToast('error', `❌ ${errMsg}`, 8000);
    }
  };

  // ── Loading State ────────────────────────────────────────────────────────────
  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-medium text-slate-500">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50/50">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl shadow-xl text-sm font-semibold transition-all animate-in fade-in slide-in-from-top-2 ${
          toast.type === 'success' ? 'bg-emerald-50 border border-emerald-200 text-emerald-700' : 'bg-rose-50 border border-rose-200 text-rose-700'
        }`}>
          {toast.type === 'success' ? <CheckCircle className="w-4 h-4 shrink-0" /> : <XCircle className="w-4 h-4 shrink-0" />}
          {toast.message}
        </div>
      )}

      {/* Sidebar */}
      <aside className="w-64 border-r bg-white p-6 space-y-8 hidden md:block">
        <nav className="space-y-1">
          <NavItem icon={BarChart3} label="Dashboard" active />
          <NavItem icon={Zap} label="Automation Rules" href="/dashboard/rules" />
          <NavItem icon={MessageSquare} label="Templates" href="/dashboard/templates" />
        </nav>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-50 flex items-center justify-around p-3 pb-6">
        <Link href="/dashboard" className="flex flex-col items-center gap-1 text-primary">
          <BarChart3 className="w-5 h-5" />
          <span className="text-[10px] font-bold uppercase">Home</span>
        </Link>
        <Link href="/dashboard/rules" className="flex flex-col items-center gap-1 text-slate-400">
          <Zap className="w-5 h-5" />
          <span className="text-[10px] font-bold uppercase">Rules</span>
        </Link>
        <Link href="/dashboard/templates" className="flex flex-col items-center gap-1 text-slate-400">
          <MessageSquare className="w-5 h-5" />
          <span className="text-[10px] font-bold uppercase">Templates</span>
        </Link>
      </nav>

      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {session?.user?.name || 'User'}</h1>
            <p className="text-muted-foreground">Here's what's happening with your automations today.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" size="sm" onClick={fetchAll} disabled={isLoadingData}>
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoadingData ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary/5"
              onClick={handleConnect}
            >
              Connect Instagram
            </Button>
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard title="Total Replies Sent" value={stats.totalReplies} icon={MessageSquare} color="text-blue-600" loading={isLoadingData} />
          <StatCard title="Active Rules" value={stats.activeRules} icon={Zap} color="text-purple-600" loading={isLoadingData} />
          <StatCard title="Connected IG" value={stats.igAccounts} icon={BarChart3} color="text-emerald-600" loading={isLoadingData} />
        </div>

        {/* Analytics Chart — Real Data */}
        <section className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold">Performance Overview</h2>
              <p className="text-sm text-muted-foreground">Automation activity over the last 7 days.</p>
            </div>
          </div>

          <Card className="border-slate-200 shadow-sm pt-6 overflow-hidden bg-white">
            <CardContent>
              <div className="h-[350px] w-full min-h-[350px]">
                {isMounted && (
                  chartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={350} minWidth={0} minHeight={0}>
                      <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorReplies" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="colorDms" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                        <Tooltip
                          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 'bold' }}
                        />
                        <Area type="monotone" dataKey="replies" name="Comments Replied" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorReplies)" />
                        <Area type="monotone" dataKey="dms" name="DMs Sent" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorDms)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-3">
                      <BarChart3 className="w-10 h-10 opacity-30" />
                      <p className="text-sm font-medium">No automation activity yet this week.</p>
                      <p className="text-xs">Create your first rule to start seeing data here.</p>
                    </div>
                  )
                )}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Connected Accounts */}
        <section className="mb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Connected Instagram Accounts</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {accounts.length === 0 ? (
              <div className="col-span-full p-8 text-center border-dashed border-2 rounded-2xl text-muted-foreground">
                No accounts connected. Click "Connect Instagram" above.
              </div>
            ) : (
              accounts.map((acc: any) => (
                <div key={acc.id} className="p-4 bg-white border border-slate-200 rounded-2xl flex items-center justify-between shadow-sm group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {acc.username?.[0]?.toUpperCase() || '?'}
                    </div>
                    <div>
                      <p className="font-bold">@{acc.username}</p>
                      <p className="text-xs text-emerald-500 flex items-center gap-1">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                        Active
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-muted-foreground hover:text-destructive hover:bg-rose-50 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleDisconnect(acc.id)}
                  >
                    Disconnect
                  </Button>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Recent Activity */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Recent Activity</h2>
          </div>

          <Card className="border-slate-200">
            <CardContent className="p-0">
              {activity.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  No activity yet. Create your first rule to get started!
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {activity.map((log: any) => (
                    <div key={log.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${log.status === 'SUCCESS' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                          <MessageSquare className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{log.rule?.name || 'Unknown Rule'}</p>
                          <p className="text-xs text-muted-foreground">{log.actionTaken}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${log.status === 'SUCCESS' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                          {log.status}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(log.triggeredAt).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <RefreshCw className="w-8 h-8 animate-spin text-slate-400" />
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}

function NavItem({ icon: Icon, label, active, href }: any) {
  return (
    <Link href={href || '#'} className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${active ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-slate-100 hover:text-foreground'}`}>
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  );
}

function StatCard({ title, value, icon: Icon, color, loading }: any) {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${color}`} />
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-8 w-16 bg-slate-200 rounded animate-pulse" />
        ) : (
          <div className="text-2xl font-bold">{value.toLocaleString()}</div>
        )}
      </CardContent>
    </Card>
  );
}
