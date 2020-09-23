import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlHandlingStrategy } from '@angular/router';
import { Observable, of } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { IAdvert } from '../adverts/IAdvert';

@Injectable({
  providedIn: 'root'
})

export class AdvertService {

  adUrl: string = 'api/adverts';
  user: string = localStorage.getItem('authKey');

  constructor(private _http: HttpClient) { }

  getAdverts(): Observable<IAdvert[]> {
   return this._http.get<IAdvert[]>(this.adUrl)
  }

  getAdvert(id: number): Observable<IAdvert> {
    if (id === 0) {
     return of(this.initializeAd());
    }

    const url = `${this.adUrl}/${id}`
    return this._http.get<IAdvert>(url);
  }

  createAdvert(advert: IAdvert): Observable<IAdvert> {
    const headers = new HttpHeaders({ 'Content-Type' : 'application/json' })
    const url = `${this.adUrl}/${advert.id}`
    return this._http.post<IAdvert>(url, advert, { headers : headers });
  }

  updateAdvert(advert: IAdvert): Observable<IAdvert> {
    const headers = new HttpHeaders({ 'Content-Type' : 'application/json' });
    const url = `${this.adUrl}/${advert.id}`;
    return this._http.put<IAdvert>(url, advert, { headers: headers });
  }

  deleteAdvert(id: number): Observable<IAdvert> {
    const url = `${this.adUrl}/${id}`;
    const headers = new HttpHeaders({ 'Content-Type' : 'application/json' })
    return this._http.delete<IAdvert>(url, { headers : headers })
  }

  initializeAd(): IAdvert {
    return {
      id: 0,
      title: '',
      description: '',
      listDate: null,
      price: null,
      owner: null
    }
  }
  
}
