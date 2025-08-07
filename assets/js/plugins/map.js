const GOOGLE_MAPS_API_KEY = "AIzaSyBUyLIEuwNqSZ4HiON27_-XD8wDM5KZXfo";

const mapData = {
  markers: [
    {
      position: { lat: 40.746921, lng: -73.779062 },
      title: "My company",
      address: "Queens, New York, USA"
    },
    {
      position: { lat: 41.551197, lng: -72.665644 },
      title: "Middletown branch",
      address: "281-245 Cross St Middletown, CT 06457, USA"
    },
    {
      position: { lat: 41.328263, lng: -72.955918 },
      title: "Connecticut branch",
      address: "New Haven, Connecticut, USA"
    }
  ]
};

// Обязательно сделать initMap глобальной
window.initMap = function () {
  const mapEl = document.getElementById("map");
  if (!mapEl) return;

  mapEl.style.display = "block";
  const placeholder = document.querySelector(".map__placeholder");
  if (placeholder) placeholder.remove();

  const map = new google.maps.Map(mapEl, {
    zoom: 17,
    center: { lat: 50.4501, lng: 30.5234 },
    mapTypeId: "roadmap",
    styles: [
      { featureType: "road", elementType: "geometry", stylers: [{ color: "#000000" }] },
      { featureType: "water", elementType: "geometry", stylers: [{ color: "#aadaff" }] },
      { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#ffffff" }] }
    ]
  });

  const bounds = new google.maps.LatLngBounds();
  const infoWindow = new google.maps.InfoWindow();

  mapData.markers.forEach(markerData => {
    const marker = new google.maps.Marker({
      map,
      position: markerData.position,
      title: markerData.title,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 20,
        fillColor: "black",
        fillOpacity: 1,
        strokeWeight: 2,
        strokeColor: "black"
      }
    });

    marker.addListener("click", () => {
      infoWindow.setContent(`<div><strong>${markerData.title}</strong><br>${markerData.address}</div>`);
      infoWindow.open(map, marker);
    });

    bounds.extend(markerData.position);
  });

  map.fitBounds(bounds);
};

// Подгружаем Google Maps API с callback=initMap
(function loadGoogleMapsScript() {
  if (window.google && window.google.maps) {
    window.initMap();
    return;
  }

  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&callback=initMap`;
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
})();
