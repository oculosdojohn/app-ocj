import { Modulos } from './enums/modulos';

export class Quiz {
  id!: string;
  dataCadastro!: string;
  modulo!: Modulos;
  enunciado!: string;
  qtdMoedas!: number;
  resposta!: string;
  alternativaA!: string;
  alternativaB!: string;
  alternativaC!: string;
  alternativaD!: string;
}
