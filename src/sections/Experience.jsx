import { experience } from "../data/experience";
import SectionHeading from "../components/SectionHeading";
import TimelineItem from "../components/TimelineItem";

export default function Experience() {
  return (
    <section id="experience" className="relative bg-bg-soft py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <SectionHeading
          method="GET"
          path="/experience"
          status={200}
          title="Where the time's gone"
          description="Less about job titles, more about the depth I keep building — one full-stack feature at a time."
        />

        <div className="mt-14 space-y-8">
          {experience.map((item, i) => (
            <TimelineItem key={item.id} item={item} isLast={i === experience.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
