import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Produto } from 'src/app/sistema/Servicos/lojinha/produto';

@Injectable({
  providedIn: 'root',
})
export class LojinhaService {
  apiURL: string = environment.apiURLBase + '/api/lojinha';

  constructor(private http: HttpClient) {}

  cadastrarProduto(formData: FormData): Observable<any> {
    console.log('Dados enviados para o backend:');
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });

    return this.http.post<any>(this.apiURL, formData).pipe(
      map((response) => response),
      catchError((error: HttpErrorResponse) => {
        console.error('Erro bruto recebido do servidor:', error);

        let errorMessage = 'Erro ao salvar o produto.';

        if (error.error instanceof ErrorEvent) {
          errorMessage = `Erro: ${error.error.message}`;
        } else {
          if (typeof error.error === 'string') {
            errorMessage = error.error;
          } else if (error.error?.message) {
            errorMessage = error.error.message;
          } else if (error.error?.errors) {
            const firstErrorKey = Object.keys(error.error.errors)[0];
            errorMessage = error.error.errors[firstErrorKey];
          }
        }

        console.error('Mensagem de erro processada:', errorMessage);
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  getProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.apiURL).pipe(
      map((response) => response),
      catchError((error) => {
        let errorMessage = 'Erro ao buscar os produtos.';

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

  editarProduto(id: number, formData: FormData): Observable<any> {
    console.log('Dados enviados para edição do produto:');
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });

    const url = `${this.apiURL}/${id}`;

    return this.http.put<any>(url, formData).pipe(
      map((response) => response),
      catchError((error: HttpErrorResponse) => {
        console.error('Erro bruto recebido do servidor:', error);

        let errorMessage = 'Erro ao editar o produto.';

        if (error.error instanceof ErrorEvent) {
          errorMessage = `Erro: ${error.error.message}`;
        } else {
          if (typeof error.error === 'string') {
            errorMessage = error.error;
          } else if (error.error?.message) {
            errorMessage = error.error.message;
          } else if (error.error?.errors) {
            const firstErrorKey = Object.keys(error.error.errors)[0];
            errorMessage = error.error.errors[firstErrorKey];
          }
        }

        console.error('Mensagem de erro processada:', errorMessage);
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  deleteProdutoById(id: string): Observable<void> {
    const url = `${this.apiURL}/${id}`;
    return this.http.delete<void>(url).pipe(
      catchError((error) => {
        let errorMessage = 'Erro ao deletar a produto.';

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

  getProdutoComHistorico(id: number): Observable<any> {
    const url = `${this.apiURL}/produto/${id}/historico`;
    return this.http.get<any>(url).pipe(
      map((response) => response),
      catchError((error) => {
        let errorMessage = 'Erro ao buscar o produto com histórico.';

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

  resgatarProduto(produtoId: number): Observable<any> {
    const url = `${this.apiURL}/produto/${produtoId}/resgate`;
    return this.http.post<any>(url, {}).pipe(
      map((response) => response),
      catchError((error) => {
        let errorMessage = 'Erro ao resgatar o produto.';
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

  marcarEntrega(id: number, confirmacao: boolean): Observable<string> {
    const url = `${this.apiURL}/resgate/${id}`;

    return this.http.put<{ dataEntrega: string }>(url, confirmacao).pipe(
      map((response) => response.dataEntrega),
      catchError((error) => {
        let errorMessage = 'Erro ao marcar como entregue.';
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
