/* tslint:disable:no-unused-variable */

import { FormControl, Validators } from '@angular/forms';
import { FormFieldErrorPipe } from './form-field-error.pipe';

describe('Pipe: FormFieldErrore', () => {
  let pipe!: FormFieldErrorPipe;
  let formControl!: FormControl;

  beforeEach(() => {
    pipe = new FormFieldErrorPipe();
    formControl = new FormControl();
  })
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return "Campo Obrigatório" when formControl is empty', () => {
    formControl.addValidators(Validators.required);
    formControl.updateValueAndValidity();
    const expected = pipe.transform(formControl);
    expect(expected).toEqual('Campo obrigatório');
  });

  it('should return empty string when formControl is required and is filled in', () => {
    formControl.addValidators(Validators.required);
    formControl.updateValueAndValidity();
    formControl.setValue('ABC');
    const expected = pipe.transform(formControl);
    expect(expected).toBe('');
  });

  it('should return "Campo deve ter no mínimo 3 dígitos" when formControl value has a shorter length', () => {
    formControl.addValidators(Validators.minLength(3));
    formControl.updateValueAndValidity();
    formControl.setValue('A');
    const expected = pipe.transform(formControl);
    expect(expected).toEqual('Campo deve ter no mínimo 3 dígitos');
  });

  it('should return "Campo deve ter no máximo 5 dígitos" when formControl value has a greater length', () => {
    formControl.addValidators(Validators.maxLength(5));
    formControl.updateValueAndValidity();
    formControl.setValue('ABCDBE');
    const expected = pipe.transform(formControl, 5);
    expect(expected).toEqual('Campo deve ter no máximo 5 dígitos');
  });

  it('should return "E-mail inválido" when formControl has a incorrect e-mail', () => {
    formControl.addValidators(Validators.email);
    formControl.updateValueAndValidity();
    formControl.setValue('test@');
    const expected = pipe.transform(formControl);
    expect(expected).toEqual('E-mail inválido');
  });


  it('should return "Digite somente números" when formControl  has non numeric character', () => {
    formControl.addValidators(Validators.pattern(/^[0-9]\d*$/));
    formControl.updateValueAndValidity();
    formControl.setValue('123ABC');
    const expected = pipe.transform(formControl);
    expect(expected).toEqual('Digite somente números');
  });
});
