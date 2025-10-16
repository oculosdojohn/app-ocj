import { Component, OnInit, Input } from '@angular/core';
import { Modulos } from 'src/app/sistema/Servicos/cursos/enums/modulos';
import { ModulosDescricao } from 'src/app/sistema/Servicos/cursos/enums/modulos-descricao';
import { ColaboradorService } from 'src/app/services/administrativo/colaborador.service';
import { ProgressoCurso } from '../../../funcionarios/progresso-curso';

@Component({
  selector: 'app-info-quiz',
  templateUrl: './info-quiz.component.html',
  styleUrls: ['./info-quiz.component.css'],
})
export class InfoQuizComponent implements OnInit {
  @Input() colaboradorId!: number;

  private moduloImagens: { [key in Modulos]: string } = {
    [Modulos.ONBOARDING]: 'assets/imgs/cursos-img/onboarding.png',
    [Modulos.HISTORIA_SUCESSO]: 'assets/imgs/cursos-img/historia-sucesso.png',
    [Modulos.PRINCIPIOS_OTICA]: 'assets/imgs/cursos-img/principios-otica.png',
    [Modulos.SCRIPT_VENDAS]: 'assets/imgs/cursos-img/script-vendas.png',
    [Modulos.CONSEGUIR_CLIENTES]:
      'assets/imgs/cursos-img/conseguir-clientes.png',
    [Modulos.CONSULTOR_ALTA_PERFORMANCE]:
      'assets/imgs/cursos-img/consultor-alta-performance.png',
    [Modulos.LIMPEZA_MANUTENCAO]:
      'assets/imgs/cursos-img/limpeza-manutencao.png',
    [Modulos.MANUTENCAO_OCULOS]: 'assets/imgs/cursos-img/manutencao-oculos.png',
    [Modulos.GARANTIA_PRODUTOS]: 'assets/imgs/cursos-img/garantia-produtos.png',
    [Modulos.EMBALAGEM_PADRAO]: 'assets/imgs/cursos-img/embalagem-padrao.png',
    [Modulos.ENTREGA_OCULOS_GRAU]: 'assets/imgs/cursos-img/entrega-oculos.png',
    [Modulos.PADROES_ATENDIMENTO]:
      'assets/imgs/cursos-img/padroes-atendimento.png',
    [Modulos.SSOTICA_SISTEMA_VENDAS]:
      'assets/imgs/cursos-img/ssotica-vendas.png',
    [Modulos.SSOTICA_CAIXA]: 'assets/imgs/cursos-img/ssotica-caixa.png',
    [Modulos.EU_SOU_VENDEDOR]: 'assets/imgs/cursos-img/eu-sou-vendedor.png',
    [Modulos.INTELIGENCIA_EMOCIONAL]:
      'assets/imgs/cursos-img/inteligencia-emocional.png',
  };

  quiz: any[] = [];
  desempenhoData: ProgressoCurso | null = null;
  totalMoedas: number = 0;
  aulasAssistidas: number = 0;
  modulosFinalizados: number = 0;

  paginaAtual: number = 1;
  itensPorPagina: number = 6;
  isLoading: boolean = false;

  constructor(private colaboradorService: ColaboradorService) {}

  ngOnInit(): void {
    if (this.colaboradorId) {
      this.carregarDesempenho();
      console.log('ID do colaborador:', this.colaboradorId);
      console.log(
        'Carregando desempenho para o colaborador:',
        this.colaboradorId
      );
    } else {
      console.error('ID do colaborador não fornecido');
      this.carregarDadosPadrao();
    }
  }

  onPaginaMudou(novaPagina: number) {
    this.paginaAtual = novaPagina;
  }

  get quizPaginados() {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    return this.quiz.slice(inicio, inicio + this.itensPorPagina);
  }

  get totalItens() {
    return this.quiz.length;
  }

  mudarPagina(numeroPagina: number) {
    this.paginaAtual = numeroPagina;
  }

  carregarDesempenho(): void {
    this.isLoading = true;
    this.colaboradorService.getDesempenhoCursos(this.colaboradorId).subscribe({
      next: (response: ProgressoCurso) => {
        console.log('Desempenho recebido:', response);
        this.desempenhoData = response;
        this.processarDados();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar desempenho:', err);
        this.carregarDadosPadrao();
        this.isLoading = false;
      },
    });
  }

  processarDados(): void {
    if (!this.desempenhoData) {
      this.carregarDadosPadrao();
      return;
    }

    this.totalMoedas = this.desempenhoData.totalMoedas || 0;
    this.aulasAssistidas = this.desempenhoData.quantidadeAulasAssistidas || 0;
    this.modulosFinalizados = this.desempenhoData.totalModuloFinalizados || 0;

    const modulosBackend = this.desempenhoData.desempenhoPorModulo || [];

    this.quiz = Object.keys(Modulos).map((key) => {
      const moduloEnum = Modulos[key as keyof typeof Modulos];
      const moduloBackend = modulosBackend.find(
        (m: any) => m.modulo === moduloEnum
      );

      const aulasAssistidas = moduloBackend?.quantidadeAulasAssistidas || 0;
      const totalAulas = moduloBackend?.totalAulasNoModulo || 0;
      const porcentagem =
        totalAulas > 0 ? Math.round((aulasAssistidas / totalAulas) * 100) : 0;

      return {
        value: moduloEnum,
        description: ModulosDescricao[moduloEnum],
        image: this.moduloImagens[moduloEnum],
        porcentagem: porcentagem,
        aulasAssistidas: aulasAssistidas,
        totalAulas: totalAulas,
        concluido: porcentagem === 100,
      };
    });

    console.log('Cursos processados:', this.quiz);
  }

  carregarDadosPadrao(): void {
    this.quiz = Object.keys(Modulos).map((key) => ({
      value: Modulos[key as keyof typeof Modulos],
      description: ModulosDescricao[Modulos[key as keyof typeof Modulos]],
      image: this.moduloImagens[Modulos[key as keyof typeof Modulos]],
      porcentagem: 0,
      aulasAssistidas: 0,
      totalAulas: 0,
      concluido: false,
    }));
  }
}
