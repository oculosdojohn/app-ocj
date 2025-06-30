import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { QuizService } from 'src/app/services/funcionalidades/quiz.service';
import { RespostasQuizDTO } from 'src/app/sistema/Servicos/cursos/quiz';
import { ColaboradorService } from 'src/app/services/administrativo/colaborador.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-modal-quiz',
  templateUrl: './modal-quiz.component.html',
  styleUrls: ['./modal-quiz.component.css'],
})
export class ModalQuizComponent {
  @Input() title: string = 'Quizz';
  @Input() questions: {
    id?: string;
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
  podeColetarMoedas = false;
  enviandoRespostas = false;
  moedasColetadas = false;

  constructor(
    private quizService: QuizService,
    private colaboradorService: ColaboradorService
  ) {}

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
    if (this.quizFinalizado || this.enviandoRespostas) return;

    this.enviandoRespostas = true;

    // Prepara as respostas para envio
    const respostasDTO: RespostasQuizDTO = {
      respostas: this.questions.map((question, index) => ({
        letraAlternativa: this.selectedAnswers[index] || '',
        quizzId: Number(question.id) || 0,
      })),
    };

    console.log('Enviando respostas:', respostasDTO);

    this.quizService.registrarRespostas(respostasDTO).subscribe({
      next: (response) => {
        console.log('Respostas registradas com sucesso:', response);
        this.processarResultado();
        this.enviandoRespostas = false;
      },
      error: (err) => {
        console.error('Erro ao registrar respostas:', err);
        this.processarResultado();
        this.enviandoRespostas = false;
      },
    });
  }

  private processarResultado(): void {
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

    this.totalMoedas = this.moedas.reduce((total, moedas) => total + moedas, 0);

    this.podeColetarMoedas = acertos >= 3;

    this.showResult = true;
    this.quizFinalizado = true;

    console.log(`Acertos: ${acertos}/${this.questions.length}`);
    console.log(`Total de moedas: ${this.totalMoedas}`);
    console.log(`Pode coletar moedas: ${this.podeColetarMoedas}`);
  }

  coletarMoedas(): void {
    if (!this.podeColetarMoedas || this.moedasColetadas) return;

    this.colaboradorService.moedas$.pipe(take(1)).subscribe((moedasAtuais) => {
      const novaQuantidade = moedasAtuais + this.totalMoedas;
      this.colaboradorService.atualizarMoedas(novaQuantidade);
      console.log(
        `Moedas atualizadas: ${moedasAtuais} + ${this.totalMoedas} = ${novaQuantidade}`
      );
    });

    this.moedasColetadas = true;

    setTimeout(() => {
      this.onModalClose();
    }, 1000);
  }
}
