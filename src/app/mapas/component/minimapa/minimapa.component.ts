import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-minimapa',
  templateUrl: './minimapa.component.html',
  styles: [
  ]
})
export class MinimapaComponent implements OnInit {

  @ViewChild('mapa') divMapa !: ElementRef

  constructor() { }

  ngOnInit(): void {
  }

}
