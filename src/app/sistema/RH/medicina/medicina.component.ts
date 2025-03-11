import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Medicina } from './medicina';

@Component({
  selector: 'app-medicina',
  templateUrl: './medicina.component.html',
  styleUrls: ['./medicina.component.css'],
})
export class MedicinaComponent implements OnInit {
  termoBusca: string = '';

  medicinas: Medicina[] = [
      { colaborador: 'Everardo Costta', tipo: 'Atestado médico', CID: 'R11 - Náuseas e Vômitos', data: '22/01/2025', numeroDias: '2'},
      { colaborador: 'Everardo Costta', tipo: 'Atestado médico', CID: 'R11 - Náuseas e Vômitos', data: '22/01/2025', numeroDias: '2'},
      { colaborador: 'Everardo Costta', tipo: 'Atestado médico', CID: 'R11 - Náuseas e Vômitos', data: '22/01/2025', numeroDias: '2'},
      { colaborador: 'Everardo Costta', tipo: 'Atestado médico', CID: 'R11 - Náuseas e Vômitos', data: '22/01/2025', numeroDias: '2'},
      { colaborador: 'Everardo Costta', tipo: 'Atestado médico', CID: 'R11 - Náuseas e Vômitos', data: '22/01/2025', numeroDias: '2'},
      { colaborador: 'Everardo Costta', tipo: 'Atestado médico', CID: 'R11 - Náuseas e Vômitos', data: '22/01/2025', numeroDias: '2'},
      { colaborador: 'Everardo Costta', tipo: 'Atestado médico', CID: 'R11 - Náuseas e Vômitos', data: '22/01/2025', numeroDias: '2'},
      { colaborador: 'Everardo Costta', tipo: 'Atestado médico', CID: 'R11 - Náuseas e Vômitos', data: '22/01/2025', numeroDias: '2'}
  ];
    
  itensPorPagina = 6;
  paginaAtual = 1;
  totalPaginas = Math.ceil(this.medicinas.length / this.itensPorPagina);
  medicinasPaginados: Medicina[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.atualizarPaginacao();
  }

  cadastrarExame(): void {
    this.router.navigate(['/usuario/cadastro-de-procedimentos-medicos']);
  }

  onSearch(searchTerm: string) {
    console.log('Search term:', searchTerm);
  }

  atualizarPaginacao(): void {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    this.medicinasPaginados = this.medicinas.slice(inicio, fim);
  }

  get totalItens() {
    return this.medicinas.length;
  }

  onPaginaMudou(novaPagina: number) {
    this.paginaAtual = novaPagina;
    this.atualizarPaginacao();
  }
}
