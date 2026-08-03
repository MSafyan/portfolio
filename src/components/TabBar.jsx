import React from "react";

const ProjectsTabs = ({ activeTab, onTabClick }) => {
  const tabs = [
    { key: "all", label: "All" },
    { key: "first", label: "Websites" },
    { key: "second", label: "Mobile Applications" },
    { key: "third", label: "Ware Housing" },
  ];

  return (
    <div id="projects-tabs" className="mb-8 mt-10 flex justify-start">
      <div className="segmented" role="tablist" aria-label="Filter projects">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.key}
            className={`segmented__item ${
              activeTab === tab.key ? "segmented__item--active" : ""
            }`}
            onClick={() => onTabClick(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProjectsTabs;
