import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Loja } from '../../Administrativo/lojas/loja';
import { LojaService } from '../../../services/administrativo/loja.service';

@Component({
  selector: 'app-cadastro-de-loja',
  templateUrl: './cadastro-de-loja.component.html',
  styleUrls: ['./cadastro-de-loja.component.css']
})
export class CadastroDeLojaComponent implements OnInit {
  lojaForm: FormGroup;
  isLoading = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  isEditMode = false;

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private lojaService: LojaService
  ) { 
    this.lojaForm = this.formBuilder.group({
      nome: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  goBack() {
    this.location.back();
  }

  onSubmit(): void {
    if (this.lojaForm.invalid) {
      this.errorMessage = 'Por favor, preencha todos os campos obrigatórios.';
      return;
    }

    this.isLoading = true;
    this.successMessage = null;
    this.errorMessage = null;

    const loja: Loja = this.lojaForm.value;

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
