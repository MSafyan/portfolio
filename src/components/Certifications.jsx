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
        <p className={styles.sectionSubText}>Achievements</p>
        <h2 className={styles.sectionHeadText}>Certifications</h2>
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
            className="mt-5 self-center bg-white text-primary font-medium py-3 px-6 rounded-full hover:bg-opacity-90 active:scale-95 transition-all duration-200"
          >
            View All Certifications
          </button>
        </div>
      )}
    </>
  );
};

export default SectionWrapper(Certifications, "certifications");
