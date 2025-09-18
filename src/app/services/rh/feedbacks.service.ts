import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Feedback } from 'src/app/sistema/RH/feedbaks/feedback';

@Injectable({
  providedIn: 'root',
})
export class FeedbacksService {
  apiURL: string = environment.apiURLBase + '/api/feedback';

  constructor(private http: HttpClient) {}

  cadastrarFeedback(feedback: Feedback): Observable<Feedback> {
    return this.http.post<Feedback>(this.apiURL, feedback).pipe(
      map((response) => response),
      catchError((error) => {
        let errorMessage = 'Erro ao salvar o feedback.';
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

  atualizarFeedback(id: string, feedback: Feedback): Observable<Feedback> {
    const url = `${this.apiURL}/${id}`;
    return this.http.put<Feedback>(url, feedback).pipe(
      map((response) => response),
      catchError((error) => {
        let errorMessage = 'Erro ao atualizar o feedback.';
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

  listarFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(this.apiURL).pipe(
      map((response) => response),
      catchError((error) => {
        let errorMessage = 'Erro ao listar feedbacks.';
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

  buscarFeedbackPorId(id: string): Observable<Feedback> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<Feedback>(url).pipe(
      map((response) => response),
      catchError((error) => {
        let errorMessage = 'Erro ao buscar feedback.';
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

  listarFeedbacksPorColaborador(
    usuarioId: string | number
  ): Observable<Feedback[]> {
    const url = `${this.apiURL}/by-colaborador/${usuarioId}`;
    return this.http.get<Feedback[]>(url).pipe(
      map((response) => response),
      catchError((error) => {
        let errorMessage = 'Erro ao listar feedbacks do colaborador.';
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
