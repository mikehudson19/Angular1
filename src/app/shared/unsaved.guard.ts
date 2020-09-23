import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { EditAdvertComponent } from '../adverts/edit-advert/edit-advert.component';

@Injectable({
  providedIn: 'root'
})
export class UnsavedGuard implements CanDeactivate<EditAdvertComponent> {

  // Confirm that the user wants to abandon changes to an edited ad.
  canDeactivate(
    component: EditAdvertComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (component.editAdvertForm.dirty) {
        return confirm('You have unsaved changes - sure you want to leave?')
      }
    return true;
  }
  
}
