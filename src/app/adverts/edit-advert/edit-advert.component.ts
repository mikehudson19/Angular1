import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AdvertService } from 'src/app/services/advert.service';
import { CustomValidators } from 'src/app/shared/customValidators';
import { Advert } from '../advert';
import { IAdvert } from '../IAdvert';

@Component({
  templateUrl: './edit-advert.component.html',
})
export class EditAdvertComponent implements OnInit {
  editAdvertForm: FormGroup;
  id: number;
  advert: IAdvert;
  sub: Subscription;
  newAdvertId: number;
  message: { [key: string]: string } = {};
  validationMessages: {} = {
    title: {
      required: 'A title is required.',
      minlength: 'Your title needs to be at least 3 characters long.',
      spaceStart: 'Your title cannot start with a space',
      maxlength: 'Your first name cannot be longer than 20 characters',
      specialChar: 'Your first name cannot contain any special characters',
    },
    price: {
      required: 'A price is required.',
      onlyNumbers: 'Your price can only contain number values.',
      maxlength: 'Your price cannot be longer than 8 characters',
      noSpaceValidator: 'Your price cannot contain a space.'
    },
    description: {
      required: 'A description is required.',
      maxlength: 'Your description cannot be longer than 300 characters.',
      spaceStart: 'Your description cannot start with a space.'
    },
  };

  constructor(
    private _route: ActivatedRoute,
    private _adService: AdvertService,
    private _fb: FormBuilder,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.editAdvertForm = this._fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          CustomValidators.spaceStartValidator,
        ],
      ],
      price: [
        '',
        [
          Validators.required,
          CustomValidators.onlyNumbers,
          Validators.maxLength(8),
          CustomValidators.noSpaceValidator
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.maxLength(300),
          CustomValidators.spaceStartValidator,
        ],
      ],
    });

    // Get the advert ID from the route parameter 
    this.sub = this._route.paramMap.subscribe((params) => {
      this.id = +params.get('id');
      this.getAdvert(this.id);
    });

    // Listen for value changes on the form controls
    this.editAdvertForm.valueChanges
      .pipe(debounceTime(600))
      .subscribe((value) => {
        this.message = this.invalidInputs(this.editAdvertForm);
      });

      this.getNewAdId();
    
  }

  invalidInputs(formgroup: FormGroup) {
    let messages = {};

    for (const input in formgroup.controls) {
      const control = formgroup.controls[input];
      if (this.validationMessages[input]) {
        messages[input] = '';
        if (control.errors && (control.dirty || control.touched)) {
          // Map the array of error keys on the control and assign the error message corresponding to the key to the 'messages' object.
          Object.keys(control.errors).map((messageKey) => {
            messages[input] = this.validationMessages[input][messageKey];
          });
        }
      }
    }
    return messages;
  }

  getAdvert(id: number): void {
    // Get the advert from the "DB" that the user has tried to access.
    this._adService.getAdvert(id).subscribe({
      next: (ad) => {
        this.advert = ad
        this.displayAdvert(ad)
      },
      error: (err) => console.error(err)});
  }

  onSave(): void {
    // Check that the form has no validation errors
    if (this.editAdvertForm.valid) {
      // Check if this is a new advert via the parameter
      if (this.id === 0) {
        this.createAdvert();
      }
      // Check if this is an exisitng advert via the parameter.
      if (this.id > 0) {
        this.updateAdvert();
      }
    } else {
      alert('Please ensure all fields are completed correctly.')
    }
  }

  displayAdvert(advert: IAdvert): void {
    // Take the advert values from the "DB" and insert them into the form.
    this.editAdvertForm.patchValue({
      title: advert.title,
      price: advert.price,
      description: advert.description,
    });
  }

  createAdvert(): void {
    // Instantiate the advert instance
    const advert = new Advert(
      this.newAdvertId,
      this.editAdvertForm.get('title').value,
      this.editAdvertForm.get('description').value,
      new Date(),
      this.editAdvertForm.get('price').value,
      +localStorage.getItem('authKey')
    )
    // Post the advert via the Advert Service
    this._adService.createAdvert(advert).subscribe({
      next: () => this.afterSave(),
      error: (err) => console.error(err) 
    })
  }

  updateAdvert(): void {
    // Spread the form values and the DB values into one advert object
    const ad = {...this.advert, ...this.editAdvertForm.value}
    // Use the put method on the Advert Service to update the "DB"
    this._adService.updateAdvert(ad).subscribe({
      next: () => this.afterSave(),
      error: (err) => console.error(err)
    })
  }

  deleteAdvert(): void {
    const confirmation: boolean = confirm('Are you sure you want to delete this ad?')
    if (confirmation === true) {
      this._adService.deleteAdvert(this.id).subscribe({
        next: () => this.afterSave(),
      });
    }
  }

  afterSave(): void {
    // Mark the form as pristine and untouched to prevent the guard from activating - can't use reset as it makes the values null and interferes with my custom validators.
    this.editAdvertForm.markAsPristine();
    this.editAdvertForm.markAsUntouched();
    this._router.navigate(['/myadverts']);
  }

  getNewAdId(): void {
    const adIdVals: number[] = [];
    // Get an array of adverts in the "DB", push their IDs into an array and add 1 to the last ID to create an ID for the new product.
    this._adService.getAdverts().subscribe({
      next: (adverts) => {
        for (let ad of adverts) {
          adIdVals.push(ad.id)
        }
        const currentLastId: number = Math.max(...adIdVals);
        this.newAdvertId = currentLastId + 1;
      },
      error: (err) => console.error(err)
    })
  }
}
