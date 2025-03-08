import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Aula } from '../cursos/aulas';
import { Modulos } from '../cursos/enums/modulos';
import { ModulosDescricao } from '../cursos/enums/modulos-descricao';

@Component({
  selector: 'app-cadastro-cursos',
  templateUrl: './cadastro-cursos.component.html',
  styleUrls: ['./cadastro-cursos.component.css'],
})
export class CadastroCursosComponent implements OnInit {
  selectedVideos: { [key: string]: File | null } = {};
  selectedArquivos: File[] = [];
  formData = new FormData();
  aula: Aula = new Aula();
  selectedModulo: string = '';

  modulos = Object.keys(Modulos).map(key => ({
    value: Modulos[key as keyof typeof Modulos],
    description: ModulosDescricao[Modulos[key as keyof typeof Modulos]]
  }));

  constructor(
    private location: Location,
  ) {}

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
}
