import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsAndConditions() {
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
          <Link href="/" className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-black transition-colors bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 mt-16 md:mt-24">
        <div className="space-y-4 mb-16 border-b border-slate-100 pb-10">
          <p className="text-xs font-black tracking-[0.2em] text-slate-400 uppercase">Laventra Technologies LLP</p>
          <h1 className="text-4xl md:text-6xl font-[1000] tracking-tight text-black">Terms & Conditions</h1>
          <p className="text-slate-500 font-medium text-lg">Effective Date: May 16, 2026</p>
        </div>

        <article className="space-y-10 text-base md:text-lg text-slate-600 leading-relaxed">
          <section>
            <h2 className="text-2xl font-black text-black mb-4">1. Acceptance of Terms</h2>
            <p className="mb-4">
              By accessing or using the <strong>RenderReply</strong> SaaS platform ("renderreply.com"), operated by <strong>Laventra Technologies LLP</strong>, you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, you are prohibited from using our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4">2. Eligibility Requirements</h2>
            <p className="mb-4">
              You must be at least 18 years old and capable of forming a binding contract to use RenderReply. By using our platform, you warrant that you meet these eligibility requirements and have the legal authority to bind your business entity if acting on its behalf.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4">3. User Responsibilities</h2>
            <p className="mb-4">
              RenderReply automates Instagram comment replies for creator and business accounts via official Meta APIs. As a user, you are solely responsible for:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The content of your automated replies, including AI-generated responses.</li>
              <li>Ensuring your automation rules do not violate Instagram's Community Guidelines.</li>
              <li>Maintaining active authorization with Meta to allow RenderReply to function.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4">4. Account Security</h2>
            <p className="mb-4">
              You are responsible for safeguarding the credentials used to access RenderReply. You agree to notify us immediately of any unauthorized use of your account. Laventra Technologies LLP will not be liable for any loss or damage arising from your failure to protect your account information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4">5. Proper Usage Rules & Prohibited Activities</h2>
            <p className="mb-4">You agree not to use RenderReply for any unlawful or abusive purposes. The following activities are strictly prohibited:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Spam:</strong> Sending unsolicited, bulk, or repetitive automated messages that degrade the user experience on Instagram.</li>
              <li><strong>Fake Engagement:</strong> Utilizing the platform to artificially inflate metrics, buy/sell engagement, or operate bot networks.</li>
              <li><strong>Policy Violations:</strong> Violating any local, national, or international laws, or promoting illegal activities.</li>
              <li><strong>Abuse of Meta APIs:</strong> Circumventing rate limits, reverse-engineering the platform, or abusing the official Meta API integration.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4">6. Subscription and Billing Terms</h2>
            <p className="mb-4">
              RenderReply offers subscription-based billing processed securely via <strong>Razorpay</strong>. By subscribing, you authorize us to charge your selected payment method on a recurring basis. Prices are subject to change with prior notice. Failure to pay may result in immediate suspension of services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4">7. Refund Policy Reference</h2>
            <p className="mb-4">
              All subscription payments are subject to our formal <Link href="/refund" className="text-blue-600 hover:underline">Refund Policy</Link>. By agreeing to these Terms, you also acknowledge and accept our refund guidelines.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4">8. Intellectual Property</h2>
            <p className="mb-4">
              The RenderReply platform, including its original code, design, features, and algorithms, is the exclusive property of Laventra Technologies LLP and is protected by copyright, trademark, and other intellectual property laws. You are granted a limited, non-exclusive license to use the platform as a SaaS offering.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4">9. API Usage Limitations & Service Availability</h2>
            <p className="mb-4">
              RenderReply heavily relies on third-party integrations (Meta APIs). <strong>We do not guarantee 100% platform availability.</strong> Instagram and Meta reserve the right to modify, restrict, or deprecate their APIs at any time, which may impact RenderReply's functionality. We shall not be held liable for service interruptions caused by third-party API changes or outages.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4">10. Meta and Instagram Compliance Disclaimer</h2>
            <p className="mb-4">
              RenderReply is a third-party tool and is <strong>not affiliated with, endorsed by, or sponsored by Meta Platforms, Inc. or Instagram</strong>. You must comply with all Meta Platform Policies. Any account suspension or penalties applied by Meta due to your use of automation are solely your responsibility.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4">11. Limitation of Liability</h2>
            <p className="mb-4">
              To the maximum extent permitted by applicable law, Laventra Technologies LLP shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or Instagram account access, resulting from your use of or inability to use the RenderReply service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4">12. User-Generated Content Responsibility</h2>
            <p className="mb-4">
              You retain all rights to the text, rules, and AI prompts you create within RenderReply. However, you bear full legal responsibility for any content disseminated through our automation tools on your behalf.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4">13. Termination & Suspension Rights</h2>
            <p className="mb-4">
              We reserve the right to suspend or terminate your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms & Conditions or engage in abusive platform behavior.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4">14. Governing Law & Dispute Resolution</h2>
            <p className="mb-4">
              These Terms shall be governed by and construed in accordance with the laws of <strong>India</strong>, without regard to its conflict of law provisions. Any dispute arising out of or related to these Terms shall be subject to the exclusive jurisdiction of the competent courts situated in the jurisdiction of our registered address.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4">15. Contact Details</h2>
            <p className="mb-4">
              If you have any questions about these Terms, please contact us at:
            </p>
            <ul className="list-none space-y-2 font-bold text-black bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <li>Company: Laventra Technologies LLP</li>
              <li className="leading-relaxed">Registered Address: 7th Block, 3rd Floor, Malla Reddy University, Maisammaguda, Dulapally, Secunderabad, Hyderabad, Telangana – 500100, India</li>
              <li>Support Email: renderreply@gmail.com</li>
              <li>Website: renderreply.com</li>
            </ul>
          </section>
        </article>
      </main>
    </div>
  );
}
