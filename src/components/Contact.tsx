import { PHONE_HREF } from "./nav-links";
import ContactForm from "./Contact-Form";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D62828] focus-visible:ring-offset-2";

// Verify that this points to the exact business listing.
const MAP_SRC =
  "https://maps.google.com/maps?q=Borsig%20Car%20Service%2C%20Oesterm%C3%A4rsch%2043%2C%2044145%20Dortmund%2C%20Germany&z=15&output=embed";

// Shows the number exactly as stored in PHONE_HREF, without the "tel:" prefix.
const phoneDisplay = PHONE_HREF.replace(/^tel:/i, "");

const openingHours = [
  { days: "Montag–Freitag", hours: "09:00–18:00" },
  { days: "Samstag", hours: "09:00–16:00" },
  { days: "Sonntag", hours: "Geschlossen" },
];

export function Contact() {
  return (
    <section
      id="kontakt"
      aria-labelledby="kontakt-heading"
      className="scroll-mt-20 bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
          {/* LEFT COLUMN */}
          <div>
            <h2
              id="kontakt-heading"
              className="text-3xl font-bold tracking-tight text-[#222222] sm:text-4xl"
            >
              Kontaktieren Sie uns
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-neutral-600 sm:text-lg">
              Haben Sie Fragen zu Ihrem Fahrzeug? Rufen Sie uns an, besuchen
              Sie uns oder schreiben Sie uns eine Nachricht.
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#222222]">
                  Adresse
                </h3>
                <address className="mt-2 text-base not-italic leading-relaxed text-neutral-700">
                  Borsig Car Service
                  <br />
                  Oestermärsch 43
                  <br />
                  44145 Dortmund-Innenstadt-Nord
                  <br />
                  Germany
                </address>
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#222222]">
                  Öffnungszeiten
                </h3>
                <dl className="mt-2 space-y-1 text-base text-neutral-700">
                  {openingHours.map((row) => (
                    <div key={row.days} className="flex justify-between gap-4">
                      <dt>{row.days}</dt>
                      <dd className="text-right">{row.hours}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#222222]">
                Telefon
              </h3>
              <a
                href={PHONE_HREF}
                className={`mt-2 inline-flex min-h-12 items-center rounded-lg bg-[#D62828] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-[#B71F1F] ${focusRing}`}
              >
                Jetzt anrufen: {phoneDisplay}
              </a>
            </div>

            {/* Map: fixed height reserves space and prevents layout shift */}
            <div className="mt-8">
              <h3 className="sr-only">Anfahrt</h3>
              <div className="relative h-72 w-full overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100 sm:h-80">
                <iframe
                  src={MAP_SRC}
                  title="Karte: Standort von Borsig Car Service, Oestermärsch 43, Dortmund"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 h-full w-full border-0"
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="rounded-xl border border-neutral-200 bg-[#F7F7F7] p-5 sm:p-8">
            <h3 className="text-2xl font-semibold text-[#222222]">
              Schreiben Sie uns
            </h3>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}