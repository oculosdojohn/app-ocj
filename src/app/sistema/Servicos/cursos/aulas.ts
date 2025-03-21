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
}
