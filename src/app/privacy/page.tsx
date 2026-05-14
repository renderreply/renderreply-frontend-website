import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
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
          <h1 className="text-4xl md:text-6xl font-[1000] tracking-tight text-black">Privacy Policy</h1>
          <p className="text-slate-500 font-medium text-lg">Last updated: May 2, 2026</p>
        </div>

        <article className="space-y-10 text-base md:text-lg text-slate-600 leading-relaxed">
          <section>
            <p className="mb-4">
              Welcome to <strong>RenderReply</strong>, an Instagram Automation Platform operated by <strong>Laventra Technologies LLP</strong> ("Company", "we", "us", or "our"). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice or our practices with regard to your personal information, please contact us at <strong>legal@renderreply.com</strong>.
            </p>
            <p>
              This Privacy Policy applies to all information collected through our website (renderreply.com), and/or any related services, sales, marketing, or events (we refer to them collectively in this Privacy Policy as the "Services"). By utilizing our Services, you consent to the data practices described in this statement, which complies with applicable Indian laws, including the Information Technology Act, 2000, and the Consumer Protection Act, 2019.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4">1. What Data We Collect</h2>
            <p className="mb-4">We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and services, or otherwise when you contact us. The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make, and the products and features you use.</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Personal Identifiable Information (PII):</strong> Full name, email address, and account credentials.</li>
              <li><strong>Instagram Account Data:</strong> Usernames, Meta/Instagram authentication tokens, profile details, and linked Facebook Page information required for API integrations.</li>
              <li><strong>Payment Information:</strong> Billing details necessary to process your subscription (Free or Pro plan at ₹499/month). Payment processing is handled securely by Razorpay; we do not store full credit card numbers or UPI PINs on our servers.</li>
              <li><strong>Usage Data:</strong> Diagnostic data, log files, IP addresses, browser types, and engagement metrics tracking how you interact with our platform.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4">2. How We Collect Your Data</h2>
            <p className="mb-4">We gather information through various touchpoints to ensure the seamless operation of RenderReply:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Direct Input:</strong> Information provided during the sign-up process, subscription upgrades, and direct communication with our support team.</li>
              <li><strong>Instagram OAuth:</strong> When you connect your Instagram Business or Creator account, we use Meta's secure OAuth protocol to collect necessary permissions and tokens.</li>
              <li><strong>Cookies and Tracking Technologies:</strong> We use cookies, web beacons, and similar tracking technologies to store your preferences, analyze platform performance, and keep you logged in.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4">3. Why We Collect Your Data</h2>
            <p className="mb-4">Our primary goal in collecting information is to provide you with a secure, efficient, and customized automation experience. We use the collected data for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide and maintain our Service, including executing automated comment replies, story replies, and DM triggers via the Instagram API.</li>
              <li>To manage your account, billing processes, and subscription tier (e.g., managing the ₹499/month Pro plan).</li>
              <li>To send administrative information, service updates, and technical notices.</li>
              <li>To provide customer support and respond to inquiries.</li>
              <li>To enforce our Terms and Conditions, comply with legal obligations, and prevent fraudulent activity.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4">4. How We Store and Protect Your Data</h2>
            <p className="mb-4">
              Laventra Technologies LLP employs industry-standard organizational and technical security measures designed to protect the security of any personal information we process.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Encryption:</strong> Sensitive data, such as Meta API access tokens and user passwords, are heavily encrypted at rest using modern cryptographic hashing algorithms (e.g., bcrypt).</li>
              <li><strong>Secure Servers:</strong> Our databases and application servers are hosted in secure, access-controlled cloud environments.</li>
              <li><strong>Transmission Security:</strong> All data transferred between your browser, our servers, and third-party APIs is encrypted using SSL/TLS protocols.</li>
            </ul>
            <p className="mt-4">
              Despite our safeguards, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure. You are responsible for keeping your account credentials confidential.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4">5. Third-Party Sharing</h2>
            <p className="mb-4">
              We do <strong>not</strong> sell, rent, or trade your personal information to third parties for their promotional purposes. We only share information with the following categories of third parties as necessary to provide our Services:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Meta/Instagram API:</strong> We transmit automation payloads (such as trigger rules and auto-reply messages) to Meta's servers to execute the core functionality of RenderReply.</li>
              <li><strong>Payment Processors:</strong> We use Razorpay to process all INR (₹) transactions securely. Razorpay handles your financial data under their own strict privacy policies.</li>
              <li><strong>Analytics and Infrastructure Providers:</strong> Trusted third-party cloud hosting and analytics services that assist us in operating our business, under strict confidentiality agreements.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4">6. User Rights Under Indian Law</h2>
            <p className="mb-4">
              As a user residing in India, you are protected under the Information Technology Act, 2000, and the Consumer Protection (E-Commerce) Rules, 2020. You hold the following rights regarding your data:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Right to Access:</strong> You may request a copy of the personal data we hold about you.</li>
              <li><strong>Right to Correction:</strong> You may update or correct any inaccurate or incomplete personal information through your account settings.</li>
              <li><strong>Right to Deletion:</strong> You may request the permanent deletion of your account and associated personal data, subject to legal data retention requirements.</li>
              <li><strong>Grievance Redressal:</strong> You have the right to file a complaint regarding data privacy with our designated Grievance Officer via the contact details provided below.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4">7. Instagram/Meta Data Usage Compliance</h2>
            <p className="mb-4">
              RenderReply operates in strict compliance with the Meta Platform Policy and Instagram Developer Guidelines. We only request permissions necessary to execute authorized automation. By using RenderReply, you acknowledge that we do not own the data processed through the Instagram API. Our usage of information received from Instagram APIs will adhere to the Meta App Developer Terms. We regularly undergo app reviews to ensure continuous compliance.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4">8. Cookie Policy</h2>
            <p className="mb-4">
              Cookies are small text files placed on your device to collect standard Internet log information and visitor behavior information. We use essential cookies to keep you logged into your RenderReply dashboard securely. We may also use analytical cookies to understand how you use our website, enabling us to improve the user experience. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent; however, if you do not accept essential cookies, you may not be able to use portions of our Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4">9. Data Retention Policy</h2>
            <p className="mb-4">
              We will only keep your personal information for as long as it is necessary for the purposes set out in this Privacy Policy, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements). Upon account deletion, all active Instagram access tokens and automation rules are immediately destroyed. We may retain basic billing records as mandated by Indian taxation authorities.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4">10. Contact Us</h2>
            <p className="mb-4">
              If you have questions, comments, or wish to exercise your rights concerning this Privacy Policy, please contact our Legal and Compliance team:
            </p>
            <ul className="list-none space-y-2 font-bold text-black bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <li>Company: Laventra Technologies LLP</li>
              <li>Product: RenderReply</li>
              <li>Email: legal@renderreply.com</li>
              <li>Country: India</li>
            </ul>
          </section>
        </article>
      </main>
    </div>
  );
}
