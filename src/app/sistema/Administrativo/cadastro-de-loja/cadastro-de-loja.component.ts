import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Loja } from '../../Administrativo/lojas/loja';
import { LojaService } from '../../../services/administrativo/loja.service';
import { Endereco } from '../../Administrativo/lojas/endereco';
import { Estado, EnderecoService } from '../../../services/endereco.service';
import { ColaboradorService } from 'src/app/services/administrativo/colaborador.service';

@Component({
  selector: 'app-cadastro-de-loja',
  templateUrl: './cadastro-de-loja.component.html',
  styleUrls: ['./cadastro-de-loja.component.css'],
})
export class CadastroDeLojaComponent implements OnInit {
  lojaForm: FormGroup;
  isLoading = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  isEditMode = false;
  lojaId: string | null = null;

  estados: { value: string; description: string }[] = [];
  cidades: { value: string; description: string }[] = [];
  responsaveis: { value: string; description: string }[] = [];
  selectedEstado: string = '';
  selectedCidade: string = '';
  selectedResponsavel: string = '';

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private lojaService: LojaService,
    private enderecoService: EnderecoService,
    private route: ActivatedRoute,
    private router: Router,
    private colaboradorService: ColaboradorService
  ) {
    this.lojaForm = this.formBuilder.group({
      nome: ['', Validators.required],
      endereco: this.formBuilder.group({
        estado: ['', Validators.required],
        cidade: ['', Validators.required],
        cep: ['', Validators.required],
        bairro: ['', Validators.required],
        rua: ['', Validators.required],
        numero: ['', Validators.required],
        logradouro: [''],
        complemento: [''],
      }),
      id_supervisor: [''],
    });
  }

  ngOnInit(): void {
    this.carregarEstadosECidades();
    this.lojaForm.get('endereco.cidade')?.disable();
    this.onEstadoChange('');
    this.verificarModoEdicao();
  }

  onEstadoChange(nome: string): void {
    const cidadeControl = this.lojaForm.get('endereco.cidade');

    console.log('onEstadoChange chamado com o estado:', nome);
    this.lojaForm.get('endereco.estado')?.setValue(nome);

    if (!nome) {
      cidadeControl?.disable();
      this.enderecoService.getTodasCidades().subscribe((cidades) => {
        this.cidades = cidades.map((cidade) => ({
          value: cidade.nome,
          description: cidade.nome,
        }));
        this.selectedCidade = '';
        cidadeControl?.setValue(null);
      });
    } else {
      cidadeControl?.enable();
      this.enderecoService.getCidadesByEstado(nome).subscribe((cidades) => {
        console.log('Cidades filtradas pelo estado:', cidades);
        this.cidades = cidades.map((cidade) => ({
          value: cidade.nome,
          description: cidade.nome,
        }));
        this.selectedCidade = '';
        cidadeControl?.setValue(null);
      });
    }
  }

  onCidadeChange(nome: string): void {
    console.log('onCidadeChange chamado com a cidade:', nome);
    this.lojaForm.get('endereco.cidade')?.setValue(nome);
  }

  goBack() {
    this.location.back();
  }

  onSubmit(): void {
    if (this.lojaForm.invalid) {
      console.log('Estado do formulário:', this.lojaForm);
      console.log('Erros nos controles:', this.lojaForm.controls);
      console.log('Erros no endereço:', this.lojaForm.get('endereco')?.errors);
      this.errorMessage = 'Por favor, preencha todos os campos obrigatórios.';
      return;
    }

    const endereco: Endereco = this.lojaForm.get('endereco')?.value as Endereco;
    console.log('Endereço:', endereco);

    const loja: Loja = {
      ...this.lojaForm.value,
      endereco: endereco,
    };

    this.isLoading = true;
    this.successMessage = null;
    this.errorMessage = null;

    if (this.isEditMode && this.lojaId) {
      this.lojaService.atualizarLoja(this.lojaId, loja).subscribe(
        (response) => {
          this.isLoading = false;
          this.successMessage = 'Loja atualizada com sucesso!';
          this.errorMessage = null;
          this.router.navigate(['/usuario/lojas-john'], {
            state: { successMessage: 'Loja atualizada com sucesso!' },
          });
        },
        (error) => {
          this.isLoading = false;
          this.errorMessage = error.message || 'Erro ao atualizar a loja.';
          this.successMessage = null;
        }
      );
    } else {
      this.lojaService.cadastrarLoja(loja).subscribe(
        (response) => {
          this.isLoading = false;
          this.successMessage = 'Loja cadastrada com sucesso!';
          this.errorMessage = null;
          this.lojaForm.reset();
        },
        (error) => {
          this.isLoading = false;
          this.errorMessage = error.message || 'Erro ao cadastrar a loja.';
          this.successMessage = null;
        }
      );
    }
  }

  isRequired(controlName: string): boolean {
    const control = this.lojaForm.get(controlName);
    if (control && control.validator) {
      const validator = control.validator({} as AbstractControl);
      return !!(validator && validator['required']);
    }
    return false;
  }

  private verificarModoEdicao(): void {
    this.lojaId = this.route.snapshot.paramMap.get('id');
    if (this.lojaId) {
      this.isEditMode = true;
      this.lojaService.getLojaById(Number(this.lojaId)).subscribe(
        (loja: Loja) => {
          console.log('Dados da loja recebidos:', loja);

          const estado = loja.endereco.estado;
          const cidade = loja.endereco.cidade;

          this.lojaForm.patchValue(loja);
          this.onEstadoChange(estado);
          this.selectedEstado = estado;
          this.carregarUsuarios();
          this.tratarRetornoDTO(loja);

          this.enderecoService
            .getCidadesByEstado(estado)
            .subscribe((cidades) => {
              this.cidades = cidades.map((cidade) => ({
                value: cidade.nome,
                description: cidade.nome,
              }));
              this.selectedCidade = cidade;
              this.lojaForm.get('endereco.cidade')?.setValue(cidade);
            });
        },
        (error) => {
          console.error('Erro ao carregar os dados da loja:', error);
        }
      );
    }
  }

  private carregarEstadosECidades(): void {
    this.enderecoService.getEstados().subscribe((estados: Estado[]) => {
      this.estados = estados.map((estado: Estado) => ({
        value: estado.sigla,
        description: estado.nome,
      }));
      console.log('Estados carregados:', this.estados);
    });

    this.onEstadoChange('');
  }

  carregarUsuarios(): void {
    this.colaboradorService.getColaboradores().subscribe(
      (usuarios) => {
        this.responsaveis = usuarios.map((usuario) => ({
          value: usuario.id,
          description: usuario.username,
        }));
      },
      (error) => {
        console.error('Erro ao carregar as usuarios:', error);
      }
    );
  }

  private tratarRetornoDTO(loja: Loja): void {
    if (loja.supervisor && loja.supervisor.id) {
      this.selectedResponsavel = loja.supervisor.id;
      this.responsaveis = [
        {
          value: loja.supervisor.id,
          description: loja.supervisor.username,
        },
        ...this.responsaveis.filter((r) => r.value !== loja.supervisor!.id),
      ];
      this.lojaForm.get('id_supervisor')?.setValue(loja.supervisor.id);
    }
  }
}
