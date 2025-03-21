import { Modulos } from './enums/modulos';

export class Aula {
  id!: number;
  dataCadastro!: string;
  idUser!: number;
  title!: string;
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
      dataCadastro: this.dataCadastro,
      idUser: this.idUser,
      title: this.title,
      video: this.video,
      urlVideo: this.urlVideo,
      modulos: this.modulos,
      titulo: this.titulo,
      descricao: this.descricao,
      qtdMoedas: this.qtdMoedas,
      arquivo: this.arquivo,
      urlArquivo: this.urlArquivo,
      keyArquivo: this.keyArquivo,
      documentos: this.documentos,
    });
  }
}
