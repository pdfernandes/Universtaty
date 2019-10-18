import * as d3 from "d3";

export const barChart = dataSet => {
    dataSet.forEach((datum, i) => {
        return datum.order = i
    })
  let svg, bandScale;
  const createChart = () => {
    svg = d3.select(".bar").append("svg");

    let painting = [];
    for (let i = 0; i < dataSet.length; i++) {
      painting.push("#" + Math.floor(Math.random() * 16777215).toString(16));
    }

    const colors = d3.scaleOrdinal().range(painting);

    const h = 300,
      w = 600;

    svg.attr("height", h).attr("width", w);

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
        return d.label;
      });


      // adding in axis 

  };


  createChart();

//   d3.select(".sort").on("change", toggleSort);

//   function toggleSort () {
//     let sortComparer;

//     if (this.checked) {
//       sortComparer = (a, b) => {
//         return b.value - a.value;
//       };
//     }

//     // sortComparer = (a, b) => {
//     //   return a.ordered - b.ordered;
//     // };

//     dataSet.sort(sortComparer);
//     let infoOrder = dataSet.map(datum => {
//       return datum.label;
//     });
//     bandScale.domain(infoOrder);

//     svg
//       .transition()
//       .selectAll("rect")
//       .attr("x", d => {
//         return bandScale(d.label);
//       });
//   };

   d3.select(".sort").on("change", change);
   function change() {
     var sortComparer;
     if (this.checked) {
       // Sort by wins.
       sortComparer = function(a, b) {
         return b.value - a.value;
       };
     } else {
       // Sort by original order.
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
