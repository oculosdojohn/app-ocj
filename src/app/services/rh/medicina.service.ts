import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Medicina } from 'src/app/sistema/RH/medicina/medicina';

@Injectable({
  providedIn: 'root',
})
export class MedicinaService {
  apiURL: string =
    environment.apiURLBase + '/api/usuarios/procedimentos-medicos';

  constructor(private http: HttpClient) {}

  cadastrarProcedimentoMedico(formData: FormData): Observable<any> {
    console.log('Dados enviados para o backend:');
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });
    return this.http.post<any>(this.apiURL, formData).pipe(
      map((response) => response),
      catchError((error) => {
        let errorMessage = 'Erro ao salvar o procedimento médico.';
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

  atualizarProcedimentoMedico(id: string, formData: FormData): Observable<any> {
    const url = `${this.apiURL}/${id}`;
    console.log('Dados enviados para o backend (editar):');
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });

    return this.http.put<any>(url, formData).pipe(
      map((response) => response),
      catchError((error) => {
        let errorMessage = 'Erro ao atualizar o procedimento médico.';
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

  listarProcedimentosMedicos(): Observable<Medicina[]> {
    return this.http.get<Medicina[]>(this.apiURL).pipe(
      map((response) => response),
      catchError((error) => {
        let errorMessage = 'Erro ao listar procedimentos médicos.';
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

  buscarProcedimentoMedicoPorId(id: string): Observable<Medicina> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<Medicina>(url).pipe(
      map((response) => response),
      catchError((error) => {
        let errorMessage = 'Erro ao buscar procedimento médico.';
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

  listarProcedimentosPorColaborador(
    usuarioId: string | number
  ): Observable<Medicina[]> {
    const url = `${this.apiURL}/colaboradores/${usuarioId}`;
    return this.http.get<Medicina[]>(url).pipe(
      map((response) => response),
      catchError((error) => {
        let errorMessage = 'Erro ao listar procedimentos do colaborador.';
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

  listarProcedimentosPorLoja(lojaId: string | number): Observable<Medicina[]> {
    const url = `${this.apiURL}/lojas/${lojaId}`;
    return this.http.get<Medicina[]>(url).pipe(
      map((response) => response),
      catchError((error) => {
        let errorMessage = 'Erro ao listar procedimentos da loja.';
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

  excluirProcedimentoMedico(id: string | number): Observable<void> {
    const url = `${this.apiURL}/${id}`;
    return this.http.delete<void>(url).pipe(
      catchError((error) => {
        let errorMessage = 'Erro ao excluir procedimento médico.';
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
