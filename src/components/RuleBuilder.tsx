"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSession } from "next-auth/react";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/lib/api";

const ruleSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  igAccountId: z.string().min(1, "Please select an Instagram account"),
  targetPostType: z.enum(["ANY_POST", "SPECIFIC_POST", "REEL"]),
  keywordType: z.enum(["ANY_WORD", "SPECIFIC_KEYWORD"]),
  keywords: z.string().optional(),
  publicMessage: z.string().min(1, "Public reply is required").max(1000, "Maximum 1000 characters"),
  privateMessage: z.string().optional(),
  enableProductLink: z.boolean(),
  productName: z.string().optional(),
  productDescription: z.string().optional(),
  productLink: z.string().optional(),
  enableFollowSuggestion: z.boolean(),
  followMessage: z.string().optional(),
  editFollowButtons: z.boolean(),
  followButtonText: z.string().optional(),
}).refine((data) => {
  if (data.keywordType === "SPECIFIC_KEYWORD" && (!data.keywords || data.keywords.trim().length === 0)) {
    return false;
  }
  return true;
}, {
  message: "Keywords are required",
  path: ["keywords"]
}).refine((data) => {
  if (data.enableProductLink && (!data.productName || !data.productLink)) {
    return false;
  }
  return true;
}, {
  message: "Product Name and URL are required",
  path: ["productLink"]
});

type RuleFormValues = z.infer<typeof ruleSchema>;

function CustomSwitch({ checked, onChange }: { checked: boolean, onChange: (c: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 ${checked ? 'bg-black' : 'bg-slate-200'}`}
    >
      <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  );
}

export function RuleBuilder({ open, onOpenChange, onSuccess, accounts, editingRule, existingRules }: any) {
  const { data: session } = useSession();
  const [selectedPostId, setSelectedPostId] = useState("");
  const [loading, setLoading] = useState(false);
  const [mediaItems, setMediaItems] = useState<any[]>([]);
  const [loadingMedia, setLoadingMedia] = useState(false);

  const form = useForm<RuleFormValues>({
    resolver: zodResolver(ruleSchema),
    defaultValues: {
      name: "",
      igAccountId: accounts?.[0]?.id || "",
      targetPostType: "ANY_POST",
      keywordType: "ANY_WORD",
      keywords: "",
      publicMessage: "",
      privateMessage: "",
      enableProductLink: false,
      productName: "",
      productDescription: "",
      productLink: "",
      enableFollowSuggestion: false,
      followMessage: "Follow for more content like this! ✨",
      editFollowButtons: false,
      followButtonText: "Tap to Follow",
    }
  });

  const { register, control, handleSubmit, watch, setValue, formState: { errors } } = form;

  const w_targetPostType = watch("targetPostType");
  const w_keywordType = watch("keywordType");
  const w_igAccountId = watch("igAccountId");
  const w_enableProductLink = watch("enableProductLink");
  const w_enableFollowSuggestion = watch("enableFollowSuggestion");
  const w_editFollowButtons = watch("editFollowButtons");
  
  // Preview watchers
  const p_keywords = watch("keywords");
  const p_public = watch("publicMessage");
  const p_private = watch("privateMessage");
  const p_followMsg = watch("followMessage");
  const p_followBtn = watch("followButtonText");
  const p_pName = watch("productName");
  const p_pDesc = watch("productDescription");

  useEffect(() => {
    if (editingRule) {
      console.log("[RuleBuilder] Pre-filling form with editingRule:", editingRule);
      setValue("name", editingRule.name);
      setValue("igAccountId", editingRule.igAccountId);
      setValue("targetPostType", editingRule.targetPostType as any);
      setValue("keywordType", editingRule.keywordType as any);
      
      const conditions = editingRule.triggerConditions as any;
      if (conditions?.keywords) {
        setValue("keywords", conditions.keywords.join(", "));
      }
      if (conditions?.targetMediaId) {
        setSelectedPostId(conditions.targetMediaId);
      }

      setValue("publicMessage", editingRule.publicMessage || "");
      setValue("privateMessage", editingRule.privateMessage || "");
      setValue("enableProductLink", !!editingRule.enableProductLink);
      
      if (editingRule.productData) {
        const p = editingRule.productData as any;
        setValue("productName", p.productName || "");
        setValue("productDescription", p.productDescription || "");
        setValue("productLink", p.productLink || "");
      }

      setValue("enableFollowSuggestion", !!editingRule.enableFollowSuggestion);
      if (editingRule.followData) {
        const f = editingRule.followData as any;
        setValue("followMessage", f.followMessage || "");
        setValue("editFollowButtons", !!f.editFollowButtons);
        setValue("followButtonText", f.followButtonText || "");
      }
    } else {
      form.reset();
      setSelectedPostId("");
    }
  }, [editingRule, open, setValue]);

  // Check for duplicate rules
  const isDuplicate = existingRules?.some((r: any) => {
    if (editingRule && r.id === editingRule.id) return false;
    const conditions = r.triggerConditions as any;
    return (w_targetPostType === "SPECIFIC_POST" || w_targetPostType === "REEL") && 
           conditions?.targetMediaId === selectedPostId && 
           r.igAccountId === w_igAccountId;
  });

  useEffect(() => {
    if ((w_targetPostType === "SPECIFIC_POST" || w_targetPostType === "REEL") && w_igAccountId) {
      setLoadingMedia(true);
      const url = `/instagram/accounts/${w_igAccountId}/media`;
      console.log(`[RuleBuilder] Fetching media from: ${url}`);
      api.get(url, {
        headers: { Authorization: `Bearer ${(session as any)?.accessToken}` }
      })
      .then(res => {
        console.log(`[RuleBuilder] Received media:`, res.data);
        // Handle cases where response might be wrapped in { data: [] }
        const data = Array.isArray(res.data) ? res.data : (res.data?.data || []);
        let filtered = data;
        
        if (w_targetPostType === "REEL") {
          // Be permissive: include VIDEO and any type that isn't IMAGE
          filtered = data.filter((m: any) => m.media_type === "VIDEO" || m.media_type === "REEL");
        }
        setMediaItems(filtered);
      })
      .catch(err => {
        console.error(`[RuleBuilder] Failed to fetch media from ${url}:`, err.response?.data || err.message);
      })
      .finally(() => setLoadingMedia(false));
    }
  }, [w_targetPostType, w_igAccountId, session]);

  const applyTemplate = (type: string) => {
    if (type === "giveaway") {
      setValue("name", "Giveaway Contest 🎁");
      setValue("targetPostType", "SPECIFIC_POST");
      setValue("keywordType", "SPECIFIC_KEYWORD");
      setValue("keywords", "win, enter, giveaway");
      setValue("publicMessage", "You're entered! Check your DMs for a bonus entry link! 🚀");
      setValue("privateMessage", "Hey there! Thanks for entering the giveaway. Here is your bonus link to double your chances: \\n\\nGood luck! 🍀");
      setValue("enableProductLink", false);
      setValue("enableFollowSuggestion", true);
      setValue("followMessage", "Love to have you in our community! Make sure to follow for more giveaways! 🎁");
      setValue("editFollowButtons", true);
      setValue("followButtonText", "Follow to Win");
    } else if (type === "sale") {
      setValue("name", "Product Sale Auto-DM 🛍️");
      setValue("targetPostType", "ANY_POST");
      setValue("keywordType", "SPECIFIC_KEYWORD");
      setValue("keywords", "price, link, buy, shop");
      setValue("publicMessage", "Just sent you a DM with the product details and a discount code! 🛍️");
      setValue("privateMessage", "Hey! As requested, here is the link to shop our latest collection. Use code SAVE20 for 20% off! 👇");
      setValue("enableProductLink", true);
      setValue("productName", "RenderReply Pro Plan");
      setValue("productDescription", "Automate your Instagram growth.");
      setValue("productLink", "https://renderreply.com");
      setValue("enableFollowSuggestion", false);
    } else if (type === "lead") {
      setValue("name", "Lead Magnet Delivery 📚");
      setValue("targetPostType", "REEL");
      setValue("keywordType", "SPECIFIC_KEYWORD");
      setValue("keywords", "guide, ebook, freebie, send");
      setValue("publicMessage", "Check your DMs! I just sent over the free guide. 📚");
      setValue("privateMessage", "Hey! Here is the free guide you requested. Let me know if you have any questions after reading it! 👇");
      setValue("enableProductLink", true);
      setValue("productName", "Free Instagram Growth Guide");
      setValue("productDescription", "10 pages of actionable tips.");
      setValue("productLink", "https://renderreply.com/guide");
      setValue("enableFollowSuggestion", true);
      setValue("followMessage", "Follow me for daily tips like this! ✨");
      setValue("editFollowButtons", false);
    }
  };

  const onSubmit = async (data: RuleFormValues) => {
    setLoading(true);
    const payload = {
        name: data.name,
        igAccountId: data.igAccountId,
        targetPostType: data.targetPostType,
        triggerType: "COMMENT", 
        keywordType: data.keywordType,
        triggerConditions: { 
          keywords: data.keywordType === "SPECIFIC_KEYWORD" && data.keywords ? data.keywords.split(",").map(k => k.trim()) : [],
          targetMediaId: (data.targetPostType === "SPECIFIC_POST" || data.targetPostType === "REEL") ? selectedPostId : null
        },
        actionType: "BOTH", 
        publicMessage: data.publicMessage,
        privateMessage: data.privateMessage,
        enableProductLink: data.enableProductLink,
        productData: data.enableProductLink ? { 
          productName: data.productName, 
          productDescription: data.productDescription, 
          productLink: data.productLink 
        } : null,
        enableFollowSuggestion: data.enableFollowSuggestion,
        followData: data.enableFollowSuggestion ? { 
          followMessage: data.followMessage, 
          editFollowButtons: data.editFollowButtons, 
          followButtonText: data.followButtonText 
        } : null
      };

    try {
      if (editingRule) {
        await api.patch(`/rules/${editingRule.id}`, payload, {
          headers: { Authorization: `Bearer ${(session as any)?.accessToken}` }
        });
      } else {
        await api.post(`/rules`, payload, {
          headers: { Authorization: `Bearer ${(session as any)?.accessToken}` }
        });
      }
      onSuccess();
      onOpenChange(false);
    } catch (error: any) {
      if (error.response?.data?.error === 'UPGRADE_REQUIRED') {
        alert("Free plan limit reached! Please upgrade to Pro.");
      } else {
        alert(editingRule ? "Failed to update rule" : "Failed to create rule");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[1000px] p-0 overflow-hidden bg-slate-50 border-0 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] rounded-[32px] flex flex-col max-h-[90vh]">
        <div className="flex flex-1 overflow-hidden">
          
          <div className="w-full md:w-[60%] flex flex-col bg-white overflow-y-auto">
            <div className="p-8 md:p-10 flex-1">
              <DialogHeader className="mb-8 space-y-2">
                <DialogTitle className="text-3xl font-[1000] tracking-tight text-slate-900">
                  {editingRule ? "Edit Automation" : "Create Automation"}
                </DialogTitle>
                <p className="text-sm font-medium text-slate-500">Configure your powerful new Instagram trigger and response flow.</p>
              </DialogHeader>
              
              <div className="space-y-10">
                
                <div className="space-y-3">
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-900 border-b border-slate-100 pb-2">Quick Templates</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <Button variant="outline" onClick={() => applyTemplate('giveaway')} className="h-auto py-3 px-4 flex flex-col items-start gap-1 justify-start border-slate-200 hover:border-black hover:bg-slate-50 transition-all text-left">
                      <span className="font-bold text-sm">🎁 Giveaway</span>
                      <span className="text-[10px] text-slate-500 whitespace-normal">Require follow to win</span>
                    </Button>
                    <Button variant="outline" onClick={() => applyTemplate('sale')} className="h-auto py-3 px-4 flex flex-col items-start gap-1 justify-start border-slate-200 hover:border-black hover:bg-slate-50 transition-all text-left">
                      <span className="font-bold text-sm">🛍️ Product Sale</span>
                      <span className="text-[10px] text-slate-500 whitespace-normal">Send a product link</span>
                    </Button>
                    <Button variant="outline" onClick={() => applyTemplate('lead')} className="h-auto py-3 px-4 flex flex-col items-start gap-1 justify-start border-slate-200 hover:border-black hover:bg-slate-50 transition-all text-left">
                      <span className="font-bold text-sm">📚 Lead Magnet</span>
                      <span className="text-[10px] text-slate-500 whitespace-normal">Send free guide via Reel</span>
                    </Button>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-900 border-b border-slate-100 pb-2">1. General Setup</h3>
                  <div className="grid gap-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">Rule Name</label>
                    <Input 
                      placeholder="e.g. Summer Sale Auto-DM" 
                      {...register("name")}
                      className={`h-12 rounded-xl bg-slate-50 border-slate-100 text-sm px-4 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-black shadow-none transition-all ${errors.name ? 'border-red-500' : ''}`}
                    />
                    {errors.name && <span className="text-xs text-red-500 font-bold">{errors.name.message}</span>}
                  </div>
                  <div className="grid gap-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">Instagram Account</label>
                    <Controller
                      control={control}
                      name="igAccountId"
                      render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className={`h-12 rounded-xl bg-slate-50 border-slate-100 text-sm px-4 focus:bg-white focus:ring-2 focus:ring-black shadow-none transition-all ${errors.igAccountId ? 'border-red-500' : ''}`}>
                            <SelectValue placeholder="Select Account" />
                          </SelectTrigger>
                          <SelectContent className="bg-white rounded-2xl border-slate-100 shadow-xl z-[100]">
                            {accounts.map((acc: any) => (
                              <SelectItem key={acc.id} value={acc.id} className="rounded-lg cursor-pointer">@{acc.username}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.igAccountId && <span className="text-xs text-red-500 font-bold">{errors.igAccountId.message}</span>}
                  </div>
                </div>

            <div className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-900 border-b border-slate-100 pb-2">2. Target & Trigger</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">Target Post / Video</label>
                  <Controller
                    control={control}
                    name="targetPostType"
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-slate-100 text-sm px-4 focus:bg-white focus:ring-2 focus:ring-black shadow-none transition-all">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white rounded-2xl border-slate-100 shadow-xl z-[100]">
                          <SelectItem value="ANY_POST" className="rounded-lg cursor-pointer">Any Post or Video</SelectItem>
                          <SelectItem value="SPECIFIC_POST" className="rounded-lg cursor-pointer">Specific Post</SelectItem>
                          <SelectItem value="REEL" className="rounded-lg cursor-pointer">Specific Reel</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                
                <div className="grid gap-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">Trigger Type</label>
                  <Controller
                    control={control}
                    name="keywordType"
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-slate-100 text-sm px-4 focus:bg-white focus:ring-2 focus:ring-black shadow-none transition-all">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white rounded-2xl border-slate-100 shadow-xl z-[100]">
                          <SelectItem value="ANY_WORD" className="rounded-lg cursor-pointer">Any Word (All Comments)</SelectItem>
                          <SelectItem value="SPECIFIC_KEYWORD" className="rounded-lg cursor-pointer">Specific Keywords</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>

              {(w_targetPostType === "SPECIFIC_POST" || w_targetPostType === "REEL") && w_igAccountId && (
                <div className="space-y-3 animate-in slide-in-from-top-2 duration-300 fade-in">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">Select a {w_targetPostType === "REEL" ? "Reel" : "Post"}</label>
                    <span className="text-[10px] font-bold text-slate-400">{w_targetPostType === "REEL" ? "Reels" : "Recent Posts"}</span>
                  </div>
                  
                  <div className="flex gap-3 overflow-x-auto pb-4 custom-scrollbar snap-x">
                    {loadingMedia ? (
                      <div className="flex items-center justify-center w-full py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
                      </div>
                    ) : mediaItems.length === 0 ? (
                      <div className="flex items-center justify-center w-full py-8 text-slate-500 text-sm font-medium">
                        No posts found for this account.
                      </div>
                    ) : (
                      mediaItems.map((item) => (
                        <div 
                          key={item.id}
                          onClick={() => setSelectedPostId(item.id)}
                          className={`relative flex-shrink-0 w-28 h-40 rounded-xl overflow-hidden cursor-pointer transition-all snap-start border-2 ${selectedPostId === item.id ? 'border-black shadow-lg scale-[1.02]' : 'border-slate-100 hover:border-slate-300'}`}
                        >
                          <img 
                            src={item.thumbnail_url || item.media_url} 
                            alt={item.caption || "Instagram media"} 
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                             <p className="text-[9px] font-medium text-white line-clamp-2">{item.caption || 'No caption'}</p>
                          </div>
                          {item.media_type === 'VIDEO' && (
                            <div className="absolute top-2 left-2 bg-black/50 rounded-full p-1">
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                          )}
                          {selectedPostId === item.id && (
                            <div className="absolute top-2 right-2 w-5 h-5 bg-black rounded-full flex items-center justify-center shadow-md">
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                  {isDuplicate && (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-center gap-3 animate-in fade-in zoom-in-95">
                      <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                      </div>
                      <p className="text-xs font-bold text-amber-800">Warning: An automation rule already exists for this post.</p>
                    </div>
                  )}
                </div>
              )}

              {w_keywordType === "SPECIFIC_KEYWORD" && (
                <div className="grid gap-2 animate-in slide-in-from-top-2 duration-300 fade-in">
                  <label className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">Keywords (Comma Separated)</label>
                  <Input 
                    placeholder="price, info, link, dm me" 
                    {...register("keywords")}
                    className={`h-12 rounded-xl bg-slate-50 border-slate-100 text-sm px-4 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-black shadow-none transition-all ${errors.keywords ? 'border-red-500' : ''}`}
                  />
                  {errors.keywords && <span className="text-xs text-red-500 font-bold">{errors.keywords.message}</span>}
                </div>
              )}
            </div>

            <div className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-900 border-b border-slate-100 pb-2">3. Responses</h3>
              
              <div className="grid gap-2">
                <label className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">Public Reply (Comment)</label>
                <textarea 
                  {...register("publicMessage")}
                  className={`flex min-h-[80px] w-full rounded-xl border bg-slate-50 px-4 py-3 text-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-black transition-all resize-none shadow-none ${errors.publicMessage ? 'border-red-500' : 'border-slate-100'}`}
                  placeholder="e.g. Just sent you a DM with the details! 🚀"
                />
                {errors.publicMessage && <span className="text-xs text-red-500 font-bold">{errors.publicMessage.message}</span>}
              </div>

              <div className="grid gap-2">
                <label className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">Private DM (Direct Message)</label>
                <textarea 
                  {...register("privateMessage")}
                  className="flex min-h-[100px] w-full rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-black transition-all resize-none shadow-none"
                  placeholder="e.g. Hey! Thanks for reaching out. Here is the link you requested..."
                />
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-900 border-b border-slate-100 pb-2">4. Smart Modules</h3>
              
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Attach Product Link</h4>
                    <p className="text-[11px] text-slate-500 font-medium">Include an interactive product card in the DM.</p>
                  </div>
                  <Controller
                    control={control}
                    name="enableProductLink"
                    render={({ field }) => (
                      <CustomSwitch checked={field.value} onChange={field.onChange} />
                    )}
                  />
                </div>
                
                {w_enableProductLink && (
                  <div className="pt-4 border-t border-slate-200/50 space-y-4 animate-in fade-in zoom-in-95 duration-200">
                    <div className="grid gap-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">Product Name</label>
                      <Input placeholder="e.g. RenderReply Pro" {...register("productName")} className="h-10 rounded-lg bg-white border-slate-200 text-sm shadow-sm" />
                    </div>
                    <div className="grid gap-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">Product Description</label>
                      <Input placeholder="A brief description of your product" {...register("productDescription")} className="h-10 rounded-lg bg-white border-slate-200 text-sm shadow-sm" />
                    </div>
                    <div className="grid gap-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">Product URL</label>
                      <Input placeholder="https://..." {...register("productLink")} className={`h-10 rounded-lg bg-white border-slate-200 text-sm shadow-sm ${errors.productLink ? 'border-red-500' : ''}`} />
                      {errors.productLink && <span className="text-xs text-red-500 font-bold">{errors.productLink.message}</span>}
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Attach Follow Suggestion</h4>
                    <p className="text-[11px] text-slate-500 font-medium">Suggest users follow you in the DM (optional).</p>
                  </div>
                  <Controller
                    control={control}
                    name="enableFollowSuggestion"
                    render={({ field }) => (
                      <CustomSwitch checked={field.value} onChange={field.onChange} />
                    )}
                  />
                </div>
                
                {w_enableFollowSuggestion && (
                  <div className="pt-4 border-t border-slate-200/50 space-y-4 animate-in fade-in zoom-in-95 duration-200">
                    <div className="grid gap-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">Follow Pitch Message</label>
                      <textarea 
                        className="flex min-h-[60px] w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm resize-none focus-visible:ring-1 focus-visible:ring-black focus-visible:outline-none"
                        {...register("followMessage")}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs font-bold text-slate-700">Customize Buttons</span>
                      <Controller
                        control={control}
                        name="editFollowButtons"
                        render={({ field }) => (
                          <CustomSwitch checked={field.value} onChange={field.onChange} />
                        )}
                      />
                    </div>
                    
                    {w_editFollowButtons && (
                      <div className="grid gap-2 animate-in slide-in-from-top-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">Button Text</label>
                        <Input {...register("followButtonText")} className="h-10 rounded-lg bg-white border-slate-200 text-sm shadow-sm" />
                      </div>
                    )}
                  </div>
                )}
              </div>

              </div>
            </div>
          </div>
            
            <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3 flex-shrink-0">
              <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} className="rounded-xl h-12 px-6 text-sm font-bold text-slate-600 hover:bg-slate-200/50 hover:text-slate-900">Cancel</Button>
              <Button onClick={handleSubmit(onSubmit)} disabled={loading} className="rounded-xl h-12 px-8 bg-black hover:bg-slate-900 text-white font-bold text-sm shadow-xl shadow-black/10 transition-all">
                {loading ? "Saving..." : (editingRule ? "Update Automation" : "Create Automation")}
              </Button>
            </div>
          </div>

          <div className="w-[40%] bg-slate-100/50 p-4 lg:p-8 flex items-center justify-center border-l border-slate-200 overflow-hidden hidden md:flex">
            <div className="transform scale-[0.85] xl:scale-95 origin-center">
              <div className="relative w-[300px] h-[600px] bg-white rounded-[40px] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.2)] border-[8px] border-slate-900 overflow-hidden flex flex-col flex-shrink-0">
              <div className="absolute top-0 inset-x-0 h-6 bg-slate-900 rounded-b-2xl mx-16 z-20"></div>
              
              <div className="h-16 border-b border-slate-100 flex items-center justify-center font-bold text-sm pt-4 z-10 bg-white">
                RenderReply Bot
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-5 bg-slate-50/50 flex flex-col">
                <div className="text-[10px] text-slate-400 text-center uppercase tracking-widest font-bold my-2">Live Preview</div>
                
                <div className="flex gap-2 animate-in slide-in-from-bottom-2 fade-in">
                  <div className="w-6 h-6 rounded-full bg-slate-200 flex-shrink-0 mt-1"></div>
                  <div>
                    <p className="text-[11px] font-bold">@customer</p>
                    <p className="text-xs text-slate-600 bg-white p-2.5 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm mt-1">
                      {p_keywords ? `I want the ${p_keywords.split(',')[0].trim()}!` : "Awesome post! Send me the link!"}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-2 justify-end animate-in slide-in-from-bottom-2 fade-in">
                  <div className="flex flex-col items-end">
                    <p className="text-[11px] font-bold text-slate-400">@you</p>
                    <p className="text-xs text-white bg-blue-500 p-2.5 rounded-2xl rounded-tr-none shadow-sm mt-1 max-w-[200px] break-words">
                      {p_public || "Just sent you a DM with the details! 🚀"}
                    </p>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-blue-600 flex-shrink-0 mt-1 text-[8px] text-white flex items-center justify-center font-bold">You</div>
                </div>

                <div className="w-full border-t border-slate-200 my-4 border-dashed"></div>

                <div className="flex gap-2 animate-in slide-in-from-bottom-2 fade-in">
                  <div className="w-6 h-6 rounded-full bg-blue-600 flex-shrink-0 mt-1 text-[8px] text-white flex items-center justify-center font-bold">You</div>
                  <div className="space-y-2 flex-1">
                    <p className="text-[11px] font-bold text-slate-400">Direct Message</p>
                    <p className="text-xs text-slate-800 bg-white p-3 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm whitespace-pre-wrap break-words">
                      {p_private || "Hey! Thanks for reaching out. Here is the link you requested..."}
                    </p>
                    
                    {w_enableFollowSuggestion && (
                      <div className="bg-white border border-slate-100 p-3 rounded-2xl shadow-sm text-center animate-in zoom-in-95">
                        <p className="text-xs text-slate-800 font-medium">{p_followMsg || "Follow for more content!"}</p>
                        <button className="w-full mt-2 bg-blue-500 text-white text-[10px] font-bold py-2 rounded-lg">{w_editFollowButtons && p_followBtn ? p_followBtn : "Tap to Follow"}</button>
                      </div>
                    )}

                    {w_enableProductLink && (
                      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden mt-2 animate-in zoom-in-95">
                        <div className="h-24 bg-slate-100 flex items-center justify-center text-slate-300">
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        </div>
                        <div className="p-3">
                          <p className="text-xs font-bold text-slate-800 line-clamp-1">{p_pName || "Product Name"}</p>
                          <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">{p_pDesc || "Description..."}</p>
                          <button className="w-full mt-2 bg-slate-100 text-slate-700 hover:bg-slate-200 text-[10px] font-bold py-2 rounded-lg transition-colors">View Product</button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}
