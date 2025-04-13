import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { LojaService } from '../../../services/administrativo/loja.service';
import { DepartamentoService } from '../../../services/administrativo/departamento.service';
import { ColaboradorService } from 'src/app/services/administrativo/colaborador.service';

@Component({
  selector: 'app-cadastro-de-colaborador',
  templateUrl: './cadastro-de-colaborador.component.html',
  styleUrls: ['./cadastro-de-colaborador.component.css'],
})
export class CadastroDeColaboradorComponent implements OnInit {
  colaboradorForm: FormGroup;
  isLoading = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  isEditMode = false;
  selectedImages: { [key: string]: File | null } = {};
  status: string = 'ativo';
  selectedArquivos: File[] = [];
  lojas: { value: string; description: string }[] = [];
  selectedLoja: string = '';

  constructor(
    private location: Location, 
    private lojaService: LojaService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private departamentoService: DepartamentoService,
    private colaboradorService: ColaboradorService
  ) {
    this.colaboradorForm = this.formBuilder.group({
      nome: ['', Validators.required],
      dataNascimento: ['', Validators.required],

    });
  }

  ngOnInit(): void {
    this.carregarLojas();
  }

  goBack() {
    this.location.back();
  }

  onImageSelected(image: File | null, tipo: string) {
    this.selectedImages[tipo] = image;
    console.log(`Imagem de ${tipo} selecionada:`, image);
  }

  onArquivosSelecionados(arquivos: File[]) {
    this.selectedArquivos = arquivos;
    console.log('Arquivos selecionados:', arquivos);
  }

  carregarLojas(): void {
    this.lojaService.getLojas().subscribe(
      (lojas) => {
        this.lojas = lojas.map((loja) => ({
          value: loja.nome,
          description: loja.nome,
        }));
      },
      (error) => {
        console.error('Erro ao carregar as lojas:', error);
      }
    );
  }

  atualizarLojas(): void {
    console.log('Atualizando lista de lojas...');
    this.carregarLojas();
  }

  onSubmit(): void {}

  isRequired(controlName: string): boolean {
    const control = this.colaboradorForm.get(controlName);
    if (control && control.validator) {
      const validator = control.validator({} as AbstractControl);
      return !!(validator && validator['required']);
    }
    return false;
  }
}
