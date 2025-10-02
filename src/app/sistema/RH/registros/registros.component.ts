import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Registro } from './registro';
import { AuthService } from 'src/app/services/configs/auth.service';
import { Permissao } from 'src/app/login/permissao';
import { RegistrosService } from 'src/app/services/rh/registros.service';
import { ModalDeleteService } from 'src/app/services/modal/modal-delete.service';
import { tipoRegistroDescricao } from './enums/tipoRegistro-descricao';
import { TipoRegistro } from './enums/tipoRegistro';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.css'],
})
export class RegistrosComponent implements OnInit {
  termoBusca: string = '';
  mensagemBusca: string = '';
  isLoading = false;
  successMessage: string = '';
  messageTimeout: any;

  registros: Registro[] = [];

  itensPorPagina = 6;
  paginaAtual = 1;
  totalPaginas = Math.ceil(this.registros.length / this.itensPorPagina);
  registrosPaginados: Registro[] = [];
  selectedRegistro: any = null;

  public Permissao = Permissao;
  public cargoUsuario!: Permissao;

  constructor(
    private router: Router,
    private authService: AuthService,
    private registrosService: RegistrosService,
    private modalDeleteService: ModalDeleteService
  ) {}

  ngOnInit(): void {
    this.exibirMensagemDeSucesso();
    this.fetchRegistros();
    this.atualizarPaginacao();
    // já busca o perfil e define o cargo
    this.authService.obterPerfilUsuario().subscribe((usuario) => {
      this.cargoUsuario = ('ROLE_' + usuario.cargo) as Permissao;
    });
  }

  cadastrarRegistro(): void {
    this.router.navigate(['/usuario/cadastro-de-registro']);
  }

  onSearch(searchTerm: string) {
    console.log('Search term:', searchTerm);
    this.termoBusca = searchTerm.trim();

    if (this.termoBusca === '') {
      // Se a busca estiver vazia, mostrar todos os registros
      this.mensagemBusca = '';
      this.fetchRegistros();
      return;
    }

    this.isLoading = true;
    this.registrosService
      .listarRegistrosPorColaborador(this.termoBusca)
      .subscribe(
        (registros: Registro[]) => {
          console.log('Registros encontrados na busca:', registros);
          this.registros = registros;

          if (registros.length === 0) {
            this.mensagemBusca = `Nenhum registro encontrado para "${this.termoBusca}".`;
          } else {
            this.mensagemBusca = '';
          }

          this.paginaAtual = 1; // Resetar para primeira página
          this.totalPaginas = Math.ceil(
            this.registros.length / this.itensPorPagina
          );
          this.atualizarPaginacao();
          this.isLoading = false;
        },
        (error) => {
          console.error('Erro ao buscar registros por nome:', error);
          this.mensagemBusca = 'Erro ao realizar a busca. Tente novamente.';
          this.registros = [];
          this.atualizarPaginacao();
          this.isLoading = false;
        }
      );
  }

  atualizarPaginacao(): void {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    this.registrosPaginados = this.registros.slice(inicio, fim);
  }

  get totalItens() {
    return this.registros.length;
  }

  onPaginaMudou(novaPagina: number) {
    this.paginaAtual = novaPagina;
    this.atualizarPaginacao();
  }

  fetchRegistros(): void {
    this.isLoading = true;

    this.registrosService.listarRegistros().subscribe(
      (registros: Registro[]) => {
        console.log('registros retornados:', registros);
        this.registros = registros;
        this.totalPaginas = Math.ceil(
          this.registros.length / this.itensPorPagina
        );
        this.atualizarPaginacao();
        this.isLoading = false;
      },
      (error) => {
        console.error('Erro ao carregar registros:', error);
        this.isLoading = false;
      }
    );
  }

  visualizarRegistro(id: string): void {
    this.router.navigate(['/usuario/detalhes-registro', id]);
  }

  editarRegistro(id: string): void {
    this.router.navigate(['/usuario/cadastro-de-registro', id]);
  }

  deleteRegistro(id: string): void {
    const registroRemovido = this.registros.find((e) => e.id === id);
    this.registrosService.deletarRegistro(id).subscribe(
      () => {
        console.log('Registro deletado com sucesso!');
        this.fetchRegistros();
        this.showMessage(
          'success',
          `Registro "${registroRemovido?.classificacao || ''} - ${
            registroRemovido?.usuario?.username || '-'
          }" deletado com sucesso!`
        );
      },
      (error) => {
        console.error('Erro ao deletar o registro:', error);
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
    this.selectedRegistro = feedback;

    this.modalDeleteService.openModal(
      {
        title: 'Remoção de Registro',
        description: `Tem certeza que deseja excluir o registro <strong></strong> do colaborador(a) ${
          this.selectedRegistro.usuario?.username || '-'
        }?`,
        item: feedback,
        deletarTextoBotao: 'Remover',
        size: 'md',
      },
      () => {
        this.deleteRegistro(feedback.id);
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

  getDescricaoTipoRegistro(tipo: string): string {
    return (
      tipoRegistroDescricao[tipo as keyof typeof tipoRegistroDescricao] ||
      tipo ||
      '-'
    );
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
