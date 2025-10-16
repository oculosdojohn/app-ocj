import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Loja } from './loja';
import { Endereco } from './endereco';
import { LojaService } from '../../../services/administrativo/loja.service';
import { ModalDeleteService } from 'src/app/services/modal/modal-delete.service';
import { AuthService } from 'src/app/services/configs/auth.service';
import { Permissao } from 'src/app/login/permissao';
import { ModalPadraoService } from 'src/app/services/modal/modal-padrao.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-lojas',
  templateUrl: './lojas.component.html',
  styleUrls: ['./lojas.component.css'],
})
export class LojasComponent implements OnInit {
  termoBusca: string = '';
  mensagemBusca: string = '';
  isLoading = false;
  successMessage: string = '';
  messageTimeout: any;

  lojas: Loja[] = [];
  itensPorPagina = 6;
  paginaAtual = 1;
  totalPaginas = Math.ceil(this.lojas.length / this.itensPorPagina);
  lojasPaginados: Loja[] = [];
  selectedLoja: any = null;

  public Permissao = Permissao;
  public cargoUsuario!: Permissao;

  constructor(
    private router: Router,
    private lojaService: LojaService,
    private modalDeleteService: ModalDeleteService,
    private authService: AuthService,
    private modalPadraoService: ModalPadraoService,
  ) {}

  ngOnInit(): void {
    this.exibirMensagemDeSucesso();
    this.fetchLojas();
    this.atualizarPaginacao();
    // já busca o perfil e define o cargo
    this.authService.obterPerfilUsuario().subscribe((usuario) => {
      this.cargoUsuario = ('ROLE_' + usuario.cargo) as Permissao;
    });
  }

  cadastrarLoja(): void {
    this.router.navigate(['/usuario/cadastro-de-lojas']);
  }

  onSearch(searchTerm: string) {
    if (!searchTerm || searchTerm.trim() === '') {
      this.mensagemBusca = '';
      this.fetchLojas();
      return;
    }
    this.isLoading = true;
    this.lojaService.buscarLojasPorNome(searchTerm).subscribe(
      (lojas: Loja[]) => {
        this.lojas = lojas;
        this.paginaAtual = 1;
        this.totalPaginas = Math.ceil(this.lojas.length / this.itensPorPagina);
        this.atualizarPaginacao();
        this.isLoading = false;
        if (!lojas || lojas.length === 0) {
          this.mensagemBusca = 'Busca não encontrada';
        }
      },
      (error) => {
        console.error('Erro ao buscar lojas:', error);
        this.isLoading = false;
        if (error.message && error.message.includes('404')) {
          this.lojas = [];
          this.atualizarPaginacao();
          this.mensagemBusca = 'Busca não encontrada';
        }
      }
    );
  }

  atualizarPaginacao(): void {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    this.lojasPaginados = this.lojas.slice(inicio, fim);
  }

  get totalItens() {
    return this.lojas.length;
  }

  onPaginaMudou(novaPagina: number) {
    this.paginaAtual = novaPagina;
    this.atualizarPaginacao();
  }

  fetchLojas(): void {
    this.isLoading = true;

    this.lojaService.getLojas().subscribe(
      (lojas: any[]) => {
        console.log('Lojas retornadas:', lojas);
        this.lojas = lojas;
        this.totalPaginas = Math.ceil(this.lojas.length / this.itensPorPagina);
        this.atualizarPaginacao();
        this.isLoading = false;
      },
      (error) => {
        console.error('Erro ao carregar lojas:', error);
        this.isLoading = false;
      }
    );
  }

  visualizarLoja(id: string): void {
    this.router.navigate(['/usuario/detalhes-loja', id]);
  }

  editarLoja(id: string): void {
    this.router.navigate(['/usuario/cadastro-de-lojas', id]);
  }

  deleteLoja(id: string): void {
    const lojaRemovida = this.lojas.find((e) => e.id === id);
    this.lojaService.deleteLojaById(id).subscribe(
      () => {
        console.log('Loja deletada com sucesso!');
        this.fetchLojas();
        this.showMessage(
          'success',
          `Loja "${lojaRemovida?.nome || ''} - ${
            lojaRemovida?.endereco?.cidade || '-'
          }" deletada com sucesso!`
        );
      },
      (error) => {
        console.error('Erro ao deletar a loja:', error);
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

  openModalDeletar(loja: any): void {
    this.selectedLoja = loja;

    this.modalDeleteService.openModal(
      {
        title: 'Remoção de Loja',
        description: `Tem certeza que deseja excluir a loja <strong>${
          loja.nome
        } - ${loja.endereco?.cidade || '-'}</strong>?`,
        item: loja,
        deletarTextoBotao: 'Remover',
        size: 'md',
      },
      () => {
        this.deleteLoja(loja.id);
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

      const titulo = 'Relatório de Férias';
      const dataAtual = `Exportado em: ${new Date().toLocaleDateString()}`;

      doc.setFontSize(14);
      doc.text(titulo, 14, 20);

      doc.setFontSize(10);
      doc.text(dataAtual, pageWidth - 14, 20, { align: 'right' });

      const colunas = [
        'Nome',
        'Endereço',
        'Superior responsável',
        'Nº de funcionarios',
      ];
      const dados = this.lojas.map((loja) => [
        loja.nome || '-',
        `${loja.endereco.rua}, ${loja.endereco.numero} - ${loja.endereco.bairro}, ${loja.endereco.cidade} - ${loja.endereco.estado}, ${loja.endereco.cep}`,
        loja.supervisor?.username || '-',
        loja.quantidadeFuncionarios?.toString() || '-',
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

      const nomeArquivo = `lojas_${dataFormatada}.pdf`;
      doc.save(nomeArquivo);
    } catch (error) {
      console.error('Erro ao exportar PDF:', error);
      alert('Erro ao exportar o relatório. Tente novamente.');
    }
  }

  openModalExportacao(): void {
    this.modalPadraoService.openModal(
      {
        title: 'Relatório de Lojas',
        description: `Tem certeza que deseja exportar o relatório de lojas em PDF?`,
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
