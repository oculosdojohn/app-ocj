import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-esqueci-senha',
  templateUrl: './esqueci-senha.component.html',
  styleUrls: ['./esqueci-senha.component.css'],
})
export class EsqueciSenhaComponent implements OnInit {
  email: string = '';
  mensagemSucesso!: string;
  errors!: String[];

  constructor(
    private location: Location,
    private router: Router,
  ) {}

  ngOnInit(): void {}

  goBack() {
    this.location.back();
  }
}
