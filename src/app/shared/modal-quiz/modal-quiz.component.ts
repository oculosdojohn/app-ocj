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

  currentIndex: number = 0;
  selectedAnswers: (string | null)[] = [];
  showResult = false;
  score = 0;

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
    let acertos = 0;
    this.questions.forEach((q, i) => {
      if (
        this.selectedAnswers[i] &&
        q.resposta &&
        this.selectedAnswers[i] === q.resposta
      ) {
        acertos++;
      }
    });
    this.score = acertos;
    this.showResult = true;
  }
}
