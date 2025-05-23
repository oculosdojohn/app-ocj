import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Loja } from './loja';
import { Endereco } from './endereco';
import { LojaService } from '../../../services/administrativo/loja.service';
import { ModalDeleteService } from 'src/app/services/modal/modal-delete.service';

@Component({
  selector: 'app-lojas',
  templateUrl: './lojas.component.html',
  styleUrls: ['./lojas.component.css'],
})
export class LojasComponent implements OnInit {
  termoBusca: string = '';
  mensagemBusca: string = '';
  isLoading = false;

  lojas: Loja[] = [];
  itensPorPagina = 6;
  paginaAtual = 1;
  totalPaginas = Math.ceil(this.lojas.length / this.itensPorPagina);
  lojasPaginados: Loja[] = [];
  selectedLoja: any = null;

  constructor(
    private router: Router,
    private lojaService: LojaService,
    private modalDeleteService: ModalDeleteService
  ) {}

  ngOnInit(): void {
    this.fetchLojas();
    this.atualizarPaginacao();
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
    this.lojaService.deleteLojaById(id).subscribe(
      () => {
        console.log('Loja deletada com sucesso!');
        this.fetchLojas();
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
}
