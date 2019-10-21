import { barChartPercentage } from "./bar_percent";
import { doughnut } from "./doughnut";
import { barChart } from "./bar_fixed"

const schoolPage = info => {
  debugger;
  let {
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
  schoolPage.classList.remove("hidden");
  //   school.className = "active";
  //   let div = document.createElement("div");
  //   div.className = 'school-info-buttons'
  //   div.textContent = "Hello my name is div"
  //   schoolPage.appendChild(div);
  debugger

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
   debugger
    barChart(admissionsSAT);
  });

  document.getElementById("act-admissions-info").addEventListener("click", () => {
    debugger
    barChart(admissionsACT);
  });

};

export default schoolPage;
