import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Aula } from 'src/app/sistema/Servicos/cursos/aulas';

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  apiURL: string = environment.apiURLBase + '/api/aula';

  constructor(private http: HttpClient) {}

  cadastrarAula(aula: Aula): Observable<Aula> {
    return this.http.post<Aula>(this.apiURL, aula).pipe(
      map((response) => response),
      catchError((error) => {
        let errorMessage = 'Erro ao salvar a aula.';

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
