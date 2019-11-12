import "./styles/css_reset.css";
import "./styles/index.scss";
import * as d3 from "d3";
import { fetchData, fetchSchoolData } from "./fetch";
import { removeMarkers, formatMarkers } from "./markers";
import schoolPageContainer from "./school_page_container";
import anime from "animejs/lib/anime.es.js";

document.addEventListener("DOMContentLoaded", () => {
  window.markers = [];
});

document.getElementById("btn").addEventListener("click", () => {
  let infoWindow = new google.maps.InfoWindow({});
  window.infoWindow = infoWindow;
  google.maps.event.addListener(window.infoWindow, "domready", () => {
    document.getElementById("more-info").addEventListener("click", e => {
      let schoolName = e.target.previousSibling.textContent;
      sessionStorage.setItem("schoolName", schoolName);

      fetchSchoolData(schoolName).then(response => {
        response.forEach(school => {
          if (school["school.name"] === sessionStorage.getItem("schoolName")) {
            let promptUser = document.getElementsByClassName(
              "prompt-user-container"
            )[0];
            if (promptUser !== undefined) {
              anime({
                targets: ".prompt-user-container",
                translateX: "100vw",
                easing: "linear",
                duration: 800,
                complete: () => {
                  schoolPageContainer(school);
                  anime({
                    targets: ".school-page-main",
                    translateY: ["100vh", 0],
                    easing: "linear"
                  });
                  anime({
                    targets: ".school-page-side-container",
                    translateY: ["100vh", 0],
                    translateX: ["100vw", 0],
                    easing: "linear"
                  });
                }
              });
            } else {
              schoolPageContainer(school);
            }
          }
        });
      });
    });
  });

  removeMarkers();
  const value = document.getElementsByClassName("search-name")[0].value;
  fetchData(value).then(response => {
    formatMarkers(response);
  });
});
