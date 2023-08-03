import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms'

export class CustomValidators {
  constructor() {}

  static mustMatch(
    controlName: string,
    matchingControlName: string,
  ): ValidatorFn {
    return (formGroup: FormGroup): ValidationErrors | null => {
      const control = formGroup.controls[controlName]
      const matchingControl = formGroup.controls[matchingControlName]

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true })
      } else {
        matchingControl.setErrors(null)
      }
      return null
    }
  }
}
