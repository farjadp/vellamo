import { TEAM } from "../content.js";
import { PageHeader, TeamSection } from "../components/Sections.jsx";

/** Team page. */
export default function TeamPage() {
  return (
    <>
      <PageHeader title={TEAM.title} intro={TEAM.intro} />
      <TeamSection />
    </>
  );
}
