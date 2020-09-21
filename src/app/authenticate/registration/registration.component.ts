import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { User } from '.././user';
import { Router } from '@angular/router';

import { debounceTime } from 'rxjs/operators';
import { CustomValidators } from '../../shared/customValidators';
import { UserService } from '../../services/user.service';
import { IUser } from '.././IUser';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})

export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  message: { [key: string]: string } = {};
  users: User[];

  validFields: { [key: string]: boolean } = {
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    passwords: false
  };

  validationMessages: {} = {
    firstName: {
      required: 'Your first name is required.',
      minlength: 'Your first name needs to be at least 2 characters long.',
      noSpaceValidator: 'Your first name cannot contain spaces.',
      maxlength: 'Your first name cannot be longer than 20 characters',
      numbers: 'Your first name cannot contain any numbers.',
      specialChar: 'Your first name cannot contain any special characters'
    },
    lastName: {
      required: 'Your last name is required.',
      minlength: 'Your last name needs to be at least 2 characters long.',
      noSpaceValidator: 'Your last name cannot contain spaces.',
      maxlength: 'Your last name cannot be longer than 20 characters',
      numbers: 'Your last name cannot contain any numbers.',
      specialChar: 'Your last name cannot contain any special characters'
    },
    email: {
      required: 'Please enter your email address.',
      minlength: 'Your email address must be at least 6 characters long',
      noSpaceValidator: 'Your email cannot contain spaces.',
      emailFormat: 'This must be a valid email address.',
      maxlength: 'Your email cannot be longer than 20 characters',
    },
    passwords: {
      match: 'Your passwords must match.',
    },
    password: {
      required: 'A password is required.',
      minlength: 'Your password needs to be at least 6 characters long.',
      noSpaceValidator: 'Your password cannot contain spaces.',
      passwordNumber: 'Your password must contain at least one number.',
      passwordSpecial:
        'Your password must contain at least one special character.',
      passwordUpperCase:
        'Your passowrd must contain at leat one uppercase character.',
    },
    confirmPass: {
      required: 'Please confirm your password.'
    }
  };

  constructor(private _fb: FormBuilder,
              private _router: Router,
              private _userService: UserService) {}

  ngOnInit(): void {
    this.registrationForm = this._fb.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
          CustomValidators.noSpaceValidator,
          CustomValidators.noNumbers,
          CustomValidators.noSpecialChars
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
          CustomValidators.noSpaceValidator,
          CustomValidators.noNumbers,
          CustomValidators.noSpecialChars
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(30),
          CustomValidators.emailValidator,
          CustomValidators.noSpaceValidator,
        ],
      ],
      passwords: this._fb.group(
        {
          password: [
            '',
            [
              Validators.required,
              CustomValidators.noSpaceValidator,
              CustomValidators.passwordSpecial,
              Validators.minLength(6),
              CustomValidators.passwordUpperCase,
              CustomValidators.passwordNumber,
            ],
          ],
          confirmPass: ['', Validators.required],
        },
        { validator: CustomValidators.passwordCompare }
      ),
      robotCheck: ['', Validators.required],
    });

    // Populate the users property with the hard-coded users
    this.getUsers();

    this.registrationForm.valueChanges
      .pipe(debounceTime(600))
      .subscribe(
        (value) => (this.message = this.invalidInputs(this.registrationForm))
      );
  }

  invalidInputs(formgroup: FormGroup) {
    let messages = {};
    for (const input in formgroup.controls) {
      const control = formgroup.controls[input];
      
      // If the passwords don't match, assign error message.
      if (control instanceof FormGroup && control.errors) {
          Object.keys(control.errors).map((messageKey) => {
            messages[input] = this.validationMessages[input][messageKey];
          });
          return messages;
        }
      
      // If the passwords do match, activate the valid class.
      if (control instanceof FormGroup && control.valid && (control.touched || control.dirty)) {
        this.validFields[input] = true;
      } 
      
      // If the password field doesn't meet the requirements, assign error message.
      if (control instanceof FormGroup) {
        const nestedGroupMessages = this.invalidInputs(control);
        Object.assign(messages, nestedGroupMessages);
        return messages;
      }  
      
      // If any of the other fields don't meet the requirements, assign error message.
      if (this.validationMessages[input]) {
        messages[input] = '';
        if (control.errors && (control.dirty || control.touched)) {
          Object.keys(control.errors).map((messageKey) => {
            messages[input] = this.validationMessages[input][messageKey];
          });
          return messages;
        } 
      }
      
      // If the field has no errors, activate the valid class. 
      if (!control.errors && (control.dirty || control.touched)) {
        this.validFields[input] = true;
      }
    }
  }

  onSave(): void {
    const user = new User(
      this.assignId(),
      this.formatName(this.registrationForm.get('firstName').value),
      this.formatName(this.registrationForm.get('lastName').value),
      this.registrationForm.get('email').value,
      this.registrationForm.get('passwords.password').value,
      this.registrationForm.get('passwords.confirmPass').value
    );

    // Add new user to local storage and route to login page. 
    let users: IUser[] = [];

    if (localStorage.getItem('users')) {
      users = JSON.parse(localStorage.getItem('users'));
    } 

    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    this._router.navigate(['/login']);
  }

  getUsers(): void {
    this._userService.getUsers().subscribe(
      users => this.users = users,
      err => console.error(err)
    )
  }

  assignId(): number {
    let allUsers: IUser[] = [];

    // Create array of all users from API and local storage.
    if (localStorage.getItem('users')) {
      const users = JSON.parse(localStorage.getItem('users'));
      allUsers = [...this.users, ...users];
    } else {
      allUsers = [...this.users];
    }

    // Create array of the ID values from all users.
    let idVals: number[] = [];
    for (let user of allUsers) {
      idVals.push(user.id);
    }
    
    // Return an ID for the new user, by adding 1 onto the final ID in the DB.
    const currentLastId: number = Math.max(...idVals);
    return currentLastId + 1;
  }

  // Convert name fields to correct format
  formatName(name: string): string {
    return name.slice(0,1).toUpperCase() + name.slice(1).toLowerCase();
  }
}
