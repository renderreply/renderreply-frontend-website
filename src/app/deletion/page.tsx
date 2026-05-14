import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export default function DataDeletion() {
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
          <div className="w-12 h-12 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-6">
            <Shield className="w-6 h-6" />
          </div>
          <p className="text-xs font-black tracking-[0.2em] text-slate-400 uppercase">Laventra Technologies LLP</p>
          <h1 className="text-4xl md:text-6xl font-[1000] tracking-tight text-black">Data Deletion Instructions</h1>
          <p className="text-slate-500 font-medium text-lg">How to manage and delete your data from RenderReply.</p>
        </div>

        <article className="space-y-10 text-base md:text-lg text-slate-600 leading-relaxed">
          <section>
            <p className="mb-4">
              At <strong>RenderReply</strong>, we value your privacy and provide clear methods for you to manage or delete the data we process via the Meta/Instagram API. According to Meta's Platform Policy, we provide a <strong>User Data Deletion Callback</strong> and manual instructions for removing your information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4">1. How to Remove the App via Facebook</h2>
            <p className="mb-4">You can revoke RenderReply's access to your Instagram account and delete associated data by following these steps on Facebook:</p>
            <ol className="list-decimal pl-6 space-y-4">
              <li>Log into your Facebook account and go to <strong>Settings & Privacy</strong> &gt; <strong>Settings</strong>.</li>
              <li>Look for the <strong>Security and Login</strong> section or <strong>Apps and Websites</strong>.</li>
              <li>Find <strong>RenderReply</strong> in the list of active apps.</li>
              <li>Click <strong>Remove</strong> next to the app name.</li>
              <li>Confirm the removal. Once removed, we will no longer have access to your Instagram profile, and your access tokens will be invalidated immediately.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4">2. Requesting Manual Data Deletion</h2>
            <p className="mb-4">If you wish to delete your entire RenderReply account, including your email, billing history, and automation rules, please follow these steps:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Send an email to <strong>legal@renderreply.com</strong> from the email address associated with your account.</li>
              <li>Use the subject line: <strong>Data Deletion Request - [Your Name/Username]</strong>.</li>
              <li>Our compliance team will process your request within <strong>7 business days</strong>.</li>
              <li>You will receive a confirmation email once all your personal data has been permanently purged from our databases.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4">3. What Data is Deleted?</h2>
            <p className="mb-4">Upon a successful deletion request (manual or via Meta's callback), the following information is permanently removed:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>All encrypted Meta API Access Tokens.</li>
              <li>Your Instagram Profile Metadata (Username, Profile Picture URL).</li>
              <li>All Automation Rules and Trigger Configurations.</li>
              <li>All Activity Logs and Engagement Metrics.</li>
              <li>Your RenderReply Account Credentials (if requested).</li>
            </ul>
            <p className="mt-4 italic text-sm">Note: Basic billing records may be retained for tax and accounting purposes as required by Indian Law.</p>
          </section>

          <section className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
            <h3 className="text-xl font-black text-black mb-2">Need Help?</h3>
            <p className="text-slate-500 mb-6">If you encounter any issues during the deletion process, our support team is ready to assist you.</p>
            <a 
              href="mailto:support@renderreply.com" 
              className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all"
            >
              Contact Support
            </a>
          </section>
        </article>
      </main>
    </div>
  );
}
