import { AbstractControl } from '@angular/forms';

const alphanumeric: RegExp = new RegExp(/^[a-z0-9]+$/i);
const alpha: RegExp = new RegExp(/^[a-z]+$/i);

export function alphaValidator(control: AbstractControl) {
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