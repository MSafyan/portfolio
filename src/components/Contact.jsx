import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import Modal from "react-modal";
import { successIcon, failureIcon, closeIcon } from "../assets";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState({
    isOpen: false,
    type: "success",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear error for the field
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Email is not valid.";
    }
    if (!form.message.trim()) newErrors.message = "Message is required.";
    return newErrors;
  };

  const closeModal = () => {
    setModalData({ ...modalData, isOpen: false });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setLoading(true);

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Safyan Akram",
          from_email: form.email,
          to_email: "msafyan080@gmail.com",
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          setModalData({
            isOpen: true,
            type: "success",
            message:
              "Thank you for reaching out 🎉 \n Your message has been received. I truly appreciate you taking the time to connect. I'll get back to you as soon as possible. Until then, have an amazing day! 🌟",
          });
          setForm({ name: "", email: "", message: "" });
        },
        (error) => {
          setLoading(false);
          setModalData({
            isOpen: true,
            type: "error",
            message: "Something went wrong. Please try again.",
          });
          console.error(error);
        }
      );
  };

  return (
    <div
      className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-8"
        >
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="What's your name?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium focus:ring-2 focus:ring-accent/50 transition-all"
            />
            {errors.name && (
              <span className="text-red-400 text-sm mt-1">{errors.name}</span>
            )}
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium focus:ring-2 focus:ring-accent/50 transition-all"
            />
            {errors.email && (
              <span className="text-red-400 text-sm mt-1">{errors.email}</span>
            )}
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Message</span>
            <textarea
              rows={7}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What would you like to say?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium focus:ring-2 focus:ring-accent/50 transition-all resize-none"
            />
            {errors.message && (
              <span className="text-red-400 text-sm mt-1">
                {errors.message}
              </span>
            )}
          </label>

          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-accent to-accent-dark hover:from-accent-dark hover:to-accent py-3 px-8 rounded-lg w-fit text-white font-bold shadow-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <EarthCanvas />
      </motion.div>

      {/* Modal for success or error */}
      <Modal
        isOpen={modalData.isOpen}
        onRequestClose={closeModal}
        contentLabel="Alert"
        className="bg-tertiary p-8 rounded-2xl max-w-sm mx-auto shadow-xl relative border border-secondary/20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
      >
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="flex flex-col items-center text-center">
          {modalData.type === "success" ? (
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-accent"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          ) : (
            <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          )}
          <p className="text-white text-base leading-relaxed whitespace-pre-line">
            {modalData.message}
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
