import "./styles/index.scss";
import * as d3 from 'd3';
import fetchData from './fetch';
import search from './search';
import removeMarkers from './markers'

document.addEventListener("DOMContentLoaded", () => {
    window.markers = []

    
})


document.getElementById("btn").addEventListener("click", () => {
    removeMarkers();
    let options = [];

    const value = document.getElementsByClassName("search-name")[0].value;
    options.push(value);
    fetchData(options)
     .then(response => {
     //    debugger
        response.forEach(school => {

            let latLong = {lat: school["location.lat"], lng: school["location.lon"] }
            let marker = new google.maps.Marker({
                position: latLong,
                title: school["school.name"],
                map: map
            })

            marker.addListener('click', function () {
                map.setZoom(8);
                map.setCenter(marker.getPosition());
            });

            window.markers.push(marker)
            

            


        })
        
        
     });
})