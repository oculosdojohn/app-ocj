import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Modulos } from '../cursos/enums/modulos';
import { ModulosDescricao } from '../cursos/enums/modulos-descricao';
import { Aula } from '../cursos/aulas';
import { CursosService } from 'src/app/services/funcionalidades/cursos.service';
import { ModalQuizzService } from 'src/app/services/modal/modal-quizz.service';

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
    private modalQuizzService: ModalQuizzService
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
    this.videosAssistidos[index] = true;
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
        if (this.aulas.length > 0) {
          this.videoAtual = this.aulas[0];
          this.videoAtualIndex = 0;
          console.log('Video atual:', this.videoAtual);
        }
      },
      (error) => {
        console.error('Erro ao buscar aulas:', error);
        this.aulas = [];
      }
    );
  }

  abrirModalQuiz(): void {
    this.modalQuizzService.openModal({
      title: 'Quiz da Aula',
      questions: [
        {
          enunciado: 'Qual a cor do céu?',
          alternativas: ['Azul', 'Verde', 'Vermelho', 'Amarelo'],
        },
        {
          enunciado: 'Quanto é 2 + 2?',
          alternativas: ['3', '4', '5', '6'],
        },
      ],
      size: 'md',
    });
  }
}
