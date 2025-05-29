import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Departamento } from '../../Administrativo/departamentos/departamento';
import { DepartamentoService } from '../../../services/administrativo/departamento.service';
import { ColaboradorService } from 'src/app/services/administrativo/colaborador.service';

@Component({
  selector: 'app-cadastro-de-departamento',
  templateUrl: './cadastro-de-departamento.component.html',
  styleUrls: ['./cadastro-de-departamento.component.css'],
})
export class CadastroDeDepartamentoComponent implements OnInit {
  departamentoForm: FormGroup;
  isLoading = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  isEditMode = false;
  departamentoId: string | null = null;

  responsaveis: { value: string; description: string }[] = [];
  selectedResponsavel: string = '';

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private departamentoService: DepartamentoService,
    private colaboradoresService: ColaboradorService
  ) {
    this.departamentoForm = this.formBuilder.group({
      nome: ['', Validators.required],
      descricao: [''],
      orcamentoMensal: [''],
      telefone: [''],
      email: ['', Validators.email],
      localizacao: [''],
      responsaveis: [[]],
    });
  }

  ngOnInit(): void {
    this.carregarUsuarios();
    this.verificarModoEdicao();
  }

  goBack() {
    this.location.back();
  }

  onSubmit(): void {
    if (this.departamentoForm.invalid) {
      this.errorMessage = 'Por favor, preencha todos os campos obrigatórios.';
      return;
    }

    const responsaveisSelecionados = Array.isArray(
      this.departamentoForm.value.responsaveis
    )
      ? this.departamentoForm.value.responsaveis.map((r: any) => r.value)
      : [];

    const departamento: Departamento = {
      ...this.departamentoForm.value,
      responsaveis: responsaveisSelecionados,
    };
    console.log('Payload enviado:', departamento);

    this.isLoading = true;
    this.successMessage = null;
    this.errorMessage = null;

    if (this.isEditMode && this.departamentoId) {
      this.departamentoService
        .atualizarDepartamento(this.departamentoId, departamento)
        .subscribe(
          (response) => {
            this.isLoading = false;
            this.successMessage = 'Departamento atualizado com sucesso!';
            this.errorMessage = null;
            this.router.navigate(['/usuario/departamentos-da-empresa'], {
              state: { successMessage: 'Departamento atualizado com sucesso!' },
            });
          },
          (error) => {
            this.isLoading = false;
            this.errorMessage =
              error.message || 'Erro ao atualizar o departamento.';
            this.successMessage = null;
          }
        );
    } else {
      this.departamentoService.cadastrarDepartamento(departamento).subscribe(
        (response) => {
          this.isLoading = false;
          this.successMessage = 'Departamento cadastrada com sucesso!';
          this.errorMessage = null;
          this.departamentoForm.reset();
        },
        (error) => {
          this.isLoading = false;
          this.errorMessage =
            error.message || 'Erro ao cadastrar a departamento.';
          this.successMessage = null;
          console.error('Erro no servidor:', error);
        }
      );
    }
  }

  isRequired(controlName: string): boolean {
    const control = this.departamentoForm.get(controlName);
    if (control && control.validator) {
      const validator = control.validator({} as AbstractControl);
      return !!(validator && validator['required']);
    }
    return false;
  }

  private verificarModoEdicao(): void {
    this.departamentoId = this.route.snapshot.paramMap.get('id');
    if (this.departamentoId) {
      this.isEditMode = true;
      this.departamentoService
        .getDepartamentoById(Number(this.departamentoId))
        .subscribe(
          (departamento: Departamento) => {
            this.carregarUsuarios(() => {
              const responsaveisSelecionados = (departamento.responsaveis || [])
                .map((resp: any) =>
                  this.responsaveis.find((r) => r.value == resp.id)
                )
                .filter(Boolean);

              this.departamentoForm.patchValue({
                ...departamento,
                responsaveis: responsaveisSelecionados,
              });
            });
          },
          (error) => {
            console.error('Erro ao carregar os dados de departamento', error);
          }
        );
    }
  }

  carregarUsuarios(callback?: () => void): void {
    this.colaboradoresService.getColaboradores().subscribe(
      (usuarios) => {
        this.responsaveis = usuarios.map((usuario) => ({
          value: usuario.id,
          description: usuario.username,
        }));
        if (callback) callback();
      },
      (error) => {
        console.error('Erro ao carregar as usuarios:', error);
        if (callback) callback();
      }
    );
  }

  onResponsaveisChange(event: any) {
    console.log('Responsáveis selecionados:', event);
    this.departamentoForm.get('responsaveis')?.setValue(event);
  }
}
