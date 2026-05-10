// Only eagerly-loaded components are exported here.
// About, Experience, Certifications, Works, Tech, Feedbacks, Contact
// are lazy-imported directly in App.jsx to enable code splitting.
import { EarthCanvas, BallCanvas, StarsCanvas } from "./canvas";
import Hero from "./Hero";
import Navbar from "./Navbar";
import CanvasLoader from "./Loader";
import ProjectsTabs from "./TabBar";

export {
  Hero,
  Navbar,
  CanvasLoader,
  EarthCanvas,
  BallCanvas,
  StarsCanvas,
  ProjectsTabs,
};
