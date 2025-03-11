import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() paginaAtual: number = 1;
  @Input() totalItens: number = 0;
  @Input() itensPorPagina: number = 6;
  @Output() paginaMudou = new EventEmitter<number>();

  totalPaginas: number = 1;

  constructor() { }

  ngOnInit(): void {
    this.calcularTotalPaginas();
  }

  ngOnChanges(): void {
    this.calcularTotalPaginas();
  }

  calcularTotalPaginas() {
    this.totalPaginas = Math.ceil(this.totalItens / this.itensPorPagina);
  }

  paginaAnterior() {
    if (this.paginaAtual > 1) {
      this.paginaAtual--;
      this.paginaMudou.emit(this.paginaAtual);
    }
  }

  proximaPagina() {
    if (this.paginaAtual < this.totalPaginas) {
      this.paginaAtual++;
      this.paginaMudou.emit(this.paginaAtual);
    }
  }

  mudarPagina(pagina: number) {
    if (pagina !== this.paginaAtual) {
      this.paginaAtual = pagina;
      this.paginaMudou.emit(this.paginaAtual);
    }
  }
}
