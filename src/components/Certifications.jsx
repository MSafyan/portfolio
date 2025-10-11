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
            className="group relative px-8 py-3 rounded-full font-semibold overflow-hidden transition-all duration-300 hover:scale-105"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-accent to-pink-500"></span>
            <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative text-white flex items-center gap-2">
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
            </span>
          </button>
        </div>
      )}
    </>
  );
};

export default SectionWrapper(Certifications, "certifications");
