import { useState, useEffect, useCallback } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2, Sparkles, Image as ImageIcon } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Section, Reveal } from "@/components/site/Section";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Kohinoor Polytech" },
      { name: "description", content: "A visual look inside our facility, polymer granules, extrusion lines and testing labs." },
      { property: "og:title", content: "Gallery — Kohinoor Polytech" },
      { property: "og:description", content: "A visual look inside our facility, polymer granules, extrusion lines and testing labs." },
    ],
  }),
  component: Gallery,
});

// Verified unique photos from public/Polymers-photos (all duplicates filtered out)
const galleryPhotos = [
  { src: "/Polymers-photos/IMG_1534.jpg", alt: "Kohinoor Polytech Granule & Facility Photo 1" },
  { src: "/Polymers-photos/IMG_1535.jpg", alt: "Kohinoor Polytech Granule & Facility Photo 2" },
  { src: "/Polymers-photos/IMG_1536.jpg", alt: "Kohinoor Polytech Granule & Facility Photo 3" },
  { src: "/Polymers-photos/IMG_1537.jpg", alt: "Kohinoor Polytech Granule & Facility Photo 4" },
  { src: "/Polymers-photos/IMG_1538.jpg", alt: "Kohinoor Polytech Granule & Facility Photo 5" },
  { src: "/Polymers-photos/IMG_1539.jpg", alt: "Kohinoor Polytech Granule & Facility Photo 6" },
  { src: "/Polymers-photos/IMG_1540.jpg", alt: "Kohinoor Polytech Granule & Facility Photo 7" },
  { src: "/Polymers-photos/IMG_1541.jpg", alt: "Kohinoor Polytech Granule & Facility Photo 8" },
  { src: "/Polymers-photos/IMG_1544.jpg", alt: "Kohinoor Polytech Granule & Facility Photo 9" },
  { src: "/Polymers-photos/IMG_1545.jpg", alt: "Kohinoor Polytech Granule & Facility Photo 10" },
  { src: "/Polymers-photos/IMG_1546.jpg", alt: "Kohinoor Polytech Granule & Facility Photo 11" },
  { src: "/Polymers-photos/IMG_1547.jpg", alt: "Kohinoor Polytech Granule & Facility Photo 12" },
  { src: "/Polymers-photos/IMG_1548.jpg", alt: "Kohinoor Polytech Granule & Facility Photo 13" },
  { src: "/Polymers-photos/IMG_1549.jpg", alt: "Kohinoor Polytech Granule & Facility Photo 14" },
  { src: "/Polymers-photos/IMG_1550.jpg", alt: "Kohinoor Polytech Granule & Facility Photo 15" },
  { src: "/Polymers-photos/IMG_1551.jpg", alt: "Kohinoor Polytech Granule & Facility Photo 16" },
  { src: "/Polymers-photos/IMG_1552.jpg", alt: "Kohinoor Polytech Granule & Facility Photo 17" },
  { src: "/Polymers-photos/IMG_1553.jpg", alt: "Kohinoor Polytech Granule & Facility Photo 18" },
  { src: "/Polymers-photos/IMG_1554.jpg", alt: "Kohinoor Polytech Granule & Facility Photo 19" },
  { src: "/Polymers-photos/IMG_1556.jpg", alt: "Kohinoor Polytech Granule & Facility Photo 20" },
  { src: "/Polymers-photos/IMG_1559.jpg", alt: "Kohinoor Polytech Granule & Facility Photo 21" },
  { src: "/Polymers-photos/IMG_1560.jpg", alt: "Kohinoor Polytech Granule & Facility Photo 22" },
  { src: "/Polymers-photos/IMG_1563.jpg", alt: "Kohinoor Polytech Granule & Facility Photo 23" },
  { src: "/Polymers-photos/IMG_1564.jpg", alt: "Kohinoor Polytech Granule & Facility Photo 24" },
  { src: "/Polymers-photos/IMG_1565.jpg", alt: "Kohinoor Polytech Granule & Facility Photo 25" },
  { src: "/Polymers-photos/IMG_1567.jpg", alt: "Kohinoor Polytech Granule & Facility Photo 26" },
  { src: "/Polymers-photos/IMG_1568.jpg", alt: "Kohinoor Polytech Granule & Facility Photo 27" },
  { src: "/Polymers-photos/IMG_1569.jpg", alt: "Kohinoor Polytech Granule & Facility Photo 28" },
  { src: "/Polymers-photos/IMG_1570.jpg", alt: "Kohinoor Polytech Granule & Facility Photo 29" },
  { src: "/Polymers-photos/IMG_1572.jpg", alt: "Kohinoor Polytech Granule & Facility Photo 30" },
  { src: "/Polymers-photos/IMG_1573.jpg", alt: "Kohinoor Polytech Granule & Facility Photo 31" },
  { src: "/Polymers-photos/IMG_1574.jpg", alt: "Kohinoor Polytech Granule & Facility Photo 32" },
  { src: "/Polymers-photos/IMG_1575.jpg", alt: "Kohinoor Polytech Granule & Facility Photo 33" },
  { src: "/Polymers-photos/IMG_1576.jpg", alt: "Kohinoor Polytech Granule & Facility Photo 34" },
  { src: "/Polymers-photos/IMG_1577.jpg", alt: "Kohinoor Polytech Granule & Facility Photo 35" },
  { src: "/Polymers-photos/IMG_1578.jpg", alt: "Kohinoor Polytech Granule & Facility Photo 36" },
  { src: "/Polymers-photos/IMG_1580.jpg", alt: "Kohinoor Polytech Granule & Facility Photo 37" },
  { src: "/Polymers-photos/IMG_1581.jpg", alt: "Kohinoor Polytech Granule & Facility Photo 38" },
  { src: "/Polymers-photos/IMG_1582.jpg", alt: "Kohinoor Polytech Granule & Facility Photo 39" },
  { src: "/Polymers-photos/IMG_1583.jpg", alt: "Kohinoor Polytech Granule & Facility Photo 40" },
  { src: "/Polymers-photos/IMG_1584.jpg", alt: "Kohinoor Polytech Granule & Facility Photo 41" },
  { src: "/Polymers-photos/IMG_1585.jpg", alt: "Kohinoor Polytech Granule & Facility Photo 42" },
  { src: "/Polymers-photos/IMG_1587.jpg", alt: "Kohinoor Polytech Granule & Facility Photo 43" },
];

function Gallery() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const handleNext = useCallback(() => {
    setActiveIdx((curr) => (curr !== null ? (curr + 1) % galleryPhotos.length : null));
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIdx((curr) => (curr !== null ? (curr - 1 + galleryPhotos.length) % galleryPhotos.length : null));
  }, []);

  const handleClose = useCallback(() => {
    setActiveIdx(null);
  }, []);

  // Keyboard controls for lightbox
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (activeIdx === null) return;
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIdx, handleClose, handleNext, handlePrev]);

  return (
    <div>
      <PageHero
        eyebrow="Visual Portfolio"
        title="Inside Kohinoor Polytech."
        subtitle="A visual showcase of our factory operations, high-purity polymer granules, laboratory quality controls, and material compounds."
      />

      <Section>
        {/* Header toolbar / count */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <ImageIcon className="h-4 w-4 text-brand" />
            <span>Showing <strong className="text-foreground font-semibold">{galleryPhotos.length}</strong> verified gallery photos</span>
          </div>
          <span className="chip hidden sm:inline-flex">
            <Sparkles className="h-3 w-3 text-brand" />
            <span>Click any image to enlarge</span>
          </span>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {galleryPhotos.map((photo, i) => (
            <Reveal key={photo.src} delay={Math.min(i * 0.02, 0.3)}>
              <div
                onClick={() => setActiveIdx(i)}
                className="glass card-lift group relative aspect-[3/4] cursor-pointer overflow-hidden rounded-2xl border border-border/70 transition-all duration-300 hover:border-brand/50 hover:shadow-xl hover:shadow-brand/10"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-between p-4 pointer-events-none">
                  <div className="self-end">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md border border-white/20 shadow-md">
                      <Maximize2 className="h-4 w-4" />
                    </span>
                  </div>
                  <span className="text-xs font-medium text-white/90">
                    Photo {i + 1}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl"
            onClick={handleClose}
          >
            {/* Top Bar Controls */}
            <div
              className="absolute top-4 inset-x-4 flex items-center justify-between z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="rounded-full glass px-4 py-1.5 text-xs font-semibold text-foreground/90 border border-border/80 shadow-md">
                {activeIdx + 1} / {galleryPhotos.length}
              </div>

              <button
                onClick={handleClose}
                className="rounded-full glass p-2.5 text-foreground hover:bg-secondary/80 transition-colors border border-border/80 shadow-md"
                aria-label="Close photo"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Main Lightbox Image */}
            <div
              className="relative max-h-[85vh] max-w-[90vw] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                key={activeIdx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                src={galleryPhotos[activeIdx].src}
                alt={galleryPhotos[activeIdx].alt}
                className="max-h-[82vh] max-w-[85vw] rounded-2xl object-contain shadow-2xl border border-border/40"
              />
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full glass p-3 text-foreground hover:bg-secondary/80 transition-colors border border-border/80 shadow-lg"
              aria-label="Previous photo"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full glass p-3 text-foreground hover:bg-secondary/80 transition-colors border border-border/80 shadow-lg"
              aria-label="Next photo"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
