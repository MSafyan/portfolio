import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { testimonials } from "../constants";

const FeedbackCard = ({
  index,
  testimonial,
  name,
  designation,
  company,
  image,
  platform,
  platformUrl,
}) => {
  const handleClickMore = () => {
    window.open(platformUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.div
      variants={fadeIn("", "spring", index * 0.5, 0.75)}
      className="glass-card p-10 rounded-3xl xs:w-[320px] w-full cursor-pointer transition-all duration-300 hover:scale-105 group"
      onClick={handleClickMore}
    >
      <p className="text-accent-light font-black text-[48px]">"</p>

      <div className="mt-1">
        <p
          className="text-white tracking-wider text-[18px] leading-relaxed"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 9,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {testimonial}
        </p>

        <div className="mt-7 flex justify-between items-center gap-1">
          <div className="flex-1 flex flex-col">
            <p className="text-white font-medium text-[16px]">
              <span className="blue-text-gradient">@</span> {name}
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center">
          <span className="text-accent-light text-sm font-medium group-hover:text-pink-400 transition-colors duration-200">
            Click to view on {platform === "fiverr" ? "Fiverr" : "Upwork"} →
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const Feedbacks = () => {
  return (
    <div className="mt-12 glass-effect rounded-[20px]">
      <div className={`rounded-2xl ${styles.padding} min-h-[300px]`}>
        <motion.div variants={textVariant()}>
          <p className={`${styles.sectionSubText} text-accent-light`}>
            What others say
          </p>
          <h2 className={styles.sectionHeadText}>
            Testimonials<span className="text-accent-light">.</span>
          </h2>
        </motion.div>
      </div>

      <div className={`-mt-20 pb-14 ${styles.paddingX} flex flex-wrap gap-7`}>
        {testimonials.map((testimonial, index) => (
          <FeedbackCard key={testimonial.name} index={index} {...testimonial} />
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-4 pb-10">
        <button
          onClick={() =>
            window.open(
              "https://www.fiverr.com/sellers/safyan08",
              "_blank",
              "noopener,noreferrer"
            )
          }
          className="group relative px-8 py-3 rounded-full font-semibold overflow-hidden transition-all duration-300 hover:scale-105"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600"></span>
          <span className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            View Reviews on Fiverr
          </span>
        </button>
        <button
          onClick={() =>
            window.open(
              "https://www.upwork.com/freelancers/~0110ed1cc027d85e0f",
              "_blank",
              "noopener,noreferrer"
            )
          }
          className="group relative px-8 py-3 rounded-full font-semibold overflow-hidden transition-all duration-300 hover:scale-105"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-600"></span>
          <span className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            View Reviews on Upwork
          </span>
        </button>
      </div>
    </div>
  );
};

export default SectionWrapper(Feedbacks, "testimonials");
