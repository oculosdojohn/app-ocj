import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Aula } from 'src/app/sistema/Servicos/cursos/aulas';

@Component({
  selector: 'app-playlist-video',
  templateUrl: './playlist-video.component.html',
  styleUrls: ['./playlist-video.component.css'],
})
export class PlaylistVideoComponent implements OnInit {
  @Input() aulas: Aula[] = [];
  @Input() titulo: string = '';
  @Input() modulo: string = '';
  @Input() videoAtualIndex: number = 0;
  @Output() aulaSelecionada = new EventEmitter<{ aula: Aula; index: number }>();
  @Input() videosAssistidos: boolean[] = [];
  @Output() quizClicked = new EventEmitter<void>();

  @Input() podeAbrirQuiz: boolean = false;
  @Input() mostrarBotaoQuiz: boolean = false;
  @Input() statusQuiz: string = 'bloqueado';
  @Input() mensagemQuiz: string = '';

  playlistAberta: boolean = true;
  isModalOpen = false;

  constructor() {}

  ngOnInit(): void {}

  openModal() {
    this.isModalOpen = true;
  }

  closeModal(event?: MouseEvent) {
    if (!event || event.target === event.currentTarget) {
      this.isModalOpen = false;
    }
  }

  selecionarAula(aula: Aula, index: number): void {
    this.aulaSelecionada.emit({ aula, index });
  }

  togglePlaylist(): void {
    this.playlistAberta = !this.playlistAberta;
  }

  truncateTitle(title: string, maxLength: number): string {
    if (title.length > maxLength) {
      return title.substring(0, maxLength) + '...';
    } else {
      return title;
    }
  }

  onVideoLoaded(url: string): void {}

  abrirQuiz() {
    if (this.podeAbrirQuiz && this.podeAbrirQuiz) {
      this.quizClicked.emit();
    }
  }
}
