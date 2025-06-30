import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Modulos } from '../cursos/enums/modulos';
import { ModulosDescricao } from '../cursos/enums/modulos-descricao';
import { Aula } from '../cursos/aulas';
import { CursosService } from 'src/app/services/funcionalidades/cursos.service';
import { ModalQuizzService } from 'src/app/services/modal/modal-quizz.service';
import { QuizService } from 'src/app/services/funcionalidades/quiz.service';
import { ColaboradorService } from 'src/app/services/administrativo/colaborador.service';
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
  userRating: number = 0;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private cursosService: CursosService,
    private modalQuizzService: ModalQuizzService,
    private quizService: QuizService,
    private colaboradorService: ColaboradorService
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

  reproduzirVideo(aula: Aula, index: number): void {
    this.videoAtual = aula;
    this.videoAtualIndex = index;
    console.log('Reproduzindo vídeo:', this.videoAtual.video.documentoUrl);
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
          this.videoAtual = this.aulas[0];
          this.videoAtualIndex = 0;
          console.log('Video atual:', this.videoAtual);
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
    this.quizService.obterQuizPorModulo(this.modulo!).subscribe({
      next: (quizzes) => {
        if (quizzes && quizzes.length > 0) {
          const quiz = quizzes[0];
          console.log(quiz.alternativas);
          const questions = quizzes.map((quiz) => ({
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
}
