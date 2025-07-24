import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Noticia } from 'src/app/sistema/Servicos/forum-noticias/noticia';

@Injectable({
  providedIn: 'root',
})
export class NoticiasService {
  apiURL: string = environment.apiURLBase + '/api/noticias';

  constructor(private http: HttpClient) {}

  cadastrarNoticia(formData: FormData): Observable<any> {
    console.log('Dados enviados para o backend:');
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });

    return this.http.post<any>(this.apiURL, formData).pipe(
      map((response) => response),
      catchError((error: HttpErrorResponse) => {
        console.error('Erro bruto recebido do servidor:', error);

        let errorMessage = 'Erro ao salvar a notícia.';

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

  getNoticias(): Observable<Noticia[]> {
    return this.http.get<Noticia[]>(this.apiURL).pipe(
      map((response) => response),
      catchError((error) => {
        let errorMessage = 'Erro ao buscar as notícias.';

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

  getNoticiaById(id: number): Observable<Noticia> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<Noticia>(url).pipe(
      map((response) => response),
      catchError((error) => {
        let errorMessage = 'Erro ao buscar a notícia.';

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

  editarNoticia(id: number, formData: FormData): Observable<any> {
    console.log('Dados enviados para edição da notícia:');
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

  deleteNoticiaById(id: string): Observable<void> {
    const url = `${this.apiURL}/${id}`;
    return this.http.delete<void>(url).pipe(
      catchError((error) => {
        let errorMessage = 'Erro ao deletar a notícia.';

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

  getNoticiasFiltradas(
    lojasIds: number[] = [],
    offset?: number,
    pageNumber?: number,
    pageSize?: number,
    paged?: boolean,
    sortSorted?: boolean,
    sortUnsorted?: boolean,
    unpaged?: boolean
  ): Observable<Noticia[]> {
    let params = new HttpParams();

    lojasIds.forEach((id) => {
      params = params.append('loja_id', id.toString());
    });

    if (offset !== undefined) params = params.set('offset', offset.toString());
    if (pageNumber !== undefined)
      params = params.set('pageNumber', pageNumber.toString());
    if (pageSize !== undefined)
      params = params.set('pageSize', pageSize.toString());
    if (paged !== undefined) params = params.set('paged', paged.toString());
    if (sortSorted !== undefined)
      params = params.set('sort.sorted', sortSorted.toString());
    if (sortUnsorted !== undefined)
      params = params.set('sort.unsorted', sortUnsorted.toString());
    if (unpaged !== undefined)
      params = params.set('unpaged', unpaged.toString());

    const url = `${this.apiURL}/filtro`;

    return this.http.get<Noticia[]>(url, { params }).pipe(
      map((response) => response),
      catchError((error) => {
        let errorMessage = 'Erro ao buscar as notícias filtradas.';
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
