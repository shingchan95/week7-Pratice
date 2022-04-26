input= document.getElementById("pac-input")

let clickLat;
let clickLng;
let inputLat;
let inputLng;
let map;
var markers = [];
var iconImage = "https://maps.google.com/mapfiles/marker_black.png"


function initialize() {
  google.maps.visualRefresh = true;
}
function initMap() {
  const myLatlng = { lat: 53.4795, lng: -2.2451 };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: myLatlng,
  });
  


  const input = document.getElementById("pac-input");
  const searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  
  map.addListener("bounds_changed", () => {
    searchBox.setBounds(map.getBounds());
  });
  
  
  searchBox.addListener("places_changed", () => {
    const places = searchBox.getPlaces();



    
    if (places.length == 0) {
      return;
    }
      // For each place, get the icon, name and location.
      const bounds = new google.maps.LatLngBounds();
  
      places.forEach((place) => {
        if (!place.geometry || !place.geometry.location) {
          console.log("Returned place contains no geometry");
          return;
        }
  
        const icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25),
        };


        //input cooridinate
        inputLat= place.geometry.location.lat();
        inputLng = place.geometry.location.lng();  
        
        // Create a marker for each place.
        markers.push(
          new google.maps.Marker({
            map,
            icon,
            title: place.name,
            position: place.geometry.location,
            icon: iconImage,
            
          })
          );
        
         if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
          } else {
           bounds.extend(place.geometry.location);
          }
          
        });
      var latLng = new google.maps.LatLng(inputLat, inputLng); //Makes a latlng
      map.panTo(latLng);
      console.log(inputLat)
      console.log(inputLng)
    
    });
   
      
      
      map.addListener("click", (mapsMouseEvent) => {
        clickPos= mapsMouseEvent.latLng.toJSON()
        clickLat=clickPos.lat;
        clickLng=clickPos.lng;


        new google.maps.Marker({
          position: {lat: clickLat, lng: clickLng},
          map: map,
          icon: iconImage,
          title: "city",
          animation: google.maps.Animation.BOUNCE


        });

      console.log(clickLat)
      console.log(clickLng)
        

      });

  

    }
    
    
    //cooridnate output
    //console.log(clickLat)
    //console.log(clickLng)
    //console.log(inputLat)
    //console.log(inputLng)
    

    
    


