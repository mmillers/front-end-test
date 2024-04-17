import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'formFieldError',
  pure: false,
})
export class FormFieldErrorPipe implements PipeTransform {

  transform(control: AbstractControl, maxLength = 0): string {
    return this.validateControl(control.errors, maxLength);
  }

  private validateControl(errors: ValidationErrors | null, maxLength: number): string {
    if (!errors) return '';
    return errors['required'] ?
      'Campo obrigatório' :
      errors['minlength'] ?
        'Campo deve ter no mínimo 3 dígitos' :
        errors['maxlength'] ?
          `Campo deve ter no máximo ${maxLength} dígitos` :
          errors['email'] ?
            'E-mail inválido' :
            errors['pattern'] ?
              'Digite somente números' :
              '';
  }
}
