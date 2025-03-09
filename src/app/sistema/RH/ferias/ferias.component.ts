import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Meses } from './Meses';
import { MesesDescricoes } from './MesesDescricoes';

@Component({
  selector: 'app-ferias',
  templateUrl: './ferias.component.html',
  styleUrls: ['./ferias.component.css'],
})
export class FeriasComponent implements OnInit {
  meses = Object.values(Meses);
  mesSelecionado: Meses | '' = '';
  termoBusca: string = '';

  // Adicionando a referência correta
  mesesDescricoes = MesesDescricoes;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  cadastrarDepartamento(): void {
    this.router.navigate(['/usuario/cadastro-de-departamento']);
  }

  filtrarPorMes(): void {
    // Aqui vai a lógica para filtrar os dados com base no mês selecionado
  }
}
