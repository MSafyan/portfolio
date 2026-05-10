import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "react-modal";

/* ── Project Detail View (no images) ───────────────────────────── */
const ProjectDetail = ({ project, closeModal }) => {
  const categoryLabel = {
    website: "Web / Backend",
    mobile: "Mobile App",
    "Ware Housing": "Data / ETL",
  }[project?.category] || project?.category;

  const tagColors = {
    "blue-text-gradient": "#60a5fa",
    "green-text-gradient": "#4ade80",
    "pink-text-gradient": "#f472b6",
    "yellow-text-gradient": "#facc15",
    "purple-text-gradient": "#a78bfa",
    "orange-text-gradient": "#fb923c",
  };

  return (
    <div className="relative flex flex-col" style={{ maxHeight: "90vh", overflowY: "auto" }}>
      {/* Header */}
      <div className="flex justify-between items-start bg-tertiary px-6 py-5 border-b border-white/10 sticky top-0 z-10">
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

      {/* Body */}
      <div className="p-8 space-y-8 bg-[#050816]">
        {/* Description */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-secondary mb-3">Overview</p>
          <p className="text-white/90 text-[16px] leading-[28px]">{project?.description}</p>
        </div>

        {/* Tech Stack */}
        {project?.tags && project.tags.length > 0 && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-secondary mb-3">Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag.name}
                  className="px-3 py-1.5 rounded-full text-sm font-semibold border"
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
        <div className="flex flex-wrap gap-3 pt-2">
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

/* ── Image Gallery View ─────────────────────────────────────────── */
const ImageGallery = ({ project, closeModal }) => {
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

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") { e.preventDefault(); goToPrevious(); }
      else if (e.key === "ArrowRight") { e.preventDefault(); goToNext(); }
      else if (e.key === "Escape") { e.preventDefault(); closeModal(); }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrevious, closeModal]);

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

  return (
    <div className="relative h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center bg-tertiary px-6 py-4 border-b border-gray-700">
        <div className="flex items-center gap-4">
          <h2 className="text-white text-lg font-semibold">{project?.name}</h2>
          <span className="text-secondary text-sm">{currentIndex + 1} / {modalImages.length}</span>
        </div>
        <button
          onClick={closeModal}
          className="text-white hover:text-gray-300 transition-colors text-2xl leading-none w-8 h-8 flex items-center justify-center"
          aria-label="Close modal"
        >
          ×
        </button>
      </div>

      {/* Image */}
      <div
        className="relative bg-black overflow-hidden"
        style={{ height: category === "website" ? "calc(95vh - 200px)" : "calc(95vh - 180px)", minHeight: "400px" }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full flex items-center justify-center p-4"
            onMouseMove={handleMouseMove}
            onClick={() => setIsZoomed((z) => !z)}
            style={{ cursor: isZoomed ? "zoom-out" : "zoom-in" }}
          >
            <img
              src={modalImages[currentIndex]}
              alt={`Showcase ${currentIndex + 1}`}
              className="select-none"
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
            <button onClick={goToPrevious} className="absolute left-4 top-1/2 -translate-y-1/2 bg-tertiary/80 hover:bg-tertiary text-white w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 backdrop-blur-sm z-10" aria-label="Previous image">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button onClick={goToNext} className="absolute right-4 top-1/2 -translate-y-1/2 bg-tertiary/80 hover:bg-tertiary text-white w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 backdrop-blur-sm z-10" aria-label="Next image">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </>
        )}

        <div className="absolute bottom-4 left-4 bg-tertiary/80 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
          {isZoomed ? "Click to zoom out" : "Click to zoom in"}
        </div>
      </div>

      {/* Thumbnails */}
      {modalImages.length > 1 && (
        <div className="bg-tertiary px-4 py-3 border-t border-gray-700 overflow-x-auto">
          <div className="flex gap-2 justify-center min-w-max mx-auto">
            {modalImages.map((image, index) => (
              <motion.button
                key={index}
                onClick={() => { setCurrentIndex(index); setIsZoomed(false); }}
                className={`relative rounded-lg overflow-hidden transition-all flex-shrink-0 ${index === currentIndex ? "ring-2 ring-white scale-105" : "opacity-60 hover:opacity-100"}`}
                whileHover={{ scale: index === currentIndex ? 1.05 : 1.1 }}
                whileTap={{ scale: 0.95 }}
                style={{ width: category === "website" ? "120px" : "80px", height: category === "website" ? "70px" : "80px" }}
              >
                <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                {index === currentIndex && <div className="absolute inset-0 border-2 border-white pointer-events-none" />}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      <div className="absolute top-20 right-4 bg-tertiary/80 text-white px-3 py-2 rounded-lg text-xs backdrop-blur-sm hidden md:block">
        <div className="space-y-1">
          <div><kbd className="px-2 py-1 bg-black/30 rounded">←</kbd> / <kbd className="px-2 py-1 bg-black/30 rounded">→</kbd> Navigate</div>
          <div><kbd className="px-2 py-1 bg-black/30 rounded">ESC</kbd> Close</div>
        </div>
      </div>
    </div>
  );
};

/* ── Main Modal ─────────────────────────────────────────────────── */
const CustomModal = ({ isModalOpen, closeModal, project }) => {
  const hasImages = project?.images && project.images.length > 0;

  const customStyles = {
    content: {
      backgroundColor: "#050816",
      border: "none",
      borderRadius: "20px",
      boxShadow: "0 0 30px rgba(0, 0, 0, 0.8)",
      padding: "0",
      margin: "auto",
      maxWidth: hasImages ? (project?.dimensionsCategory === "website" ? "95%" : "90%") : "680px",
      width: hasImages ? undefined : "calc(100% - 32px)",
      maxHeight: "95vh",
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
      {hasImages ? (
        <ImageGallery project={project} closeModal={closeModal} />
      ) : (
        <ProjectDetail project={project} closeModal={closeModal} />
      )}
    </Modal>
  );
};

export default CustomModal;
