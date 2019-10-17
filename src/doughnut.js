//margin and radius
import * as d3 from "d3";

export const doughnut = data => {
  //
  debugger;
  const colors = d3.scaleOrdinal(d3.schemePaired);
  const margin = { top: 20, right: 20, bottom: 20, left: 20 },
    width = 750 - margin.right - margin.left,
    height = 750 - margin.top - margin.bottom,
    radius = width / 4;

  //   arc generator
  const segments = d3
    .arc()
    .outerRadius(radius - 10)
    .innerRadius(radius - 100);

  const gen = d3
    .pie()
    .sort(null)
    .value(d => {
      return d.value;
    })(data);
  console.log(gen);

  //   define svg

  const svg = d3
    .select(".pie")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 4 + "," + height / 4 + ")")
    .selectAll("path")
    .data(gen)
    .enter()
    .append("path")
    .attr("d", segments)
    .attr("fill", d => colors(d.data.value));

  let legends = d3.select(".pie")
                .append("svg")
                .append("g")
                .attr("transform", "translate(350, 200)")
                .selectAll(".legends").data(gen);
    
    let legend = legends.enter().append("g").classed("legends", true).attr("transform", function(d,i){return "translate(0," + (i + 1)* + ")";});
    legend
      .append("rect")
      .attr("width", 20)
      .attr("height", 20)
      .attr("fill", d => colors(d.data.value));

      legend
        .append("text")
        .text(function(d) {
          return d.data.label;
        })
        .attr("fill", d => colors(d.data.value))
        .attr("x", 20)
        .attr("y", 30);


    

};
