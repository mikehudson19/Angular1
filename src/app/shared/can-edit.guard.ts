import { Injectable, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IAdvert } from '../adverts/IAdvert';
import { AdvertService } from '../services/advert.service';

@Injectable({
  providedIn: 'root'
})
export class CanEditGuard implements CanActivate {

  advert: IAdvert;

  constructor(private _router: Router) {}
  // Prevent logged in user from editing another user's advert
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const authKey: number = +localStorage.getItem('authKey');
      if (authKey === +route.url[2].path || +route.url[2].path === 0)  { 
        return true;
      }
      this._router.navigate(['/myadverts']);
      return false;
  }
}
