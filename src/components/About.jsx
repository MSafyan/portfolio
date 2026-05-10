import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { Tilt } from "react-tilt";

const ServiceCard = ({ index, title, icon }) => (
  <Tilt className="xs:w-[250px] w-full">
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className="w-full group"
    >
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="glass-card rounded-[20px] py-8 px-12 min-h-[280px] flex justify-evenly items-center flex-col"
      >
        <div className="w-20 h-20 flex items-center justify-center bg-tertiary border-2 border-[#06b6d4] mb-4 group-hover:border-[#22d3ee] transition-all duration-300">
          <img
            src={icon}
            alt="web-development"
            className="w-12 h-12 object-contain group-hover:scale-110 transition-all duration-300"
          />
        </div>

        <h3 className="text-white text-[18px] font-bold text-center uppercase tracking-wide group-hover:text-[#06b6d4] transition-colors duration-300">
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
        <p
          className={`${styles.sectionSubText} text-accent uppercase tracking-widest`}
        >
          /// Introduction
        </p>
        <h2 className={`${styles.sectionHeadText} uppercase`}>
          Overview<span className="text-accent-orange">_</span>
        </h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-white text-[17px] max-w-3xl leading-[30px]"
      >
        I'm Safyan, an{" "}
        <strong>AWS-Certified Full-Stack & Cloud Engineer</strong> (also CKAD &
        Terraform certified) with 5+ years building scalable backend systems,
        cloud infrastructure, data pipelines, and AI platforms. I specialize in{" "}
        <strong>Node.js, NestJS, and TypeScript</strong> for microservices, with
        deep expertise in <strong>AWS (EKS, RDS, S3, ECR)</strong> and{" "}
        <strong>Azure (Data Factory, SQL, Databricks, Snowflake)</strong>. Key
        highlights: built a Swedish marketplace serving{" "}
        <strong>10,000+ users with 99.8% payment success</strong>; achieved{" "}
        <strong>95% AI cost reduction</strong> on an OpenAI/Pinecone platform;
        designed enterprise data warehouses tracking{" "}
        <strong>$40M+ project portfolios</strong>; architected a
        Snowflake/Snowpark ETL pipeline enriching{" "}
        <strong>50k–100k+ products per run</strong>; and built a full-stack{" "}
        <strong>automotive pricing intelligence platform</strong> with 6
        provider integrations and cron-driven deal discovery. I thrive on
        solving complex technical challenges and delivering production-ready
        solutions.
        <br />
        {/* <br />
        📩 <strong>Email:</strong>{" "}
        <a
          href="mailto:msafyan080@gmail.com"
          className="text-accent-light underline hover:text-pink-400 transition-colors duration-300 ease-in-out cursor-pointer"

        >
          msafyan080@gmail.com
        </a> */}
        <br />
        🔗 <strong>GitHub:</strong>{" "}
        <a
          href="https://github.com/MSafyan"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent underline hover:text-accent-orange transition-colors duration-300 ease-in-out cursor-pointer font-bold"
        >
          github.com/MSafyan
        </a>
      </motion.p>

      <div className="mt-20 flex flex-wrap gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
