"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PricingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleSubscribe = async () => {
    if (status !== "authenticated") {
      router.push("/login");
      return;
    }

    setLoading(true);
    const res = await loadRazorpayScript();

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      setLoading(false);
      return;
    }
    
    // Fallback key if environment variables aren't injected into the frontend yet
    const razorpayKeyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_live_SaAyKEgd8DfA3i";

    const options = {
      key: razorpayKeyId,
      amount: "49900", // ₹499.00 in paise
      currency: "INR",
      name: "RenderReply",
      description: "Pro Plan Subscription",
      handler: function (response: any) {
        alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
        // In a real app, you would verify this payment ID on the backend
        router.push("/dashboard/rules");
      },
      prefill: {
        name: session?.user?.name || "",
        email: session?.user?.email || "",
      },
      theme: {
        color: "#000000",
      },
    };

    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();
    setLoading(false);
  };

  return (
    <div className="py-24 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Pricing</p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-black">Simple, Transparent Pricing</h1>
          <p className="text-xl text-slate-500 font-medium">Start for free and upgrade as you grow. No hidden fees.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <div className="p-10 rounded-[32px] border border-slate-200 bg-white flex flex-col hover:shadow-xl transition-shadow relative">
            <h3 className="text-2xl font-black mb-2 tracking-tight text-slate-900">Free Plan</h3>
            <p className="text-slate-500 mb-6 font-medium">Perfect for new creators and small accounts</p>
            <div className="mb-8 flex items-end gap-2 border-b border-slate-100 pb-8">
              <span className="text-6xl font-black tracking-tighter text-slate-900">₹0</span>
              <span className="text-slate-400 font-bold mb-2 uppercase tracking-widest text-[10px]">/ month</span>
            </div>
            <ul className="space-y-4 mb-10 flex-1">
              {["3 Automation Rules", "1 Instagram Account", "500 Replies / month", "Basic Analytics", "Community Support"].map((f, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckIcon />
                  <span className="text-sm font-bold text-slate-600">{f}</span>
                </li>
              ))}
            </ul>
            <Button 
              variant="outline" 
              onClick={() => status === "authenticated" ? router.push("/dashboard/rules") : router.push("/signup")}
              className="w-full h-14 rounded-2xl font-black text-xs uppercase tracking-widest border-slate-200 hover:bg-slate-50"
            >
              {status === "authenticated" ? "Go to Dashboard" : "Start Free"}
            </Button>
          </div>
          
          {/* Pro Plan */}
          <div className="p-10 rounded-[32px] border-2 border-black bg-white flex flex-col shadow-2xl relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
            <div className="absolute top-0 right-0 bg-black text-white px-6 py-2 text-[10px] font-black uppercase tracking-widest rounded-bl-3xl">Popular</div>
            
            <h3 className="text-2xl font-black mb-2 tracking-tight text-slate-900">Pro Plan</h3>
            <p className="text-slate-500 mb-6 font-medium">For serious businesses and growing creators</p>
            
            <div className="mb-8 flex items-end gap-2 border-b border-slate-100 pb-8">
              <span className="text-6xl font-black tracking-tighter text-slate-900">₹499</span>
              <span className="text-slate-400 font-bold mb-2 uppercase tracking-widest text-[10px]">/ month</span>
            </div>
            
            <ul className="space-y-4 mb-10 flex-1">
              {["Unlimited Rules", "Up to 5 IG Accounts", "Unlimited Replies", "AI Smart Replies", "Advanced Analytics", "Priority 24/7 Support", "Early Access to Beta"].map((f, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckIcon />
                  <span className="text-sm font-bold text-slate-600">{f}</span>
                </li>
              ))}
            </ul>
            <Button 
              onClick={handleSubscribe} 
              disabled={loading}
              className="w-full h-14 rounded-2xl font-black text-xs uppercase tracking-widest bg-black text-white hover:bg-black/90 shadow-xl shadow-black/10 hover:-translate-y-1 transition-all"
            >
              {loading ? "Loading..." : "Subscribe to Pro"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <div className="w-5 h-5 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
      <svg className="w-3 h-3 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
      </svg>
    </div>
  );
}

function CheckIconLight() {
  return (
    <div className="w-5 h-5 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
      </svg>
    </div>
  );
}
