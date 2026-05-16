import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function RefundPolicy() {
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
          <h1 className="text-4xl md:text-6xl font-[1000] tracking-tight text-black">Refund Policy</h1>
          <p className="text-slate-500 font-medium text-lg">Effective Date: May 16, 2026</p>
        </div>

        <article className="space-y-10 text-base md:text-lg text-slate-600 leading-relaxed">
          <section>
            <p className="mb-4">
              Thank you for choosing <strong>RenderReply</strong>, a digital SaaS automation service provided by <strong>Laventra Technologies LLP</strong>. We strive to deliver an exceptional experience to help you automate your Instagram engagement. Please read our Refund Policy carefully to understand your rights regarding subscription payments.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4">1. Subscription Billing Policy</h2>
            <p className="mb-4">
              RenderReply operates on a recurring billing model offering both monthly and yearly subscription plans. Payments are processed securely via our gateway partner, Razorpay. By upgrading to a paid tier, you authorize automatic renewals until you cancel your subscription. As we provide an intangible digital SaaS service, there are no physical products shipped or returned.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4">2. Trial Policy</h2>
            <p className="mb-4">
              If we offer a free trial, you will not be charged until the trial period expires. We encourage users to fully evaluate the platform's features during this trial period before committing to a paid subscription.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4">3. General Refund Eligibility (Non-Refundable)</h2>
            <p className="mb-4">
              Because RenderReply offers immediate access to premium automation features and incurs server/API costs, <strong>refunds are generally not provided once services have been used or after a billing cycle has commenced</strong>. We do not offer prorated refunds for mid-cycle cancellations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4">4. Exceptions for Refund</h2>
            <p className="mb-4">We may, at our sole discretion, issue a refund in the following exceptional situations:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Duplicate Payments:</strong> If you were erroneously charged multiple times for the same subscription period due to a technical glitch.</li>
              <li><strong>Technical Failures:</strong> If a prolonged, platform-wide technical failure prevents you from utilizing the core automation features, and our support team cannot resolve the issue.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4">5. Cancellation Policy</h2>
            <p className="mb-4">
              You can cancel your RenderReply subscription at any time through the billing section of your dashboard. Upon cancellation, you will retain access to your paid features until the end of your current billing cycle. No further charges will be applied thereafter.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4">6. Failed Payment Handling</h2>
            <p className="mb-4">
              If your automatic recurring payment fails, we will attempt to retry the charge over a standard grace period. If payment remains unsuccessful, your account will automatically be downgraded to the free tier, and premium automation rules will be paused.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4">7. Chargeback Policy & Fraud Prevention</h2>
            <p className="mb-4">
              We take fraud and payment abuse seriously. If you initiate a chargeback with your bank or credit card company without first contacting our support team, we reserve the right to immediately suspend or permanently terminate your RenderReply account and dispute the chargeback with evidence of your platform usage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4">8. Processing Timelines</h2>
            <p className="mb-4">
              If an exceptional refund is approved by our team, it will be processed back to your original payment method via Razorpay. Please allow 5-10 business days for the funds to reflect in your account, depending on your bank's processing timelines.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4">9. Tax and GST Clarification</h2>
            <p className="mb-4">
              Subscription prices may be inclusive or exclusive of GST/taxes as indicated during checkout. If a refund is issued, the corresponding tax amount collected will also be refunded in accordance with applicable Indian tax laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4">10. Contact Information</h2>
            <p className="mb-4">
              If you believe you qualify for a refund exception or need assistance with billing, please contact our support team:
            </p>
            <ul className="list-none space-y-2 font-bold text-black bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <li>Company: Laventra Technologies LLP</li>
              <li className="leading-relaxed">Address: 7th Block, 3rd Floor, Malla Reddy University, Maisammaguda, Dulapally, Secunderabad, Hyderabad, Telangana – 500100, India</li>
              <li>Support Email: renderreply@gmail.com</li>
              <li>Website: renderreply.com</li>
            </ul>
          </section>
        </article>
      </main>
    </div>
  );
}
