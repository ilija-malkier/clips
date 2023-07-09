import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export class RegisterValidators {
  //abstractcontrol je roditelj FormControl i FormGroup
  //validation funkcije obicno vracaju samo funkciju jer FormGoup prima samo referencu na funkciju
  public static match(controlName:string,matchingControlName:string) : ValidatorFn{

    return (group: AbstractControl): ValidationErrors | null =>
    {
      const control = group.get(controlName);
      const matchingControl = group.get(matchingControlName);
      if (!control || !matchingControl) {
        return {controlNotFound: false};
      }
      const error = control.value === matchingControl.value ?
        null :
        {noMatch: true};

      matchingControl.setErrors(error);
      return error;
    }

  }
}
