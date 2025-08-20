import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Colaborador } from 'src/app/sistema/Administrativo/funcionarios/colaborador';
import { Demissao } from 'src/app/sistema/RH/demissoes/demissoes';
import { Admissao } from 'src/app/sistema/RH/admissoes/admissoes';

const valorInicial = 0;

@Injectable({
  providedIn: 'root',
})
export class FuncionarioService {
  apiURL: string = environment.apiURLBase + '/api/usuarios';

  constructor(private http: HttpClient) {}

  registrarAdmissao(id: number, dto: any): Observable<any> {
    const url = `${this.apiURL}/${id}/admissao`;
    return this.http.post<any>(url, dto).pipe(
      map((response) => response),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Erro ao registrar admissão.';
        if (error.error instanceof ErrorEvent) {
          errorMessage = `Erro: ${error.error.message}`;
        } else if (error.status) {
          errorMessage = `Erro no servidor: ${error.status} - ${error.message}`;
        }
        console.error(errorMessage);
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  registrarDemissao(id: number, dto: any): Observable<any> {
    const url = `${this.apiURL}/${id}/demissao`;
    return this.http.post<any>(url, dto).pipe(
      map((response) => response),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Erro ao registrar demissão.';
        if (error.error instanceof ErrorEvent) {
          errorMessage = `Erro: ${error.error.message}`;
        } else if (error.status) {
          errorMessage = `Erro no servidor: ${error.status} - ${error.message}`;
        }
        console.error(errorMessage);
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
