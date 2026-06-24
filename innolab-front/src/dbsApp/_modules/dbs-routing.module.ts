/*************************************************************
 * innolab-front - dbs-routing.module.ts
 *
 * created by : Ahmed Sghaier - a7mado008@gmail.com
 * created on : 21.10.18 - 13:07
 * version : 1.0
 * copyright : all right reserved 2018
 *************************************************************/
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainViewComponent} from '../_components/core/main-view/main-view.component';

const dbsRoutes: Routes = [
  { path: 'dbs',
    children: [
      {path: '', component: MainViewComponent},
    //  {path: 'home', component: HomePageComponent},
    //  {path: 'offers', component: OffersComponent},
    //  {path: 'offers/:id', component: OffersComponent},
    //  {path: 'partners', component: PartnersComponent},
    //  {path: 'events', component: EventsComponent},
    //  {path: 'events/:id', component: EventsComponent},
    //  {path: 'application', component: ApplicationComponent},
    //  {path: 'galery', component: GalleryComponent},
    ]},
  { path: '', redirectTo: '/dbs', pathMatch: 'full'},
  { path: '**',  redirectTo: '/dbs'}
];


@NgModule({
  imports: [
    RouterModule.forRoot(
      dbsRoutes,
      {scrollPositionRestoration: 'enabled', enableTracing: false } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})


export class AppRoutingModule {}
