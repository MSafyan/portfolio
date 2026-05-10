import React, { useState, useEffect, useRef } from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { figma, playStoreIcon, appStoreIcon, webIcon } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { ProjectsTabs } from "../components";
import CustomModal from "./Modal";
import Modal from "react-modal";

Modal.setAppElement("#root");

const Works = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    const filtered =
      selectedCategory === "all"
        ? projects
        : projects.filter((project) => project.category === selectedCategory);
    setFilteredProjects(filtered);
  }, [selectedCategory]);

  const handleCategoryChange = (category) => setSelectedCategory(category);

  const handleTabClick = (tabKey) => {
    setActiveTab(tabKey);
    const categoryMap = {
      all: "all",
      first: "website",
      second: "mobile",
      third: "Ware Housing",
    };
    handleCategoryChange(categoryMap[tabKey] || "all");
  };

  const handleCardClick = (project) => {
    setActiveProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActiveProject(null);
  };

  return (
    <>
      <div>
        <p className={styles.sectionSubText}>My work</p>
        <h2 className={styles.sectionHeadText}>Projects.</h2>
      </div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          Following projects showcase my skills and experience through
          real-world examples of my work. Each project is briefly described with
          links to code repositories and live demos. It reflects my ability to
          solve complex problems, work with different technologies, and manage
          projects effectively.
        </motion.p>
      </div>

      <ProjectsTabs activeTab={activeTab} onTabClick={handleTabClick} />

      {selectedCategory === "all" ? (
        <div className="mt-20">
          {/* Website Projects */}
          {filteredProjects.filter((p) => p.category === "website").length >
            0 && (
            <div className="mb-16">
              <h3 className="text-white text-[24px] font-bold mb-8 pb-2 border-b border-secondary/30">
                Websites & Backend
              </h3>
              <div className="flex flex-wrap gap-7">
                {filteredProjects
                  .filter((p) => p.category === "website")
                  .map((project, index) => (
                    <ProjectCard
                      key={`project-${project.id}`}
                      index={index}
                      {...project}
                      onCardClick={() => handleCardClick(project)}
                    />
                  ))}
              </div>
            </div>
          )}

          {/* Data Warehouse Projects */}
          {filteredProjects.filter((p) => p.category === "Ware Housing")
            .length > 0 && (
            <div className="mb-16">
              <h3 className="text-white text-[24px] font-bold mb-8 pb-2 border-b border-secondary/30">
                Data Warehousing
              </h3>
              <div className="flex flex-wrap gap-7">
                {filteredProjects
                  .filter((p) => p.category === "Ware Housing")
                  .map((project, index) => (
                    <ProjectCard
                      key={`project-${project.id}`}
                      index={index}
                      {...project}
                      onCardClick={() => handleCardClick(project)}
                    />
                  ))}
              </div>
            </div>
          )}

          {/* Mobile Projects */}
          {filteredProjects.filter((p) => p.category === "mobile").length >
            0 && (
            <div className="mb-16">
              <h3 className="text-white text-[24px] font-bold mb-8 pb-2 border-b border-secondary/30">
                Mobile Applications
              </h3>
              <div className="flex flex-wrap gap-7">
                {filteredProjects
                  .filter((p) => p.category === "mobile")
                  .map((project, index) => (
                    <ProjectCard
                      key={`project-${project.id}`}
                      index={index}
                      {...project}
                      onCardClick={() => handleCardClick(project)}
                    />
                  ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-20 flex flex-wrap gap-7">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={`project-${project.id}`}
              index={index}
              {...project}
              onCardClick={() => handleCardClick(project)}
            />
          ))}
        </div>
      )}

      <CustomModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        project={activeProject}
      />
    </>
  );
};

const ProjectCard = ({
  index,
  name,
  description,
  image,
  source_code_link,
  android_link,
  dimensionsCategory,
  images,
  onCardClick,
}) => {
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768; // Detect mobile devices

    if (isMobile && dimensionsCategory === "website") {
      const image = imageRef.current;

      // Function to setup scroll animation after image loads
      const setupScrollAnimation = () => {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const image = imageRef.current;
                const container = containerRef.current;

                if (image && container) {
                  const imageHeight = image.offsetHeight;
                  const containerHeight = container.offsetHeight;

                  if (imageHeight > containerHeight) {
                    const scrollDistance = imageHeight - containerHeight;
                    image.style.transition =
                      "transform 5s cubic-bezier(0.25, 0.1, 0.25, 1)";
                    image.style.transform = `translateY(-${scrollDistance}px)`;
                  }
                }
              } else {
                if (imageRef.current) {
                  imageRef.current.style.transition = "transform 0.5s ease-out";
                  imageRef.current.style.transform = "translateY(0)";
                }
              }
            });
          },
          { threshold: 0.5 } // Trigger when 50% of the card is visible
        );

        if (containerRef.current) {
          observer.observe(containerRef.current);
        }

        return observer;
      };

      let observer;

      // Wait for image to load before setting up observer
      if (image) {
        if (image.complete) {
          // Image already loaded
          observer = setupScrollAnimation();
        } else {
          // Wait for image to load
          image.addEventListener('load', () => {
            observer = setupScrollAnimation();
          });
        }
      }

      return () => {
        if (observer && containerRef.current) {
          observer.unobserve(containerRef.current);
        }
      };
    }
  }, [dimensionsCategory]);

  const renderIcon = () => {
    const iconMap = {
      mobile: [
        { link: android_link, icon: playStoreIcon, alt: "Play Store" },
        { link: source_code_link, icon: appStoreIcon, alt: "App Store" },
      ],
      website: [{ link: source_code_link, icon: webIcon, alt: "Website" }],
      design: [{ link: source_code_link, icon: figma, alt: "Figma" }],
    };

    return (iconMap[dimensionsCategory] || []).map(
      ({ link, icon, alt }, idx) =>
        link && (
          <div
            key={`${alt}-${idx}`}
            onClick={(e) => {
              e.stopPropagation();
              window.open(link, "_blank");
            }}
            className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer mr-2"
          >
            <img src={icon} alt={alt} className="w-1/2 h-1/2 object-contain" />
          </div>
        )
    );
  };

  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.5, 0.75)}
      onClick={onCardClick}
      className="cursor-pointer"
    >
      <Tilt
        options={{ max: 45, scale: 1, speed: 450 }}
        className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full"
      >
        <div
          ref={containerRef}
          className={`scroll-container relative w-full ${
            ["mobile", "designMobile"].includes(dimensionsCategory)
              ? "h-[700px]"
              : "h-[230px]"
          } overflow-hidden`}
        >
          <img
            ref={imageRef}
            src={image}
            alt="project_image"
            className={`w-full ${
              dimensionsCategory === "website"
                ? "h-auto scroll-on-hover"
                : "h-full object-cover"
            } rounded-2xl`}
          />

          <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
            {renderIcon()}
          </div>
        </div>

        <div className="mt-5">
          <h3 className="text-white font-bold text-[24px]">{name}</h3>
          <p className="mt-2 text-secondary text-[14px]">{description}</p>
        </div>

        {/* View Project Button */}
        {source_code_link && source_code_link !== "#" && (
          <div className="mt-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                window.open(source_code_link, "_blank");
              }}
              className="btn-primary"
            >
              <span>
                {dimensionsCategory === "website"
                  ? "Visit Website"
                  : "View Project"}
              </span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </button>
          </div>
        )}

        {/* <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <p
              key={`${name}-${tag.name}`}
              className={`text-[14px] ${tag.color}`}
            >
              #{tag.name}
            </p>
          ))}
        </div> */}
      </Tilt>
    </motion.div>
  );
};

export default SectionWrapper(Works, "works");
