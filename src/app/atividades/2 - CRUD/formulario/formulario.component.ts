import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';
import { Pessoa } from '../classes/pessoa.class';
import { ViaCepService } from '../shared/services/cep/via-cep.service';
import { NotificationService } from '../shared/services/notification/notification.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();

  constructor(
    public dialogRef: MatDialogRef<FormularioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Pessoa,
    private viaCepService: ViaCepService,
    private notificationService: NotificationService) {}

  form = new FormGroup({
    nome: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    senha: new FormControl(null, [Validators.required]),
    cep: new FormControl(null, [Validators.required, Validators.maxLength(8), Validators.pattern(/^[0-9]\d*$/)]),
    logradouro: new FormControl({ value: null, disabled: true }, [Validators.required]),
  });

  ngOnInit(): void {
    this.watchCepFormControl();
    this.patchValuesIsEdit();
  }

  private patchValuesIsEdit(): void {
    if (this.data) {
      this.form.patchValue(this.data, { emitEvent: false, onlySelf: true });
    }
  }

  private watchCepFormControl(): void {
    this.form.controls.cep.valueChanges.pipe(
      filter((value: string) => !!(value && value.length === 8)),
      distinctUntilChanged(),
      debounceTime(500),
      takeUntil(this.unsubscribe$),
    ).subscribe(async (cep: string) => {
      const logradouro = await this.viaCepService.getCep(cep);
      this.form.controls.logradouro.setValue(logradouro);
    });
  }

  onSubmit(): void {
    if (this.validateForm()) {
      this.dialogRef.close(this.form.getRawValue());
    }
  }

  private validateForm(): boolean {
    if (!this.form.valid) {
      this.notificationService.showNotification('Formulário Inválido');
      return false;
    }
    return true;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }
}
