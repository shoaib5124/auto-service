import Image from "next/image";
import { PHONE_HREF } from "./nav-links";

// NOTE: Unofficial demo. The services below are temporary draft content
// and still need to be confirmed with the business owner.

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D62828] focus-visible:ring-offset-2";

type Service = {
  id: string;
  number: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

const PLACEHOLDER_IMAGE = "/images/engine.webp";

const services: Service[] = [
  {
    id: "oelwechsel",
    number: "01",
    title: "Ölwechsel",
    description:
      "Motoröl und Ölfilter wechseln. Das verwendete Öl entspricht den Vorgaben des Fahrzeugherstellers.",
    imageSrc: "/images/oilchange.png",
    imageAlt: "Symbolbild Motorraum für den Service Ölwechsel",
  },
  {
    id: "inspektion",
    number: "02",
    title: "Inspektion",
    description:
      "Fahrzeugwartung nach Herstellervorgaben, einschließlich der Prüfung relevanter Filter und Komponenten.",
    imageSrc: "/images/inspection.png",
    imageAlt: "Symbolbild Motorraum für den Service Inspektion",
  },
  {
    id: "zuendkerzen-zuendspulen",
    number: "03",
    title: "Zündkerzen & Zündspulen",
    description: "Zündkerzen und Zündspulen prüfen und bei Bedarf ersetzen.",
    imageSrc: "/images/sparkplug.png",
    imageAlt: "Symbolbild Motorraum für den Service Zündkerzen und Zündspulen",
  },
  {
    id: "bremsenservice",
    number: "04",
    title: "Bremsenservice",
    description:
      "Bremsscheiben und Bremsbeläge prüfen und bei Bedarf austauschen.",
    imageSrc: "/images/breaksreplace.png",
    imageAlt: "Symbolbild Motorraum für den Bremsenservice",
  },
  {
    id: "federn-lenker",
    number: "05",
    title: "Federn & Lenker",
    description:
      "Komponenten der Vorder- und Hinterachse prüfen und bei Bedarf reparieren oder ersetzen.",
    imageSrc: "/images/controlarms.png",
    imageAlt: "Symbolbild Motorraum für den Service Federn und Lenker",
  },
  {
    id: "bremsfluessigkeitswechsel",
    number: "06",
    title: "Bremsflüssigkeitswechsel",
    description:
      "Bremsflüssigkeit nach den Vorgaben des Fahrzeugherstellers wechseln.",
    imageSrc: "/images/breakfluidreplacement.png",
    imageAlt: "Symbolbild Motorraum für den Bremsflüssigkeitswechsel",
  },
  {
    id: "kuehlmittelwechsel",
    number: "07",
    title: "Kühlmittelwechsel",
    description:
      "Kühlsystem und Kühlmittel gemäß den Herstellervorgaben warten.",
    imageSrc: "/images/coolreplace.png",
    imageAlt: "Symbolbild Motorraum für den Kühlmittelwechsel",
  },
  {
    id: "klimaservice",
    number: "08",
    title: "Klimaservice & Klimawartung",
    description:
      "Klimaanlage prüfen und warten. Geeignete Services für R134a- und R1234yf-Systemen.".replace(
        "Systemen",
        "Systeme"
      ),
    imageSrc: "/images/generater.png",
    imageAlt: "Symbolbild Motorraum für Klimaservice und Klimawartung",
  },
];

export  function Services() {
  return (
    <section
      id="leistungen"
      aria-labelledby="leistungen-heading"
      className="scroll-mt-20 bg-[#F7F7F7] py-16 sm:py-20 lg:py-24"
    >
      {/* Adjust this container to match your Hero/Navbar if needed */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#D62828]">
            Unsere Leistungen
          </p>
          <h2
            id="leistungen-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-[#222222] sm:text-4xl"
          >
            Service für Ihr Fahrzeug.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
            Wartung und Reparatur an einem Ort. Wählen Sie eine Leistung und
            stellen Sie uns Ihre Anfrage.
          </p>
        </header>

        {/* Cards */}
        <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
          {services.map((service) => (
            <li key={service.id} className="flex">
              <article className="flex w-full flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-200">
                  <Image
                    src={service.imageSrc}
                    alt={service.imageAlt}
                    fill
                    sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col p-5">
                  
                  <h3 className="mt-2 text-lg font-semibold leading-snug text-[#222222]">
                    {service.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-600">
                    {service.description}
                  </p>

                  <a
                    href="#kontakt"
                    aria-label={`Anfrage stellen: ${service.title}`}
                    className={`mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-[#D62828] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#B71F1F] sm:w-auto sm:self-start ${focusRing}`}
                  >
                    Anfrage stellen
                  </a>
                </div>
              </article>
            </li>
          ))}
        </ul>

        {/* Contact CTA */}
        <div className="mt-10 flex flex-col items-start gap-5 rounded-xl border border-neutral-200 bg-white p-6 sm:mt-12 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="max-w-xl">
            <h3 className="text-xl font-semibold text-[#222222]">
              Fragen zu Ihrem Fahrzeug?
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-neutral-600 sm:text-base">
              Rufen Sie uns an oder schicken Sie uns eine Anfrage.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <a
              href={PHONE_HREF}
              className={`inline-flex min-h-12 items-center justify-center rounded-lg bg-[#D62828] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-[#B71F1F] ${focusRing}`}
            >
              Jetzt anrufen
            </a>
            <a
              href="#kontakt"
              className={`inline-flex min-h-12 items-center justify-center rounded-lg border border-[#222222] bg-white px-6 py-3 text-base font-semibold text-[#222222] transition-colors hover:bg-[#222222] hover:text-white ${focusRing}`}
            >
              Kontakt aufnehmen
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}