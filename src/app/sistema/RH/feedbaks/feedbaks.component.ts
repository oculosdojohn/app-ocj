import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Feedback } from './feedback';
import { AuthService } from 'src/app/services/configs/auth.service';
import { Permissao } from 'src/app/login/permissao';
import { FeedbacksService } from 'src/app/services/rh/feedbacks.service';
import { ModalDeleteService } from 'src/app/services/modal/modal-delete.service';

@Component({
  selector: 'app-feedbaks',
  templateUrl: './feedbaks.component.html',
  styleUrls: ['./feedbaks.component.css'],
})
export class FeedbaksComponent implements OnInit {
  termoBusca: string = '';
  mensagemBusca: string = '';
  isLoading = false;
  successMessage: string = '';
  messageTimeout: any;

  feedbacks: Feedback[] = [];

  itensPorPagina = 6;
  paginaAtual = 1;
  totalPaginas = Math.ceil(this.feedbacks.length / this.itensPorPagina);
  feedbacksPaginados: Feedback[] = [];
  selectedFeedback: any = null;

  public Permissao = Permissao;
  public cargoUsuario!: Permissao;

  constructor(
    private router: Router,
    private authService: AuthService,
    private feedbackService: FeedbacksService,
    private modalDeleteService: ModalDeleteService
  ) {}

  ngOnInit(): void {
    this.exibirMensagemDeSucesso();
    this.fetchFeedback();
    this.atualizarPaginacao();
    // já busca o perfil e define o cargo
    this.authService.obterPerfilUsuario().subscribe((usuario) => {
      this.cargoUsuario = ('ROLE_' + usuario.cargo) as Permissao;
    });
  }

  cadastrarFeedback(): void {
    this.router.navigate(['/usuario/cadastro-de-feedback']);
  }

  onSearch(searchTerm: string) {
    console.log('Search term:', searchTerm);
    this.termoBusca = searchTerm.trim();

    if (this.termoBusca === '') {
      this.mensagemBusca = '';
      this.fetchFeedback();
      return;
    }

    this.isLoading = true;
    this.feedbackService.buscarFeedbackPorNome(this.termoBusca).subscribe(
      (feedbacks: Feedback[]) => {
        console.log('Feedbacks encontrados na busca:', feedbacks);
        this.feedbacks = feedbacks;

        if (feedbacks.length === 0) {
          this.mensagemBusca = `Nenhum feedback encontrado para "${this.termoBusca}".`;
        } else {
          this.mensagemBusca = '';
        }

        this.paginaAtual = 1;
        this.totalPaginas = Math.ceil(
          this.feedbacks.length / this.itensPorPagina
        );
        this.atualizarPaginacao();
        this.isLoading = false;
      },
      (error) => {
        console.error('Erro ao buscar feedbacks por nome:', error);
        this.mensagemBusca = 'Erro ao realizar a busca. Tente novamente.';
        this.feedbacks = [];
        this.atualizarPaginacao();
        this.isLoading = false;
      }
    );
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

  fetchFeedback(): void {
    this.isLoading = true;

    this.feedbackService.listarFeedbacks().subscribe(
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
    this.feedbackService.deletarFeedback(id).subscribe(
      () => {
        console.log('Feedback deletado com sucesso!');
        this.fetchFeedback();
        this.showMessage(
          'success',
          `Feedback "${feedbackRemovido?.classificacao || ''} - ${
            feedbackRemovido?.usuario?.username || '-'
          }" deletado com sucesso!`
        );
      },
      (error) => {
        console.error('Erro ao deletar o feedback:', error);
      }
    );
  }

  getInitial(name?: string): string {
    return name && name.length > 0 ? name.charAt(0).toUpperCase() : '';
  }

  getRandomColor(seed?: string): string {
    const colors = [
      '#FFB3BA', // Rosa pastel
      '#FFDFBA', // Laranja pastel
      '#BAFFC9', // Verde pastel
      '#BAE1FF', // Azul pastel
      '#D5BAFF', // Roxo pastel
    ];
    const index =
      seed && seed.length > 0 ? seed.charCodeAt(0) % colors.length : 0;
    return colors[index];
  }

  openModalDeletar(feedback: any): void {
    this.selectedFeedback = feedback;

    this.modalDeleteService.openModal(
      {
        title: 'Remoção de Feedback',
        description: `Tem certeza que deseja excluir o feedback <strong></strong> do colaborador(a) ${
          feedback.usuario?.username || '-'
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

  exibirMensagemDeSucesso(): void {
    const state = window.history.state as { successMessage?: string };
    if (state?.successMessage) {
      this.successMessage = state.successMessage;
      setTimeout(() => (this.successMessage = ''), 3000);
      window.history.replaceState({}, document.title);
    }
  }

  showMessage(type: 'success' | 'error', msg: string) {
    this.clearMessage();
    if (type === 'success') this.successMessage = msg;
    this.messageTimeout = setTimeout(() => this.clearMessage(), 3000);
  }

  clearMessage() {
    this.successMessage = '';
    if (this.messageTimeout) clearTimeout(this.messageTimeout);
  }

  formatarData(data: string): string {
    if (!data) return '-';
    try {
      const date = new Date(data);
      return date.toLocaleDateString('pt-BR');
    } catch {
      return '-';
    }
  }

  get rotaDashboard(): string {
    if (this.cargoUsuario === Permissao.ADMIN) return '/dashboard-admin';
    if (this.cargoUsuario === Permissao.RH) return '/dashboard-rh';
    if (this.cargoUsuario === Permissao.GERENTE) return '/dashboard-gerente';
    if (
      this.cargoUsuario === Permissao.CONSULTOR_VENDAS ||
      this.cargoUsuario === Permissao.VENDEDOR ||
      this.cargoUsuario === Permissao.FINANCEIRO ||
      this.cargoUsuario === Permissao.COBRADOR ||
      this.cargoUsuario === Permissao.ESTAGIARIO
    )
      return '/dashboard-colaborador';
    return '/login';
  }
}
