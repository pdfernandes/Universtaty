import { barChartPercentage } from "./bar_percent";
import { doughnut } from "./doughnut";
import { barChart } from "./bar_fixed";

const schoolPage = info => {
  let {
    schoolName,
    academics,
    admissionRate,
    admissionsACT,
    admissionsSAT,
    aid,
    completionRate,
    cost,
    demographicsRace,
    demographicsGender
  } = info;

  debugger;

  let promptUser = document.getElementsByClassName("prompt-user-container")[0];
  if (promptUser !== undefined) {
    promptUser.className = "hidden";
  }
  debugger;

  let schoolPage = document.getElementById("school-page");
  debugger;
  document.getElementById("school-page-name").textContent = schoolName;
  debugger;
  schoolPage.classList.remove("hidden");

  if (document.getElementsByTagName("svg")[0] !== undefined) {
    barChartPercentage(academics);
  }

  //   school.className = "active";
  //   let div = document.createElement("div");
  //   div.className = 'school-info-buttons'
  //   div.textContent = "Hello my name is div"
  //   schoolPage.appendChild(div);

  //DRY this

  function removeSpinner() {
    let spinner = document.getElementsByClassName("prompt-user-button")[0];
    if (spinner.className.split(" ").includes("hidden")) {
      return;
    } else {
      spinner.className += " " + "hidden";
    }
  }

  document.getElementById("academics-info").addEventListener("click", () => {
    removeSpinner();
    barChartPercentage(academics);
    
  });

  document
    .getElementById("gender-demographics-info")
    .addEventListener("click", () => {
      removeSpinner();
      doughnut(demographicsGender);
    });

  document
    .getElementById("race-demographics-info")
    .addEventListener("click", () => {
      removeSpinner();
      doughnut(demographicsRace);
    });

  document
    .getElementById("sat-admissions-info")
    .addEventListener("click", () => {
      removeSpinner();
      barChart(admissionsSAT);
    });

  document
    .getElementById("act-admissions-info")
    .addEventListener("click", () => {
      removeSpinner();
      barChart(admissionsACT);
    });
  //review this

  function currencyFormat(num) {
    if (num === null) {
      return "N/A";
    }

    return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  function generalStatsFormat(data) {
    if (data[0] === null) {
      return "N/A";
    }

    return `${(data * 100).toFixed(2)}%`;
  }

  function titleCase(string) {
    let stringArr = string.split("_");
    let titleString = [];
    stringArr.forEach(word => {
      titleString.push(word[0].toUpperCase() + word.slice(1).toLowerCase());
    });

    return titleString.join(" ");
  }

  const createList = input => {
    let ul = document.createElement("ul");
    input.forEach(ele => {
      debugger;
      let listElement = document.createElement("li");
      listElement.innerHTML = `
      <h3>${titleCase(ele.label)}</h3>
      <h4>${currencyFormat(ele.value)}</h4>
      `;
      ul.appendChild(listElement);
    });
    debugger;
    return ul.outerHTML;
  };

  let generalStats = document.getElementById("general-stats");
  generalStats.innerHTML = `
  <div class='at-a-glance-info'>
    <h1>4-Year Graduation Rate</h1>
    <h2>${generalStatsFormat(completionRate)}</h2>
  </div>
  <div class='at-a-glance-info'>
    <h1>Admission Rate</h1>
    <h2>${generalStatsFormat(admissionRate)}</h2>
  </div>
  <div class='at-a-glance-info'>
    <h1>Pell Grant Percentage</h1>
    <h2>${generalStatsFormat(aid[0].value)}</h2>
  </div>
  <div class='cost-info'>
    <h1>Average Cost</h1>
    ${createList(cost)}
  </div>
  `;
};

export default schoolPage;
