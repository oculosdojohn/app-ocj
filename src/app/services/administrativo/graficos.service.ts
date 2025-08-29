import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GraficosService {
  private apiURL = `${environment.apiURLBase}/api/graficos`;

  constructor(private http: HttpClient) {}

  getColaboradoresPorLoja(): Observable<Record<string, number>> {
    return this.http
      .get<Record<string, number>>(`${this.apiURL}/colaboradores-por-loja`)
      .pipe(
        map((response) => response),
        catchError(this.handleError('colaboradores por loja'))
      );
  }

  getColaboradoresPorEscolaridade(): Observable<Record<string, number>> {
    return this.http
      .get<Record<string, number>>(
        `${this.apiURL}/colaboradores-por-escolaridade`
      )
      .pipe(
        map((response) => response),
        catchError(this.handleError('colaboradores por escolaridade'))
      );
  }

  getColaboradoresPorGenero(): Observable<Record<string, number>> {
    return this.http
      .get<Record<string, number>>(`${this.apiURL}/colaboradores-por-genero`)
      .pipe(
        map((response) => response),
        catchError(this.handleError('colaboradores por gênero'))
      );
  }

  getOrcamentoPorDepartamento(): Observable<
    { departamento: { nome: string }; orcamentoMensal: number }[]
  > {
    return this.http
      .get<{ departamento: { nome: string }; orcamentoMensal: number }[]>(
        `${this.apiURL}/orcamento-por-departamento`
      )
      .pipe(
        map((response) => response),
        catchError(this.handleError('orçamento por departamento'))
      );
  }

  getTotalColaboradores(): Observable<number> {
    return this.http.get<number>(`${this.apiURL}/total-colaboradores`).pipe(
      map((response) => response),
      catchError(this.handleError('total de colaboradores'))
    );
  }

  getTotalLojas(): Observable<number> {
    return this.http.get<number>(`${this.apiURL}/total-lojas`).pipe(
      map((response) => response),
      catchError(this.handleError('total de lojas'))
    );
  }

  getTotalGestores(): Observable<number> {
    return this.http.get<number>(`${this.apiURL}/total-gestores`).pipe(
      map((response) => response),
      catchError(this.handleError('total de gestores'))
    );
  }

  private handleError(contexto: string) {
    return (error: HttpErrorResponse) => {
      let errorMessage = `Erro ao buscar dados de ${contexto}.`;

      if (error.error instanceof ErrorEvent) {
        errorMessage = `Erro: ${error.error.message}`;
      } else if (error.status) {
        errorMessage = `Erro no servidor: ${error.status} - ${error.message}`;
      }

      console.error(`[GraficosService] ${errorMessage}`);
      return throwError(() => new Error(errorMessage));
    };
  }

  getFuncionariosPorFaixaEtaria(): Observable<
    { faixaEtaria: string; quantidade: number }[]
  > {
    return this.http
      .get<{ faixaEtaria: string; quantidade: number }[]>(
        `${this.apiURL}/funcionarios/faixa-etaria`
      )
      .pipe(
        map((response) => response),
        catchError(this.handleError('funcionários por faixa etária'))
      );
  }

  getFuncionariosPorCargo(): Observable<
    { cargo: string; quantidade: number }[]
  > {
    return this.http
      .get<{ cargo: string; quantidade: number }[]>(
        `${this.apiURL}/funcionarios/qtd-por-cargo`
      )
      .pipe(
        map((response) => response),
        catchError(this.handleError('funcionários por cargo'))
      );
  }

  getFuncionariosPorTempoEmpresa(): Observable<
    { tempoDeEmpresa: string; quantidade: number }[]
  > {
    return this.http
      .get<{ tempoDeEmpresa: string; quantidade: number }[]>(
        `${this.apiURL}/funcionarios/tempo-empresa`
      )
      .pipe(
        map((response) => response),
        catchError(this.handleError('funcionários por tempo de empresa'))
      );
  }

  getFuncionariosPorEstadoCivil(): Observable<
    { estadoCivil: string; quantidade: number }[]
  > {
    return this.http
      .get<{ estadoCivil: string; quantidade: number }[]>(
        `${this.apiURL}/funcionarios/estado-civil`
      )
      .pipe(
        map((response) => response),
        catchError(this.handleError('funcionários por estado civil'))
      );
  }

  getFuncionariosPorEtnia(): Observable<
    { etnia: string; quantidade: number }[]
  > {
    return this.http
      .get<{ etnia: string; quantidade: number }[]>(
        `${this.apiURL}/funcionarios/etnia`
      )
      .pipe(
        map((response) => response),
        catchError(this.handleError('funcionários por etnia'))
      );
  }

  getFuncionariosPorStatusExperiencia(): Observable<
    { status: string; quantidade: number }[]
  > {
    return this.http
      .get<{ status: string; quantidade: number }[]>(
        `${this.apiURL}/funcionarios/experiencia-status`
      )
      .pipe(
        map((response) => response),
        catchError(this.handleError('funcionários por status de experiência'))
      );
  }

  getDemissoesPorMes(): Observable<
    { mes: number; nomeMes: string; quantidade: number }[]
  > {
    return this.http
      .get<{ mes: number; nomeMes: string; quantidade: number }[]>(
        `${this.apiURL}/demissoes/por-mes`
      )
      .pipe(
        map((response) => response),
        catchError(this.handleError('demissões por mês'))
      );
  }

  getAdmissoesPorMes(): Observable<
    { mes: number; nomeMes: string; quantidade: number }[]
  > {
    return this.http
      .get<{ mes: number; nomeMes: string; quantidade: number }[]>(
        `${this.apiURL}/admissoes/por-mes`
      )
      .pipe(
        map((response) => response),
        catchError(this.handleError('admissões por mês'))
      );
  }
}
