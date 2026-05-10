import { styles } from "../styles";
import { myResume } from "../assets";

const Hero = () => {
  return (
    <section className={`relative w-full h-screen mx-auto`}>
      <div
        className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-gradient-to-r from-accent-light to-pink-500 shadow-glow animate-pulse" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        <div className="relative z-10">
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm <span className="text-accent font-semibold">Safyan</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            I build scalable backend systems, <br className="sm:block hidden" />
            cloud infrastructure & AI/ML solutions.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <a href="mailto: msafyan080@gmail.com" className="btn-primary">
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
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Hire Me
            </a>
            <a href="#works" className="btn-outline">
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
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              My Projects
            </a>
          </div>
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => {
                window.open(myResume, "_blank");
              }}
              className="bg-white p-2.5 rounded-full transition-all duration-200 hover:bg-opacity-90 active:scale-95"
              title="View Resume"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-primary"
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
              className="bg-white p-2.5 rounded-full transition-all duration-200 hover:bg-opacity-90 active:scale-95"
              title="Download Resume"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-primary"
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
      <img className="parallax__stars" src="./parallax/1Stars.svg" alt="" width="1920" height="1080" />
      <img className="parallax__planets" src="./parallax/2Planets.svg" alt="" width="1920" height="1080" />
      <img className="parallax__sun" src="./parallax/6Sun.svg" alt="" width="1920" height="1080" />
      <img className="parallax__mountain1" src="./parallax/3Mountain.svg" alt="" width="1920" height="1080" />
      <img className="parallax__mountain2" src="./parallax/4Mountain.svg" alt="" width="1920" height="1080" />
      <img className="parallax__crater" src="./parallax/5Crater.svg" alt="" width="1920" height="1080" />

      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <a href="#works" aria-label="Scroll to projects">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <div className="w-3 h-3 rounded-full bg-secondary mb-1 scroll-bounce" />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
