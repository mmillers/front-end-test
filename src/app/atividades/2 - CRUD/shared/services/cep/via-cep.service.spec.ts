/* tslint:disable:no-unused-variable */

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ViaCepService } from './via-cep.service';

describe('Service: ViaCep', () => {
  let viaCepService: ViaCepService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [HttpClient],
    });
    viaCepService = TestBed.inject(ViaCepService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should create', () => {
    expect(viaCepService).toBeDefined();
  });

  it('should request info CEP', async () => {
    const cep = '12345678';
    const spy = spyOn(httpClient, 'get').and.returnValue(of({ logradouro: 'Test' }));
    await viaCepService.getCep(cep);
    expect(spy).toHaveBeenCalledWith(`${environment.urlViaCep}/${cep}/json/`);
  });
});
