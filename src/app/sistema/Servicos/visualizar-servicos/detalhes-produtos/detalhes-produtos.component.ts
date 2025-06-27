import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { LojinhaService } from 'src/app/services/funcionalidades/lojinha.service';
import { Produto } from '../../lojinha/produto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalhes-produtos',
  templateUrl: './detalhes-produtos.component.html',
  styleUrls: ['./detalhes-produtos.component.css'],
})
export class DetalhesProdutosComponent implements OnInit {
  produto!: Produto;

  colaboradores: any[] = [];
  itensPorPagina = 8;
  paginaAtual = 1;
  totalPaginas = Math.ceil(this.colaboradores.length / this.itensPorPagina);
  colaboradoresPaginados: any[] = [];

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private lojinhaService: LojinhaService,
    private router: Router
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

  openModalDeletar(produto: Produto): void {
    if (
      confirm(`Tem certeza que deseja excluir o produto "${produto.nome}"?`)
    ) {
      this.excluirProduto(produto.id);
    }
  }

  excluirProduto(id: string): void {
    this.lojinhaService.deleteProdutoById(id).subscribe({
      next: () => {
        alert('Produto excluído com sucesso!');
        this.location.back();
      },
      error: (err) => {
        console.error('Erro ao excluir produto:', err);
        alert('Erro ao excluir produto. Tente novamente.');
      },
    });
  }
}
