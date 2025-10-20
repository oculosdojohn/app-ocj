import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Modulos } from '../cursos/enums/modulos';
import { ModulosDescricao } from '../cursos/enums/modulos-descricao';
import { Aula } from '../cursos/aulas';
import {
  CursosService,
  AvaliacaoAulaRequest,
} from 'src/app/services/funcionalidades/cursos.service';
import { ModalQuizzService } from 'src/app/services/modal/modal-quizz.service';
import { QuizService } from 'src/app/services/funcionalidades/quiz.service';
import { ColaboradorService } from 'src/app/services/administrativo/colaborador.service';
import { AuthService } from 'src/app/services/configs/auth.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-modulo-curso',
  templateUrl: './modulo-curso.component.html',
  styleUrls: ['./modulo-curso.component.css'],
})
export class ModuloCursoComponent implements OnInit {
  modulo: Modulos | undefined;
  descricao: string = '';

  aulas: Aula[] = [];
  videoAtual: Aula | null = null;
  videoAtualIndex: number = 0;
  videosAssistidos: boolean[] = [];

  quizJaRespondido: boolean = false;
  verificandoQuiz: boolean = false;

  private _userRating: number = 0;
  get userRating(): number {
    return this._userRating;
  }
  set userRating(value: number) {
    if (value === this._userRating) return;
    this._userRating = value;
    this.onRatingChange(value);
  }

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private cursosService: CursosService,
    private modalQuizzService: ModalQuizzService,
    private quizService: QuizService,
    private colaboradorService: ColaboradorService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const slug = params.get('modulo') || '';
      const moduloObj = Object.keys(Modulos).find(
        (key) =>
          this.generateSlug(
            ModulosDescricao[Modulos[key as keyof typeof Modulos]]
          ) === slug
      );
      if (moduloObj) {
        this.modulo = Modulos[moduloObj as keyof typeof Modulos];
        this.descricao = ModulosDescricao[this.modulo];
        this.buscarAulas(this.modulo);
        this.verificarSeQuizJaFoiRespondido();

        setTimeout(() => {
          this.verificarSeQuizJaFoiRespondido();
        }, 500);
      }
    });
  }

  generateSlug(text: string): string {
    return text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  }

  goBack() {
    this.location.back();
  }

  get todasAulasAssistidas(): boolean {
    return (
      this.aulas.length > 0 &&
      this.videosAssistidos.every((assistido) => assistido)
    );
  }

  get mostrarBotaoQuiz(): boolean {
    return this.todasAulasAssistidas && !this.quizJaRespondido;
  }

  get podeAbrirQuiz(): boolean {
    return (
      this.todasAulasAssistidas &&
      !this.quizJaRespondido &&
      !this.verificandoQuiz
    );
  }

  get statusQuiz(): string {
    if (this.verificandoQuiz) return 'verificando';
    if (!this.todasAulasAssistidas) return 'bloqueado';
    if (this.quizJaRespondido) return 'concluido';
    return 'disponivel';
  }

  get mensagemQuiz(): string {
    if (this.verificandoQuiz) return 'Verificando status do quiz...';
    if (!this.todasAulasAssistidas) {
      const restantes = this.videosAssistidos.filter((v) => !v).length;
      return `Assista ${restantes} aula${restantes > 1 ? 's' : ''} restante${
        restantes > 1 ? 's' : ''
      } para liberar o quiz`;
    }
    if (this.quizJaRespondido)
      return 'Parabéns! Você já completou este quiz e coletou as moedas.';
    return 'Quiz disponível! Clique para começar.';
  }

  reproduzirVideo(aula: Aula, index: number): void {
    this.videoAtual = aula;
    this.videoAtualIndex = index;
    console.log('Reproduzindo vídeo:', this.videoAtual.video.documentoUrl);

    this._userRating = aula.minhaAvaliacao || 0;
  }

  marcarComoAssistido(index: number): void {
    if (this.videosAssistidos[index]) return;

    const aula = this.aulas[index];
    if (!aula) return;

    this.videosAssistidos[index] = true;
    this.cursosService.aulaVisualizada(Number(aula.id), aula.modulo).subscribe({
      next: () => {
        console.log(`Aula ${aula.id} marcada como assistida no backend.`);
        const moedasGanhas = Number(aula.qtdMoedas) || 0;
        let qtdMoedas = Number(localStorage.getItem('qtdMoedas')) || 0;
        this.colaboradorService.moedas$
          .pipe(take(1))
          .subscribe((qtdMoedasAtual) => {
            this.colaboradorService.atualizarMoedas(
              qtdMoedasAtual + moedasGanhas
            );
          });
      },
      error: (err) => {
        console.error('Erro ao marcar aula como assistida:', err);
      },
    });
  }

  onVideoEnded(): void {
    this.marcarComoAssistido(this.videoAtualIndex);
    const nextIndex = this.videoAtualIndex + 1;
    if (nextIndex < this.aulas.length) {
      this.reproduzirVideo(this.aulas[nextIndex], nextIndex);
    }
  }

  formatFileName(fileName: string): string {
    return fileName.replace(/^\d+_/, '').replace(/_/g, ' ');
  }

  viewPdf(url: string): void {
    window.open(url, '_blank');
  }

  buscarAulas(moduloAula: string): void {
    this.cursosService.obterAulasPorModulo(moduloAula).subscribe(
      (aulas: Aula[]) => {
        console.log('Aulas recebidas:', aulas);
        this.aulas = aulas;
        this.videosAssistidos = aulas.map((aula) => !!aula.visualizado);
        if (this.aulas.length > 0) {
          this.reproduzirVideo(this.aulas[0], 0);
        }
      },
      (error) => {
        console.error('Erro ao buscar aulas:', error);
        this.aulas = [];
        this.videosAssistidos = [];
      }
    );
  }

  abrirModalQuiz(): void {
    if (!this.podeAbrirQuiz) {
      if (!this.todasAulasAssistidas) {
        alert('Você precisa assistir todas as aulas antes de fazer o quiz!');
        return;
      }
      if (this.quizJaRespondido) {
        alert('Você já realizou este quiz!');
        return;
      }
      return;
    }

    this.quizService.obterQuizPorModulo(this.modulo!).subscribe({
      next: (quizzes) => {
        if (quizzes && quizzes.length > 0) {
          const quiz = quizzes[0];
          console.log(quiz.alternativas);
          const questions = quizzes.map((quiz) => ({
            id: quiz.id,
            enunciado: quiz.enunciado,
            alternativas: quiz.alternativas.map((a) => a.descricao),
            resposta: quiz.alternativas.find((a) => a.respostaCerta)
              ?.alternativa,
          }));
          const moedas = quizzes.map((q) => q.valorMoedas || 0);
          this.modalQuizzService.openModal({
            questions,
            moedas,
            size: 'md',
          });
        } else {
          this.modalQuizzService.openModal({ questions: [] });
        }
      },
      error: (err) => {
        this.modalQuizzService.openModal({ questions: [] });
        console.error('Erro ao buscar quizzes do módulo:', err);
      },
    });
  }

  private verificarSeQuizJaFoiRespondido(): void {
    if (!this.modulo) {
      console.log('Módulo não definido');
      return;
    }

    this.verificandoQuiz = true;

    console.log('🔍 Verificando quiz para módulo:', this.modulo);

    this.authService.obterPerfilUsuario().subscribe({
      next: (usuario) => {
        console.log('Perfil do usuário obtido:', usuario);
        console.log('ID do usuário:', usuario.id);

        const usuarioId = Number(usuario.id);

        if (!usuarioId || isNaN(usuarioId)) {
          console.error('ID do usuário inválido:', usuario.id);
          this.verificandoQuiz = false;
          this.quizJaRespondido = false;
          return;
        }

        this.quizService
          .listarRespostasPorUsuarioEModulo(usuarioId, this.modulo!)
          .subscribe({
            next: (respostas) => {
              console.log('📋 Respostas do quiz:', {
                respostas: respostas,
                quantidade: respostas?.length || 0,
                usuarioId: usuarioId,
                modulo: this.modulo,
              });

              this.quizJaRespondido =
                respostas && Array.isArray(respostas) && respostas.length > 0;
              this.verificandoQuiz = false;
            },
            error: (err) => {
              console.log(
                'Erro ao verificar quiz (provavelmente não respondido):'
              );

              this.quizJaRespondido = false;
              this.verificandoQuiz = false;
            },
          });
      },
      error: (err) => {
        console.error('Erro ao obter perfil do usuário:', err);
        this.verificandoQuiz = false;
        this.quizJaRespondido = false;
      },
    });
  }

  onRatingChange(estrelas: number): void {
    if (!this.videoAtual || !estrelas) return;

    const aulaId = Number(this.videoAtual.id);
    if (isNaN(aulaId)) {
      console.error('ID da aula inválido:', this.videoAtual.id);
      return;
    }

    const avaliacao: AvaliacaoAulaRequest = {
      estrelas,
      comentario: '',
    };

    console.log(
      `⭐ Enviando avaliação: ${estrelas} estrela${
        estrelas > 1 ? 's' : ''
      } para aula ${aulaId}`
    );

    this.cursosService.avaliarAula(aulaId, avaliacao).subscribe({
      next: (response) => {
        if (this.videoAtual) {
          this.videoAtual.minhaAvaliacao = estrelas;
          const aulaIndex = this.aulas.findIndex(
            (a) => a.id === this.videoAtual!.id
          );
          if (aulaIndex !== -1) {
            this.aulas[aulaIndex].minhaAvaliacao = estrelas;
          }
        }
      },
      error: (error) => {
        if (this.videoAtual) {
          this._userRating = this.videoAtual.minhaAvaliacao || 0;
        }
      },
    });
  }
}
