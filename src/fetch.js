import { api_key } from '../api_keys';
const fetchData = (options) => {
    debugger
    const request = new XMLHttpRequest()
    const data = request.open("GET", `https://api.data.gov/ed/collegescorecard/v1/schools.json?school.degrees_awarded.predominant=2,${options[0]}&_fields=id,school.name,2017.student.size&api_key=${api_key}`, true)
    request.onload = function (response) {
        debugger
    }
    
    request.send()

}


export default fetchData;


