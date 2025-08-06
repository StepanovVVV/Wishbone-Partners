// Загрузка скрипта карты
  function loadGoogleMapsScript(callback) {
    if (window.google && window.google.maps) {
      callback();
      return;
    }

    const script = document.createElement('script');
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBUyLIEuwNqSZ4HiON27_-XD8wDM5KZXfo&callback=" + callback;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }

  // Инициализация карты (тот же код, что у тебя)
  function initMap() {
    const mapElement = document.getElementById('map');
    mapElement.style.display = 'block'; // Показать карту
    document.querySelector('.map__placeholder')?.remove(); // Удалить заглушку

    const map = new google.maps.Map(mapElement, {
      zoom: 17,
      center: { lat: 50.4501, lng: 30.5234 },
      mapTypeId: 'roadmap',
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
        map: map,
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

      marker.addListener('click', () => {
        infoWindow.setContent(`<div><strong>${markerData.title}</strong><br>${markerData.address}</div>`);
        infoWindow.open(map, marker);
      });

      bounds.extend(markerData.position);
    });

    map.fitBounds(bounds);
  }

  // Загрузка карты после действия пользователя
  let mapLoaded = false;
  function initMapOnUserInteraction() {
    if (mapLoaded) return;
    mapLoaded = true;
    loadGoogleMapsScript('initMap');
    window.removeEventListener('scroll', initMapOnUserInteraction);
    window.removeEventListener('mousemove', initMapOnUserInteraction);
    window.removeEventListener('touchstart', initMapOnUserInteraction);
  }

  window.addEventListener('scroll', initMapOnUserInteraction, { once: true });
  window.addEventListener('mousemove', initMapOnUserInteraction, { once: true });
  window.addEventListener('touchstart', initMapOnUserInteraction, { once: true });

  // Данные карты
  const mapData = {
    api_key: "AIzaSyBUyLIEuwNqSZ4HiON27_-XD8wDM5KZXfo",
    markers: [
      { position: { lat: 40.746921, lng: -73.779062 }, title: "My company", address: "Queens, New York, USA" },
      { position: { lat: 41.551197, lng: -72.665644 }, title: "Middletown branch", address: "281-245 Cross St Middletown, CT 06457, USA" },
      { position: { lat: 41.328263, lng: -72.955918 }, title: "Connecticut branch", address: "New Haven, Connecticut, USA" }
    ]
  };
