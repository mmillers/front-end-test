import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TViaCep } from '../../types/via-cep.type';

@Injectable({
  providedIn: 'root'
})
export class ViaCepService {
  constructor(private httpClient: HttpClient) {}

  getCep(cep: string): Promise<string> {
    return this.httpClient.get<Promise<TViaCep>>(`${environment.urlViaCep}/${cep}/json/`)
      .pipe(
        take(1),
        map((cepData: any) => cepData.logradouro)).toPromise();
  }

}
