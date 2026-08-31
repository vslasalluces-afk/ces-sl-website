// Payment Providers Index
// CES supports multiple payment providers to serve donors globally

export * from "./stripe";
export * from "./paypal";
export * from "./flutterwave";

export type PaymentProvider = "stripe" | "paypal" | "flutterwave";

export interface DonationIntent {
  provider: PaymentProvider;
  amount: number; // in cents
  currency: string;
  donorEmail: string;
  donorName: string;
  donorCountry?: string;
  programmeId?: number;
  campaignId?: number;
  isRecurring: boolean;
  recurringInterval?: "month" | "quarter" | "year";
  message?: string;
  communicationConsent: boolean;
}

// Determine the best payment provider based on donor location
export function selectPaymentProvider(country: string): PaymentProvider {
  // African countries - prefer Flutterwave
  const africanCountries = [
    "SL", // Sierra Leone
    "NG", // Nigeria
    "GH", // Ghana
    "KE", // Kenya
    "TZ", // Tanzania
    "UG", // Uganda
    "ZA", // South Africa
    "RW", // Rwanda
    "CM", // Cameroon
    "CI", // Côte d'Ivoire
  ];

  if (africanCountries.includes(country)) {
    return "flutterwave";
  }

  // Default to Stripe for international donations
  return "stripe";
}

// Check if a payment provider is configured
export function isProviderConfigured(provider: PaymentProvider): boolean {
  switch (provider) {
    case "stripe":
      return !!process.env.STRIPE_SECRET_KEY;
    case "paypal":
      return !!(
        process.env.PAYPAL_CLIENT_ID && process.env.PAYPAL_CLIENT_SECRET
      );
    case "flutterwave":
      return !!(
        process.env.FLUTTERWAVE_SECRET_KEY && process.env.FLUTTERWAVE_PUBLIC_KEY
      );
    default:
      return false;
  }
}

// Get all configured providers
export function getConfiguredProviders(): PaymentProvider[] {
  const providers: PaymentProvider[] = [];

  if (isProviderConfigured("stripe")) providers.push("stripe");
  if (isProviderConfigured("paypal")) providers.push("paypal");
  if (isProviderConfigured("flutterwave")) providers.push("flutterwave");

  return providers;
}
