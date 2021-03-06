import { AbstractControl } from '@angular/forms';

const alphanumeric: RegExp = new RegExp(/^[a-z0-9]+$/i);
const alpha: RegExp = new RegExp(/^[a-z]+$/i);
const numbers: RegExp = new RegExp(/^\d+$/);
const letters: RegExp = new RegExp(/.*[a-zA-Z].*/);

export function alphaValidator(control: AbstractControl): any {
  let errors: any[] = [];
  let errObj = {};

  if (control.value && control.value.indexOf(' ') >= 0) {
    errors.push("spaceError");
  }
  if (control.value && !alpha.test(control.value)) {
    errors.push("alphaError");
  }
  
  if (errors.length > 0) {
    errors.forEach((err: string) => {
      errObj[err] = true;
    });
    return errObj;
  }

  return null;
}

export function numOnlyValidator(control: AbstractControl): any {
  let errors: any[] = [];
  let errObj = {};
console.log(control.value, numbers.test(control.value))
  if (control.value && !numbers.test(control.value)) {
    errors.push("numOnlyError");
  }

  if (errors.length > 0) {
    errors.forEach((err: string) => {
      errObj[err] = true;
    });
    return errObj;
  }

  return null;
}

export function dateInputValidator(control: AbstractControl): any {
  if (control.value && letters.test(control.value)) {
    return { dateInputError: true };
  }
  return null;
}