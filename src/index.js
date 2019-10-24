import "./styles/css_reset.css";
import "./styles/index.scss";
import * as d3 from "d3";
import { fetchData, fetchSchoolData } from "./fetch";
import { removeMarkers, formatMarkers } from "./markers";
import schoolPageContainer from './school_page_container';

document.addEventListener("DOMContentLoaded", () => {
  window.markers = [];
});

document.getElementById("btn").addEventListener("click", () => {
  let infoWindow = new google.maps.InfoWindow({});
  debugger
  window.infoWindow = infoWindow;
  google.maps.event.addListener(window.infoWindow, "domready", () => {
    debugger
    document.getElementById("more-info").addEventListener("click", (e) => {
      debugger
        let schoolName = e.target.previousSibling.textContent;
        sessionStorage.setItem('schoolName', schoolName) 
        
        fetchSchoolData(schoolName)
        .then((response) => {
            response.forEach(school => {
                if (school["school.name"] === sessionStorage.getItem("schoolName")) {
                    
                    //animate the search page away
                    //animate the show page in
                    schoolPageContainer(school);
                }
            });
    
            //begin school page
        })
    });
  });



  removeMarkers();
  // let options = [];
  const value = document.getElementsByClassName("search-name")[0].value;
  // options.push(value);
  fetchData(value).then(response => {
    debugger
    formatMarkers(response);
  });
});


