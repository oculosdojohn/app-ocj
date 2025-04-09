import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Departamento } from 'src/app/sistema/Administrativo/departamentos/departamento';

@Injectable({
  providedIn: 'root',
})
export class DepartamentoService {
  apiURL: string = environment.apiURLBase + '/api/departamento';

  constructor(private http: HttpClient) {}
}
