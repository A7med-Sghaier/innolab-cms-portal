import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'dbs-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.scss']
})
export class CardViewComponent implements OnInit {

  @Input() card: any;
  defaultAvatarSrc = '/assets/images/Anonymous_emblem.svg.png';

  constructor() { }

  ngOnInit() {
   // console.log('####----', this.card);
  }

}
