import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Modulos } from '../cursos/enums/modulos';
import { ModulosDescricao } from '../cursos/enums/modulos-descricao';
import { Aula } from '../cursos/aulas';

@Component({
  selector: 'app-buscar-aulas',
  templateUrl: './buscar-aulas.component.html',
  styleUrls: ['./buscar-aulas.component.css'],
})
export class BuscarAulasComponent implements OnInit {
  aulas: Aula[] = [];
  itensPorPagina = 6;
  paginaAtual = 1;
  totalPaginas = Math.ceil(this.aulas.length / this.itensPorPagina);
  aulasPaginadas: Aula[] = [];
  buscaRealizada = false;

  selectedModulo: string = '';
  modulos = Object.keys(Modulos).map(key => ({
    value: Modulos[key as keyof typeof Modulos],
    description: ModulosDescricao[Modulos[key as keyof typeof Modulos]]
  }));

  constructor(private location: Location) {}

  ngOnInit(): void {}

  goBack() {
    this.location.back();
  }

  atualizarPaginacao(): void {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    this.aulasPaginadas = this.aulas.slice(inicio, fim);
  }

  get totalItens() {
    return this.aulas.length;
  }

  onPaginaMudou(novaPagina: number) {
    this.paginaAtual = novaPagina;
    this.atualizarPaginacao();
  }

  buscarAulas(): void {
    this.buscaRealizada = true;
    if (this.selectedModulo) {
      this.aulasPaginadas = this.aulas.filter(aula => aula.modulos === this.selectedModulo);
      this.totalPaginas = Math.ceil(this.aulasPaginadas.length / this.itensPorPagina);
      this.atualizarPaginacao();
    } else {
      this.aulasPaginadas = [];
      this.totalPaginas = 0;
    }
  }

  limparFiltro(): void {
    this.selectedModulo = '';
    this.aulasPaginadas = [];
    this.totalPaginas = 0;
    this.buscaRealizada = false;
  }
}
