import React, { useState } from "react";
import { motion } from "framer-motion";
import { Tilt } from "react-tilt";
import Modal from "react-modal";

const CustomModal = ({ isModalOpen, closeModal, modalImages, category }) => {
  const customStyles = {
    content: {
      backgroundColor: "white",
      border: "none",
      borderRadius: "30px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
      padding: "20px",
      margin: "auto",
      maxWidth: "90%",
      maxHeight: "90vh",
      overflow: "auto",
      transform: isModalOpen ? "scale(1)" : "scale(0.8)",
      opacity: isModalOpen ? 1 : 0,
      transition: "all 0.3s ease-in-out",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      transition: "opacity 0.3s ease-in-out",
    },
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Image Showcase"
    >
      <div className="modal-content">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "sticky",
            top: 0,
            color: "white",
            zIndex: 10,
            padding: "10px 20px",
            borderRadius: "15px 15px 0 0",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
          }}
          className="bg-tertiary"
        >
          <h1 style={{ margin: 0, fontSize: "18px" }}>Showcase Images</h1>
          <button
            onClick={closeModal}
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "white",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>

        <div
          className={`grid grid-cols-1 ${
            category == "website"
              ? "sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1"
              : "sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2"
          }`}
        >
          {modalImages.map((image, index) => (
            <ImageCard
              key={index}
              index={index}
              title={`Image ${index + 1}`}
              description={`Image ${index + 1}`}
              images={[image]}
              category={category}
            />
          ))}
        </div>
      </div>
    </Modal>
  );
};

export const ImageCard = ({ index, images, category }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0, delay: index * 0.2 }}
        whileHover={{ scale: category != "website" && 1.2, x: 0 }}
        className={`cursor-pointer relative transition-transform`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="relative rounded-2xl mb-2 mt-2 overflow-hidden mt-6 mb-2"
          style={{
            boxShadow:
              category !== "website" &&
              "0 2px 5px rgba(0, 0, 0, 0.2), 0 2px 5px rgba(0, 0, 0, 0.2)",
          }}
        >
          <img
            src={images[0]}
            alt="Showcase"
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
      </motion.div>
    </>
  );
};

export default CustomModal;
