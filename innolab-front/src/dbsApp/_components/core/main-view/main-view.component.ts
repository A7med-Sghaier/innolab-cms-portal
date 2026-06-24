import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ViewServices} from '../../../_services/view-services.service';
import {BehaviorSubject} from 'rxjs';
import {Professor} from '../../../_models/professor';
import {startPageCarousel} from '../../../_models/carousels';
import {renderApiHost, renderView} from '../../../_helpers/renders';
import {PageScrollConfig} from 'ngx-page-scroll';

@Component({
  selector: 'dbs-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit, AfterViewInit {

  private changes: MutationObserver;
  otherStyles = [];
  viewStructure$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private viewSrvc: ViewServices) {
    PageScrollConfig.defaultScrollOffset = 64;
  }

  ngOnInit() {
    this.viewSrvc.initView()
      .then(res => {
        this.viewStructure$.next(res);
      });
  }

  ngAfterViewInit(): void {
    this.initMutationChanges();
  }

  initMutationChanges() {

    this.viewStructure$.subscribe(mutationList => {
      if (!mutationList) {
        return;
      }

      mutationList = mutationList.items.map(item => {
        if (item.subItems && item.subItems.items) {
          return [item.key, ...item.subItems.items.filter(subitem => subitem.onTopMenu).map(subItem => subItem.key)];
        } else {
          return item.key;
        }
      })
        .reduce((a, b) => [...a, ...b], []);
       //  .map(item => @ViewChild(item));


      mutationList.forEach(item => {
         // @ViewChild(item) element: ElementRef;

      });

    });

    /*
    const element = this.elementRef.nativeElement;

    this.changes = new MutationObserver((mutations: MutationRecord[]) => {
        mutations.forEach((mutation: MutationRecord) => this.domChange.emit(mutation));
      }
    );

    this.changes.observe(element, {
      attributes: true,
      childList: true,
      characterData: true
    });
    */
  }

  get viewStructure(): any {
    return this.viewStructure$.getValue();
  }

  get sections(): any[] {
    return this.viewStructure.items;
  }

  asProfessor(element: any): Professor {
    return new Professor(element);
  }

  parseCardData(viewStructure , data) {
    return renderView(data, viewStructure);
  }

  parseNewsData(viewStructure, data) {
    return data.map( newsItem => renderView(newsItem, viewStructure));
  }

  getRequiredView(viewKey) {
    if (!viewKey) {
      return null;
    }

    const retView = this.viewStructure.required_views.find(item => item.key === viewKey);
    if (retView && retView.meta_data) {
      return retView.meta_data;
    }
    return null;
  }

  getSlides(key): any[] {
    switch (key) {
      case 'home-carousel':
        return startPageCarousel;
    }
  }

  getRequiredStyle(view) {
    if (view && view.style) {
      return renderApiHost(view.style);
    }
    return {};
  }

  selectMenuItem(itemKy) {

  }

  onScroll(event) {
    // console.log('--', event);
  }

}
