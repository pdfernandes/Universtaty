export const removeMarkers = () => {
  for (let i = 0; i < window.markers.length; i++) {
    window.markers[i].setMap(null);
  }
};

export const formatMarkers = response => {
  response.forEach(school => {
    const contentString = `<div>${school["school.name"]}</div><div id='more-info'>Click here for more info</div>`
    // const infoWindow = new google.maps.InfoWindow({
    //   content: contentString
    // });

    // google.maps.event.addListener(infoWindow, "domready", () => {
    //     document.getElementById("more-info").addEventListener("click", () => {
    //         document.getElementById("root").innerHTML = "HELLO"
    //     })
    // })
 
    let latLong = {
      lat: school["location.lat"],
      lng: school["location.lon"]
    };
    let marker = new google.maps.Marker({
      position: latLong,
      map: map,
      htmlContent: contentString
    });

    marker.addListener("click", function() {
        debugger
      map.setZoom(8);
      map.setCenter(marker.getPosition());
      window.infoWindow.setContent(marker.htmlContent)
      window.infoWindow.open(map, marker);
    });

    window.markers.push(marker);
  });
};
