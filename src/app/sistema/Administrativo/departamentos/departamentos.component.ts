import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Departamento } from './departamento';
import { DepartamentoService } from '../../../services/administrativo/departamento.service';
import { ModalDeleteService } from 'src/app/services/modal/modal-delete.service';

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.css'],
})
export class DepartamentosComponent implements OnInit {
  termoBusca: string = '';
  mensagemBusca: string = '';
  isLoading = false;

  departamentos: Departamento[] = [];

  itensPorPagina = 6;
  paginaAtual = 1;
  totalPaginas = Math.ceil(this.departamentos.length / this.itensPorPagina);
  departamentosPaginados: Departamento[] = [];
  selectedDepartamento: any = null;

  constructor(
    private router: Router,
    private departamentoService: DepartamentoService,
    private modalDeleteService: ModalDeleteService
  ) {}

  ngOnInit(): void {
    this.fetchDepartamentos();
    this.atualizarPaginacao();
  }

  cadastrarDepartamento(): void {
    this.router.navigate(['/usuario/cadastro-de-departamento']);
  }

  onSearch(searchTerm: string) {
    if (!searchTerm || searchTerm.trim() === '') {
      this.mensagemBusca = '';
      this.fetchDepartamentos();
      return;
    }
    this.isLoading = true;
    this.departamentoService.buscarDepartamentosPorNome(searchTerm).subscribe(
      (departamentos: Departamento[]) => {
        this.departamentos = departamentos;
        this.paginaAtual = 1;
        this.totalPaginas = Math.ceil(
          this.departamentos.length / this.itensPorPagina
        );
        this.atualizarPaginacao();
        this.isLoading = false;
        if (!departamentos || departamentos.length === 0) {
          this.mensagemBusca = 'Busca não encontrada';
        }
      },
      (error) => {
        console.error('Erro ao buscar departamentos:', error);
        this.isLoading = false;
        if (error.message && error.message.includes('404')) {
          this.departamentos = [];
          this.atualizarPaginacao();
          this.mensagemBusca = 'Busca não encontrada';
        }
      }
    );
  }

  atualizarPaginacao(): void {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    this.departamentosPaginados = this.departamentos.slice(inicio, fim);
  }

  get totalItens() {
    return this.departamentos.length;
  }

  onPaginaMudou(novaPagina: number) {
    this.paginaAtual = novaPagina;
    this.atualizarPaginacao();
  }

  fetchDepartamentos(): void {
    this.isLoading = true;

    this.departamentoService.getDepartamentos().subscribe(
      (departamentos: any[]) => {
        console.log('departamentos retornadas:', departamentos);
        this.departamentos = departamentos;
        this.totalPaginas = Math.ceil(
          this.departamentos.length / this.itensPorPagina
        );
        this.atualizarPaginacao();
        this.isLoading = false;
      },
      (error) => {
        console.error('Erro ao carregar departamentos:', error);
        this.isLoading = false;
      }
    );
  }

  visualizarDepartamento(id: string): void {
    this.router.navigate(['/usuario/detalhes-departamento', id]);
  }

  editarDepartamento(id: string): void {
    this.router.navigate(['/usuario/cadastro-de-departamento', id]);
  }

  deleteDepartamento(id: string): void {
    this.departamentoService.deleteDepartamentoById(id).subscribe(
      () => {
        console.log('Departamento deletado com sucesso!');
        this.fetchDepartamentos();
      },
      (error) => {
        console.error('Erro ao deletar a departamento:', error);
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

  openModalDeletar(departamento: any): void {
    this.selectedDepartamento = departamento;

    this.modalDeleteService.openModal(
      {
        title: 'Remoção de Departamento',
        description: `Tem certeza que deseja excluir o departamento <strong>${departamento.nome}</strong>?`,
        item: departamento,
        deletarTextoBotao: 'Remover',
        size: 'md',
      },
      () => {
        this.deleteDepartamento(departamento.id);
      }
    );
  }
}
