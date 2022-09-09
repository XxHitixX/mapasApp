import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface marcadorColor{
  color  : string;
  marker ?: mapboxgl.Marker;
  center ?: [number, number]
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [`
  .mapa-container{
    width: 100%;
    height: 100%;
  }
  ul{
    position: fixed;
    top: 20px;
    right: 30px;
    z-index: 99;
  }
  li{
    cursor: pointer;
  }
  `
  ]
})
export class MarcadoresComponent implements AfterViewInit {

  @ViewChild('mapa') divMapa!: ElementRef
  map !: mapboxgl.Map;
  zoomLevel: number = 15;
  center : [number, number] = [-72.92212376572472, 11.539927771619015];
  marcadores : marcadorColor[] = [];

  constructor() { }

  ngAfterViewInit(): void {
    this.map = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel,
  });

  //agregamos un listener al hacer zoom para que al momento de hacer scroll o hacer zoom me indique la cantidad de zoom que hizo
  this.map.on('zoom', () =>{
    this.zoomLevel = this.map.getZoom();
  })

  //Para limitar a que el zoomIn maximo sea de 18
  this.map.on('zoomend', (ev)=>{
    if(this.map.getZoom() > 18){
      this.map.zoomTo(18)
    }
  })

  //Centrando el mapa
  this.map.on('move', (event)=>{
    const target = event.target;
    const {lng, lat} = target.getCenter();
    this.center = [lng, lat]
  })

  this.leerLocalStorage();
  
  }

  agregarMarcador(){
    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const nuevoMarcador = new mapboxgl.Marker({
      draggable : true,
      color
    })
          .setLngLat(this.center)
          .addTo(this.map)

    this.marcadores.push({
      color,
      marker : nuevoMarcador
    })
    
    this.guardarenLocalStorage()      
  }

  irMarcador(marker ?: mapboxgl.Marker){
    this.map.flyTo({
      center: marker?.getLngLat()
    })
  }

  guardarenLocalStorage(){

    const lngLatArr : marcadorColor[] = [];
    this.marcadores.forEach( m => {
      const color = m.color;
      const { lng, lat } = m.marker!.getLngLat();
       
      lngLatArr.push({
        color: color,
        center: [lng, lat]
      })

      localStorage.setItem('marcadores', JSON.stringify(lngLatArr))
    })

  }

  leerLocalStorage(){

    if(!localStorage.getItem('marcadores')){
      return;
    }

    const lngLatArr : marcadorColor[] = JSON.parse(localStorage.getItem('marcadores')!)

    lngLatArr.forEach(m => {
      const newMarker = new mapboxgl.Marker({
        draggable: true,
        color: m.color
      })
      .setLngLat(m.center!)
      .addTo(this.map);

      this.marcadores.push({
        marker: newMarker,
        color: m.color
      })
     newMarker.on('dragend', () => {
        console.log('movido')
        this.guardarenLocalStorage();
      }) 
    })

  }

  borrarMarcador(i : number){
    this.marcadores[i].marker?.remove();
    this.marcadores.splice(i,1);
    this.guardarenLocalStorage();
  }

}
