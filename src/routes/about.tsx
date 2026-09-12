import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  Eye,
  Heart,
  Building2,
  Award,
  Factory,
  FlaskConical,
  Warehouse,
} from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHeader, Reveal } from "@/components/site/Section";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Kohinoor Polytech" },
      {
        name: "description",
        content:
          "A sustainable polymer engineering company converting recycled polypropylene into premium industrial-grade granules.",
      },
      { property: "og:title", content: "About — Kohinoor Polytech" },
      {
        property: "og:description",
        content:
          "A sustainable polymer engineering company converting recycled polypropylene into premium granules.",
      },
    ],
  }),
  component: About,
});

const coreValues = [
  {
    title: "Purity & Consistency",
    desc: "Granules engineered to match virgin polymer specs with batch-to-batch consistency.",
  },
  {
    title: "Carbon Reduction",
    desc: "Measurable lifecycle emissions cuts for packaging, automotive & households.",
  },
  {
    title: "Global Trust",
    desc: "Reaching the highest peaks of excellence while safeguarding our planet.",
  },
];

const timeline = [
  { y: "2018", t: "Company founded" },
  { y: "2020", t: "PPCP production scaled" },
  { y: "2022", t: "Lab established" },
  { y: "2024", t: "Capacity doubled" },
  { y: "2026", t: "Circular-economy programme" },
];

const infra = [
  {
    icon: Factory,
    t: "Two Stage Extruder",
    d: "High-throughput lines with controlled MFI output.",
  },
  { icon: FlaskConical, t: "Polymer lab", d: "Full QC suite for MFI, density, impact and colour." },
  { icon: Warehouse, t: "Warehousing", d: "Climate-controlled storage and reliable logistics." },
];

const certs = [
  "ISO 9001:2015",
  "ISO 14001:2015",
  "REACH",
  "RoHS",
  "EPR Registered",
  "GRIS Certified",
];

const leaders = [
  {
    title: "Mohsin Memon",
    role: "Founder & CEO",
    badge: "Founder & CEO",
    image: "/Assets/leaders/leader-1.jpg",
    bio: "Steering Kohinoor Polytech's vision in sustainable polymer compounding, global client partnerships, and circular polymer innovation.",
  },
  {
    title: "Mustafa Memon",
    role: "Chief Operating Officer COO",
    badge: "Chief Operating Office COO",
    image: "/Assets/leaders/leader-2.jpg",
    bio: "Overseeing two-stage extrusion manufacturing, laboratory QC standards, and strategic nationwide industrial supply chains.",
  },
];

function About() {
  const [activeYearIdx, setActiveYearIdx] = useState(timeline.length - 1);

  return (
    <div>
      <PageHero
        eyebrow="About Kohinoor"
        title="A sustainable polymer engineering company."
        subtitle="We are engaged in the manufacturing and processing of high-quality plastic granules, specializing in Polypropylene (PP) and Post-Consumer Recycled (PCR) polymers. As a sustainable B2B supply chain partner, we convert plastic waste into premium, industrial-grade raw materials for the packaging, automotive, and household product industries."
      />

      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {/* OUR MISSION */}
          <Reveal delay={0.05}>
            <div className="glass card-lift relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-border/80 bg-gradient-to-br from-card/95 via-card/70 to-brand/5 p-7 md:p-9 shadow-lg shadow-black/5">
              <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-brand/10 blur-3xl pointer-events-none" />
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-brand/25 bg-brand/10 text-brand shadow-xs">
                    <Target className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-brand">
                    Our Mission
                  </span>
                </div>

                <h3 className="mt-5 font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                  Engineering sustainable granule replacements.
                </h3>

                <p className="mt-4 text-base md:text-lg leading-relaxed text-muted-foreground">
                  To manufacture high-quality, sustainable plastic granules that seamlessly replace
                  virgin polymers, empowering the packaging, automotive, and household industries to
                  reduce their carbon footprint.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-2 pt-6 border-t border-border/60">
                <span className="chip">Seamless Virgin Replacement</span>
                <span className="chip">Packaging & Automotive</span>
                <span className="chip">Carbon Reduction</span>
              </div>
            </div>
          </Reveal>

          {/* OUR VISION */}
          <Reveal delay={0.1}>
            <div className="glass card-lift relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-border/80 bg-gradient-to-br from-card/95 via-card/70 to-brand-green/5 p-7 md:p-9 shadow-lg shadow-black/5">
              <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-brand-green/10 blur-3xl pointer-events-none" />
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-brand-green/25 bg-brand-green/10 text-brand-green shadow-xs">
                    <Eye className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-green">
                    Our Vision
                  </span>
                </div>

                <h3 className="mt-5 font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                  A trusted global name for a greener world.
                </h3>

                <p className="mt-4 text-base md:text-lg leading-relaxed text-muted-foreground">
                  To build a global name that everyone trusts, showing the world that a business can
                  reach the highest peaks while keeping our earth green, safe, and beautiful for our
                  children and their future.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-2 pt-6 border-t border-border/60">
                <span className="chip">Global Trust</span>
                <span className="chip">Highest Peaks of Quality</span>
                <span className="chip">Green Future for Children</span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Core Values Bar */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {coreValues.map((v, i) => (
            <Reveal key={v.title} delay={0.15 + i * 0.05}>
              <div className="glass rounded-2xl p-5 border border-border/60">
                <div className="font-display font-semibold text-foreground">{v.title}</div>
                <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="border-t border-border">
        <SectionHeader
          eyebrow="Our story"
          title="From a Surat workshop to a national polymer manufacturer."
        />

        {/* Interactive Milestone Timeline */}
        <div className="mt-12">
          {/* Progress track for desktop */}
          <div className="relative mb-6 hidden md:block px-6">
            <div className="absolute top-1/2 left-6 right-6 h-[2px] -translate-y-1/2 bg-border/60" />
            <motion.div
              className="absolute top-1/2 left-6 h-[2px] -translate-y-1/2 bg-gradient-to-r from-brand via-brand-2 to-brand-green"
              animate={{ width: `${(activeYearIdx / (timeline.length - 1)) * 88}%` }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-5">
            {timeline.map((e, i) => {
              const isActive = i === activeYearIdx;
              return (
                <Reveal key={e.y} delay={i * 0.05}>
                  <button
                    type="button"
                    onClick={() => setActiveYearIdx(i)}
                    className={`glass card-lift group relative w-full rounded-2xl p-5 text-left transition-all duration-300 ${
                      isActive
                        ? "border-brand/70 bg-card/90 shadow-lg shadow-brand/10 ring-1 ring-brand/40"
                        : "hover:border-border hover:bg-card/60"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div
                        className={`font-numeric text-2xl font-bold transition-transform duration-200 ${isActive ? "text-gradient scale-105" : "text-muted-foreground group-hover:text-foreground"}`}
                      >
                        {e.y}
                      </div>
                      <div
                        className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${isActive ? "bg-brand ring-4 ring-brand/30 scale-125" : "bg-border/80 group-hover:bg-muted-foreground"}`}
                      />
                    </div>
                    <div className="mt-3 text-sm font-medium text-foreground">{e.t}</div>
                  </button>
                </Reveal>
              );
            })}
          </div>

          {/* Active Milestone Transition */}
          <div className="mt-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={timeline[activeYearIdx].y}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="glass-strong rounded-2xl p-6 border border-brand/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="font-numeric text-4xl font-extrabold text-gradient">
                    {timeline[activeYearIdx].y}
                  </div>
                  <div>
                    <span className="chip py-0.5 px-2.5 text-xs font-semibold">Milestone</span>
                    <div className="mt-1 text-base font-semibold text-foreground">
                      {timeline[activeYearIdx].t}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  Select any milestone above to view our growth progression.
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Section>

      <Section className="border-t border-border">
        <SectionHeader eyebrow="Infrastructure" title="Built for precision at scale." />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {infra.map((f, i) => (
            <Reveal key={f.t} delay={i * 0.05}>
              <div className="glass card-lift h-full rounded-2xl p-6 md:p-7 border border-border/70">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-brand-green/25 bg-brand-green/10 text-brand-green shadow-xs">
                  <f.icon className="h-6 w-6" />
                </div>
                <div className="mt-5 font-display text-xl font-semibold text-foreground">{f.t}</div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="border-t border-border">
        <SectionHeader center eyebrow="Certifications" title="Certified quality and compliance." />
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {certs.map((c) => (
            <span
              key={c}
              className="glass flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium"
            >
              <Award className="h-4 w-4 text-brand" />
              {c}
            </span>
          ))}
        </div>
      </Section>

      <Section className="border-t border-border">
        <SectionHeader center eyebrow="Leadership" title="The people behind Kohinoor." />
        <div className="mt-10 grid gap-8 sm:grid-cols-2 max-w-3xl mx-auto">
          {leaders.map((l, i) => (
            <Reveal key={l.role} delay={i * 0.08}>
              <div className="glass card-lift group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border/80 p-5 md:p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-brand/10 hover:border-brand/40">
                <div>
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-card/60">
                    <img
                      src={l.image}
                      alt={l.title}
                      className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent pointer-events-none" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <span className="chip bg-background/80 backdrop-blur-md border border-border/80 text-xs font-semibold">
                        {l.badge}
                      </span>
                    </div>
                  </div>

                  <div className="mt-5">
                    <h3 className="font-display text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-brand">
                      {l.title}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-brand">{l.role}</p>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{l.bio}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </div>
  );
}
