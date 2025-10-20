import { Modulos } from './enums/modulos';

export class Aula {
  id!: string;
  dataCadastro!: string;
  modulo!: Modulos;
  titulo!: string;
  descricao!: string;
  qtdMoedas!: string;
  video!: { documentoUrl: string; id: number };
  arquivos!: { documentoUrl: string; id: number; name: string }[];
  visualizado!: boolean;
  totalAvaliacoes!: number;
  mediaAvaliacoes?: number;
  minhaAvaliacao?: number;

  toJson(): string {
    return JSON.stringify({
      id: this.id,
      dataCadastro: this.dataCadastro,
      modulo: this.modulo,
      qtdMoedas: this.qtdMoedas,
      titulo: this.titulo,
      descricao: this.descricao,
      video: this.video,
      arquivos: this.arquivos,
    });
  }
}
