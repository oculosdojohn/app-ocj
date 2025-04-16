import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Colaborador } from 'src/app/sistema/Administrativo/funcionarios/colaborador';

@Injectable({
  providedIn: 'root',
})
export class ColaboradorService {
  apiURL: string = environment.apiURLBase + '/api/usuarios';

  constructor(private http: HttpClient) {}

  cadastrarColaborador(colaborador: Colaborador): Observable<Colaborador> {
    console.log('Dados enviados para o backend:', colaborador);
    return this.http.post<Colaborador>(this.apiURL, colaborador).pipe(
      map((response) => response),
      catchError((error) => {
        let errorMessage = 'Erro ao salvar o colaborador.';

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
