import { edu_api } from "../api_keys";
export const fetchData = (options) => {
  debugger
  let formattedOptions = options.split(" ")
  formattedOptions = formattedOptions.map(word => {
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
  })

  formattedOptions = formattedOptions.join(" ")
  debugger

  return new Promise(function(resolve, reject) {
    const request = new XMLHttpRequest();
    const data = request.open(
      "GET",
      `https://api.data.gov/ed/collegescorecard/v1/schools.json?school.name=${formattedOptions}&_fields=id,school.name,2017.student.size,location.lat,location.lon&per_page=100&api_key=${edu_api}`,
      true
    );
    request.onload = function(data) {
      let info = JSON.parse(data.currentTarget.response);
      let { results } = info;
      resolve(results);
    };
    request.send();
  });
};

export const fetchSchoolData = school => {
  return new Promise(function(resolve, reject) {
    const request = new XMLHttpRequest();
    const data = request.open(
      "GET",
`https://api.data.gov/ed/collegescorecard/v1/schools.json?school.name=${school}&_fields=school.name,2017.student.size,latest.academics.program_percentage.mathematics,latest.academics.program_percentage.agriculture,latest.academics.program_percentage.resources,latest.academics.program_percentage.architecture,latest.academics.program_percentage.ethnic_cultural_gender,latest.academics.program_percentage.communication,latest.academics.program_percentage.communications_technology,latest.academics.program_percentage.computer,latest.academics.program_percentage.personal_culinary,latest.academics.program_percentage.education,latest.academics.program_percentage.engineering,latest.academics.program_percentage.engineering_technology,latest.academics.program_percentage.language,latest.academics.program_percentage.family_consumer_science,latest.academics.program_percentage.legal,latest.academics.program_percentage.health,latest.academics.program_percentage.english,latest.academics.program_percentage.humanities,latest.academics.program_percentage.library,latest.academics.program_percentage.biological,latest.academics.program_percentage.military,latest.academics.program_percentage.multidiscipline,latest.academics.program_percentage.parks_recreation_fitness,latest.academics.program_percentage.philosophy_religious,latest.academics.program_percentage.theology_religious_vocation,latest.academics.program_percentage.physical_science,latest.academics.program_percentage.science_technology,latest.academics.program_percentage.psychology,latest.academics.program_percentage.security_law_enforcement,latest.academics.program_percentage.public_administration_social_service,latest.academics.program_percentage.social_science,latest.academics.program_percentage.construction,latest.academics.program_percentage.mechanic_repair_technology,latest.academics.program_percentage.precision_production,latest.academics.program_percentage.transportation,latest.academics.program_percentage.visual_performing,latest.academics.program_percentage.health,latest.academics.program_percentage.business_marketing,latest.academics.program_percentage.history,latest.admissions.admission_rate.overall,latest.admissions.sat_scores.25th_percentile.critical_reading,latest.admissions.sat_scores.75th_percentile.critical_reading,latest.admissions.sat_scores.75th_percentile.math,latest.admissions.sat_scores.25th_percentile.math,latest.admissions.sat_scores.75th_percentile.writing,latest.admissions.sat_scores.25th_percentile.writing,latest.admissions.sat_scores.midpoint.critical_reading,latest.admissions.sat_scores.midpoint.math,latest.admissions.sat_scores.midpoint.writing,latest.admissions.sat_scores.average.overall,latest.admissions.act_scores.25th_percentile.cumulative,latest.admissions.act_scores.75th_percentile.cumulative,latest.admissions.act_scores.midpoint.cumulative,latest.aid.pell_grant_rate,latest.cost.attendance.academic_year,latest.cost.tuition.in_state,latest.cost.tuition.out_of_state,latest.student.demographics.race_ethnicity.white,latest.student.demographics.race_ethnicity.black,latest.student.demographics.race_ethnicity.hispanic,latest.student.demographics.race_ethnicity.asian,latest.student.demographics.race_ethnicity.aian,latest.student.demographics.race_ethnicity.nhpi,latest.student.demographics.race_ethnicity.two_or_more,latest.student.demographics.race_ethnicity.non_resident_alien,latest.student.demographics.race_ethnicity.unknown,latest.student.demographics.race_ethnicity.white_non_hispanic,latest.student.demographics.race_ethnicity.black_non_hispanic,latest.student.demographics.race_ethnicity.asian_pacific_islander,latest.completion.completion_rate_4yr_100nt,latest.student.demographics.men,latest.student.demographics.women&per_page=1803&api_key=${edu_api}`,
      true
    );
    request.onload = function(data) {
        debugger
      let info = JSON.parse(data.currentTarget.response);
      let { results } = info;
      resolve(results);
    };
    request.send();
  });
};




