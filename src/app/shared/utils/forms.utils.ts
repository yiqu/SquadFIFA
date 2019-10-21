import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

export function createFormControl(value: any, disabled: boolean, 
  validators: any[] = null, asyncValids: any[] = null) {
    let fc = new FormControl({
      value: value,
      disabled: disabled
    }, validators, asyncValids);
    return fc;
}