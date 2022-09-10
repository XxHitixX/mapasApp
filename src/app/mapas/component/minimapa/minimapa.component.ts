import { Component, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-minimapa',
  templateUrl: './minimapa.component.html',
  styles: [`
  div{
    width: 100%;
    height: 150px;
    margin: 0px;
  }`
  ]
})
export class MinimapaComponent implements AfterViewInit {

  @ViewChild('mapa') divMapa !: ElementRef
  @Input() lngLat !: [number, number];
  map !: mapboxgl.Map;

  constructor() { }

  ngAfterViewInit(): void {
    this.map = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.lngLat,
      zoom: 15,
  }); 
  new mapboxgl.Marker()
  .setLngLat(this.lngLat)  
  .addTo(this.map)
  }
}
