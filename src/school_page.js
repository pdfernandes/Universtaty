import { barChartPercentage } from "./bar_percent";
import { doughnut } from "./doughnut";
import { barChart } from "./bar_fixed"

const schoolPage = info => {
  ;
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

  let schoolPage = document.getElementById("school-page");
  
  document.getElementById("school-page-name").textContent = schoolName;
  
  schoolPage.classList.remove("hidden");

  //   school.className = "active";
  //   let div = document.createElement("div");
  //   div.className = 'school-info-buttons'
  //   div.textContent = "Hello my name is div"
  //   schoolPage.appendChild(div);
  

  document.getElementById("academics-info").addEventListener("click", () => {
    barChartPercentage(academics);
  });

  document.getElementById("gender-demographics-info").addEventListener("click", () => {
    doughnut(demographicsGender);
  });

  document.getElementById("race-demographics-info").addEventListener("click", () => {
    doughnut(demographicsRace);
  });

  document.getElementById("sat-admissions-info").addEventListener("click", () => {
 
    barChart(admissionsSAT);
  });

  document.getElementById("act-admissions-info").addEventListener("click", () => {

    barChart(admissionsACT);
  });
  //review this

  function currencyFormat(num) {
    return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  function titleCase(string) {
    let stringArr = string.split("_")
    let titleString = [];
    stringArr.forEach(word => {
      titleString.push(word[0].toUpperCase() + word.slice(1).toLowerCase())
    })
            
    return titleString.join(" ");
  }

  
  const createList = (input) => {
    let ul = document.createElement("ul")
    input.forEach(ele => {
      debugger
      let listElement = document.createElement("li")
      listElement.innerHTML = 
      `
      <h3>${titleCase(ele.label)}</h3>
      <h4>${currencyFormat(ele.value)}</h4>
      `
      ul.appendChild(listElement)
    })
    debugger
    return ul.outerHTML

  }

  let generalStats = document.getElementById("general-stats")
  generalStats.innerHTML =
  `
  <div class='completion-rate'>
    <h1>Completion Rate</h1>
    <h2>${(completionRate * 100).toFixed(2)}%</h2>
  </div>
  <div class='completion-rate'>
    <h1>Admission Rate</h1>
    <h2>${(admissionRate * 100).toFixed(2)}%</h2>
  </div>
  <div class='completion-rate'>
    <h1>Pell Grant Recipient Percentage</h1>
    <h2>${(aid[0].value * 100).toFixed(2)}%</h2>
  </div>
  <div class='completion-rate'>
    <h1>Average Cost</h1>
    ${createList(cost)}
  </div>
  `

};

export default schoolPage;
