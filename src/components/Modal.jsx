import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "react-modal";

const tagColors = {
  "blue-text-gradient": "#60a5fa",
  "green-text-gradient": "#4ade80",
  "pink-text-gradient": "#f472b6",
  "yellow-text-gradient": "#facc15",
  "purple-text-gradient": "#a78bfa",
  "orange-text-gradient": "#fb923c",
};

/* ── Image Gallery ──────────────────────────────────────────────── */
const ImageGallery = ({ project }) => {
  const modalImages = project?.images || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });

  const category = project?.dimensionsCategory;

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % modalImages.length);
    setIsZoomed(false);
  }, [modalImages.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? modalImages.length - 1 : prev - 1));
    setIsZoomed(false);
  }, [modalImages.length]);

  const onTouchStart = (e) => { setTouchEnd(null); setTouchStart(e.targetTouches[0].clientX); };
  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) goToNext();
    else if (distance < -50) goToPrevious();
  };

  const handleMouseMove = (e) => {
    if (!isZoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setZoomPosition({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
  };

  if (!modalImages.length) return null;

  const imageHeight = category === "mobile" ? "500px" : "380px";

  return (
    <div className="mt-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-secondary mb-3">Screenshots</p>

      {/* Main Image */}
      <div
        className="relative bg-black rounded-xl overflow-hidden"
        style={{ height: imageHeight }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.25 }}
            className="w-full h-full flex items-center justify-center p-3"
            onMouseMove={handleMouseMove}
            onClick={() => setIsZoomed((z) => !z)}
            style={{ cursor: isZoomed ? "zoom-out" : "zoom-in" }}
          >
            <img
              src={modalImages[currentIndex]}
              alt={`Screenshot ${currentIndex + 1}`}
              className="select-none rounded-lg"
              style={{
                maxWidth: "100%", maxHeight: "100%", width: "auto", height: "auto",
                objectFit: "contain",
                transform: isZoomed ? "scale(2)" : "scale(1)",
                transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                transition: isZoomed ? "none" : "transform 0.3s ease",
              }}
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>

        {modalImages.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-tertiary/80 hover:bg-tertiary text-white w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 backdrop-blur-sm z-10"
              aria-label="Previous"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button
              onClick={goToNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-tertiary/80 hover:bg-tertiary text-white w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 backdrop-blur-sm z-10"
              aria-label="Next"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </>
        )}

        <div className="absolute bottom-3 left-3 bg-tertiary/80 text-white px-2.5 py-1 rounded-full text-xs backdrop-blur-sm">
          {isZoomed ? "Click to zoom out" : "Click to zoom in"} &nbsp;·&nbsp; {currentIndex + 1}/{modalImages.length}
        </div>
      </div>

      {/* Thumbnails */}
      {modalImages.length > 1 && (
        <div className="mt-3 overflow-x-auto">
          <div className="flex gap-2 pb-1">
            {modalImages.map((image, index) => (
              <motion.button
                key={index}
                onClick={() => { setCurrentIndex(index); setIsZoomed(false); }}
                className={`relative rounded-lg overflow-hidden flex-shrink-0 transition-all ${index === currentIndex ? "ring-2 ring-white scale-105 opacity-100" : "opacity-50 hover:opacity-80"}`}
                whileTap={{ scale: 0.95 }}
                style={{ width: category === "website" ? "110px" : "70px", height: category === "website" ? "65px" : "70px" }}
              >
                <img src={image} alt={`Thumb ${index + 1}`} className="w-full h-full object-cover" />
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

/* ── Unified Project Modal ──────────────────────────────────────── */
const ProjectModalContent = ({ project, closeModal }) => {
  const categoryLabel = {
    website: "Web / Backend",
    mobile: "Mobile App",
    "Ware Housing": "Data / ETL",
  }[project?.category] || project?.category;

  // Use images array if populated, otherwise fall back to the card thumbnail
  const resolvedImages =
    project?.images && project.images.length > 0
      ? project.images
      : project?.image
      ? [project.image]
      : [];
  const hasImages = resolvedImages.length > 0;
  const projectWithImages = { ...project, images: resolvedImages };

  // Keyboard close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") { e.preventDefault(); closeModal(); }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeModal]);

  return (
    <div className="flex flex-col" style={{ maxHeight: "90vh" }}>
      {/* Sticky Header */}
      <div className="flex justify-between items-start bg-tertiary px-6 py-5 border-b border-white/10 sticky top-0 z-10 flex-shrink-0">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-accent mb-1 block">
            {categoryLabel}
          </span>
          <h2 className="text-white text-xl font-bold leading-snug">{project?.name}</h2>
        </div>
        <button
          onClick={closeModal}
          className="text-secondary hover:text-white transition-colors ml-4 mt-1 flex-shrink-0"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Scrollable Body */}
      <div className="overflow-y-auto flex-1 p-6 space-y-6 bg-[#050816]">
        {/* Image Gallery — top */}
        {hasImages && <ImageGallery project={projectWithImages} />}

        {/* Overview */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-secondary mb-2">Overview</p>
          <p className="text-white/90 text-[15px] leading-[27px]">{project?.description}</p>
        </div>

        {/* Highlights */}
        {project?.highlights && project.highlights.length > 0 && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-secondary mb-3">Key Highlights</p>
            <ul className="space-y-2.5">
              {project.highlights.map((point, i) => (
                <li key={i} className="flex gap-3 text-white/85 text-[14px] leading-[22px]">
                  <span className="text-accent mt-0.5 flex-shrink-0">▸</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tech Stack */}
        {project?.tags && project.tags.length > 0 && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-secondary mb-2">Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag.name}
                  className="px-3 py-1 rounded-full text-sm font-semibold border"
                  style={{
                    color: tagColors[tag.color] || "#60a5fa",
                    borderColor: `${tagColors[tag.color] || "#60a5fa"}40`,
                    background: `${tagColors[tag.color] || "#60a5fa"}10`,
                  }}
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Links */}
        <div className="flex flex-wrap gap-3">
          {project?.source_code_link && project.source_code_link !== "#" && (
            <a
              href={project.source_code_link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              {project?.dimensionsCategory === "mobile" ? "View on Store" : "Visit Website"}
            </a>
          )}
          {project?.android_link && (
            <a
              href={project.android_link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Play Store
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

/* ── Main Modal ─────────────────────────────────────────────────── */
const CustomModal = ({ isModalOpen, closeModal, project }) => {
  const customStyles = {
    content: {
      backgroundColor: "#050816",
      border: "none",
      borderRadius: "20px",
      boxShadow: "0 0 40px rgba(0, 0, 0, 0.9)",
      padding: "0",
      margin: "auto",
      maxWidth: "720px",
      width: "calc(100% - 32px)",
      maxHeight: "92vh",
      overflow: "hidden",
      inset: "50% auto auto 50%",
      transform: "translate(-50%, -50%)",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.9)",
      zIndex: 1000,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Project Detail"
      closeTimeoutMS={300}
    >
      {project && (
        <ProjectModalContent project={project} closeModal={closeModal} />
      )}
    </Modal>
  );
};

export default CustomModal;
