// // import React, { useEffect, useRef } from "react";
// // import * as d3 from "d3";
// // import axios from "axios";

// // const Intensitybyyeargraph = ({ filters }) => {
// //   const svgRef = useRef();
// //   const tooltipRef = useRef();

// //   useEffect(() => {
// //     return () => {
// //       d3.select(tooltipRef.current).remove();
// //     };
// //   }, []);

// //   useEffect(() => {
// //     const params = Object.fromEntries(
// //       Object.entries(filters || {}).filter(([_, v]) => v !== "" && v != null)
// //     );

// //     axios
// //       .get("/api/visualization/intensity-by-year", { params })
// //       .then((res) => {
// //         if (Array.isArray(res.data)) {
// //           drawChart(res.data);
// //         } else {
// //           console.error("Unexpected data format:", res.data);
// //           d3.select(svgRef.current).selectAll("*").remove();
// //         }
// //       })
// //       .catch((err) => {
// //         console.error("Error loading chart data", err);
// //         d3.select(svgRef.current).selectAll("*").remove();
// //       });
// //   }, [filters]);

// //   const drawChart = (data) => {
// //     const svg = d3.select(svgRef.current);
// //     svg.selectAll("*").remove();

// //     const margin = { top: 40, right: 30, bottom: 40, left: 40 };
// //     const width = 1000 - margin.left - margin.right;
// //     const height = 309 - margin.top - margin.bottom;

// //     const chart = svg
// //       .attr("width", width + margin.left + margin.right)
// //       .attr("height", height + margin.top + margin.bottom)
// //       .append("g")
// //       .attr("transform", `translate(${margin.left},${margin.top})`);

// //     let tooltip = d3.select(tooltipRef.current);
// //     if (tooltip.empty()) {
// //       tooltip = d3
// //         .select("body")
// //         .append("div")
// //         .attr("class", "intensity-tooltip")
// //         .style("position", "absolute")
// //         .style("padding", "6px 12px")
// //         .style("background", "#1f2937")
// //         .style("color", "#f1f5f9")
// //         .style("border-radius", "6px")
// //         .style("pointer-events", "none")
// //         .style("opacity", 0);
// //       tooltipRef.current = tooltip.node();
// //     }

// //     const x = d3
// //       .scaleBand()
// //       .domain(data.map((d) => d._id))
// //       .range([0, width])
// //       .padding(0.2);

// //     const xAxis = chart
// //       .append("g")
// //       .attr("transform", `translate(0, ${height})`)
// //       .call(d3.axisBottom(x).tickFormat(d3.format("d")));

// //     xAxis.selectAll("text").style("fill", "#cbd5e1").style("font-size", "12px");
// //     xAxis.selectAll(".domain").attr("stroke", "#94a3b8");
// //     xAxis.selectAll(".tick line").attr("stroke", "#64748b");

// //     const y = d3
// //       .scaleLinear()
// //       .domain([0, d3.max(data, (d) => d.totalIntensity) || 0])
// //       .nice()
// //       .range([height, 0]);

// //     const yAxis = chart.append("g").call(d3.axisLeft(y));
// //     yAxis.selectAll("text").style("fill", "#cbd5e1").style("font-size", "12px");
// //     yAxis.selectAll(".domain").attr("stroke", "#94a3b8");
// //     yAxis.selectAll(".tick line").attr("stroke", "#64748b");

// //     chart
// //       .selectAll(".bar")
// //       .data(data)
// //       .enter()
// //       .append("rect")
// //       .attr("class", "bar")
// //       .attr("x", (d) => x(d._id))
// //       .attr("y", (d) => y(d.totalIntensity))
// //       .attr("width", x.bandwidth())
// //       .attr("height", (d) => height - y(d.totalIntensity))
// //       .attr("fill", "#69b3a2")
// //       .on("mouseover", (event, d) => {
// //         tooltip
// //           .style("opacity", 1)
// //           .html(`Year: ${d._id}<br/>Intensity: ${d.totalIntensity}`);
// //       })
// //       .on("mousemove", (event) => {
// //         tooltip
// //           .style("left", event.pageX + 10 + "px")
// //           .style("top", event.pageY - 30 + "px");
// //       })
// //       .on("mouseout", () => {
// //         tooltip.style("opacity", 0);
// //       });
// //   };

// //   return (
// //     <div className="rounded-xl bg-[#264255]">
// //       <h2 className="font-bold text-xl relative top-[15px] left-[15px] text-white">
// //         Intensity - Year
// //       </h2>
// //       <svg ref={svgRef} className="w-full h-full"></svg>
// //     </div>
// //   );
// // };

// // export default Intensitybyyeargraph;
// import React, { useEffect, useRef } from "react";
// import * as d3 from "d3";
// import axios from "axios";

// const Intensitybyyeargraph = ({ filters }) => {
//   const svgRef = useRef();
//   const tooltipRef = useRef();

//   useEffect(() => {
//     return () => {
//       d3.select(tooltipRef.current).remove();
//     };
//   }, []);

//   useEffect(() => {
//     const params = Object.fromEntries(
//       Object.entries(filters || {}).filter(([_, v]) => v !== "" && v != null)
//     );

//     axios
//       .get("/api/visualization/intensity-by-year", { params })
//       .then((res) => {
//         if (Array.isArray(res.data)) {
//           drawChart(res.data);
//         } else {
//           console.error("Unexpected data format:", res.data);
//           d3.select(svgRef.current).selectAll("*").remove();
//         }
//       })
//       .catch((err) => {
//         console.error("Error loading chart data", err);
//         d3.select(svgRef.current).selectAll("*").remove();
//       });
//   }, [filters]);

//   const drawChart = (data) => {
//     const svg = d3.select(svgRef.current);
//     svg.selectAll("*").remove();

//     const margin = { top: 40, right: 30, bottom: 40, left: 40 };
//     const width = 1000 - margin.left - margin.right;
//     const height = 309 - margin.top - margin.bottom;

//     const chart = svg
//       .attr("width", width + margin.left + margin.right)
//       .attr("height", height + margin.top + margin.bottom)
//       .append("g")
//       .attr("transform", `translate(${margin.left},${margin.top})`);

//     let tooltip = d3.select(tooltipRef.current);
//     if (tooltip.empty()) {
//       tooltip = d3
//         .select("body")
//         .append("div")
//         .attr("class", "intensity-tooltip")
//         .style("position", "absolute")
//         .style("padding", "6px 12px")
//         .style("background", "#1f2937")
//         .style("color", "#f1f5f9")
//         .style("border-radius", "6px")
//         .style("pointer-events", "none")
//         .style("opacity", 0);
//       tooltipRef.current = tooltip.node();
//     }

//     const x = d3
//       .scaleBand()
//       .domain(data.map((d) => d._id))
//       .range([0, width])
//       .padding(0.05); // Wider bars

//     const xAxis = chart
//       .append("g")
//       .attr("transform", `translate(0, ${height})`)
//       .call(d3.axisBottom(x).tickFormat(d3.format("d")));

//     xAxis.selectAll("text").style("fill", "#cbd5e1").style("font-size", "12px");
//     xAxis.selectAll(".domain").attr("stroke", "#94a3b8");
//     xAxis.selectAll(".tick line").attr("stroke", "#64748b");

//     const y = d3
//       .scaleLinear()
//       .domain([0, d3.max(data, (d) => d.totalIntensity) || 0])
//       .nice()
//       .range([height, 0]);

//     const yAxis = chart.append("g").call(d3.axisLeft(y).tickSize(-width));

//     yAxis.selectAll("text").style("fill", "#cbd5e1").style("font-size", "12px");
//     yAxis.selectAll(".domain").attr("stroke", "#94a3b8");
//     yAxis
//       .selectAll(".tick line")
//       .attr("stroke", "#64748b")
//       .attr("stroke-dasharray", "2,2");

//     // Animated bars
//     chart
//       .selectAll(".bar")
//       .data(data)
//       .enter()
//       .append("rect")
//       .attr("class", "bar")
//       .attr("x", (d) => x(d._id))
//       .attr("y", height) // Start from bottom
//       .attr("width", x.bandwidth())
//       .attr("height", 0) // Start with height 0
//       .attr("fill", "#69b3a2")
//       .on("mouseover", (event, d) => {
//         tooltip
//           .style("opacity", 1)
//           .html(`Year: ${d._id}<br/>Intensity: ${d.totalIntensity}`);
//       })
//       .on("mousemove", (event) => {
//         tooltip
//           .style("left", event.pageX + 10 + "px")
//           .style("top", event.pageY - 30 + "px");
//       })
//       .on("mouseout", () => {
//         tooltip.style("opacity", 0);
//       })
//       .transition()
//       .duration(800)
//       .ease(d3.easeCubicOut)
//       .attr("y", (d) => y(d.totalIntensity))
//       .attr("height", (d) => height - y(d.totalIntensity));
//   };

//   return (
//     <div className="rounded-xl bg-[#264255] w-full h-full">
//       <h2 className="font-bold text-xl relative top-[15px] left-[15px] text-white">
//         Intensity - Year
//       </h2>
//       <svg ref={svgRef} className="w-full h-full"></svg>
//     </div>
//   );
// };

// export default Intensitybyyeargraph;
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import axios from "axios";

const Intensitybyyeargraph = ({ filters }) => {
  const svgRef = useRef();
  const containerRef = useRef();
  const tooltipRef = useRef();

  useEffect(() => {
    return () => {
      d3.select(tooltipRef.current).remove();
    };
  }, []);

  useEffect(() => {
    const params = Object.fromEntries(
      Object.entries(filters || {}).filter(([_, v]) => v !== "" && v != null)
    );

    axios
      .get("/api/visualization/intensity-by-year", { params })
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

    // Get container size
    const container = containerRef.current.getBoundingClientRect();
    const width = container.width;
    const height = container.height;

    const margin = { top: 60, right: 30, bottom: 40, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const chart = svg
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    let tooltip = d3.select(tooltipRef.current);
    if (tooltip.empty()) {
      tooltip = d3
        .select("body")
        .append("div")
        .attr("class", "intensity-tooltip")
        .style("position", "absolute")
        .style("padding", "6px 12px")
        .style("background", "#1f2937")
        .style("color", "#f1f5f9")
        .style("border-radius", "6px")
        .style("pointer-events", "none")
        .style("opacity", 0);
      tooltipRef.current = tooltip.node();
    }

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d._id))
      .range([0, innerWidth])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.totalIntensity) || 0])
      .nice()
      .range([innerHeight, 0]);

    const xAxis = chart
      .append("g")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(d3.axisBottom(x).tickFormat(d3.format("d")));

    xAxis.selectAll("text").style("fill", "#cbd5e1").style("font-size", "12px");
    xAxis.selectAll(".domain").attr("stroke", "#94a3b8");
    xAxis.selectAll(".tick line").attr("stroke", "#64748b");

    const yAxis = chart.append("g").call(d3.axisLeft(y).tickSize(-innerWidth));

    yAxis.selectAll("text").style("fill", "#cbd5e1").style("font-size", "12px");
    yAxis.selectAll(".domain").attr("stroke", "#94a3b8");
    yAxis
      .selectAll(".tick line")
      .attr("stroke", "#64748b")
      .attr("stroke-dasharray", "2,2");

    chart
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d._id))
      .attr("y", innerHeight)
      .attr("width", x.bandwidth())
      .attr("height", 0)
      .attr("fill", "#69b3a2")
      .on("mouseover", (event, d) => {
        tooltip
          .style("opacity", 1)
          .html(`Year: ${d._id}<br/>Intensity: ${d.totalIntensity}`);
      })
      .on("mousemove", (event) => {
        tooltip
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 30 + "px");
      })
      .on("mouseout", () => {
        tooltip.style("opacity", 0);
      })
      .transition()
      .duration(800)
      .ease(d3.easeCubicOut)
      .attr("y", (d) => y(d.totalIntensity))
      .attr("height", (d) => innerHeight - y(d.totalIntensity));
  };

  return (
    <div
      ref={containerRef}
      className="rounded-xl bg-[#264255] w-full h-full relative"
    >
      <h2 className="font-bold text-xl absolute top-3 left-4 text-white z-10">
        Intensity - Year
      </h2>
      <svg ref={svgRef} className="w-full h-full"></svg>
    </div>
  );
};

export default Intensitybyyeargraph;
