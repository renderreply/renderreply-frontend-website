import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white text-slate-900 pb-24">
      <header className="border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-black text-xl tracking-tight hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white text-lg leading-none">R</span>
            </div>
            RenderReply
          </Link>
          <Link href="/dashboard/settings" className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-black transition-colors bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
            <ArrowLeft className="w-4 h-4" /> Back to Settings
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 mt-16 md:mt-24">
        <div className="space-y-4 mb-16 border-b border-slate-100 pb-10">
          <p className="text-xs font-black tracking-[0.2em] text-slate-400 uppercase">Laventra Technologies LLP</p>
          <h1 className="text-4xl md:text-6xl font-[1000] tracking-tight text-black">Terms and Conditions</h1>
          <p className="text-slate-500 font-medium text-lg">Last updated: May 2, 2026</p>
        </div>

        <article className="space-y-10 text-base md:text-lg text-slate-600 leading-relaxed">
          <section>
            <h2 className="text-2xl font-black text-black mb-4">1. Acceptance of Terms</h2>
            <p className="mb-4">
              By accessing and using <strong>RenderReply</strong> ("we", "us", "our"), a product of <strong>Laventra Technologies LLP</strong>, accessible at renderreply.com, you confirm that you have read, understood, and agreed to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must discontinue your use of our Service immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4">2. Description of Service</h2>
            <p className="mb-4">
              RenderReply is an advanced SaaS (Software as a Service) platform designed to automate Instagram engagement. Our tools enable users to configure automated comment replies, story reply automation, and direct message (DM) triggers based on predefined keywords or actions via the official Meta Graph API.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4">3. Eligibility</h2>
            <p className="mb-4">
              To utilize RenderReply, you must:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Be at least 18 years of age or the legal age of majority in your jurisdiction.</li>
              <li>Possess a valid, active Instagram Business or Creator account linked to a Facebook Page, as required by Meta's API integration rules.</li>
              <li>Have the authority to bind any corporation or entity you represent to these Terms.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4">4. User Accounts and Responsibilities</h2>
            <p className="mb-4">
              You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to immediately notify Laventra Technologies LLP of any unauthorized use of your account or any other breach of security. We will not be liable for any loss or damage arising from your failure to protect your login details.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4">5. Instagram API Compliance and Meta Guidelines</h2>
            <p className="mb-4">
              Our Service operates strictly within the confines of the Meta Platform Policy. As a user of RenderReply, you are also bound by the Meta Terms of Service and Instagram Community Guidelines. You agree that your use of RenderReply will not violate these third-party policies. We do not support, endorse, or permit the circumvention of Meta's rate limits or anti-spam protocols.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4">6. Prohibited Uses</h2>
            <p className="mb-4">
              You agree NOT to use the Service to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Send unsolicited promotional spam or deceptive messaging.</li>
              <li>Generate fake engagement, buy followers, or engage in any "growth hacking" tactics explicitly prohibited by Instagram.</li>
              <li>Distribute malware, phishing links, or otherwise harmful content via automated DMs.</li>
              <li>Harass, threaten, or violate the intellectual property or privacy rights of any third party.</li>
            </ul>
            <p className="mt-4">
              Violation of these rules will result in immediate account termination without a refund.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4">7. Subscription Plans, Billing, and Auto-Renewal</h2>
            <p className="mb-4">
              RenderReply offers both a <strong>Free Plan</strong> and a <strong>Pro Plan</strong>.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Pricing:</strong> The Pro Plan is billed at ₹499 per month (INR).</li>
              <li><strong>Payment Provider:</strong> All payments are securely processed by Razorpay. By upgrading, you agree to Razorpay's Terms of Service.</li>
              <li><strong>Auto-Renewal:</strong> Subscriptions automatically renew at the end of the billing cycle unless canceled prior to the renewal date. You can cancel your subscription at any time from your account settings.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4">8. Intellectual Property</h2>
            <p className="mb-4">
              The RenderReply website, platform, code, designs, and original content are the exclusive property of Laventra Technologies LLP. You are granted a limited, non-exclusive, non-transferable license to use the software for its intended purpose. You may not copy, modify, distribute, or reverse engineer any part of our intellectual property.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4">9. Limitation of Liability</h2>
            <p className="mb-4">
              RenderReply provides tools to facilitate engagement, but we do not control how Meta interprets your usage. <strong>We are entirely exempt from liability regarding any Instagram account bans, shadow-bans, or restrictions imposed by Meta.</strong> In no event shall Laventra Technologies LLP be liable for any indirect, incidental, special, or consequential damages, including loss of profits, data, or business opportunities arising out of your use or inability to use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4">10. Disclaimer of Affiliation</h2>
            <p className="mb-4">
              RenderReply is an independent software tool and is in no way sponsored, endorsed, administered by, or associated with Meta Platforms, Inc., Instagram, or Facebook.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4">11. Termination of Account</h2>
            <p className="mb-4">
              We reserve the right to suspend or terminate your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms and Conditions or violate Instagram's Community Guidelines.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4">12. Governing Law and Dispute Resolution</h2>
            <p className="mb-4">
              These Terms shall be governed and construed in accordance with the laws of <strong>India</strong>, without regard to its conflict of law provisions. Any dispute, controversy, or claim arising out of or relating to these Terms or the breach, termination, or invalidity thereof shall be subject to the exclusive jurisdiction of the courts located in <strong>Hyderabad, Telangana, India</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4">13. Changes to Terms</h2>
            <p className="mb-4">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any significant changes via email or an announcement on our platform. Your continued use of the Service following the posting of any changes constitutes acceptance of those changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4">14. Contact Details</h2>
            <p className="mb-4">
              If you have any questions about these Terms, please contact us:
            </p>
            <ul className="list-none space-y-2 font-bold text-black bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <li>Company: Laventra Technologies LLP</li>
              <li>Product: RenderReply</li>
              <li>Email: legal@renderreply.com</li>
              <li>Jurisdiction: Hyderabad, Telangana, India</li>
            </ul>
          </section>
        </article>
      </main>
    </div>
  );
}
