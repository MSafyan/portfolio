import { motion } from "framer-motion";
import { styles } from "../styles";
import { ComputersCanvas, SpacemanCanvas } from "./canvas";
import { myResume } from "../assets";
const Hero = () => {
  const isDesktop = window.innerWidth > 768;
  return (
    <section className={`relative w-full h-screen mx-auto`}>
      <div
        className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        <div className="relative z-10">
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm <span className="text-[#915EFF]">Safyan</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            I develop Mobile Apps, user <br className="sm:block hidden" />
            interfaces and web applications.
          </p>
          <div className="flex gap-4 mt-5">
            <a
              href="mailto: msafyan080@gmail.com"
              className="bg-white text-primary px-4 py-2 rounded-full font-semibold"
            >
              Hire Me
            </a>
            <a
              href="#works"
              className="border border-white text-white px-4 py-2 rounded-full font-semibold"
            >
              My Projects
            </a>
          </div>
          <div className="flex gap-4 mt-5">
            <button
              onClick={() => {
                window.open(myResume, "_blank");
              }}
              className="bg-transparent hover:opacity-80 active:opacity-60 transition-opacity border border-white p-1.5 rounded-full"
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
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </button>
            <button
              onClick={() => {
                const link = document.createElement("a");
                link.href = myResume;
                link.download = "Safyan_Akram_Resume.pdf";
                link.click();
              }}
              className="bg-transparent hover:opacity-80 active:opacity-60 transition-opacity border border-white p-1.5 rounded-full"
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
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <img className="parallax__stars" src="./parallax/1Stars.svg" alt="" />
      <img className="parallax__planets" src="./parallax/2Planets.svg" alt="" />
      <img className="parallax__sun" src="./parallax/6Sun.svg" alt="" />
      <img
        className="parallax__mountain1"
        src="./parallax/3Mountain.svg"
        alt=""
      />
      <img
        className="parallax__mountain2"
        src="./parallax/4Mountain.svg"
        alt=""
      />
      <img className="parallax__crater" src="./parallax/5Crater.svg" alt="" />

      {/* Canvas adjusted to avoid blocking */}
      {/* {window.innerWidth > 768 && ( */}
        <div className={`absolute inset-0 z-0 pointer-events-none ${isDesktop ? "mt-20" : "mt-0"}`}>
          {/* <ComputersCanvas /> */}
          <SpacemanCanvas />
        </div>
      {/* )} */}

      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <a href="#works">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
