import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})

export class AppComponent implements OnInit {
  isLoggedIn: boolean;
  currentRoute: string;

  constructor(private _router: Router) {}

  ngOnInit(): void {

    // Get current url and update 'isLoggedIn' to display different Navbar items 
    this._router.events.pipe(
      filter(event => event instanceof NavigationEnd))
    .subscribe(event => 
     {
        this.currentRoute = this._router.url;   
        if (this.currentRoute === '/myadverts') {
          this.isLoggedIn = true;
        }
     });
  }

  logout(): void {
    localStorage.removeItem('authKey');
    this.isLoggedIn = false;
    this._router.navigate(['/']);
  }
}

