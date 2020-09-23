import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AdvertService } from 'src/app/services/advert.service';

@Component({
  selector: 'app-user-adverts',
  templateUrl: './user-adverts.component.html'
})

export class UserAdvertsComponent implements OnInit {

  user = localStorage.getItem('authKey');
  sub: Subscription;
  id: number;

  adverts$ = this._adService.getAdverts()
    .pipe(
      map((adverts) => 
      adverts.filter(ad => {
          return ad.owner == +this.user} )
      )
    )

  constructor(private _adService: AdvertService,
              private _router: Router,
              private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.sub = this._route.paramMap.subscribe(
      params => {
        this.id = +params.get('id');
      }
    );
  }

  deleteAdvert(id: number): void {
    const confirmation: boolean = confirm('Are you sure you want to delete this advert?')
    if (confirmation === true) {
      this._adService.deleteAdvert(id).subscribe();
      // Navigate away from the current view and then back to it so that the view reloads and the deleted advert is gone.
      this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this._router.navigate(['/myadverts']);
    });
    }
  }

}
