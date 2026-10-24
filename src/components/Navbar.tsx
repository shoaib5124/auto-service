import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { navLinks, PHONE_HREF } from "./nav-links";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D62828] focus-visible:ring-offset-2";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="/"
          className={`flex min-h-11 items-center gap-2.5 rounded ${focusRing}`}
        >
          <Logo />
          <span className="text-base font-bold tracking-tight text-[#222222] sm:text-lg">
            Borsig Car Service
          </span>
        </a>

        <nav aria-label="Hauptnavigation" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`inline-flex min-h-11 items-center rounded px-4 text-sm font-medium text-[#222222] transition-colors hover:text-[#D62828] ${focusRing}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={PHONE_HREF}
            className={`hidden min-h-11 items-center rounded bg-[#D62828] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#b81f1f] md:inline-flex ${focusRing}`}
          >
            Jetzt anrufen
          </a>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}