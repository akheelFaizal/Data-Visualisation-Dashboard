import React, { useEffect, useState } from "react";

function Filterbar({ filters, setFilters }) {
  const [filtersData, setFiltersData] = useState({});
  const [selectedFilter, setSelectedFilter] = useState(null);

  useEffect(() => {
    fetch("/api/filters")
      .then((res) => res.json())
      .then((data) => setFiltersData(data))
      .catch((err) => console.error(err));
  }, []);

  const filterList = [
    { key: "end_year", label: "End Year" },
    { key: "topic", label: "Topic" },
    { key: "sector", label: "Sector" },
    { key: "region", label: "Region" },
    { key: "pestle", label: "PEST" },
    { key: "source", label: "Source" },
    { key: "country", label: "Country" },
  ];

  const handleOptionClick = (filterKey, value) => {
    setFilters((prev) => {
      
      if (prev[filterKey] === value) {
        const updated = { ...prev };
        delete updated[filterKey];
        return updated;
      }
      return { ...prev, [filterKey]: value };
    });
  };

  const isOptionSelected = (filterKey, value) => {
    return filters[filterKey] === value;
  };

  return (
    <>
      <div className="w-[100%] bg-[#264255] text-white h-[100%] flex flex-col pl-[20px] pr-[10px] rounded-xl">
        <div className="flex justify-between items-center mt-[20px]">
          <span className="font-semibold text-lg">Filters</span>
          <button
            className="text-sm underline hover:text-blue-300 disabled:opacity-50"
            onClick={() => setFilters({})}
            disabled={Object.keys(filters).length === 0}
            title="Clear All Filters"
          >
            Clear Filters
          </button>
        </div>

        <ul className="hover-fun text-l mt-3 w-full flex flex-col gap-2.5">
          {filterList.map(({ key, label }) => (
            <li
              key={key}
              className="flex justify-between pl-1 cursor-pointer"
              onClick={() => setSelectedFilter(key)}
            >
              {label}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </li>
          ))}
        </ul>
      </div>

      {selectedFilter && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[400px] max-h-[80vh] overflow-y-auto text-black">
            <h2 className="text-xl font-bold mb-4 capitalize">
              {selectedFilter.replace("_", " ")} Options
            </h2>
            <ul className="space-y-1">
              {(filtersData[selectedFilter] || []).map((value, i) => (
                <li
                  key={i}
                  className="border-b py-1 flex items-center gap-2"
                  onClick={() => handleOptionClick(selectedFilter, value)}
                  style={{ cursor: "pointer" }}
                >
                  <input
                    type="checkbox"
                    checked={isOptionSelected(selectedFilter, value)}
                    readOnly
                  />
                  <span>{value || "(Empty)"}</span>
                </li>
              ))}
              {(!filtersData[selectedFilter] ||
                filtersData[selectedFilter].length === 0) && (
                <li>(No options available)</li>
              )}
            </ul>
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => setSelectedFilter(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Filterbar;
