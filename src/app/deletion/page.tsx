import Link from "next/link";
import { ArrowLeft, Trash2, Unlink, Mail, ShieldCheck } from "lucide-react";

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
          <p className="text-xs font-black tracking-[0.2em] text-slate-400 uppercase">Laventra Technologies LLP</p>
          <h1 className="text-4xl md:text-6xl font-[1000] tracking-tight text-black">Data Deletion Instructions</h1>
          <p className="text-slate-500 font-medium text-lg">Your privacy and data control are our top priorities.</p>
        </div>

        <article className="space-y-10 text-base md:text-lg text-slate-600 leading-relaxed">
          <section className="bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-100">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-black text-black mb-2">Meta Platform Compliance</h2>
                <p className="text-sm md:text-base text-slate-600">
                  In strict compliance with Meta Platform requirements and global privacy standards, RenderReply provides users with transparent and accessible methods to permanently request the deletion of their accounts, automation rules, and connected Instagram data.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-6">Step-by-Step Deletion Process</h2>
            
            <div className="space-y-6">
              <div className="flex gap-4 p-6 border border-slate-100 rounded-2xl hover:border-slate-300 transition-colors">
                <div className="flex-shrink-0 w-10 h-10 bg-slate-100 text-black font-black rounded-full flex items-center justify-center">1</div>
                <div>
                  <h3 className="text-lg font-bold text-black flex items-center gap-2"><Unlink className="w-4 h-4 text-slate-400" /> Disconnecting Your Instagram Account</h3>
                  <p className="mt-2 text-slate-600">
                    Log into your RenderReply dashboard. Navigate to the <strong>Settings</strong> or <strong>Integrations</strong> page. Locate your connected Instagram account and click "Disconnect". This immediately stops all automation and deletes the active access tokens from our live database.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-6 border border-slate-100 rounded-2xl hover:border-slate-300 transition-colors">
                <div className="flex-shrink-0 w-10 h-10 bg-slate-100 text-black font-black rounded-full flex items-center justify-center">2</div>
                <div>
                  <h3 className="text-lg font-bold text-black flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-slate-400" /> Revoking Meta Permissions</h3>
                  <p className="mt-2 text-slate-600">
                    To completely remove RenderReply's authorization, go to your personal Facebook/Meta account settings. Navigate to <strong>Settings & Privacy {'>'} Business Integrations</strong>. Locate "RenderReply" in the list and click "Remove".
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-6 border border-red-50 bg-red-50/50 rounded-2xl hover:border-red-100 transition-colors">
                <div className="flex-shrink-0 w-10 h-10 bg-red-100 text-red-600 font-black rounded-full flex items-center justify-center">3</div>
                <div>
                  <h3 className="text-lg font-bold text-red-600 flex items-center gap-2"><Trash2 className="w-4 h-4" /> Requesting Permanent Deletion</h3>
                  <p className="mt-2 text-slate-600">
                    You can initiate full account deletion directly within the RenderReply dashboard under <strong>Account Settings {'>'} Danger Zone {'>'} Delete Account</strong>. Alternatively, you can submit a deletion request to our support team.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4">Alternative Deletion Methods</h2>
            <p className="mb-4">Users can also request deletion through the following support channels:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Email:</strong> Send an email from your registered address to <strong>renderreply@gmail.com</strong> with the subject line "Data Deletion Request".</li>
              <li><strong>Support System:</strong> Open a ticket through our in-app customer support widget.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4">Deletion Timelines & Data Retention</h2>
            <p className="mb-4">
              Upon receiving your request or initiating deletion via the dashboard, your account access will be revoked immediately. The complete eradication of your data (including automation logs, user profiles, and API connections) from our active databases typically occurs within <strong>7 business days</strong>.
            </p>
            <p className="mb-4 font-bold text-black">Important Exceptions:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Encrypted Backups:</strong> Some of your data may remain temporarily in secure, encrypted server backups for up to <strong>30 days</strong> before being automatically overwritten.</li>
              <li><strong>Legal & Security Retention:</strong> We may retain basic billing records, dispute logs, or information necessary to comply with legal obligations, resolve disputes, and enforce our agreements. This retained data is strictly isolated and not used for any other purpose.</li>
            </ul>
          </section>

          <section className="pt-8 border-t border-slate-100">
            <h2 className="text-2xl font-black text-black mb-4">Need Help?</h2>
            <p className="mb-4">
              If you face any issues while attempting to delete your data or disconnect your Meta account, our team is ready to assist you.
            </p>
            <a href="mailto:renderreply@gmail.com" className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-slate-800 transition-colors">
              <Mail className="w-4 h-4" /> Contact Support
            </a>
          </section>
        </article>
      </main>
    </div>
  );
}
