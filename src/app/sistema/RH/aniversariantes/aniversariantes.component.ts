import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Meses } from '../ferias/Meses';
import { MesesDescricoes } from '../ferias/MesesDescricoes';
import { Aniversario } from './aniversario';

@Component({
  selector: 'app-aniversariantes',
  templateUrl: './aniversariantes.component.html',
  styleUrls: ['./aniversariantes.component.css'],
})
export class AniversariantesComponent implements OnInit {
  selectedMes: string = '';

  aniversarios: Aniversario[] = [
      { data: '22/01/1999', colaborador: 'Everardo Costta', loja: 'Óculos do John LTDA', departamento: 'Marketing'},
      { data: '22/02/1999', colaborador: 'Everardo Costta', loja: 'Óculos do John LTDA', departamento: 'Marketing'},
      { data: '22/02/1999', colaborador: 'Everardo Costta', loja: 'Óculos do John LTDA', departamento: 'Marketing'},
      { data: '22/01/1999', colaborador: 'Everardo Costta', loja: 'Óculos do John LTDA', departamento: 'Marketing'},
      { data: '22/07/1999', colaborador: 'Everardo Costta', loja: 'Óculos do John LTDA', departamento: 'Marketing'},
      { data: '22/01/1999', colaborador: 'Everardo Costta', loja: 'Óculos do John LTDA', departamento: 'Marketing'},
      { data: '22/01/1999', colaborador: 'Everardo Costta', loja: 'Óculos do John LTDA', departamento: 'Marketing'},
      { data: '22/01/1999', colaborador: 'Everardo Costta', loja: 'Óculos do John LTDA', departamento: 'Marketing'}
  ];

  itensPorPagina = 6;
  paginaAtual = 1;
  totalPaginas = Math.ceil(this.aniversarios.length / this.itensPorPagina);
  aniversariosPaginados: Aniversario[] = [];

  meses = Object.keys(Meses).map((key) => ({
    value: Meses[key as keyof typeof Meses],
    description: MesesDescricoes[Meses[key as keyof typeof Meses]],
  }));

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.atualizarPaginacao();
  }

  filtrarPorMes(): void {}

  atualizarPaginacao(): void {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    this.aniversariosPaginados = this.aniversarios.slice(inicio, fim);
  }

  get totalItens() {
    return this.aniversarios.length;
  }

  onPaginaMudou(novaPagina: number) {
    this.paginaAtual = novaPagina;
    this.atualizarPaginacao();
  }
}
