import {
  Hero,
  Problem,
  Solution,
  WhyFinland,
  WhoFor,
  TeamSection,
  ContactSection,
} from "../components/Sections.jsx";
import { SectionDivider } from "../components/Graphics.jsx";

/** Home: the full single-scroll marketing page with anchor-linked sections. */
export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <SectionDivider className="bg-vellamo-ice" />
      <Solution />
      <WhyFinland />
      <SectionDivider className="bg-vellamo-ice" />
      <WhoFor />
      <TeamSection />
      <ContactSection />
    </>
  );
}
