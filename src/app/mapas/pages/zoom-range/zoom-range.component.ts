import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [`
  .mapa-container{
    width: 100%;
    height: 100%;
  }
  .row{
    background-color: white;
    border-radius: 5px;
    bottom: 50px;
    left: 50px;
    padding: 5px;
    position: fixed;
    z-index:  999;
    width: 400px;
  }
  `
  ]
})
export class ZoomRangeComponent implements AfterViewInit {

  @ViewChild('mapa') divMapa!: ElementRef
  map !: mapboxgl.Map;
  zoomLevel: number = 10;

  constructor() {  }

  ngAfterViewInit(): void {
    this.map = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-72.92212376572472, 11.539927771619015],
      zoom: this.zoomLevel,
  });

  //agregamos un listener al hacer zoom para que al momento de hacer scroll o hacer zoom me indique la cantidad de zoom que hizo
  this.map.on('zoom', (ev)=>{
    this.zoomLevel = this.map.getZoom();
  })

  //Para limitar a que el zoomIn maximo sea de 18
  this.map.on('zoom', (ev)=>{
    if(this.map.getZoom() > 18){
      this.map.zoomTo(18)
    }
  })


  }

  zoomOut(){
    this.map.zoomOut()
    this.zoomLevel = this.map.getZoom();
  }

  zoomIn(){
    this.map.zoomIn()
    this.zoomLevel = this.map.getZoom();
  }

  cambioZoom(valor : string){
    this.map.zoomTo(Number(valor)) 
  }

}
