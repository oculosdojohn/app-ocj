import { Modulos } from './enums/modulos';

export class Aula {
  id!: number;
  dataCadastro!: string;
  video!: File;
  urlVideo!: string;
  modulos!: Modulos;
  titulo!: string;
  descricao!: string;
  qtdMoedas!: string;
  arquivo!: File;
  urlArquivo!: string;
  keyArquivo!: string;
  documentos?: { id: number; url: string; key: string }[];

  toJson(): string {
    return JSON.stringify({
      id: this.id,
      modulo: this.modulos,
      qtdMoedas: this.qtdMoedas,
      titulo: this.titulo,
      descricao: this.descricao,
      video: this.video,
      urlVideo: this.urlVideo,
      arquivo: this.arquivo,
      urlArquivo: this.urlArquivo,
      keyArquivo: this.keyArquivo,
      documentos: this.documentos,
    });
  }
}
