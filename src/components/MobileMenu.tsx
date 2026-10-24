"use client";

import { useEffect, useRef, useState } from "react";
import { navLinks, PHONE_HREF } from "./nav-links";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D62828] focus-visible:ring-offset-2";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Menü schließen" : "Menü öffnen"}
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex h-11 w-11 items-center justify-center rounded border border-neutral-300 text-[#222222] ${focusRing}`}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          {open ? (
            <path d="M6 6l12 12M18 6L6 18" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" />
          )}
        </svg>
      </button>

      <div
        id="mobile-menu"
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-neutral-200 bg-white shadow-sm"
      >
        <nav aria-label="Mobile Navigation" className="px-4 py-4 sm:px-6">
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.href} className="border-b border-neutral-100">
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`flex min-h-12 items-center text-base font-medium text-[#222222] ${focusRing}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={PHONE_HREF}
            className={`mt-4 flex min-h-12 items-center justify-center rounded bg-[#D62828] px-5 text-base font-semibold text-white hover:bg-[#b81f1f] ${focusRing}`}
          >
            Jetzt anrufen
          </a>
        </nav>
      </div>
    </div>
  );
}