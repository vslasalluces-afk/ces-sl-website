import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { donationRecords } from "@/db/schema";
import {
  createDonationSession,
  createPayPalOrder,
  createFlutterwavePaymentLink,
  generateTxRef,
  selectPaymentProvider,
  isProviderConfigured,
  type PaymentProvider,
} from "@/lib/payments";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      amount,
      currency,
      donorEmail,
      donorName,
      donorCountry,
      programmeId,
      campaignId,
      isRecurring,
      recurringInterval,
      message,
      communicationConsent,
      preferredProvider,
    } = body;

    // Validate required fields
    if (!amount || amount < 100) {
      // Minimum $1 (100 cents)
      return NextResponse.json(
        { error: "Invalid donation amount" },
        { status: 400 }
      );
    }

    if (!donorEmail || !donorName) {
      return NextResponse.json(
        { error: "Donor email and name are required" },
        { status: 400 }
      );
    }

    // Select payment provider
    let provider: PaymentProvider =
      preferredProvider || selectPaymentProvider(donorCountry || "US");

    // Fall back to another provider if selected one isn't configured
    if (!isProviderConfigured(provider)) {
      if (isProviderConfigured("stripe")) provider = "stripe";
      else if (isProviderConfigured("paypal")) provider = "paypal";
      else if (isProviderConfigured("flutterwave")) provider = "flutterwave";
      else {
        return NextResponse.json(
          {
            error: "Payment processing is not yet available",
            message:
              "CES is completing payment provider setup. Please contact us via WhatsApp to arrange your donation.",
          },
          { status: 503 }
        );
      }
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://cessl.org";
    const successUrl = `${baseUrl}/donate/thank-you?session={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${baseUrl}/donate?cancelled=true`;

    let sessionResult: { sessionId?: string; url: string } | null = null;

    // Create payment session based on provider
    switch (provider) {
      case "stripe": {
        const stripeSession = await createDonationSession({
          amount,
          currency: currency.toLowerCase() as "usd" | "gbp" | "eur",
          donorEmail,
          donorName,
          programmeId,
          campaignId,
          isRecurring,
          recurringInterval:
            recurringInterval === "quarter" ? "month" : recurringInterval,
          successUrl,
          cancelUrl,
          metadata: {
            source: "ces-website",
            communicationConsent: communicationConsent ? "yes" : "no",
          },
        });

        if (stripeSession) {
          sessionResult = {
            sessionId: stripeSession.sessionId,
            url: stripeSession.url,
          };
        }
        break;
      }

      case "paypal": {
        const paypalOrder = await createPayPalOrder({
          amount,
          currency: currency.toUpperCase(),
          description: `Donation to CES${programmeId ? ` - Programme ${programmeId}` : ""}`,
          returnUrl: successUrl.replace("{CHECKOUT_SESSION_ID}", "paypal"),
          cancelUrl,
        });

        if (paypalOrder) {
          sessionResult = {
            sessionId: paypalOrder.orderId,
            url: paypalOrder.approvalUrl,
          };
        }
        break;
      }

      case "flutterwave": {
        const txRef = generateTxRef();
        const flwLink = await createFlutterwavePaymentLink({
          amount,
          currency: currency.toUpperCase() as "SLE" | "USD" | "GBP" | "EUR",
          email: donorEmail,
          name: donorName,
          txRef,
          redirectUrl: successUrl.replace("{CHECKOUT_SESSION_ID}", txRef),
          title: "Donation to CES",
          description: "Supporting community development in Sierra Leone",
          meta: {
            programmeId: programmeId || 0,
            campaignId: campaignId || 0,
          },
        });

        if (flwLink?.data) {
          sessionResult = {
            sessionId: txRef,
            url: flwLink.data.link,
          };
        }
        break;
      }
    }

    if (!sessionResult || !sessionResult.url) {
      return NextResponse.json(
        { error: "Failed to create payment session" },
        { status: 500 }
      );
    }

    // Create pending donation record
    await db.insert(donationRecords).values({
      donorName,
      donorEmail,
      amount,
      currency: currency.toUpperCase(),
      type: isRecurring ? "recurring" : "one-off",
      programmeId: programmeId || null,
      campaignId: campaignId || null,
      paymentProvider: provider,
      paymentStatus: "pending",
      transactionId: sessionResult.sessionId,
      message: message || null,
      communicationConsent: communicationConsent || false,
    });

    return NextResponse.json({
      provider,
      sessionId: sessionResult.sessionId,
      url: sessionResult.url,
    });
  } catch (error) {
    console.error("Donation session error:", error);
    return NextResponse.json(
      { error: "An error occurred processing your donation" },
      { status: 500 }
    );
  }
}
