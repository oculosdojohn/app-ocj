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

  selectedArquivos: (
    | File
    | { documentoUrl: string; id: number; name: string }
  )[] = [];

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
      documentos: [[]],
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

  onArquivosSelecionados(
    arquivos: (File | { id: number; name: string; documentoUrl: string })[]
  ): void {
    this.selectedArquivos = arquivos;
    this.medicinaForm.get('documentos')?.setValue(arquivos);
    console.log('Arquivos selecionados:', arquivos);
  }

  onSubmit(): void {
    this.isLoading = true;

    const medicina: Medicina = {
      ...this.medicinaForm.value,
    };

    const formData = new FormData();
    formData.append('procedimento', JSON.stringify(medicina));

    const documentos = this.medicinaForm.get('documentos')?.value || [];
    documentos.forEach((documento: File) => {
      formData.append('documentos', documento);
    });

    console.log('Formulário enviado:', formData);

    if (this.isEditMode && this.medicinaId) {
      this.medicinaService
        .atualizarProcedimentoMedico(this.medicinaId, formData)
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
      this.medicinaService.cadastrarProcedimentoMedico(formData).subscribe(
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
        if (!this.isEditMode || !this.medicinaForm.value.usuarioId) {
          this.medicinaForm.patchValue({ usuarioId: '' });
        }
      },
      error: () => {
        this.colaboradoresDaLoja = [];
        this.colaboradorSelectDisabled = true;
        this.medicinaForm.patchValue({ usuarioId: '' });
      },
    });
  }

  private verificarModoEdicao(): void {
    this.medicinaId = this.route.snapshot.paramMap.get('id');
    if (this.medicinaId) {
      this.isEditMode = true;
      this.medicinaService
        .buscarProcedimentoMedicoPorId(this.medicinaId)
        .subscribe(
          (medicina: Medicina) => {
            console.log('Dados do procedimento médico recebido:', medicina);
            const toInputDate = (dataStr?: string) => {
              if (!dataStr) return '';
              const [dia, mes, ano] = dataStr.split('/');
              if (!dia || !mes || !ano) return '';
              return `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
            };

            this.medicinaForm.patchValue({
              ...medicina,
              data: toInputDate(medicina.data),
              dataProximoExame: toInputDate(medicina.dataProximoExame),
            });

            if (medicina.loja?.id) {
              this.onLojaSelecionada(medicina.loja.id);
              setTimeout(() => {
                this.medicinaForm.patchValue({
                  usuarioId: medicina.colaborador?.id || '',
                });
              }, 300);
            }

            this.selectedTipoProcedimento = medicina.tipo || '';
            this.selectedCID10 = medicina.cid10 || '';
            this.tratarRetornoDTO(medicina);
          },
          (error) => {
            console.error('Erro ao buscar procedimento médico:', error);
          }
        );
    }
  }

  private tratarRetornoDTO(medicina: Medicina): void {
    if (medicina.loja) {
      this.selectedLoja = medicina.loja.id;
      this.lojas = [
        {
          value: medicina.loja.id,
          description: `${medicina.loja.nome} - ${medicina.loja.endereco?.cidade}`,
        },
      ];
      this.medicinaForm.patchValue({
        lojaId: medicina.loja.id,
      });
    }

    if (medicina.colaborador) {
      this.medicinaForm.patchValue({
        usuarioId: medicina.colaborador.id,
      });
      this.colaboradoresDaLoja = [
        {
          value: medicina.colaborador.id,
          description: medicina.colaborador.username,
        },
      ];
      this.colaboradorSelectDisabled = false;
    }
  }
}
