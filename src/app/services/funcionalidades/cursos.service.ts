import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Aula } from 'src/app/sistema/Servicos/cursos/aulas';

export interface AvaliacaoAulaRequest {
  estrelas: number;
  comentario?: string;
}

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  apiURL: string = environment.apiURLBase + '/api/aula';

  constructor(private http: HttpClient) {}

  cadastrarAula(formData: FormData): Observable<any> {
    return this.http.post<any>(this.apiURL, formData).pipe(
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

  obterAulasPorModulo(moduloAula: string): Observable<Aula[]> {
    const url = `${this.apiURL}/modulo/${moduloAula}`;
    return this.http.get<Aula[]>(url).pipe(
      map((response) => response),
      catchError((error) => {
        let errorMessage = 'Erro ao obter as aulas.';

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

  obterAulaPorId(id: string): Observable<Aula> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<Aula>(url).pipe(
      map((response) => response),
      catchError((error) => {
        let errorMessage = 'Erro ao obter a aula.';

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

  atualizarAula(id: string, formData: FormData): Observable<any> {
    const url = `${this.apiURL}/${id}`;
    return this.http.put<any>(url, formData).pipe(
      map((response) => response),
      catchError((error) => {
        let errorMessage = 'Erro ao atualizar a aula.';

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

  deletarAula(id: string): Observable<any> {
    const url = `${this.apiURL}/${id}`;
    return this.http.delete<any>(url).pipe(
      map((response) => response),
      catchError((error) => {
        let errorMessage = 'Erro ao deletar a aula.';

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

  aulaVisualizada(aulaId: number, moduloAula: string): Observable<any> {
    const url = `${this.apiURL}/${aulaId}/modulo/${moduloAula}`;
    return this.http.put<any>(url, {}).pipe(
      map((response) => response),
      catchError((error) => {
        let errorMessage = 'Erro ao visualizar a aula.';
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

  avaliarAula(
    aulaId: number,
    avaliacao: AvaliacaoAulaRequest
  ): Observable<any> {
    const url = `${this.apiURL}/${aulaId}/avaliacao`;
    return this.http.post<any>(url, avaliacao).pipe(
      map((response) => response),
      catchError((error) => {
        let errorMessage = 'Erro ao avaliar a aula.';

        if (error.error instanceof ErrorEvent) {
          errorMessage = `Erro: ${error.error.message}`;
        } else if (error.status) {
          errorMessage = `Erro no servidor: ${error.status} - ${error.message}`;
        } else if (error.error?.message) {
          errorMessage = error.error.message;
        }
        console.error(errorMessage);
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
