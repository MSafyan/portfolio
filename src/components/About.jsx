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
      className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
    >
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col"
      >
        <img
          src={icon}
          alt="web-development"
          className="w-16 h-16 object-contain"
        />

        <h3 className="text-white text-[20px] font-bold text-center">
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
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-white text-[17px] max-w-3xl leading-[30px]"
      >
        I'm Safyan, a <strong>Senior Mobile App Developer</strong> with 5+
        years of experience building scalable, cross-platform apps using{" "}
        <strong>Flutter and React Native</strong>. I specialize in{" "}
        <strong>state management</strong> (Redux, GetX, BLoC), real-time
        features, and smooth API integrations with{" "}
        <strong>Stripe, Firebase, Twilio</strong>, and custom backends. AWS
        Certified, I’ve led full-cycle development, optimized performance for
        100K+ users, and built CI/CD pipelines for faster releases. I also work
        with <strong>Shopify, WordPress, and modern web stacks</strong>. Focused
        on clean <strong>UI/UX</strong> and strong team collaboration, I love
        solving problems and delivering seamless mobile experiences.
        <br />
        {/* <br />
        📩 <strong>Email:</strong>{" "}
        <a
          href="mailto:msafyan080@gmail.com"
          className="text-blue-500 underline hover:text-orange-600 transition-colors duration-300 ease-in-out cursor-pointer"

        >
          msafyan080@gmail.com
        </a> */}
        <br />
        🔗 <strong>GitHub:</strong>{" "}
        <a
          href="https://github.com/MSafyan"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline hover:text-orange-600 transition-colors duration-300 ease-in-out cursor-pointer"
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
