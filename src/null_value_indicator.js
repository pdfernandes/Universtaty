export const nullValueIndicator = (data) => {
    let chart = document.getElementsByClassName("chart")[0]
    if (data.length === 0) {
        chart.innerHTML = "<div class='null-warning'><h1>Unfortunaly the school you have chosen does not have this information available.</h1></div>"

    } else {
        chart.innerHTML = "";
    }
}