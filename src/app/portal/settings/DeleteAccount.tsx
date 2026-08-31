"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export default function DeleteAccount() {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/portal/account", { method: "DELETE" });
      if (res.ok) {
        router.push("/portal/login?deleted=true");
      }
    } catch {
      setLoading(false);
    }
  };

  if (!showConfirm) {
    return (
      <button
        onClick={() => setShowConfirm(true)}
        className="inline-flex items-center gap-2 px-6 py-3 border-2 border-red-300 text-red-700 font-semibold rounded-xl hover:bg-red-50 transition-colors text-sm"
      >
        <Trash2 className="w-4 h-4" /> Request Account Deletion
      </button>
    );
  }

  return (
    <div className="bg-red-50 rounded-xl p-6 border border-red-200">
      <p className="text-red-700 text-sm font-medium mb-4">
        Are you sure? This will permanently delete your account. Your donation records will be anonymised.
      </p>
      <div className="flex gap-3">
        <button
          onClick={handleDelete}
          disabled={loading}
          className="px-6 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-colors text-sm disabled:opacity-50"
        >
          {loading ? "Deleting..." : "Yes, Delete My Account"}
        </button>
        <button
          onClick={() => setShowConfirm(false)}
          className="px-6 py-3 border-2 border-peach-200 text-charcoal font-semibold rounded-xl hover:bg-cream transition-colors text-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
