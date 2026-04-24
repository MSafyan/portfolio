import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  About,
  Contact,
  Experience,
  Feedbacks,
  Hero,
  Navbar,
  Tech,
  Works,
  StarsCanvas,
} from "./components";
import Certifications from "./components/Certifications";
import MapPortfolio from "./pages/MapPortfolio";

const MainPortfolio = () => (
  <div className="relative z-0 bg-primary">
    <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
      <Navbar />
      <Hero />
    </div>
    <About />
    <Experience />
    <Certifications />
    <Works />
    <Tech />
    <Feedbacks />
    <div className="relative z-0">
      <Contact />
      <StarsCanvas />
    </div>
  </div>
);

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MapPortfolio />} />
      <Route path="/map" element={<MapPortfolio />} />
    </Routes>
  </BrowserRouter>
);

export default App;
