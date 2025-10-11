import React from "react";

const ProjectsTabs = ({ activeTab, onTabClick }) => {
  const tabs = [
    { key: "all", label: "All" },
    { key: "first", label: "Websites" },
    { key: "second", label: "Mobile Applications" },
    { key: "third", label: "Ware Housing" },
  ];

  return (
    <div id="projects-tabs" className="mb-8 mt-10">
      <div className="flex flex-wrap justify-center items-center gap-4">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`relative px-6 py-3 font-bold uppercase tracking-wider transition-all duration-300 overflow-hidden border-3 ${
              activeTab === tab.key
                ? "bg-accent border-accent text-primary shadow-neon scale-105"
                : "glass-effect border-accent-orange text-accent-orange hover:bg-accent-orange hover:text-primary hover:scale-105"
            }`}
            onClick={() => onTabClick(tab.key)}
          >
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProjectsTabs;
