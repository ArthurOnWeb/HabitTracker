import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export function requireCheckboxesToBeCheckedValidator(minRequired = 1): ValidatorFn {
  return function validate(formGroup: AbstractControl): ValidationErrors | null {
    let checked = 0;

    if (formGroup instanceof FormGroup) {
      Object.keys(formGroup.controls).forEach(key => {
        const control = formGroup.get(key);

        if (control && control.value === true) {
          checked++;
        }
      });

      if (checked < minRequired) {
        return {
          requireOneCheckboxToBeChecked: true,
        };
      }
    }

    return null;
  };
}
