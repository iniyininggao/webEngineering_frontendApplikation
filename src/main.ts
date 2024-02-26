import { navigationHTML } from './component/navbar/navbar';
import * as scooterJsonData from './public/SCOOTERABSTELLOGD.json';


let map;
const navElement: HTMLElement = document.getElementById('nav')!;
const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
const numOfJsonData = scooterJsonData.totalFeatures;

navElement.innerHTML = navigationHTML;

function scooterJsonDataParse (scooterJsonData:{ features: any[] }, map:any) {
 if(scooterJsonData != null) {
  for (let i = 0; i < numOfJsonData; i++){
    const scotterLongitude : number = scooterJsonData.features[i].geometry.coordinates[0];
    const scotterLatitude : number = scooterJsonData.features[i].geometry.coordinates[1];
    const scooterAdresse : string = scooterJsonData.features[i].properties.ADRESSE;
    const scooterBezirk : number = scooterJsonData.features[i].properties.BEZIRK;
    const scooterAnzahl : number = scooterJsonData.features[i].properties.ANZ_SCOOTER;

    addNewMapsPosition(map, scotterLatitude, scotterLongitude, scooterAdresse, scooterBezirk, scooterAnzahl);
   }
 }else{
  alert("Failed to fetch scooter data")
 }
}

function addNewMapsPosition (map:any, scotterLatitude: number, scotterLongitude: number, scooterAdresse: string, scooterBezirk: number, scooterAnzahl: any) {
  let title: string;

  if (scooterBezirk < 10) {
    title = 'Adresse des Scooterabstellplatz: ' + scooterAdresse + ', 10' + scooterBezirk + '0, Wien';
  } else {
    title = 'Adresse des Scooterabstellplatz: ' + scooterAdresse + ', 1' + scooterBezirk + '0, Wien';
  }

  const marker = new AdvancedMarkerElement({
    map: map,
    position: { lat: scotterLatitude, lng: scotterLongitude },
    title: title,
  });

  marker.addListener("click", () => {
    if (scooterAnzahl != null) {
      title = 'Anzahl vom Scooter des Scooterabstellplatz: ' + scooterAnzahl;
    } else {
      title = 'Anzahl vom Scooter des Scooterabstellplatz: Unbekannt' ;
    }
    map.setZoom(18);
    map.setCenter({ lat: scotterLatitude, lng: scotterLongitude });
    marker.title = title;
  });
}

async function initMap(): Promise<void> {
  const position = { lat: 48.21553363, lng: 16.32815609 };
  map = new Map(
    document.getElementById('map') as HTMLElement,
    {
      center: position,
      mapId: 'Scooterabstellplätze Wien',
      zoom: 16,
    }
  );
  scooterJsonDataParse(scooterJsonData, map);
}

initMap();

// export default scooterJsonDataParse; addNewMapsPosition;