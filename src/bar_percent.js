import * as d3 from "d3";
import { nullValueIndicator, prepareChartArea } from "./null_value_indicator";

export const barChartPercentage = data => {
  let dataSet = data.filter(ele => {
    return ele.value !== 0 && ele.value !== null;
  });
  debugger;
  dataSet.forEach((datum, i) => {
    return (datum.order = i);
  });

  let svg, bandScale;
  const createChart = () => {
    d3.select("#bar-chart").remove();
    d3.select("#pie-chart").remove();
    svg = d3.select(".chart").append("svg");

    // let painting = [];
    // for (let i = 0; i < dataSet.length; i++) {
    //   let color = "#" + Math.floor(Math.random() * 16777215).toString(16);
    //   if (color === "#ffffff") {
    //     "#" + Math.floor(Math.random() * 16777215).toString(16);
    //   }
    //   painting.push(color);
    // }

  let painting = [
    "#058ED9",
    "#A1E8AF",
    "#73628A",
    "#E7BB41",
    "#44BBA4",
    "#FA7921",
    "#E63462",
    "#17BEBB",
    "#FE5F55",
    "#DD99BB",
    "#06D6A0",
    "#087E8B",
    "#FF5A5F",
    "#70EE9C",
    "#073B3A",
    "#08A045",
    "#CA054D",
    "#F5A6E6",
    "#783F8E",
    "#645E9D"
  ];

    function responsivefy(svg) {
      var container = d3.select(svg.node().parentNode),
        width = parseInt(svg.style("width")),
        height = parseInt(svg.style("height")),
        aspect = width / height;

      svg
        .attr("viewBox", "0 0 " + width + " " + height)
        .attr("perserveAspectRatio", "xMinYMid")
        .call(resize);

      d3.select(window).on("resize." + container.attr("id"), resize);

      function resize() {
        var targetWidth = parseInt(container.style("width"));
        svg.attr("width", targetWidth);
        svg.attr("height", Math.round(targetWidth / aspect));
      }
    }

    const colors = d3.scaleOrdinal().range(painting);

    const h = 300,
      w = 600,
      margin = { top: 20, bottom: 20, left: 20, right: 20 };

    svg
      .attr("height", h - margin.top - margin.bottom)
      .attr("width", w - margin.left - margin.right)
      .call(responsivefy)
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
      .range([0, w - margin.left - margin.right])
      .padding(0.1);
    const heightScale = d3
      .scaleLinear()
      .domain([0, maxValue])
      .range([0, h - margin.top - margin.bottom - 40]);

    svg
      .selectAll("rect")
      .data(dataSet)
      .enter()
      .append("rect")
      .attr("x", (d, i) => bandScale(d.label))
      .attr("y", d => h - margin.top - margin.bottom - heightScale(0))
      .attr("height", d => heightScale(0))
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
        return `${upperCaseLabel}: ${(d.value * 100).toFixed(2)}%`;
      });

    svg
      .selectAll("text")
      .data(dataSet)
      .enter()
      .append("text")
      .text(d => {
        return `${(d.value * 100).toFixed(2)}%`;
      })
      .classed("rotation", true)
      .attr("x", 0)
      .attr("y", 0);

      svg
        .selectAll("text")
        .transition()
        .duration(800)
        .attr("text-anchor", "start")
        .attr("transform", function(d, i) {
          return (
            "translate( " +
            (bandScale(d.label) + bandScale.bandwidth() / 2) +
            " , " +
            (h - heightScale(d.value) - 2 * margin.top) +
            ")," +
            "rotate(-70)"
          );
        })
        .delay(function(d, i) {
          return i * 100;
        });


        svg
          .selectAll("rect")
          .transition()
          .duration(800)
          .attr("y", function(d) {
            return h - margin.top - margin.bottom - heightScale(d.value);
          })
          .attr("height", function(d) {
            return heightScale(d.value);
          })
          .delay(function(d, i) {
            return i * 100;
          });
  };

  if (dataSet.length === 0) {
    nullValueIndicator();
  } else {
    prepareChartArea();
    createChart();
  }

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
