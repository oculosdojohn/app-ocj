import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Medicina } from 'src/app/sistema/RH/medicina/medicina';

@Injectable({
  providedIn: 'root',
})
export class MedicinaService {
  apiURL: string = environment.apiURLBase + '/api/medicina';

  constructor(private http: HttpClient) {}

  cadastrarProcedimentoMedico(medicina: Medicina): Observable<Medicina> {
    console.log('Dados enviados para o backend:', medicina);
    return this.http.post<Medicina>(this.apiURL, medicina).pipe(
      map((response) => response),
      catchError((error) => {
        let errorMessage = 'Erro ao salvar o procedimento médico.';

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

  atualizarProcedimentoMedico(
    id: string,
    medicina: Medicina
  ): Observable<Medicina> {
    const url = `${this.apiURL}/${id}`;
    return this.http.put<Medicina>(url, medicina).pipe(
      map((response) => response),
      catchError((error) => {
        let errorMessage = 'Erro ao atualizar o procedimento médico.';

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
