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

  valor: string[] = [
    'Alice Santos',
    'Bruno Oliveira',
    'Carla Mendes',
    'Diego Ferreira',
    'Elisa Costa',
    'Felipe Almeida',
    'Gabriela Rocha',
    'Henrique Souza',
    'Isabela Martins',
    'João Pereira',
  ];
  selectedResponsavel: string = '';

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private departamentoService: DepartamentoService
  ) {
    this.departamentoForm = this.formBuilder.group({
      nome: ['', Validators.required],
      descricao: [''],
      responsaveis: [[]],
      orcamentoMensal: ['', Validators.required],
      telefone: ['', Validators.required],
      email: ['', Validators.required],
      localizacao: [''],
    });
  }

  ngOnInit(): void {
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

    const departamento: Departamento = {
      ...this.departamentoForm.value,
      responsaveis: Array.isArray(this.departamentoForm.value.responsaveis)
        ? this.departamentoForm.value.responsaveis
        : [],
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
            this.router.navigate(['/usuario/departamentos-da-empresa']);
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
            console.log('Dados de departamento recebidos:', departamento);

            this.departamentoForm.patchValue(departamento);
          },
          (error) => {
            console.error('Erro ao carregar os dados de departamento', error);
          }
        );
    }
  }
}
