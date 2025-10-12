import React, { useState } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { certifications } from "../constants";
import { SectionWrapper } from "../hoc";
import CertificationCard from "../components/CertificationCard";
import { textVariant } from "../utils/motion";

const Certifications = () => {
  const [showAll, setShowAll] = useState(false);

  const displayedCerts = showAll ? certifications : certifications.slice(0, 3);

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-accent-light`}>
          Achievements
        </p>
        <h2 className={styles.sectionHeadText}>
          Certifications<span className="text-accent-light">.</span>
        </h2>
      </motion.div>

      <div className="mt-20 flex flex-wrap gap-7">
        {displayedCerts.map((cert, index) => (
          <CertificationCard key={index} index={index} {...cert} />
        ))}
      </div>

      {!showAll && certifications.length > 3 && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => setShowAll(true)}
            className="px-8 py-3 rounded-full font-semibold bg-[#06b6d4] text-white transition-all duration-300 hover:scale-105 hover:bg-[#22d3ee] flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
            View All Certifications
          </button>
        </div>
      )}
    </>
  );
};

export default SectionWrapper(Certifications, "certifications");
