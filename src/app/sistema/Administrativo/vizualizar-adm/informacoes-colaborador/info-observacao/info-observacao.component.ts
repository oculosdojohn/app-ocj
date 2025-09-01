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
    function getDataDeCadastroString(item: any): string {
      // Se vier string já formatada do back, use ela
      if (typeof item.dataDeCadastro === 'string') {
        return item.dataDeCadastro;
      }
      // Se vier array, tente montar string (fallback)
      if (
        item.dataDeCadastro &&
        Array.isArray(item.dataDeCadastro) &&
        item.dataDeCadastro.length >= 3
      ) {
        const data = new Date(
          item.dataDeCadastro[0],
          item.dataDeCadastro[1] - 1,
          item.dataDeCadastro[2],
          item.dataDeCadastro[3] || 0,
          item.dataDeCadastro[4] || 0,
          item.dataDeCadastro[5] || 0,
          item.dataDeCadastro[6] || 0
        );
        if (!isNaN(data.getTime())) {
          const dia = String(data.getDate()).padStart(2, '0');
          const mes = String(data.getMonth() + 1).padStart(2, '0');
          const ano = data.getFullYear();
          const hora = String(data.getHours()).padStart(2, '0');
          const min = String(data.getMinutes()).padStart(2, '0');
          return `${dia}/${mes}/${ano} ${hora}:${min}`;
        }
      }
      return '';
    }

    const admissoes = (obs.historicoAdmissoes || []).map((item: any) => ({
      ...item,
      tipo: 'ADMISSAO',
      dataDeCadastro: getDataDeCadastroString(item),
    }));
    const demissoes = (obs.historicoDemissoes || []).map((item: any) => ({
      ...item,
      tipo: 'DEMISSAO',
      dataDeCadastro: getDataDeCadastroString(item),
    }));
    const renovacoes = (obs.historicoRenovacao || []).map((item: any) => ({
      ...item,
      tipo: 'RENOVACAO',
      dataDeCadastro: getDataDeCadastroString(item),
    }));

    // Ordena por data/hora string (mais recente primeiro)
    return [...admissoes, ...demissoes, ...renovacoes].sort((a, b) => {
      // Se ambos têm data, compara como datas
      if (a.dataDeCadastro && b.dataDeCadastro) {
        return b.dataDeCadastro.localeCompare(a.dataDeCadastro);
      }
      // Quem não tem data vai para o final
      if (!a.dataDeCadastro && b.dataDeCadastro) return 1;
      if (a.dataDeCadastro && !b.dataDeCadastro) return -1;
      return 0;
    });
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
