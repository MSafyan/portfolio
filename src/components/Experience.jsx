import React, { useState } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";

import "react-vertical-timeline-component/style.min.css";

import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import SectionHeading from "./SectionHeading";
import { textVariant } from "../utils/motion";

const ExperienceCard = ({ experience }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "linear-gradient(145deg, #1e293b 0%, #0f172a 100%)",
        color: "#fff",
        border: "1px solid rgba(59, 130, 246, 0.25)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
        borderRadius: "16px",
      }}
      contentArrowStyle={{ borderRight: "7px solid rgba(59, 130, 246, 0.3)" }}
      date={
        <span className="text-secondary text-sm font-medium">{experience.date}</span>
      }
      iconStyle={{
        background: experience.iconBg,
        boxShadow: "0 0 0 4px rgba(59,130,246,0.2)",
      }}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          <img
            src={experience.icon}
            alt={experience.company_name}
            loading="lazy"
            decoding="async"
            className="w-[60%] h-[60%] object-contain"
          />
        </div>
      }
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-white text-[20px] font-bold leading-snug">{experience.title}</h3>
          <p className="text-accent text-[14px] font-semibold mt-1" style={{ margin: 0 }}>
            {experience.company_name}
          </p>
        </div>
      </div>

      <ul className="mt-4 list-none space-y-2">
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className="text-secondary text-[13px] leading-relaxed flex items-start gap-2"
          >
            <span className="text-accent mt-1 flex-shrink-0">▸</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  const [showAll, setShowAll] = useState(false);
  const displayedExperiences = showAll ? experiences : experiences.slice(0, 2);

  return (
    <>
      <motion.div variants={textVariant()}>
        <SectionHeading eyebrow="What I have done so far" title="Work Experience" />
      </motion.div>

      <div className="mt-16 flex flex-col">
        {/* Single left column rather than the alternating default: it keeps the
            same left rhythm as every other section, matches what mobile renders
            anyway, and drops the empty half-width the zigzag layout leaves. */}
        <VerticalTimeline layout="1-column-left" lineColor="rgba(59,130,246,0.2)">
          {displayedExperiences.map((experience, index) => (
            <ExperienceCard key={`experience-${index}`} experience={experience} />
          ))}
        </VerticalTimeline>

        {!showAll && experiences.length > 2 && (
          <button onClick={() => setShowAll(true)} className="btn-outline mt-10 self-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            Show All Experiences
          </button>
        )}
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "experience");
