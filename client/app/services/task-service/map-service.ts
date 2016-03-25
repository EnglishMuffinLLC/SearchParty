import { Injectable } from 'angular2/core';
import { TaskPage } from '../../pages/tasks/tasks';
//import google-maps


//set injectable
@Injectable()
  export class GoogleMapService {
    finalDist: any;
    map = null;
    
    constructor(){}
    
    calcDistance(previousPlaces){
      let latLng0 = new google.maps.LatLng(previousPlaces[0].location.coordinate.latitude, previousPlaces[0].location.coordinate.longitude);
      let latLng1 = new google.maps.LatLng(previousPlaces[1].location.coordinate.latitude, previousPlaces[1].location.coordinate.longitude);
      let latLng2 = new google.maps.LatLng(previousPlaces[2].location.coordinate.latitude, previousPlaces[2].location.coordinate.longitude);
      let latLng3 = new google.maps.LatLng(previousPlaces[3].location.coordinate.latitude, previousPlaces[3].location.coordinate.longitude);
      let latLng4 = new google.maps.LatLng(previousPlaces[4].location.coordinate.latitude, previousPlaces[4].location.coordinate.longitude);
      let latLng5 = new google.maps.LatLng(previousPlaces[5].location.coordinate.latitude, previousPlaces[5].location.coordinate.longitude);
      let latLng6 = new google.maps.LatLng(previousPlaces[6].location.coordinate.latitude, previousPlaces[6].location.coordinate.longitude);
      let latLng7 = new google.maps.LatLng(previousPlaces[7].location.coordinate.latitude, previousPlaces[7].location.coordinate.longitude);
      let latLng8 = new google.maps.LatLng(previousPlaces[8].location.coordinate.latitude, previousPlaces[8].location.coordinate.longitude);
      let latLng9 = new google.maps.LatLng(previousPlaces[9].location.coordinate.latitude, previousPlaces[9].location.coordinate.longitude);
      let dist0 = google.maps.geometry.spherical.computeDistanceBetween (latLng0, latLng1);
      let dist1 = google.maps.geometry.spherical.computeDistanceBetween (latLng1, latLng2);
      let dist2 = google.maps.geometry.spherical.computeDistanceBetween (latLng3, latLng4);
      let dist3 = google.maps.geometry.spherical.computeDistanceBetween (latLng4, latLng5);
      let dist4 = google.maps.geometry.spherical.computeDistanceBetween (latLng5, latLng6);
      let dist5 = google.maps.geometry.spherical.computeDistanceBetween (latLng6, latLng7);
      let dist6 = google.maps.geometry.spherical.computeDistanceBetween (latLng7, latLng8);
      let dist7 = google.maps.geometry.spherical.computeDistanceBetween (latLng8, latLng9);
      let sum = dist0+dist1+dist2+dist3+dist4+dist5+dist6+dist7;
      this.finalDist = (sum * 0.000621371).toPrecision(3);
      return this.finalDist;
    }

    loadMap(lat, long, zoom, content){
      let loadMapPromise = new Promise((resolve, reject) => {
        let options = { timeout: 10000, enableHighAccuracy: true };
        let latLng = new google.maps.LatLng(lat, long);
        let mapOptions = {
          center: latLng,
          zoom: zoom,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
        this.addMarker(latLng, content);
        resolve(this.map);
      });
      return loadMapPromise;
    }

    addMarker(coords, content) {
      let pin = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: coords
      });

      let info = content;
      this.addInfoWindow(pin, info);
    }

    addInfoWindow(marker, content){
      console.log(content);
      let infoWindow = new google.maps.InfoWindow({
        content: content
      });

      google.maps.event.addListener(marker, 'click', function(){
        infoWindow.open(this.map, marker);
      });
    }
  }