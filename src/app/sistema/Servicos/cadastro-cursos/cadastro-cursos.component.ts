import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
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

  modulos = Object.keys(Modulos).map((key) => ({
    value: Modulos[key as keyof typeof Modulos],
    description: ModulosDescricao[Modulos[key as keyof typeof Modulos]],
  }));

  cadastroAula: FormGroup;
  isLoading = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  isEditMode = false;
  aulaId: string | null = null;

  constructor(private location: Location, private formBuilder: FormBuilder, private cursosService: CursosService) {
    this.cadastroAula = this.formBuilder.group({
      id: [''],
      titulo: ['', Validators.required],
      descricao: ['', Validators.required],
      modulo: ['', Validators.required],
      qtdMoedas: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

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
      setor: this.cadastroAula.get('modulo')?.value || null,
    };
    console.log('Dados da aula a serem enviados:', aula);

    const formData = new FormData();
    formData.append('aula', JSON.stringify(aula));
    if (this.selectedVideos['video']) {
      formData.append('video', this.selectedVideos['video']);
      console.log('Vídeo a ser enviado:', this.selectedVideos['video']);
    }

    this.selectedArquivos.forEach((arquivo, index) => {
      formData.append(`arquivo${index}`, arquivo);
      console.log(`Arquivo ${index} a ser enviado:`, arquivo);
    });

    this.cursosService.cadastrarAula(formData).subscribe(
      response => {
        this.isLoading = false;
        this.successMessage = 'Aula cadastrada com sucesso!';
        this.errorMessage = null;
        this.cadastroAula.reset();
        console.debug('Aula cadastrada com sucesso:', response);
      },
      error => {
        this.isLoading = false;
        this.errorMessage = 'Erro ao cadastrar aula.';
        this.successMessage = null;
        console.error('Erro ao cadastrar aula:', error);
      }
    );
  }
}
