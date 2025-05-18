import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Colaborador } from 'src/app/sistema/Administrativo/funcionarios/colaborador';

@Injectable({
  providedIn: 'root',
})
export class ColaboradorService {
  apiURL: string = environment.apiURLBase + '/api/usuarios';

  constructor(private http: HttpClient) {}

  cadastrarColaborador(formData: FormData): Observable<any> {
    console.log('Dados enviados para o backend:');
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });

    return this.http.post<any>(this.apiURL, formData).pipe(
      map((response) => response),
      catchError((error: HttpErrorResponse) => {
        console.error('Erro bruto recebido do servidor:', error);

        let errorMessage = 'Erro ao salvar o usuário.';

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

  getColaboradores(): Observable<Colaborador[]> {
    return this.http.get<Colaborador[]>(this.apiURL).pipe(
      map((response) => response),
      catchError((error) => {
        let errorMessage = 'Erro ao buscar as usuário.';

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

  getColaboradorById(id: number): Observable<Colaborador> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<Colaborador>(url).pipe(
      map((response) => response),
      catchError((error) => {
        let errorMessage = 'Erro ao buscar a usuário.';

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

  deleteColaboradorById(id: string): Observable<void> {
    const url = `${this.apiURL}/${id}`;
    return this.http.delete<void>(url).pipe(
      catchError((error) => {
        let errorMessage = 'Erro ao deletar a usuário.';

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

  getUsuariosPorCargo(cargos: string[]): Observable<Colaborador[]> {
    const url = `${this.apiURL}/cargos/in`;
    const params = { cargo: cargos };

    return this.http.get<Colaborador[]>(url, { params }).pipe(
      map((response) => response),
      catchError((error) => {
        let errorMessage = 'Erro ao buscar os usuários por cargos.';

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

  atualizarColaborador(id: number, formData: FormData): Observable<any> {
    const url = `${this.apiURL}/${id}`;
    console.log('Dados enviados para o backend (editar):');
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });

    return this.http.put<any>(url, formData).pipe(
      map((response) => response),
      catchError((error: HttpErrorResponse) => {
        console.error('Erro bruto recebido do servidor:', error);

        let errorMessage = 'Erro ao atualizar o usuário.';

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

  atualizarPerfilUsuario(id: number, formData: FormData): Observable<any> {
    const url = `${this.apiURL}/perfil/${id}`;
    console.log('Dados enviados para o backend (atualizar perfil):');
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });

    return this.http.put<any>(url, formData).pipe(
      map((response) => response),
      catchError((error: HttpErrorResponse) => {
        console.error('Erro bruto recebido do servidor:', error);

        let errorMessage = 'Erro ao atualizar o perfil do usuário.';

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

  getUsuarioPorToken(): Observable<Colaborador> {
    const url = `${this.apiURL}/token`;
    return this.http.get<Colaborador>(url).pipe(
      map((response) => response),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Erro ao buscar o usuário pelo token.';

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
