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


  }

  zoomOut(){
    this.map.zoomOut()
    this.zoomLevel = this.map.getZoom();
  }

  zoomIn(){
    this.map.zoomIn()
    this.zoomLevel = this.map.getZoom();
  }


}
