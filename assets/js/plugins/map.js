var mapData = {
    api_key: "AIzaSyBUyLIEuwNqSZ4HiON27_-XD8wDM5KZXfo",
    markers: [{
            position: {
                lat: 40.746921,
                lng: -73.779062
            },
            title: "My company",
            address: "Queens, New York, USA"
        },
        {
            position: {
                lat: 41.551197,
                lng: -72.665644
            },
            title: "Middletown branch",
            address: "281-245 Cross St Middletown, CT 06457, USA"
        },
        {
            position: {
                lat: 41.328263,
                lng: -72.955918
            },
            title: "Connecticut branch",
            address: "New Haven, Connecticut, USA"
        }
    ]
};

function loadGoogleMapsScript(callback) {
    if (window.google && window.google.maps) {
        callback();
        return;
    }
    var script = document.createElement('script');
    script.src = "https://maps.googleapis.com/maps/api/js?key=" + mapData.api_key + "&callback=" + callback;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
}

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 17,
        center: {
            lat: 50.4501,
            lng: 30.5234
        },
        mapTypeId: 'roadmap',
        styles: [
            // Roads
            {
                featureType: "road",
                elementType: "geometry",
                stylers: [{
                    color: "#000000"
                }]
            },
            // Water
            {
                featureType: "water",
                elementType: "geometry",
                stylers: [{
                    color: "#aadaff"
                }]
            },
            // Street caption color
            {
                featureType: "road",
                elementType: "labels.text.fill",
                stylers: [{
                    color: "#ffffffff"
                }]
            }
        ]

    });

    var bounds = new google.maps.LatLngBounds();
    var infoWindow = new google.maps.InfoWindow();

    mapData.markers.forEach(function (markerData) {
        var marker = new google.maps.Marker({
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

        marker.addListener('click', function () {
            infoWindow.setContent(`<div><strong>${markerData.title}</strong><br>${markerData.address}</div>`);
            infoWindow.open(map, marker);
        });

        bounds.extend(markerData.position);
    });

    map.fitBounds(bounds);
}

loadGoogleMapsScript('initMap');