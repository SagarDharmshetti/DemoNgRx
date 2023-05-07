import { AbstractControl, ValidationErrors } from "@angular/forms";

export function passwordMissMatch(password:string, confirmPassword:string){

    return function(form: AbstractControl){
        const passwordValue = form.get('password')?.value
        const confirmPasswordValue = form.get('confirmPassword')?.value

        if(passwordValue === confirmPasswordValue){
            return null;
        }
        return {passwordMissMatchError: true}
    }
}

