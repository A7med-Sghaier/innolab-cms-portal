import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'dbs-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  @Input() items

  constructor() { }

  ngOnInit() {
  }

}
