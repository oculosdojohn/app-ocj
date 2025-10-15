import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ferias } from './ferias';
import { AuthService } from 'src/app/services/configs/auth.service';
import { Permissao } from 'src/app/login/permissao';
import { FeriasService } from 'src/app/services/rh/ferias.service';
import { ModalDeleteService } from 'src/app/services/modal/modal-delete.service';
import { Meses } from './Meses';
import { MesesDescricoes } from './MesesDescricoes';
import { ModalPadraoService } from 'src/app/services/modal/modal-padrao.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-ferias',
  templateUrl: './ferias.component.html',
  styleUrls: ['./ferias.component.css'],
  providers: [DatePipe],
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

  selectedMes: string = '';
  inicioFiltro: string = '';
  fimFiltro: string = '';
  private filtroTimeout: any;

  public Permissao = Permissao;
  public cargoUsuario!: Permissao;

  constructor(
    private router: Router,
    private authService: AuthService,
    private feriasService: FeriasService,
    private modalDeleteService: ModalDeleteService,
    private modalPadraoService: ModalPadraoService,
    private datePipe: DatePipe
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
    this.feriasService.deletarFerias(id).subscribe(
      () => {
        console.log('Férias deletadas com sucesso!');
        this.fetchFerias();
        this.showMessage(
          'success',
          `Férias "${feriasRemovidas?.mesReferencia || ''} - ${
            feriasRemovidas?.colaborador?.username || '-'
          }" deletada com sucesso!`
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

  getDescricaoMes(mes: string | number): string {
    if (!mes) return '-';
    const mesFormatado = mes.toString().padStart(2, '0');

    return (
      MesesDescricoes[mesFormatado as keyof typeof MesesDescricoes] ||
      mes.toString() ||
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

  formatarData(data: string): string {
    if (!data) return '-';
    return this.datePipe.transform(data, 'dd/MM/yyyy') || '-';
  }

  // Corrija o método exportarTabelaPDF
  exportarTabelaPDF(): void {
    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();

      const titulo = 'Relatório de Férias';
      const dataAtual = `Exportado em: ${new Date().toLocaleDateString()}`;

      doc.setFontSize(14);
      doc.text(titulo, 14, 20);

      doc.setFontSize(10);
      doc.text(dataAtual, pageWidth - 14, 20, { align: 'right' });

      const colunas = ['Colaborador', 'Mês', 'Inicio', 'Fim', 'Dias', 'Abono'];
      const dados = this.feriasPaginadas.map((ferias) => [
        ferias.colaborador?.username || '-',
        this.getDescricaoMes(ferias.mesReferencia || '-'),
        this.formatarData(ferias.inicioFerias) || '-',
        this.formatarData(ferias.fimFerias) || '-',
        ferias.diasGozo?.toString() || '-',
        ferias.abono?.toString() || '-',
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

      const nomeArquivo = `ferias_${
        this.selectedMes || 'todos'
      }_${dataFormatada}.pdf`;
      doc.save(nomeArquivo);
    } catch (error) {
      console.error('Erro ao exportar PDF:', error);
      alert('Erro ao exportar o relatório. Tente novamente.');
    }
  }

  openModalExportacao(): void {
    this.modalPadraoService.openModal(
      {
        title: 'Relatório de Férias',
        description: `Tem certeza que deseja exportar o relatório de férias em PDF?`,
        item: null,
        confirmTextoBotao: 'Exportar PDF',
        size: 'md',
      },
      () => {
        this.exportarTabelaPDF();
      }
    );
  }

  onRangeChange(): void {
    // debounce para evitar múltiplas chamadas
    if (this.filtroTimeout) clearTimeout(this.filtroTimeout);
    this.filtroTimeout = setTimeout(() => this.aplicarFiltroDatas(), 250);
  }

  aplicarFiltroDatas(): void {
    // Se nada selecionado, volta à lista completa
    if (!this.inicioFiltro && !this.fimFiltro) {
      this.fetchFerias();
      return;
    }

    // Validação simples: início não pode ser depois do fim
    if (
      this.inicioFiltro &&
      this.fimFiltro &&
      this.inicioFiltro > this.fimFiltro
    ) {
      this.mensagemBusca = 'Data inicial não pode ser maior que a data final.';
      return;
    }

    this.isLoading = true;
    this.mensagemBusca = '';

    this.feriasService
      .listarFeriasComFiltros(
        this.inicioFiltro || undefined,
        this.fimFiltro || undefined
      )
      .subscribe(
        (lista) => {
          this.ferias = lista || [];
          this.paginaAtual = 1;
          this.totalPaginas = Math.ceil(
            this.ferias.length / this.itensPorPagina
          );
          this.atualizarPaginacao();
          if (this.ferias.length === 0) {
            const ini = this.inicioFiltro || 'início não informado';
            const fim = this.fimFiltro || 'fim não informado';
            this.mensagemBusca = `Nenhuma férias encontrada no período (${ini} a ${fim}).`;
          }
          this.isLoading = false;
        },
        (error) => {
          console.error('Erro ao filtrar por período:', error);
          this.mensagemBusca = 'Erro ao filtrar por período.';
          this.ferias = [];
          this.atualizarPaginacao();
          this.isLoading = false;
        }
      );
  }

  limparFiltroDatas(): void {
    this.inicioFiltro = '';
    this.fimFiltro = '';
    this.mensagemBusca = '';
    this.fetchFerias();
  }
}
