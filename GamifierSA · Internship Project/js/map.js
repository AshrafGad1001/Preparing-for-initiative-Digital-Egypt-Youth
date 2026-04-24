let map, infoWindow;

function initAutocomplete(
  lat = "29.361941262865052",
  lng = "47.98301722070314"
) {
  var position = { lat: parseFloat(lat), lng: parseFloat(lng) };

  var map = new google.maps.Map(document.getElementById("map"), {
    center: position,
    zoom: 17,
    mapTypeId: "roadmap",
  });

  infoWindow = new google.maps.InfoWindow();

  const locationButton = document.createElement("button");

  locationButton.textContent = "اضغط لتحديد عنوانك";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);

  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          document.getElementById("lat").value = pos.lat;
          document.getElementById("long").value = pos.lng;

          infoWindow.setPosition(pos);
          infoWindow.setContent("عنوانك الحالي");
          infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });

  var Oldmarker = new google.maps.Marker({
    draggable: true, // Boolean, to set the draggable action to true.
    position: position, // The default latitude and longitude object.
    map: map, // The Map Object that we created.
    title: "Drag to your Location",
  });

  google.maps.event.addListener(Oldmarker, "click", function (event) {
    document.getElementById("lat").value = this.getPosition().lat();
    document.getElementById("long").value = this.getPosition().lng();
    var latlng = new google.maps.LatLng(
      this.getPosition().lat(),
      this.getPosition().lng()
    );
    getLatLongDetail(latlng);
  });

  google.maps.event.addListener(Oldmarker, "dragend", function (event) {
    document.getElementById("lat").value = this.getPosition().lat();
    document.getElementById("long").value = this.getPosition().lng();
    var latlng = new google.maps.LatLng(
      this.getPosition().lat(),
      this.getPosition().lng()
    );
    getLatLongDetail(latlng);
  });

  function getLatLongDetail(myLatlng) {
    geocoder = new google.maps.Geocoder();
    geocoder.geocode({ latLng: myLatlng }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          if (results[0].formatted_address != null) {
            formattedAddress = results[0].formatted_address;
            jQuery("#address").val(results[0].formatted_address);
          }
        }
      }
    });
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

window.initAutocomplete = initAutocomplete;
