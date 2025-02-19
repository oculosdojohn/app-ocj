import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cadastro-de-departamento',
  templateUrl: './cadastro-de-departamento.component.html',
  styleUrls: ['./cadastro-de-departamento.component.css']
})
export class CadastroDeDepartamentoComponent implements OnInit {
  valor: string[] = ['Responsável 1', 'Responsável 2', 'Responsável 3'];
  selectedResponsavel: string = '';

  constructor(
    private location: Location
  ) { }

  ngOnInit(): void {
  }

  goBack() {
    this.location.back();
  }

}
