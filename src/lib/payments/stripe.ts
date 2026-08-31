import Stripe from "stripe";

// Initialize Stripe with secret key from environment
const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2026-08-26.dahlia",
    })
  : null;

export interface CreateDonationSessionParams {
  amount: number;
  currency: "usd" | "gbp" | "eur";
  donorEmail?: string;
  donorName?: string;
  programmeId?: number;
  campaignId?: number;
  isRecurring?: boolean;
  recurringInterval?: "month" | "year";
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, string>;
}

export interface DonationSession {
  sessionId: string;
  url: string;
}

// Create a Stripe Checkout session for donations
export async function createDonationSession(
  params: CreateDonationSessionParams,
): Promise<DonationSession | null> {
  if (!stripe) {
    console.error("Stripe not configured - missing STRIPE_SECRET_KEY");
    return null;
  }

  try {
    const {
      amount,
      currency,
      donorEmail,
      donorName,
      programmeId,
      campaignId,
      isRecurring,
      recurringInterval,
      successUrl,
      cancelUrl,
      metadata,
    } = params;

    // Build line items
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        price_data: {
          currency,
          product_data: {
            name: "Donation to CES",
            description: "Supporting community development in Sierra Leone",
          },
          unit_amount: amount, // Amount in cents
          ...(isRecurring && {
            recurring: {
              interval: recurringInterval || "month",
            },
          }),
        },
        quantity: 1,
      },
    ];

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: isRecurring ? "subscription" : "payment",
      line_items: lineItems,
      success_url: successUrl,
      cancel_url: cancelUrl,
      customer_email: donorEmail,
      metadata: {
        donorName: donorName || "",
        programmeId: programmeId?.toString() || "",
        campaignId: campaignId?.toString() || "",
        ...metadata,
      },
      payment_intent_data: isRecurring
        ? undefined
        : {
            metadata: {
              donorName: donorName || "",
              type: "ces_donation",
            },
          },
    };

    const session = await stripe.checkout.sessions.create(sessionParams);

    return {
      sessionId: session.id,
      url: session.url || "",
    };
  } catch (error) {
    console.error("Stripe session creation error:", error);
    return null;
  }
}

// Verify webhook signature
export function verifyWebhookSignature(
  payload: string | Buffer,
  signature: string,
): Stripe.Event | null {
  if (!stripe || !process.env.STRIPE_WEBHOOK_SECRET) {
    return null;
  }

  try {
    return stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (error) {
    console.error("Webhook signature verification failed:", error);
    return null;
  }
}

// Retrieve payment intent
export async function getPaymentIntent(
  paymentIntentId: string,
): Promise<Stripe.PaymentIntent | null> {
  if (!stripe) return null;

  try {
    return await stripe.paymentIntents.retrieve(paymentIntentId);
  } catch (error) {
    console.error("Error retrieving payment intent:", error);
    return null;
  }
}

// Cancel subscription
export async function cancelSubscription(
  subscriptionId: string,
): Promise<boolean> {
  if (!stripe) return false;

  try {
    await stripe.subscriptions.cancel(subscriptionId);
    return true;
  } catch (error) {
    console.error("Error canceling subscription:", error);
    return false;
  }
}

// Get customer's subscriptions
export async function getCustomerSubscriptions(
  customerId: string,
): Promise<Stripe.Subscription[]> {
  if (!stripe) return [];

  try {
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: "active",
    });
    return subscriptions.data;
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    return [];
  }
}

export { stripe };
