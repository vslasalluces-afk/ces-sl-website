import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const title = slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  return { title, description: `CES event: ${title}` };
}

export default async function EventDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const title = slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  return (
    <section className="section-padding">
      <div className="container-narrow mx-auto">
        <Link href="/events" className="inline-flex items-center gap-2 text-muted-green text-sm mb-6 hover:text-green-700 transition-colors">
          <ArrowLeft className="w-4 h-4" /> All Events
        </Link>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-deep-brown mb-6">{title}</h1>
        <p className="text-charcoal/70 leading-relaxed mb-8">
          Event details will be available once CES publishes the information through the content management system.
        </p>
        <Link href="/events" className="btn-secondary text-sm">Back to Events</Link>
      </div>
    </section>
  );
}
