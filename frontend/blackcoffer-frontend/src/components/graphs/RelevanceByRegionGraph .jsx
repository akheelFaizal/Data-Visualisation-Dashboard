import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import axios from "axios";

const RelevanceByRegionGraph = ({ filters }) => {
  const svgRef = useRef();

  useEffect(() => {
    const params = Object.fromEntries(
      Object.entries(filters || {}).filter(([_, v]) => v !== "" && v != null)
    );

    axios
      .get("/api/visualization/relevance-by-region", { params })
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

    const width = 600;
    const height = 300;
    const radius = Math.min(width, height) / 2 - 40;

    const total = d3.sum(data, (d) => d.avgRelevance);

    const color = d3
      .scaleOrdinal()
      .domain(data.map((d) => d._id))
      .range(d3.schemeCategory10);

    const pie = d3
      .pie()
      .value((d) => d.avgRelevance)
      .sort(null);

    const arc = d3
      .arc()
      .innerRadius(radius / 2)
      .outerRadius(radius);

    const arcTween = (d) => {
      const i = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
      return (t) => arc(i(t));
    };

    const chart = svg
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${radius + 30}, ${height / 2 - 20})`);

    const pieData = pie(data);

    // Tooltip div
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("padding", "6px 12px")
      .style("background", "#333")
      .style("color", "#fff")
      .style("border-radius", "4px")
      .style("font-size", "12px")
      .style("pointer-events", "none")
      .style("opacity", 0);

    chart
      .selectAll("path")
      .data(pieData)
      .enter()
      .append("path")
      .attr("fill", (d) => color(d.data._id))
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .transition()
      .duration(1000)
      .attrTween("d", arcTween);

    // Add event listeners after transition
    chart
      .selectAll("path")
      .data(pieData)
      .on("mouseover", function (event, d) {
        const percent = ((d.data.avgRelevance / total) * 100).toFixed(1);
        tooltip.transition().duration(200).style("opacity", 0.9);
        tooltip
          .html(`<strong>${d.data._id}</strong><br/>${percent}%`)
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 28 + "px");
      })
      .on("mouseout", () => {
        tooltip.transition().duration(500).style("opacity", 0);
      });

    chart
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "0.3em")
      .style("fill", "#fff")
      .style("font-size", "12px")
      .text("Relevance");

    const legend = svg
      .append("g")
      .attr("transform", `translate(${radius * 2 + 70}, ${height / 2 - 130})`);

    const legendItemHeight = 20;
    const columnSpacing = 150;

    legend
      .selectAll("g")
      .data(data)
      .enter()
      .append("g")
      .attr("transform", (_, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        return `translate(${col * columnSpacing}, ${row * legendItemHeight})`;
      })
      .each(function (d) {
        d3.select(this)
          .append("rect")
          .attr("width", 14)
          .attr("height", 14)
          .attr("fill", color(d._id));

        d3.select(this)
          .append("text")
          .attr("x", 20)
          .attr("y", 11)
          .text(d._id)
          .style("fill", "#fff")
          .style("font-size", "12px");
      });
  };

  return (
    <div className="rounded-xl h-full w-full bg-[#264255]">
      <h2 className="font-bold text-xl relative top-[15px] left-[15px] text-white">
        Relevance - Region
      </h2>
      <svg ref={svgRef} className="mx-auto my-4" />
    </div>
  );
};

export default RelevanceByRegionGraph;
