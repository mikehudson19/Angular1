import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {

  user: User;
  email: string;
  password: string;
  users: User[];
  invalidEmail: boolean;
  invalidPassword: boolean;

  constructor(private _router: Router,
              private _userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers():void {
    this._userService.getUsers().subscribe(
      users => this.users = users,
      err => console.error(err)
    )
  }

  onSave(loginForm: NgForm): void {

    // Create array of users from API and from local storage.
    let allUsers: User[] = [];
    if (localStorage.getItem('users')) {
      const users = JSON.parse(localStorage.getItem('users'));
      allUsers = [...this.users, ...users];
    } else {
      allUsers = [...this.users];
    }

    // If validation is successfull, login and route to their adverts page.
    for (let user of allUsers) {
      if (user.email === this.email && user.password === this.password) {
        localStorage.setItem('authKey', JSON.stringify(user.id));
        this._router.navigateByUrl('/myadverts');
        return;
      }
    }
    
    this.authenticationErrors(allUsers);
  }

  // Generate error message if provided email address or password doesn't exist.
  authenticationErrors(allUsers: User[]): void {
    const emailsArray = []
    this.invalidEmail = false;
    this.invalidPassword = false;

    for (let user of allUsers) {
      emailsArray.push(user.email);
    }
   
    if (emailsArray.indexOf(this.email) === -1) {
      this.invalidEmail = true;  
      return;
    }

    this.invalidPassword = true;
    return;
  }
}
