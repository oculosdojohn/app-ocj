import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeriasMesesDoAno } from '../ferias/FeriasMesesDoAno';
import { FeriasMesesDoAnoDescricoes } from '../ferias/FeriasMesesDoAnoDescricoes';

@Component({
  selector: 'app-aniversariantes',
  templateUrl: './aniversariantes.component.html',
  styleUrls: ['./aniversariantes.component.css'],
})
export class AniversariantesComponent implements OnInit {
  meses = Object.values(FeriasMesesDoAno);
  mesSelecionado: FeriasMesesDoAno | '' = '';
  termoBusca: string = '';

  // Adicionando a referência correta
  feriasMesesDoAnoDescricoes = FeriasMesesDoAnoDescricoes;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  filtrarPorMes(): void {
    // Aqui vai a lógica para filtrar os dados com base no mês selecionado
  }
}
