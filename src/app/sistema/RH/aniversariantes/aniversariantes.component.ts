import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Meses } from '../ferias/Meses';
import { MesesDescricoes } from '../ferias/MesesDescricoes';
import { Aniversario } from './aniversario';
import { AuthService } from 'src/app/services/configs/auth.service';
import { Permissao } from 'src/app/login/permissao';
import { ColaboradorService } from 'src/app/services/administrativo/colaborador.service';
import { Colaborador } from '../../Administrativo/funcionarios/colaborador';
import { ModalPadraoService } from 'src/app/services/modal/modal-padrao.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-aniversariantes',
  templateUrl: './aniversariantes.component.html',
  styleUrls: ['./aniversariantes.component.css'],
})
export class AniversariantesComponent implements OnInit {
  selectedMes: string = '';
  mensagemBusca: string = '';
  isLoading = false;
  successMessage: string = '';
  messageTimeout: any;

  colaboradores: Colaborador[] = [];

  itensPorPagina = 6;
  paginaAtual = 1;
  totalPaginas = Math.ceil(this.colaboradores.length / this.itensPorPagina);
  colaboradoresPaginados: Colaborador[] = [];
  aniversariosFiltrados: Colaborador[] = [];

  meses = Object.keys(Meses).map((key) => ({
    value: Meses[key as keyof typeof Meses],
    description: MesesDescricoes[Meses[key as keyof typeof Meses]],
  }));

  public Permissao = Permissao;
  public cargoUsuario!: Permissao;

  constructor(
    private router: Router,
    private authService: AuthService,
    private colaboradorService: ColaboradorService,
    private modalPadraoService: ModalPadraoService
  ) {}

  ngOnInit(): void {
    this.filtrarPorMes();
    this.fetchColaboradores();

    this.authService.obterPerfilUsuario().subscribe((usuario) => {
      this.cargoUsuario = ('ROLE_' + usuario.cargo) as Permissao;
    });
  }

  filtrarPorMes(): void {
    this.isLoading = true;
    this.mensagemBusca = '';

    if (!this.selectedMes) {
      this.fetchColaboradores();
      this.isLoading = false;
      return;
    }

    const anoAtual = new Date().getFullYear();
    const dataFiltro = `${anoAtual}-${this.selectedMes}-01`;

    this.colaboradorService.getAniversariantesPorMes(dataFiltro).subscribe(
      (colaboradores: Colaborador[]) => {
        this.colaboradores = colaboradores;
        this.totalPaginas = Math.ceil(
          this.colaboradores.length / this.itensPorPagina
        );
        this.atualizarPaginacao();
        this.isLoading = false;
        if (colaboradores.length === 0) {
          this.mensagemBusca =
            'Nenhum aniversariante encontrado para o mês selecionado.';
        }
      },
      (error) => {
        this.isLoading = false;
        this.mensagemBusca = 'Erro ao buscar aniversariantes.';
        console.error(error);
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

  exportarTabelaPDF(): void {
    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();

      const titulo = 'Relatório de Aniversariantes';
      const dataAtual = `Exportado em: ${new Date().toLocaleDateString()}`;

      doc.setFontSize(14);
      doc.text(titulo, 14, 20);

      doc.setFontSize(10);
      doc.text(dataAtual, pageWidth - 14, 20, { align: 'right' });

      const colunas = [
        'Data de nascimento',
        'Colaborador',
        'Loja',
        'Departamento',
      ];
      const dados = this.colaboradores.map((colab) => [
        new Date(colab.dataNascimento).toLocaleDateString(),
        colab.username,
        `${colab.loja?.nome ?? ''} - ${colab.loja?.endereco?.cidade ?? ''}`,
        colab.departamento?.nome ?? '',
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

      const nomeArquivo = `aniversariantes_${
        this.selectedMes || 'todos'
      }_${dataFormatada}.pdf`;
      doc.save(nomeArquivo);
      // this.showSuccessMessage('Relatório exportado com sucesso!');
    } catch (error) {
      console.error('Erro ao exportar PDF:', error);
      alert('Erro ao exportar o relatório. Tente novamente.');
    }
  }

  openModalExportacao(): void {
    this.modalPadraoService.openModal(
      {
        title: 'Relatório de Aniversariantes',
        description: `Tem certeza que deseja exportar o relatório de aniversariantes em PDF?`,
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
