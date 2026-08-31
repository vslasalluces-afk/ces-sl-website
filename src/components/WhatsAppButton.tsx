"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { SITE, WHATSAPP_MESSAGES } from "@/lib/constants";

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);

  const makeUrl = (message: string) =>
    `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;

  const options = [
    { label: "General Enquiry", message: WHATSAPP_MESSAGES.general },
    { label: "Donation Enquiry", message: WHATSAPP_MESSAGES.donation },
    { label: "Partnership Enquiry", message: WHATSAPP_MESSAGES.partnership },
    { label: "Volunteer Enquiry", message: WHATSAPP_MESSAGES.volunteer },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40" role="complementary" aria-label="WhatsApp contact">
      {open && (
        <div className="mb-3 bg-white rounded-xl shadow-xl border border-peach-100 p-4 w-72">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-serif font-bold text-deep-brown text-sm">
              Contact CES on WhatsApp
            </h3>
            <button
              onClick={() => setOpen(false)}
              className="text-charcoal/50 hover:text-charcoal"
              aria-label="Close WhatsApp menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-2">
            {options.map((opt) => (
              <a
                key={opt.label}
                href={makeUrl(opt.message)}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3 py-2 text-sm text-charcoal bg-green-100 hover:bg-green-200 rounded-lg transition-colors"
              >
                {opt.label}
              </a>
            ))}
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-muted-green text-white shadow-lg hover:bg-green-700 transition-colors flex items-center justify-center"
        aria-label="Contact CES on WhatsApp"
        aria-expanded={open}
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    </div>
  );
}
