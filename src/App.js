import React, { Component } from 'react';
import Map from "./Map"
import PlacesList from "./PlacesList"
import getFoursquareData from "./foursquareAPI";

class App extends Component {
    state = {
        query: ""
    }

    // Real estate listings that will be shown to the user.
    locations = [
	    {
            "title": "Adisucipto International Airport (JOG)",
            "type": "transport",
            "icon": "http://maps.google.com/mapfiles/kml/pushpin/grn-pushpin.png",
            "locLatLng": { lat: -7.787684, lng: 110.431761 },
            "id": "5a88069026659b534a876e49"
        },

        {
            "title": "Stasiun Jogjakarta",
            "type": "transport",
            "icon": "http://maps.google.com/mapfiles/kml/pushpin/grn-pushpin.png",
            "locLatLng": { lat: -7.78927, lng: 110.363553 },
            "id": "503b6693e4b0bbf1b090a5ca"
        },

        {
            "title": "Jalan Malioboro",
            "type": "shopping",
            "icon": "http://maps.google.com/mapfiles/kml/pushpin/pink-pushpin.png",
            "locLatLng": { lat: -7.79265, lng: 110.365888 },
            "id": "4b835901f964a520620331e3"
        },

        {
            "title": "Pasar Beringharjo",
            "type": "shopping",
            "icon": "http://maps.google.com/mapfiles/kml/pushpin/pink-pushpin.png",
            "locLatLng": { lat: -7.798954, lng: 110.36728 },
            "id": "4ba47041f964a520669d38e3"
        },

        {
            "title": "Taman Sari Palace",
            "type": "entertainment",
            "icon": "http://maps.google.com/mapfiles/kml/pushpin/blue-pushpin.png",
            "locLatLng": { lat: -7.810313, lng: 110.360018 },
            "id": "4bad8b68f964a520535a3be3"
        },

        {
            "title": "Gembira Loka Zoo",
            "type": "entertainment",
            "icon": "http://maps.google.com/mapfiles/kml/pushpin/blue-pushpin.png",
            "locLatLng": { lat: -7.804093, lng: 110.398013 },
            "id": "4bb53e8c941ad13afafe1de3"
        }
    ]

    componentDidMount() {
        window.initMap = this.initMap.bind(this);
        // Catch authentication errors with the global function.
        window.gm_authFailure = this.gm_authFailure;
        // Loads asynchronously the JS definitions when the page starts loading in the browser.
        this.loadJS("https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyBBj-DSrH9xNm4Kle5NwIhWlW54Tme7dXU&callback=initMap");
    }

    setQuery = (query) => {
        this.setState({
            query
        })
    }

    // Initializes JS function to load the map.
    initMap() {
        var _this = this;

        var view = document.getElementById("map");
        view.style.height = window.innerHeight + "px";
        this.map = new window.google.maps.Map(view, {
            center: { lat: -7.797456, lng: 110.370697 },
            zoom: 14,
            mapTypeControl: false
        });

        // Create an onclick event to open an infowindow at each marker.
        this.locations.forEach(location => {
            let titleType = location.title + " / " + location.type;
            let marker = new window.google.maps.Marker({
                map: this.map,
                title: location.title,
                position: location.locLatLng,
                animation: window.google.maps.Animation.DROP,
                icon: location.icon
            });


            // Create an onclick event to open an infowindow at each marker.
            marker.infowindow = new window.google.maps.InfoWindow({});
            marker.addListener("click", function() {
                _this.openInfoWindow(marker);
            });
            marker.infowindow.addListener("closeclick", function() {
                _this.openInfoWindow(marker);
            });
            getFoursquareData(location.id, marker.infowindow)
            location.marker = marker;
            location.titleType = titleType;
        });
    }

    // Open the Info Window and set animated active marker
    openInfoWindow(marker) {
        if (marker.getAnimation() !== null) {
            marker.infowindow.close();
            marker.setAnimation(null);
        } else {
            marker.infowindow.open(this.map, marker);
            marker.setAnimation(window.google.maps.Animation.BOUNCE);
        }
    }

    // Load the script that refer to google maps
    loadJS = (src) => {
        var ref = window.document.getElementsByTagName("script")[0];
        var script = window.document.createElement("script");
        script.src = src;
        script.async = true;
        ref.parentNode.insertBefore(script, ref);
    }

    render() {
        return ( 
			<div className = "app">
              <header>
               <h1> YOGYAKARTA < /h1>
			  </header> 
			
				<div className = "flex" >
					<PlacesList 
						locations = {this.locations}
						query = {this.state.query}
						onSetQuery = {this.setQuery}
						openInfoWindow = {this.openInfoWindow}
				/>
				
				<Map
					map = {this.map}
					locations = {this.locations}
					query = {this.state.query}
					openInfoWindow = {this.openInfoWindow}
				/>
				
			  <footer>
               <p> This App is using Google Maps and Foursquare API < /p>
			  </footer> 	
			</div>
		</div>
       );
    }
}

export default App;