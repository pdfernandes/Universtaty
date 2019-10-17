import "./styles/index.scss";
import * as d3 from "d3";
import { fetchData, fetchSchoolData } from "./fetch";
import { removeMarkers, formatMarkers } from "./markers";

document.addEventListener("DOMContentLoaded", () => {
  window.markers = [];
});

document.getElementById("btn").addEventListener("click", () => {
  let infoWindow = new google.maps.InfoWindow({});
  window.infoWindow = infoWindow;
  google.maps.event.addListener(window.infoWindow, "domready", () => {
    document.getElementById("more-info").addEventListener("click", (e) => {
        debugger
        fetchSchoolData(e.target.previousSibling.textContent)
        .then(response => {
            debugger
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


