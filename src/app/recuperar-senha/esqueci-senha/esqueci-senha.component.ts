import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ColaboradorService } from 'src/app/services/administrativo/colaborador.service';

@Component({
  selector: 'app-esqueci-senha',
  templateUrl: './esqueci-senha.component.html',
  styleUrls: ['./esqueci-senha.component.css'],
})
export class EsqueciSenhaComponent implements OnInit {
  email: string = '';
  mensagemSucesso!: string;
  errors: string[] = [];
  enviado: boolean = false;

  constructor(
    private location: Location,
    private router: Router,
    private colaboradorService: ColaboradorService
  ) {}

  ngOnInit(): void {}

  goBack() {
    this.location.back();
  }

  onSubmit() {
    this.mensagemSucesso = '';
    this.errors = [];

    if (!this.email || this.email.trim() === '') {
      this.errors = ['Informe um e-mail válido.'];
      return;
    }
    console.log('E-mail para recuperação:', this.email);

    const sub = this.colaboradorService
      .enviarRecuperacaoSenha(this.email)
      .subscribe({
        next: () => {
          this.mensagemSucesso = 'E-mail de recuperação enviado com sucesso!';
          console.log('Requisição enviada com sucesso.');
        },
        error: (err) => {
          this.errors = [
            err.message || 'Erro ao enviar e-mail de recuperação.',
          ];
          console.error('Erro na requisição:', err);
        },
      });
  }

  reenviar() {
    this.onSubmit();
  }
}
