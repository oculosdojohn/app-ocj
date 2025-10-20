import { Component, OnInit, Input } from '@angular/core';
import { Modulos } from 'src/app/sistema/Servicos/cursos/enums/modulos';
import { ModulosDescricao } from 'src/app/sistema/Servicos/cursos/enums/modulos-descricao';
import { ColaboradorService } from 'src/app/services/administrativo/colaborador.service';
import { ProgressoCurso } from '../../../funcionarios/progresso-curso';
import {
  QuizService,
  QuizMetricasModulo,
} from 'src/app/services/funcionalidades/quiz.service';

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

  private ordemModulos: Modulos[] = Object.values(Modulos) as Modulos[];

  quiz: any[] = [];
  desempenhoData: ProgressoCurso | null = null;
  totalMoedas: number = 0;
  aulasAssistidas: number = 0;
  modulosFinalizados: number = 0;

  paginaAtual: number = 1;
  itensPorPagina: number = 6;
  isLoading: boolean = false;

  constructor(
    private colaboradorService: ColaboradorService,
    private quizService: QuizService
  ) {}

  ngOnInit(): void {
    if (this.colaboradorId) {
      this.carregarDesempenho();
      this.carregarMetricasQuiz();
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
        this.desempenhoData = response;
        this.totalMoedas = response?.totalMoedas || 0;
        this.aulasAssistidas = response?.quantidadeAulasAssistidas || 0;
        this.modulosFinalizados = response?.totalModuloFinalizados || 0;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar desempenho:', err);
        this.isLoading = false;
      },
    });
  }

  private carregarMetricasQuiz(): void {
    this.isLoading = true;
    this.quizService.listarMetricasPorUsuario(this.colaboradorId).subscribe({
      next: (metricas: QuizMetricasModulo[]) => {
        const map = new Map<Modulos, QuizMetricasModulo>();
        const validos = new Set(this.ordemModulos);
        metricas.forEach((m) => {
          const mod = m.modulo as Modulos;
          if (validos.has(mod)) map.set(mod, m);
        });

        this.quiz = this.ordemModulos.map((mod) => {
          const m = map.get(mod);
          const total = m?.total ?? 0;
          const corretas = m?.corretas ?? 0;
          const acuracia = Math.round(
            m?.acuracia ?? (total ? (corretas / total) * 100 : 0)
          );
          return {
            value: mod,
            description: ModulosDescricao[mod],
            image: this.moduloImagens[mod],
            acertos: corretas,
            incorretas: m?.incorretas ?? 0,
            total,
            acuracia,
          };
        });

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar métricas do quiz:', err);
        this.carregarDadosPadrao();
        this.isLoading = false;
      },
    });
  }

  carregarDadosPadrao(): void {
    this.quiz = (Object.values(Modulos) as Modulos[]).map((mod) => ({
      value: mod,
      description: ModulosDescricao[mod],
      image: this.moduloImagens[mod],
      acertos: 0,
      incorretas: 0,
      total: 0,
      acuracia: 0,
    }));
  }
}
