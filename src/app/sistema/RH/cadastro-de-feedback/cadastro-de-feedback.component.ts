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
      data: [''],
      classificacao: ['POSITIVO'],
      comportamento: [''],
      contexto: [''],
      consequencia: [''],
      conselho: [''],
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

  onSubmit(): void {
    console.log(
      'Tentando enviar formulário:',
      this.feedbackForm.value,
      'Valido?',
      this.feedbackForm.valid
    );
    if (this.feedbackForm.invalid) {
      this.isLoading = false;
      this.errorMessage = 'Preencha todos os campos obrigatórios.';
      return;
    }
    this.isLoading = true;

    const feedback: Feedback = {
      ...this.feedbackForm.value,
    };

    console.log('Formulário enviado:', feedback);

    if (this.isEditMode && this.feedbackId) {
      this.feedbacksService
        .atualizarFeedback(this.feedbackId, feedback)
        .subscribe(
          (response) => {
            this.isLoading = false;
            this.successMessage = 'Feedback atualizado com sucesso!';
            this.errorMessage = null;
            this.router.navigate(['/usuario/feedbacks'], {
              state: {
                successMessage: 'Feedback atualizado com sucesso!',
              },
            });
          },
          (error) => {
            this.isLoading = false;
            this.errorMessage =
              error.message || 'Erro ao atualizar o feedback.';
            this.successMessage = null;
          }
        );
    } else {
      this.feedbacksService.cadastrarFeedback(feedback).subscribe(
        (response) => {
          this.isLoading = false;
          this.successMessage = 'Feedback cadastrado com sucesso!';
          this.errorMessage = null;
          this.feedbackForm.reset();
          this.router.navigate(['/usuario/feedbacks'], {
            state: {
              successMessage: 'Feedback cadastrado com sucesso!',
            },
          });
        },
        (error) => {
          this.isLoading = false;
          this.errorMessage =
            error.message || 'Erro ao cadastrar o procedimento médico.';
          this.successMessage = null;
        }
      );
    }
  }

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

  private verificarModoEdicao(): void {
    this.feedbackId = this.route.snapshot.paramMap.get('id');
    if (this.feedbackId) {
      this.isEditMode = true;
      this.feedbacksService.buscarFeedbackPorId(this.feedbackId).subscribe(
        (feedback: Feedback) => {
          console.log('Dados do feedback recebido:', feedback);
          const toInputDate = (dataStr?: string) => {
            if (!dataStr) return '';
            const [dia, mes, ano] = dataStr.split('/');
            if (!dia || !mes || !ano) return '';
            return `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
          };

          this.feedbackForm.patchValue({
            ...feedback,
          });

          if (feedback.loja?.id) {
            this.onLojaSelecionada(feedback.loja.id);
            setTimeout(() => {
              this.feedbackForm.patchValue({
                usuarioId: feedback.usuario?.id || '',
              });
            }, 300);
          }

          this.tratarRetornoDTO(feedback);
        },
        (error) => {
          console.error('Erro ao buscar feedback:', error);
        }
      );
    }
  }

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

    if (feedback.usuario) {
      this.feedbackForm.patchValue({
        usuarioId: feedback.usuario.id,
      });
      this.colaboradoresDaLoja = [
        {
          value: feedback.usuario.id,
          description: feedback.usuario.username,
        },
      ];
      this.colaboradorSelectDisabled = false;
    }
  }
}
