import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AdvertService } from 'src/app/services/advert.service';
import { IAdvert } from '../IAdvert';

@Component({
  selector: 'app-all-adverts',
  templateUrl: './all-adverts.component.html'
})
export class AllAdvertsComponent implements OnInit {

  constructor(private _adService: AdvertService) { }

  adverts$: Observable<IAdvert[]> = this._adService.getAdverts();

  ngOnInit(): void {
  }

}
