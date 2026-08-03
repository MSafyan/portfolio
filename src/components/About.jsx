import React from "react";
import { motion } from "framer-motion";

import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import SectionHeading from "./SectionHeading";
import { fadeIn, textVariant } from "../utils/motion";
import { Tilt } from "react-tilt";

const ACHIEVEMENTS = [
  { value: "10K+", label: "Users served", sub: "99.8% payment success" },
  { value: "95%", label: "AI cost cut", sub: "OpenAI / Pinecone platform" },
  { value: "$40M+", label: "Portfolios tracked", sub: "Enterprise data warehouse" },
  { value: "100K+", label: "Products / ETL run", sub: "Snowflake / Snowpark pipeline" },
];

const ServiceCard = ({ index, title, icon }) => (
  <Tilt className="w-full h-full">
    <motion.div variants={fadeIn("right", "spring", index * 0.08, 0.6)} className="w-full h-full group">
      <div
        options={{ max: 45, scale: 1, speed: 450 }}
        className="service-card rounded-2xl py-6 px-4 h-full min-h-[150px] flex justify-center items-center gap-3 flex-col"
      >
        <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-tertiary border border-accent/30 group-hover:border-accent transition-all duration-300">
          <img src={icon} alt={title} loading="lazy" decoding="async" className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300" />
        </div>
        <h3 className="text-white text-[13px] sm:text-[14px] font-bold text-center uppercase tracking-wide leading-snug min-h-[2.75em] flex items-center group-hover:text-accent transition-colors duration-300">
          {title}
        </h3>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <SectionHeading eyebrow="Introduction" title="Overview" />
      </motion.div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Bio column */}
        <motion.div
          variants={fadeIn("right", "tween", 0.1, 1)}
          className="lg:col-span-2 space-y-4"
        >
          <p className="text-white text-[17px] leading-[30px]">
            I&apos;m Safyan, an{" "}
            <span className="text-accent-light font-semibold">AWS-Certified Full-Stack & Cloud Engineer</span>{" "}
            (also CKAD & Terraform certified) with{" "}
            <span className="text-white font-semibold">5+ years</span> building scalable backend
            systems, cloud infrastructure, data pipelines, and AI platforms.
          </p>
          <p className="text-secondary text-[16px] leading-[28px]">
            Specialising in <strong className="text-white">Node.js, NestJS & TypeScript</strong> for
            microservices, with deep expertise in{" "}
            <strong className="text-white">AWS (EKS, RDS, S3)</strong> and{" "}
            <strong className="text-white">Azure (Data Factory, Databricks, Snowflake)</strong>. I
            thrive on solving complex technical challenges and delivering production-ready solutions.
          </p>
          <div className="flex items-center gap-2 pt-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            <a
              href="https://github.com/MSafyan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent font-semibold hover:text-accent-light transition-colors duration-200 underline underline-offset-4"
            >
              github.com/MSafyan
            </a>
          </div>
        </motion.div>

        {/* Achievement callouts */}
        <motion.div
          variants={fadeIn("left", "tween", 0.2, 1)}
          className="grid grid-cols-2 gap-3"
        >
          {ACHIEVEMENTS.map((a, i) => (
            <div key={i} className="achievement-chip">
              <div className="text-2xl font-black text-accent-light">{a.value}</div>
              <div className="text-white text-[13px] font-semibold mt-0.5">{a.label}</div>
              <div className="text-secondary text-[11px] mt-0.5 leading-tight">{a.sub}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Service cards */}
      <div className="mt-16 card-grid--sm">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
