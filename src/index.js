import "./styles/index.scss";
import * as d3 from "d3";
import { fetchData, fetchSchoolData } from "./fetch";
import { removeMarkers, formatMarkers } from "./markers";
import schoolPage from './school_page';

document.addEventListener("DOMContentLoaded", () => {
  window.markers = [];
});

document.getElementById("btn").addEventListener("click", () => {
  let infoWindow = new google.maps.InfoWindow({});
  window.infoWindow = infoWindow;
  google.maps.event.addListener(window.infoWindow, "domready", () => {
    document.getElementById("more-info").addEventListener("click", (e) => {
        let schoolName = e.target.previousSibling.textContent;
        sessionStorage.setItem('schoolName', schoolName) 
        debugger
        fetchSchoolData(schoolName)
        .then((response) => {
            response.forEach(school => {
                if (school["school.name"] === sessionStorage.getItem("schoolName")) {
                    debugger
                    //animate the search page away
                    //animate the show page in
                    schoolPage(school);
                }
            });
    
            //begin school page
        })
    });
  });
  removeMarkers();
  let options = [];
  const value = document.getElementsByClassName("search-name")[0].value;
  options.push(value);
  fetchData(options).then(response => {
    formatMarkers(response);
  });
});


