import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Colaborador } from './colaborador';
import { ColaboradorService } from '../../../services/administrativo/colaborador.service';
import { CargoDescricoes } from './enums/cargo-descricoes';
import { ModalDeleteService } from 'src/app/services/modal/modal-delete.service';
import { AuthService } from 'src/app/services/configs/auth.service';
import { Permissao } from 'src/app/login/permissao';
import { ModalPadraoService } from 'src/app/services/modal/modal-padrao.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.css'],
})
export class FuncionariosComponent implements OnInit {
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
    this.fetchColaboradores();
    this.atualizarPaginacao();
    // já busca o perfil e define o cargo
    this.authService.obterPerfilUsuario().subscribe((usuario) => {
      this.cargoUsuario = ('ROLE_' + usuario.cargo) as Permissao;
    });
  }

  cadastrarColaborador(): void {
    this.router.navigate(['/usuario/cadastro-de-colaborador']);
  }

  onSearch(searchTerm: string) {
    if (!searchTerm || searchTerm.trim() === '') {
      this.mensagemBusca = '';
      this.fetchColaboradores();
      return;
    }
    this.isLoading = true;
    this.colaboradorService.buscarUsuariosPorNome(searchTerm).subscribe(
      (colaboradores: any[]) => {
        this.colaboradores = colaboradores;
        this.paginaAtual = 1;
        this.totalPaginas = Math.ceil(
          this.colaboradores.length / this.itensPorPagina
        );
        this.atualizarPaginacao();
        this.isLoading = false;
        if (!colaboradores || colaboradores.length === 0) {
          this.mensagemBusca = 'Busca não encontrada';
        }
      },
      (error) => {
        console.error('Erro ao buscar colaboradores:', error);
        this.isLoading = false;
        if (error.message && error.message.includes('404')) {
          this.colaboradores = [];
          this.atualizarPaginacao();
          this.mensagemBusca = 'Busca não encontrada';
        }
      }
    );
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

  visualizarUsuario(id: string): void {
    this.router.navigate(['/usuario/detalhes-colaborador', id]);
  }

  editarUsuario(id: string): void {
    this.router.navigate(['/usuario/cadastro-de-colaborador', id]);
  }

  deleteUsuario(id: string): void {
    this.colaboradorService.deleteColaboradorById(id).subscribe(
      () => {
        console.log('Usuário deletada com sucesso!');
        this.fetchColaboradores();
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

  openModalDeletar(colaborador: any): void {
    this.selectedUsuario = colaborador;

    this.modalDeleteService.openModal(
      {
        title: 'Remoção de Colaborador',
        description: `Tem certeza que deseja excluir o(a) colaborador(a) <strong>${colaborador.username}</strong>?`,
        item: colaborador,
        deletarTextoBotao: 'Remover',
        size: 'md',
      },
      () => {
        this.deleteUsuario(colaborador.id);
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

      const titulo = 'Relatório de Colaboradores';
      const dataAtual = `Exportado em: ${new Date().toLocaleDateString()}`;

      doc.setFontSize(14);
      doc.text(titulo, 14, 20);

      doc.setFontSize(10);
      doc.text(dataAtual, pageWidth - 14, 20, { align: 'right' });

      const colunas = ['Nome', 'Loja', 'Cargo', 'Departamento', 'Status'];
      const dados = this.colaboradores.map((colaborador) => [
        colaborador.username || '-',
        colaborador.loja?.nome || '-',
        colaborador.cargo || '-',
        colaborador.departamento?.nome?.toString() || '-',
        colaborador.status || '-',
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

      const nomeArquivo = `colaboradores_${dataFormatada}.pdf`;
      doc.save(nomeArquivo);
    } catch (error) {
      console.error('Erro ao exportar PDF:', error);
      alert('Erro ao exportar o relatório. Tente novamente.');
    }
  }

  openModalExportacao(): void {
    this.modalPadraoService.openModal(
      {
        title: 'Relatório de Colaboradores',
        description: `Tem certeza que deseja exportar o relatório de colaboradores em PDF?`,
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
