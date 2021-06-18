import { FormControl } from "@angular/forms";

export function matchOtherValidator(otherControlName: string,otherControlName1: string) {

    let thisControl: FormControl;
    let otherControl: FormControl;
    let otherControl1: FormControl;
    return function matchOtherValidate(control: FormControl) {
  
      if (!control.parent) {
        return null;
      }
  
      // Initializing the validator.
      if (!thisControl) {
        thisControl = control;
        otherControl = control.parent.get(otherControlName) as FormControl;
        if (!otherControl) {
          throw new Error('matchOtherValidator(): other control is not found in parent group');
        }
        otherControl.valueChanges.subscribe(() => {
          thisControl.updateValueAndValidity();
        });

        otherControl1 = control.parent.get(otherControlName1) as FormControl;
        if (!otherControl1) {
          throw new Error('matchOtherValidator(): other control is not found in parent group');
        }
        otherControl1.valueChanges.subscribe(() => {
          otherControl1.updateValueAndValidity();
        });
      }

     
  
      if (!otherControl) {
        return null;
      }

      if (!otherControl1) {
        return null;
      }
  
      if (Number.parseInt(otherControl.value)>=Number.parseInt(thisControl.value) || Number.parseInt(otherControl1.value)>=Number.parseInt(thisControl.value)) {
        return {
          matchOther: true
        };
      }
  
      return null;
    }
}