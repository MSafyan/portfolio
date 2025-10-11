import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion";

const CertificationCard = ({ index, name, image, date, provider, link }) => {
  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.5, 0.75)}
      className="glass-card p-5 rounded-2xl sm:w-[360px] w-full hover:scale-[1.03] transition-all duration-300 cursor-pointer group"
      onClick={() => window.open(link, "_blank")}
    >
      <div className="relative overflow-hidden rounded-lg mb-4 bg-white p-4">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <h3 className="text-white text-[20px] font-bold group-hover:text-accent-light transition-colors duration-300">
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
