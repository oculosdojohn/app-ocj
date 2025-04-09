import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
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
    this.departamentoForm = this.formBuilder.group({});
  }

  ngOnInit(): void {}

  goBack() {
    this.location.back();
  }

  onSubmit(): void {}
}
