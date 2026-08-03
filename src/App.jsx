import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Hero, Navbar, StarsCanvas } from "./components";

// Discontinued experiment — lazy so it stays out of the main bundle.
const MapPortfolio = lazy(() => import("./pages/MapPortfolio"));

const About = lazy(() => import("./components/About"));
const Experience = lazy(() => import("./components/Experience"));
const Certifications = lazy(() => import("./components/Certifications"));
const Works = lazy(() => import("./components/Works"));
const Tech = lazy(() => import("./components/Tech"));
const Feedbacks = lazy(() => import("./components/Feedbacks"));
const Contact = lazy(() => import("./components/Contact"));

const MainPortfolio = () => (
  <div className="relative z-0 bg-primary">
    <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
      <Navbar />
      <Hero />
    </div>
    <Suspense fallback={null}>
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
    </Suspense>
  </div>
);

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPortfolio />} />
      <Route
        path="/map"
        element={
          <Suspense fallback={null}>
            <MapPortfolio />
          </Suspense>
        }
      />
    </Routes>
  </BrowserRouter>
);

export default App;
