import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);

  // Smooth springs for cursor trailing dot/aura
  const cursorX = useSpring(-100, { stiffness: 450, damping: 32, mass: 0.5 });
  const cursorY = useSpring(-100, { stiffness: 450, damping: 32, mass: 0.5 });

  useEffect(() => {
    // Strictly verify desktop fine-pointer device and reduced motion preference
    const mediaFine = window.matchMedia("(pointer: fine) and (hover: hover)");
    const mediaReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const checkSupport = () => {
      setIsFinePointer(mediaFine.matches && !mediaReducedMotion.matches);
    };

    checkSupport();
    mediaFine.addEventListener("change", checkSupport);
    mediaReducedMotion.addEventListener("change", checkSupport);

    if (!mediaFine.matches || mediaReducedMotion.matches) {
      return () => {
        mediaFine.removeEventListener("change", checkSupport);
        mediaReducedMotion.removeEventListener("change", checkSupport);
      };
    }

    const onMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onMouseEnter = () => setVisible(true);
    const onMouseLeave = () => setVisible(false);

    // Track interactive element hover
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest(
        "button, a, input, textarea, select, [role='button'], .card-lift, .chip",
      );
      setIsHovered(!!interactive);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseover", onMouseOver, { passive: true });

    return () => {
      mediaFine.removeEventListener("change", checkSupport);
      mediaReducedMotion.removeEventListener("change", checkSupport);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseover", onMouseOver);
    };
  }, [cursorX, cursorY, visible]);

  if (!isFinePointer || !visible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Subtle outer soft ring */}
      <motion.div
        className="pointer-events-none fixed -left-3.5 -top-3.5 h-7 w-7 rounded-full border border-brand/40 bg-brand/10 backdrop-blur-[1px]"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: isHovered ? 1.45 : 1,
          opacity: isHovered ? 0.85 : 0.45,
          borderColor: isHovered ? "rgba(99, 102, 241, 0.7)" : "rgba(99, 102, 241, 0.3)",
        }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      />
    </div>
  );
}
