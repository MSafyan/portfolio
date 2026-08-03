import React from "react";
import { motion } from "framer-motion";

import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { testimonials } from "../constants";
import SectionHeading from "./SectionHeading";

const Stars = () => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const FeedbackCard = ({
  index,
  testimonial,
  name,
  platform,
  platformUrl,
}) => {
  const handleClick = () => window.open(platformUrl, "_blank", "noopener,noreferrer");

  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.4, 0.75)}
      className="testimonial-card group"
      onClick={handleClick}
    >
      {/* Top row: quote + platform badge */}
      <div className="flex items-start justify-between mb-4">
        <span className="text-accent text-5xl font-serif leading-none select-none">&ldquo;</span>
        <span className={`platform-badge platform-badge--${platform}`}>
          {platform === "fiverr" ? "Fiverr" : "Upwork"}
        </span>
      </div>

      {/* Stars */}
      <Stars />

      {/* Quote */}
      <p
        className="text-secondary text-[15px] leading-relaxed mt-3"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 7,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {testimonial}
      </p>

      {/* Author */}
      <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
        <p className="text-white font-semibold text-[15px]">
          <span className="text-accent">@</span> {name}
        </p>
        <span className="text-accent text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          View review →
        </span>
      </div>
    </motion.div>
  );
};

const Feedbacks = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <SectionHeading eyebrow="What others say" title="Testimonials" />
      </motion.div>

      <div className="mt-16 columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {testimonials.map((testimonial, index) => (
          <div key={testimonial.name} className="break-inside-avoid">
            <FeedbackCard index={index} {...testimonial} />
          </div>
        ))}
      </div>

      <div className="mt-14 flex flex-wrap justify-center gap-4">
        <button
          onClick={() => window.open("https://www.fiverr.com/s/P216loL", "_blank", "noopener,noreferrer")}
          className="btn-outline"
        >
          View Reviews on Fiverr
        </button>
        <button
          onClick={() => window.open("https://www.upwork.com/freelancers/~0110ed1cc027d85e0f", "_blank", "noopener,noreferrer")}
          className="btn-primary"
        >
          View Reviews on Upwork
        </button>
      </div>
    </>
  );
};

export default SectionWrapper(Feedbacks, "testimonials");
