import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Gerente } from './gerente';
import { Colaborador } from '../funcionarios/colaborador';
import { CargoDescricoes } from '../funcionarios/enums/cargo-descricoes';
import { ColaboradorService } from '../../../services/administrativo/colaborador.service';

@Component({
  selector: 'app-gerentes',
  templateUrl: './gerentes.component.html',
  styleUrls: ['./gerentes.component.css'],
})
export class GerentesComponent implements OnInit {
  termoBusca: string = '';
  isLoading = false;

  gerentes: Colaborador[] = [];

  itensPorPagina = 6;
  paginaAtual = 1;
  totalPaginas = Math.ceil(this.gerentes.length / this.itensPorPagina);
  gerentesPaginados: Colaborador[] = [];

  constructor(
    private router: Router,
    private colaboradorService: ColaboradorService
  ) {}

  ngOnInit(): void {
    this.atualizarPaginacao();
    this.fetchGerentes();
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
      .getUsuariosPorCargo(['GERENTE', 'GERENTE_GERAL'])
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
    this.router.navigate(['/usuario/cadastro-de-colaborador', id]);
  }

  deleteUsuario(id: string): void {
    if (confirm('Tem certeza que deseja deletar este usuário?')) {
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
}
