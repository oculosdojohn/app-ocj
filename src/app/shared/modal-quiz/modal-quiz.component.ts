import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-quiz',
  templateUrl: './modal-quiz.component.html',
  styleUrls: ['./modal-quiz.component.css'],
})
export class ModalQuizComponent {
  @Input() title: string = 'Quizz';
  @Input() questions: {
    enunciado: string;
    alternativas: string[];
    resposta?: string;
  }[] = [];
  @Input() item: any;
  @Input() size: string = 'xl:max-w-7xl';
  @Output() closeModal = new EventEmitter<void>();
  @Input() moedas: number[] = [];

  currentIndex: number = 0;
  selectedAnswers: (string | null)[] = [];
  showResult = false;
  quizFinalizado = false;
  score = 0;
  totalMoedas: number = 0;

  onModalClose() {
    this.closeModal.emit();
  }

  getLetter(index: number): string {
    return String.fromCharCode(65 + index);
  }

  get selectedAnswer(): string | null {
    return this.selectedAnswers[this.currentIndex] || null;
  }
  set selectedAnswer(val: string | null) {
    this.selectedAnswers[this.currentIndex] = val;
  }

  get podeFinalizar(): boolean {
    return this.selectedAnswers.some((a) => !!a);
  }

  selectAnswer(letter: string): void {
    this.selectedAnswers[this.currentIndex] = letter;
  }

  next(): void {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
    }
  }

  previous(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  finalizarQuiz(): void {
    if (this.quizFinalizado) return; // impede múltiplos envios
    let acertos = 0;
    let total = 0;
    this.questions.forEach((q, i) => {
      if (
        this.selectedAnswers[i] &&
        q.resposta &&
        this.selectedAnswers[i] === q.resposta
      ) {
        acertos++;
        total += this.moedas[i] || 0;
      }
    });
    this.score = acertos;
    this.totalMoedas = total;
    this.showResult = true;
    this.quizFinalizado = true;
  }
}
