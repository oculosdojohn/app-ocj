import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GraficosService {
  private apiURL = `${environment.apiURLBase}/api/graficos`;

  constructor(private http: HttpClient) {}

  getColaboradoresPorLoja(): Observable<Record<string, number>> {
    return this.http.get<Record<string, number>>(`${this.apiURL}/colaboradores-por-loja`).pipe(
      map((response) => response),
      catchError(this.handleError('colaboradores por loja'))
    );
  }

  getColaboradoresPorEscolaridade(): Observable<Record<string, number>> {
    return this.http.get<Record<string, number>>(`${this.apiURL}/colaboradores-por-escolaridade`).pipe(
      map((response) => response),
      catchError(this.handleError('colaboradores por escolaridade'))
    );
  }

  getColaboradoresPorGenero(): Observable<Record<string, number>> {
    return this.http.get<Record<string, number>>(`${this.apiURL}/colaboradores-por-genero`).pipe(
      map((response) => response),
      catchError(this.handleError('colaboradores por gênero'))
    );
  }

  private handleError(contexto: string) {
    return (error: HttpErrorResponse) => {
      let errorMessage = `Erro ao buscar dados de ${contexto}.`;

      if (error.error instanceof ErrorEvent) {
        errorMessage = `Erro: ${error.error.message}`;
      } else if (error.status) {
        errorMessage = `Erro no servidor: ${error.status} - ${error.message}`;
      }

      console.error(`[GraficosService] ${errorMessage}`);
      return throwError(() => new Error(errorMessage));
    };
  }
}
