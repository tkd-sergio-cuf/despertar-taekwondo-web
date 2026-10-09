import { connection } from "next/server";
import {
  getFaqs,
  getHero,
  getInstructors,
  getLocations,
  getPrinciples,
  getPrograms,
  getSchedule,
  getSections,
  getSiteSettings,
  getSocialLinks,
  getStats,
  getTestimonials,
} from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";
import { whatsappHref } from "@/lib/whatsapp";
import { About } from "@/components/home/About";
import { Faq } from "@/components/home/Faq";
import { FinalCta } from "@/components/home/FinalCta";
import { FreeClassForm } from "@/components/home/FreeClassForm";
import { Hero } from "@/components/home/Hero";
import { Locations } from "@/components/home/Locations";
import { Programs } from "@/components/home/Programs";
import { Testimonials } from "@/components/home/Testimonials";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import type { NavId } from "@/components/site/nav";

export async function generateMetadata() {
  await connection();
  return buildMetadata();
}

export default async function Home() {
  // Rendered per request (never frozen at build time); the data itself is cached
  // for up to 60 seconds by the data layer.
  await connection();

  const [
    settings,
    hero,
    stats,
    sections,
    programs,
    locations,
    schedule,
    principles,
    instructors,
    testimonials,
    faqs,
    socialLinks,
  ] = await Promise.all([
    getSiteSettings(),
    getHero(),
    getStats(),
    getSections(),
    getPrograms(),
    getLocations(),
    getSchedule(),
    getPrinciples(),
    getInstructors(),
    getTestimonials(),
    getFaqs(),
    getSocialLinks(),
  ]);

  // Without a valid WhatsApp number the free class buttons go to the form instead.
  const chatHref = whatsappHref(
    settings?.whatsapp_number,
    settings?.free_class_message,
  );
  const freeClassHref =
    chatHref ??
    (sections.clase_gratis && locations.length > 0
      ? "#clase-gratis"
      : "#contacto");

  const visible: NavId[] = ["contacto"];
  if (sections.clases && programs.length > 0) visible.push("clases");
  if (sections.sedes && locations.length > 0) visible.push("sedes");
  if (sections.nosotros || instructors.length > 0) visible.push("nosotros");
  if (sections.testimonios && testimonials.length > 0)
    visible.push("testimonios");

  return (
    <>
      <main>
        <Hero
          header={
            <Header
              settings={settings}
              visibleSections={visible}
              freeClassHref={freeClassHref}
            />
          }
          hero={hero}
          settings={settings}
          stats={stats}
          freeClassHref={freeClassHref}
        />
        <Programs
          section={sections.clases}
          programs={programs}
          askHref={freeClassHref}
          showScheduleLink={visible.includes("sedes")}
        />
        <Locations
          section={sections.sedes}
          locations={locations}
          schedule={schedule}
          businessName={settings?.business_name}
          timeZone={settings?.timezone ?? "UTC"}
        />
        <About
          section={sections.nosotros}
          principles={principles}
          instructors={instructors}
        />
        <FreeClassForm
          section={sections.clase_gratis}
          settings={settings}
          locations={locations}
        />
        <Testimonials
          section={sections.testimonios}
          testimonials={testimonials}
        />
        <Faq section={sections.faq} faqs={faqs} />
        <FinalCta section={sections.contacto} href={chatHref} />
      </main>
      <Footer
        settings={settings}
        locations={locations}
        socialLinks={socialLinks}
      />
    </>
  );
}
