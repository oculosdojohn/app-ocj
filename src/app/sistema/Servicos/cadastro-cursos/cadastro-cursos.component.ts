import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Aula } from '../cursos/aulas';
import { Modulos } from '../cursos/enums/modulos';
import { ModulosDescricao } from '../cursos/enums/modulos-descricao';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CursosService } from 'src/app/services/funcionalidades/cursos.service';

@Component({
  selector: 'app-cadastro-cursos',
  templateUrl: './cadastro-cursos.component.html',
  styleUrls: ['./cadastro-cursos.component.css'],
})
export class CadastroCursosComponent implements OnInit {
  selectedVideos: { [key: string]: File | null } = {};
  selectedArquivos: File[] = [];
  formData = new FormData();
  selectedModulo: string = '';

  modulo = Object.keys(Modulos).map((key) => ({
    value: Modulos[key as keyof typeof Modulos],
    description: ModulosDescricao[Modulos[key as keyof typeof Modulos]],
  }));

  cadastroAula: FormGroup;
  isLoading = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  isEditMode = false;
  aulaId: string | null = null;

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private cursosService: CursosService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.cadastroAula = this.formBuilder.group({
      id: [''],
      titulo: ['', Validators.required],
      descricao: ['', Validators.required],
      modulo: ['', Validators.required],
      qtdMoedas: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.cadastroAula.get('modulo')?.setValue(this.selectedModulo);
    this.aulaId = this.route.snapshot.paramMap.get('id');
    if (this.aulaId) {
      this.isEditMode = true;
      this.cursosService.obterAulaPorId(this.aulaId).subscribe(
        (aula: Aula) => {
          console.log('Dados da aula recebidos:', aula);
          this.cadastroAula.patchValue(aula);
          this.selectedModulo = aula.modulo || '';

        },
        (error) => {
          console.error('Erro ao carregar os dados da aula:', error);
        }
      );
    }
  }

  goBack() {
    this.location.back();
  }

  onVideoSelected(video: File | null, tipo: string) {
    this.selectedVideos[tipo] = video;
    console.log(`video de ${tipo} selecionada:`, video);
  }

  onArquivosSelecionados(arquivos: File[]) {
    this.selectedArquivos = arquivos;
    console.log('Arquivos selecionados:', arquivos);
  }

  onSubmit() {
    console.log('Formulário enviado');
    this.isLoading = true;
    this.successMessage = null;
    this.errorMessage = null;
    this.cadastroAula.get('modulo')?.setValue(this.selectedModulo);

    const aula: Aula = {
      ...this.cadastroAula.value,
      modulo: this.cadastroAula.get('modulo')?.value || null,
    };

    const formData = new FormData();
    formData.append('aula', JSON.stringify(aula));
    if (this.selectedVideos['video']) {
      formData.append('video', this.selectedVideos['video']);
    }

    if (this.selectedArquivos.length > 0) {
      this.selectedArquivos.forEach((arquivo) => {
        formData.append('arquivos', arquivo);
      });
    }

    // Debug: Verificar o que está sendo enviado no formData
    formData.forEach((value, key) => console.log(`FormData: ${key} ->`, value));

    if (this.isEditMode && this.aulaId) {
      this.cursosService.atualizarAula(this.aulaId, formData).subscribe(
        (response) => {
          this.isLoading = false;
          this.successMessage = 'Aula atualizada com sucesso!';
          this.errorMessage = null;
          this.router.navigate(['/usuario/buscar-aulas']);
          console.debug('Aula atualizada com sucesso:', response);
        },
        (error) => {
          this.isLoading = false;
          this.errorMessage = 'Erro ao atualizar aula.';
          this.successMessage = null;
          this.cadastroAula.reset();
          console.error('Erro ao atualizar aula:', error);
        }
      );
    } else {
      this.cursosService.cadastrarAula(formData).subscribe(
        (response) => {
          this.isLoading = false;
          this.successMessage = 'Aula cadastrada com sucesso!';
          this.errorMessage = null;
          this.cadastroAula.reset();
          console.debug('Aula cadastrada com sucesso:', response);
        },
        (error) => {
          this.isLoading = false;
          this.errorMessage = 'Erro ao cadastrar aula.';
          this.successMessage = null;
          console.error('Erro ao cadastrar aula:', error);
        }
      );
    }
  }
}
