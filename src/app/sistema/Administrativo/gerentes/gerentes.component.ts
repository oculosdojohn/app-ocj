import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Gerente } from './gerente';
import { Colaborador } from '../funcionarios/colaborador';
import { CargoDescricoes } from '../funcionarios/enums/cargo-descricoes';
import { ColaboradorService } from '../../../services/administrativo/colaborador.service';
import { ModalDeleteService } from 'src/app/services/modal/modal-delete.service';
import { AuthService } from 'src/app/services/configs/auth.service';
import { Permissao } from 'src/app/login/permissao';
import { ModalPadraoService } from 'src/app/services/modal/modal-padrao.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-gerentes',
  templateUrl: './gerentes.component.html',
  styleUrls: ['./gerentes.component.css'],
})
export class GerentesComponent implements OnInit {
  termoBusca: string = '';
  isLoading = false;
  successMessage: string = '';
  messageTimeout: any;

  gerentes: Colaborador[] = [];

  itensPorPagina = 6;
  paginaAtual = 1;
  totalPaginas = Math.ceil(this.gerentes.length / this.itensPorPagina);
  gerentesPaginados: Colaborador[] = [];
  selectedUsuario: any = null;

  public Permissao = Permissao;
  public cargoUsuario!: Permissao;

  constructor(
    private router: Router,
    private colaboradorService: ColaboradorService,
    private modalDeleteService: ModalDeleteService,
    private authService: AuthService,
    private modalPadraoService: ModalPadraoService,
  ) {}

  ngOnInit(): void {
    this.exibirMensagemDeSucesso();
    this.fetchGerentes();
    this.atualizarPaginacao();
    // já busca o perfil e define o cargo
    this.authService.obterPerfilUsuario().subscribe((usuario) => {
      this.cargoUsuario = ('ROLE_' + usuario.cargo) as Permissao;
    });
  }

  cadastrarGerente(): void {
    this.router.navigate(['/usuario/cadastro-de-gerente']);
  }

  onSearch(searchTerm: string) {
    console.log('Search term:', searchTerm);
  }

  atualizarPaginacao(): void {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    this.gerentesPaginados = this.gerentes.slice(inicio, fim);
  }

  get totalItens() {
    return this.gerentes.length;
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

  fetchGerentes(): void {
    this.isLoading = true;

    this.colaboradorService
      .getUsuariosPorCargo(['GERENTE', 'GERENTE_GERAL', 'SUPERVISOR'])
      .subscribe(
        (colaboradores: Colaborador[]) => {
          console.log('Usuários retornados:', colaboradores);
          this.gerentes = colaboradores;
          this.totalPaginas = Math.ceil(
            this.gerentes.length / this.itensPorPagina
          );
          this.atualizarPaginacao();
          this.isLoading = false;
        },
        (error) => {
          console.error('Erro ao carregar gerentes:', error);
          this.isLoading = false;
        }
      );
  }

  visualizarUsuario(id: string): void {
    this.router.navigate(['/usuario/detalhes-colaborador', id]);
  }

  editarUsuario(id: string): void {
    this.router.navigate(['/usuario/cadastro-de-colaborador', id], {
      state: { rotaRetorno: '/usuario/gerentes-lojas' },
    });
  }

  deleteUsuario(id: string): void {
    this.colaboradorService.deleteColaboradorById(id).subscribe(
      () => {
        console.log('Usuário deletada com sucesso!');
        this.fetchGerentes();
      },
      (error) => {
        console.error('Erro ao deletar a usuário:', error);
      }
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

  openModalDeletar(gerente: any): void {
    this.selectedUsuario = gerente;

    this.modalDeleteService.openModal(
      {
        title: 'Remoção de Gerente',
        description: `Tem certeza que deseja excluir o(a) colaborador(a) <strong>${gerente.username}</strong>?`,
        item: gerente,
        deletarTextoBotao: 'Remover',
        size: 'md',
      },
      () => {
        this.deleteUsuario(gerente.id);
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

  exportarTabelaPDF(): void {
    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();

      const titulo = 'Relatório de Gerentes';
      const dataAtual = `Exportado em: ${new Date().toLocaleDateString()}`;

      doc.setFontSize(14);
      doc.text(titulo, 14, 20);

      doc.setFontSize(10);
      doc.text(dataAtual, pageWidth - 14, 20, { align: 'right' });

      const colunas = [
        'Nome',
        'Loja',
        'Cargo',
        'Departamento',
        'Status',
      ];
      const dados = this.gerentes.map((gerente) => [
        gerente.username || '-',
        gerente.loja?.nome || '-',
        gerente.cargo || '-',
        gerente.departamento?.nome?.toString() || '-',
        gerente.status || '-',
      ]);
      autoTable(doc, {
        head: [colunas],
        body: dados,
        startY: 30,
        styles: {
          fontSize: 10,
          cellPadding: 4,
          halign: 'left',
          valign: 'middle',
          lineWidth: 0.5,
          lineColor: [200, 200, 200],
        },
        headStyles: {
          fillColor: [0, 128, 41],
          textColor: [255, 255, 255],
          fontStyle: 'bold',
          lineWidth: 0,
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245],
        },
        didDrawCell: function (data) {
          const radius = 2;
          const { cell } = data;
          if (data.section === 'body' || data.section === 'head') {
            cell.styles.cellPadding = {
              top: 3,
              right: 4,
              bottom: 3,
              left: 4,
            };
          }
        },
      });

      // Rodapé
      const pageHeight = doc.internal.pageSize.height;
      doc.setFontSize(9);
      doc.text(
        '© 2025 Óculos do John. Todos os direitos reservados.',
        pageWidth / 2,
        pageHeight - 10,
        { align: 'center' }
      );

      const hoje = new Date();
      const dataFormatada =
        String(hoje.getDate()).padStart(2, '0') +
        '-' +
        String(hoje.getMonth() + 1).padStart(2, '0') +
        '-' +
        hoje.getFullYear();

      const nomeArquivo = `gerentes_${dataFormatada}.pdf`;
      doc.save(nomeArquivo);
    } catch (error) {
      console.error('Erro ao exportar PDF:', error);
      alert('Erro ao exportar o relatório. Tente novamente.');
    }
  }

  openModalExportacao(): void {
    this.modalPadraoService.openModal(
      {
        title: 'Relatório de Gerentes',
        description: `Tem certeza que deseja exportar o relatório de gerentes em PDF?`,
        item: null,
        confirmTextoBotao: 'Exportar PDF',
        size: 'md',
      },
      () => {
        this.exportarTabelaPDF();
      }
    );
  }
}
