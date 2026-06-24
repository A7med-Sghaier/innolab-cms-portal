/*************************************************************
 * innolab-front - rest-services.service.ts
 *
 * created by : Ahmed Sghaier - a7mado008@gmail.com
 * created on : 21.10.18 - 15:21
 * version : 1.0
 * copyright : all right reserved 2018
 *************************************************************/
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class RestServices {

  constructor(private http: HttpClient) {}

  getReq(url): Observable<any> {
    const headers = this.initHttpHeader();
    return this.http.get(url, {headers: headers});
  }

  setReq(url, data): Observable<any> {
    const headers = this.initHttpHeader();
    return this.http.patch(url, data, {headers: headers});
  }

  initHttpHeader(): HttpHeaders {
   // const token = this.userSrv.token;
    const token = '';
    let headers;

    if (token) {
      headers = new HttpHeaders()
        .set('Accept', 'application/json')
        .set('Content-type', 'application/json')
        .set('Authorization', 'Bearer ' + token);
    } else {
      headers = new HttpHeaders()
        .set('Accept', 'application/json')
        .set('Content-type', 'application/json');
    }
    return headers;
  }

  testReq(url): Promise<any> {
    const headers = this.initHttpHeader();
    return this.http.get(url, {headers: headers})
      .toPromise();
  }

}
