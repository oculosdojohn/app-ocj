import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Loja } from '../../Administrativo/lojas/loja';
import { LojaService } from '../../../services/administrativo/loja.service';
import { Endereco } from '../../Administrativo/lojas/endereco';
import { Estado, EnderecoService } from '../../../services/endereco.service';

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

  estados: { value: string; description: string }[] = [];
  cidades: { value: string; description: string }[] = [];
  selectedEstado: string = '';
  selectedCidade: string = '';

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private lojaService: LojaService,
    private enderecoService: EnderecoService
  ) {
    this.lojaForm = this.formBuilder.group({
      nome: ['', Validators.required],
      endereco: this.formBuilder.group({
        estado: [''],
        cidade: [''],
        cep: ['', Validators.required],
        bairro: ['', Validators.required],
        rua: ['', Validators.required],
        numero: ['', Validators.required],
        logradouro: [''],
        complemento: [''],
      }),
    });
  }

  ngOnInit(): void {
    this.enderecoService.getEstados().subscribe((estados: Estado[]) => {
      this.estados = estados.map((estado: Estado) => ({
        value: estado.sigla,
        description: estado.nome,
      }));
      console.log('Estados carregados:', this.estados);
    });
    this.onEstadoChange('');
  }

  onEstadoChange(nome: string): void {
    console.log('onEstadoChange chamado com o estado:', nome);
    this.lojaForm.get('endereco.estado')?.setValue(nome);
    if (!nome) {
      this.enderecoService.getTodasCidades().subscribe((cidades) => {
        this.cidades = cidades.map((cidade) => ({
          value: cidade.nome,
          description: cidade.nome,
        }));
        this.selectedCidade = '';
        this.lojaForm.get('endereco.cidade')?.setValue(null);
      });
    } else {
      this.enderecoService.getCidadesByEstado(nome).subscribe((cidades) => {
        console.log('Cidades filtradas pelo estado:', cidades);
        this.cidades = cidades.map((cidade) => ({
          value: cidade.nome,
          description: cidade.nome,
        }));
        this.selectedCidade = '';
        this.lojaForm.get('endereco.cidade')?.setValue(null);
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
