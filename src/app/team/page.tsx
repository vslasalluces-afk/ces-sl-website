import type { Metadata } from "next";
import { TEAM_MEMBERS } from "@/lib/team-data";
import { STOCK_IMAGES } from "@/lib/constants";
import { GraduationCap, Briefcase, Quote } from "lucide-react";

export const metadata: Metadata = {
  title: "Meet Our Team",
  description:
    "Meet the dedicated team at Christian Extension Services – professionals committed to sustainable community development across Sierra Leone.",
};

export default function TeamPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-20 md:py-28" aria-labelledby="team-hero">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/teambanner.jpg')",
            backgroundPosition: "center top",
          }}
          role="img"
          aria-label="CES team members in a community setting"
        />
        <div className="absolute inset-0 bg-deep-brown/70" />
        <div className="relative z-10 container-wide mx-auto px-4 md:px-8">
          <div className="max-w-2xl">
            <span className="inline-block text-sm font-semibold text-peach uppercase tracking-wider mb-3">
              Our People
            </span>
            <h1
              id="team-hero"
              className="text-4xl md:text-5xl font-serif font-bold text-warm-white mb-6"
            >
              Meet Our Team
            </h1>
            <p className="text-lg text-warm-white/90 leading-relaxed">
              Dedicated professionals committed to sustainable community
              development across Sierra Leone.
            </p>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="section-padding" aria-label="Team members">
        <div className="container-wide mx-auto">
          <div className="space-y-16">
            {TEAM_MEMBERS.map((member) => (
              <article
                key={member.slug}
                id={member.slug}
                className="scroll-mt-24"
              >
                <div className="bg-white rounded-2xl shadow-sm border border-peach-100 overflow-hidden">
                  <div className="grid lg:grid-cols-3 gap-0">
                    {/* Profile sidebar */}
                    <div className="bg-cream p-8 lg:p-10 flex flex-col items-center text-center">
                      <div className="w-28 h-28 rounded-full overflow-hidden bg-cream flex items-center justify-center mb-4 shadow-md">
                        {member.profileImage ? (
                          <img
                            src={member.profileImage}
                            alt={`${member.fullName} - ${member.jobTitle}`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <span className="text-deep-brown font-serif font-bold text-3xl">
                            {member.fullName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        )}
                      </div>
                      <h2 className="font-serif text-xl font-bold text-deep-brown mb-1">
                        {member.fullName}
                      </h2>
                      <p className="text-muted-green font-medium text-sm mb-1">
                        {member.jobTitle}
                      </p>
                      {member.department && (
                        <p className="text-charcoal/50 text-xs mb-4">
                          {member.department}
                        </p>
                      )}

                      {member.quote && (
                        <div className="mt-auto pt-4 border-t border-peach-200 w-full">
                          <Quote className="w-5 h-5 text-peach mx-auto mb-2" />
                          <blockquote className="text-charcoal/70 text-xs italic leading-relaxed">
                            &ldquo;{member.quote}&rdquo;
                          </blockquote>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="lg:col-span-2 p-8 lg:p-10">
                      <div className="mb-6">
                        <h3 className="font-serif text-lg font-bold text-deep-brown mb-3">
                          Biography
                        </h3>
                        {member.fullBio.split("\n\n").map((para, i) => (
                          <p
                            key={i}
                            className="text-charcoal/80 text-sm leading-relaxed mb-3"
                          >
                            {para}
                          </p>
                        ))}
                      </div>

                      {member.education.length > 0 && (
                        <div className="mb-6">
                          <h3 className="font-serif text-lg font-bold text-deep-brown mb-3 flex items-center gap-2">
                            <GraduationCap className="w-5 h-5 text-muted-green" />
                            Education & Qualifications
                          </h3>
                          <ul className="space-y-1">
                            {member.education.map((edu) => (
                              <li
                                key={edu}
                                className="flex items-start gap-2 text-sm text-charcoal/80"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-peach shrink-0 mt-2" />
                                {edu}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {member.experience && member.experience.length > 0 && (
                        <div>
                          <h3 className="font-serif text-lg font-bold text-deep-brown mb-3 flex items-center gap-2">
                            <Briefcase className="w-5 h-5 text-muted-green" />
                            Professional Experience
                          </h3>
                          <ul className="space-y-2">
                            {member.experience.map((exp) => (
                              <li
                                key={exp.period}
                                className="text-sm text-charcoal/80"
                              >
                                <span className="font-medium text-charcoal">
                                  {exp.role}
                                </span>
                                <span className="text-charcoal/60">
                                  {" "}
                                  — {exp.org}, {exp.period}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
