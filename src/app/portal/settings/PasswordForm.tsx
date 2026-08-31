"use client";

import { useState } from "react";
import { CheckCircle, AlertCircle } from "lucide-react";

export default function PasswordForm() {
  const [current, setCurrent] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (newPw !== confirm) {
      setMessage({ type: "error", text: "New passwords do not match." });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/portal/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword: current, newPassword: newPw }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: "success", text: "Password changed successfully." });
        setCurrent(""); setNewPw(""); setConfirm("");
      } else {
        setMessage({ type: "error", text: data.error || "Failed to change password." });
      }
    } catch {
      setMessage({ type: "error", text: "An error occurred." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-md">
      {message && (
        <div className={`rounded-xl p-4 flex items-start gap-3 ${message.type === "success" ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
          {message.type === "success" ? <CheckCircle className="w-5 h-5 text-green-600 shrink-0" /> : <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />}
          <p className={`text-sm ${message.type === "success" ? "text-green-700" : "text-red-700"}`}>{message.text}</p>
        </div>
      )}

      <div>
        <label htmlFor="pw-current" className="block text-sm font-medium text-charcoal mb-1">Current Password</label>
        <input id="pw-current" type="password" value={current} onChange={(e) => setCurrent(e.target.value)} required className="w-full px-4 py-3 border border-peach-200 rounded-xl text-charcoal focus:ring-2 focus:ring-peach focus:border-peach" />
      </div>
      <div>
        <label htmlFor="pw-new" className="block text-sm font-medium text-charcoal mb-1">New Password</label>
        <input id="pw-new" type="password" value={newPw} onChange={(e) => setNewPw(e.target.value)} required className="w-full px-4 py-3 border border-peach-200 rounded-xl text-charcoal focus:ring-2 focus:ring-peach focus:border-peach" />
        <p className="text-xs text-charcoal/50 mt-1">Min 8 characters, with uppercase, lowercase, and number</p>
      </div>
      <div>
        <label htmlFor="pw-confirm" className="block text-sm font-medium text-charcoal mb-1">Confirm New Password</label>
        <input id="pw-confirm" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required className="w-full px-4 py-3 border border-peach-200 rounded-xl text-charcoal focus:ring-2 focus:ring-peach focus:border-peach" />
      </div>
      <button type="submit" disabled={loading} className="btn-primary inline-flex items-center gap-2 disabled:opacity-50">
        {loading ? "Changing..." : "Change Password"}
      </button>
    </form>
  );
}
