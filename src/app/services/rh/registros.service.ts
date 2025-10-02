import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Registro } from 'src/app/sistema/RH/registros/registro';

@Injectable({
  providedIn: 'root',
})
export class RegistrosService {
  apiURL: string = environment.apiURLBase + '/api/usuarios/registro';

  constructor(private http: HttpClient) {}

  cadastrarRegistro(dto: Registro): Observable<Registro> {
    return this.http.post<Registro>(this.apiURL, dto).pipe(
      map((response) => response),
      catchError((error) => {
        let errorMessage = 'Erro ao salvar o registro.';
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

  atualizarRegistro(id: string | number, dto: Registro): Observable<Registro> {
    const url = `${this.apiURL}/${id}`;
    return this.http.put<Registro>(url, dto).pipe(
      map((response) => response),
      catchError((error) => {
        let errorMessage = 'Erro ao atualizar o registro.';
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

  listarRegistros(): Observable<Registro[]> {
    const url = `${this.apiURL}/all`;
    return this.http.get<Registro[]>(url).pipe(
      map((response) => response),
      catchError((error) => {
        let errorMessage = 'Erro ao listar todos os registros.';
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

  buscarRegistroPorId(id: string | number): Observable<Registro> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<Registro>(url).pipe(
      map((response) => response),
      catchError((error) => {
        let errorMessage = 'Erro ao buscar o registro.';
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

  listarRegistrosPorColaborador(busca: string): Observable<Registro[]> {
    const url = `${this.apiURL}/colaborador?busca=${encodeURIComponent(busca)}`;
    return this.http.get<Registro[]>(url).pipe(
      map((response) => response),
      catchError((error) => {
        let errorMessage = 'Erro ao listar registros por colaborador.';
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

  deletarRegistro(id: string | number): Observable<void> {
    const url = `${this.apiURL}/${id}`;
    return this.http.delete<void>(url).pipe(
      catchError((error) => {
        let errorMessage = 'Erro ao deletar o registro.';
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

  listarRegistrosPorUsuarioId(id: string | number): Observable<Registro[]> {
    const url = `${environment.apiURLBase}/api/usuarios/${id}/registro`;
    return this.http.get<Registro[]>(url).pipe(
      map((response) => response),
      catchError((error) => {
        let errorMessage = 'Erro ao listar registros por ID do usuário.';
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
