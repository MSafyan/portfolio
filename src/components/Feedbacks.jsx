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
      className="bg-tertiary p-10 rounded-3xl xs:w-[320px] w-full cursor-pointer transition-all duration-300 hover:scale-105 group"
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
          <span className="text-accent-light text-sm font-medium group-hover:text-[#06b6d4] transition-colors duration-200">
            Click to view on {platform === "fiverr" ? "Fiverr" : "Upwork"} →
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const Feedbacks = () => {
  return (
    <>
      <div>
        <p className={styles.sectionSubText}>What others say</p>
        <h2 className={styles.sectionHeadText}>Testimonials.</h2>
      </div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          Here are some testimonials from clients who have worked with me on
          various projects. These reviews reflect my commitment to delivering
          quality work and maintaining professional relationships with clients
          across different platforms.
        </motion.p>
      </div>

      <div className="mt-20 flex flex-wrap gap-7">
        {testimonials.map((testimonial, index) => (
          <FeedbackCard key={testimonial.name} index={index} {...testimonial} />
        ))}
      </div>

      <div className="mt-20 flex flex-wrap justify-center gap-4">
        <button
          onClick={() =>
            window.open(
              "https://www.fiverr.com/sellers/safyan08",
              "_blank",
              "noopener,noreferrer"
            )
          }
          className="btn-outline"
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
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          View Reviews on Fiverr
        </button>
        <button
          onClick={() =>
            window.open(
              "https://www.upwork.com/freelancers/~0110ed1cc027d85e0f",
              "_blank",
              "noopener,noreferrer"
            )
          }
          className="btn-primary"
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
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          View Reviews on Upwork
        </button>
      </div>
    </>
  );
};

export default SectionWrapper(Feedbacks, "testimonials");
