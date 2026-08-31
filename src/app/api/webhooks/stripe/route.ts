import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { donationRecords } from "@/db/schema";
import { eq } from "drizzle-orm";
import { verifyWebhookSignature } from "@/lib/payments/stripe";

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "Missing signature" },
        { status: 400 }
      );
    }

    // Verify webhook signature
    const event = verifyWebhookSignature(body, signature);

    if (!event) {
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 400 }
      );
    }

    // Handle different event types
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const transactionId = session.id;

        // Update donation record
        await db
          .update(donationRecords)
          .set({
            paymentStatus: "completed",
          })
          .where(eq(donationRecords.transactionId, transactionId));

        // TODO: Send confirmation email
        // TODO: Update campaign raised amount if applicable

        console.log(`Donation completed: ${transactionId}`);
        break;
      }

      case "checkout.session.expired": {
        const session = event.data.object;
        const transactionId = session.id;

        await db
          .update(donationRecords)
          .set({
            paymentStatus: "expired",
          })
          .where(eq(donationRecords.transactionId, transactionId));

        console.log(`Donation session expired: ${transactionId}`);
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object;

        await db
          .update(donationRecords)
          .set({
            paymentStatus: "failed",
          })
          .where(eq(donationRecords.transactionId, paymentIntent.id));

        console.log(`Payment failed: ${paymentIntent.id}`);
        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated": {
        // Handle recurring donation updates
        const subscription = event.data.object;
        console.log(`Subscription event: ${subscription.id}`);
        break;
      }

      case "customer.subscription.deleted": {
        // Handle subscription cancellation
        const subscription = event.data.object;
        console.log(`Subscription cancelled: ${subscription.id}`);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Stripe webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
