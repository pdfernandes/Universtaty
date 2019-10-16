import { edu_api } from '../api_keys';
const fetchData = (options) => {
    return new Promise(function (resolve, reject) {
        const request = new XMLHttpRequest()
        const data = request.open("GET", `https://api.data.gov/ed/collegescorecard/v1/schools.json?school.name=${options}&_fields=id,school.name,2017.student.size,location.lat,location.lon&per_page=100&api_key=${edu_api}`, true)
        request.onload = function (data) {
            let info = JSON.parse(data.currentTarget.response);
            let { results } = info;
            resolve(results);
        }
        request.send()
    });

}


export default fetchData;


