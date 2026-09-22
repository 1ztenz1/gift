"use client";

import { useEffect, useRef, useState } from "react";
import { cx } from "@/lib/format";

/**
 * Fades content up as it scrolls into view.
 *
 * The hidden state is applied from an effect rather than on the server, so
 * content stays visible if JavaScript never runs.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
}) {
  const ref = useRef<HTMLElement>(null);
  const [state, setState] = useState<"idle" | "armed" | "shown">("idle");

  /* eslint-disable react-hooks/set-state-in-effect --
     The armed/shown state is a post-mount measurement, not derived state: it
     depends on the reduced-motion query and the element's position, and it
     must stay "idle" during SSR so content is visible without JS. */
  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setState("shown");
      return;
    }

    // Anything already on screen skips the animation entirely.
    if (node.getBoundingClientRect().top < window.innerHeight * 0.92) {
      setState("shown");
      return;
    }

    setState("armed");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setState("shown");
        observer.disconnect();
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  return (
    <Tag
      ref={ref as React.Ref<never>}
      data-reveal={state === "idle" ? undefined : state}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cx(className)}
    >
      {children}
    </Tag>
  );
}
