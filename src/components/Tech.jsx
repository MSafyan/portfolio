import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";

const Tech = () => {
  return (
    <>
      <div className="text-center mb-14">
        <p className="text-accent text-sm uppercase tracking-widest mb-2">/// Tools & Languages</p>
        <h2 className="text-white font-black text-4xl">
          Tech Stack<span className="text-accent">.</span>
        </h2>
      </div>

      <div className="flex flex-row flex-wrap justify-center gap-5">
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
