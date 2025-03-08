import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cadastro-de-procedimentos-medico',
  templateUrl: './cadastro-de-procedimentos-medico.component.html',
  styleUrls: ['./cadastro-de-procedimentos-medico.component.css'],
})
export class CadastroDeProcedimentosMedicoComponent implements OnInit {
  finalizado: string = 'sim';
  apto: string = 'sim';


  constructor(
    private location: Location
  ) {}

  ngOnInit(): void {}

  goBack() {
    this.location.back();
  }
}
