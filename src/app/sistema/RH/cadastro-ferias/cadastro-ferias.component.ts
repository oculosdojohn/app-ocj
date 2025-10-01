import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { LojaService } from '../../../services/administrativo/loja.service';
import { Ferias } from '../ferias/ferias';
import { FeriasService } from 'src/app/services/rh/ferias.service';
import { Meses } from '../ferias/Meses';
import { MesesDescricoes } from '../ferias/MesesDescricoes';

@Component({
  selector: 'app-cadastro-ferias',
  templateUrl: './cadastro-ferias.component.html',
  styleUrls: ['./cadastro-ferias.component.css'],
})
export class CadastroFeriasComponent implements OnInit {
  feriasForm: FormGroup;
  isLoading = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  isEditMode = false;
  feriasId: string | null = null;

  lojas: { value: string; description: string }[] = [];
  selectedLoja: string = '';
  public colaboradoresDaLoja: { value: string; description: string }[] = [];
  public colaboradorSelectDisabled: boolean = true;

  meses = Object.keys(Meses).map((key) => ({
    value: Meses[key as keyof typeof Meses],
    description: MesesDescricoes[Meses[key as keyof typeof Meses]],
  }));

  selectedMes: string = '';

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private lojaService: LojaService,
    private feriasService: FeriasService
  ) {
    this.feriasForm = this.formBuilder.group({
      lojaId: ['', Validators.required],
      colaboradorId: ['', Validators.required],
      inicioAquisitivo: ['', Validators.required],
      fimAquisitivo: ['', Validators.required],
      mesReferencia: ['', Validators.required],
      anoReferencia: ['', [Validators.required]],
      diasGozo: ['', [Validators.required, Validators.min(1)]],
      abono: ['', [Validators.required, Validators.min(0)]],
      inicioFerias: ['', Validators.required],
      fimFerias: ['', Validators.required],
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
      this.feriasForm.value,
      'Valido?',
      this.feriasForm.valid
    );
    if (this.feriasForm.invalid) {
      this.isLoading = false;
      this.errorMessage = 'Preencha todos os campos obrigatórios.';
      return;
    }
    this.isLoading = true;

    const ferias: Ferias = {
      ...this.feriasForm.value,
    };

    console.log('Formulário enviado:', ferias);

    if (this.isEditMode && this.feriasId) {
      this.feriasService.atualizarFerias(this.feriasId, ferias).subscribe(
        (response) => {
          this.isLoading = false;
          this.successMessage = 'Ferias atualizada com sucesso!';
          this.errorMessage = null;
          this.router.navigate(['/usuario/ferias'], {
            state: {
              successMessage: 'Ferias atualizadas com sucesso!',
            },
          });
        },
        (error) => {
          this.isLoading = false;
          this.errorMessage = error.message || 'Erro ao atualizar ferias.';
          this.successMessage = null;
        }
      );
    } else {
      this.feriasService.cadastrarFerias(ferias).subscribe(
        (response) => {
          this.isLoading = false;
          this.successMessage = 'Ferias cadastrada com sucesso!';
          this.errorMessage = null;
          this.feriasForm.reset();
          this.router.navigate(['/usuario/ferias'], {
            state: {
              successMessage: 'Ferias cadastradas com sucesso!',
            },
          });
        },
        (error) => {
          this.isLoading = false;
          this.errorMessage = error.message || 'Erro ao cadastrar ferias.';
          this.successMessage = null;
        }
      );
    }
  }

  onLojaSelecionada(lojaId: string) {
    if (!lojaId) {
      this.colaboradoresDaLoja = [];
      this.colaboradorSelectDisabled = true;
      this.feriasForm.patchValue({ usuarioId: '' });
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
        if (!this.isEditMode || !this.feriasForm.value.usuarioId) {
          this.feriasForm.patchValue({ usuarioId: '' });
        }
      },
      error: () => {
        this.colaboradoresDaLoja = [];
        this.colaboradorSelectDisabled = true;
        this.feriasForm.patchValue({ usuarioId: '' });
      },
    });
  }

  private verificarModoEdicao(): void {
    this.feriasId = this.route.snapshot.paramMap.get('id');
    if (this.feriasId) {
      this.isEditMode = true;
      this.feriasService.buscarFeriasPorId(this.feriasId).subscribe(
        (ferias: Ferias) => {
          console.log('Dados das férias recebidos:', ferias);

          const mesFormatado = ferias.mesReferencia.toString().padStart(2, '0');

          this.selectedMes = mesFormatado;

          this.feriasForm.patchValue({
            ...ferias,
            mesReferencia: mesFormatado,
          });

          if (ferias.loja?.id) {
            this.onLojaSelecionada(ferias.loja.id);
            setTimeout(() => {
              this.feriasForm.patchValue({
                usuarioId: ferias.colaborador?.id || '',
              });
            }, 300);
          }

          this.tratarRetornoDTO(ferias);
        },
        (error) => {
          console.error('Erro ao buscar ferias:', error);
        }
      );
    }
  }

  private tratarRetornoDTO(ferias: Ferias): void {
    if (ferias.loja) {
      this.selectedLoja = ferias.loja.id;
      this.lojas = [
        {
          value: ferias.loja.id,
          description: `${ferias.loja.nome} - ${ferias.loja.endereco?.cidade}`,
        },
      ];
      this.feriasForm.patchValue({
        lojaId: ferias.loja.id,
      });
    }

    if (ferias.colaborador) {
      this.feriasForm.patchValue({
        colaboradorId: ferias.colaborador.id,
      });
      this.colaboradoresDaLoja = [
        {
          value: ferias.colaborador.id,
          description: ferias.colaborador.username,
        },
      ];
      this.colaboradorSelectDisabled = false;
    }
  }
}
