import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion";

const CertificationCard = ({ index, name, image, date, provider, link }) => {
  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.5, 0.75)}
      className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full shadow-card hover:scale-[1.03] transition-transform duration-300 cursor-pointer"
      onClick={() => window.open(link, "_blank")}
    >
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-contain rounded-lg mb-4 bg-white"
      />
      <h3 className="text-white text-[20px] font-bold">{name}</h3>
      <p className="text-secondary text-[14px] mt-1">{provider}</p>
      <p className="text-white-100 text-[13px] mt-1">{date}</p>
    </motion.div>
  );
};

export default CertificationCard;
