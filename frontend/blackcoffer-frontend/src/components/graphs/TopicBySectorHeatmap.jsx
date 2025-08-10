import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const TopicBySectorHeatmap = ({ filters }) => {
  const svgRef = useRef();
  const containerRef = useRef();
  const tooltipRef = useRef();

  useEffect(() => {
    const params = new URLSearchParams(
      Object.entries(filters || {}).filter(([_, v]) => v !== "" && v != null)
    );

    fetch(`/api/visualization/topic-frequency-by-sector?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          drawHeatmap(data);
        } else {
          console.error("Unexpected data format:", data);
          d3.select(svgRef.current).selectAll("*").remove();
        }
      })
      .catch((err) => {
        console.error("Error loading heatmap data", err);
        d3.select(svgRef.current).selectAll("*").remove();
      });
  }, [filters]);

  const drawHeatmap = (data) => {
  const svg = d3.select(svgRef.current);
  svg.selectAll("*").remove();

  const margin = { top: 140, right: 20, bottom: 20, left: 110 };
  const cellSize = 30; // made rectangles wider
  const padding = 4;

  const sectors = Array.from(new Set(data.map((d) => d._id.sector)));
  const topics = Array.from(new Set(data.map((d) => d._id.topic)));

  const width = sectors.length * (cellSize + padding) + 50;
  const height = topics.length * (cellSize + padding);

  svg
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const color = d3
    .scaleSequential()
    .interpolator(d3.interpolateBlues)
    .domain([0, d3.max(data, (d) => d.count)]);

  const tooltip = d3.select(tooltipRef.current);

  g.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d) => sectors.indexOf(d._id.sector) * (cellSize + padding))
    .attr("y", (d) => topics.indexOf(d._id.topic) * (cellSize + padding))
    .attr("width", cellSize)
    .attr("height", cellSize)
    .style("fill", "#ffffff")
    .style("fill-opacity", 0)
    .on("mouseover", (event, d) => {
      tooltip
        .style("opacity", 1)
        .html(
          `<strong>Sector:</strong> ${d._id.sector}<br/>
           <strong>Topic:</strong> ${d._id.topic}<br/>
           <strong>Count:</strong> ${d.count}`
        )
        .style("left", event.offsetX + 20 + "px")
        .style("top", event.offsetY + 10 + "px");
    })
    .on("mousemove", (event) => {
      tooltip
        .style("left", event.offsetX + 20 + "px")
        .style("top", event.offsetY + 10 + "px");
    })
    .on("mouseout", () => tooltip.style("opacity", 0))
    .transition()
    .duration(800)
    .ease(d3.easeCubicInOut)
    .style("fill", (d) => color(d.count))
    .style("fill-opacity", 1);

  const xLabelY = -10;

  g.selectAll(".xLabel")
    .data(sectors)
    .enter()
    .append("text")
    .text((d) => d)
    .attr("x", (d, i) => i * (cellSize + padding) + cellSize / 2)
    .attr("y", xLabelY)
    .attr("text-anchor", "start")
    .attr("transform", (d, i) => {
      const x = i * (cellSize + padding) + cellSize / 2;
      return `rotate(-65, ${x}, ${xLabelY})`;
    })
    .style("font-size", "10px")
    .style("fill", "white");

  g.selectAll(".yLabel")
    .data(topics)
    .enter()
    .append("text")
    .text((d) => d)
    .attr("x", -5)
    .attr("y", (d, i) => i * (cellSize + padding) + cellSize / 1.5)
    .attr("text-anchor", "end")
    .style("font-size", "10px")
    .style("fill", "white");
};


  return (
    <div
      ref={containerRef}
      className="relative bg-[#264255] text-white rounded-xl w-full"
    >
      <h3 className="font-bold text-xl relative top-[15px] left-[15px] text-white">
        Topic Frequency - Sector
      </h3>

      <div className="relative rounded shadow w-max">
        <svg ref={svgRef} className="block" />
        <div
          ref={tooltipRef}
          className="absolute bg-white text-black text-xs border border-gray-300 rounded shadow-md p-2 pointer-events-none opacity-0 transition-opacity duration-200"
          style={{ zIndex: 1000 }}
        />
      </div>
    </div>
  );
};

export default TopicBySectorHeatmap;
