export const nullValueIndicator = () => {
  let chart = document.getElementsByClassName("chart")[0];
  chart.innerHTML =
    "<div class='null-warning'><h1>Unfortunately the school you have chosen does not have this information available.</h1></div>";
};

export const prepareChartArea = () => {
    let chart = document.getElementsByClassName("chart")[0];
    chart.innerHTML = "";
};
