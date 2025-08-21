import { Component, OnInit, Input } from '@angular/core';
import { ColaboradorService } from 'src/app/services/administrativo/colaborador.service';
import { FuncionarioService } from 'src/app/services/rh/funcionarios.service';

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
    const admissoes = (obs.historicoAdmissoes || []).map((item: any) => ({
      ...item,
      tipo: 'ADMISSAO',
      dataHistorico: item.dataAdmissao,
    }));
    const demissoes = (obs.historicoDemissoes || []).map((item: any) => ({
      ...item,
      tipo: 'DEMISSAO',
      dataHistorico: item.dataDemissao,
    }));
    const renovacoes = (obs.historicoRenovacao || []).map((item: any) => ({
      ...item,
      tipo: 'RENOVACAO',
      dataHistorico: item.dataDoContrato,
    }));
    return [...admissoes, ...demissoes, ...renovacoes].sort(
      (a, b) =>
        this.parseDataBR(b.dataHistorico).getTime() -
        this.parseDataBR(a.dataHistorico).getTime()
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
}
