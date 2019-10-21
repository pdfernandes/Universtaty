import * as d3 from "d3";

export const barChart = dataSet => {
  debugger;
  dataSet.forEach((datum, i) => {
    return (datum.order = i);
  });
  let svg, bandScale;
  const createChart = () => {
    d3.select("#bar-chart").remove();
    d3.select("#pie-chart").remove();
    svg = d3.select(".chart").append("svg");

    let painting = [];
    for (let i = 0; i < dataSet.length; i++) {
      let color = "#" + Math.floor(Math.random() * 16777215).toString(16);
      if (color === "#ffffff") {
        "#" + Math.floor(Math.random() * 16777215).toString(16);
      }
      painting.push(color);
    }

    const colors = d3.scaleOrdinal().range(painting);

    const h = 300,
      w = 600;

    svg
      .attr("height", h)
      .attr("width", w)
      .attr("id", "bar-chart");

    const labels = dataSet.map(datum => {
      return datum.label;
    });

    const values = dataSet.map(datum => {
      return datum.value;
    });

    let maxValue = Math.max(...values);

    bandScale = d3
      .scaleBand()
      .domain(labels)
      .range([0, w])
      .padding(0.1);
    const heightScale = d3
      .scaleLinear()
      .domain([0, maxValue])
      .range([0, h]);

    svg
      .selectAll("rect")
      .data(dataSet)
      .enter()
      .append("rect")
      .attr("x", (d, i) => bandScale(d.label))
      .attr("y", d => h - heightScale(d.value))
      .attr("height", d => heightScale(d.value))
      .attr("width", d => {
        return bandScale.bandwidth();
      })
      .attr("fill", d => colors(d.value))
      .append("title")
      .text(d => {
        let upperCaseLabel = d.label.split("_");
        upperCaseLabel = upperCaseLabel
          .map(word => {
            return word[0].toUpperCase() + word.slice(1);
          })
          .join(" ");
        return `${upperCaseLabel}: ${d.value}`;
      });

    // const yScale = d3
    //   .scaleLinear()
    //   .domain([
    //     0,
    //     d3.max(dataSet, function(d, i) {
    //       return d.value;
    //     })
    //   ])
    //   .range([h, 0])
    //   .nice();

    // const xScale = d3
    //   .scaleBand()
    //   .domain(labels)
    //   .range([0, w]);

    //   const xAxis = svg.append("g")
    //   .classed("xAxis", true)
    //   .attr("x", 0)
    //   .attr("y", 0)
    //   .call(d3.axisBottom(xScale))
  };

  createChart();

  d3.select(".sort").on("change", change);
  function change() {
    var sortComparer;
    if (this.checked) {
      sortComparer = function(a, b) {
        return b.value - a.value;
      };
    } else {
      sortComparer = function(a, b) {
        return a.order - b.order;
      };
    }
    dataSet.sort(sortComparer);
    var teamOrder = dataSet.map(function(d) {
      return d.label;
    });
    bandScale.domain(teamOrder);
    svg
      .transition()
      .duration(500)
      .selectAll("rect")
      .delay(function(d, i) {
        return i * 50;
      })
      .attr("x", function(d) {
        return bandScale(d.label);
      });
  }
};
