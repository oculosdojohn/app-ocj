import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Quiz } from '../cursos/quiz';
import { Modulos } from '../cursos/enums/modulos';
import { ModulosDescricao } from '../cursos/enums/modulos-descricao';
import { QuizService } from 'src/app/services/funcionalidades/quiz.service';

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
    private router: Router,
    private quizService: QuizService
  ) {
    this.cadastroQuizz = this.formBuilder.group({
      enunciado: ['', Validators.required],
      modulo: ['', Validators.required],
      valorMoedas: ['', Validators.required],
      resposta: ['', Validators.required],
      alternativaA: ['', Validators.required],
      alternativaB: ['', Validators.required],
      alternativaC: ['', Validators.required],
      alternativaD: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.cadastroQuizz.get('modulo')?.setValue(this.selectedModulo);
    this.verificarModoEdicao();
  }

  goBack() {
    this.location.back();
  }

  onSubmit() {
    const form = this.cadastroQuizz.value;

    const alternativas = this.letras.map((letra) => ({
      alternativa: letra,
      descricao: form[`alternativa${letra}`] || '',
      respostaCerta: form.resposta === letra,
    }));

    const quizzDTO = {
      id: form.id,
      modulo: form.modulo,
      enunciado: form.enunciado,
      valorMoedas: Number(form.valorMoedas),
      alternativas,
    };

    if (this.isEditMode && this.quizzId) {
      this.quizService.atualizarQuiz(this.quizzId, quizzDTO).subscribe(
        (response) => {
          this.isLoading = false;
          this.successMessage = 'Quiz atualizado com sucesso!';
          this.errorMessage = null;
          this.router.navigate(['/usuario/buscar-quizzes'], {
            state: { successMessage: 'Quiz atualizado com sucesso!' },
          });
        },
        (error) => {
          this.isLoading = false;
          this.errorMessage = error.message || 'Erro ao atualizar o quiz.';
          this.successMessage = null;
        }
      );
    } else {
      this.quizService.cadastrarQuiz(quizzDTO).subscribe(
        (response) => {
          this.isLoading = false;
          this.successMessage = 'Quiz cadastrado com sucesso!';
          this.errorMessage = null;
          this.cadastroQuizz.reset();
          this.router.navigate(['/usuario/cursos-disponiveis'], {
            state: { successMessage: 'Quiz cadastrado com sucesso!' },
          });
        },
        (error) => {
          this.isLoading = false;
          this.errorMessage = error.message || 'Erro ao cadastrar o quiz.';
          this.successMessage = null;
        }
      );
    }
  }

  isRequired(controlName: string): boolean {
    const control = this.cadastroQuizz.get(controlName);
    if (control && control.validator) {
      const validator = control.validator({} as AbstractControl);
      return !!(validator && validator['required']);
    }
    return false;
  }

  private verificarModoEdicao(): void {
    this.quizzId = this.route.snapshot.paramMap.get('id');
    if (this.quizzId) {
      this.isEditMode = true;
      this.quizService.getQuizById(Number(this.quizzId)).subscribe(
        (quiz: Quiz) => {
          console.log('Dados do quiz recebidos:', quiz);
          this.cadastroQuizz.patchValue({
            enunciado: quiz.enunciado,
            modulo: quiz.modulo,
            valorMoedas: quiz.valorMoedas,
            resposta: quiz.alternativas.find((a) => a.respostaCerta)
              ?.alternativa,
            alternativaA:
              quiz.alternativas.find((a) => a.alternativa === 'A')?.descricao ||
              '',
            alternativaB:
              quiz.alternativas.find((a) => a.alternativa === 'B')?.descricao ||
              '',
            alternativaC:
              quiz.alternativas.find((a) => a.alternativa === 'C')?.descricao ||
              '',
            alternativaD:
              quiz.alternativas.find((a) => a.alternativa === 'D')?.descricao ||
              '',
          });
          this.selectedModulo = quiz.modulo || '';
        },
        (error) => {
          console.error('Erro ao carregar os dados do quiz:', error);
        }
      );
    }
  }
}
