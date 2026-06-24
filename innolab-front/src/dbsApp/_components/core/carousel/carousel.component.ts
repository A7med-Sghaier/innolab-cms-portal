import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'dbs-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  @Input() slides: any[];
  @Input() carouselRef;

  constructor() { }

  ngOnInit() {
  }


  nToArray(n: number): number[] {
    return Array.from(Array(n).keys(), i => i++);
  }
}
