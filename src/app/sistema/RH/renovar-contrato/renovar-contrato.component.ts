import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Renovacao } from './renovacao';
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
import { PeriodoExperienciaDescricoes } from '../../Administrativo/funcionarios/enums/periodo-experiencia-descricoes';
import { PeriodoExperiencia } from '../../Administrativo/funcionarios/enums/periodo-experiencia';

@Component({
  selector: 'app-renovar-contrato',
  templateUrl: './renovar-contrato.component.html',
  styleUrls: ['./renovar-contrato.component.css'],
})
export class RenovarContratoComponent implements OnInit {
  renovacaoForm: FormGroup;
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

  periodosExperiencia = Object.keys(PeriodoExperiencia).map((key) => ({
    value: PeriodoExperiencia[key as keyof typeof PeriodoExperiencia],
    description:
      PeriodoExperienciaDescricoes[
        PeriodoExperiencia[key as keyof typeof PeriodoExperiencia]
      ],
  }));
  selectedPeriodoExperiencia: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private modalCadastroService: ModalCadastroService,
    private formBuilder: FormBuilder,
    private colaboradorService: ColaboradorService
  ) {
    this.renovacaoForm = this.formBuilder.group({
      periodoDeExperiencia: [''],
      dataDoContrato: [''],
      duracaoDoContrato: [''],
      dataTerminoDoContrato: [''],
    });
  }

  ngOnInit(): void {
    this.exibirMensagemDeSucesso();
    this.fetchColaboradores();
    this.atualizarPaginacao();
    this.registrarListenersDoFormulario();
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
        this.renovacaoForm.reset();
        this.modalCadastroService.openModal(
          {
            title: 'Renovar contrato do colaborador',
            description: `Preencha os dados da renovação do contrato do(a) <strong>${colab.username}</strong>`,
            size: 'lg',
          },
          () => this.onSubmit(colab),
          this.formCadastroTemplate
        );
      });
  }

  onSubmit(colab: Colaborador): void {
    if (this.renovacaoForm.invalid) return;

    const dadosRenovacao = {
      ...this.renovacaoForm.value,
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

  obterDiasPorPeriodo(periodo: PeriodoExperiencia): number {
    switch (periodo) {
      case PeriodoExperiencia.QUARENTA_CINCO_DIAS:
        return 45;
      case PeriodoExperiencia.MAIS_QUARENTA_CINCO:
        return 90;
      case PeriodoExperiencia.NOVENTA_DIAS:
        return 90;
      case PeriodoExperiencia.NAO_SE_APLICA:
      default:
        return 0;
    }
  }

  calcularDataTermino(): void {
    const dataInicio = this.renovacaoForm.get('dataDoContrato')?.value;
    const periodo = this.renovacaoForm.get('periodoDeExperiencia')?.value;
    const dias = this.obterDiasPorPeriodo(periodo);

    if (dataInicio && dias > 0) {
      const inicio = new Date(dataInicio);
      const termino = new Date(inicio);
      termino.setDate(inicio.getDate() + dias);
      this.renovacaoForm
        .get('dataTerminoDoContrato')
        ?.setValue(termino.toISOString().split('T')[0]);
    } else {
      this.renovacaoForm.get('dataTerminoDoContrato')?.reset();
    }
  }

  private registrarListenersDoFormulario(): void {
    this.renovacaoForm
      .get('periodoDeExperiencia')
      ?.valueChanges.subscribe((value) => {
        const dias = this.obterDiasPorPeriodo(value);
        this.renovacaoForm
          .get('duracaoDoContrato')
          ?.setValue(dias > 0 ? dias : null);
        this.calcularDataTermino();
      });

    this.renovacaoForm.get('dataDoContrato')?.valueChanges.subscribe(() => {
      this.calcularDataTermino();
    });
  }
}
