import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from "@angular/material/dialog";
import { MatTable } from '@angular/material/table';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, take, takeUntil } from 'rxjs/operators';
import { Pessoa } from './classes/pessoa.class';
import { FormularioComponent } from './formulario/formulario.component';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit, OnDestroy {
  constructor(private dialog: MatDialog) {}

  private unsubscribe$ = new Subject();
  @ViewChild(MatTable, { static: false }) table!: MatTable<Pessoa>;
  filtro = new FormControl();
  displayedColumns: string[] = ['actions', 'nome', 'email', 'cep', 'logradouro'];
  dataSource = [
    { nome: "Teste1", email: "teste@email1.com", senha: "1234", cep: "80250104", logradouro: "Rua teste" },
  ];
  private dataSourceAux = this.dataSource;

  ngOnInit(): void {
    this.filtro.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(500),
      takeUntil(this.unsubscribe$),
    ).subscribe((value: string) => {
      this.dataSource = this.dataSourceAux;
      this.filtrar(value);
    })
  }

  filtrar(arg: string) {
    console.log("filtrando..."); //não remover essa linha
    const filterResult = this.dataSource.reduce((result: Pessoa[], data: Pessoa) => {
      if (this.filterByFields(data, arg)) {
        result.push(data);
      }
      return result;
    }, []);
    this.dataSource = [...filterResult];
  }

  private filterByFields(data: Pessoa, arg: string): boolean {
    return (data.email.includes(arg) ||
      data.cep.includes(arg) ||
      data.nome.includes(arg));
  }

  adicionar() {
    const dialogRef = this.dialog.open(FormularioComponent);
    dialogRef.afterClosed()
      .pipe(take(1))
      .subscribe(
        (formValues: Pessoa) => {
          if (formValues) {
            this.dataSource = [...this.dataSource, formValues];
            this.dataSourceAux = this.dataSource;
          }
        });
  }

  editar(pessoa: Pessoa) {
    const indexOf = this.dataSource.indexOf(pessoa);
    const dialogRef = this.dialog.open(FormularioComponent, {
      data: {
        ...pessoa,
      }
    });
    dialogRef.afterClosed()
      .pipe(take(1))
      .subscribe(
        (formValues: Pessoa | null) => {
          if (formValues) {
            this.dataSource[indexOf] = formValues;
            this.dataSourceAux = this.dataSource;
            this.table.renderRows();
          }
        }
      );
  }

  remover(pessoa: Pessoa) {
    if (!confirm(`Deseja remover a pessoa ${pessoa.nome}`)) return;
    const indexOf = this.dataSource.indexOf(pessoa);
    this.dataSource.splice(indexOf, 1);
    this.dataSourceAux = this.dataSource;
    this.table.renderRows();
    alert("removido com sucesso!");
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }
}


