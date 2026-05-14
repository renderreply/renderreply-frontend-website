"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2, Edit2, Zap, MessageSquare, Settings, BarChart3 } from "lucide-react";
import { api } from "@/lib/api";
import { RuleBuilder } from "@/components/RuleBuilder";

export default function RulesPage() {
  const { data: session } = useSession();
  const [rules, setRules] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [builderOpen, setBuilderOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<any>(null);

  useEffect(() => {
    if (session) {
      fetchRules();
      fetchAccounts();
    }
  }, [session]);

  const fetchAccounts = async () => {
    try {
      const res = await api.get(`/instagram/accounts`, {
        headers: { Authorization: `Bearer ${(session as any)?.accessToken}` },
      });
      console.log("[RulesPage] Accounts fetched successfully:", res.data);
      setAccounts(res.data);
    } catch (error: any) {
      console.error("[RulesPage] Failed to fetch accounts:", error.response?.data || error.message);
    }
  };

  const fetchRules = async () => {
    try {
      const res = await api.get(`/rules`, {
        headers: { Authorization: `Bearer ${(session as any)?.accessToken}` },
      });
      console.log("[RulesPage] Rules fetched successfully:", res.data);
      setRules(res.data);
    } catch (error: any) {
      console.error("[RulesPage] Failed to fetch rules:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleRule = async (id: string, currentStatus: boolean) => {
    try {
      await api.patch(`/rules/${id}/toggle`, 
        { isActive: !currentStatus },
        { headers: { Authorization: `Bearer ${(session as any)?.accessToken}` } }
      );
      fetchRules();
    } catch (error) {
      alert("Failed to toggle rule");
    }
  };
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this rule?")) return;
    try {
      await api.delete(`/rules/${id}`, {
        headers: { Authorization: `Bearer ${(session as any)?.accessToken}` }
      });
      fetchRules();
    } catch (error) {
      alert("Failed to delete rule");
    }
  };

  const handleEdit = (rule: any) => {
    setEditingRule(rule);
    setBuilderOpen(true);
  };

  const handleCreate = () => {
    setEditingRule(null);
    setBuilderOpen(true);
  };
  const handleConnect = () => {
    window.location.href = "https://api.cloraai.com/auth/instagram/login";
  };

  return (
    <div className="flex min-h-screen bg-slate-50/50">
      <aside className="w-64 border-r bg-white p-6 space-y-8 hidden md:block">
        <nav className="space-y-1">
          <NavItem icon={BarChart3} label="Dashboard" href="/dashboard" />
          <NavItem icon={Zap} label="Automation Rules" active />
          <NavItem icon={MessageSquare} label="Templates" href="/dashboard/templates" />
        </nav>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-50 flex items-center justify-around p-3 pb-6">
        <Link href="/dashboard" className="flex flex-col items-center gap-1 text-slate-400">
          <BarChart3 className="w-5 h-5" />
          <span className="text-[10px] font-bold uppercase">Home</span>
        </Link>
        <Link href="/dashboard/rules" className="flex flex-col items-center gap-1 text-primary">
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
            <h1 className="text-3xl font-bold">Automation Rules</h1>
            <p className="text-muted-foreground">Manage your if/then logic for Instagram.</p>
          </div>
          <div className="flex gap-4">
            <Button className="bg-primary text-white" onClick={handleCreate}>
              <Plus className="mr-2 h-4 w-4" /> Create New Rule
            </Button>
          </div>
        </header>

        <RuleBuilder 
          open={builderOpen} 
          onOpenChange={(open: boolean) => {
            setBuilderOpen(open);
            if (!open) setEditingRule(null);
          }} 
          onSuccess={fetchRules} 
          accounts={accounts}
          editingRule={editingRule}
          existingRules={rules}
        />

        <div className="space-y-4">
          {rules.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="p-12 text-center text-muted-foreground">
                No rules found. Click "Create New Rule" to start automating.
              </CardContent>
            </Card>
          ) : (
            rules.map((rule: any) => (
              <Card key={rule.id} className="border-slate-200 hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${rule.isActive ? "bg-primary/10 text-primary" : "bg-slate-100 text-slate-400"}`}>
                      <Zap className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{rule.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Trigger: {rule.triggerType} | Action: {rule.actionType}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{rule.isActive ? "Active" : "Paused"}</span>
                      <Switch 
                        checked={rule.isActive} 
                        onCheckedChange={() => toggleRule(rule.id, rule.isActive)}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(rule)}><Edit2 className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(rule.id)}><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon: Icon, label, active, href }: any) {
  return (
    <Link href={href || "#"} className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-slate-100 hover:text-foreground"}`}>
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  );
}
