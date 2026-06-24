/*************************************************************
 * innolab-front - view-services.service.ts
 *
 * created by : Ahmed Sghaier - a7mado008@gmail.com
 * created on : 21.10.18 - 15:21
 * version : 1.0
 * copyright : all right reserved 2018
 *************************************************************/
import {Injectable} from '@angular/core';
import {RestServices} from './rest-services.service';
import {apiUrlBuilder} from '../_helpers/httpHelpers';

@Injectable()
export class ViewServices {

  constructor(private restSrvc: RestServices) {}

  initView(): Promise<any> {
    const url = apiUrlBuilder('view/dbs_view')
    return new Promise<any>(( resolve, reject) => {
      this.restSrvc.getReq(url)
        .toPromise()
        .then( response => {
          resolve(response);
        })
        .catch(err => {
          reject({success: false, msg: err});
        });
    });
  }

  initMenuItems (items: any[]): any[] {

    return [];
  }


}
