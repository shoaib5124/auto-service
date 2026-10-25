import Image from "next/image";
import { PHONE_HREF } from "./nav-links";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D62828] focus-visible:ring-offset-2";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="bg-[#F7F7F7]  "
    >
     <div  className="mx-auto grid w-full sm:py-15 max-w-7xl grid-cols-1 px-6 sm:px-8 lg:grid-cols-2 lg:px-8">
        <div className="flex w-full items-center py-12 sm:py-16 lg:py-24 lg:pr-12">
        <div className=" w-full">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D62828] sm:text-sm">
            Autoservice in Dortmund
          </p>
          <h1
            id="hero-heading"
            className="mt-4 text-balance text-4xl font-bold leading-[1.1] tracking-tight text-[#222222] sm:text-5xl lg:text-6xl"
          >
            Ihr Auto in guten Händen.
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-neutral-700 sm:text-lg">
            Zuverlässiger Service für Ihr Fahrzeug. Kontaktieren Sie uns für
            weitere Informationen und einen Termin.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#kontakt"
              className={`inline-flex min-h-12 items-center justify-center rounded bg-[#D62828] px-7 text-base font-semibold text-white transition-colors hover:bg-[#b81f1f] ${focusRing}`}
            >
              Kontakt aufnehmen
            </a>
            <a
              href={PHONE_HREF}
              className={`inline-flex min-h-12 items-center justify-center rounded border-2 border-[#222222] bg-white px-7 text-base font-semibold text-[#222222] transition-colors hover:bg-[#222222] hover:text-white ${focusRing}`}
            >
              Jetzt anrufen
            </a>
          </div>
          
{/* Compact address and opening hours */}
<div className="mt-5 space-y-2 text-sm text-neutral-600">
  <a
    href="https://www.google.com/maps/search/?api=1&query=Auto%20Service%20Jannis"
    target="_blank"
    rel="noopener noreferrer"
    className={`flex items-start gap-2 hover:text-[#D62828] ${focusRing}`}
  >
    <span aria-hidden="true">📍</span>
    <span>
      Osterlandwehr 7, 44145 Dortmund-Innenstadt-Nord, Germany
      <span className="ml-1 text-[#D62828]">↗</span>
    </span>
  </a>

  <p className="flex items-start gap-2">
    <span aria-hidden="true">🕒</span>
    <span>
      <span className="font-medium text-[#222222]">Mo–Fr:</span> 10 AM–6 PM
      <span className="mx-2">·</span>
      <span className="font-medium text-[#222222]">Sa:</span> 10 AM–3 PM
      <span className="mx-2">·</span>
      <span className="font-medium text-[#222222]">So:</span> Geschlossen
    </span>
  </p>
</div>

        </div>
        
      </div>

      <div className= "relative  aspect-[4/3] w-full overflow-hidden sm:aspect-[16/10] lg:mt-0 lg:aspect-auto lg:min-h-[460px]">
        <Image
          src="/images/hero-workshop.webp"
          alt="Modernes Fahrzeug in einer Autowerkstatt"
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
     </div>
    </section>
  );
}