import { AbstractControl } from '@angular/forms';

export class CustomValidators {

  static noSpaceValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    if ((control.value as string).indexOf(' ') !== -1) {
      return { 'noSpaceValidator': true };
    }
    return null;
  }

  static noSpecialChars (control: AbstractControl): { [key: string]: boolean } | null {
    if (/[!@#$%^&*(),.?":{}|<>]/g.test(control.value)) {
      return { 'specialChar' : true }
    }
    return null;
  }

  static emailValidator(
    control: AbstractControl): { [key: string]: boolean } | null {
      if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(control.value)) {
        return { 'emailFormat' : true };
      }
      return null;
    }
  

  static passwordSpecial(control: AbstractControl): { [key: string]: boolean } | null {
    if (!/\W|_/g.test(control.value) ) {
      return { 'passwordSpecial' : true };
    } 
    return null;
  }

  static passwordNumber(control: AbstractControl): { [key:  string]: boolean } | null {
    if (!/[0-9]/.test(control.value)) {
      return { 'passwordNumber' : true };
    }
    return null;
  }

  static passwordUpperCase(control: AbstractControl): { [key: string]: boolean } | null {
    if (!/[A-Z]/.test(control.value)) {
      return { 'passwordUpperCase': true }
    }
    return null;
  }

  static noNumbers(control: AbstractControl): { [key: string]: boolean } | null {
    if (/[0-9]/.test(control.value)) {
      return { 'numbers' : true }
    }
    return null;
  }

  static passwordCompare(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    let password = control.get('password');
    let confirmPass = control.get('confirmPass');
  
    if (password.pristine || confirmPass.pristine) {
      return null;
    }
  
    if (password.value !== confirmPass.value) {
      return { 'match' : true }
    }
    return null;
  }
  
}