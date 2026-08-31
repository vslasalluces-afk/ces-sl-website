"use client";

import { useState } from "react";
import { User, Globe, Mail, Phone, Bell, Save, CheckCircle, AlertCircle } from "lucide-react";

export default function ProfileForm({
  initialName,
  email,
  initialCountry,
  initialPhone,
  initialConsent,
}: {
  initialName: string;
  email: string;
  initialCountry: string;
  initialPhone: string;
  initialConsent: boolean;
}) {
  const [name, setName] = useState(initialName);
  const [country, setCountry] = useState(initialCountry);
  const [phone, setPhone] = useState(initialPhone);
  const [consent, setConsent] = useState(initialConsent);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/portal/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, country, phone, communicationConsent: consent }),
      });
      const data = await res.json();
      setMessage(res.ok
        ? { type: "success", text: "Profile updated successfully." }
        : { type: "error", text: data.error || "Failed to update." });
    } catch {
      setMessage({ type: "error", text: "An error occurred." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {message && (
        <div className={`rounded-xl p-4 flex items-start gap-3 ${message.type === "success" ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
          {message.type === "success" ? <CheckCircle className="w-5 h-5 text-green-600 shrink-0" /> : <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />}
          <p className={`text-sm ${message.type === "success" ? "text-green-700" : "text-red-700"}`}>{message.text}</p>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="pf-name" className="block text-sm font-medium text-charcoal mb-1">Full Name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/40" />
            <input id="pf-name" type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-peach-200 rounded-xl text-charcoal focus:ring-2 focus:ring-peach focus:border-peach" />
          </div>
        </div>
        <div>
          <label htmlFor="pf-email" className="block text-sm font-medium text-charcoal mb-1">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/40" />
            <input id="pf-email" type="email" value={email} disabled className="w-full pl-10 pr-4 py-3 border border-peach-200 rounded-xl text-charcoal/50 bg-cream cursor-not-allowed" />
          </div>
          <p className="text-xs text-charcoal/40 mt-1">Contact CES to change your email.</p>
        </div>
        <div>
          <label htmlFor="pf-country" className="block text-sm font-medium text-charcoal mb-1">Country</label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/40" />
            <input id="pf-country" type="text" value={country} onChange={(e) => setCountry(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-peach-200 rounded-xl text-charcoal focus:ring-2 focus:ring-peach focus:border-peach" />
          </div>
        </div>
        <div>
          <label htmlFor="pf-phone" className="block text-sm font-medium text-charcoal mb-1">Phone</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/40" />
            <input id="pf-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-peach-200 rounded-xl text-charcoal focus:ring-2 focus:ring-peach focus:border-peach" />
          </div>
        </div>
      </div>

      <div id="communications" className="pt-4 border-t border-peach-100">
        <h3 className="font-serif text-lg font-bold text-deep-brown mb-3 flex items-center gap-2">
          <Bell className="w-5 h-5 text-muted-green" /> Communication Preferences
        </h3>
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 w-4 h-4 text-muted-green border-peach-200 rounded focus:ring-peach" />
          <span className="text-sm text-charcoal/70">I would like to receive email updates about CES programmes, community stories and impact reports.</span>
        </label>
      </div>

      <button type="submit" disabled={loading} className="btn-primary inline-flex items-center gap-2 disabled:opacity-50">
        {loading ? <>Saving...</> : <><Save className="w-4 h-4" /> Save Changes</>}
      </button>
    </form>
  );
}
