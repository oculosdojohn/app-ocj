import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Quiz } from '../cursos/quiz';
import { Modulos } from '../cursos/enums/modulos';
import { ModulosDescricao } from '../cursos/enums/modulos-descricao';

@Component({
  selector: 'app-cadastro-quizz',
  templateUrl: './cadastro-quizz.component.html',
  styleUrls: ['./cadastro-quizz.component.css'],
})
export class CadastroQuizzComponent implements OnInit {
  selectedModulo: string = '';
  letras: string[] = ['A', 'B', 'C', 'D'];
  alternativas: string[] = ['', '', '', ''];
  respostaCorreta: string = '';

  modulo = Object.keys(Modulos).map((key) => ({
    value: Modulos[key as keyof typeof Modulos],
    description: ModulosDescricao[Modulos[key as keyof typeof Modulos]],
  }));

  cadastroQuizz: FormGroup;
  isLoading = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  isEditMode = false;
  quizzId: string | null = null;

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.cadastroQuizz = this.formBuilder.group({
      id: [''],
      enunciado: ['', Validators.required],
      modulo: ['', Validators.required],
      qtdMoedas: ['', Validators.required],
      resposta: ['', Validators.required],
      alternativaA: ['', Validators.required],
      alternativaB: ['', Validators.required],
      alternativaC: ['', Validators.required],
      alternativaD: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  goBack() {
    this.location.back();
  }

  onSubmit() {
    console.log('Formulário enviado');
    this.isLoading = true;
    this.successMessage = null;
    this.errorMessage = null;

    const quizz = {
      ...this.cadastroQuizz.value,
      alternativas: this.alternativas,
      resposta: this.respostaCorreta,
    };

    if (this.isEditMode && this.quizzId) {
    } else {
    }
  }
}
