import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-quiz',
  templateUrl: './modal-quiz.component.html',
  styleUrls: ['./modal-quiz.component.css'],
})
export class ModalQuizComponent {
  @Input() title: string = 'Quizz';
  @Input() questions: { enunciado: string; alternativas: string[] }[] = [];
  @Input() item: any;
  @Input() size: string = 'xl:max-w-7xl';
  @Output() closeModal = new EventEmitter<void>();

  currentIndex: number = 0;
  selectedAnswer: string | null = null;

  onModalClose() {
    this.closeModal.emit();
  }

  get currentQuestion() {
    return this.questions[this.currentIndex];
  }

  getLetter(index: number): string {
    return String.fromCharCode(65 + index); // 65 = 'A'
  }

  next(): void {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
      this.selectedAnswer = null;
    }
  }

  previous(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.selectedAnswer = null;
    }
  }

  selectAnswer(letter: string): void {
    this.selectedAnswer = letter;
  }
}
