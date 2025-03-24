import { Modulos } from './enums/modulos';

export class Aula {
  id!: number;
  dataCadastro!: string;
  modulos!: Modulos;
  titulo!: string;
  descricao!: string;
  qtdMoedas!: string;
  video!: { documentoUrl: string; id: number };
  arquivos!: { documentoUrl: string; id: number }[];

  toJson(): string {
    return JSON.stringify({
      id: this.id,
      modulo: this.modulos,
      qtdMoedas: this.qtdMoedas,
      titulo: this.titulo,
      descricao: this.descricao,
      video: this.video,
      arquivos: this.arquivos,
    });
  }
}
