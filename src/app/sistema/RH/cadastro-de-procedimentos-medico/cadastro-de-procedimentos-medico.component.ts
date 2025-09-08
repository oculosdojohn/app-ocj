import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { TiposProcedimento } from '../medicina/enums/tipoProcedimento';
import { TiposProcedimentoDescricoes } from '../medicina/enums/tipoProcedimentoDescricao';
import { CID10 } from '../medicina/enums/cid10';
import { CID10Descricoes } from '../medicina/enums/cid10-descricao';
import { LojaService } from '../../../services/administrativo/loja.service';
import { Medicina } from '../medicina/medicina';
import { MedicinaService } from 'src/app/services/rh/medicina.service';

@Component({
  selector: 'app-cadastro-de-procedimentos-medico',
  templateUrl: './cadastro-de-procedimentos-medico.component.html',
  styleUrls: ['./cadastro-de-procedimentos-medico.component.css'],
})
export class CadastroDeProcedimentosMedicoComponent implements OnInit {
  medicinaForm: FormGroup;
  isLoading = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  isEditMode = false;
  medicinaId: string | null = null;

  finalizado: string = 'SIM';
  apto: string = 'SIM';

  lojas: { value: string; description: string }[] = [];
  selectedLoja: string = '';
  public colaboradoresDaLoja: { value: string; description: string }[] = [];
  public colaboradorSelectDisabled: boolean = true;

  tiposProcedimento = Object.keys(TiposProcedimento).map((key) => ({
    value: TiposProcedimento[key as keyof typeof TiposProcedimento],
    description:
      TiposProcedimentoDescricoes[
        TiposProcedimento[key as keyof typeof TiposProcedimento]
      ],
  }));

  selectedTipoProcedimento: string = '';

  cid10 = Object.keys(CID10).map((key) => ({
    value: CID10[key as keyof typeof CID10],
    description: CID10Descricoes[CID10[key as keyof typeof CID10]],
  }));

  selectedCID10: string = '';

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private lojaService: LojaService,
    private medicinaService: MedicinaService
  ) {
    this.medicinaForm = this.formBuilder.group({
      lojaId: ['', Validators.required],
      usuarioId: ['', Validators.required],
      data: ['', Validators.required],
      tipo: ['', Validators.required],
      descricao: [''],
      crmDoMedico: [''],
      nomeDoMedico: [''],
      cid10: [''],
      avaliacao: [''],
      finalizado: ['SIM'],
      apto: ['SIM'],
      dataProximoExame: [''],
      numDiasAfastado: [''],
    });
  }

  ngOnInit(): void {
    this.carregarLojas();
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
    const medicina: Medicina = {
      ...this.medicinaForm.value,
    };

    console.log('Formulário enviado:', medicina);

    if (this.isEditMode && this.medicinaId) {
      this.medicinaService
        .atualizarProcedimentoMedico(this.medicinaId, medicina)
        .subscribe(
          (response) => {
            this.isLoading = false;
            this.successMessage = 'Procedimento médico atualizado com sucesso!';
            this.errorMessage = null;
            this.router.navigate(['/usuario/saude-ocupacional'], {
              state: {
                successMessage: 'Procedimento médico atualizado com sucesso!',
              },
            });
          },
          (error) => {
            this.isLoading = false;
            this.errorMessage =
              error.message || 'Erro ao atualizar o procedimento médico.';
            this.successMessage = null;
          }
        );
    } else {
      this.medicinaService.cadastrarProcedimentoMedico(medicina).subscribe(
        (response) => {
          this.isLoading = false;
          this.successMessage = 'Procedimento médico cadastrado com sucesso!';
          this.errorMessage = null;
          this.medicinaForm.reset();
          this.router.navigate(['/usuario/saude-ocupacional'], {
            state: {
              successMessage: 'Procedimento médico cadastrado com sucesso!',
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
      this.medicinaForm.patchValue({ usuarioId: '' });
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
        this.medicinaForm.patchValue({ usuarioId: '' });
      },
      error: () => {
        this.colaboradoresDaLoja = [];
        this.colaboradorSelectDisabled = true;
        this.medicinaForm.patchValue({ usuarioId: '' });
      },
    });
  }
}
