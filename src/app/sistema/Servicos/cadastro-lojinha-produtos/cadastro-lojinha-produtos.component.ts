import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Produto } from '../lojinha/produto';
import { LojinhaService } from 'src/app/services/funcionalidades/lojinha.service';

@Component({
  selector: 'app-cadastro-lojinha-produtos',
  templateUrl: './cadastro-lojinha-produtos.component.html',
  styleUrls: ['./cadastro-lojinha-produtos.component.css'],
})
export class CadastroLojinhaProdutosComponent implements OnInit {
  selectedImages: { [key: string]: File | null } = {};
  produtoForm: FormGroup;
  isLoading = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  isEditMode = false;
  produtoId: string | null = null;

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private lojinhaService: LojinhaService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.produtoForm = this.formBuilder.group({
      foto: [''],
      nome: ['', Validators.required],
      valor: [],
      qtdEstoque: [],
    });
  }

  ngOnInit(): void {
    this.produtoForm.get('foto')?.setValue(this.selectedImages['photo']);
    this.verificarModoEdicao();
  }

  goBack() {
    this.location.back();
  }

  onImageSelected(image: File | null, tipo: string) {
    this.selectedImages[tipo] = image;
    console.log(`Imagem de ${tipo} selecionada:`, image);
  }

  onSubmit(): void {
    const invalidFields = this.validarCamposObrigatorios();
    if (this.produtoForm.invalid) {
      if (invalidFields.length > 0) {
        this.errorMessage =
          'Por favor, preencha o(s) campo(s) obrigatório(s): ' +
          invalidFields.join(', ') +
          '.';
      } else {
        this.errorMessage = 'Por favor, preencha todos os campos obrigatórios.';
      }
      return;
    }

    this.isLoading = true;
    this.successMessage = null;
    this.errorMessage = null;

    const produto: Produto = {
      ...this.produtoForm.value,
    };

    const formData = new FormData();
    formData.append('dados', JSON.stringify(produto));

    if (this.selectedImages['photo']) {
      formData.append('foto', this.selectedImages['photo']);
    }

    if (this.isEditMode && this.produtoId) {
    } else {
      this.lojinhaService.cadastrarProduto(formData).subscribe(
        (response) => {
          this.isLoading = false;
          this.successMessage = 'Produto cadastrado com sucesso!';
          this.errorMessage = null;
          this.produtoForm.reset();
          this.router.navigate(['/usuario/lojinha-do-john'], {
            state: { successMessage: 'Produto cadastrado com sucesso!' },
          });
        },
        (error) => {
          this.isLoading = false;
          this.errorMessage = error.message || 'Erro ao cadastrar o produto.';
          this.successMessage = null;
        }
      );
    }
  }

  isRequired(controlName: string): boolean {
    const control = this.produtoForm.get(controlName);
    if (control && control.validator) {
      const validator = control.validator({} as AbstractControl);
      return !!(validator && validator['required']);
    }
    return false;
  }

  private verificarModoEdicao(): void {
    this.produtoId = this.route.snapshot.paramMap.get('id');
    if (this.produtoId) {
      this.isEditMode = true;
      this.lojinhaService.getProdutoById(Number(this.produtoId)).subscribe(
        (produto: Produto) => {
          console.log('Dados do produto recebidos:', produto);
          this.produtoForm.patchValue({
            nome: produto.nome,
            valor: produto.valor,
            qtdEstoque: produto.qtdEstoque,
          });

          if (produto.foto && produto.foto.documentoUrl) {
            console.log('Foto existente:', produto.foto.documentoUrl);
          }
        },
        (error) => {
          console.error('Erro ao carregar os dados do produto:', error);
          this.errorMessage = 'Erro ao carregar os dados do produto.';
        }
      );
    }
  }

  private validarCamposObrigatorios(): string[] {
    const fieldNames: { [key: string]: string } = {
      nome: 'Nome do produto',
    };

    const invalidFields: string[] = Object.keys(this.produtoForm.controls)
      .filter((key) => {
        const control = this.produtoForm.get(key);
        return (
          control &&
          control.invalid &&
          control.errors &&
          control.errors['required']
        );
      })
      .map((key) => fieldNames[key] || key);

    const enderecoGroup = this.produtoForm.get('endereco');
    if (enderecoGroup && enderecoGroup.invalid) {
      Object.keys((enderecoGroup as FormGroup).controls).forEach((key) => {
        const control = enderecoGroup.get(key);
        if (
          control &&
          control.invalid &&
          control.errors &&
          control.errors['required']
        ) {
          invalidFields.push(fieldNames[key] || key);
        }
      });
    }
    return invalidFields;
  }
}
