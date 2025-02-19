import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cadastro-de-loja',
  templateUrl: './cadastro-de-loja.component.html',
  styleUrls: ['./cadastro-de-loja.component.css']
})
export class CadastroDeLojaComponent implements OnInit {

  constructor(
    private location: Location
  ) { }

  ngOnInit(): void {
  }

  goBack() {
    this.location.back();
  }

}
