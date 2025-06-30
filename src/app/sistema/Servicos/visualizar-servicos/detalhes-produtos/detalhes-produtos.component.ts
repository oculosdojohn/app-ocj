import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { LojinhaService } from 'src/app/services/funcionalidades/lojinha.service';
import { Produto } from '../../lojinha/produto';
import { Router } from '@angular/router';
import { ModalDeleteService } from 'src/app/services/modal/modal-delete.service';

@Component({
  selector: 'app-detalhes-produtos',
  templateUrl: './detalhes-produtos.component.html',
  styleUrls: ['./detalhes-produtos.component.css'],
})
export class DetalhesProdutosComponent implements OnInit {
  produto!: Produto;
  successMessage: string = '';
  messageTimeout: any;

  colaboradores: any[] = [];
  itensPorPagina = 8;
  paginaAtual = 1;
  totalPaginas = Math.ceil(this.colaboradores.length / this.itensPorPagina);
  colaboradoresPaginados: any[] = [];

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private lojinhaService: LojinhaService,
    private router: Router,
    private modalDeleteService: ModalDeleteService
  ) {}

  ngOnInit(): void {
    this.carregarProduto();
    this.atualizarPaginacao();
  }

  goBack() {
    this.location.back();
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

  carregarProduto(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.lojinhaService.getProdutoComHistorico(id).subscribe(
        (response) => {
          console.log('Dados do produto recebidos:', response);
          this.produto = response.produto;
          this.colaboradores = (response.resgates || []).map(
            (resgate: any) => ({
              id: resgate.id,
              username: resgate.usuario?.username || '-',
              foto: resgate.usuario?.foto || null,
              dataResgate: resgate.dataResgate || '-',
              dataEntrega: resgate.dataEntrega || '-',
              entrege:
                typeof resgate.entrege === 'boolean'
                  ? resgate.entrege
                    ? 'SIM'
                    : 'NAO'
                  : resgate.entrege || 'NAO',
              entregando: false,
            })
          );
          console.log('Colaboradores recebidos:', this.colaboradores);
          this.paginaAtual = 1;
          this.atualizarPaginacao();
          console.log('Dados do produto carregados:', this.produto);
        },
        (error) => {
          console.error('Erro ao carregar os dados do produto:', error);
        }
      );
    }
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

  marcarComoEntregue(colaborador: any): void {
    if (!colaborador.id) return;
    colaborador.entregando = true;
    this.lojinhaService.marcarEntrega(colaborador.id, true).subscribe({
      next: (dataEntrega) => {
        colaborador.dataEntrega = dataEntrega;
        colaborador.entrege = 'SIM';
        colaborador.entregando = false;
      },
      error: () => {
        colaborador.entregando = false;
      },
    });
  }

  onToggleEntregue(event: Event, colaborador: any): void {
    const checked = (event.target as HTMLInputElement).checked;
    console.log('Checkbox checked:', checked);
    colaborador.entregando = true;

    this.lojinhaService.marcarEntrega(colaborador.id, checked).subscribe({
      next: (dataEntrega) => {
        colaborador.entrege = checked ? 'SIM' : 'NAO';
        colaborador.dataEntrega = checked && dataEntrega ? dataEntrega : '';
        colaborador.entregando = false;
      },
      error: () => {
        colaborador.entregando = false;
      },
    });
  }

  editarProduto(id: string): void {
    this.router.navigate(['/usuario/cadastro-lojinha-produtos', id]);
  }

  excluirProduto(id: string): void {
    const produtoRemovido = this.produto; // Como estamos na página de detalhes, já temos o produto

    this.lojinhaService.deleteProdutoById(id).subscribe({
      next: () => {
        console.log('Produto deletado com sucesso!');
        this.showMessage(
          'success',
          `Produto "${produtoRemovido?.nome || ''}" deletado com sucesso!`
        );
        this.location.back(); // Volta para a página anterior após exclusão
      },
      error: (err) => {
        console.error('Erro ao deletar o produto:', err);
        this.showMessage('error', 'Erro ao deletar produto. Tente novamente.');
      },
    });
  }

  openModalDeletar(produto: Produto): void {
    this.modalDeleteService.openModal(
      {
        title: 'Remoção de Produto',
        description: `Tem certeza que deseja excluir o produto <strong>${produto.nome}</strong>?`,
        item: produto,
        deletarTextoBotao: 'Remover',
        size: 'md',
      },
      () => {
        this.excluirProduto(produto.id);
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
}
