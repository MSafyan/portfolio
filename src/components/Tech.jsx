import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";

const Tech = () => {
  return (
    <>
      <div className="text-center mb-16">
        <p className="text-accent-light text-sm uppercase tracking-wider mb-2">
          Technologies
        </p>
        <h2 className="text-white font-black text-4xl">
          Tech Stack<span className="text-accent-light">.</span>
        </h2>
      </div>
      <div className="flex flex-row flex-wrap justify-center gap-8">
        {technologies.map((technology) => (
          <div
            key={technology.name}
            className="flex flex-col items-center gap-2 group"
          >
            <div className="w-20 h-20 rounded-2xl bg-tertiary flex items-center justify-center p-4 shadow-card hover:scale-110 hover:shadow-card-hover transition-all duration-300 cursor-default">
              <img
                src={technology.icon}
                alt={technology.name}
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
            <span className="text-secondary text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              {technology.name}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Tech, "");
