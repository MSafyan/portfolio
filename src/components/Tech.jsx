import React from "react";

import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";

const Tech = () => {
  const isDesktop = window.innerWidth > 768;
  return (
    <>
      {isDesktop && (
        <>
          <div className="text-center mb-16">
            <p className="text-accent-light text-sm uppercase tracking-wider mb-2">
              Technologies
            </p>
            <h2 className="text-white font-black text-4xl">
              Tech Stack<span className="text-accent-light">.</span>
            </h2>
          </div>
          <div className="flex flex-row flex-wrap justify-center gap-10">
            {technologies.map((technology) => (
              <div
                className="w-28 h-28 hover:scale-110 transition-transform duration-300"
                key={technology.name}
              >
                <BallCanvas icon={technology.icon} />
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default SectionWrapper(Tech, "");
