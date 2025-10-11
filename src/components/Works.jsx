
import React, { useState, useEffect,useRef } from "react";
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
  const [selectedCategory, setSelectedCategory] = useState("mobile");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [activeTab, setActiveTab] = useState("second");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState([]);

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
      first: "website",
      second: "mobile",
      third: "design",
    };
    handleCategoryChange(categoryMap[tabKey] || "all");
  };

  const handleCardClick = (images) => {
    setModalImages(images);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImages([]);
  };

  return (
    <>
      <div >
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

      <div className="mt-20 flex flex-wrap gap-7">
        {filteredProjects.map((project, index) => (
          <ProjectCard
            key={`project-${index}`}
            index={index}
            {...project}
            onCardClick={() => handleCardClick(project.images)}
          />
        ))}
      </div>

      <CustomModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        modalImages={modalImages}
        category={selectedCategory}
      />
    </>
  );
};


const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
  android_link,
  dimensionsCategory,
  onCardClick,
}) => {
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768; // Detect mobile devices

    if (isMobile && dimensionsCategory === "website") {
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
                  image.style.transition = "transform 5s cubic-bezier(0.25, 0.1, 0.25, 1)";
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

      return () => {
        if (containerRef.current) {
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
      onClick={() => {
        if (dimensionsCategory === "mobile") {
          onCardClick(); 
        }
      }}
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
              dimensionsCategory === "website" ? "h-auto scroll-on-hover" : "h-full object-cover"
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