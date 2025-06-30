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
  selectedArquivos: (File | { name: string; documentoUrl: string })[] = [];
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
  videoPreview: string | ArrayBuffer | null = null;

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
      arquivos: [[]],
    });
  }

  ngOnInit(): void {
    this.cadastroAula.get('modulo')?.setValue(this.selectedModulo);
    this.aulaId = this.route.snapshot.paramMap.get('id');

    if (this.aulaId) {
      this.isEditMode = true;
      this.carregarDadosDaAula();
    }
  }

  goBack() {
    this.location.back();
  }

  onVideoSelected(video: File | null, tipo: string) {
    this.selectedVideos[tipo] = video;
    console.log(`video de ${tipo} selecionada:`, video);
  }

  onArquivosSelecionados(
    arquivos: (File | { id: number; name: string; documentoUrl: string })[]
  ): void {
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

    this.selectedArquivos.forEach((arquivo) => {
      if (arquivo instanceof File) {
        formData.append('arquivos', arquivo);
      } else {
        formData.append('arquivosExistentes', JSON.stringify(arquivo));
      }
    });

    if (this.isEditMode && this.aulaId) {
      this.cursosService.atualizarAula(this.aulaId, formData).subscribe(
        (response) => {
          this.isLoading = false;
          this.successMessage = 'Aula atualizada com sucesso!';
          this.errorMessage = null;
          this.router.navigate(['/usuario/buscar-aulas']);
        },
        (error) => {
          this.isLoading = false;
          this.errorMessage = 'Erro ao atualizar aula.';
          this.successMessage = null;
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
          this.router.navigate(['/usuario/cursos-disponiveis']);
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

  private carregarDadosDaAula(): void {
    this.cursosService.obterAulaPorId(this.aulaId!).subscribe(
      (aula: Aula) => {
        console.log('Dados da aula recebidos:', aula);
        this.cadastroAula.patchValue(aula);
        this.selectedModulo = aula.modulo || '';

        if (aula.video.documentoUrl) {
          this.selectedVideos['video'] = null;
          this.videoPreview = aula.video.documentoUrl;
          console.log('Video da aula:', aula.video);
        }

        if (aula.arquivos && aula.arquivos.length > 0) {
          const arquivosMapeados = aula.arquivos.map((arquivo) => ({
            documentoUrl: arquivo.documentoUrl,
            name: arquivo.name,
            id: arquivo.id,
          }));
          this.cadastroAula.get('arquivos')?.setValue(arquivosMapeados);
          this.selectedArquivos = arquivosMapeados;
        } else {
          console.log('Nenhum arquivo encontrado para a aula.');
        }
      },
      (error) => {
        console.error('Erro ao carregar os dados da aula:', error);
      }
    );
  }
}
