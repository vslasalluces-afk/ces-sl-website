// PayPal Integration for CES Donations
// This module provides PayPal payment processing scaffolding

interface PayPalConfig {
  clientId: string;
  clientSecret: string;
  mode: "sandbox" | "live";
}

interface PayPalOrder {
  orderId: string;
  approvalUrl: string;
}

interface PayPalOrderDetails {
  id: string;
  status: string;
  payer?: {
    email_address?: string;
    name?: {
      given_name?: string;
      surname?: string;
    };
  };
  purchase_units?: Array<{
    amount?: {
      value?: string;
      currency_code?: string;
    };
  }>;
}

// Get PayPal configuration from environment
function getConfig(): PayPalConfig | null {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  const mode = process.env.PAYPAL_MODE === "live" ? "live" : "sandbox";

  if (!clientId || !clientSecret) {
    return null;
  }

  return { clientId, clientSecret, mode };
}

// Get PayPal API base URL
function getBaseUrl(mode: "sandbox" | "live"): string {
  return mode === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";
}

// Get access token
async function getAccessToken(): Promise<string | null> {
  const config = getConfig();
  if (!config) return null;

  try {
    const auth = Buffer.from(
      `${config.clientId}:${config.clientSecret}`
    ).toString("base64");

    const response = await fetch(
      `${getBaseUrl(config.mode)}/v1/oauth2/token`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "grant_type=client_credentials",
      }
    );

    const data = await response.json();
    return data.access_token || null;
  } catch (error) {
    console.error("PayPal auth error:", error);
    return null;
  }
}

// Create a PayPal order for donation
export async function createPayPalOrder(params: {
  amount: number;
  currency: string;
  description?: string;
  returnUrl: string;
  cancelUrl: string;
}): Promise<PayPalOrder | null> {
  const config = getConfig();
  if (!config) {
    console.error("PayPal not configured");
    return null;
  }

  const accessToken = await getAccessToken();
  if (!accessToken) return null;

  try {
    const response = await fetch(
      `${getBaseUrl(config.mode)}/v2/checkout/orders`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code: params.currency.toUpperCase(),
                value: (params.amount / 100).toFixed(2), // Convert cents to dollars
              },
              description: params.description || "Donation to CES",
            },
          ],
          application_context: {
            brand_name: "Christian Extension Services",
            landing_page: "BILLING",
            user_action: "PAY_NOW",
            return_url: params.returnUrl,
            cancel_url: params.cancelUrl,
          },
        }),
      }
    );

    const data = await response.json();

    if (data.id) {
      const approvalLink = data.links?.find(
        (link: { rel: string }) => link.rel === "approve"
      );

      return {
        orderId: data.id,
        approvalUrl: approvalLink?.href || "",
      };
    }

    return null;
  } catch (error) {
    console.error("PayPal order creation error:", error);
    return null;
  }
}

// Capture a PayPal order after approval
export async function capturePayPalOrder(
  orderId: string
): Promise<PayPalOrderDetails | null> {
  const config = getConfig();
  if (!config) return null;

  const accessToken = await getAccessToken();
  if (!accessToken) return null;

  try {
    const response = await fetch(
      `${getBaseUrl(config.mode)}/v2/checkout/orders/${orderId}/capture`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("PayPal capture error:", error);
    return null;
  }
}

// Get order details
export async function getPayPalOrderDetails(
  orderId: string
): Promise<PayPalOrderDetails | null> {
  const config = getConfig();
  if (!config) return null;

  const accessToken = await getAccessToken();
  if (!accessToken) return null;

  try {
    const response = await fetch(
      `${getBaseUrl(config.mode)}/v2/checkout/orders/${orderId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return await response.json();
  } catch (error) {
    console.error("PayPal order details error:", error);
    return null;
  }
}

// Verify webhook signature
export function verifyPayPalWebhook(
  headers: Record<string, string>,
  body: string
): boolean {
  // In production, implement proper webhook signature verification
  // using PayPal's webhook verification API
  const webhookId = process.env.PAYPAL_WEBHOOK_ID;
  if (!webhookId) {
    console.warn("PayPal webhook verification skipped - no webhook ID configured");
    return false;
  }

  // TODO: Implement actual signature verification
  // This requires calling PayPal's verify-webhook-signature endpoint
  return true;
}
