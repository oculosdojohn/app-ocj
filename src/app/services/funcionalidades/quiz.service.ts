import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Quiz } from 'src/app/sistema/Servicos/cursos/quiz';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  apiURL: string = environment.apiURLBase + '/api/quizz';

  constructor(private http: HttpClient) {}

  cadastrarQuiz(quiz: Quiz): Observable<Quiz> {
    console.log('Dados enviados para o backend:', quiz);
    return this.http.post<Quiz>(this.apiURL, quiz).pipe(
      map((response) => response),
      catchError((error) => {
        let errorMessage = 'Erro ao salvar o quiz.';

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

  getQuizById(id: number): Observable<Quiz> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<Quiz>(url).pipe(
      map((response) => response),
      catchError((error) => {
        let errorMessage = 'Erro ao buscar o quiz.';

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

  atualizarQuiz(id: string, quiz: Quiz): Observable<Quiz> {
    const url = `${this.apiURL}/${id}`;
    return this.http.put<Quiz>(url, quiz).pipe(
      map((response) => response),
      catchError((error) => {
        let errorMessage = 'Erro ao atualizar o quiz.';

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

  deleteQuizById(id: string): Observable<void> {
    const url = `${this.apiURL}/${id}`;
    return this.http.delete<void>(url).pipe(
      catchError((error) => {
        let errorMessage = 'Erro ao deletar o quiz.';

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

  obterQuizPorModulo(modulo: string): Observable<Quiz[]> {
    const url = `${this.apiURL}/modulo/${modulo}`;
    return this.http.get<Quiz[]>(url).pipe(
      map((response) => response),
      catchError((error) => {
        let errorMessage = 'Erro ao obter os quizzes.';

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
