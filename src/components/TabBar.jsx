import React from "react";

const ProjectsTabs = ({ activeTab, onTabClick }) => {
  const tabs = [
    { key: "all", label: "All" },
    { key: "first", label: "Websites" },
    { key: "second", label: "Mobile Applications" },
    { key: "third", label: "Designs" },
  ];

  return (
    <div id="projects-tabs" className="mb-8 mt-10">
      <div className="flex flex-wrap justify-center items-center gap-4">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`px-6 py-3 rounded-full font-medium transition-colors duration-300 shadow-md ${
              activeTab === tab.key
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
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
