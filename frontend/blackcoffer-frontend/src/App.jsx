import { useState } from "react";
import "./App.css";
import Filterbar from "./components/Filterbar";
import Intensitybyyeargraph from "./components/graphs/Intensitybyyeargraph";
import RelevanceByRegionGraph from "./components/graphs/RelevanceByRegionGraph ";
import LikelihoodByTopicGraph from "./components/graphs/LikelihoodByTopicGraph";
import TopicBySectorHeatmap from "./components/graphs/TopicBySectorHeatmap";
import IntensityCard from "./components/graphs/IntensityCard";
import LikelihoodCard from "./components/graphs/LikelihoodCard";
import RelevanceCard from "./components/graphs/RelevanceCard";

function App() {
  const [filters, setFilters] = useState({});

  return (
    <div className="p-2 h-[100vh] grid-container gap-2.5">
      <div className="filter ">
        <Filterbar filters={filters} setFilters={setFilters}/>
      </div>
      <div className="sec ">
        <RelevanceByRegionGraph filters={filters} />
      </div>
      <div className="left flex gap-2.5 flex-col">
        <IntensityCard filters={filters} />
        <LikelihoodCard filters={filters} />
        <RelevanceCard filters={filters} />
      </div>
      <div className="top w-full h-full">
        <Intensitybyyeargraph filters={filters} />
      </div>
      <div className="bottom overflow-auto ">
        <LikelihoodByTopicGraph filters={filters} />
      </div>
      <div className="right w-full overflow-auto bg-[#264255] rounded-xl">
        <TopicBySectorHeatmap filters={filters} />
      </div>
    </div>
  );
}

export default App;
