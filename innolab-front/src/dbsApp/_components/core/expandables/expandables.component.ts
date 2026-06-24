import {Component, Input, OnInit} from '@angular/core';
import {group} from '@angular/animations';
import {renderView} from '../../../_helpers/renders';

@Component({
  selector: 'dbs-expandables',
  templateUrl: './expandables.component.html',
  styleUrls: ['./expandables.component.scss']
})
export class ExpandablesComponent implements OnInit {

  @Input() data;
  @Input() view;
  @Input() requiredViews;

  group: any[];

  constructor() { }

  ngOnInit() {
    this.group = Object.keys(this.data).map( key => ({key: key, items: this.data[key]}));
  }

  parseCardData(viewStructure , data) {
    return renderView(data, viewStructure);
  }

  getRequiredView(viewKey) {
    if (!viewKey) {
      return null;
    }

    const retView = this.requiredViews.find(item => item.key === viewKey);
    if (retView && retView.meta_data) {
      return retView.meta_data;
    }
    return null;
  }
}
