import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import axios from "axios";

const LikelihoodByTopicGraph = ({ filters }) => {
  const svgRef = useRef();
  const wrapperRef = useRef();

  useEffect(() => {
    const params = Object.fromEntries(
      Object.entries(filters || {}).filter(([_, v]) => v !== "" && v != null)
    );

    axios
      .get("/api/visualization/likelihood-by-topic", { params })
      .then((res) => {
        if (Array.isArray(res.data)) {
          drawChart(res.data);
        } else {
          console.error("Unexpected data format:", res.data);
          d3.select(svgRef.current).selectAll("*").remove();
        }
      })
      .catch((err) => {
        console.error("Error loading chart data", err);
        d3.select(svgRef.current).selectAll("*").remove();
      });
  }, [filters]);

  const drawChart = (data) => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const containerWidth = wrapperRef.current?.offsetWidth || 400;

    const margin = { top: 60, right: 30, bottom: 30, left: 150 };
    const barHeight = 30; // Slightly wider bars
    const width = containerWidth;
    const height = barHeight * data.length + margin.top + margin.bottom;

    const x = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.avgLikelihood) || 0])
      .nice()
      .range([0, width - margin.left - margin.right]);

    const y = d3
      .scaleBand()
      .domain(data.map((d) => d._id))
      .range([0, barHeight * data.length])
      .padding(0.1);

    const chart = svg
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMinYMin meet")
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Grid lines
    chart
      .append("g")
      .call(
        d3
          .axisTop(x)
          .tickSize(-barHeight * data.length)
          .tickFormat("")
      )
      .selectAll("line")
      .style("stroke", "#444")
      .style("stroke-opacity", 0.3);

    // X-axis
    chart
      .append("g")
      .call(d3.axisTop(x).ticks(5))
      .selectAll("text")
      .style("fill", "#ffffff")
      .style("font-size", "12px");

    // Bars with animation
    chart
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("y", (d) => y(d._id))
      .attr("x", 0)
      .attr("height", y.bandwidth())
      .attr("width", 0) // Start from 0 width for animation
      .attr("fill", "#69b3a2")
      .transition()
      .duration(800)
      .delay((d, i) => i * 100)
      .attr("width", (d) => x(d.avgLikelihood));

    // Labels (Y axis)
    chart
      .selectAll(".label")
      .data(data)
      .enter()
      .append("text")
      .attr("x", -10)
      .attr("y", (d) => y(d._id) + y.bandwidth() / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", "end")
      .text((d) => d._id)
      .style("fill", "#ffffff")
      .style("font-size", "12px");

    // Style domain and ticks
    chart.selectAll(".domain").style("stroke", "#888");
    chart.selectAll(".tick line").style("stroke", "#888");
  };

  return (
    <div
      className="bg-[#264255] rounded-xl"
      ref={wrapperRef}
      style={{
        maxHeight: "100%",
        overflowY: "auto",
        width: "100%",
        overflowX: "hidden",
      }}
    >
      <h2 className="font-bold text-xl relative top-[15px] left-[15px] text-white">
        Likelihood - Topic
      </h2>
      <svg ref={svgRef} style={{ width: "100%" }} />
    </div>
  );
};

export default LikelihoodByTopicGraph;
