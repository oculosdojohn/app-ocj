import { Component, OnInit } from '@angular/core';

import { Location } from '@angular/common';

@Component({
  selector: 'app-cadastro-noticias',
  templateUrl: './cadastro-noticias.component.html',
  styleUrls: ['./cadastro-noticias.component.css'],
})
export class CadastroNoticiasComponent implements OnInit {
  
  constructor(
    private location: Location
  ) {}

  ngOnInit(): void {}

  goBack() {
    this.location.back();
  }
}
