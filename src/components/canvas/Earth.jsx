import "./Earth.css";

const EarthCanvas = () => (
  <div className="flex items-center justify-center w-full h-full min-h-[280px]">
    <div className="css-earth" aria-label="Animated globe">
      <div className="css-earth__surface" />
      <div className="css-earth__clouds" />
      <div className="css-earth__glow" />
    </div>
  </div>
);

export default EarthCanvas;
