import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AdvertService } from 'src/app/services/advert.service';
import { IAdvert } from '../IAdvert';

@Component({
  templateUrl: './checkout-advert.component.html'
})
export class CheckoutAdvertComponent implements OnInit {

  adId: number;
  advert$: Observable<IAdvert>;

  constructor(private _adService: AdvertService,
              private _route: ActivatedRoute) { }

  ngOnInit(): void {
   const id = +this._route.snapshot.paramMap.get('id');
    this.getAdvert(id);
  }

  getAdvert(id: number): void {
    this.advert$ = this._adService.getAdvert(id);
} 
}
