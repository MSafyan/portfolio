import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import SectionHeading from "./SectionHeading";

const Tech = () => {
  return (
    <>
      <SectionHeading eyebrow="Tools & Languages" title="Tech Stack" />

      {/* justify-start, not center: every other section left-aligns its content
          under the heading, and a centred grid broke that rhythm. */}
      <div className="mt-14 card-grid--xs">
        {technologies.map((technology) => (
          <div key={technology.name} className="tech-icon-card group" title={technology.name}>
            <img
              src={technology.icon}
              alt={technology.name}
              className="w-9 h-9 object-contain transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
            />
            <span className="tech-icon-label">{technology.name}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Tech, "");
