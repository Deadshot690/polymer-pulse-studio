import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import logo from "/Assets/logo_transparent_blue.png";
import { useLead } from "@/lib/lead-context";

const links = [
  { to: "/about", label: "About" },
  { to: "/products", label: "Products" },
  { to: "/projects", label: "Projects" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { openLead } = useLead();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = currentScrollY - lastScrollY;

      setScrolled(currentScrollY > 20);

      // If at or near the very top (< 35px), always take full width
      if (currentScrollY <= 35) {
        setIsCollapsed(false);
      } else if (Math.abs(diff) > 6) {
        // When scrolling down -> collapse navbar into compact floating pill
        // When scrolling up -> expand navbar to full width
        if (diff > 0) {
          setIsCollapsed(true);
        } else {
          setIsCollapsed(false);
        }
      }

      lastScrollY = currentScrollY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    updateScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  // When mobile menu is opened, keep full width so dropdown is comfortably viewed
  const effectiveCollapsed = isCollapsed && !open;

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center pointer-events-none">
      <motion.div
        layout
        initial={false}
        animate={{
          maxWidth: effectiveCollapsed ? "880px" : "100%",
          marginTop: effectiveCollapsed ? 14 : 0,
          borderRadius: effectiveCollapsed ? 9999 : 0,
          paddingLeft: effectiveCollapsed ? 8 : 0,
          paddingRight: effectiveCollapsed ? 8 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 280,
          damping: 28,
          mass: 0.75,
        }}
        className={`pointer-events-auto relative w-full overflow-hidden transition-all duration-300 ${
          effectiveCollapsed
            ? "mx-3 glass-strong border border-border/80 shadow-[0_16px_36px_-12px_rgba(0,0,0,0.18)] dark:shadow-[0_16px_36px_-12px_rgba(0,0,0,0.6)]"
            : scrolled
              ? "glass-strong border-b border-border/60 shadow-sm"
              : "bg-transparent border-b border-transparent"
        }`}
      >
        <nav
          className={`flex items-center justify-between transition-all duration-300 ${
            effectiveCollapsed ? "px-4 py-2 md:px-5 md:py-2" : "mx-auto max-w-7xl px-5 py-3 md:px-8"
          }`}
        >
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <motion.img
              layout
              src={logo}
              alt="Kohinoor Polytech"
              width={36}
              height={36}
              className={`object-contain transition-transform duration-300 group-hover:scale-105 ${
                effectiveCollapsed ? "h-8 w-8" : "h-9 w-9"
              }`}
            />
            <motion.span
              layout
              className={`font-display font-bold tracking-tight text-foreground transition-all duration-300 ${
                effectiveCollapsed ? "text-base md:text-lg" : "text-lg md:text-xl"
              }`}
            >
              Kohinoor Polytech
            </motion.span>
          </Link>

          {/* Desktop Navigation Links */}
          <motion.div layout className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`relative rounded-full font-medium text-muted-foreground transition-all duration-200 hover:text-foreground hover:bg-secondary/70 ${
                  effectiveCollapsed ? "text-xs px-3 py-1.5" : "text-sm px-4 py-2"
                }`}
                activeProps={{
                  className: "text-foreground font-semibold bg-secondary/80 shadow-xs",
                }}
              >
                {l.label}
              </Link>
            ))}
          </motion.div>

          {/* Actions: Request Quote & Mobile Hamburger */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => openLead()}
              className={`btn-primary hidden md:inline-flex items-center gap-1.5 transition-all duration-200 ${
                effectiveCollapsed ? "text-xs py-1.5 px-3.5" : "text-sm py-2 px-4"
              }`}
            >
              <span>Request Quote</span>
              <ArrowUpRight className="h-3.5 w-3.5 opacity-70" />
            </button>

            <button
              className="rounded-full p-2 text-foreground/80 hover:text-foreground hover:bg-secondary/60 transition lg:hidden"
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {/* Scroll Progress Bar */}
        <motion.div
          className="h-[2px] w-full origin-left bg-gradient-to-r from-brand via-brand-2 to-brand-green"
          style={{ scaleX: progress }}
        />

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="glass-strong border-t border-border/60 overflow-hidden lg:hidden"
            >
              <div className="flex flex-col gap-1 px-5 py-4">
                {links.map((l, i) => (
                  <motion.div
                    key={l.to}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.2, ease: "easeOut" }}
                  >
                    <Link
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className="block rounded-xl px-4 py-3 text-base font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                      activeProps={{ className: "bg-secondary/80 font-semibold text-foreground" }}
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: links.length * 0.04, duration: 0.2 }}
                >
                  <button
                    onClick={() => {
                      setOpen(false);
                      openLead();
                    }}
                    className="btn-primary mt-3 flex items-center justify-center gap-1.5 w-full py-3"
                  >
                    <span>Request Quote</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
}
