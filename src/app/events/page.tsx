import type { Metadata } from "next";
import { Calendar, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming and past events from CES – training sessions, community programmes, fundraising events and development activities in Sierra Leone.",
};

export default function EventsPage() {
  return (
    <>
      <section className="bg-cream section-padding" aria-labelledby="events-hero">
        <div className="container-wide mx-auto">
          <div className="max-w-2xl">
            <span className="inline-block text-sm font-semibold text-muted-green uppercase tracking-wider mb-3">Calendar</span>
            <h1 id="events-hero" className="text-4xl md:text-5xl font-serif font-bold text-deep-brown mb-6">Events</h1>
            <p className="text-lg text-charcoal/80 leading-relaxed">
              Training sessions, community programmes, fundraising events and development activities from CES.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide mx-auto">
          <div className="text-center py-16">
            <Calendar className="w-12 h-12 text-peach mx-auto mb-4" />
            <h2 className="font-serif text-2xl font-bold text-deep-brown mb-4">Events Coming Soon</h2>
            <p className="text-charcoal/70 max-w-md mx-auto">
              CES events will be published here as they are confirmed. Check back for upcoming training sessions, community activities and development events.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
