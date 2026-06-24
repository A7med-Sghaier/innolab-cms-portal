import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'dbs-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input() template: string;
  @Input() menuItems: any;
  selectedMenuItem$: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  @Output() selectedMenu: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.selectedMenuItem$.next(this.menuItems[0].key);

  }

  get selectedMenuItem(): string {
    return this.selectedMenuItem$.getValue();
  }

  scrollToTarget(item) {
    this.selectedMenuItem$.next(item);
    // this.selectedMenu.emit(item);
  }
}
