//margin and radius
import * as d3 from "d3";

export const doughnut = data => {
  //

  let painting = [];
  for (let i = 0; i < data.length; i++) {
      painting.push('#'+Math.floor(Math.random()*16777215).toString(16))  
  }

  d3.select("#pie-chart").remove();
  d3.select("#bar-chart").remove();

  const colors = d3.scaleOrdinal()
  .range(painting)
  
  const margin = { top: 20, right: 20, bottom: 20, left: 20 },
    width = 750,
    height = 320;
    // radius = width / 4;

  //   arc generator
  const segments = d3
    .arc()
    .innerRadius(100)
    .outerRadius(150)
    // .innerRadius(radius - 100);

  const gen = d3
    .pie()
    .sort(null)
    .value(d => {
      return d.value;
    })(data);

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
    .call(responsivefy)
    .attr("id", "pie-chart")

    const sections = svg.append("g")
    // .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
    .attr("transform", "translate(200, 160)")
    .selectAll("path")
    .data(gen)
    .enter()
    .append("path")
    .attr("class", "arc")
    .attr("d", segments)
    .attr("fill", d => colors(d.data.value));
    

  let legends = svg
                .append("g")
                .attr("transform", "translate(430, 1)")
                .selectAll(".legends").data(gen);
    
    let legend = legends.enter().append("g").classed("legends", true).attr("transform", function(d,i){return "translate(0," + (i + 1)*30 + ")";});
    legend
      .append("rect")
      .attr("width", 20)
      .attr("height", 20)
      .attr("fill", d => colors(d.data.value));

      legend
        .append("text")
        .text(function(d) {
            let upperCaseLabel = d.data.label.split("_")
          upperCaseLabel = upperCaseLabel.map(word => {
              return word[0].toUpperCase() + word.slice(1)
          }).join(" ")
          return `${upperCaseLabel} ${(d.data.value * 100).toFixed(2)}%`;
        })
        .attr("fill", d => colors(d.data.value))
        .attr("x", 25)
        .attr("y", 15);


    

};
