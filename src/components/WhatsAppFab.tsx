"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { cx } from "@/lib/format";
import { whatsappHello } from "@/lib/whatsapp";
import { WhatsApp } from "./icons";

/**
 * Desktop-only floating chat button. On phones the same action already sits
 * in the middle of the tab bar, so this would only be in the way.
 */
export function WhatsAppFab() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={whatsappHello()}
      target="_blank"
      rel="noopener noreferrer"
      className={cx(
        "group fixed right-6 bottom-6 z-40 hidden items-center gap-0 rounded-full bg-[#1FA855] text-white shadow-lift transition-all duration-300 hover:bg-[#188C46] lg:flex",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
      )}
      aria-label={`Chat with ${site.shortName} on WhatsApp`}
    >
      <span className="flex size-14 items-center justify-center">
        <WhatsApp size={26} />
      </span>
      {/* Label expands on hover rather than sitting there permanently. */}
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-[14px] font-medium transition-[max-width,padding] duration-300 group-hover:max-w-[180px] group-hover:pr-6">
        Chat with us
      </span>
    </a>
  );
}
