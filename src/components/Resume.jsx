// import React from "react";
// import { StarsCanvas } from "./canvas";
// import { motion } from "framer-motion";
// import { myResume } from "../assets";
// import { resumeData } from "../constants";

// export const DownloadButtons = () => {
//   return (
//     <div className="absolute top-4 right-4 flex gap-2 m-1">
//       <button
//         onClick={() => {
//           const link = document.createElement("a");
//           link.href = myResume;
//           link.download = "Safyan_Akram_Resume.pdf";
//           link.click();
//         }}
//         className="bg-transparent hover:opacity-80 active:opacity-60 transition-opacity border border-white p-2 rounded-full"
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-6 w-6"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M19 14l-7 7m0 0l-7-7m7 7V3"
//           />
//         </svg>
//       </button>
//       <button
//         onClick={() => {
//           window.open(myResume, "_blank");
//         }}
//         className="bg-transparent hover:opacity-80 active:opacity-60 transition-opacity border border-white p-2 rounded-full"
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-6 w-6"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M13 10V3L4 14h7v7l9-11h-7z"
//           />
//         </svg>
//       </button>
//     </div>
//   );
// };

// const Resume = () => {
//   return (
//     <div className="relative z-0 bg-primary min-h-screen">
//       <StarsCanvas />
//       <div className="relative z-10 w-full px-16 py-16 text-white border border-gray-400 rounded-lg shadow-lg mx-auto max-w-7xl">
//         <DownloadButtons />
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//         >
//           <h1 className="text-4xl font-bold">{resumeData.name}</h1>
//           <p className="text-xl text-secondary mt-2">{resumeData.title}</p>
//           <p className="mt-6 text-lg">{resumeData.summary}</p>
//         </motion.div>

//         <div className="mt-10">
//           <h2 className="text-2xl font-bold border-b border-secondary pb-2">
//             Skills
//           </h2>
//           <ul className="mt-4 list-disc list-inside space-y-2">
//             {resumeData.skills.map((skill, index) => (
//               <li key={index}>{skill}</li>
//             ))}
//           </ul>
//         </div>

//         <div className="mt-10">
//           <h2 className="text-2xl font-bold border-b border-secondary pb-2">
//             Experience
//           </h2>
//           {resumeData.experience.map((job, index) => (
//             <div key={index} className="mt-6">
//               <h3 className="text-xl font-semibold">{job.role}</h3>
//               <p className="text-secondary">{job.company}</p>
//               <p className="text-secondary text-sm">{job.duration}</p>
//               <ul className="mt-4 list-disc list-inside space-y-2">
//                 {job.details.map((detail, idx) => (
//                   <li key={idx}>{detail}</li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>

//         <div className="mt-10">
//           <h2 className="text-2xl font-bold border-b border-secondary pb-2">
//             Additional Projects
//           </h2>
//           <ul className="mt-4 list-disc list-inside space-y-2">
//             {resumeData.additionalProjects.map((project, index) => (
//               <li key={index}>{project}</li>
//             ))}
//           </ul>
//         </div>

//         <div className="mt-10">
//           <h2 className="text-2xl font-bold border-b border-secondary pb-2">
//             Education
//           </h2>
//           <p className="mt-4">{resumeData.education.degree}</p>
//           <p className="text-secondary">{resumeData.education.school}</p>
//           <p className="text-secondary text-sm">
//             Class of {resumeData.education.graduationYear}
//           </p>
//         </div>

//         <div className="mt-10">
//           <h2 className="text-2xl font-bold border-b border-secondary pb-2">
//             Certifications
//           </h2>
//           <ul className="mt-4 list-disc list-inside space-y-2">
//             {resumeData.certifications.map((cert, index) => (
//               <li key={index}>
//                 <a
//                   href={cert.link}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-400 hover:underline"
//                 >
//                   {cert.title}
//                 </a>{" "}
//                 - {cert.issuer}
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div className="mt-10">
//           <h2 className="text-2xl font-bold border-b border-secondary pb-2">
//             Mentorship
//           </h2>
//           <ul className="mt-4 list-disc list-inside space-y-2">
//             {resumeData.mentorship.map((mentorship, index) => (
//               <li key={index}>{mentorship}</li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Resume;
