import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const EASE_PREMIUM = [0.22, 1, 0.36, 1] as const;

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn("mx-auto w-full max-w-7xl px-5 py-20 md:px-8 md:py-28", className)}
    >
      {children}
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  center,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: EASE_PREMIUM }}
      className={cn("max-w-3xl", center && "mx-auto text-center")}
    >
      {eyebrow && <span className="chip mb-4">{eyebrow}</span>}
      <h2 className="text-3xl font-bold leading-tight md:text-5xl">{title}</h2>
      {subtitle && <p className="mt-4 text-base text-muted-foreground md:text-lg">{subtitle}</p>}
    </motion.div>
  );
}

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: EASE_PREMIUM, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
