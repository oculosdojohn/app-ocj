import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Modulos } from '../cursos/enums/modulos';
import { ModulosDescricao } from '../cursos/enums/modulos-descricao';
import { Quiz } from '../cursos/quiz';
import { ModalDeleteService } from 'src/app/services/modal/modal-delete.service';

@Component({
  selector: 'app-buscar-quizzes',
  templateUrl: './buscar-quizzes.component.html',
  styleUrls: ['./buscar-quizzes.component.css'],
})
export class BuscarQuizzesComponent implements OnInit {
  quizzes: Quiz[] = [];
  itensPorPagina = 6;
  paginaAtual = 1;
  totalPaginas = Math.ceil(this.quizzes.length / this.itensPorPagina);
  quizzesPaginados: Quiz[] = [];
  buscaRealizada = false;
  selectedQuiz: any = null;

  selectedModulo: string = '';
  modulos = Object.keys(Modulos).map((key) => ({
    value: Modulos[key as keyof typeof Modulos],
    description: ModulosDescricao[Modulos[key as keyof typeof Modulos]],
  }));

  constructor(
    private location: Location,
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
    this.quizzesPaginados = this.quizzes.slice(inicio, fim);
  }

  get totalItens() {
    return this.quizzes.length;
  }

  onPaginaMudou(novaPagina: number) {
    this.paginaAtual = novaPagina;
    this.atualizarPaginacao();
  }

  buscarQuizzes(): void {
    this.buscaRealizada = true;
    // if (this.selectedModulo) {
    //   this.cursosService.obterAulasPorModulo(this.selectedModulo).subscribe(
    //     (quizzes: Quiz[]) => {
    //       this.quizzes = quizzes;
    //       this.totalPaginas = Math.ceil(
    //         this.quizzes.length / this.itensPorPagina
    //       );
    //       this.atualizarPaginacao();
    //     },
    //     (error) => {
    //       console.error('Erro ao buscar aulas:', error);
    //       this.quizzes = [];
    //       this.totalPaginas = 0;
    //     }
    //   );
    // } else {
    //   this.quizzes = [];
    //   this.totalPaginas = 0;
    // }
  }

  limparFiltro(): void {
    this.selectedModulo = '';
    this.quizzesPaginados = [];
    this.totalPaginas = 0;
    this.buscaRealizada = false;
  }

  deleteQuiz(id: string): void {
    // this.cursosService.deletarAula(id).subscribe(
    //   (response) => {
    //     this.aulas = this.aulas.filter((aula) => aula.id !== id);
    //     this.totalPaginas = Math.ceil(this.aulas.length / this.itensPorPagina);
    //     this.atualizarPaginacao();
    //   },
    //   (error) => {
    //     console.error('Erro ao deletar aula:', error);
    //     alert('Erro ao deletar aula.');
    //   }
    // );
  }

  editarQuiz(id: string): void {
    this.router.navigate(['/usuario/cadastro-de-aulas', id]);
  }

  openModalDeletar(quiz: any): void {
    this.selectedQuiz = quiz;

    this.modalDeleteService.openModal(
      {
        title: 'Remoção de Aula',
        description: `Tem certeza que deseja excluir a questão <strong>${
          quiz.id
        }</strong> do módulo <strong>${
          ModulosDescricao[quiz.modulo as Modulos]
        }</strong>?`,
        item: quiz,
        deletarTextoBotao: 'Remover',
        size: 'md',
      },
      () => {
        this.deleteQuiz(quiz.id);
      }
    );
  }
}
