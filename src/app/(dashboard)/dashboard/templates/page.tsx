"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, MessageSquare, Trash2, Edit2, Zap, BarChart3 } from "lucide-react";
import Link from "next/link";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function TemplatesPage() {
  const [templates, setTemplates] = useState([
    { id: 1, name: "Greeting Template", content: "Hi! Thanks for reaching out. We'll get back to you soon!", type: "DM" },
    { id: 2, name: "Product Info", content: "Check out our latest collection at cloraai.com/shop", type: "COMMENT" },
    { id: 3, name: "Support FAQ", content: "You can find all support docs at help.cloraai.com", type: "BOTH" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<any>(null);
  
  const [formData, setFormData] = useState({ name: "", content: "", type: "DM" });

  const handleOpenModal = (template: any = null) => {
    if (template) {
      setEditingTemplate(template);
      setFormData({ name: template.name, content: template.content, type: template.type });
    } else {
      setEditingTemplate(null);
      setFormData({ name: "", content: "", type: "DM" });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTemplate(null);
  };

  const handleSave = () => {
    if (!formData.name || !formData.content) return;
    
    if (editingTemplate) {
      setTemplates(templates.map(t => t.id === editingTemplate.id ? { ...t, ...formData } : t));
    } else {
      setTemplates([...templates, { id: Date.now(), ...formData }]);
    }
    handleCloseModal();
  };

  const handleDelete = (id: number) => {
    setTemplates(templates.filter(t => t.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-slate-50/50">
      <aside className="w-64 border-r bg-white p-6 space-y-8 hidden md:block">
        <nav className="space-y-1">
          <NavItem icon={BarChart3} label="Dashboard" href="/dashboard" />
          <NavItem icon={Zap} label="Automation Rules" href="/dashboard/rules" />
          <NavItem icon={MessageSquare} label="Templates" active />
        </nav>
      </aside>

      <main className="flex-1 p-4 md:p-8">
        {/* Mobile Sub-Nav */}
        <nav className="md:hidden flex items-center gap-2 mb-6 overflow-x-auto pb-2 no-scrollbar px-1">
          <Link href="/dashboard" className="px-5 py-2.5 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-500 whitespace-nowrap shadow-sm">
            Dashboard
          </Link>
          <Link href="/dashboard/rules" className="px-5 py-2.5 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-500 whitespace-nowrap shadow-sm">
            Rules
          </Link>
          <Link href="/dashboard/templates" className="px-5 py-2.5 bg-black border border-black rounded-full text-xs font-bold text-white whitespace-nowrap shadow-md">
            Templates
          </Link>
        </nav>

        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h1 className="text-2xl md:text-3xl font-[1000] tracking-tight leading-tight">Reply Templates</h1>
            <p className="text-xs md:text-sm font-medium text-slate-500 mt-1">Save time with pre-written responses.</p>
          </div>
          <Button className="bg-primary text-white" onClick={() => handleOpenModal()}>
            <Plus className="mr-2 h-4 w-4" /> Create Template
          </Button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((t) => (
            <Card key={t.id} className="border-slate-200 hover:shadow-lg transition-shadow bg-white rounded-3xl overflow-hidden">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-primary/10 rounded-xl text-primary">
                    <MessageSquare size={20} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-slate-100 px-2 py-1 rounded-md text-slate-500">
                    {t.type}
                  </span>
                </div>
                <h3 className="font-bold text-lg mb-2">{t.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-6 italic">
                  "{t.content}"
                </p>
                <div className="flex items-center gap-2 pt-4 border-t border-border/50">
                  <Button variant="ghost" size="sm" className="flex-1 rounded-xl" onClick={() => handleOpenModal(t)}>
                    <Edit2 size={14} className="mr-2" /> Edit
                  </Button>
                  <Button variant="ghost" size="sm" className="text-destructive rounded-xl hover:bg-rose-50" onClick={() => handleDelete(t.id)}>
                    <Trash2 size={14} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {templates.length === 0 && (
             <div className="col-span-full py-20 text-center text-slate-500">
                <MessageSquare className="mx-auto h-12 w-12 opacity-20 mb-4" />
                <p>No templates found. Create one to get started!</p>
             </div>
          )}
        </div>
      </main>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md rounded-[32px] p-6 border-slate-100 shadow-2xl bg-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{editingTemplate ? "Edit Template" : "Create New Template"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-slate-500">Template Name</Label>
              <Input 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="e.g. Price Inquiry"
                className="h-12 rounded-xl bg-slate-50 border-slate-200"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-slate-500">Template Type</Label>
              <select 
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                className="flex h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="DM">Direct Message (DM)</option>
                <option value="COMMENT">Comment Reply</option>
                <option value="BOTH">Both</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-slate-500">Message Content</Label>
              <textarea 
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                placeholder="Type your message here..."
                className="flex min-h-[120px] w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-end gap-2 pt-4">
            <Button type="button" variant="ghost" onClick={handleCloseModal} className="rounded-xl h-12 px-6">
              Cancel
            </Button>
            <Button type="button" onClick={handleSave} className="bg-primary hover:bg-primary/90 text-white rounded-xl h-12 px-8 font-bold">
              {editingTemplate ? "Save Changes" : "Create Template"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function NavItem({ icon: Icon, label, active, href }: any) {
  return (
    <Link href={href || "#"} className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${active ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}`}>
      <Icon className="h-5 w-5" />
      {label}
    </Link>
  );
}
