import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ferias } from './ferias';
import { AuthService } from 'src/app/services/configs/auth.service';
import { Permissao } from 'src/app/login/permissao';
import { FeriasService } from 'src/app/services/rh/ferias.service';
import { ModalDeleteService } from 'src/app/services/modal/modal-delete.service';

@Component({
  selector: 'app-ferias',
  templateUrl: './ferias.component.html',
  styleUrls: ['./ferias.component.css'],
})
export class FeriasComponent implements OnInit {
  ferias: Ferias[] = [];
  mensagemBusca: string = '';
  isLoading = false;
  successMessage: string = '';
  messageTimeout: any;

  itensPorPagina = 6;
  paginaAtual = 1;
  totalPaginas = Math.ceil(this.ferias.length / this.itensPorPagina);
  feriasPaginadas: Ferias[] = [];
  selectedFerias: any = null;

  public Permissao = Permissao;
  public cargoUsuario!: Permissao;

  constructor(
    private router: Router,
    private authService: AuthService,
    private feriasService: FeriasService,
    private modalDeleteService: ModalDeleteService
  ) {}

  ngOnInit(): void {
    this.exibirMensagemDeSucesso();
    this.fetchFerias();
    this.atualizarPaginacao();
    // já busca o perfil e define o cargo
    this.authService.obterPerfilUsuario().subscribe((usuario) => {
      this.cargoUsuario = ('ROLE_' + usuario.cargo) as Permissao;
    });
  }

  cadastrarFerias(): void {
    this.router.navigate(['/usuario/cadastro-de-ferias']);
  }

  atualizarPaginacao(): void {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    this.feriasPaginadas = this.ferias.slice(inicio, fim);
  }

  get totalItens() {
    return this.ferias.length;
  }

  onPaginaMudou(novaPagina: number) {
    this.paginaAtual = novaPagina;
    this.atualizarPaginacao();
  }

  fetchFerias(): void {
    this.isLoading = true;

    this.feriasService.listarFerias().subscribe(
      (ferias: Ferias[]) => {
        console.log('Férias retornadas:', ferias);
        this.ferias = ferias;
        this.totalPaginas = Math.ceil(this.ferias.length / this.itensPorPagina);
        this.atualizarPaginacao();
        this.isLoading = false;
      },
      (error) => {
        console.error('Erro ao carregar feedbacks:', error);
        this.isLoading = false;
      }
    );
  }

  visualizarFerias(id: string): void {
    this.router.navigate(['/usuario/detalhes-ferias', id]);
  }

  editarFerias(id: string): void {
    this.router.navigate(['/usuario/cadastro-de-ferias', id]);
  }

  deleteFerias(id: string): void {
    const feriasRemovidas = this.ferias.find((e) => e.id === id);
    this.feriasService.buscarFeriasPorId(id).subscribe(
      () => {
        console.log('Férias deletadas com sucesso!');
        this.fetchFerias();
        this.showMessage(
          'success',
          `Férias "${feriasRemovidas?.mesReferencia || ''} - ${
            feriasRemovidas?.colaborador?.username || '-'
          }" deletadas com sucesso!`
        );
      },
      (error) => {
        console.error('Erro ao deletar as férias:', error);
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

  openModalDeletar(ferias: any): void {
    this.selectedFerias = ferias;

    this.modalDeleteService.openModal(
      {
        title: 'Remoção de Férias',
        description: `Tem certeza que deseja excluir as férias <strong></strong> do colaborador(a) ${
          ferias.colaborador?.username || '-'
        }?`,
        item: ferias,
        deletarTextoBotao: 'Remover',
        size: 'md',
      },
      () => {
        this.deleteFerias(ferias.id);
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
