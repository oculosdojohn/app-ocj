import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Noticia } from '../forum-noticias/noticia';
import { NoticiasService } from 'src/app/services/funcionalidades/noticias.service';
import { LojaService } from 'src/app/services/administrativo/loja.service';
import { TipoNoticia } from '../forum-noticias/enums/tipo-noticia';
import { TipoNoticiaDescricao } from '../forum-noticias/enums/tipo-noticia-descricao';

@Component({
  selector: 'app-cadastro-noticias',
  templateUrl: './cadastro-noticias.component.html',
  styleUrls: ['./cadastro-noticias.component.css'],
})
export class CadastroNoticiasComponent implements OnInit {
  noticiaForm: FormGroup;
  isLoading = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  isEditMode = false;
  noticiaId: string | null = null;

  lojasIds: { value: string; description: string }[] = [];
  selectedDestinatario: string = '';

  arquivo: File | { documentoUrl: string; id: number; name: string } | null =
    null;
  selectedFile: File | null = null;

  tiposNoticia = Object.keys(TipoNoticia).map((key) => ({
    value: TipoNoticia[key as keyof typeof TipoNoticia],
    description:
      TipoNoticiaDescricao[TipoNoticia[key as keyof typeof TipoNoticia]],
  }));
  selectedTipoNoticia: string = '';

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private noticiasService: NoticiasService,
    private lojaService: LojaService
  ) {
    this.noticiaForm = this.formBuilder.group({
      titulo: [''],
      conteudo: [''],
      lojasIds: [[]],
    });
  }

  ngOnInit(): void {
    this.verificarModoEdicao();
    this.carregarLojas();
  }

  goBack() {
    this.location.back();
  }

  onSubmit(): void {
    if (this.noticiaForm.invalid) {
      this.errorMessage = 'Por favor, preencha todos os campos obrigatórios.';
      return;
    }

    const lojasSelecionadas = Array.isArray(this.noticiaForm.value.lojasIds)
      ? this.noticiaForm.value.lojasIds.map((r: any) => r.value)
      : [];

    this.isLoading = true;
    this.successMessage = null;
    this.errorMessage = null;

    const noticia: Noticia = {
      ...this.noticiaForm.value,
      lojasIds: lojasSelecionadas,
    };

    const formData = new FormData();
    formData.append('noticia', JSON.stringify(noticia));

    if (this.selectedFile) {
      formData.append('arquivo', this.selectedFile);
    }

    if (this.isEditMode && this.noticiaId) {
      this.noticiasService
        .editarNoticia(Number(this.noticiaId), formData)
        .subscribe(
          (response) => {
            this.isLoading = false;
            this.successMessage = 'Notícia atualizada com sucesso!';
            this.errorMessage = null;
            this.noticiaForm.reset();
            this.router.navigate(['/usuario/central-de-noticias'], {
              state: { successMessage: 'Notícia atualizada com sucesso!' },
            });
          },
          (error) => {
            this.isLoading = false;
            this.errorMessage = error.message || 'Erro ao atualizar a notícia.';
            this.successMessage = null;
          }
        );
    } else {
      this.noticiasService.cadastrarNoticia(formData).subscribe(
        (response) => {
          this.isLoading = false;
          this.successMessage = 'Notícia cadastrada com sucesso!';
          this.errorMessage = null;
          this.noticiaForm.reset();
          this.router.navigate(['/usuario/central-de-noticias'], {
            state: { successMessage: 'Notícia cadastrada com sucesso!' },
          });
        },
        (error) => {
          this.isLoading = false;
          this.errorMessage = error.message || 'Erro ao cadastrar a notícia.';
          this.successMessage = null;
        }
      );
    }
  }

  isRequired(controlName: string): boolean {
    const control = this.noticiaForm.get(controlName);
    if (control && control.validator) {
      const validator = control.validator({} as AbstractControl);
      return !!(validator && validator['required']);
    }
    return false;
  }

  private verificarModoEdicao(): void {
    this.noticiaId = this.route.snapshot.paramMap.get('id');
    if (this.noticiaId) {
      this.isEditMode = true;
      this.noticiasService.getNoticiaById(Number(this.noticiaId)).subscribe(
        (noticia: Noticia) => {
          this.noticiaForm.patchValue({
            ...noticia,
            lojasIds:
              noticia.lojas?.map((loja) => ({
                value: loja.id,
                description: loja.nome,
              })) || [],
          });

          if (noticia.arquivo) {
            this.selectedFile = null;
            this.arquivo = noticia.arquivo;
          }
        },
        (error) => {
          console.error('Erro ao carregar os dados de notícia', error);
          this.errorMessage = 'Erro ao carregar os dados da notícia.';
        }
      );
    }
  }

  carregarLojas(callback?: () => void): void {
    this.lojaService.getLojas().subscribe(
      (lojas) => {
        this.lojasIds = lojas.map((loja) => ({
          value: loja.id,
          description: loja.nome,
        }));
        if (callback) callback();
      },
      (error) => {
        console.error('Erro ao carregar as lojas:', error);
        if (callback) callback();
      }
    );
  }

  onDestinatarioChange(event: any) {
    console.log('Destinatário selecionado:', event);
    this.noticiaForm.get('lojasIds')?.setValue(event);
  }

  onArquivoSelecionado(arquivo: File | null): void {
    if (arquivo) {
      console.log('📎 Arquivo selecionado:', arquivo.name);
      console.log('📊 Tamanho:', arquivo.size);
      console.log('🎭 Tipo:', arquivo.type);

      // Salvar o arquivo para envio
      this.selectedFile = arquivo;
    }
  }

  onArquivoRemovido(): void {
    console.log('🗑️ Arquivo removido');
    this.selectedFile = null;
  }
}
