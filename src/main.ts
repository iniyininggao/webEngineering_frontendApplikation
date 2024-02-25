import * as scooterJsonData from './public/SCOOTERABSTELLOGD.json';
import { navigationHTML } from './component/navbar/navbar';

let map;
const navElement: HTMLElement = document.getElementById('nav')!;
const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
const numOfJsonData = scooterJsonData.totalFeatures;

navElement.innerHTML = navigationHTML;

function scooterJsonDataParse (ScooterJsonData:{ features: any[] }, map:any) {
 for (let i = 0; i < numOfJsonData; i++){
  //const scooterGeo = ScooterJsonData.features[i].geometry;
  const scotterLongitude = ScooterJsonData.features[i].geometry.coordinates[0];
  const scotterLatitude = ScooterJsonData.features[i].geometry.coordinates[1];
  const scooterAdresse = ScooterJsonData.features[i].properties.ADRESSE;
  const scooterAnzahl = ScooterJsonData.features[i].properties.ANZ_SCOOTER;
  //console.log(scooterGeo)

  addNewMapsPosition(map, scotterLatitude, scotterLongitude, scooterAdresse);
 }
}

function addNewMapsPosition (map:any, ScotterLatitude: number, ScotterLongitude: number, ScooterAdresse: string) {
  const marker = new AdvancedMarkerElement({
    map: map,
    position: { lat: ScotterLatitude, lng: ScotterLongitude },
    title: 'Scooterabstellplatz: ' + ScooterAdresse
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