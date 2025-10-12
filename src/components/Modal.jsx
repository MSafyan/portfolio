import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "react-modal";

const CustomModal = ({ isModalOpen, closeModal, modalImages, category }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });

  // Reset state when modal opens/closes or images change
  useEffect(() => {
    if (isModalOpen) {
      setCurrentIndex(0);
      setIsZoomed(false);
    }
  }, [isModalOpen, modalImages]);

  // Navigation handlers
  const goToNext = useCallback(() => {
    if (modalImages.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % modalImages.length);
      setIsZoomed(false);
    }
  }, [modalImages.length]);

  const goToPrevious = useCallback(() => {
    if (modalImages.length > 0) {
      setCurrentIndex((prev) =>
        prev === 0 ? modalImages.length - 1 : prev - 1
      );
      setIsZoomed(false);
    }
  }, [modalImages.length]);

  const goToImage = useCallback((index) => {
    setCurrentIndex(index);
    setIsZoomed(false);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isModalOpen) return;

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          goToPrevious();
          break;
        case "ArrowRight":
          e.preventDefault();
          goToNext();
          break;
        case "Escape":
          e.preventDefault();
          closeModal();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, goToNext, goToPrevious, closeModal]);

  // Touch gesture handlers
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  // Zoom handlers
  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  const handleMouseMove = (e) => {
    if (!isZoomed) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  const customStyles = {
    content: {
      backgroundColor: "#050816",
      border: "none",
      borderRadius: "20px",
      boxShadow: "0 0 30px rgba(0, 0, 0, 0.8)",
      padding: "0",
      margin: "auto",
      maxWidth: category === "website" ? "95%" : "90%",
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

  if (!modalImages || modalImages.length === 0) return null;

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Image Showcase"
      closeTimeoutMS={300}
    >
      <div className="relative h-full flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center bg-tertiary px-6 py-4 border-b border-gray-700">
          <div className="flex items-center gap-4">
            <h2 className="text-white text-lg font-semibold">
              Showcase Images
            </h2>
            <span className="text-secondary text-sm">
              {currentIndex + 1} / {modalImages.length}
            </span>
          </div>
          <button
            onClick={closeModal}
            className="text-white hover:text-gray-300 transition-colors text-2xl leading-none w-8 h-8 flex items-center justify-center"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        {/* Main Image Display */}
        <div
          className="relative bg-black overflow-hidden"
          style={{
            height: category === "website" ? "calc(95vh - 200px)" : "calc(95vh - 180px)",
            minHeight: "400px",
          }}
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
              onClick={toggleZoom}
              style={{ cursor: isZoomed ? "zoom-out" : "zoom-in" }}
            >
              <img
                src={modalImages[currentIndex]}
                alt={`Showcase ${currentIndex + 1}`}
                className="select-none"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  width: "auto",
                  height: "auto",
                  objectFit: "contain",
                  transform: isZoomed ? "scale(2)" : "scale(1)",
                  transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  transition: isZoomed ? "none" : "transform 0.3s ease",
                }}
                draggable={false}
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          {modalImages.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-tertiary/80 hover:bg-tertiary text-white w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 backdrop-blur-sm z-10"
                aria-label="Previous image"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-tertiary/80 hover:bg-tertiary text-white w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 backdrop-blur-sm z-10"
                aria-label="Next image"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )}

          {/* Zoom indicator */}
          <div className="absolute bottom-4 left-4 bg-tertiary/80 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
            {isZoomed ? "Click to zoom out" : "Click to zoom in"}
          </div>
        </div>

        {/* Thumbnail Navigation */}
        {modalImages.length > 1 && (
          <div className="bg-tertiary px-4 py-3 border-t border-gray-700 overflow-x-auto">
            <div className="flex gap-2 justify-center min-w-max mx-auto">
              {modalImages.map((image, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`relative rounded-lg overflow-hidden transition-all flex-shrink-0 ${
                    index === currentIndex
                      ? "ring-2 ring-white scale-105"
                      : "opacity-60 hover:opacity-100"
                  }`}
                  whileHover={{ scale: index === currentIndex ? 1.05 : 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    width: category === "website" ? "120px" : "80px",
                    height: category === "website" ? "70px" : "80px",
                  }}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {index === currentIndex && (
                    <div className="absolute inset-0 border-2 border-white pointer-events-none" />
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* Keyboard shortcuts hint (optional) */}
        <div className="absolute top-20 right-4 bg-tertiary/80 text-white px-3 py-2 rounded-lg text-xs backdrop-blur-sm hidden md:block">
          <div className="space-y-1">
            <div>
              <kbd className="px-2 py-1 bg-black/30 rounded">←</kbd> /{" "}
              <kbd className="px-2 py-1 bg-black/30 rounded">→</kbd> Navigate
            </div>
            <div>
              <kbd className="px-2 py-1 bg-black/30 rounded">ESC</kbd> Close
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CustomModal;
