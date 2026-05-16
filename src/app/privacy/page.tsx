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
          <Link href="/" className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-black transition-colors bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 mt-16 md:mt-24">
        <div className="space-y-4 mb-16 border-b border-slate-100 pb-10">
          <p className="text-xs font-black tracking-[0.2em] text-slate-400 uppercase">Laventra Technologies LLP</p>
          <h1 className="text-4xl md:text-6xl font-[1000] tracking-tight text-black">Privacy Policy</h1>
          <p className="text-slate-500 font-medium text-lg">Effective Date: May 16, 2026</p>
        </div>

        <article className="space-y-10 text-base md:text-lg text-slate-600 leading-relaxed">
          <section>
            <h2 className="text-2xl font-black text-black mb-4">1. Introduction</h2>
            <p className="mb-4">
              Welcome to <strong>RenderReply</strong> ("renderreply.com"), an Instagram automation platform operated by <strong>Laventra Technologies LLP</strong> ("Company", "we", "us", or "our"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our SaaS application (collectively, the "Services").
            </p>
            <p>
              By accessing or using our Services, you signify that you have read, understood, and agree to our collection, storage, use, and disclosure of your personal information as described in this Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4">2. Company Details</h2>
            <p className="mb-4">
              RenderReply is a product developed and maintained by Laventra Technologies LLP. We provide automation tools allowing users to connect their Instagram creator or business accounts through official Meta APIs to automatically reply to comments using predefined rules and AI-generated responses.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4">3. Information We Collect</h2>
            <p className="mb-4">We collect information that identifies, relates to, describes, or could reasonably be linked, directly or indirectly, with a particular consumer or device ("Personal Information"). Specifically, we collect:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Contact Information:</strong> Name, email address, and other similar contact data.</li>
              <li><strong>Instagram Account Details:</strong> Meta/Instagram usernames, profile details, and data required to execute automation workflows.</li>
              <li><strong>Access Tokens:</strong> OAuth tokens generated when you voluntarily authorize our application via official Meta APIs.</li>
              <li><strong>Usage Analytics:</strong> Information on how you interact with our Services, including diagnostic data, log files, and feature engagement metrics.</li>
              <li><strong>Device & Browser Information:</strong> IP address, browser type, operating system, and device identifiers.</li>
              <li><strong>Payment Information:</strong> Billing details securely processed through our payment gateway, Razorpay. We do not store complete credit card numbers on our servers.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4">4. How We Use Your Data</h2>
            <p className="mb-4">We use the personal information collected via our Services for a variety of business purposes described below:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Automation Operations:</strong> To facilitate and execute automated Instagram replies based on your customized configurations.</li>
              <li><strong>Account Authentication:</strong> To securely create, log in, and manage your user account.</li>
              <li><strong>Analytics & Improvement:</strong> To monitor and analyze usage patterns to enhance and improve our platform's functionality.</li>
              <li><strong>Customer Support:</strong> To resolve your technical issues, provide support, and respond to inquiries.</li>
              <li><strong>Security Monitoring:</strong> To monitor for unauthorized access, ensure robust network security, and prevent fraudulent activities.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4">5. Data Storage and Protection</h2>
            <p className="mb-4">
              We employ stringent organizational, technical, and administrative measures to protect your Personal Information. Your data is stored on secure, industry-leading cloud infrastructure. We restrict access to your information to authorized personnel strictly on a need-to-know basis.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4">6. Encryption and Security Practices</h2>
            <p className="mb-4">
              Security is a core tenet of RenderReply. We implement industry-standard encryption protocols (such as TLS/SSL) during data transmission. Highly sensitive data, particularly Meta OAuth access tokens and authentication credentials, are encrypted at rest using advanced cryptographic algorithms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4">7. Third-Party Services</h2>
            <p className="mb-4">We integrate with trusted third-party service providers to deliver essential capabilities:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Meta APIs:</strong> Used officially for Instagram authentication and executing comment replies. You remain subject to Meta's Platform Policies.</li>
              <li><strong>Razorpay:</strong> Our designated payment processor for handling SaaS subscription billing securely.</li>
              <li><strong>Database & Hosting (MongoDB Atlas / Vercel / Railway):</strong> We utilize modern cloud infrastructure to host our application and securely persist user data.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4">8. Your Data Rights</h2>
            <p className="mb-4">In alignment with global data protection principles, you possess the following rights:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Right to Download Data:</strong> You may request an export of the personal data we hold associated with your account.</li>
              <li><strong>Right to Revoke Access:</strong> You can disconnect your Instagram account and revoke our Meta permissions at any time through your Meta Account Settings or our platform dashboard.</li>
              <li><strong>Right to Request Deletion:</strong> You may request the complete removal of your account and personal data. Please refer to our <Link href="/deletion" className="text-blue-600 hover:underline">Data Deletion Instructions</Link> for step-by-step guidance.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4">9. Cookies and Tracking Technologies</h2>
            <p className="mb-4">
              We utilize cookies, web beacons, and similar tracking technologies to maintain your active session, track user traffic patterns, and deliver a personalized experience. You can manage your cookie preferences through your browser settings, though disabling essential cookies may impact platform functionality.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4">10. Children's Privacy Policy</h2>
            <p className="mb-4">
              Our Services are designed for adult creators and businesses. We do not knowingly collect personal information from children under 18 years of age. If we become aware that we have collected such data, we will take immediate steps to permanently delete it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4">11. Limitation of Liability</h2>
            <p className="mb-4">
              Users are solely responsible for ensuring their use of RenderReply complies with Instagram's Community Guidelines and Meta's Terms of Service. RenderReply shall not be held liable for any account suspensions, shadowbans, or penalties imposed by Instagram resulting from the user's configuration of automated replies or AI responses.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4">12. International Data Processing</h2>
            <p className="mb-4">
              Your information may be transferred to, processed, and maintained on servers located outside of your governmental jurisdiction where data protection laws may differ. By utilizing our Services, you explicitly consent to the processing and global storage of your data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4">13. Changes to This Policy</h2>
            <p className="mb-4">
              We reserve the right to update this Privacy Policy periodically to reflect technological advancements, legal requirements, or operational adjustments. We will notify users of significant material changes via our platform or email notifications.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4">14. Contact Information</h2>
            <p className="mb-4">
              For any privacy-related inquiries, data requests, or concerns, please contact our Data Protection Officer at:
            </p>
            <ul className="list-none space-y-2 font-bold text-black bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <li>Company: Laventra Technologies LLP</li>
              <li className="leading-relaxed">Address: 7th Block, 3rd Floor, Malla Reddy University, Maisammaguda, Dulapally, Secunderabad, Hyderabad, Telangana – 500100, India</li>
              <li>Email: renderreply@gmail.com</li>
              <li>Website: renderreply.com</li>
            </ul>
          </section>
        </article>
      </main>
    </div>
  );
}
