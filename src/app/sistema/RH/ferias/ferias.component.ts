import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeriasMesesDoAno } from './FeriasMesesDoAno';
import { FeriasMesesDoAnoDescricoes } from './FeriasMesesDoAnoDescricoes';

@Component({
  selector: 'app-ferias',
  templateUrl: './ferias.component.html',
  styleUrls: ['./ferias.component.css']
})
export class FeriasComponent implements OnInit {

  meses = Object.values(FeriasMesesDoAno);
  mesSelecionado: FeriasMesesDoAno | '' = '';
  termoBusca: string = '';

  // Adicionando a referência correta
  feriasMesesDoAnoDescricoes = FeriasMesesDoAnoDescricoes;

  constructor(private router: Router) { } 
         
  ngOnInit(): void {
  }
         
  cadastrarDepartamento(): void {
    this.router.navigate(['/usuario/cadastro-de-departamento']); 
  }
    
  filtrarPorMes(): void {
    // Aqui vai a lógica para filtrar os dados com base no mês selecionado
  }
}
