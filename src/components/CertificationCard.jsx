import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion";

const CertificationCard = ({ index, name, image, date, provider, link }) => {
  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.08, 0.6)}
      className="glass-card p-5 rounded-2xl w-full h-full flex flex-col cursor-pointer group"
      onClick={() => window.open(link, "_blank")}
    >
      <div className="relative overflow-hidden rounded-xl mb-4 p-5 bg-white/[0.94]">
        <img
          src={image}
          alt={name}
          loading="lazy"
          decoding="async"
          className="w-full h-48 object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <h3 className="text-white text-[18px] font-bold leading-snug flex-1 group-hover:text-accent-light transition-colors duration-300">
        {name}
      </h3>
      <p className="text-accent-light text-[14px] mt-1 font-semibold">
        {provider}
      </p>
      <p className="text-white-100 text-[13px] mt-1">{date}</p>
    </motion.div>
  );
};

export default CertificationCard;
