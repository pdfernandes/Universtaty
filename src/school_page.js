import { doughnut } from "./doughnut"
import { barChart } from "./bar";
const schoolPage = school => {
  let academics = [];
  let admissionsSAT = [];
  let admissionsACT = [];
  let cost = [];
  let aid = [];
  let demographicsRace = [];
  let demographicsGender = [];
  let admissionRate;
  let completionRate;

  for (let category in school) {
    let splitCategory = category.split(".");
    if (splitCategory.includes("academics")) {
      academics.push({
        label: splitCategory[splitCategory.length - 1],
        value: school[category]
      });
    } else if (splitCategory.includes("admissions")) {
      if (splitCategory.includes("act_scores")) {
        admissionsACT.push({
          label: `${splitCategory[splitCategory.length - 2]}_${
            splitCategory[splitCategory.length - 1]
          }`,
          value: school[category]
        });
      } else if (splitCategory.includes("sat_scores")) {
        admissionsSAT.push({
          label: `${splitCategory[splitCategory.length - 2]}_${
            splitCategory[splitCategory.length - 1]
          }`,
          value: school[category]
        });
      } else if (splitCategory.includes("admission_rate")) {
        admissionRate = [school[category]];
      }
    } else if (splitCategory.includes("cost")) {
      cost.push({
        label: splitCategory[splitCategory.length - 1],
        value: school[category]
      });
    } else if (splitCategory.includes("aid")) {
      aid.push({
        label: splitCategory[splitCategory.length - 1],
        value: school[category]
      });
    } else if (splitCategory.includes("demographics")) {
      if (
        splitCategory[splitCategory.length - 1] === "men" ||
        splitCategory[splitCategory.length - 1] === "women"
      ) {
        demographicsGender.push({
          label: splitCategory[splitCategory.length - 1],
          value: school[category]
        });
      } else {
        demographicsRace.push({
          label: splitCategory[splitCategory.length - 1],
          value: school[category]
        });
      }
    } else if (splitCategory.includes("completion")) {
      completionRate = [school[category]];
    }
  }
  debugger;

    barChart(academics)

  //this function will sort the school data into its categories and hook onto different object within the div container
};

export default schoolPage;
