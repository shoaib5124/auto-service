import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Contact } from "@/components/Contact";

export const metadata: Metadata = {
  title: "Auto Service Jannis| Autoservice in Dortmund",
  description:
    "Entdecken Sie den Website-Entwurf für Auto Service Jannis in Dortmund und erfahren Sie, wie Sie den Betrieb kontaktieren können.",
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Contact />
      </main>
    </>
  );
}