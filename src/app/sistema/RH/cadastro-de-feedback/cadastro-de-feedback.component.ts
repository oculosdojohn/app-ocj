import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { FeedbacksService } from 'src/app/services/rh/feedbacks.service';
import { Feedback } from '../feedbaks/feedback';
import { LojaService } from '../../../services/administrativo/loja.service';

@Component({
  selector: 'app-cadastro-de-feedback',
  templateUrl: './cadastro-de-feedback.component.html',
  styleUrls: ['./cadastro-de-feedback.component.css'],
})
export class CadastroDeFeedbackComponent implements OnInit {
  feedbackForm: FormGroup;
  isLoading = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  isEditMode = false;
  feedbackId: string | null = null;

  classificacao: string = 'POSITIVO';

  lojas: { value: string; description: string }[] = [];
  selectedLoja: string = '';
  public colaboradoresDaLoja: { value: string; description: string }[] = [];
  public colaboradorSelectDisabled: boolean = true;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private feedbacksService: FeedbacksService,
    private lojaService: LojaService
  ) {
    this.feedbackForm = this.formBuilder.group({
      lojaId: ['', Validators.required],
      usuarioId: ['', Validators.required],
      data: ['', Validators.required],
      classificacao: ['POSITIVO'],
      comentario: [''],
    });
  }

  ngOnInit(): void {
    this.carregarLojas();
    this.verificarModoEdicao();
  }

  goBack() {
    this.location.back();
  }

  carregarLojas(): void {
    this.lojaService.getLojas().subscribe(
      (lojas) => {
        this.lojas = lojas.map((loja) => ({
          value: loja.id,
          description: `${loja.nome} - ${loja.endereco.cidade}`,
        }));
      },
      (error) => {
        console.error('Erro ao carregar as lojas:', error);
      }
    );
  }

  onSubmit(): void {}

  onLojaSelecionada(lojaId: string) {
    if (!lojaId) {
      this.colaboradoresDaLoja = [];
      this.colaboradorSelectDisabled = true;
      this.feedbackForm.patchValue({ usuarioId: '' });
      return;
    }

    this.lojaService.getLojaById(Number(lojaId)).subscribe({
      next: (loja) => {
        console.log(loja.colaboradores);
        this.colaboradoresDaLoja = (loja.colaboradores || []).map((colab) => ({
          value: colab.id,
          description: colab.username,
        }));
        this.colaboradorSelectDisabled = this.colaboradoresDaLoja.length === 0;
        if (!this.isEditMode || !this.feedbackForm.value.usuarioId) {
          this.feedbackForm.patchValue({ usuarioId: '' });
        }
      },
      error: () => {
        this.colaboradoresDaLoja = [];
        this.colaboradorSelectDisabled = true;
        this.feedbackForm.patchValue({ usuarioId: '' });
      },
    });
  }

  private verificarModoEdicao(): void {}

  private tratarRetornoDTO(feedback: Feedback): void {
    if (feedback.loja) {
      this.selectedLoja = feedback.loja.id;
      this.lojas = [
        {
          value: feedback.loja.id,
          description: `${feedback.loja.nome} - ${feedback.loja.endereco?.cidade}`,
        },
      ];
      this.feedbackForm.patchValue({
        lojaId: feedback.loja.id,
      });
    }

    if (feedback.colaborador) {
      this.feedbackForm.patchValue({
        usuarioId: feedback.colaborador.id,
      });
      this.colaboradoresDaLoja = [
        {
          value: feedback.colaborador.id,
          description: feedback.colaborador.username,
        },
      ];
      this.colaboradorSelectDisabled = false;
    }
  }
}
