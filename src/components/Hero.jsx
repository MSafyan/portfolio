import { useEffect, useRef } from "react";
import { styles } from "../styles";
import { myResume } from "../assets";

const ORBIT_BADGES = [
  { label: "Backend", color: "#3b82f6" },
  { label: "Cloud", color: "#06b6d4" },
  { label: "AI / ML", color: "#8b5cf6" },
  { label: "DevOps", color: "#f59e0b" },
  { label: "Mobile", color: "#ec4899" },
];

const AstronautSVG = () => (
  <svg viewBox="0 0 160 210" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <linearGradient id="visorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0f2744" />
        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.9" />
      </linearGradient>
      <radialGradient id="bodyGrad" cx="40%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#f8fafc" />
        <stop offset="100%" stopColor="#cbd5e1" />
      </radialGradient>
      <filter id="softGlow">
        <feGaussianBlur stdDeviation="1.5" result="b" />
        <feMerge>
          <feMergeNode in="b" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <rect x="6" y="96" width="32" height="52" rx="16" fill="url(#bodyGrad)" />
    <rect x="122" y="96" width="32" height="52" rx="16" fill="url(#bodyGrad)" />
    <rect x="36" y="90" width="88" height="90" rx="24" fill="url(#bodyGrad)" />
    <circle cx="80" cy="66" r="48" fill="url(#bodyGrad)" />
    <circle cx="80" cy="66" r="48" fill="none" stroke="#94a3b8" strokeWidth="2" />
    <ellipse cx="80" cy="67" rx="31" ry="28" fill="url(#visorGrad)" />
    <ellipse cx="67" cy="56" rx="9" ry="6" fill="white" opacity="0.2" />
    <line x1="80" y1="18" x2="80" y2="5" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
    <circle cx="80" cy="4" r="5" fill="#3b82f6" filter="url(#softGlow)" />
    <rect x="55" y="118" width="50" height="38" rx="10" fill="#3b82f6" opacity="0.25" />
    <rect x="55" y="118" width="50" height="38" rx="10" fill="none" stroke="#3b82f6" strokeWidth="1" opacity="0.5" />
    <circle cx="67" cy="127" r="4" fill="#06b6d4" opacity="0.9" />
    <circle cx="80" cy="127" r="4" fill="#f59e0b" opacity="0.9" />
    <circle cx="93" cy="127" r="4" fill="#ec4899" opacity="0.9" />
    <circle cx="80" cy="143" r="9" fill="#3b82f6" opacity="0.8" filter="url(#softGlow)" />
    <polygon points="80,137 83,142 89,142 84,146 86,152 80,148 74,152 76,146 71,142 77,142" fill="white" opacity="0.9" />
    <rect x="50" y="172" width="28" height="30" rx="14" fill="url(#bodyGrad)" />
    <rect x="82" y="172" width="28" height="30" rx="14" fill="url(#bodyGrad)" />
    <rect x="46" y="193" width="34" height="14" rx="7" fill="#94a3b8" />
    <rect x="80" y="193" width="34" height="14" rx="7" fill="#94a3b8" />
  </svg>
);

const Hero = () => {
  const starsRef = useRef(null);
  const planetsRef = useRef(null);
  const sunRef = useRef(null);
  const m1Ref = useRef(null);
  const m2Ref = useRef(null);
  const craterRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const moveX = (e.clientX - window.innerWidth / 2) / window.innerWidth;
      const moveY = (e.clientY - window.innerHeight / 2) / window.innerHeight;
      if (starsRef.current)
        starsRef.current.style.transform = `translate(${moveX * 8}px, ${moveY * 6}px)`;
      if (planetsRef.current)
        planetsRef.current.style.transform = `translate(${moveX * 14}px, ${moveY * 10}px)`;
      if (sunRef.current)
        sunRef.current.style.transform = `translate(${moveX * 18}px, ${moveY * 14}px)`;
      if (m1Ref.current)
        m1Ref.current.style.transform = `translate(${moveX * 22}px, ${moveY * 16}px)`;
      if (m2Ref.current)
        m2Ref.current.style.transform = `translate(${moveX * 26}px, ${moveY * 18}px)`;
      if (craterRef.current)
        craterRef.current.style.transform = `translate(${moveX * 30}px, ${moveY * 22}px)`;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative w-full h-screen mx-auto overflow-hidden">
      <img ref={starsRef}   className="parallax__stars"     src="./parallax/1Stars.svg"    alt="" width="1920" height="1080" />
      <img ref={planetsRef} className="parallax__planets"   src="./parallax/2Planets.svg"  alt="" width="1920" height="1080" />
      <img ref={sunRef}     className="parallax__sun"       src="./parallax/6Sun.svg"      alt="" width="1920" height="1080" />
      <img ref={m1Ref}      className="parallax__mountain1" src="./parallax/3Mountain.svg" alt="" width="1920" height="1080" />
      <img ref={m2Ref}      className="parallax__mountain2" src="./parallax/4Mountain.svg" alt="" width="1920" height="1080" />
      <img ref={craterRef}  className="parallax__crater"    src="./parallax/5Crater.svg"   alt="" width="1920" height="1080" />

      <div className={`absolute inset-0 top-[100px] max-w-7xl mx-auto ${styles.paddingX} flex items-center`}>
        <div className="flex flex-col justify-center items-center self-start mt-5 mr-5 flex-shrink-0">
          <div className="w-5 h-5 rounded-full bg-gradient-to-r from-accent-light to-pink-500 shadow-glow animate-pulse" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-6 items-center min-w-0">
          {/* Left: heading + CTAs */}
          <div className="hero-left-panel md:col-span-3">
            <h1 className={`${styles.heroHeadText} text-white`}>
              Hi, I&apos;m{" "}
              <span className="text-accent font-semibold">Safyan</span>
            </h1>
            <p className={`${styles.heroSubText} mt-3 text-white-100`}>
              I build scalable backend systems,{" "}
              <br className="sm:block hidden" />
              cloud infrastructure & AI/ML solutions.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <a href="mailto:msafyan080@gmail.com" className="btn-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Hire Me
              </a>
              <a href="#works" className="btn-outline">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                My Projects
              </a>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => window.open(myResume, "_blank")}
                className="bg-white p-2.5 rounded-full transition-all duration-200 hover:bg-opacity-90 active:scale-95"
                title="View Resume"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
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
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
              {/* Social links */}
              <a href="https://github.com/MSafyan" target="_blank" rel="noopener noreferrer" className="hero-social-link" title="GitHub">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
              <a href="https://linkedin.com/in/safyanakram" target="_blank" rel="noopener noreferrer" className="hero-social-link" title="LinkedIn">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>

            {/* Certification badges */}
            <div className="flex flex-wrap gap-2 mt-6">
              <a href="https://www.credly.com/badges/9f649e53-5fca-4a2b-9d32-935d3da280f1/public_url" target="_blank" rel="noopener noreferrer" className="cert-badge">
                <span className="cert-badge-dot" style={{ background: "#FF9900" }} />
                AWS Certified
              </a>
              <a href="https://www.credly.com/badges/bea98d78-b0ee-4171-9e06-146ebde91bbf/public_url" target="_blank" rel="noopener noreferrer" className="cert-badge">
                <span className="cert-badge-dot" style={{ background: "#326CE5" }} />
                CKAD
              </a>
              <a href="https://www.credly.com/badges/41cf43ff-e454-4191-8174-e54ee6856a14/public_url" target="_blank" rel="noopener noreferrer" className="cert-badge">
                <span className="cert-badge-dot" style={{ background: "#7B42BC" }} />
                Terraform Associate
              </a>
            </div>

            {/* Key metrics strip */}
            <div className="flex flex-wrap gap-x-6 gap-y-1 mt-5">
              <span className="hero-metric">10K+ users served</span>
              <span className="hero-metric-sep">·</span>
              <span className="hero-metric">95% AI cost reduction</span>
              <span className="hero-metric-sep">·</span>
              <span className="hero-metric">$40M+ portfolios tracked</span>
            </div>
          </div>

          {/* Right: floating astronaut + orbiting badges */}
          <div className="hidden md:flex md:col-span-2 items-center justify-center">
            <div className="astronaut-scene">
              <div className="orbit-ring">
                {ORBIT_BADGES.map((badge, i) => {
                  const angle = (i / ORBIT_BADGES.length) * 360;
                  return (
                    <div
                      key={badge.label}
                      className="badge-slot"
                      style={{ transform: `rotate(${angle}deg) translateX(130px)` }}
                    >
                      <div className="badge-pill" style={{ borderColor: badge.color, color: badge.color }}>
                        {badge.label}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="astronaut-float">
                <AstronautSVG />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center z-10">
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
