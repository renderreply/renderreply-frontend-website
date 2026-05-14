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
          <Link href="/dashboard/settings" className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-black transition-colors bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
            <ArrowLeft className="w-4 h-4" /> Back to Settings
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 mt-16 md:mt-24">
        <div className="space-y-4 mb-16 border-b border-slate-100 pb-10">
          <p className="text-xs font-black tracking-[0.2em] text-slate-400 uppercase">Laventra Technologies LLP</p>
          <h1 className="text-4xl md:text-6xl font-[1000] tracking-tight text-black">Refund Policy</h1>
          <p className="text-slate-500 font-medium text-lg">Last updated: May 2, 2026</p>
        </div>

        <article className="space-y-10 text-base md:text-lg text-slate-600 leading-relaxed">
          <section>
            <p className="mb-4">
              Thank you for choosing <strong>RenderReply</strong>, a SaaS product developed by <strong>Laventra Technologies LLP</strong>. We strive to provide a robust and flawless Instagram automation experience. However, because RenderReply is a digital software service that incurs immediate server and API costs upon usage, we enforce a strict refund policy to prevent abuse.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4">1. General Policy (Non-Refundable by Default)</h2>
            <p className="mb-4">
              Due to the nature of digital SaaS products, all subscription payments (including the ₹499/month Pro plan) are <strong>non-refundable by default</strong>. When you subscribe to our service, you are immediately granted access to premium automation features, and we begin incurring infrastructure costs on your behalf.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4">2. Exceptions for Refunds</h2>
            <p className="mb-4">
              We value our customers and understand that technical anomalies can occur. We will grant a full or partial refund <em>only</em> under the following exceptional circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Verified Technical Failure:</strong> A critical bug or prolonged downtime originating entirely from our servers that prevents you from using the core automation features, which our support team is unable to resolve.</li>
              <li><strong>Double Charge:</strong> You were billed multiple times for the same billing cycle due to a payment gateway error.</li>
              <li><strong>Service Not Delivered:</strong> Your account was charged, but the Pro features were not activated on your account.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4">3. Refund Request Window</h2>
            <p className="mb-4">
              If your situation falls under one of the exceptions listed above, you must submit your refund request within <strong>7 days</strong> of the initial charge. Requests made after this 7-day window will not be entertained under any circumstances.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4">4. Conditions Where Refunds Are Strictly Denied</h2>
            <p className="mb-4">
              To maintain fairness and platform integrity, we will <strong>not</strong> issue refunds for the following reasons:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Partial Month Usage:</strong> You used the service for a few days and decided you no longer need it. We do not prorate monthly plans.</li>
              <li><strong>Account Suspension:</strong> Your RenderReply account was banned or suspended due to violations of our Terms of Service (e.g., spamming).</li>
              <li><strong>Instagram Actions:</strong> Your Instagram account was restricted, shadow-banned, or deleted by Meta. We do not control Meta's moderation algorithms and are not liable for their actions.</li>
              <li><strong>Change of Mind:</strong> You simply changed your mind or failed to cancel your auto-renewal subscription before the billing date.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4">5. Annual Plan Refunds</h2>
            <p className="mb-4">
              If you are subscribed to an annual billing plan and experience a verified technical failure that we cannot fix, we may, at our sole discretion, offer a <strong>pro-rata refund</strong> for the unused months remaining on your annual term.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4">6. How to Request a Refund</h2>
            <p className="mb-4">
              To initiate a refund review, you must contact our billing department directly:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Email us at: <strong>support@renderreply.com</strong></li>
              <li>Include the email address associated with your RenderReply account.</li>
              <li>Provide your Razorpay Order ID or transaction receipt.</li>
              <li>Include a detailed explanation of the technical failure or billing error (with screenshots if applicable).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4">7. Refund Processing Timeline and Provider</h2>
            <p className="mb-4">
              All approved refunds are processed exclusively through our payment partner, <strong>Razorpay</strong>.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Once our team approves your request, the refund will be initiated within 24-48 hours.</li>
              <li>It typically takes <strong>5–7 business days</strong> for the funds to reflect back in your original payment method (bank account, credit card, or UPI), depending on your bank's processing times.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4">8. Governing Law</h2>
            <p className="mb-4">
              This Refund Policy is governed by the laws of India, including the Consumer Protection Act, 2019, and the guidelines set forth by the Reserve Bank of India (RBI) regarding digital payments.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4">9. Contact Us</h2>
            <p className="mb-4">
              For any payment or refund-related disputes, please reach out to us at:
            </p>
            <ul className="list-none space-y-2 font-bold text-black bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <li>Company: Laventra Technologies LLP</li>
              <li>Product: RenderReply</li>
              <li>Email: support@renderreply.com</li>
            </ul>
          </section>
        </article>
      </main>
    </div>
  );
}
