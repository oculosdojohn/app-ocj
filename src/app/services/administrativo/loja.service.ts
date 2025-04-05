import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Loja } from 'src/app/sistema/Administrativo/lojas/loja';

@Injectable({
  providedIn: 'root'
})
export class LojaService {
  apiURL: string = environment.apiURLBase + '/api/loja';

  constructor(private http: HttpClient) { }

  cadastrarLoja(loja: Loja): Observable<Loja> {
    return this.http.post<Loja>(this.apiURL, loja).pipe(
      map((response) => response),
      catchError((error) => {
        let errorMessage = 'Erro ao salvar a loja.';

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
