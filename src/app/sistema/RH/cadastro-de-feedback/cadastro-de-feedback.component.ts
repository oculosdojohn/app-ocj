import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cadastro-de-feedback',
  templateUrl: './cadastro-de-feedback.component.html',
  styleUrls: ['./cadastro-de-feedback.component.css']
})
export class CadastroDeFeedbackComponent implements OnInit {
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
