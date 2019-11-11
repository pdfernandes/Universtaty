//margin and radius
import * as d3 from "d3";
import { nullValueIndicator, prepareChartArea } from "./null_value_indicator";

export const doughnut = dataSet => {
  let data = dataSet.filter(ele => {
    return ele.value !== 0 && ele.value !== null;
  });
  prepareChartArea()
  debugger;

  // if (data.length === 0) {
  //   nullValueIndicator();
  //   return;
  // } else {
  //   prepareChartArea();
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

  // for (let i = 0; i < data.length; i++) {
  //   painting.push("#" + Math.floor(Math.random() * 16777215).toString(16));
  // }

  d3.select("#pie-chart").remove();
  d3.select("#bar-chart").remove();

  const colors = d3.scaleOrdinal().range(painting);

  const margin = { top: 20, right: 20, bottom: 20, left: 20 },
    width = 750,
    height = 360;
  // radius = width / 4;

  //   arc generator
  const segments = d3
    .arc()
    .innerRadius(0)
    .outerRadius(150);
  // .innerRadius(radius - 100);

  const gen = d3
    .pie()
    .sort(null)
    .value(d => {
      return d.value;
    });

  function responsivefy(svg) {
    // get container + svg aspect ratio
    var container = d3.select(svg.node().parentNode),
      width = parseInt(svg.style("width")),
      height = parseInt(svg.style("height")),
      aspect = width / height;

    // add viewBox and preserveAspectRatio properties,
    // and call resize so that svg resizes on inital page load
    svg
      .attr("viewBox", "0 0 " + width + " " + height)
      .attr("perserveAspectRatio", "xMinYMid")
      .call(resize);

    // to register multiple listeners for same event type,
    // you need to add namespace, i.e., 'click.foo'
    // necessary if you call invoke this function for multiple svgs
    // api docs: https://github.com/mbostock/d3/wiki/Selections#on
    d3.select(window).on("resize." + container.attr("id"), resize);

    // get width of container and resize svg to fit it
    function resize() {
      var targetWidth = parseInt(container.style("width"));
      svg.attr("width", targetWidth);
      svg.attr("height", Math.round(targetWidth / aspect));
    }
  }

  //   define svg

  const svg = d3
    .select(".chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("id", "pie-chart")
    .append("g")
    .attr("transform", "translate(" + width / 4 + "," + height / 2 + ")")
    .call(responsivefy);

  const sections = svg
  // .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
  .selectAll(".arc")
  .data(gen(data))
  .enter()
  .append("g")
  .attr("class", "arc")

  sections
    .append("path")
    .style("fill", d => colors(d.data.value))
    .transition()
    .delay(function(d, i) {
      return i * 300;
    })
    .duration(300)
    .attrTween("d", function(d) {
      debugger;
      let i = d3.interpolate(d.startAngle + 0.1, d.endAngle);
      return function(t) {
        d.endAngle = i(t);
        return segments(d);
      };
    });
    // .attr("d", segments)

  let legends = svg
    .append("g")
    .classed("legends-container", true)
    .attr("transform", "translate(" + width / 3 + "," + -180 + ")")
    .selectAll(".legends")
    .data(gen(data));

  let legend = legends
    .enter()
    .append("g")
    .classed("legends", true)
    .attr("transform", function(d, i) {
      return "translate(0," + (i + 1) * 25 + ")";
    });
  legend
    .append("rect")
    .attr("width", 20)
    .attr("height", 20)
    .attr("fill", d => colors(d.data.value));

  legend
    .append("text")
    .text(function(d) {
      let upperCaseLabel = d.data.label.split("_");
      upperCaseLabel = upperCaseLabel
        .map(word => {
          return word[0].toUpperCase() + word.slice(1);
        })
        .join(" ");
      return `${upperCaseLabel} ${(d.data.value * 100).toFixed(2)}%`;
    })
    .attr("fill", d => colors(d.data.value))
    .attr("x", 25)
    .attr("y", 15);
};
