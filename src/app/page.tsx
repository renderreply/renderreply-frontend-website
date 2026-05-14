import { Hero } from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Zap, MessageSquare, BarChart3, Globe, ShieldCheck, ArrowRight } from "lucide-react";

const InstagramIcon = ({ size = 24, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

export default function Home() {
  return (
    <main className="min-h-screen bg-white selection:bg-black selection:text-white">
      <Hero />
      
      {/* Trust Marquee */}
      <section className="py-10 overflow-hidden border-y border-slate-50">
        <div className="container mx-auto px-10 mb-8 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Trusted by creators across India</p>
        </div>
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-20 items-center px-10 grayscale opacity-30">
              <MarqueeItem text="Fashion" />
              <MarqueeItem text="Fitness" />
              <MarqueeItem text="Tech" />
              <MarqueeItem text="Business" />
              <MarqueeItem text="Education" />
              <MarqueeItem text="Lifestyle" />
              <MarqueeItem text="Creators" />
            </div>
          ))}
        </div>
      </section>

      {/* Bento Features Section */}
      <section id="features" className="pt-4 pb-12 dot-pattern">
        <div className="container mx-auto px-10">
          <div className="text-center mb-24 space-y-4">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">The Platform</p>
            <h2 className="text-4xl md:text-6xl font-[1000] tracking-tighter text-black">
              Everything you need to <br /> scale your presence.
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 max-w-7xl mx-auto">
            {/* Main Feature */}
            <div className="md:col-span-8 bento-card group">
              <div className="relative z-10 space-y-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-purple-500/30 transform transition-transform group-hover:-translate-y-2 group-hover:scale-110">
                  <InstagramIcon size={32} />
                </div>
                <h3 className="text-3xl font-[1000] tracking-tighter">Smart Instagram Automation</h3>
                <p className="text-slate-500 font-bold max-w-md">Our AI handles every comment, story mention, and DM with perfect context. Never miss an engagement opportunity again.</p>
              </div>
              <div className="absolute bottom-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity text-purple-600">
                <InstagramIcon size={200} />
              </div>
            </div>

            {/* Side Feature */}
            <div className="md:col-span-4 bento-card bg-slate-950 text-white group border-none">
              <div className="space-y-6 relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-500/20 transform transition-transform group-hover:-translate-y-2 group-hover:scale-110">
                  <Zap size={28} />
                </div>
                <h3 className="text-2xl font-[1000] tracking-tighter">Lightning Fast</h3>
                <p className="text-slate-400 font-bold text-sm">Response times under 1 second. Your audience gets what they want, exactly when they want it.</p>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl -z-0"></div>
            </div>

            {/* Bottom Features */}
            <div className="md:col-span-4 bento-card group">
               <div className="space-y-6 text-center md:text-left relative z-10">
                <div className="w-14 h-14 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mx-auto md:mx-0 transform transition-transform group-hover:-translate-y-1 group-hover:bg-blue-500 group-hover:text-white">
                  <BarChart3 size={28} />
                </div>
                <h3 className="text-xl font-black text-slate-900">Live Analytics</h3>
                <p className="text-slate-500 text-xs font-bold leading-relaxed">Track every reply, conversion, and engagement metric in real-time.</p>
              </div>
            </div>

            <div className="md:col-span-4 bento-card group">
               <div className="space-y-6 text-center md:text-left relative z-10">
                <div className="w-14 h-14 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center mx-auto md:mx-0 transform transition-transform group-hover:-translate-y-1 group-hover:bg-emerald-500 group-hover:text-white">
                  <ShieldCheck size={28} />
                </div>
                <h3 className="text-xl font-black text-slate-900">Meta Verified</h3>
                <p className="text-slate-500 text-xs font-bold leading-relaxed">Built on the official Meta API. Your account is 100% safe and secure.</p>
              </div>
            </div>

            <div className="md:col-span-4 bento-card bg-slate-50 border-none group">
               <div className="space-y-6 text-center md:text-left relative z-10">
                <div className="w-14 h-14 bg-white text-slate-700 rounded-2xl flex items-center justify-center mx-auto md:mx-0 shadow-sm border border-slate-100 transform transition-transform group-hover:rotate-12 group-hover:-translate-y-1">
                  <Globe size={28} />
                </div>
                <h3 className="text-xl font-black text-slate-900">Global Reach</h3>
                <p className="text-slate-500 text-xs font-bold leading-relaxed">Supports 50+ languages. Automate your presence globally with ease.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      


      {/* Enterprise SaaS Footer */}
      <footer className="bg-slate-50 pt-24 pb-12 border-t border-slate-200">
        <div className="container mx-auto px-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-20">
            {/* Brand Column */}
            <div className="col-span-1 md:col-span-4 space-y-6">
              <span className="text-xl font-black tracking-widest text-black uppercase">RenderReply</span>
              <p className="text-sm text-slate-500 max-w-xs leading-relaxed">
                The ultimate automation platform for Instagram creators. Build your audience on autopilot.
              </p>
            </div>
            
            {/* Links Columns */}
            <div className="col-span-1 md:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="space-y-6">
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-900">Product</h4>
                <ul className="space-y-4 text-sm text-slate-500 font-medium">
                  <li><a href="/#features" className="hover:text-black transition-colors">Features</a></li>
                  <li><a href="/pricing" className="hover:text-black transition-colors">Pricing</a></li>
                  <li><a href="/refund" className="hover:text-black transition-colors">Refund Policy</a></li>
                </ul>
              </div>
              <div className="space-y-6">
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-900">Resources</h4>
                <ul className="space-y-4 text-sm text-slate-500 font-medium">
                  <li><a href="mailto:support@renderreply.com" className="hover:text-black transition-colors">Help &amp; Support</a></li>
                </ul>
              </div>
              <div className="space-y-6">
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-900">Company</h4>
                <ul className="space-y-4 text-sm text-slate-500 font-medium">
                  <li><a href="mailto:legal@renderreply.com" className="hover:text-black transition-colors">Contact Us</a></li>
                </ul>
              </div>
              <div className="space-y-6">
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-900">Legal</h4>
                <ul className="space-y-4 text-sm text-slate-500 font-medium">
                  <li><a href="/privacy" className="hover:text-black transition-colors">Privacy Policy</a></li>
                  <li><a href="/terms" className="hover:text-black transition-colors">Terms of Service</a></li>
                  <li><a href="/refund" className="hover:text-black transition-colors">Refund Policy</a></li>
                  <li><a href="/deletion" className="hover:text-black transition-colors">Data Deletion</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-slate-200">
            <p className="text-slate-400 text-sm font-medium">
              © {new Date().getFullYear()} RenderReply Inc. All rights reserved.
            </p>
            <div className="flex gap-6 mt-6 md:mt-0 text-slate-400">
              <a href="https://www.instagram.com/renderreply?igsh=bHIzeGllZXlzcmQ2&utm_source=qr" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors"><InstagramIcon size={20} /></a>
              <a href="#" className="hover:text-black transition-colors"><Globe size={20} /></a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

function MarqueeItem({ text }: { text: string }) {
  return (
    <span className="text-3xl font-[1000] tracking-tighter italic uppercase">{text}</span>
  );
}


