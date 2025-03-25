import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ferias } from './ferias';

@Component({
  selector: 'app-ferias',
  templateUrl: './ferias.component.html',
  styleUrls: ['./ferias.component.css'],
})
export class FeriasComponent implements OnInit {
  ferias: Ferias[] = [
    { colaborador: 'Everardo Costta', mes: 'Fevereiro', inicioFerias: '12/02/2025', fimFerias: '12/03/2025', dias: '30 dias', abono: '0 dias'},
    { colaborador: 'Everardo Costta', mes: 'Fevereiro', inicioFerias: '12/02/2025', fimFerias: '12/03/2025', dias: '30 dias', abono: '0 dias'},
    { colaborador: 'Everardo Costta', mes: 'Fevereiro', inicioFerias: '12/02/2025', fimFerias: '12/03/2025', dias: '30 dias', abono: '0 dias'},
    { colaborador: 'Everardo Costta', mes: 'Fevereiro', inicioFerias: '12/02/2025', fimFerias: '12/03/2025', dias: '30 dias', abono: '0 dias'},
    { colaborador: 'Everardo Costta', mes: 'Fevereiro', inicioFerias: '12/02/2025', fimFerias: '12/03/2025', dias: '30 dias', abono: '0 dias'},
    { colaborador: 'Everardo Costta', mes: 'Fevereiro', inicioFerias: '12/02/2025', fimFerias: '12/03/2025', dias: '30 dias', abono: '0 dias'},
    { colaborador: 'Everardo Costta', mes: 'Fevereiro', inicioFerias: '12/02/2025', fimFerias: '12/03/2025', dias: '30 dias', abono: '0 dias'},
    { colaborador: 'Everardo Costta', mes: 'Fevereiro', inicioFerias: '12/02/2025', fimFerias: '12/03/2025', dias: '30 dias', abono: '0 dias'}
  ];

  itensPorPagina = 6;
  paginaAtual = 1;
  totalPaginas = Math.ceil(this.ferias.length / this.itensPorPagina);
  feriasPaginadas: Ferias[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.atualizarPaginacao();
  }

  cadastrarFerias(): void {
    this.router.navigate(['/usuario/cadastro-de-ferias']);
  }

  atualizarPaginacao(): void {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    this.feriasPaginadas = this.ferias.slice(inicio, fim);
  }

  get totalItens() {
    return this.ferias.length;
  }

  onPaginaMudou(novaPagina: number) {
    this.paginaAtual = novaPagina;
    this.atualizarPaginacao();
  }
}
