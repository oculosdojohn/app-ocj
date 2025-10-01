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
import { Registro } from '../registros/registro';
import { RegistrosService } from 'src/app/services/rh/registros.service';
import { TipoRegistro } from '../registros/enums/tipoRegistro';
import { tipoRegistroDescricao } from '../registros/enums/tipoRegistro-descricao';

@Component({
  selector: 'app-cadastro-de-registro',
  templateUrl: './cadastro-de-registro.component.html',
  styleUrls: ['./cadastro-de-registro.component.css'],
})
export class CadastroDeRegistroComponent implements OnInit {
  registroForm: FormGroup;
  isLoading = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  isEditMode = false;
  registroId: string | null = null;

  classificacao: string = 'POSITIVO';

  lojas: { value: string; description: string }[] = [];
  selectedLoja: string = '';
  public colaboradoresDaLoja: { value: string; description: string }[] = [];
  public colaboradorSelectDisabled: boolean = true;

  tiposRegistro = Object.keys(TipoRegistro).map((key) => ({
    value: TipoRegistro[key as keyof typeof TipoRegistro],
    description:
      tipoRegistroDescricao[TipoRegistro[key as keyof typeof TipoRegistro]],
  }));

  selectedTipoRegistro: string = '';

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private lojaService: LojaService,
    private registrosService: RegistrosService
  ) {
    this.registroForm = this.formBuilder.group({
      lojaId: ['', Validators.required],
      colaboradorId: ['', Validators.required],
      data: [''],
      classificacao: ['POSITIVO'],
      comentario: [''],
      tipo: ['', Validators.required],
      valorQtdHs: [''],
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
      this.registroForm.value,
      'Valido?',
      this.registroForm.valid
    );
    if (this.registroForm.invalid) {
      this.isLoading = false;
      this.errorMessage = 'Preencha todos os campos obrigatórios.';
      return;
    }
    this.isLoading = true;

    const registro: Registro = {
      ...this.registroForm.value,
    };

    console.log('Formulário enviado:', registro);

    if (this.isEditMode && this.registroId) {
      this.registrosService
        .atualizarRegistro(this.registroId, registro)
        .subscribe(
          (response) => {
            this.isLoading = false;
            this.successMessage = 'Registro atualizado com sucesso!';
            this.errorMessage = null;
            this.router.navigate(['/usuario/registros'], {
              state: {
                successMessage: 'Registro atualizado com sucesso!',
              },
            });
          },
          (error) => {
            this.isLoading = false;
            this.errorMessage =
              error.message || 'Erro ao atualizar o registro.';
            this.successMessage = null;
          }
        );
    } else {
      this.registrosService.cadastrarRegistro(registro).subscribe(
        (response) => {
          this.isLoading = false;
          this.successMessage = 'Registro cadastrado com sucesso!';
          this.errorMessage = null;
          this.registroForm.reset();
          this.router.navigate(['/usuario/registros'], {
            state: {
              successMessage: 'Registro cadastrado com sucesso!',
            },
          });
        },
        (error) => {
          this.isLoading = false;
          this.errorMessage = error.message || 'Erro ao cadastrar o registro.';
          this.successMessage = null;
        }
      );
    }
  }

  onLojaSelecionada(lojaId: string) {
    if (!lojaId) {
      this.colaboradoresDaLoja = [];
      this.colaboradorSelectDisabled = true;
      this.registroForm.patchValue({ usuarioId: '' });
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
        if (!this.isEditMode || !this.registroForm.value.usuarioId) {
          this.registroForm.patchValue({ usuarioId: '' });
        }
      },
      error: () => {
        this.colaboradoresDaLoja = [];
        this.colaboradorSelectDisabled = true;
        this.registroForm.patchValue({ usuarioId: '' });
      },
    });
  }

  private verificarModoEdicao(): void {
    this.registroId = this.route.snapshot.paramMap.get('id');
    if (this.registroId) {
      this.isEditMode = true;
      this.registrosService.buscarRegistroPorId(this.registroId).subscribe(
        (registro: Registro) => {
          console.log('Dados do registro recebido:', registro);
          const toInputDate = (dataStr?: string) => {
            if (!dataStr) return '';
            const [dia, mes, ano] = dataStr.split('/');
            if (!dia || !mes || !ano) return '';
            return `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
          };

          this.registroForm.patchValue({
            ...registro,
            data: toInputDate(registro.data),
          });

          if (registro.loja?.id) {
            this.onLojaSelecionada(registro.loja.id);
            setTimeout(() => {
              this.registroForm.patchValue({
                usuarioId: registro.usuario?.id || '',
              });
            }, 300);
          }

          this.selectedTipoRegistro = registro.tipo || '';
          this.tratarRetornoDTO(registro);
        },
        (error) => {
          console.error('Erro ao buscar registro:', error);
        }
      );
    }
  }

  private tratarRetornoDTO(registro: Registro): void {
    if (registro.loja) {
      this.selectedLoja = registro.loja.id;
      this.lojas = [
        {
          value: registro.loja.id,
          description: `${registro.loja.nome} - ${registro.loja.endereco?.cidade}`,
        },
      ];
      this.registroForm.patchValue({
        lojaId: registro.loja.id,
      });
    }

    if (registro.usuario) {
      this.registroForm.patchValue({
        colaboradorId: registro.usuario.id,
      });
      this.colaboradoresDaLoja = [
        {
          value: registro.usuario.id,
          description: registro.usuario.username,
        },
      ];
      this.colaboradorSelectDisabled = false;
    }
  }
}
