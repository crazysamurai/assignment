import { FormGroup, ValidatorFn } from '@angular/forms';

export function ConfirmedValidator(
  controlName: string,
  matchingControlName: string
) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (
      matchingControl.errors &&
      !matchingControl.errors['confirmedValidator']
    ) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ ConfirmedValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}

// export function ChkBoxValidator(minRequired = 1): ValidatorFn {
//   return function validate(formGroup: FormGroup) {
//     let checked = 0;

//     Object.keys(formGroup.controls).forEach((key) => {
//       const control = formGroup.controls[key];

//       if (control.value === true) {
//         checked++;
//       }
//     });

//     if (checked < minRequired) {
//       return {
//         requireCheckboxesToBeChecked: true,
//       };
//     }

//     return null;
//   };
// }
