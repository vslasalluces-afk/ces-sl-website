// Flutterwave Integration for CES Donations
// Flutterwave is popular in Africa and supports Sierra Leone mobile money

interface FlutterwaveConfig {
  secretKey: string;
  publicKey: string;
  encryptionKey: string;
}

interface FlutterwavePaymentLink {
  status: string;
  message: string;
  data?: {
    link: string;
    tx_ref: string;
  };
}

interface FlutterwaveTransaction {
  id: number;
  tx_ref: string;
  flw_ref: string;
  amount: number;
  currency: string;
  status: string;
  payment_type: string;
  customer: {
    email: string;
    name: string;
    phone_number?: string;
  };
}

// Get Flutterwave configuration
function getConfig(): FlutterwaveConfig | null {
  const secretKey = process.env.FLUTTERWAVE_SECRET_KEY;
  const publicKey = process.env.FLUTTERWAVE_PUBLIC_KEY;
  const encryptionKey = process.env.FLUTTERWAVE_ENCRYPTION_KEY;

  if (!secretKey || !publicKey) {
    return null;
  }

  return { secretKey, publicKey, encryptionKey: encryptionKey || "" };
}

const FLUTTERWAVE_BASE_URL = "https://api.flutterwave.com/v3";

// Create a payment link for donations
export async function createFlutterwavePaymentLink(params: {
  amount: number;
  currency: "SLE" | "USD" | "GBP" | "EUR";
  email: string;
  name: string;
  phone?: string;
  txRef: string;
  redirectUrl: string;
  title?: string;
  description?: string;
  meta?: Record<string, string | number>;
}): Promise<FlutterwavePaymentLink | null> {
  const config = getConfig();
  if (!config) {
    console.error("Flutterwave not configured");
    return null;
  }

  try {
    const response = await fetch(`${FLUTTERWAVE_BASE_URL}/payments`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.secretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tx_ref: params.txRef,
        amount: params.amount / 100, // Convert cents to currency unit
        currency: params.currency,
        redirect_url: params.redirectUrl,
        customer: {
          email: params.email,
          name: params.name,
          phonenumber: params.phone,
        },
        customizations: {
          title: params.title || "Donation to CES",
          description: params.description || "Supporting community development in Sierra Leone",
          logo: "https://cessl.org/logo.png",
        },
        meta: params.meta,
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Flutterwave payment link error:", error);
    return null;
  }
}

// Verify a transaction
export async function verifyFlutterwaveTransaction(
  transactionId: string
): Promise<FlutterwaveTransaction | null> {
  const config = getConfig();
  if (!config) return null;

  try {
    const response = await fetch(
      `${FLUTTERWAVE_BASE_URL}/transactions/${transactionId}/verify`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${config.secretKey}`,
        },
      }
    );

    const data = await response.json();

    if (data.status === "success") {
      return data.data;
    }

    return null;
  } catch (error) {
    console.error("Flutterwave verification error:", error);
    return null;
  }
}

// Verify webhook hash
export function verifyFlutterwaveWebhook(
  hash: string,
  secretHash: string
): boolean {
  const webhookSecretHash = process.env.FLUTTERWAVE_WEBHOOK_HASH;

  if (!webhookSecretHash) {
    console.warn("Flutterwave webhook hash not configured");
    return false;
  }

  return hash === webhookSecretHash;
}

// Get supported payment methods for a country
export async function getSupportedPaymentMethods(
  country: string
): Promise<string[]> {
  // Sierra Leone supported methods
  if (country === "SL") {
    return ["card", "mobilemoneysierra"]; // Mobile money support
  }

  // Default international methods
  return ["card", "banktransfer"];
}

// Generate a unique transaction reference
export function generateTxRef(): string {
  return `CES-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
