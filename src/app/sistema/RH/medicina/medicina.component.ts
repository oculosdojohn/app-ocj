import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Medicina } from './medicina';
import { AuthService } from 'src/app/services/configs/auth.service';
import { Permissao } from 'src/app/login/permissao';
import { MedicinaService } from 'src/app/services/rh/medicina.service';
import { ModalDeleteService } from 'src/app/services/modal/modal-delete.service';
import { TiposProcedimentoDescricoes } from './enums/tipoProcedimentoDescricao';
import { CID10Descricoes } from './enums/cid10-descricao';

@Component({
  selector: 'app-medicina',
  templateUrl: './medicina.component.html',
  styleUrls: ['./medicina.component.css'],
})
export class MedicinaComponent implements OnInit {
  termoBusca: string = '';
  mensagemBusca: string = '';
  isLoading = false;
  successMessage: string = '';
  messageTimeout: any;

  medicinas: Medicina[] = [];
  itensPorPagina = 6;
  paginaAtual = 1;
  totalPaginas = Math.ceil(this.medicinas.length / this.itensPorPagina);
  medicinasPaginados: Medicina[] = [];
  selectedMedicina: any = null;

  public Permissao = Permissao;
  public cargoUsuario!: Permissao;

  constructor(
    private router: Router,
    private authService: AuthService,
    private medicinaService: MedicinaService,
    private modalDeleteService: ModalDeleteService
  ) {}

  ngOnInit(): void {
    this.exibirMensagemDeSucesso();
    this.fetchMedicina();
    this.atualizarPaginacao();
    // já busca o perfil e define o cargo
    this.authService.obterPerfilUsuario().subscribe((usuario) => {
      this.cargoUsuario = ('ROLE_' + usuario.cargo) as Permissao;
    });
  }

  cadastrarExame(): void {
    this.router.navigate(['/usuario/cadastro-de-procedimentos-medicos']);
  }

  onSearch(searchTerm: string) {
    console.log('Search term:', searchTerm);
  }

  atualizarPaginacao(): void {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    this.medicinasPaginados = this.medicinas.slice(inicio, fim);
  }

  get totalItens() {
    return this.medicinas.length;
  }

  onPaginaMudou(novaPagina: number) {
    this.paginaAtual = novaPagina;
    this.atualizarPaginacao();
  }

  fetchMedicina(): void {
    this.isLoading = true;

    this.medicinaService.listarProcedimentosMedicos().subscribe(
      (medicinas: Medicina[]) => {
        console.log('Procedimentos médicos retornados:', medicinas);
        this.medicinas = medicinas;
        this.totalPaginas = Math.ceil(
          this.medicinas.length / this.itensPorPagina
        );
        this.atualizarPaginacao();
        this.isLoading = false;
      },
      (error) => {
        console.error('Erro ao carregar procedimentos médicos:', error);
        this.isLoading = false;
      }
    );
  }

  visualizarMedicina(id: string): void {
    this.router.navigate(['/usuario/detalhes-saude-ocupacional', id]);
  }

  editarMedicina(id: string): void {
    this.router.navigate(['/usuario/cadastro-de-procedimentos-medicos', id]);
  }

  deleteMedicina(id: string): void {
    const medicinaRemovida = this.medicinas.find((e) => e.id === id);
    this.medicinaService.excluirProcedimentoMedico(id).subscribe(
      () => {
        console.log('Medicina deletada com sucesso!');
        this.fetchMedicina();
        this.showMessage(
          'success',
          `Medicina "${medicinaRemovida?.tipo || ''} - ${
            medicinaRemovida?.colaborador?.username || '-'
          }" deletada com sucesso!`
        );
      },
      (error) => {
        console.error('Erro ao deletar a medicina:', error);
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

  openModalDeletar(medicina: any): void {
    this.selectedMedicina = medicina;

    this.modalDeleteService.openModal(
      {
        title: 'Remoção de Procedimento Médico',
        description: `Tem certeza que deseja excluir o procedimento médico <strong>${this.getDescricaoTipoProcedimento(
          medicina.tipo
        )}</strong> do colaborador(a) ${
          medicina.colaborador?.username || '-'
        }?`,
        item: medicina,
        deletarTextoBotao: 'Remover',
        size: 'md',
      },
      () => {
        this.deleteMedicina(medicina.id);
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

  getDescricaoTipoProcedimento(tipo: string): string {
    return (
      TiposProcedimentoDescricoes[
        tipo as keyof typeof TiposProcedimentoDescricoes
      ] ||
      tipo ||
      '-'
    );
  }

  getDescricaoCID10(cid10: string): string {
    return (
      CID10Descricoes[cid10 as keyof typeof CID10Descricoes] || cid10 || '-'
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
