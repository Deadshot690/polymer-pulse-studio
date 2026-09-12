import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Leaf, Recycle, FlaskConical, Boxes, ChevronDown, Layers,
  ShieldCheck, Gauge, Palette, Truck, Factory, Sparkles, Headset, CheckCircle2, Quote,
} from "lucide-react";
import { Section, SectionHeader, Reveal } from "@/components/site/Section";
import { ParticleField } from "@/components/three/ParticleField";
import { GranuleSphere } from "@/components/three/GranuleSphere";
import { useLead } from "@/lib/lead-context";
import { productCategories } from "@/data/site";

export const Route = createFileRoute("/")({
  component: Home,
});

const stats = [
  { v: "8+", l: "Years of expertise" },
  { v: "6k MT", l: "Annual capacity" },
  { v: "25+", l: "Polymer grades" },
  { v: "99.8%", l: "Quality pass rate" },
];

const features = [
  { icon: Boxes, t: "Homopolymer", s: "PCR PPHP" },
  { icon: Recycle, t: "Copolymer", s: "PCR PPCP" },
  { icon: Layers, t: "HDPE", s: "PCR HDPE / Blow & Extrusion" },
  { icon: FlaskConical, t: "Customized Compounds", s: "PCR Compounds" },
];

const loopSteps = [
  { n: "01", t: "Plastic Waste", d: "Post-consumer & post-industrial PP streams sourced through certified channels." },
  { n: "02", t: "Collection & Sorting", d: "Automated optical sorting separates polymers by grade and colour." },
  { n: "03", t: "Cleaning & Processing", d: "Multi-stage washing removes contaminants below industry thresholds." },
  { n: "04", t: "Granule Production", d: "Twin-screw extrusion yields uniform pellets with controlled MFI." },
  { n: "05", t: "Manufacturing", d: "Granules ship to OEMs and manufacturers across seven industries." },
  { n: "06", t: "Consumer Products", d: "Recycled-content products re-enter the loop, closing the cycle." },
];

const reasons = [
  { icon: Sparkles, t: "High purity materials" },
  { icon: Gauge, t: "Consistent MFI" },
  { icon: ShieldCheck, t: "Quality assurance" },
  { icon: Palette, t: "Custom colour development" },
  { icon: Truck, t: "Reliable supply chain" },
  { icon: Leaf, t: "Sustainable manufacturing" },
  { icon: Recycle, t: "Recycled content" },
  { icon: Headset, t: "Dedicated technical support" },
];

const swatches = [
  { name: "Blue", hex: "#2563eb", image: "/Polymers-photos/IMG_1554.jpg", grade: "PCR PPCP Blue" },
  { name: "Green", hex: "#22c55e", image: "/Polymers-photos/IMG_1574.jpg", grade: "PCR PPHP Green" },
  { name: "Red", hex: "#ef4444", image: "/Polymers-photos/IMG_1549.jpg", grade: "PCR PPCP Red" },
  { name: "Orange", hex: "#f97316", image: "/Polymers-photos/IMG_1578.jpg", grade: "PCR PPHP Orange" },
  { name: "Maroon", hex: "#7f1d1d", image: "/Polymers-photos/IMG_1550.jpg", grade: "PCR PPCP Maroon" },
  { name: "White", hex: "#f5f5f5", image: "/Polymers-photos/IMG_1536.jpg", grade: "PCR HDPE Natural White" },
  { name: "Black", hex: "#1a1a1a", image: "/Polymers-photos/IMG_1545.jpg", grade: "PCR PPCP Jet Black" },
  { name: "Cyan", hex: "#06b6d4", image: "/Polymers-photos/IMG_1583.jpg", grade: "PCR PPHP Cyan" },
  { name: "Yellow", hex: "#eab308", image: "/Polymers-photos/IMG_1585.jpg", grade: "PCR PPCP Golden Yellow" },
];

const mfgStats = [
  { v: "8+", l: "Years operating" },
  { v: "6k MT", l: "Annual production capacity" },
  { v: "25+", l: "Product variants" },
  { v: "6", l: "Industries served" },
  { v: "110+", l: "Active clients" },
];

const susStats = [
  { v: "14,000+ T", l: "Plastic waste recycled" },
  { v: "32,000 T", l: "CO₂ emissions avoided" },
  { v: "85%", l: "Closed-loop water reuse" },
  { v: "40%", l: "Renewable energy target" },
];

const testimonials = [
  "Kohinoor's MFI consistency changed our line efficiency overnight.",
  "Their recycled-content grades met our sustainability goals without compromising quality.",
  "The team responded like an extension of our engineering department.",
];

function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { openLead } = useLead();
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [previewMode, setPreviewMode] = useState<"photo" | "3d">("photo");

  const selectedSwatch = swatches[selectedIdx];

  // Automate the image and color change with smooth animation every 2.5 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setSelectedIdx((prev) => (prev + 1) % swatches.length);
    }, 2600); // 2.6s (within 2-3s interval)

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const canvasScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);

  return (
    <div>
      {/* HERO */}
      <div ref={heroRef} className="relative min-h-[100vh] overflow-hidden">
        <div className="grid-bg absolute inset-0 opacity-30" />
        <motion.div style={{ scale: canvasScale }} className="absolute inset-0">
          <ParticleField progress={scrollYProgress} />
        </motion.div>
        <div
          className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--brand) 22%, transparent), transparent 70%)" }}
        />
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="relative mx-auto flex min-h-[100vh] max-w-5xl flex-col items-center justify-center px-5 text-center"
        >
          <div className="chip">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Industrial PCR & High-Performance Compounds</span>
          </div>

          <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
            Engineering sustainable polymers for the{" "}
            <span className="text-gradient">modern industry.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
            High-purity recycled granules that drop into existing manufacturing lines. Consistent MFI, high tensile strength, and zero virgin compromise.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/products" className="btn-primary">
              Explore products <ArrowRight className="h-4 w-4" />
            </Link>
            <button onClick={() => openLead()} className="btn-ghost">
              Request sample batch
            </button>
          </div>

          {/* Quick Stats Grid */}
          <div className="mt-14 grid w-full max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.l} className="glass rounded-2xl p-4 text-center">
                <div className="font-numeric text-2xl font-bold text-gradient sm:text-3xl">{s.v}</div>
                <div className="mt-1 text-xs text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center gap-2 text-xs text-muted-foreground">
            <span>Scroll to explore</span>
            <ChevronDown className="h-4 w-4 animate-bounce" />
          </div>
        </motion.div>
      </div>

      {/* REVOLUTIONIZING POLYMERS */}
      <Section className="border-t border-border">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeader
              eyebrow="Sustainable by engineering"
              title="A polymer engineering company built around the circular economy."
              subtitle="Kohinoor Polytech converts post-consumer and post-industrial polymers into premium and polyethylene into premium PPHP, PPCP, HDPE and custom-engineered compounds. Every batch is validated for impurity control and colour consistency before it leaves our plant."
            />
            <div className="mt-8 grid grid-cols-2 gap-3">
              {features.map((f) => (
                <div key={f.t} className="glass card-lift rounded-2xl p-5">
                  <f.icon className="h-6 w-6 text-brand" />
                  <div className="mt-3 font-display font-semibold">{f.t}</div>
                  <div className="text-sm text-muted-foreground">{f.s}</div>
                </div>
              ))}
            </div>
          </div>
          <Reveal>
            <div
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
              className="glass-strong rounded-3xl p-4 md:p-5 border border-border/80 shadow-xl shadow-black/5"
            >
              <div className="mb-3.5 flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">{selectedSwatch.name} Sample</span>
                  <span className="chip text-[11px] py-0.5 px-2 font-mono">{selectedSwatch.grade}</span>
                  {isAutoPlaying && (
                    <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-muted-foreground ml-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-green animate-pulse" />
                      Auto
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 rounded-full bg-secondary/80 p-1 border border-border/70 text-xs">
                  <button
                    type="button"
                    onClick={() => setPreviewMode("photo")}
                    className={`rounded-full px-2.5 py-1 font-medium transition-all ${
                      previewMode === "photo" ? "bg-card text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Photo
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewMode("3d")}
                    className={`rounded-full px-2.5 py-1 font-medium transition-all ${
                      previewMode === "3d" ? "bg-card text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    3D View
                  </button>
                </div>
              </div>

              <div className="relative h-[340px] overflow-hidden rounded-2xl bg-secondary/40 border border-border/50">
                <AnimatePresence mode="wait">
                  {previewMode === "photo" ? (
                    <motion.div
                      key={selectedSwatch.name}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.04 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="relative h-full w-full"
                    >
                      <img
                        src={selectedSwatch.image}
                        alt={`${selectedSwatch.name} polymer granules`}
                        className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                        <span className="chip bg-black/60 backdrop-blur-md text-white border-white/20 text-xs">
                          Physical Batch Sample
                        </span>
                        <button
                          type="button"
                          onClick={() => setPreviewMode("3d")}
                          className="pointer-events-auto chip bg-brand/85 backdrop-blur-md text-white border-white/20 text-xs hover:bg-brand transition-colors"
                        >
                          Switch to 3D View
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="3d-sphere"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="relative h-full w-full"
                    >
                      <GranuleSphere color={selectedSwatch.hex} />
                      <div className="absolute bottom-3 right-3">
                        <button
                          type="button"
                          onClick={() => setPreviewMode("photo")}
                          className="chip bg-card/85 backdrop-blur-md text-foreground border border-border/80 text-xs hover:bg-card transition-colors flex items-center gap-1.5 shadow-md"
                        >
                          <img
                            src={selectedSwatch.image}
                            alt={selectedSwatch.name}
                            className="h-4 w-4 rounded-full object-cover"
                          />
                          <span>View Real Photo</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="mt-4 flex flex-wrap justify-center gap-2.5">
                {swatches.map((s, idx) => (
                  <button
                    key={s.name}
                    aria-label={s.name}
                    title={`${s.name} (${s.grade})`}
                    onClick={() => {
                      setSelectedIdx(idx);
                    }}
                    className={`h-8 w-8 rounded-full border-2 transition-all duration-300 hover:scale-115 ${
                      selectedIdx === idx
                        ? "border-foreground ring-2 ring-brand/60 scale-110 shadow-md"
                        : "border-transparent opacity-85 hover:opacity-100"
                    }`}
                    style={{ backgroundColor: s.hex }}
                  />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* CIRCULAR ECONOMY */}
      <Section className="border-t border-border">
        <SectionHeader
          center
          eyebrow="The circular economy"
          title="From waste stream to premium granules."
          subtitle="Our closed-loop process turns discarded polymers into industrial-grade material — verified at every stage."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {loopSteps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.05}>
              <div className="glass card-lift h-full rounded-2xl p-6">
                <div className="font-numeric text-3xl font-bold text-gradient">{s.n}</div>
                <div className="mt-2 font-display text-lg font-semibold">{s.t}</div>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* WHY KOHINOOR */}
      <Section className="border-t border-border">
        <SectionHeader center eyebrow="Why Kohinoor" title="Eight reasons manufacturers choose us." />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r, i) => (
            <Reveal key={r.t} delay={i * 0.04}>
              <div className="glass card-lift flex h-full flex-col items-start gap-3 rounded-2xl p-6">
                <r.icon className="h-6 w-6 text-brand-green" />
                <div className="font-display font-semibold">{r.t}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* PRODUCT CATEGORIES */}
      <Section className="border-t border-border">
        <SectionHeader eyebrow="Product categories" title="Engineered polymer ranges for every application." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {productCategories.map((c, i) => {
            const Icon = c.key === "PCR PPHP" ? Boxes : c.key === "PCR PPCP" ? Recycle : c.key === "Compound" ? FlaskConical : Layers;
            return (
              <Reveal key={c.name} delay={i * 0.05}>
                <div className="glass card-lift h-full rounded-2xl p-6">
                  <Icon className="h-6 w-6 text-brand" />
                  <div className="mt-3 font-display text-lg font-semibold">{c.name}</div>
                  <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
        <div className="mt-8">
          <Link to="/products" className="btn-primary">View the full catalogue <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </Section>

      {/* MANUFACTURING */}
      <Section className="border-t border-border">
        <SectionHeader
          eyebrow="Manufacturing excellence"
          title="A factory engineered for precision and scale."
        />
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-5">
          {mfgStats.map((s) => (
            <div key={s.l} className="glass rounded-2xl p-5 text-center">
              <div className="font-numeric text-2xl font-bold text-gradient">{s.v}</div>
              <div className="mt-1 text-xs text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* SUSTAINABILITY */}
      <Section className="border-t border-border">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <SectionHeader
            eyebrow="Sustainability"
            title="Recycled content, measurable impact and responsible operations."
            subtitle="We turn plastic waste into premium industrial compounds while helping customers meet sustainability goals and regulatory targets."
          />
          <div className="grid grid-cols-2 gap-3">
            {susStats.map((s) => (
              <div key={s.l} className="glass card-lift rounded-2xl p-5">
                <div className="font-numeric text-2xl font-bold text-brand-green">{s.v}</div>
                <div className="mt-1 text-xs text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8">
          <Link to="/sustainability" className="btn-accent">Explore sustainability <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <Section className="border-t border-border">
        <SectionHeader center title="Trusted by manufacturers who demand consistency." />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div className="glass card-lift h-full rounded-2xl p-6">
                <Quote className="h-7 w-7 text-brand" />
                <p className="mt-4 text-base">{t}</p>
                <div className="mt-4 flex items-center gap-1 text-brand-green">
                  <CheckCircle2 className="h-4 w-4" /><span className="text-xs">Verified customer</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* FINAL CTA */}
      <Section className="border-t border-border">
        <div className="glass-strong relative overflow-hidden rounded-3xl p-10 text-center md:p-16">
          <div
            className="pointer-events-none absolute -top-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--brand) 40%, transparent), transparent 70%)" }}
          />
          <h2 className="relative text-3xl font-bold md:text-5xl">Ready to build your next polymer solution?</h2>
          <p className="relative mx-auto mt-4 max-w-2xl text-muted-foreground">
            Let's discuss grades, colour, supply volume and application performance.
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-3">
            <button onClick={() => openLead()} className="btn-primary">Request a Quote</button>
            <Link to="/contact" className="btn-ghost">Contact Sales</Link>
          </div>
        </div>
      </Section>
    </div>
  );
}
