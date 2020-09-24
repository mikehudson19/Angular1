import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AdvertService } from 'src/app/services/advert.service';
import { IAdvert } from '../IAdvert';

@Component({
  selector: 'app-all-adverts',
  templateUrl: './all-adverts.component.html'
})
export class AllAdvertsComponent implements OnInit {

  _listFilter: string;
  adverts: IAdvert[];
  filteredAdverts: IAdvert[];

  constructor(private _adService: AdvertService) { }
 
  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredAdverts = this._listFilter ? this.performFilter(this._listFilter) : this.adverts;
  }

  ngOnInit(): void {
    this.getAdverts();
  }

  getAdverts(): void {
    this._adService.getAdverts().subscribe({
      next: (adverts) => {
        this.adverts = adverts,
        this.filteredAdverts = this.adverts },
      error: (err) => console.error(err)
    })
  }

  performFilter(filterBy: string): IAdvert[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.adverts.filter((advert: IAdvert) => 
      advert.title.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
      advert.description.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }
}
