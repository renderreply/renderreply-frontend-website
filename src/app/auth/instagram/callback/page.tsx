"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { api } from "@/lib/api";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    const code = searchParams.get("code");
    if (code && session) {
      connectAccount(code);
    } else if (!code) {
      setStatus("error");
      setError("No authorization code received from Instagram.");
    }
  }, [searchParams, session]);

  const connectAccount = async (code: string) => {
    try {
      await api.post(`/instagram/connect`, { code }, {
        headers: { Authorization: `Bearer ${(session as any)?.accessToken}` }
      });
      setStatus("success");
      setTimeout(() => router.push("/dashboard"), 3000);
    } catch (err: any) {
      // Silence error to prevent Next.js dev overlay
      setStatus("error");
      setError(err.response?.data?.error || "Failed to connect Instagram account.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-xl border border-border text-center">
        {status === "loading" && (
          <div className="space-y-6">
            <Loader2 className="w-16 h-16 text-primary animate-spin mx-auto" />
            <h1 className="text-2xl font-bold">Connecting your account...</h1>
            <p className="text-muted-foreground">Please wait while we link your Instagram profile.</p>
          </div>
        )}

        {status === "success" && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
            <h1 className="text-2xl font-bold text-emerald-600">Success!</h1>
            <p className="text-muted-foreground">Your Instagram account is now connected. Redirecting you to the dashboard...</p>
          </div>
        )}

        {status === "error" && (
          <div className="space-y-6 animate-in zoom-in duration-300">
            <XCircle className="w-16 h-16 text-rose-500 mx-auto" />
            <h1 className="text-2xl font-bold text-rose-600">Connection Failed</h1>
            <p className="text-muted-foreground">{error}</p>
            <button 
              onClick={() => router.push("/dashboard")}
              className="px-6 py-2 bg-primary text-white rounded-xl font-bold"
            >
              Back to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function InstagramCallback() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    }>
      <CallbackContent />
    </Suspense>
  );
}
