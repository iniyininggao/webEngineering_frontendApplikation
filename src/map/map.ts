import { navigationHTML } from '../component/navbar/navbar';
import * as scooterJsonData from './../public/SCOOTERABSTELLOGD.json';
//import * as google from 'google.maps';

const navElement: HTMLElement = document.getElementById('nav')!;
navElement.innerHTML = navigationHTML;

/* let map: google.maps.Map;
async function initMap(): Promise<void> {
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  map = new Map(document.getElementById("map") as HTMLElement, {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
}

initMap();  */

// var map = L.map('map').setView([51.505, -0.09], 13);