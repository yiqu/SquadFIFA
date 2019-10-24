import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';

/** Error when invalid control is dirty, touched, or submitted. */
export class InitErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    if (control) {
      return !!(control.invalid || (control.invalid && (control.dirty || control.touched || isSubmitted)));
    }
    return false;
  }
}