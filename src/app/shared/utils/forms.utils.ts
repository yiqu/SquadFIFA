import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

export function createFormControl(value: any, disabled: boolean, 
  validators: any[] = null, asyncValids: any[] = null) {
    let fc = new FormControl({
      value: value ? value : null,
      disabled: disabled
    }, validators, asyncValids);
    return fc;
}

export function createFormControl2(value: any, disabled: boolean, 
  validators: any[] = null, asyncValids: any[] = null) {
    let fc = new FormControl({
      value: value,
      disabled: disabled
    }, validators, asyncValids);
    return fc;
}

function isNumeric(num: any): boolean {
  return !isNaN(num);
}