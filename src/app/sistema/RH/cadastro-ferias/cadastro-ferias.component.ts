import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cadastro-ferias',
  templateUrl: './cadastro-ferias.component.html',
  styleUrls: ['./cadastro-ferias.component.css'],
})
export class CadastroFeriasComponent implements OnInit {
  constructor(
    private location: Location
  ) {}

  ngOnInit(): void {}

  goBack() {
    this.location.back();
  }
}
