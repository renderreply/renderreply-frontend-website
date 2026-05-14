"use client";

import { MessageSquare, Zap, BarChart3, Bot, Shield, Globe } from "lucide-react";

export default function FeaturesPage() {
  return (
    <div className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-black mb-6">Built for Modern Creators</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to automate your Instagram growth and engagement without lifting a finger.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <FeatureItem 
            icon={<MessageSquare className="w-8 h-8" />} 
            title="Auto Comment Reply" 
            desc="Reply to every comment on your posts instantly. Filter by keywords to send different responses."
          />
          <FeatureItem 
            icon={<Zap className="w-8 h-8" />} 
            title="DM Automation" 
            desc="Send automated DMs to anyone who comments on your posts or replies to your stories."
          />
          <FeatureItem 
            icon={<Bot className="w-8 h-8" />} 
            title="AI Smart Replies" 
            desc="Use advanced AI to understand the context of comments and send natural, human-like responses."
          />
          <FeatureItem 
            icon={<BarChart3 className="w-8 h-8" />} 
            title="Growth Analytics" 
            desc="Track how your automations are converting followers into fans with detailed engagement reports."
          />
          <FeatureItem 
            icon={<Shield className="w-8 h-8" />} 
            title="Safe & Secure" 
            desc="Built using official Instagram APIs to keep your account safe and compliant with platform rules."
          />
          <FeatureItem 
            icon={<Globe className="w-8 h-8" />} 
            title="24/7 Availability" 
            desc="Our cloud-based system runs day and night, so you never miss an opportunity to engage."
          />
        </div>
      </div>
    </div>
  );
}

function FeatureItem({ icon, title, desc }: any) {
  return (
    <div className="flex flex-col items-start p-8 rounded-3xl border border-border hover:border-primary/30 hover:bg-primary/5 transition-all group">
      <div className="p-4 bg-slate-50 rounded-2xl text-primary mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  );
}
