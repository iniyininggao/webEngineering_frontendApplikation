import * as scooterJsonData from './public/SCOOTERABSTELLOGD.json';
import { navigationHTML } from './component/navbar/navbar';

let map;
const navElement: HTMLElement = document.getElementById('nav')!;
const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
const numOfJsonData = scooterJsonData.totalFeatures;

navElement.innerHTML = navigationHTML;

function scooterJsonDataParse (ScooterJsonData:{ features: any[] }, map:any) {
 if(ScooterJsonData != null) {
  for (let i = 0; i < numOfJsonData; i++){
    const scotterLongitude : number = ScooterJsonData.features[i].geometry.coordinates[0];
    const scotterLatitude : number = ScooterJsonData.features[i].geometry.coordinates[1];
    const scooterAdresse : string = ScooterJsonData.features[i].properties.ADRESSE;
    const scooterBezirk : number = ScooterJsonData.features[i].properties.BEZIRK;
    const scooterAnzahl : number = ScooterJsonData.features[i].properties.ANZ_SCOOTER;
    //console.log(scooterBezirk)
  
    addNewMapsPosition(map, scotterLatitude, scotterLongitude, scooterAdresse, scooterBezirk, scooterAnzahl);
   }
 }else{
  alert("Failed to fetch scooter data")
 }
}

function addNewMapsPosition (map:any, ScotterLatitude: number, ScotterLongitude: number, ScooterAdresse: string, ScooterBezirk: number, ScooterAnzahl: any) {
  let title: string;

  if (ScooterBezirk < 10) {
    title = 'Adresse des Scooterabstellplatz: ' + ScooterAdresse + ', 10' + ScooterBezirk + '0, Wien';
  } else {
    title = 'Adresse des Scooterabstellplatz: ' + ScooterAdresse + ', 1' + ScooterBezirk + '0, Wien';
  }

  const marker = new AdvancedMarkerElement({
    map: map,
    position: { lat: ScotterLatitude, lng: ScotterLongitude },
    title: title,
  });

  marker.addListener("click", () => {
    if (ScooterAnzahl != null) {
      title = 'Anzahl vom Scooter des Scooterabstellplatz: ' + ScooterAnzahl;
    } else {
      title = 'Anzahl vom Scooter des Scooterabstellplatz: Unbekannt' ;
    }
    map.setZoom(18);
    map.setCenter({ lat: ScotterLatitude, lng: ScotterLongitude });
    marker.title = title;
  });
}

async function initMap(): Promise<void> {
  const position = { lat: 48.21553363, lng: 16.32815609 };
  map = new Map(
    document.getElementById('map') as HTMLElement,
    {
      zoom: 16,
      center: position,
      mapId: 'Scooterabstellplätze Wien',
    }
  );
  scooterJsonDataParse(scooterJsonData, map);
}

initMap();