import { Component, OnInit } from '@angular/core';
import  * as mapboxgl from 'mapbox-gl' //Se hizo npm i --save-dev @types/mapbox-gl para que pudiera agarrar las librerias
import { environment } from '../../../../environments/environment';
//de mapbux y se utilizadas en TypeScript ademas se le pone el asterisco para decir "toma todo el tipado de mapbox-gl y 
//lo vas a conocer como mapBoxgl"


@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styles: [`
  #mapa{
    width: 100%;
    height: 100%;
  }
  `
  ]
})
export class FullScreenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    var map = new mapboxgl.Map({
    container: 'mapa',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-72.92212376572472, 11.539927771619015],
    zoom:19
});
  }

}
