import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Produto } from 'src/app/sistema/Servicos/lojinha/produto';

@Injectable({
  providedIn: 'root',
})
export class LojinhaService {
  apiURL: string = environment.apiURLBase + '/api/produto';

  constructor(private http: HttpClient) {}

  getProdutoById(id: number): Observable<Produto> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<Produto>(url).pipe(
      map((response) => response),
      catchError((error) => {
        let errorMessage = 'Erro ao buscar o produto.';

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
