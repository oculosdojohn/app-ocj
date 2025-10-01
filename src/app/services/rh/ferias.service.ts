import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Ferias } from 'src/app/sistema/RH/ferias/ferias';

@Injectable({
  providedIn: 'root',
})
export class FeriasService {
  apiURL: string = environment.apiURLBase + '/api/ferias';

  constructor(private http: HttpClient) {}

  cadastrarFerias(ferias: Ferias): Observable<Ferias> {
    return this.http.post<Ferias>(this.apiURL, ferias).pipe(
      map((response) => response),
      catchError((error) => {
        let errorMessage = 'Erro ao salvar as férias.';
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

  atualizarFerias(id: string, ferias: Ferias): Observable<Ferias> {
    const url = `${this.apiURL}/${id}`;
    return this.http.put<Ferias>(url, ferias).pipe(
      map((response) => response),
      catchError((error) => {
        let errorMessage = 'Erro ao atualizar as férias.';
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

  listarFerias(): Observable<Ferias[]> {
    return this.http.get<Ferias[]>(this.apiURL).pipe(
      map((response) => response),
      catchError((error) => {
        let errorMessage = 'Erro ao listar as férias.';
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

  buscarFeriasPorId(id: string | number): Observable<Ferias> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<Ferias>(url).pipe(
      map((response) => response),
      catchError((error) => {
        let errorMessage = 'Erro ao buscar as férias.';
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

  deletarFerias(id: string | number): Observable<void> {
    const url = `${this.apiURL}/${id}`;
    return this.http.delete<void>(url).pipe(
      catchError((error) => {
        let errorMessage = 'Erro ao deletar as férias.';
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

  listarFeriasPorDataCadastro(
    dataInicio: string,
    dataFim: string
  ): Observable<Ferias[]> {
    const url = `${this.apiURL}/cadastro?dataInicio=${encodeURIComponent(
      dataInicio
    )}&dataFim=${encodeURIComponent(dataFim)}`;
    return this.http.get<Ferias[]>(url).pipe(
      map((response) => response),
      catchError((error) => {
        let errorMessage = 'Erro ao listar as férias por data de cadastro.';
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

  listarFeriasPorColaborador(id: string | number): Observable<Ferias[]> {
    const url = `${this.apiURL}/usuario/${id}`;
    return this.http.get<Ferias[]>(url).pipe(
      map((response) => response),
      catchError((error) => {
        let errorMessage = 'Erro ao listar férias por ID do colaborador.';
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

  buscarFeriasPorNome(nome: string): Observable<Ferias[]> {
    const url = `${this.apiURL}/busca/nome`;
    const body = { nome: nome };
    return this.http.post<Ferias[]>(url, body).pipe(
      map((response) => response),
      catchError((error) => {
        let errorMessage = 'Erro ao buscar férias por nome do colaborador.';
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
