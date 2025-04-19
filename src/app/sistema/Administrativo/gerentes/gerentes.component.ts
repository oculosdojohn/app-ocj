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

  fetchGerentes(): void {
    this.colaboradorService.getUsuariosPorCargo('GERENTE').subscribe(
      (colaboradores: any[]) => {
        console.log('usuários retornadas:', colaboradores);
        this.gerentes = colaboradores;
        this.totalPaginas = Math.ceil(
          this.gerentes.length / this.itensPorPagina
        );
        this.atualizarPaginacao();
      },
      (error) => {
        console.error('Erro ao carregar departamentos:', error);
      }
    );
  }
}
