//margin and radius
import * as d3 from "d3";

export const doughnut = data => {
  //
  debugger;
  let painting = [];
  for (let i = 0; i < data.length; i++) {
      painting.push('#'+Math.floor(Math.random()*16777215).toString(16))  
  }

  const colors = d3.scaleOrdinal()
  .range(painting)
  
  const margin = { top: 20, right: 20, bottom: 20, left: 20 },
    width = 750,
    height = 500;
    // radius = width / 4;

  //   arc generator
  const segments = d3
    .arc()
    .innerRadius(100)
    .outerRadius(200)
    // .innerRadius(radius - 100);

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

    const sections = svg.append("g")
    // .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
    .attr("transform", "translate(200, 200)")
    .selectAll("path")
    .data(gen)
    .enter()
    .append("path")
    .attr("class", "arc")
    .attr("d", segments)
    .attr("fill", d => colors(d.data.value));
    

  let legends = svg
                .append("g")
                .attr("transform", "translate(450, 50)")
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
