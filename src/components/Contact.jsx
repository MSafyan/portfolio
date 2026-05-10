import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import Modal from "react-modal";

const InputField = ({ label, error, children }) => (
  <label className="flex flex-col gap-2">
    <span className="text-secondary text-sm uppercase tracking-wider font-medium">{label}</span>
    {children}
    {error && <span className="text-red-400 text-xs">{error}</span>}
  </label>
);

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState({ isOpen: false, type: "success", message: "" });
  const [emailJsConfigured, setEmailJsConfigured] = useState(true);

  useEffect(() => {
    const serviceId = import.meta.env.VITE_APP_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY;
    if (!serviceId || !templateId || !publicKey || serviceId.includes("your_") || templateId.includes("your_") || publicKey.includes("your_")) {
      setEmailJsConfigured(false);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Email is not valid.";
    if (!form.message.trim()) newErrors.message = "Message is required.";
    return newErrors;
  };

  const closeModal = () => setModalData({ ...modalData, isOpen: false });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    if (!emailJsConfigured) {
      setModalData({ isOpen: true, type: "error", message: "Email service is not configured yet. Please reach out via LinkedIn." });
      return;
    }
    setLoading(true);
    emailjs.send(
      import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
      { from_name: form.name, to_name: "Safyan Akram", from_email: form.email, to_email: "msafyan080@gmail.com", message: form.message },
      import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
    ).then(
      () => {
        setLoading(false);
        setModalData({ isOpen: true, type: "success", message: "Thank you for reaching out! I'll get back to you as soon as possible." });
        setForm({ name: "", email: "", message: "" });
      },
      (error) => {
        setLoading(false);
        let errorMessage = "Something went wrong. Please try again.";
        if (error.text) {
          if (error.text.includes("Invalid grant") || error.text.includes("reconnect")) errorMessage = "Email service needs reconnecting. Please reach out via LinkedIn!";
          else if (error.text.includes("limit") || error.text.includes("quota")) errorMessage = "Email service monthly limit reached. Please contact via LinkedIn.";
        }
        setModalData({ isOpen: true, type: "error", message: errorMessage });
      }
    );
  };

  return (
    <div className="xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.85] contact-form-panel"
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>
          Contact<span className="text-accent">.</span>
        </h3>

        {!emailJsConfigured && (
          <div className="mt-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
            <p className="text-yellow-400 text-sm">
              ⚠️ Email service not configured — reach out via LinkedIn or other channels.
            </p>
          </div>
        )}

        <form ref={formRef} onSubmit={handleSubmit} className="mt-10 flex flex-col gap-6">
          <InputField label="Your Name" error={errors.name}>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="contact-input"
            />
          </InputField>
          <InputField label="Your Email" error={errors.email}>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className="contact-input"
            />
          </InputField>
          <InputField label="Your Message" error={errors.message}>
            <textarea
              rows={6}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What would you like to say?"
              className="contact-input resize-none"
            />
          </InputField>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary self-start disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Sending...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Send Message
              </>
            )}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <EarthCanvas />
      </motion.div>

      <Modal
        isOpen={modalData.isOpen}
        onRequestClose={closeModal}
        contentLabel="Alert"
        className="bg-tertiary p-8 rounded-2xl max-w-sm mx-auto shadow-xl relative border border-white/10"
        overlayClassName="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50"
      >
        <button onClick={closeModal} className="absolute top-3 right-3 text-secondary hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="flex flex-col items-center text-center gap-4">
          <div className={`w-14 h-14 rounded-full flex items-center justify-center ${modalData.type === "success" ? "bg-accent/10" : "bg-red-500/10"}`}>
            {modalData.type === "success" ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </div>
          <p className="text-white text-[15px] leading-relaxed">{modalData.message}</p>
        </div>
      </Modal>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
