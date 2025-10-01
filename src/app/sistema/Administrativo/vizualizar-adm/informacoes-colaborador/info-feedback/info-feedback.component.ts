import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/configs/auth.service';
import { Permissao } from 'src/app/login/permissao';
import { Feedback } from 'src/app/sistema/RH/feedbaks/feedback';
import { FeedbacksService } from 'src/app/services/rh/feedbacks.service';
import { ModalDeleteService } from 'src/app/services/modal/modal-delete.service';

@Component({
  selector: 'app-info-feedback',
  templateUrl: './info-feedback.component.html',
  styleUrls: ['./info-feedback.component.css'],
})
export class InfoFeedbackComponent implements OnInit {
  @Input() colaboradorId!: number;
  isLoading = false;

  feedbacks: Feedback[] = [];
  itensPorPagina = 6;
  paginaAtual = 1;
  totalPaginas = Math.ceil(this.feedbacks.length / this.itensPorPagina);
  feedbacksPaginados: Feedback[] = [];
  selectedFeedback: any = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private feedbacksService: FeedbacksService,
    private modalDeleteService: ModalDeleteService
  ) {}

  ngOnInit(): void {
    if (this.colaboradorId) {
      this.fetchFeedbacks();
    }
    this.atualizarPaginacao();
  }

  atualizarPaginacao(): void {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    this.feedbacksPaginados = this.feedbacks.slice(inicio, fim);
  }

  get totalItens() {
    return this.feedbacks.length;
  }

  onPaginaMudou(novaPagina: number) {
    this.paginaAtual = novaPagina;
    this.atualizarPaginacao();
  }

  fetchFeedbacks(): void {
    this.isLoading = true;

    this.feedbacksService
      .listarFeedbacksPorColaborador(this.colaboradorId)
      .subscribe(
        (feedbacks: Feedback[]) => {
          console.log('Feedbacks retornados:', feedbacks);
          this.feedbacks = feedbacks;
          this.totalPaginas = Math.ceil(
            this.feedbacks.length / this.itensPorPagina
          );
          this.atualizarPaginacao();
          this.isLoading = false;
        },
        (error) => {
          console.error('Erro ao carregar feedbacks:', error);
          this.isLoading = false;
        }
      );
  }

  visualizarFeedback(id: string): void {
    this.router.navigate(['/usuario/detalhes-feedback', id]);
  }

  editarFeedback(id: string): void {
    this.router.navigate(['/usuario/cadastro-de-feedback', id]);
  }

  deleteFeedback(id: string): void {
    const feedbackRemovido = this.feedbacks.find((e) => e.id === id);
    this.feedbacksService.deletarFeedback(id).subscribe(
      () => {
        console.log('Feedback deletado com sucesso!');
        this.fetchFeedbacks();
      },
      (error) => {
        console.error('Erro ao deletar o feedback:', error);
      }
    );
  }

  openModalDeletar(feedback: any): void {
    this.selectedFeedback = feedback;

    this.modalDeleteService.openModal(
      {
        title: 'Remoção de Feedback',
        description: `Tem certeza que deseja excluir o feedback <strong>${feedback.classificacao || '-'}</strong> do colaborador(a) ${
          feedback.colaborador?.username || '-'
        }?`,
        item: feedback,
        deletarTextoBotao: 'Remover',
        size: 'md',
      },
      () => {
        this.deleteFeedback(feedback.id);
      }
    );
  }
}
