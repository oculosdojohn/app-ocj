import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cadastro-de-registro',
  templateUrl: './cadastro-de-registro.component.html',
  styleUrls: ['./cadastro-de-registro.component.css']
})
export class CadastroDeRegistroComponent implements OnInit {
  classificacao: string = 'positivo';

  constructor(
    private location: Location
  ) { }

  ngOnInit(): void {
  }

  goBack() {
    this.location.back();
  }

}
