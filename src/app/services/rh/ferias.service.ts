import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Ferias } from 'src/app/sistema/RH/ferias/ferias';

@Injectable({
  providedIn: 'root',
})
export class FeriasService {
  apiURL: string = environment.apiURLBase + '/api/ferias';

  constructor(private http: HttpClient) {}

  cadastrarFerias(ferias: Ferias): Observable<Ferias> {
    return this.http.post<Ferias>(this.apiURL, ferias).pipe(
      map((response) => response),
      catchError((error) => {
        let errorMessage = 'Erro ao salvar as férias.';
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

  atualizarFerias(id: string, ferias: Ferias): Observable<Ferias> {
    const url = `${this.apiURL}/${id}`;
    return this.http.put<Ferias>(url, ferias).pipe(
      map((response) => response),
      catchError((error) => {
        let errorMessage = 'Erro ao atualizar as férias.';
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
