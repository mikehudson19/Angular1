import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotAuthenticatedGuard implements CanActivate {

  constructor(private _router: Router) {}

  // Prevent access to create and edit ads if not logged in
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const authKey: number = +localStorage.getItem('authKey');
      if (!authKey) {
        this._router.navigate(['/']);
        return false;
      }
    return true;
  }
  
}
