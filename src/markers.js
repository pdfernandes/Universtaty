const removeMarkers = () => {
    for (let i = 0; i < window.markers.length; i++) {
        window.markers[i].setMap(null);
    }
}



export default removeMarkers;



