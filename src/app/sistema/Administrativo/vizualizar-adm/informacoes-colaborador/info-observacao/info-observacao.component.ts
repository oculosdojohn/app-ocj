import { Component, OnInit, Input } from '@angular/core';
import { ColaboradorService } from 'src/app/services/administrativo/colaborador.service';
import { FuncionarioService } from 'src/app/services/rh/funcionarios.service';
import { PeriodoExperienciaDescricoes } from '../../../funcionarios/enums/periodo-experiencia-descricoes';
import { PeriodoExperiencia } from '../../../funcionarios/enums/periodo-experiencia';
import { TipoDemissaoDescricoes } from 'src/app/sistema/RH/demissoes/enums/tipo-demissao-descricao';
import { TipoDemissao } from 'src/app/sistema/RH/demissoes/enums/tipo-demissao';

interface ObservacaoBase {
  tipo: 'ADMISSAO' | 'DEMISSAO' | 'RENOVACAO';
  [key: string]: any;
}

@Component({
  selector: 'app-info-observacao',
  templateUrl: './info-observacao.component.html',
  styleUrls: ['./info-observacao.component.css'],
})
export class InfoObservacaoComponent implements OnInit {
  @Input() colaboradorId!: number;

  observacoes: ObservacaoBase[] = [];
  isLoading = false;

  itensPorPagina = 6;
  paginaAtual = 1;
  totalPaginas = Math.ceil(this.observacoes.length / this.itensPorPagina);
  observacoesPaginadas: ObservacaoBase[] = [];

  constructor(
    private colaboradorService: ColaboradorService,
    private funcionarioService: FuncionarioService
  ) {}

  ngOnInit(): void {
    if (this.colaboradorId) {
      this.isLoading = true;
      this.funcionarioService
        .getObservacoesColaborador(this.colaboradorId)
        .subscribe({
          next: (obs: any) => {
            console.log('Observações recebidas:', obs);
            this.observacoes = this.processarObservacoes(obs);
            this.isLoading = false;
            this.atualizarPaginacao();
          },
          error: () => {
            this.observacoes = [];
            this.isLoading = false;
          },
        });
    }
  }

  processarObservacoes(obs: any): ObservacaoBase[] {
    function getDataHistorico(item: any, tipo: string): Date {
      if (item.dataDeCadastro && Array.isArray(item.dataDeCadastro)) {
        return new Date(
          item.dataDeCadastro[0], // ano
          item.dataDeCadastro[1] - 1, // mês
          item.dataDeCadastro[2], // dia
          item.dataDeCadastro[3] || 0, // hora
          item.dataDeCadastro[4] || 0, // min
          item.dataDeCadastro[5] || 0, // seg
          item.dataDeCadastro[6] || 0 // ms
        );
      }
      let dataStr = '';
      if (tipo === 'ADMISSAO') dataStr = item.dataAdmissao;
      if (tipo === 'DEMISSAO') dataStr = item.dataDemissao;
      if (tipo === 'RENOVACAO') dataStr = item.dataDoContrato;
      if (dataStr) {
        const [dia, mes, ano] = dataStr.split('/');
        return new Date(+ano, +mes - 1, +dia);
      }
      return new Date(0);
    }

    const admissoes = (obs.historicoAdmissoes || []).map((item: any) => ({
      ...item,
      tipo: 'ADMISSAO',
      dataHistorico: getDataHistorico(item, 'ADMISSAO'),
    }));
    const demissoes = (obs.historicoDemissoes || []).map((item: any) => ({
      ...item,
      tipo: 'DEMISSAO',
      dataHistorico: getDataHistorico(item, 'DEMISSAO'),
    }));
    const renovacoes = (obs.historicoRenovacao || []).map((item: any) => ({
      ...item,
      tipo: 'RENOVACAO',
      dataHistorico: getDataHistorico(item, 'RENOVACAO'),
    }));

    return [...admissoes, ...demissoes, ...renovacoes].sort(
      (a, b) => b.dataHistorico.getTime() - a.dataHistorico.getTime()
    );
  }

  parseDataBR(data: string): Date {
    if (!data) return new Date(0);
    const [dia, mes, ano] = data.split('/');
    return new Date(+ano, +mes - 1, +dia);
  }

  atualizarPaginacao(): void {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    this.observacoesPaginadas = this.observacoes.slice(inicio, fim);
  }

  get totalItens() {
    return this.observacoes.length;
  }

  onPaginaMudou(novaPagina: number) {
    this.paginaAtual = novaPagina;
    this.atualizarPaginacao();
  }

  getDescricaoTipoDemissao(tipo: string): string {
    return (
      TipoDemissaoDescricoes[tipo as keyof typeof TipoDemissaoDescricoes] ||
      tipo ||
      '-'
    );
  }

  getDescricaoPeriodoExperiencia(periodo: string): string {
    return (
      PeriodoExperienciaDescricoes[
        periodo as keyof typeof PeriodoExperienciaDescricoes
      ] ||
      periodo ||
      '-'
    );
  }

  getAutorNome(autor: any): string {
    if (!autor) return '-';
    return autor.username || '-';
  }
}
