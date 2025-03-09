import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Meses } from '../ferias/FeriasMesesDoAno';
import { MesesDescricoes } from '../ferias/FeriasMesesDoAnoDescricoes';

@Component({
  selector: 'app-aniversariantes',
  templateUrl: './aniversariantes.component.html',
  styleUrls: ['./aniversariantes.component.css'],
})
export class AniversariantesComponent implements OnInit {
  selectedMes: string = '';

  meses = Object.keys(Meses).map((key) => ({
    value: Meses[key as keyof typeof Meses],
    description: MesesDescricoes[Meses[key as keyof typeof Meses]],
  }));

  constructor(private router: Router) {}

  ngOnInit(): void {}

  filtrarPorMes(): void {
    // Aqui vai a lógica para filtrar os dados com base no mês selecionado
  }
}
