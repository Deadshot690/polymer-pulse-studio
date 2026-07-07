import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
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
  const { openLead } = useLead();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className={`transition-all duration-300 ${scrolled ? "glass-strong" : "bg-transparent"}`}>
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-8">
          <Link to="/" className="flex items-center gap-2.5">
            <img src={logo} alt="Kohinoor Polytech" width={36} height={36} className="h-9 w-9" />
            <span className="font-display text-lg font-bold tracking-tight">Kohinoor Polytech</span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                activeProps={{ className: "text-foreground" }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => openLead()} className="btn-primary hidden md:inline-flex">
              Request Quote
            </button>
            <button
              className="rounded-full p-2 lg:hidden"
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>
        <motion.div className="h-0.5 origin-left bg-gradient-to-r from-brand via-brand-2 to-brand-green" style={{ scaleX: progress }} />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-strong overflow-hidden lg:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-base font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  {l.label}
                </Link>
              ))}
              <button
                onClick={() => {
                  setOpen(false);
                  openLead();
                }}
                className="btn-primary mt-2"
              >
                Request Quote
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
