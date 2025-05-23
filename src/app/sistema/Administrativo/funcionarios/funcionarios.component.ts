import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Colaborador } from './colaborador';
import { ColaboradorService } from '../../../services/administrativo/colaborador.service';
import { CargoDescricoes } from './enums/cargo-descricoes';
import { ModalDeleteService } from 'src/app/services/modal/modal-delete.service';

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.css'],
})
export class FuncionariosComponent implements OnInit {
  termoBusca: string = '';
  mensagemBusca: string = '';
  isLoading = false;

  colaboradores: Colaborador[] = [];

  itensPorPagina = 6;
  paginaAtual = 1;
  totalPaginas = Math.ceil(this.colaboradores.length / this.itensPorPagina);
  colaboradoresPaginados: Colaborador[] = [];
  selectedUsuario: any = null;

  constructor(
    private router: Router,
    private colaboradorService: ColaboradorService,
    private modalDeleteService: ModalDeleteService
  ) {}

  ngOnInit(): void {
    this.fetchColaboradores();
    this.atualizarPaginacao();
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

    this.colaboradorService.getColaboradores().subscribe(
      (colaboradores: any[]) => {
        console.log('usuários retornadas:', colaboradores);
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
}
