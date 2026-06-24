import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { DbsComponent } from './dbs.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {MaterialModule} from './_modules/material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './_modules/dbs-routing.module';
import {NgxMasonryModule} from 'ngx-masonry';
import { MainViewComponent } from './_components/core/main-view/main-view.component';
import {RestServices} from './_services/rest-services.service';
import {ViewServices} from './_services/view-services.service';
import { MenuComponent } from './_components/core/menu/menu.component';
import { CardViewComponent } from './_components/core/card-view/card-view.component';
import { CarouselComponent } from './_components/core/carousel/carousel.component';
import { NewsComponent } from './_components/core/news/news.component';
import {MarkdownModule} from 'ngx-markdown';
import { ExpandablesComponent } from './_components/core/expandables/expandables.component';
import {NgxPageScrollModule} from 'ngx-page-scroll';
import {TableViewComponent} from './_components/core/table-view/table-view.component';

@NgModule({
  declarations: [
    DbsComponent,
    MainViewComponent,
    MenuComponent,
    CardViewComponent,
    CarouselComponent,
    NewsComponent,
    ExpandablesComponent,
    TableViewComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    NgxMasonryModule,
    NgxPageScrollModule,
    ReactiveFormsModule,
    MarkdownModule.forRoot(),
  ],
  providers: [RestServices, ViewServices],
  bootstrap: [DbsComponent]
})
export class DbsModule { }
