import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Demissao } from './demissoes';
import { CargoDescricoes } from '../../Administrativo/funcionarios/enums/cargo-descricoes';
import { AuthService } from 'src/app/services/configs/auth.service';
import { Permissao } from 'src/app/login/permissao';
import { ModalCadastroService } from 'src/app/services/modal/modal-cadastro.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ColaboradorService } from 'src/app/services/administrativo/colaborador.service';
import { Colaborador } from '../../Administrativo/funcionarios/colaborador';
import { TipoDemissao } from './enums/tipo-demissao';
import { TipoDemissaoDescricoes } from './enums/tipo-demissao-descricao';

@Component({
  selector: 'app-demissoes',
  templateUrl: './demissoes.component.html',
  styleUrls: ['./demissoes.component.css'],
})
export class DemissoesComponent implements OnInit {
  demissaoForm: FormGroup;
  termoBusca: string = '';
  mensagemBusca: string = '';
  isLoading = false;
  successMessage: string = '';
  messageTimeout: any;

  colaboradores: Colaborador[] = [];

  itensPorPagina = 6;
  paginaAtual = 1;
  totalPaginas = Math.ceil(this.colaboradores.length / this.itensPorPagina);
  colaboradoresPaginados: Colaborador[] = [];

  public Permissao = Permissao;
  public cargoUsuario!: Permissao;

  @ViewChild('formCadastroTemplate') formCadastroTemplate!: TemplateRef<any>;

  tiposDemissao = Object.keys(TipoDemissao).map((key) => ({
    value: TipoDemissao[key as keyof typeof TipoDemissao],
    description:
      TipoDemissaoDescricoes[TipoDemissao[key as keyof typeof TipoDemissao]],
  }));
  selectedTipoDemissao: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private modalCadastroService: ModalCadastroService,
    private formBuilder: FormBuilder,
    private colaboradorService: ColaboradorService
  ) {
    this.demissaoForm = this.formBuilder.group({
      dataSaida: [''],
      valorRecisao: [''],
      valorMulta: [''],
      tipoDemissao: [''],
      observacao: [''],
    });
  }

  ngOnInit(): void {
    this.exibirMensagemDeSucesso();
    this.fetchColaboradores();
    this.atualizarPaginacao();
    // já busca o perfil e define o cargo
    this.authService.obterPerfilUsuario().subscribe((usuario) => {
      this.cargoUsuario = ('ROLE_' + usuario.cargo) as Permissao;
    });
  }

  onSearch(searchTerm: string) {
    console.log('Search term:', searchTerm);
  }

  atualizarPaginacao(): void {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    this.colaboradoresPaginados = this.colaboradores.slice(inicio, fim);
  }

  get totalItens() {
    return this.colaboradores.length;
  }

  onPaginaMudou(novaPagina: number) {
    this.paginaAtual = novaPagina;
    this.atualizarPaginacao();
  }

  getDescricaoCargo(cargo: string): string {
    return (
      CargoDescricoes[cargo as keyof typeof CargoDescricoes] ||
      'Cargo desconhecido'
    );
  }

  getInitial(name: string): string {
    return name ? name.charAt(0).toUpperCase() : '?';
  }

  getRandomColor(seed: string): string {
    const colors = [
      '#FFB3BA', // Rosa pastel
      '#FFDFBA', // Laranja pastel
      '#BAFFC9', // Verde pastel
      '#BAE1FF', // Azul pastel
      '#D5BAFF', // Roxo pastel
    ];
    const index = seed ? seed.charCodeAt(0) % colors.length : 0;
    return colors[index];
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

  fetchColaboradores(): void {
    this.isLoading = true;

    this.colaboradorService.getUsuariosPorCargoNotIn(['ADMIN']).subscribe(
      (colaboradores: any[]) => {
        console.log('usuários retornados:', colaboradores);
        this.colaboradores = colaboradores;
        this.totalPaginas = Math.ceil(
          this.colaboradores.length / this.itensPorPagina
        );
        this.atualizarPaginacao();
        this.isLoading = false;
      },
      (error) => {
        console.error('Erro ao carregar colaboradores:', error);
        this.isLoading = false;
      }
    );
  }

  openModalCadastro(colaborador: Colaborador): void {
    this.colaboradorService
      .getColaboradorById(Number(colaborador.id))
      .subscribe((colab) => {
        this.demissaoForm.reset();
        this.modalCadastroService.openModal(
          {
            title: 'Demitir colaborador',
            description: `Preencha os dados da demissão do(a) <strong>${colab.username}</strong>`,
            size: 'lg',
          },
          () => this.onSubmit(colab),
          this.formCadastroTemplate
        );
      });
  }

  onSubmit(colab: Colaborador): void {
    if (this.demissaoForm.invalid) return;

    const dadosDemissao = {
      ...this.demissaoForm.value,
      colaboradorId: colab.id,
    };
    this.modalCadastroService.closeModal();
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
}
