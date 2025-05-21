import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Modulos } from '../cursos/enums/modulos';
import { ModulosDescricao } from '../cursos/enums/modulos-descricao';
import { Aula } from '../cursos/aulas';
import { CursosService } from 'src/app/services/funcionalidades/cursos.service';
import { ModalDeleteService } from 'src/app/services/modal/modal-delete.service';

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
  selectedAula: any = null;

  selectedModulo: string = '';
  modulos = Object.keys(Modulos).map((key) => ({
    value: Modulos[key as keyof typeof Modulos],
    description: ModulosDescricao[Modulos[key as keyof typeof Modulos]],
  }));

  constructor(
    private location: Location,
    private cursosService: CursosService,
    private router: Router,
    private modalDeleteService: ModalDeleteService
  ) {}

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
      this.cursosService.obterAulasPorModulo(this.selectedModulo).subscribe(
        (aulas: Aula[]) => {
          this.aulas = aulas;
          this.totalPaginas = Math.ceil(
            this.aulas.length / this.itensPorPagina
          );
          this.atualizarPaginacao();
        },
        (error) => {
          console.error('Erro ao buscar aulas:', error);
          this.aulas = [];
          this.totalPaginas = 0;
        }
      );
    } else {
      this.aulas = [];
      this.totalPaginas = 0;
    }
  }

  limparFiltro(): void {
    this.selectedModulo = '';
    this.aulasPaginadas = [];
    this.totalPaginas = 0;
    this.buscaRealizada = false;
  }

  deleteAula(id: string): void {
    this.cursosService.deletarAula(id).subscribe(
      (response) => {
        this.aulas = this.aulas.filter((aula) => aula.id !== id);
        this.totalPaginas = Math.ceil(this.aulas.length / this.itensPorPagina);
        this.atualizarPaginacao();
      },
      (error) => {
        console.error('Erro ao deletar aula:', error);
        alert('Erro ao deletar aula.');
      }
    );
  }

  editarAula(id: string): void {
    this.router.navigate(['/usuario/cadastro-de-aulas', id]);
  }

  openModalDeletar(aula: any): void {
    this.selectedAula = aula;

    this.modalDeleteService.openModal(
      {
        title: 'Remoção de Aula',
        description: `Tem certeza que deseja excluir a aula <strong>${
          aula.titulo
        }</strong> do módulo <strong>${
          ModulosDescricao[aula.modulo as Modulos]
        }</strong>?`,
        item: aula,
        deletarTextoBotao: 'Remover',
        size: 'md',
      },
      () => {
        this.deleteAula(aula.id);
      }
    );
  }
}
